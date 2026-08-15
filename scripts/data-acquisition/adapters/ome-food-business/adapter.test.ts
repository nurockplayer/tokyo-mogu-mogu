import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { utils, write } from 'xlsx';
import {
  normalizeOmeFoodBusinessRows,
  omeFoodBusinessAdapter,
  OME_FOOD_BUSINESS_SOURCE_ID,
  parseOmeFoodBusinessXlsx,
} from './adapter.ts';
import { sha256Hex } from '../../checksum.ts';
import { decodeText, splitCsv } from '../../csv.ts';
import type {
  CachedArtifact,
  NormalizeContext,
  RawRow,
  SourceManifest,
} from '../../types.ts';

const SNAPSHOT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  'snapshots',
  '132055_food_business_all.xlsx',
);

const SNAPSHOT = readFileSync(SNAPSHOT_PATH);
const BYTES = SNAPSHOT.buffer.slice(SNAPSHOT.byteOffset, SNAPSHOT.byteOffset + SNAPSHOT.byteLength);

const MANIFEST: SourceManifest = {
  id: OME_FOOD_BUSINESS_SOURCE_ID,
  provider: '青梅市地域経済部商工業振興課',
  url: 'https://www.opendata.metro.tokyo.lg.jp/ome/132055_food_business_all.xlsx',
  acquisitionType: 'http_file',
  datasetId: 't132055d0000000009',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132055d0000000009',
  format: 'xlsx',
  license: 'CC BY 4.0',
  adapterId: 'ome-food-business',
  credentialsRequired: false,
  sourceUpdatedAt: '2024-03-21T03:27:00',
};

const ARTIFACT: CachedArtifact = {
  manifestId: OME_FOOD_BUSINESS_SOURCE_ID,
  filePath: SNAPSHOT_PATH,
  size: SNAPSHOT.byteLength,
  checksum: sha256Hex(BYTES),
  downloaded: false,
  retrievedAt: '2026-08-15T00:00:00.000Z',
};

const CTX: NormalizeContext = { manifest: MANIFEST, artifact: ARTIFACT };

const HELPERS = { decodeText, parseCsv: splitCsv };

function parseAndNormalize() {
  const rows = omeFoodBusinessAdapter.parse(
    { bytes: BYTES, artifact: ARTIFACT, manifest: MANIFEST },
    HELPERS,
  );
  return omeFoodBusinessAdapter.normalize(rows, CTX);
}

/** Build a single-sheet XLSX artifact from raw AOA for invalid-input tests. */
function makeXlsx(headers: string[], dataRows: Array<Array<string | number>>): ArrayBuffer {
  const ws = utils.aoa_to_sheet([headers, ...dataRows]);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  return write(wb, { type: 'array' });
}

describe('ome-food-business adapter output contract', () => {
  it('parses the committed snapshot into 1593 records', () => {
    const rows = parseOmeFoodBusinessXlsx(BYTES);
    expect(rows.length).toBe(1593);
    const records = normalizeOmeFoodBusinessRows(rows, CTX);
    expect(records.length).toBe(1593);
  });

  it('produces records with the deterministic id and full provenance', () => {
    const [record] = parseAndNormalize();
    expect(record.id).toBe('ome-t132055d0000000009-132055E00001');
    expect(record.originalId).toBe('132055E00001');
    expect(record.provenance).toMatchObject({
      sourceId: OME_FOOD_BUSINESS_SOURCE_ID,
      provider: '青梅市地域経済部商工業振興課',
      datasetId: 't132055d0000000009',
      artifactUrl: 'https://www.opendata.metro.tokyo.lg.jp/ome/132055_food_business_all.xlsx',
      license: 'CC BY 4.0',
      retrievedAt: '2026-08-15T00:00:00.000Z',
      sourceUpdatedAt: '2024-03-21T03:27:00',
    });
    expect(record.provenance.artifact.checksum).toEqual(sha256Hex(BYTES));
    expect(record.provenance.artifact.size).toBe(SNAPSHOT.byteLength);
    expect(record.data).toMatchObject({
      facilityNameJa: '塩船観音寺売店',
      businessType: '飲食店営業(一般飲食店)',
      localGovernmentName: '青梅市',
      address: '東京都青梅市塩船194',
      prefecture: '東京都',
      city: '青梅市',
      town: '塩船',
      postalCode: '1980011',
      corporateName: '宗教法人 観音寺',
      applicationType: '新規',
    });
    // Numeric source cells are preserved (serial dates stay raw — 44698 = 2022-05-17).
    expect(record.data.latitude).toBeCloseTo(35.803665, 6);
    expect(record.data.longitude).toBeCloseTo(139.281718, 6);
    expect(record.data.firstPermitDate).toBe(44698);
  });

  it('preserves original business ids as originalId and keeps ids unique', () => {
    const records = parseAndNormalize();
    const ids = records.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[1]).toBe('ome-t132055d0000000009-132055E00002');
    expect(ids[2]).toBe('ome-t132055d0000000009-132055E00003');
    const soba = records.find((r) => r.data.facilityNameJa === 'そば処 もとはし');
    expect(soba?.data.applicationType).toBe('更新');
  });

  it('carries the license-listing honesty boundary (no inferred operation / no invented fields)', () => {
    const records = parseAndNormalize();
    // A blank 廃業年月日 is NOT evidence of operation — every record here has it blank.
    expect(records.every((r) => r.data.closureDate === undefined)).toBe(true);
    // 業態 is a real source column but is unpopulated in every record — stays absent.
    expect(records.every((r) => r.data.operationCategory === undefined)).toBe(true);
    // 許可年月日 / 許可開始日 / 許可満了日 are also blank across the whole snapshot.
    expect(records.every((r) => r.data.permitDate === undefined)).toBe(true);
    expect(records.every((r) => r.data.permitStartDate === undefined)).toBe(true);
    expect(records.every((r) => r.data.permitExpiryDate === undefined)).toBe(true);
    // 初回許可年月日 is populated for 1231 of 1593 (Excel serial dates preserved raw).
    const withFirstPermit = records.filter((r) => r.data.firstPermitDate !== undefined).length;
    expect(withFirstPermit).toBe(1231);
  });

  it('is deterministic and idempotent', () => {
    expect(parseAndNormalize()).toEqual(parseAndNormalize());
  });
});

describe('ome-food-business invalid / missing source handling', () => {
  it('rejects a corrupt / empty byte input loudly (never silent)', () => {
    // SheetJS maps zero bytes to a default empty sheet, which has no data
    // rows — the adapter rejects it with a clear message instead of
    // producing zero silent records.
    expect(() => parseOmeFoodBusinessXlsx(new ArrayBuffer(0))).toThrow(
      'empty XLSX artifact',
    );
  });

  it('rejects an XLSX whose sheet has no data rows loudly', () => {
    const bytes = makeXlsx(['ID', '施設名称', '営業の種類'], []);
    expect(() => parseOmeFoodBusinessXlsx(bytes)).toThrow('empty XLSX artifact');
  });

  it('rejects an artifact missing a required column with a clear message', () => {
    const bytes = makeXlsx(['A', 'B'], [['x', 'y']]);
    expect(() => parseOmeFoodBusinessXlsx(bytes)).toThrow('Missing expected column: ID');
  });

  it('rejects a row missing the required values instead of silently dropping it', () => {
    const noName: RawRow = { ID: '132055E99999', 施設名称: undefined };
    expect(() => normalizeOmeFoodBusinessRows([noName], CTX)).toThrow('missing 施設名称');
    const noId: RawRow = { ID: undefined, 施設名称: '店名なし' };
    expect(() => normalizeOmeFoodBusinessRows([noId], CTX)).toThrow('missing ID');
  });

  it('treats a malformed coordinate cell as absent rather than inventing a value', () => {
    const row: RawRow = {
      ID: '132055E99999',
      施設名称: '座標不明の店',
      緯度: 'not-a-number',
      経度: '',
    };
    const [record] = normalizeOmeFoodBusinessRows([row], CTX);
    expect(record.data.latitude).toBeUndefined();
    expect(record.data.longitude).toBeUndefined();
  });
});
