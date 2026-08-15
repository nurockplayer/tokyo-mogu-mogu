/**
 * Minimal CKAN API client for the acquisition layer (#175).
 *
 * Implements the Tokyo Open Data Catalog CKAN actions the layer needs to
 * *discover* official datasets and pick the best download artifact for one of
 * them. It is deliberately not a general CKAN SDK: only `package_search`,
 * `package_show`, and `resource_show` are surfaced, and the parsed types keep
 * just the fields the layer relies on. Extra fields in a raw response are still
 * preserved at runtime because the JSON body is passed through.
 *
 * The catalog requires no API key; every action is a public GET with query
 * params. Network access is the only I/O, and the fetcher is injectable so
 * tests stay deterministic and offline.
 *
 * Product-scope note: this is acquisition tooling only. Discovering a dataset
 * or selecting an artifact makes no Product-visible claim; normalized records
 * still carry provenance and never enter Product on their own.
 */

/** A resource (downloadable artifact) within a CKAN package. */
export interface CkanResource {
  id: string;
  name: string | null;
  format: string | null;
  url: string;
  last_modified: string | null;
}

/** A CKAN package (dataset) as returned by package_search / package_show. */
export interface CkanPackage {
  id: string;
  name: string;
  title: string;
  license_title: string | null;
  metadata_modified: string;
  notes?: string | null;
  resources: CkanResource[];
}

/** Shape of the CKAN `package_search` action's `result` field. */
interface CkanSearchResult {
  count: number;
  results: CkanPackage[];
}

/** HTTP fetcher used by the client; injectable for offline tests. */
export type CkanFetcher = (url: string) => Promise<Response>;

export interface CkanRequestOptions {
  /** HTTP fetch implementation; injectable for deterministic tests. */
  fetcher?: CkanFetcher;
}

const DEFAULT_FETCHER: CkanFetcher = (url) => fetch(url);

/** Default artifact formats to prefer, in rank order (best first). */
export const DEFAULT_PREFERRED_FORMATS = ['csv', 'xlsx', 'xls', 'json', 'zip', 'geojson'];

/** Build a CKAN action URL, treating `base` as an action directory root. */
function actionUrl(base: string, action: string, params: Record<string, string>): string {
  const root = base.endsWith('/') ? base : `${base}/`;
  const url = new URL(action, root);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
}

/**
 * Run one CKAN action and return its `result` payload. Fails loudly on any
 * transport or protocol failure rather than returning partial data.
 */
async function ckanAction<T>(
  base: string,
  action: string,
  params: Record<string, string>,
  options: CkanRequestOptions,
): Promise<T> {
  const fetcher = options.fetcher ?? DEFAULT_FETCHER;
  const res = await fetcher(actionUrl(base, action, params));
  if (!res.ok) {
    throw new Error(
      `CKAN ${action} failed with HTTP ${res.status}${res.statusText ? ` ${res.statusText}` : ''}`,
    );
  }
  let body: { success?: unknown; result?: unknown; error?: unknown };
  try {
    body = (await res.json()) as { success?: unknown; result?: unknown; error?: unknown };
  } catch {
    throw new Error(`CKAN ${action} returned a non-JSON response`);
  }
  if (body.success !== true || body.result === undefined) {
    throw new Error(`CKAN ${action} returned a failure response (success: ${String(body.success)})`);
  }
  return body.result as T;
}

/** Search the catalog for packages matching `query`; returns the result list. */
export async function ckanPackageSearch(
  base: string,
  query: string,
  options: CkanRequestOptions = {},
): Promise<CkanPackage[]> {
  const result = await ckanAction<CkanSearchResult>(base, 'package_search', { q: query }, options);
  return result.results;
}

/** Fetch one package (dataset) by id with full metadata. */
export async function ckanPackageShow(
  base: string,
  datasetId: string,
  options: CkanRequestOptions = {},
): Promise<CkanPackage> {
  return ckanAction<CkanPackage>(base, 'package_show', { id: datasetId }, options);
}

/** Fetch one resource by id with full metadata. */
export async function ckanResourceShow(
  base: string,
  resourceId: string,
  options: CkanRequestOptions = {},
): Promise<CkanResource> {
  return ckanAction<CkanResource>(base, 'resource_show', { id: resourceId }, options);
}

/** Stable sort rank of a format within the preferred list (0 = most preferred). */
function formatRank(format: string | null, preferredFormats: string[]): number {
  const needle = (format ?? '').toLowerCase();
  const index = preferredFormats.findIndex((f) => f.toLowerCase() === needle);
  return index === -1 ? preferredFormats.length : index;
}

function dateMs(value: string | null): number | null {
  if (value === null || value === '') return null;
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : ms;
}

/**
 * Deterministically pick the best resource for a dataset.
 *
 * Rule (stable — the same input list always yields the same output, with no
 * randomness):
 * 1. only resources whose format is in `preferredFormats` (case-insensitive)
 *    qualify;
 * 2. the lower format rank (earlier in the preferred list) wins;
 * 3. then the most recent `last_modified` wins (missing dates rank last);
 * 4. then the lexicographically smaller resource name wins;
 * 5. then the resource's original position in the input wins (the only
 *    input-order-sensitive tiebreak; for a fixed input order the result is
 *    still deterministic).
 *
 * Returns `undefined` when no resource qualifies.
 */
export function selectBestResource(
  resources: CkanResource[],
  preferredFormats: string[] = DEFAULT_PREFERRED_FORMATS,
): CkanResource | undefined {
  const qualified = preferredFormats.length === 0 ? new Set<string>() : new Set(preferredFormats.map((f) => f.toLowerCase()));
  const candidates = resources
    .map((resource, index) => ({ resource, index }))
    .filter(({ resource }) => qualified.has((resource.format ?? '').toLowerCase()));
  if (candidates.length === 0) return undefined;

  candidates.sort((a, b) => {
    const rankDiff = formatRank(a.resource.format, preferredFormats) - formatRank(b.resource.format, preferredFormats);
    if (rankDiff !== 0) return rankDiff;
    const aDate = dateMs(a.resource.last_modified);
    const bDate = dateMs(b.resource.last_modified);
    if (aDate !== null && bDate !== null && aDate !== bDate) return aDate > bDate ? -1 : 1;
    if (aDate !== null) return -1;
    if (bDate !== null) return 1;
    const nameDiff = (a.resource.name ?? '').localeCompare(b.resource.name ?? '');
    if (nameDiff !== 0) return nameDiff;
    return a.index - b.index;
  });

  return candidates[0].resource;
}
