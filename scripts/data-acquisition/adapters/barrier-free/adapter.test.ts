import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  barrierFreeAdapter,
  BARRIER_FREE_SOURCE_ID,
  normalizeBarrierFreeRows,
  parseBarrierFreeCsv,
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
  'barrier-free-guide.csv',
);

const SNAPSHOT = readFileSync(SNAPSHOT_PATH);
const BYTES = SNAPSHOT.buffer.slice(SNAPSHOT.byteOffset, SNAPSHOT.byteOffset + SNAPSHOT.byteLength);

const MANIFEST: SourceManifest = {
  id: BARRIER_FREE_SOURCE_ID,
  provider: '東京都産業労働局観光部受入環境課',
  url: 'https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/barrier-free-guide.csv',
  acquisitionType: 'http_file' as const,
  datasetId: 't000012d0000000063',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t000012d0000000063',
  format: 'csv',
  encoding: 'cp932',
  license: 'CC BY 4.0',
  adapterId: 'barrier-free',
  credentialsRequired: false,
  sourceUpdatedAt: '2024-03-12T08:00:00',
};

const ARTIFACT: CachedArtifact = {
  manifestId: BARRIER_FREE_SOURCE_ID,
  filePath: SNAPSHOT_PATH,
  size: SNAPSHOT.byteLength,
  checksum: sha256Hex(BYTES),
  downloaded: false,
  retrievedAt: '2026-08-15T00:00:00.000Z',
};

const CTX: NormalizeContext = { manifest: MANIFEST, artifact: ARTIFACT };

const HELPERS = { decodeText, parseCsv: splitCsv };

function parseAndNormalize() {
  const rows = barrierFreeAdapter.parse(
    { bytes: BYTES, artifact: ARTIFACT, manifest: MANIFEST },
    HELPERS,
  );
  return barrierFreeAdapter.normalize(rows, CTX);
}

describe('barrier-free adapter output contract', () => {
  it('parses the committed snapshot into 210 records', () => {
    const rows = parseBarrierFreeCsv(decodeText(BYTES, 'cp932'));
    expect(rows.length).toBe(210);
    const records = normalizeBarrierFreeRows(rows, CTX);
    expect(records.length).toBe(210);
  });

  it('produces records with the deterministic id and full provenance', () => {
    const [record] = parseAndNormalize();
    expect(record.id).toBe('bf-t000012d0000000063-1');
    expect(record.originalId).toBe('1');
    expect(record.provenance).toMatchObject({
      sourceId: BARRIER_FREE_SOURCE_ID,
      provider: '東京都産業労働局観光部受入環境課',
      datasetId: 't000012d0000000063',
      artifactUrl: 'https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/barrier-free-guide.csv',
      license: 'CC BY 4.0',
      retrievedAt: '2026-08-15T00:00:00.000Z',
      sourceUpdatedAt: '2024-03-12T08:00:00',
    });
    expect(record.provenance.artifact.checksum).toEqual(sha256Hex(BYTES));
    expect(record.provenance.artifact.size).toBe(SNAPSHOT.byteLength);
    expect(record.data).toMatchObject({
      nameJa: 'TOKYO STATION BUFFET 馳走三昧 大丸東京店',
      phoneNumber: '03-6895-2858',
      address: '東京都千代田区丸の内1-9-1 大丸東京店 12F',
      businessHours: 'ランチ11:00~16:00(LO15:30)ディナー16:00~22:00(LO21:00)',
      regularHolidays: '定休日無し',
      access: 'JR・地下鉄「東京」直結',
      url: 'https://tabelog.com/tokyo/A1302/A130201/13146400/',
    });
    // The source marks `〇` for these; others are blank (unknown → undefined).
    expect(record.data.accessibility.entranceWidth80cmPlus).toBe(true);
    expect(record.data.accessibility.wheelchairToiletOrOstomate).toBe(true);
    expect(record.data.accessibility.allergyResponseOnRequest).toBe(true);
    expect(record.data.accessibility.photoMenu).toBeUndefined();
    expect(record.data.accessibility.brailleMenu).toBeUndefined();
    expect(record.data.accessibility.signLanguageStaff).toBeUndefined();
    expect(record.data.accessibility.halalOnRequest).toBeUndefined();
  });

  it('keeps flag coverage consistent with the source (blank is unknown, not no)', () => {
    const records = parseAndNormalize();
    const flagged = (key: 'entranceWidth80cmPlus' | 'brailleMenu' | 'signLanguageStaff') =>
      records.filter((r) => r.data.accessibility[key] === true).length;
    // From the live source: 入口幅 192/210 marked, 点字メニュー 1/210, 手話 4/210.
    expect(flagged('entranceWidth80cmPlus')).toBe(192);
    expect(flagged('brailleMenu')).toBe(1);
    expect(flagged('signLanguageStaff')).toBe(4);
    // No record ever carries `false` — blanks are absent, never "no".
    expect(
      records.some((r) =>
        Object.values(r.data.accessibility).some((v) => v === false),
      ),
    ).toBe(false);
  });

  it('is deterministic and idempotent', () => {
    expect(parseAndNormalize()).toEqual(parseAndNormalize());
    const ids = parseAndNormalize().map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('barrier-free invalid / missing source handling', () => {
  it('rejects an empty artifact loudly', () => {
    expect(() => parseBarrierFreeCsv('')).toThrow('empty CSV artifact');
  });

  it('rejects an artifact missing a required column with a clear message', () => {
    expect(() => parseBarrierFreeCsv('a,b,c\n1,2,3\n')).toThrow('Missing expected column: 店名');
  });

  it('rejects a row missing the required value instead of silently dropping it', () => {
    const badRow: RawRow = { 店名: undefined };
    expect(() => normalizeBarrierFreeRows([badRow], CTX)).toThrow('missing 店名');
  });

  it('treats a non-〇 flag marker as unknown rather than asserting "no"', () => {
    const row: RawRow = {
      店名: '座標不明の店',
      入口幅が80cm以上である: '×',
      写真メニューがある: '',
    };
    const [record] = normalizeBarrierFreeRows([row], CTX);
    expect(record.data.accessibility.entranceWidth80cmPlus).toBeUndefined();
    expect(record.data.accessibility.photoMenu).toBeUndefined();
  });

  it('preserves raw hours strings without parsing them into open/closed state', () => {
    const row: RawRow = {
      店名: '時間不明の店',
      営業時間: 'ランチ11:00~16:00(LO15:30)ディナー16:00~22:00(LO21:00)',
      定休日: '定休日無し',
    };
    const [record] = normalizeBarrierFreeRows([row], CTX);
    expect(record.data.businessHours).toBe('ランチ11:00~16:00(LO15:30)ディナー16:00~22:00(LO21:00)');
    expect(record.data.regularHolidays).toBe('定休日無し');
  });
});
