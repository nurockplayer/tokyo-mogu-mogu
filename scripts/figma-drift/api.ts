import {
  OperationalError,
  type FigmaFileMeta,
  type OperationalCode,
} from './types';

/**
 * Thin Figma REST API client (Issue #233, locked decision #3 — Figma REST API
 * based, no Figma MCP dependency). Credentials come only from the
 * `FIGMA_ACCESS_TOKEN` env var passed in by the caller; nothing is committed.
 *
 * `fetchImpl` is injectable so unit tests run against fixtures with zero
 * network and zero token. All failure modes are normalized to
 * `OperationalError` so an operational failure can never be mistaken for
 * drift and can never reach a write path.
 */

export type FetchLike = (
  url: string,
  init?: { method?: string; headers?: Record<string, string> },
) => Promise<{ ok: boolean; status: number; statusText: string; json(): Promise<unknown> }>;

export interface FigmaClientOptions {
  fileKey: string;
  token: string;
  baseUrl?: string;
  fetchImpl?: FetchLike;
}

export interface FigmaClient {
  getFileMeta(): Promise<FigmaFileMeta>;
  /** Returns the resolved node entries keyed by the requested node id. */
  getWatchedNodes(ids: string[]): Promise<Record<string, unknown>>;
}

const DEFAULT_BASE_URL = 'https://api.figma.com';

function operational(code: OperationalCode, message: string): never {
  throw new OperationalError(code, message);
}

function readGlobalFetch(): FetchLike {
  const g = globalThis as { fetch?: FetchLike };
  if (typeof g.fetch !== 'function') {
    operational('network-error', 'global fetch is unavailable in this runtime');
  }
  return g.fetch;
}

export function createFigmaClient(options: FigmaClientOptions): FigmaClient {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  const fetchImpl = options.fetchImpl ?? readGlobalFetch();
  const fileKey = encodeURIComponent(options.fileKey);

  async function request(path: string, description: string): Promise<unknown> {
    let response: Awaited<ReturnType<FetchLike>>;
    try {
      response = await fetchImpl(`${baseUrl}${path}`, {
        headers: { 'X-Figma-Token': options.token },
      });
    } catch {
      operational('network-error', `network failure while fetching ${description}`);
    }
    if (response.status === 401) {
      operational('auth-failed', 'Figma returned 401 (bad token)');
    }
    if (response.status === 403) {
      operational(
        'auth-failed',
        'Figma returned 403 (token lacks permission for this file)',
      );
    }
    if (response.status === 429) {
      operational('rate-limited', 'Figma returned 429 (rate limit)');
    }
    if (response.status === 404) {
      operational('file-unavailable', 'Figma returned 404 (file unavailable)');
    }
    if (!response.ok) {
      operational(
        'network-error',
        `Figma returned ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  }

  return {
    async getFileMeta() {
      const data = (await request(
        `/v1/files/${fileKey}?depth=1`,
        'file metadata',
      )) as Record<string, unknown>;
      const { name, version, lastModified } = data;
      if (
        typeof name !== 'string' ||
        typeof version !== 'string' ||
        typeof lastModified !== 'string'
      ) {
        operational(
          'schema-incomplete',
          'file metadata response missing name/version/lastModified',
        );
      }
      return { fileKey: options.fileKey, name, version, lastModified };
    },

    async getWatchedNodes(ids) {
      const joined = ids.map((id) => encodeURIComponent(id)).join(',');
      const data = (await request(
        `/v1/files/${fileKey}/nodes?ids=${joined}`,
        'watched nodes',
      )) as Record<string, unknown>;
      const nodes = data.nodes;
      if (nodes === null || typeof nodes !== 'object' || Array.isArray(nodes)) {
        operational(
          'schema-incomplete',
          'nodes response missing the `nodes` map',
        );
      }
      return { ...(nodes as Record<string, unknown>) };
    },
  };
}
