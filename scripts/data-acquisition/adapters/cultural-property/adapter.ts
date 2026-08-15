/**
 * Adapter for the 東京都指定文化財一覧 (Tokyo-designated cultural property).
 *
 * Source: Tokyo Open Data Catalog dataset `t000021d0000000017` (東京都教育庁),
 * artifact `https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv`,
 * license CC BY 4.0. This is the first validation adapter for the acquisition
 * layer (#175); it is *not* a statement that cultural property is the Product
 * domain.
 *
 * ## Transformation boundary (provenance / validation)
 *
 * This adapter performs only lossless-to-normalized mechanical steps:
 * - decodes the CP932 (Shift-JIS) artifact to text,
 * - splits the 36-column 自治体標準データセット CSV,
 * - maps source columns to normalized field names,
 * - converts 緯度/経度 to numbers (only when the source cell is numeric).
 *
 * It deliberately does **not**:
 * - infer open/closed, visitability, or accessibility from any field,
 * - fill missing hours / prices / reservation / dietary / accessibility data,
 * - map records into Product Place / Story / Route shapes,
 * - normalize dates (they stay as the source strings to avoid inventing
 *   semantics), or
 * - vendor images (image fields are preserved as references only).
 *
 * Per the dataset notes, only items whose owners/managers consented are
 * published, and the records' 最終確認日 is the source's confirmation date —
 * it is not a claim about real-world freshness today.
 */
import { indexRequiredColumns, splitCsv } from '../../csv.ts';
import type {
  AcquisitionAdapter,
  AdapterInput,
  NormalizeContext,
  NormalizedRecord,
  ProvenanceMetadata,
  RawRow,
  SourceManifest,
} from '../../types.ts';

/** Source manifest id of the cultural-property source. */
export const CULTURAL_PROPERTY_SOURCE_ID = 'tokyo-designated-cultural-property';

/** Normalized shape of one cultural-property record. */
export type CulturalPropertyRecordData = {
  /** 文化財分類 (e.g. 都指定文化財). */
  classification: string;
  /** 種類 (e.g. 建造物, 史跡). */
  category?: string;
  /** 名称. */
  nameJa: string;
  /** 名称_カナ. */
  nameKana?: string;
  /** 名称_英語. */
  nameEn?: string;
  /** 場所名称. */
  placeName?: string;
  /** 住所. */
  address?: string;
  /** 方書 (additional address detail). */
  addressDetail?: string;
  /** 緯度 (WGS84) when the source cell is numeric. */
  latitude?: number;
  /** 経度 (WGS84) when the source cell is numeric. */
  longitude?: number;
  /** 所有者等. */
  owner?: string;
  /** 文化財指定日 (raw source string). */
  designatedOn?: string;
  /** 概要. */
  summaryJa?: string;
  /** 概要_英語. */
  summaryEn?: string;
  /** 説明. */
  descriptionJa?: string;
  /** 説明_英語. */
  descriptionEn?: string;
  /** 画像 URL reference (images are never vendored). */
  imageUrl?: string;
  /** 画像_ライセンス. */
  imageLicense?: string;
  /** URL. */
  url?: string;
  /** 最終確認日 (raw source string). */
  lastConfirmedOn?: string;
};

/** Required columns; a schema change must fail loudly, not produce undefined rows. */
const REQUIRED_COLUMNS = ['名称', '文化財分類'];

/**
 * Parse cultural-property CSV text (already decoded to UTF-8) into raw rows
 * keyed by the source header. Pure and unit-testable.
 */
export function parseCulturalPropertyCsv(text: string): RawRow[] {
  const rows = splitCsv(text);
  if (rows.length === 0) throw new Error('cultural-property: empty CSV artifact');
  const header = rows[0];
  indexRequiredColumns(header, REQUIRED_COLUMNS);
  return rows.slice(1).map((cells) => {
    const row: RawRow = {};
    for (let i = 0; i < header.length; i++) {
      const cell = cells[i];
      const value = cell === undefined ? undefined : cell.trim();
      row[header[i]] = value === '' ? undefined : value;
    }
    return row;
  });
}

/** Deterministic normalized record id within the acquisition layer. */
export function culturalPropertyId(manifest: SourceManifest, originalId: string): string {
  const dataset = manifest.datasetId ?? 'dataset';
  return `cp-${dataset}-${originalId}`;
}

/** Build the shared provenance for records of one source run. */
export function buildCulturalPropertyProvenance(ctx: NormalizeContext): ProvenanceMetadata {
  const { manifest, artifact } = ctx;
  return {
    sourceId: manifest.id,
    provider: manifest.provider,
    datasetId: manifest.datasetId,
    sourceUrl: manifest.catalogUrl,
    artifactUrl: manifest.url,
    license: manifest.license,
    retrievedAt: artifact.retrievedAt,
    artifact: {
      filePath: manifest.cachePath ?? '',
      checksum: artifact.checksum,
      size: artifact.size,
    },
    sourceUpdatedAt: manifest.sourceUpdatedAt,
  };
}

function optionalNumber(cell: string | undefined): number | undefined {
  if (cell === undefined || cell === '') return undefined;
  const n = Number(cell);
  return Number.isFinite(n) ? n : undefined;
}

/** Normalize raw rows into deterministic, provenance-carrying records. Pure. */
export function normalizeCulturalPropertyRows(
  rows: RawRow[],
  ctx: NormalizeContext,
): NormalizedRecord<CulturalPropertyRecordData>[] {
  return rows.map((row, i) => {
    const nameJa = row['名称'] ?? '';
    const classification = row['文化財分類'] ?? '';
    if (nameJa === '') throw new Error(`cultural-property: row ${i + 1} missing 名称`);
    if (classification === '') throw new Error(`cultural-property: row ${i + 1} missing 文化財分類`);
    const originalId = row['NO'] ?? String(i + 1);
    return {
      id: culturalPropertyId(ctx.manifest, originalId),
      originalId,
      provenance: buildCulturalPropertyProvenance(ctx),
      data: {
        classification,
        category: row['種類'],
        nameJa,
        nameKana: row['名称_カナ'],
        nameEn: row['名称_英語'],
        placeName: row['場所名称'],
        address: row['住所'],
        addressDetail: row['方書'],
        latitude: optionalNumber(row['緯度']),
        longitude: optionalNumber(row['経度']),
        owner: row['所有者等'],
        designatedOn: row['文化財指定日'],
        summaryJa: row['概要'],
        summaryEn: row['概要_英語'],
        descriptionJa: row['説明'],
        descriptionEn: row['説明_英語'],
        imageUrl: row['画像'],
        imageLicense: row['画像_ライセンス'],
        url: row['URL'],
        lastConfirmedOn: row['最終確認日'],
      },
    };
  });
}

/** The adapter itself (parse + normalize). */
export const culturalPropertyAdapter: AcquisitionAdapter<CulturalPropertyRecordData> = {
  id: 'cultural-property',
  parse(input: AdapterInput, helpers) {
    const text = helpers.decodeText(input.bytes, input.manifest.encoding);
    return parseCulturalPropertyCsv(text);
  },
  normalize(rows: RawRow[], ctx: NormalizeContext) {
    return normalizeCulturalPropertyRows(rows, ctx);
  },
};
