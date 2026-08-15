import { readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { culturalPropertyAdapter } from './adapters/cultural-property/adapter.ts';
import { CULTURAL_PROPERTY_SOURCE } from './manifest.ts';
import { renderReport, runSync } from './sync.ts';
import type { SourceManifest } from './types.ts';

let tempRoots: string[] = [];

async function tempCacheRoot(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'tmm-acquisition-'));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(tempRoots.map((root) => rm(root, { recursive: true, force: true })));
  tempRoots = [];
});

// Deterministic stub artifact: the committed CP932 cultural-property snapshot
// (no network, byte-stable across runs).
const SNAPSHOT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  'adapters',
  'cultural-property',
  'snapshots',
  '130001_cultural_property.csv',
);
const SNAPSHOT = readFileSync(SNAPSHOT_PATH);
const STUB_FETCH: () => Promise<ArrayBuffer> = async () =>
  SNAPSHOT.buffer.slice(SNAPSHOT.byteOffset, SNAPSHOT.byteOffset + SNAPSHOT.byteLength);

describe('runSync', () => {
  it('acquires and normalizes a source end to end', async () => {
    const cacheRoot = await tempCacheRoot();
    const report = await runSync([CULTURAL_PROPERTY_SOURCE], {
      cacheRoot,
      fetcher: STUB_FETCH,
      now: () => '2026-08-15T12:00:00.000Z',
    });
    expect(report.runAt).toBe('2026-08-15T12:00:00.000Z');
    expect(report.sources).toHaveLength(1);
    expect(report.sources[0]).toMatchObject({
      sourceId: 'tokyo-designated-cultural-property',
      status: 'ok',
      recordCount: 245,
    });
    expect(report.sources[0].artifact).toMatchObject({
      downloaded: true,
      retrievedAt: '2026-08-15T12:00:00.000Z',
    });
  });

  it('is idempotent: an unchanged artifact is a no-op that keeps its retrieval time', async () => {
    const cacheRoot = await tempCacheRoot();
    const first = await runSync([CULTURAL_PROPERTY_SOURCE], {
      cacheRoot,
      fetcher: STUB_FETCH,
      now: () => '2026-08-15T12:00:00.000Z',
    });
    const second = await runSync([CULTURAL_PROPERTY_SOURCE], {
      cacheRoot,
      fetcher: STUB_FETCH,
      now: () => '2026-08-15T13:00:00.000Z',
    });
    expect(first.sources[0].artifact).toMatchObject({ downloaded: true, retrievedAt: '2026-08-15T12:00:00.000Z' });
    expect(second.sources[0].artifact).toMatchObject({ downloaded: false, retrievedAt: '2026-08-15T12:00:00.000Z' });
  });

  it('isolates a malformed source instead of poisoning other sources', async () => {
    const cacheRoot = await tempCacheRoot();
    const brokenSource: SourceManifest = {
      ...CULTURAL_PROPERTY_SOURCE,
      id: 'broken-source',
      adapterId: 'no-such-adapter',
      url: 'https://example.invalid/broken.csv',
      cachePath: 'broken/broken.csv',
    };
    const report = await runSync([CULTURAL_PROPERTY_SOURCE, brokenSource], {
      cacheRoot,
      fetcher: STUB_FETCH,
      adapters: [culturalPropertyAdapter],
      now: () => '2026-08-15T12:00:00.000Z',
    });
    expect(report.sources.map((s) => s.status)).toEqual(['ok', 'error']);
    const broken = report.sources[1];
    expect(broken.status).toBe('error');
    expect(broken.error).toContain('no adapter registered');
    // The healthy source is unaffected.
    expect(report.sources[0].recordCount).toBe(245);
  });
});

describe('renderReport', () => {
  it('renders a concise per-source report', async () => {
    const cacheRoot = await tempCacheRoot();
    const report = await runSync([CULTURAL_PROPERTY_SOURCE], {
      cacheRoot,
      fetcher: STUB_FETCH,
      now: () => '2026-08-15T12:00:00.000Z',
    });
    const text = renderReport(report);
    expect(text).toContain('[data:sync] 2026-08-15T12:00:00.000Z');
    expect(text).toContain('[ok] tokyo-designated-cultural-property');
    expect(text).toContain('245 records');
    expect(text).toContain('1/1 sources ok');
  });
});
