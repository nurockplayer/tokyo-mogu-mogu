/**
 * Normalizer for the Okutama tourism-facilities ingestion (#16).
 *
 * Pure functions only — no file I/O — so the deterministic conversion from
 * source snapshots to canonical `Place[]` records is unit-testable.
 *
 * Two classes of input feed this normalizer:
 *
 * 1. Real Open Data from the Tokyo Open Data Catalog (CC BY 4.0):
 *    - スポーツ施設一覧 (dataset t133086d3100000004, `okutama-sports-facilities.csv`)
 *    - 施設関連情報_奥多摩町 (dataset t000021d2000000151, `okutama-general-facilities.csv`)
 *    These rows carry `sourceType: 'open_data'` and `origin: 'source'` with the
 *    original dataset id and original record id preserved.
 *
 * 2. The Okutama Tourism Association directory (一般社団法人奥多摩観光協会,
 *    https://www.okutama.gr.jp/site/). This is the town's de-facto 観光施設一覧,
 *    but it is published as HTML with `All Rights Reserved` and WITHOUT
 *    coordinates. Its rows are committed as `origin: 'demo'` with
 *    `sourceType: 'official_web'` (truthful: the names/addresses come from the
 *    official association website) and APPROXIMATE coordinates that must be
 *    re-verified in the field before production use.
 *
 * Idempotency: every Place id is derived deterministically from the source
 * record (dataset key + a djb2 hash of the original facility name, or the
 * explicit directory key). Re-running the generator produces identical ids, so
 * re-ingestion never creates duplicates and re-running after a source update is
 * safe (unchanged rows keep their ids; removed rows simply disappear).
 */
import type { Place, PlaceType } from '../src/data/model.ts';

export const RETRIEVED_AT = '2026-08-08';

export const SPORTS_DATASET = {
  sourceDatasetId: 't133086d3100000004',
  url: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t133086d3100000004',
  license: 'CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）',
};

export const GENERAL_DATASET = {
  sourceDatasetId: 't000021d2000000151',
  url: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t000021d2000000151',
  license: 'CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）',
};

/** A raw row extracted from one of the Tokyo Open Data CSV snapshots. */
export interface CsvRow {
  /** Which snapshot the row came from: 'sports' | 'general'. */
  dataset: 'sports' | 'general';
  /** Original facility name (施設名 / 名称). */
  nameJa: string;
  /** Original address (所在地 / 所在地_連結表記). */
  address: string;
  /** WGS84 latitude from the source. */
  latitude: number;
  /** WGS84 longitude from the source. */
  longitude: number;
  /** Original record identifier within the source dataset (POI code / 施設名). */
  originalId: string;
  /** Source category (施設区分) for the general facilities dataset. */
  category?: string;
  /** Optional description (説明) for the sports dataset. */
  description?: string;
  /** Optional official URL (URL) for the sports dataset. */
  url?: string;
}

/** A row from the committed tourism-directory snapshot (association site). */
export interface DirectoryRow {
  key: string;
  nameJa: string;
  nameEn: string;
  address: string;
  latitude: number;
  longitude: number;
  url?: string;
  phone?: string;
  category: string;
  coordApprox: boolean;
  note?: string;
}

/** Minimal RFC-4180-ish CSV splitter (handles quoted fields). */
export function splitCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function indexByHeader(header: string[], names: string[]): Record<string, number> {
  const idx: Record<string, number> = {};
  for (const name of names) {
    const i = header.indexOf(name);
    if (i === -1) throw new Error(`Missing expected column: ${name}`);
    idx[name] = i;
  }
  return idx;
}

function parseNumber(cell: string): number {
  const n = Number(cell.trim());
  if (!Number.isFinite(n)) throw new Error(`Not a number: "${cell}"`);
  return n;
}

/** Parse the スポーツ施設一覧 CSV snapshot text into raw rows. */
export function parseSportsCsv(text: string): CsvRow[] {
  const rows = splitCsv(text);
  const header = rows[0];
  const idx = indexByHeader(header, ['名称', '所在地_連結表記', '緯度', '経度', 'POIコード', '説明', 'URL']);
  return rows.slice(1).map((r) => ({
    dataset: 'sports' as const,
    nameJa: r[idx['名称']].trim(),
    address: r[idx['所在地_連結表記']].trim(),
    latitude: parseNumber(r[idx['緯度']]),
    longitude: parseNumber(r[idx['経度']]),
    originalId: r[idx['POIコード']].trim() || r[idx['名称']].trim(),
    description: r[idx['説明']]?.trim() || undefined,
    url: r[idx['URL']]?.trim() || undefined,
  }));
}

/** Parse the 施設関連情報_奥多摩町 CSV snapshot text (UTF-8 decoded) into raw rows. */
export function parseGeneralCsv(text: string): CsvRow[] {
  const rows = splitCsv(text);
  const header = rows[0];
  const idx = indexByHeader(header, ['施設区分', '施設名', '所在地', '緯度', '経度']);
  return rows.slice(1).map((r) => ({
    dataset: 'general' as const,
    nameJa: r[idx['施設名']].trim(),
    address: r[idx['所在地']].trim(),
    latitude: parseNumber(r[idx['緯度']]),
    longitude: parseNumber(r[idx['経度']]),
    originalId: r[idx['施設名']].trim(),
    category: r[idx['施設区分']].trim(),
  }));
}

/** Parse the committed tourism-directory snapshot JSON into raw rows. */
export function parseDirectoryJson(text: string): DirectoryRow[] {
  const parsed = JSON.parse(text) as { records: DirectoryRow[] };
  return parsed.records;
}

/** Deterministic djb2 hash of a string, returned as a base-36 string. */
export function hashName(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

/**
 * Deterministic MVP filter.
 *
 * Demo (association-directory) rows are all considered in-scope because they
 * were curated specifically for the MVP. Real open-data rows are kept only when
 * their facility name matches one of the tourism-relevant keywords — this
 * excludes libraries and generic community/cultural halls that are not part of
 * the food-culture discovery experience.
 */
export function isMvpRelevant(r: { dataset: 'sports' | 'general' | 'demo'; nameJa: string }): boolean {
  if (r.dataset === 'demo') return true;
  const keepKeywords = ['美術館', '森林館', '総合運動公園'];
  return keepKeywords.some((k) => r.nameJa.includes(k));
}

/** Map a source category to the canonical PlaceType. */
export function toPlaceType(dataset: 'sports' | 'general' | 'demo', category: string | undefined): PlaceType {
  if (dataset === 'demo') {
    switch (category) {
      case 'restaurant':
        return 'restaurant';
      case 'farm':
        return 'farm';
      case 'shop':
        return 'shop';
      case 'info-center':
        return 'info-center';
      default:
        return 'other';
    }
  }
  // Real open-data rows: museums / forest centers / sports parks are "other".
  return 'other';
}

/** Deterministic Place id for a real open-data CSV row. */
function csvPlaceId(dataset: 'sports' | 'general', nameJa: string): string {
  return `okutama-${dataset}-${hashName(nameJa)}`;
}

/** Deterministic Place id for a directory (demo) row. */
function directoryPlaceId(key: string): string {
  return `okutama-demo-${key}`;
}

/** Normalize a real open-data CSV row into a Place. */
export function normalizeCsvRow(row: CsvRow): Place {
  const dataset = row.dataset === 'sports' ? SPORTS_DATASET : GENERAL_DATASET;
  return {
    id: csvPlaceId(row.dataset, row.nameJa),
    nameJa: row.nameJa,
    nameEn: '',
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    foodCultureIds: [],
    type: toPlaceType(row.dataset, row.category),
    source: {
      name: row.dataset === 'sports' ? '奥多摩町 スポーツ施設一覧' : '東京都教育庁 施設関連情報_奥多摩町',
      url: dataset.url,
      license: dataset.license,
      sourceType: 'open_data',
      sourceDatasetId: dataset.sourceDatasetId,
      retrievedAt: RETRIEVED_AT,
      originalId: row.originalId,
    },
    origin: 'source',
  };
}

/** Normalize a tourism-directory (demo) row into a Place. */
export function normalizeDirectoryRow(row: DirectoryRow): Place {
  return {
    id: directoryPlaceId(row.key),
    nameJa: row.nameJa,
    nameEn: row.nameEn,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    foodCultureIds: [],
    type: toPlaceType('demo', row.category),
    source: {
      name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
      url: row.url ?? 'https://www.okutama.gr.jp/site/',
      license: 'All Rights Reserved（参考情報としてのみ利用）',
      sourceType: 'official_web',
      retrievedAt: RETRIEVED_AT,
      originalId: row.key,
    },
    origin: 'demo',
  };
}

/**
 * Full pipeline: raw rows → Places → deterministic MVP filter.
 * Re-running with the same snapshots yields byte-identical output.
 */
export function buildOkutamaPlaces(input: {
  sportsCsv: string;
  generalCsv: string;
  directoryJson: string;
}): Place[] {
  const csvRows = [
    ...parseSportsCsv(input.sportsCsv),
    ...parseGeneralCsv(input.generalCsv),
  ];
  const directoryRows = parseDirectoryJson(input.directoryJson);

  const all: Place[] = [
    ...csvRows.map(normalizeCsvRow),
    ...directoryRows.map(normalizeDirectoryRow),
  ];

  return all
    .filter((p) =>
      isMvpRelevant({
        dataset: p.origin === 'source' && p.source.sourceDatasetId === SPORTS_DATASET.sourceDatasetId ? 'sports' : p.origin === 'source' ? 'general' : 'demo',
        nameJa: p.nameJa,
      }),
    )
    .sort((a, b) => a.id.localeCompare(b.id));
}
