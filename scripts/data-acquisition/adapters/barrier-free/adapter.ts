/**
 * Adapter for 東京都内の飲食店のバリアフリー情報 (Tokyo restaurants'
 * barrier-free / accessibility guide).
 *
 * Source: Tokyo Open Data Catalog dataset `t000012d0000000063` (東京都産業労働局
 * 観光部受入環境課), artifact
 * `https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/barrier-free-guide.csv`,
 * license CC BY, CSV in CP932 (Shift-JIS), resource last_modified
 * 2024-03-12. ~210 records.
 *
 * ## Transformation boundary (provenance / honesty)
 *
 * This is a mechanical parse + normalize of a self-reported accessibility
 * guide. It deliberately does **not**:
 * - treat a flag as a safety or usability guarantee — the dataset is a
 *   partial, self-reported reference from the listed restaurants;
 * - read a blank flag cell as "no" — a blank cell is *unknown*, never
 *   "no"; only the source's `〇` marker maps to `true`, everything else
 *   stays `undefined`;
 * - infer open / closed, seating capacity, prices, menus, dietary
 *   suitability, or any other missing fact from any field;
 * - normalize the `営業時間` / `定休日` strings into structured state —
 *   they are preserved as raw source text;
 * - claim any of this is a Product-visible fact (acquisition only).
 *
 * The dataset has no record-id column and no coordinates; the record id
 * within the source is therefore the 1-based row position.
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

/** Source manifest id of the barrier-free-guide source. */
export const BARRIER_FREE_SOURCE_ID = 'tokyo-barrier-free-guide';

/** Normalized shape of one barrier-free record. */
export type BarrierFreeRecordData = {
  /** 店名. */
  nameJa: string;
  /** 店舗電話番号. */
  phoneNumber?: string;
  /** 住所. */
  address?: string;
  /** 営業時間 — raw source string; not parsed into open/closed state. */
  businessHours?: string;
  /** 定休日 — raw source string. */
  regularHolidays?: string;
  /** アクセス. */
  access?: string;
  /** 店舗URL. */
  url?: string;
  /**
   * Self-reported accessibility reference (東京都バリアフリーガイド).
   * A partial, self-reported reference — NOT a safety or usability
   * guarantee. `true` means the source marks `〇`; `undefined` means the
   * source cell is blank = *unknown* (never "no").
   */
  accessibility: {
    /** 入口幅が80cm以上である. */
    entranceWidth80cmPlus?: boolean;
    /** 入口の移動経路は平坦または段差が2cm以下である. */
    flatEntranceOrLowStep?: boolean;
    /** 店舗内の椅子は移動可能である. */
    movableChairs?: boolean;
    /** 店舗内は車椅子での移動が可能である. */
    wheelchairMovementInside?: boolean;
    /** テーブル下にスペースがある（高さ65cm×幅70cm×奥行45cm程度）. */
    spaceUnderTables?: boolean;
    /** 店舗内または同じフロア内にトイレがある. */
    toiletOnSameFloor?: boolean;
    /** 車椅子使用者対応トイレ（施設内の他フロアを含む）またはオストメイトがある. */
    wheelchairToiletOrOstomate?: boolean;
    /** 写真メニューがある. */
    photoMenu?: boolean;
    /** 英語等外国語のメニューがある. */
    foreignLanguageMenu?: boolean;
    /** 点字表記のメニューがある. */
    brailleMenu?: boolean;
    /** 筆談によるコミュニケーションがある. */
    writtenCommunication?: boolean;
    /** 手話のできるスタッフがいる. */
    signLanguageStaff?: boolean;
    /** 事前申請によるアレルギー対応が可能. */
    allergyResponseOnRequest?: boolean;
    /** 事前申請によるベジタリアンまたはヴィーガン対応が可能. */
    vegetarianVeganOnRequest?: boolean;
    /** 事前申請によるハラール対応が可能. */
    halalOnRequest?: boolean;
  };
};

/**
 * Required columns; a schema change must fail loudly, not produce undefined
 * rows. `店名` is the record identity — the only column that must exist.
 */
const REQUIRED_COLUMNS = ['店名'];

/**
 * Parse barrier-free CSV text (already decoded to UTF-8) into raw rows keyed
 * by the source header. Pure and unit-testable.
 */
export function parseBarrierFreeCsv(text: string): RawRow[] {
  const rows = splitCsv(text);
  if (rows.length === 0) throw new Error('barrier-free: empty CSV artifact');
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
export function barrierFreeId(manifest: SourceManifest, originalId: string): string {
  const dataset = manifest.datasetId ?? 'dataset';
  return `bf-${dataset}-${originalId}`;
}

/** Build the shared provenance for records of one source run. */
export function buildBarrierFreeProvenance(ctx: NormalizeContext): ProvenanceMetadata {
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

/**
 * Map a flag cell: only the source's exact `〇` (yes) marker becomes `true`;
 * a blank cell is *unknown* and stays `undefined` — never inferred as "no".
 * An unexpected non-blank value is likewise treated as absent.
 */
function accessibilityFlag(cell: string | undefined): boolean | undefined {
  if (cell === undefined || cell === '') return undefined;
  return cell === '〇' ? true : undefined;
}

/** Normalize raw rows into deterministic, provenance-carrying records. Pure. */
export function normalizeBarrierFreeRows(
  rows: RawRow[],
  ctx: NormalizeContext,
): NormalizedRecord<BarrierFreeRecordData>[] {
  return rows.map((row, i) => {
    const nameJa = row['店名'] ?? '';
    if (nameJa === '') throw new Error(`barrier-free: row ${i + 1} missing 店名`);
    const originalId = String(i + 1);
    return {
      id: barrierFreeId(ctx.manifest, originalId),
      originalId,
      provenance: buildBarrierFreeProvenance(ctx),
      data: {
        nameJa,
        phoneNumber: row['店舗電話番号'],
        address: row['住所'],
        businessHours: row['営業時間'],
        regularHolidays: row['定休日'],
        access: row['アクセス'],
        url: row['店舗URL'],
        accessibility: {
          entranceWidth80cmPlus: accessibilityFlag(row['入口幅が80cm以上である']),
          flatEntranceOrLowStep: accessibilityFlag(
            row['入口の移動経路は平坦または段差が2cm以下である'],
          ),
          movableChairs: accessibilityFlag(row['店舗内の椅子は移動可能である']),
          wheelchairMovementInside: accessibilityFlag(row['店舗内は車椅子での移動が可能である']),
          spaceUnderTables: accessibilityFlag(
            row['テーブル下にスペースがある（高さ65cm×幅70cm×奥行45cm程度）'],
          ),
          toiletOnSameFloor: accessibilityFlag(row['店舗内または同じフロア内にトイレがある']),
          wheelchairToiletOrOstomate: accessibilityFlag(
            row['車椅子使用者対応トイレがある（施設内の他フロアを含む）またはオストメイトがある'],
          ),
          photoMenu: accessibilityFlag(row['写真メニューがある']),
          foreignLanguageMenu: accessibilityFlag(row['英語等外国語のメニューがある']),
          brailleMenu: accessibilityFlag(row['点字表記のメニューがある']),
          writtenCommunication: accessibilityFlag(row['筆談によるコミュニケーションがある']),
          signLanguageStaff: accessibilityFlag(row['手話のできるスタッフがいる']),
          allergyResponseOnRequest: accessibilityFlag(row['事前申請によるアレルギー対応が可能']),
          vegetarianVeganOnRequest: accessibilityFlag(
            row['事前申請によるベジタリアンまたはヴィーガン対応が可能'],
          ),
          halalOnRequest: accessibilityFlag(row['事前申請によるハラール対応が可能']),
        },
      },
    };
  });
}

/** The adapter itself (parse + normalize). */
export const barrierFreeAdapter: AcquisitionAdapter<BarrierFreeRecordData> = {
  id: 'barrier-free',
  parse(input: AdapterInput, helpers) {
    const text = helpers.decodeText(input.bytes, input.manifest.encoding);
    return parseBarrierFreeCsv(text);
  },
  normalize(rows: RawRow[], ctx: NormalizeContext) {
    return normalizeBarrierFreeRows(rows, ctx);
  },
};
