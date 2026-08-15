/**
 * Adapter for 東京都青梅市における飲食店一覧 (Ome City food-business listing).
 *
 * Source: Tokyo Open Data Catalog dataset `t132055d0000000009` (青梅市 地域経済部
 * 商工業振興課), artifact
 * `https://www.opendata.metro.tokyo.lg.jp/ome/132055_food_business_all.xlsx`,
 * license CC BY, XLSX, resource last_modified 2024-03-21. ~1,593 records.
 *
 * ## Transformation boundary (provenance / honesty)
 *
 * This is a food-business **license / listing** record usable for facility
 * identity and status *investigation* only. It deliberately does **not**:
 * - claim any menu, ingredient, hours, or accessibility fact — the dataset
 *   has none of those fields;
 * - prove that a business is currently operating — a blank 廃業年月日
 *   (closure date) is *not* evidence of operation; license dates are
 *   preserved as raw Excel serial values without calendar conversion;
 * - prove that the restaurant uses Tokyo (or any) ingredients;
 * - infer seating capacity, prices, open / closed, or any missing fact.
 *
 * ## XLSX handling
 *
 * `parse` reads the workbook with SheetJS (`read` + `utils.sheet_to_json`,
 * `defval: ''`), stringifies numeric cells for the `RawRow` contract, and
 * `normalize` re-parses the numeric columns (coordinates and the date
 * columns) back to numbers. Date cells are **Excel serial dates as stored in
 * the artifact** (e.g. `44698` = 2022-05-17); they are preserved as-is so no
 * calendar / timezone semantics are invented. The `ID` column is the
 * source's own business id and is preserved as `originalId`.
 */
import { read, utils } from 'xlsx';
import { indexRequiredColumns } from '../../csv.ts';
import type {
  AcquisitionAdapter,
  AdapterInput,
  NormalizeContext,
  NormalizedRecord,
  ProvenanceMetadata,
  RawRow,
  SourceManifest,
} from '../../types.ts';

/** Source manifest id of the Ome food-business source. */
export const OME_FOOD_BUSINESS_SOURCE_ID = 'ome-food-business-list';

/** Normalized shape of one Ome food-business record. */
export type OmeFoodBusinessRecordData = {
  /** 施設名称. */
  facilityNameJa: string;
  /** 施設名称_カナ. */
  facilityNameKana?: string;
  /** 施設名称_英字. */
  facilityNameEn?: string;
  /** 営業の種類 (license category, e.g. 飲食店営業(一般飲食店)). */
  businessType?: string;
  /** 業態 (source column is currently unpopulated for every record). */
  operationCategory?: string;
  /** 全国地方公共団体コード. */
  localGovernmentCode?: number;
  /** 地方公共団体名 (e.g. 青梅市). */
  localGovernmentName?: string;
  /** 所在地_連結表記. */
  address?: string;
  /** 施設所在地_都道府県. */
  prefecture?: string;
  /** 施設所在地_市区町村. */
  city?: string;
  /** 施設所在地_町字. */
  town?: string;
  /** 施設所在地_番地以下 (stringified from numeric cells). */
  lotNumber?: string;
  /** 施設方書. */
  addressSupplement?: string;
  /** 緯度 (WGS84) when the source cell is numeric. */
  latitude?: number;
  /** 経度 (WGS84) when the source cell is numeric. */
  longitude?: number;
  /** 施設電話番号. */
  phoneNumber?: string;
  /** 連絡先メールアドレス. */
  contactEmail?: string;
  /** 連絡先FormURL. */
  contactFormUrl?: string;
  /** 連絡先備考（その他、SNSなど）. */
  contactNotes?: string;
  /** 郵便番号 (stringified from the numeric cell; all observed values are 7 digits). */
  postalCode?: string;
  /** 法人名. */
  corporateName?: string;
  /** 法人番号. */
  corporateNumber?: string;
  /** 許可番号. */
  permitNumber?: string;
  /**
   * 初回許可年月日 — Excel serial date as stored in the artifact
   * (e.g. 44698 = 2022-05-17). Kept as the raw source value.
   */
  firstPermitDate?: number;
  /** 許可年月日 — Excel serial date (see firstPermitDate). */
  permitDate?: number;
  /** 許可開始日 — Excel serial date (see firstPermitDate). */
  permitStartDate?: number;
  /** 許可満了日 — Excel serial date (see firstPermitDate). */
  permitExpiryDate?: number;
  /** 廃業年月日 — Excel serial date (see firstPermitDate). Blank is NOT evidence of operation. */
  closureDate?: number;
  /** 申請区分 (e.g. 新規 / 更新). */
  applicationType?: string;
  /** 許可条件. */
  permitConditions?: string;
  /** 備考. */
  remarks?: string;
};

/**
 * Required columns; a schema change must fail loudly, not produce undefined
 * rows. `ID` and `施設名称` are the record identity, `営業の種類` the license
 * category that gives this dataset its meaning.
 */
const REQUIRED_COLUMNS = ['ID', '施設名称', '営業の種類'];

/**
 * Parse an XLSX artifact into raw rows keyed by the sheet's header.
 * Numeric cells are stringified (the RawRow contract is string-valued);
 * empty cells (`defval: ''`) become `undefined`. Pure and unit-testable.
 */
export function parseOmeFoodBusinessXlsx(bytes: ArrayBuffer): RawRow[] {
  const workbook = read(new Uint8Array(bytes), { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (sheetName === undefined) throw new Error('ome-food-business: XLSX artifact has no sheets');
  const sheet = workbook.Sheets[sheetName];
  if (sheet === undefined) throw new Error(`ome-food-business: sheet "${sheetName}" not found`);
  const raw = utils.sheet_to_json(sheet, { defval: '' }) as Array<Record<string, string | number>>;
  if (raw.length === 0) throw new Error('ome-food-business: empty XLSX artifact');
  indexRequiredColumns(Object.keys(raw[0]), REQUIRED_COLUMNS);
  return raw.map((row) => {
    const out: RawRow = {};
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === 'number') {
        out[key] = String(value);
      } else if (typeof value === 'string') {
        const trimmed = value.trim();
        out[key] = trimmed === '' ? undefined : trimmed;
      } else {
        out[key] = undefined;
      }
    }
    return out;
  });
}

/** Deterministic normalized record id within the acquisition layer. */
export function omeFoodBusinessId(manifest: SourceManifest, originalId: string): string {
  const dataset = manifest.datasetId ?? 'dataset';
  return `ome-${dataset}-${originalId}`;
}

/** Build the shared provenance for records of one source run. */
export function buildOmeFoodBusinessProvenance(ctx: NormalizeContext): ProvenanceMetadata {
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

/** Parse a numeric source cell; a malformed value is absent, never invented. */
function sourceNumber(cell: string | undefined): number | undefined {
  if (cell === undefined || cell === '') return undefined;
  const n = Number(cell);
  return Number.isFinite(n) ? n : undefined;
}

/** Normalize raw rows into deterministic, provenance-carrying records. Pure. */
export function normalizeOmeFoodBusinessRows(
  rows: RawRow[],
  ctx: NormalizeContext,
): NormalizedRecord<OmeFoodBusinessRecordData>[] {
  return rows.map((row, i) => {
    const facilityNameJa = row['施設名称'] ?? '';
    const originalId = row['ID'] ?? '';
    if (facilityNameJa === '')
      throw new Error(`ome-food-business: row ${i + 1} missing 施設名称`);
    if (originalId === '') throw new Error(`ome-food-business: row ${i + 1} missing ID`);
    return {
      id: omeFoodBusinessId(ctx.manifest, originalId),
      originalId,
      provenance: buildOmeFoodBusinessProvenance(ctx),
      data: {
        facilityNameJa,
        facilityNameKana: row['施設名称_カナ'],
        facilityNameEn: row['施設名称_英字'],
        businessType: row['営業の種類'],
        operationCategory: row['業態'],
        localGovernmentCode: sourceNumber(row['全国地方公共団体コード']),
        localGovernmentName: row['地方公共団体名'],
        address: row['所在地_連結表記'],
        prefecture: row['施設所在地_都道府県'],
        city: row['施設所在地_市区町村'],
        town: row['施設所在地_町字'],
        lotNumber: row['施設所在地_番地以下'],
        addressSupplement: row['施設方書'],
        latitude: sourceNumber(row['緯度']),
        longitude: sourceNumber(row['経度']),
        phoneNumber: row['施設電話番号'],
        contactEmail: row['連絡先メールアドレス'],
        contactFormUrl: row['連絡先FormURL'],
        contactNotes: row['連絡先備考（その他、SNSなど）'],
        postalCode: row['郵便番号'],
        corporateName: row['法人名'],
        corporateNumber: row['法人番号'],
        permitNumber: row['許可番号'],
        firstPermitDate: sourceNumber(row['初回許可年月日']),
        permitDate: sourceNumber(row['許可年月日']),
        permitStartDate: sourceNumber(row['許可開始日']),
        permitExpiryDate: sourceNumber(row['許可満了日']),
        closureDate: sourceNumber(row['廃業年月日']),
        applicationType: row['申請区分'],
        permitConditions: row['許可条件'],
        remarks: row['備考'],
      },
    };
  });
}

/** The adapter itself (parse + normalize). */
export const omeFoodBusinessAdapter: AcquisitionAdapter<OmeFoodBusinessRecordData> = {
  id: 'ome-food-business',
  // XLSX bytes carry no text encoding, so `helpers` is intentionally unused
  // here (the interface allows implementations to take fewer parameters).
  parse(input: AdapterInput) {
    return parseOmeFoodBusinessXlsx(input.bytes);
  },
  normalize(rows: RawRow[], ctx: NormalizeContext) {
    return normalizeOmeFoodBusinessRows(rows, ctx);
  },
};
