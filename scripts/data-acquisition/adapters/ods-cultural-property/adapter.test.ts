import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { sha256Hex } from '../../checksum.ts';
import { decodeText, splitCsv } from '../../csv.ts';
import {
  CULTURAL_PROPERTY_SOURCE,
  HACHIOJI_CULTURAL_PROPERTY_SOURCE,
  KUNITACHI_CULTURAL_PROPERTY_SOURCE,
} from '../../manifest.ts';
import type { CachedArtifact, NormalizeContext, RawRow, SourceManifest } from '../../types.ts';
import {
  normalizeOdsCulturalPropertyRows,
  odsCulturalPropertyAdapter,
  parseOdsCulturalPropertyCsv,
} from './adapter.ts';
import { resolveOdsCulturalPropertyConfig } from './config.ts';

const SNAPSHOT_DIR = join(dirname(fileURLToPath(import.meta.url)), 'snapshots');

function readSnapshot(name: string) {
  const buf = readFileSync(join(SNAPSHOT_DIR, name));
  const bytes = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return { bytes, size: buf.byteLength, checksum: sha256Hex(bytes) };
}

function makeArtifact(manifestId: string, filePath: string, snapshotName: string): CachedArtifact {
  const { size, checksum } = readSnapshot(snapshotName);
  return { manifestId, filePath, size, checksum, downloaded: false, retrievedAt: '2026-08-15T00:00:00.000Z' };
}

const HELPERS = { decodeText, parseCsv: splitCsv };

/** Parse + normalize a committed snapshot through the real adapter (no network). */
function normalizeSnapshot(manifest: SourceManifest, snapshotName: string) {
  const { bytes } = readSnapshot(snapshotName);
  const artifact = makeArtifact(manifest.id, join(SNAPSHOT_DIR, snapshotName), snapshotName);
  const rows = odsCulturalPropertyAdapter.parse({ bytes, artifact, manifest }, HELPERS);
  return odsCulturalPropertyAdapter.normalize(rows, { manifest, artifact });
}

/** The three configured ODS 文化財一覧 sources: one metro + two municipalities. */
const SOURCES: { manifest: SourceManifest; snapshot: string; count: number }[] = [
  {
    manifest: CULTURAL_PROPERTY_SOURCE,
    snapshot: '130001_cultural_property.csv',
    count: 245,
  },
  {
    manifest: KUNITACHI_CULTURAL_PROPERTY_SOURCE,
    snapshot: '132152_cultural_property.csv',
    count: 122,
  },
  {
    manifest: HACHIOJI_CULTURAL_PROPERTY_SOURCE,
    snapshot: '132012_cultural_property.xlsx',
    count: 258,
  },
];

describe('reusable ODS cultural-property adapter — one shared path across sources', () => {
  it('normalizes all three real sources with the expected record counts', () => {
    for (const { manifest, snapshot, count } of SOURCES) {
      const records = normalizeSnapshot(manifest, snapshot);
      expect(records.length, `${manifest.id} record count`).toBe(count);
    }
  });

  it('preserves provenance, dataset id, and original id per source', () => {
    const tokyo = normalizeSnapshot(CULTURAL_PROPERTY_SOURCE, '130001_cultural_property.csv');
    expect(tokyo[0]).toMatchObject({
      id: 'cp-t000021d0000000017-0000000001',
      originalId: '0000000001',
      provenance: {
        sourceId: 'tokyo-designated-cultural-property',
        provider: '東京都教育庁',
        datasetId: 't000021d0000000017',
        artifactUrl:
          'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
        license: 'CC BY 4.0',
        retrievedAt: '2026-08-15T00:00:00.000Z',
      },
    });

    const kunitachi = normalizeSnapshot(
      KUNITACHI_CULTURAL_PROPERTY_SOURCE,
      '132152_cultural_property.csv',
    );
    expect(kunitachi[0]).toMatchObject({
      id: 'cp-t132152d0000000014-132152100001',
      originalId: '132152100001',
      provenance: {
        sourceId: 'kunitachi-cultural-property',
        provider: '国立市',
        datasetId: 't132152d0000000014',
        license: 'CC BY 4.0',
      },
    });

    const hachioji = normalizeSnapshot(
      HACHIOJI_CULTURAL_PROPERTY_SOURCE,
      '132012_cultural_property.xlsx',
    );
    expect(hachioji[0]).toMatchObject({
      id: 'cp-t132012d3000000018-0000000001',
      originalId: '0000000001',
      provenance: {
        sourceId: 'hachioji-cultural-property',
        provider: '八王子市',
        datasetId: 't132012d3000000018',
        license: 'CC BY 4.0',
      },
    });
  });

  it('absorbs per-municipality column differences through config, not parser forks', () => {
    // 国立市 (new ODS Ver1.5): joined address + 建物名等(方書) mapping.
    const kunitachi = normalizeSnapshot(
      KUNITACHI_CULTURAL_PROPERTY_SOURCE,
      '132152_cultural_property.csv',
    );
    expect(kunitachi[0].data).toMatchObject({
      nameJa: '木造獅子狛犬',
      classification: '重要文化財',
      category: '彫刻',
      address: '東京都国立市谷保5209',
      placeName: '谷保天満宮',
    });
    expect(kunitachi[0].data.latitude).toBeCloseTo(35.679363, 6);
    expect(kunitachi[0].data.longitude).toBeCloseTo(139.44395, 6);

    // 八王子市 (old ODS): split 住所 + 方書 mapping and swapped lat/lon.
    const hachioji = normalizeSnapshot(
      HACHIOJI_CULTURAL_PROPERTY_SOURCE,
      '132012_cultural_property.xlsx',
    );
    expect(hachioji[0].data).toMatchObject({
      nameJa: '船田石器時代遺跡',
      classification: '国指定史跡',
      address: '東京都八王子市長房町360の一部',
    });
    // Source stores 経度 in the 緯度 column; the config-driven swap restores
    // correct hemisphere values (verified on all filled rows, 2026-08-15).
    const tree = hachioji.find((r) => r.data.nameJa === '横山事務所のオオツクバネガシ');
    expect(tree?.data.latitude).toBeCloseTo(35.651054, 6);
    expect(tree?.data.longitude).toBeCloseTo(139.30034, 6);
  });

  it('leaves fields the source does not carry undefined (never invents facts)', () => {
    // 国立市 / 八王子市 have no 最終確認日 column; 名称_英語 is empty in both.
    for (const { manifest, snapshot } of SOURCES) {
      if (manifest.id === CULTURAL_PROPERTY_SOURCE.id) continue;
      const records = normalizeSnapshot(manifest, snapshot);
      for (const record of records) {
        expect(record.data.lastConfirmedOn, `${manifest.id} lastConfirmedOn`).toBeUndefined();
      }
    }
    const kunitachi = normalizeSnapshot(
      KUNITACHI_CULTURAL_PROPERTY_SOURCE,
      '132152_cultural_property.csv',
    );
    // 国立市 carries 名称_英語 only for 2 of 122 records; the rest stay undefined.
    const withEn = kunitachi.filter((r) => r.data.nameEn !== undefined);
    expect(withEn.map((r) => r.data.nameJa).sort()).toEqual(['三田氏館跡', '伊藤単朴の墓']);
    expect(kunitachi.filter((r) => r.data.nameEn === undefined).length).toBe(120);
    // The metro source carries the column; the adapter preserves the raw value
    // (a source confirmation date, not a freshness claim).
    const tokyo = normalizeSnapshot(CULTURAL_PROPERTY_SOURCE, '130001_cultural_property.csv');
    expect(tokyo[0].data.lastConfirmedOn).toBe('2019-03-29');
  });

  it('is deterministic and idempotent with unique ids across all sources', () => {
    for (const { manifest, snapshot } of SOURCES) {
      const a = normalizeSnapshot(manifest, snapshot);
      const b = normalizeSnapshot(manifest, snapshot);
      expect(a, `${manifest.id} determinism`).toEqual(b);
      const ids = a.map((r) => r.id);
      expect(new Set(ids).size, `${manifest.id} unique ids`).toBe(ids.length);
    }
  });
});

describe('reusable ODS cultural-property adapter — invalid / missing source handling', () => {
  const tokyoConfig = resolveOdsCulturalPropertyConfig(CULTURAL_PROPERTY_SOURCE.id);
  const artifact = makeArtifact(
    CULTURAL_PROPERTY_SOURCE.id,
    join(SNAPSHOT_DIR, '130001_cultural_property.csv'),
    '130001_cultural_property.csv',
  );
  const CTX: NormalizeContext = { manifest: CULTURAL_PROPERTY_SOURCE, artifact };

  it('rejects an empty artifact loudly', () => {
    expect(() => parseOdsCulturalPropertyCsv('', tokyoConfig)).toThrow('empty CSV artifact');
  });

  it('rejects an artifact missing a required column with a clear message', () => {
    expect(() => parseOdsCulturalPropertyCsv('a,b,c\n1,2,3\n', tokyoConfig)).toThrow(
      'Missing expected column: 名称',
    );
  });

  it('rejects a row missing a required value instead of silently dropping it', () => {
    const badRow: RawRow = { 名称: 'ある文化財', 文化財分類: undefined };
    expect(() => normalizeOdsCulturalPropertyRows([badRow], CTX, tokyoConfig)).toThrow(
      'missing 文化財分類',
    );
    const badName: RawRow = { 名称: undefined, 文化財分類: '都指定文化財' };
    expect(() => normalizeOdsCulturalPropertyRows([badName], CTX, tokyoConfig)).toThrow(
      'missing 名称',
    );
  });

  it('treats non-numeric coordinates as absent rather than inventing a value', () => {
    const row: RawRow = {
      名称: '座標不明の文化財',
      文化財分類: '都指定文化財',
      緯度: 'not-a-number',
      経度: '',
    };
    const [record] = normalizeOdsCulturalPropertyRows([row], CTX, tokyoConfig);
    expect(record.data.latitude).toBeUndefined();
    expect(record.data.longitude).toBeUndefined();
  });

  it('fails loudly for a source without a registered config', () => {
    expect(() => resolveOdsCulturalPropertyConfig('no-such-source')).toThrow(
      'no config registered for source "no-such-source"',
    );
  });

  it('keeps a malformed optional cell absent in the migrated metro source (regression)', () => {
    const records = normalizeSnapshot(CULTURAL_PROPERTY_SOURCE, '130001_cultural_property.csv');
    const shimoyakebe = records.find((r) => r.originalId === '0000000246');
    expect(shimoyakebe?.data.latitude).toBeCloseTo(35.76625, 5);
    expect(shimoyakebe?.data.longitude).toBeUndefined();
  });
});
