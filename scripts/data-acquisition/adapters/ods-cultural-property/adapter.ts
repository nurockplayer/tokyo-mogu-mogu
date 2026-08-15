/**
 * Reusable adapter for the ODS (自治体標準データセット) 文化財一覧 pattern (#131).
 *
 * The same municipal-standard cultural-property CSV recurs across Tokyo
 * municipalities with per-municipality column variation. Instead of forking a
 * parser per municipality, this adapter holds ONE reusable parse + normalize
 * path; per-source differences (column names, original-id column, required
 * columns, id prefix) live in `config.ts`, keyed by `SourceManifest.id`.
 *
 * ## Transformation boundary (provenance / validation)
 *
 * The adapter performs only lossless-to-normalized mechanical steps:
 * - decodes the artifact (encoding comes from the manifest, e.g. CP932),
 * - splits the standard-format CSV,
 * - maps source columns to canonical fields via the per-source config,
 * - converts 緯度/経度 to numbers (only when the source cell is numeric).
 *
 * It deliberately does **not**:
 * - infer open/closed, visitability, or accessibility from any field,
 * - fill missing values (a field the source does not carry stays `undefined`),
 * - map records into Product Place / Story / Route shapes,
 * - normalize dates (they stay as the source strings), or
 * - vendor images (image fields are preserved as references only).
 *
 * A malformed required value fails the source loudly with a deterministic row
 * number (sync reports the source as an error, isolated from other sources);
 * a malformed optional cell (e.g. a non-numeric coordinate) is treated as
 * absent rather than invented.
 *
 * Format handling: the pattern ships as both CSV (new ODS Ver1.5, e.g. 国立市)
 * and XLSX (old ODS, e.g. 八王子市). `parse` decodes each artifact into the
 * same source-shaped `RawRow[]` keyed by header; normalization is format-
 * agnostic and driven entirely by the per-source config.
 */
import { read, utils } from 'xlsx';
import { indexRequiredColumns, splitCsv } from '../../csv.ts';
import {
  resolveOdsCulturalPropertyConfig,
  type OdsCulturalPropertySourceConfig,
} from './config.ts';
import type {
  AcquisitionAdapter,
  AdapterInput,
  NormalizeContext,
  NormalizedRecord,
  ProvenanceMetadata,
  RawRow,
} from '../../types.ts';

/** Normalized shape of one ODS cultural-property record. */
export type OdsCulturalPropertyRecordData = {
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

/**
 * Parse ODS cultural-property CSV text (already decoded) into raw rows keyed
 * by the source header. The required-column check is per-source config.
 * Pure and unit-testable.
 */
export function parseOdsCulturalPropertyCsv(
  text: string,
  config: OdsCulturalPropertySourceConfig,
): RawRow[] {
  const rows = splitCsv(text);
  if (rows.length === 0) throw new Error('ods-cultural-property: empty CSV artifact');
  const header = rows[0];
  indexRequiredColumns(header, config.requiredColumns);
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

/**
 * Parse an ODS cultural-property XLSX artifact into raw rows keyed by the
 * sheet's header (old-ODS municipalities such as 八王子市 publish only XLSX).
 * Numeric cells are stringified for the `RawRow` contract; empty cells become
 * `undefined`. Same header-keyed shape as the CSV path, so normalization is
 * format-agnostic. Pure and unit-testable.
 */
export function parseOdsCulturalPropertyXlsx(
  bytes: ArrayBuffer,
  config: OdsCulturalPropertySourceConfig,
): RawRow[] {
  const workbook = read(new Uint8Array(bytes), { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (sheetName === undefined) throw new Error('ods-cultural-property: XLSX artifact has no sheets');
  const sheet = workbook.Sheets[sheetName];
  if (sheet === undefined) throw new Error(`ods-cultural-property: sheet "${sheetName}" not found`);
  const raw = utils.sheet_to_json(sheet, { defval: '' }) as Array<Record<string, string | number>>;
  if (raw.length === 0) throw new Error('ods-cultural-property: empty XLSX artifact');
  indexRequiredColumns(Object.keys(raw[0]), config.requiredColumns);
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
export function odsCulturalPropertyId(
  config: OdsCulturalPropertySourceConfig,
  datasetId: string | undefined,
  originalId: string,
): string {
  const dataset = datasetId ?? 'dataset';
  return `${config.idPrefix}-${dataset}-${originalId}`;
}

/** Build the shared provenance for records of one source run. */
export function buildOdsCulturalPropertyProvenance(ctx: NormalizeContext): ProvenanceMetadata {
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

/** Read a mapped source column, returning `undefined` when unmapped/empty. */
function mapped(row: RawRow, column: string | undefined): string | undefined {
  if (column === undefined) return undefined;
  return row[column];
}

/**
 * Normalize raw rows into deterministic, provenance-carrying records.
 *
 * `config` is passed explicitly so the pure core is unit-testable with
 * arbitrary per-source mappings; the adapter wires the config registry.
 * `fields.name` / `fields.classification` are the record identity and must be
 * configured — a missing value fails with a deterministic row number.
 */
export function normalizeOdsCulturalPropertyRows(
  rows: RawRow[],
  ctx: NormalizeContext,
  config: OdsCulturalPropertySourceConfig,
): NormalizedRecord<OdsCulturalPropertyRecordData>[] {
  const { fields } = config;
  const nameCol = fields.name;
  const classificationCol = fields.classification;
  if (nameCol === undefined || classificationCol === undefined) {
    throw new Error(
      `ods-cultural-property: source "${ctx.manifest.id}" must configure name and classification`,
    );
  }
  return rows.map((row, i) => {
    const nameJa = mapped(row, nameCol) ?? '';
    if (nameJa === '') throw new Error(`ods-cultural-property: row ${i + 1} missing ${nameCol}`);
    const classification = mapped(row, classificationCol) ?? '';
    if (classification === '')
      throw new Error(`ods-cultural-property: row ${i + 1} missing ${classificationCol}`);
    const originalId =
      config.originalIdColumn === undefined
        ? String(i + 1)
        : (row[config.originalIdColumn] ?? String(i + 1));
    let latitude = optionalNumber(mapped(row, fields.latitude));
    let longitude = optionalNumber(mapped(row, fields.longitude));
    // Verified per-source quirk (e.g. 八王子市): the artifact stores 経度 in
    // the 緯度 column and vice versa. Swap restores the correct hemisphere.
    if (config.swapLatLon === true) {
      [latitude, longitude] = [longitude, latitude];
    }
    return {
      id: odsCulturalPropertyId(config, ctx.manifest.datasetId, originalId),
      originalId,
      provenance: buildOdsCulturalPropertyProvenance(ctx),
      data: {
        classification,
        category: mapped(row, fields.category),
        nameJa,
        nameKana: mapped(row, fields.nameKana),
        nameEn: mapped(row, fields.nameEn),
        placeName: mapped(row, fields.placeName),
        address: mapped(row, fields.address),
        addressDetail: mapped(row, fields.addressDetail),
        latitude,
        longitude,
        owner: mapped(row, fields.owner),
        designatedOn: mapped(row, fields.designatedOn),
        summaryJa: mapped(row, fields.summaryJa),
        summaryEn: mapped(row, fields.summaryEn),
        descriptionJa: mapped(row, fields.descriptionJa),
        descriptionEn: mapped(row, fields.descriptionEn),
        imageUrl: mapped(row, fields.imageUrl),
        imageLicense: mapped(row, fields.imageLicense),
        url: mapped(row, fields.url),
        lastConfirmedOn: mapped(row, fields.lastConfirmedOn),
      },
    };
  });
}

/** The reusable adapter itself (parse + normalize). */
export const odsCulturalPropertyAdapter: AcquisitionAdapter<OdsCulturalPropertyRecordData> = {
  id: 'ods-cultural-property',
  parse(input: AdapterInput, helpers) {
    const config = resolveOdsCulturalPropertyConfig(input.manifest.id);
    if (input.manifest.format === 'xlsx') {
      return parseOdsCulturalPropertyXlsx(input.bytes, config);
    }
    const text = helpers.decodeText(input.bytes, input.manifest.encoding);
    return parseOdsCulturalPropertyCsv(text, config);
  },
  normalize(rows: RawRow[], ctx: NormalizeContext) {
    return normalizeOdsCulturalPropertyRows(
      rows,
      ctx,
      resolveOdsCulturalPropertyConfig(ctx.manifest.id),
    );
  },
};
