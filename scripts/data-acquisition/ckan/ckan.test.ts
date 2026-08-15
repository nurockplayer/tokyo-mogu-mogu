import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  ckanPackageSearch,
  ckanPackageShow,
  ckanResourceShow,
  DEFAULT_PREFERRED_FORMATS,
  selectBestResource,
} from './ckan.ts';
import type { CkanFetcher, CkanResource } from './ckan.ts';

const BASE = 'https://catalog.data.metro.tokyo.lg.jp/api/3/action/';

const FIXTURE_DIR = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
const SEARCH_FIXTURE = JSON.parse(
  readFileSync(join(FIXTURE_DIR, 'package_search_bunkazai.json'), 'utf8'),
);
const SHOW_FIXTURE = JSON.parse(
  readFileSync(join(FIXTURE_DIR, 'package_show_t000021d0000000017.json'), 'utf8'),
);

/** In-memory fetcher that returns a canned CKAN envelope for any URL. */
function envelopeFetcher(envelope: unknown): CkanFetcher {
  return async () => new Response(JSON.stringify(envelope), { status: 200 });
}

describe('ckanPackageSearch', () => {
  it('parses a package_search response into the result list', async () => {
    const packages = await ckanPackageSearch(BASE, '文化財', {
      fetcher: envelopeFetcher(SEARCH_FIXTURE),
    });
    expect(packages).toHaveLength(2);
    const [first] = packages;
    expect(first.id).toBe('a767e032-8dfa-4973-93af-66603150d871');
    expect(first.title).toBe('文化財');
    expect(first.license_title).toBe('クリエイティブ・コモンズ 表示（CC BY）');
    expect(first.metadata_modified).toBe('2025-12-12T08:23:15.981773');
    expect(first.resources).toHaveLength(8);
    expect(first.resources[0].url).toBe(
      'https://www.opendata.metro.tokyo.lg.jp/shinagawa/bunkazai_tosyo.csv',
    );
  });
});

describe('ckanPackageShow', () => {
  it('preserves dataset and resource ids from a package_show response', async () => {
    const pkg = await ckanPackageShow(BASE, 't000021d0000000017', {
      fetcher: envelopeFetcher(SHOW_FIXTURE),
    });
    expect(pkg.id).toBe('445ee18d-ee49-4659-9667-de8630bd0d0e');
    expect(pkg.name).toBe('t000021d0000000017');
    expect(pkg.title).toBe('文化財一覧');
    expect(pkg.license_title).toBe('クリエイティブ・コモンズ 表示（CC BY）');
    expect(pkg.metadata_modified).toBe('2025-12-12T07:32:32.936608');
    expect(pkg.notes).toContain('東京都指定文化財');
    expect(pkg.resources).toHaveLength(1);
    const [resource] = pkg.resources;
    expect(resource.id).toBe('25c5e6f7-0f8d-44d8-ac37-127e008f7a69');
    expect(resource.name).toBe('文化財一覧');
    expect(resource.format).toBe('CSV');
    expect(resource.url).toBe(
      'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
    );
    expect(resource.last_modified).toBeNull();
  });
});

describe('ckanResourceShow', () => {
  it('returns the resource metadata for a resource id', async () => {
    const { result } = SHOW_FIXTURE as { result: { resources: CkanResource[] } };
    const [resource] = result.resources;
    const shown = await ckanResourceShow(BASE, resource.id, {
      fetcher: envelopeFetcher({ success: true, result: resource }),
    });
    expect(shown.id).toBe(resource.id);
    expect(shown.url).toBe(
      'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
    );
  });
});

describe('selectBestResource', () => {
  const csvNew: CkanResource = {
    id: 'r-new-csv',
    name: 'new csv',
    format: 'CSV',
    url: 'https://example.test/new.csv',
    last_modified: '2025-01-01T00:00:00Z',
  };
  const csvOld: CkanResource = {
    id: 'r-old-csv',
    name: 'old csv',
    format: 'csv',
    url: 'https://example.test/old.csv',
    last_modified: '2020-01-01T00:00:00Z',
  };
  const xlsxNew: CkanResource = {
    id: 'r-xlsx',
    name: 'xlsx',
    format: 'xlsx',
    url: 'https://example.test/data.xlsx',
    last_modified: '2025-06-01T00:00:00Z',
  };
  const json: CkanResource = {
    id: 'r-json',
    name: 'json',
    format: 'json',
    url: 'https://example.test/data.json',
    last_modified: '2025-03-01T00:00:00Z',
  };
  const zip: CkanResource = {
    id: 'r-zip',
    name: 'zip',
    format: 'ZIP',
    url: 'https://example.test/data.zip',
    last_modified: null,
  };
  const pdf: CkanResource = {
    id: 'r-pdf',
    name: 'pdf doc',
    format: 'PDF',
    url: 'https://example.test/doc.pdf',
    last_modified: '2026-01-01T00:00:00Z',
  };

  it('prefers a higher-ranked format over recency when formats differ', () => {
    // csv ranks before xlsx in the default list, so the older CSV wins.
    expect(selectBestResource([xlsxNew, csvOld], DEFAULT_PREFERRED_FORMATS)?.id).toBe('r-old-csv');
  });

  it('prefers the most recent resource within the same format', () => {
    expect(selectBestResource([csvOld, csvNew])?.id).toBe('r-new-csv');
  });

  it('honors a custom preferred-format order', () => {
    expect(selectBestResource([csvNew, xlsxNew, json], ['xlsx', 'csv', 'json'])?.id).toBe('r-xlsx');
  });

  it('filters out formats that are not preferred', () => {
    expect(selectBestResource([pdf])).toBeUndefined();
    expect(selectBestResource([pdf, csvNew])?.id).toBe('r-new-csv');
  });

  it('is deterministic and stable across re-runs and input orders', () => {
    const mixed = [zip, csvOld, json, csvNew, xlsxNew, pdf];
    const once = selectBestResource(mixed);
    expect(once?.id).toBe('r-new-csv');
    for (let i = 0; i < 5; i++) expect(selectBestResource(mixed)).toEqual(once);
    // Reversing the input order still selects the same winner.
    expect(selectBestResource([...mixed].reverse())).toEqual(once);
  });

  it('returns undefined when no resource matches a preferred format', () => {
    expect(selectBestResource([pdf, { ...xlsxNew, format: 'doc' }])).toBeUndefined();
  });
});

describe('fetch failure handling', () => {
  it('fails loudly on a non-OK HTTP response', async () => {
    const fetcher: CkanFetcher = async () => new Response('server error', { status: 500 });
    await expect(ckanPackageShow(BASE, 't000021d0000000017', { fetcher })).rejects.toThrow(
      'HTTP 500',
    );
  });

  it('fails loudly on a non-JSON response body', async () => {
    const fetcher: CkanFetcher = async () => new Response('not json', { status: 200 });
    await expect(ckanPackageShow(BASE, 't000021d0000000017', { fetcher })).rejects.toThrow(
      'non-JSON',
    );
  });

  it('fails loudly when the CKAN envelope reports failure', async () => {
    const fetcher: CkanFetcher = async () =>
      new Response(JSON.stringify({ success: false, error: { __type: 'Not Found' } }), {
        status: 200,
      });
    await expect(ckanPackageSearch(BASE, '文化財', { fetcher })).rejects.toThrow(
      'failure response',
    );
  });
});
