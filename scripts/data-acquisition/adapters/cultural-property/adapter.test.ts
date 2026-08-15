import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  culturalPropertyAdapter,
  CULTURAL_PROPERTY_SOURCE_ID,
  normalizeCulturalPropertyRows,
  parseCulturalPropertyCsv,
} from './adapter.ts';
import { sha256Hex } from '../../checksum.ts';
import { decodeText, splitCsv } from '../../csv.ts';
import { CULTURAL_PROPERTY_SOURCE } from '../../manifest.ts';
import type { CachedArtifact, NormalizeContext, RawRow } from '../../types.ts';

const SNAPSHOT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  'snapshots',
  '130001_cultural_property.csv',
);

const SNAPSHOT = readFileSync(SNAPSHOT_PATH);
const BYTES = SNAPSHOT.buffer.slice(SNAPSHOT.byteOffset, SNAPSHOT.byteOffset + SNAPSHOT.byteLength);

const ARTIFACT: CachedArtifact = {
  manifestId: CULTURAL_PROPERTY_SOURCE_ID,
  filePath: SNAPSHOT_PATH,
  size: SNAPSHOT.byteLength,
  checksum: sha256Hex(BYTES),
  downloaded: false,
  retrievedAt: '2026-08-15T00:00:00.000Z',
};

const CTX: NormalizeContext = { manifest: CULTURAL_PROPERTY_SOURCE, artifact: ARTIFACT };

const HELPERS = { decodeText, parseCsv: splitCsv };

function parseAndNormalize() {
  const rows = culturalPropertyAdapter.parse(
    { bytes: BYTES, artifact: ARTIFACT, manifest: CULTURAL_PROPERTY_SOURCE },
    HELPERS,
  );
  return culturalPropertyAdapter.normalize(rows, CTX);
}

describe('cultural-property adapter output contract', () => {
  it('parses the committed snapshot into 245 valid records (blank rows filtered)', () => {
    const rows = parseCulturalPropertyCsv(decodeText(BYTES, 'cp932'));
    // The artifact carries 248 record lines of which 3 are fully blank
    // trailing rows; the parser drops them (research #130 C1 also reports
    // 245 records with coordinates + English names).
    expect(rows.length).toBe(245);
    const records = normalizeCulturalPropertyRows(rows, CTX);
    expect(records.length).toBe(245);
  });

  it('produces records with the deterministic id and full provenance', () => {
    const [record] = parseAndNormalize();
    expect(record.id).toBe('cp-t000021d0000000017-0000000001');
    expect(record.originalId).toBe('0000000001');
    expect(record.provenance).toMatchObject({
      sourceId: 'tokyo-designated-cultural-property',
      provider: '東京都教育庁',
      datasetId: 't000021d0000000017',
      artifactUrl: 'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
      license: 'CC BY 4.0',
      retrievedAt: '2026-08-15T00:00:00.000Z',
    });
    expect(record.provenance.artifact.checksum).toEqual(sha256Hex(BYTES));
    expect(record.provenance.artifact.size).toBe(SNAPSHOT.byteLength);
    expect(record.data).toMatchObject({
      classification: '都指定文化財',
      nameJa: '湯島天満宮表鳥居',
      nameEn: 'Yushima-tenmangu Omote Torii (Front Shrine Gate of Yushima-tenmangu Shrine)',
      address: '東京都文京区湯島3-30-1',
    });
    expect(record.data.latitude).toBeCloseTo(35.707771, 6);
    expect(record.data.longitude).toBeCloseTo(139.768204, 6);
  });

  it('keeps coordinate / english coverage consistent with the source', () => {
    const records = parseAndNormalize();
    const withLat = records.filter((r) => r.data.latitude !== undefined);
    const withLon = records.filter((r) => r.data.longitude !== undefined);
    const withEn = records.filter((r) => r.data.nameEn !== undefined);
    // Every valid record has a latitude and an English name. Exactly one
    // source row (下宅部遺跡) has a malformed longitude cell (", 139.451301")
    // which the adapter treats as absent instead of inferring — 244 not 245.
    expect(withLat.length).toBe(245);
    expect(withLon.length).toBe(244);
    expect(withEn.length).toBe(245);
    const shimoyakebe = records.find((r) => r.originalId === '0000000246');
    expect(shimoyakebe?.data.latitude).toBeCloseTo(35.76625, 5);
    expect(shimoyakebe?.data.longitude).toBeUndefined();
  });

  it('is deterministic and idempotent', () => {
    expect(parseAndNormalize()).toEqual(parseAndNormalize());
    const ids = parseAndNormalize().map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('cultural-property invalid / missing source handling', () => {
  it('rejects an empty artifact loudly', () => {
    expect(() => parseCulturalPropertyCsv('')).toThrow('empty CSV artifact');
  });

  it('rejects an artifact missing a required column with a clear message', () => {
    expect(() => parseCulturalPropertyCsv('a,b,c\n1,2,3\n')).toThrow('Missing expected column: 名称');
  });

  it('rejects a row missing a required value instead of silently dropping it', () => {
    const badRow: RawRow = { 名称: 'ある文化財', 文化財分類: undefined };
    expect(() => normalizeCulturalPropertyRows([badRow], CTX)).toThrow('missing 文化財分類');
    const badName: RawRow = { 名称: undefined, 文化財分類: '都指定文化財' };
    expect(() => normalizeCulturalPropertyRows([badName], CTX)).toThrow('missing 名称');
  });

  it('treats non-numeric coordinates as absent rather than inventing a value', () => {
    const row: RawRow = {
      名称: '座標不明の文化財',
      文化財分類: '都指定文化財',
      緯度: 'not-a-number',
      経度: '',
    };
    const [record] = normalizeCulturalPropertyRows([row], CTX);
    expect(record.data.latitude).toBeUndefined();
    expect(record.data.longitude).toBeUndefined();
  });
});
