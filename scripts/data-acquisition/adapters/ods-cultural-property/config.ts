/**
 * Per-source configuration for the reusable ODS 文化財一覧 adapter (#131).
 *
 * The municipal-standard cultural-property list (自治体標準データセット「文化財一覧」)
 * recurs across Tokyo municipalities with per-municipality column variation.
 * Municipality-specific differences are expressed here as a column mapping;
 * the parser / normalizer in `adapter.ts` never branches on source identity.
 *
 * Adding another municipality that publishes the same ODS pattern is one
 * manifest entry (`manifest.ts`) plus one config entry below.
 */

/** Source manifest id of the 東京都指定文化財一覧 source (#175). */
export const CULTURAL_PROPERTY_SOURCE_ID = 'tokyo-designated-cultural-property';

/** Source manifest id of the 国立市 文化財一覧 source (#131). */
export const KUNITACHI_CULTURAL_PROPERTY_SOURCE_ID = 'kunitachi-cultural-property';

/** Source manifest id of the 八王子市 文化財一覧 source (#131). */
export const HACHIOJI_CULTURAL_PROPERTY_SOURCE_ID = 'hachioji-cultural-property';

/**
 * Canonical field → source column mapping. A key absent from the map (or whose
 * source column is absent in the artifact) leaves the normalized field
 * `undefined` — the adapter never invents a value the source does not carry.
 */
export interface OdsCulturalPropertyFieldMap {
  /** 文化財分類 (e.g. 都指定文化財 / 市指定文化財). */
  classification?: string;
  /** 種類 (e.g. 建造物, 史跡). */
  category?: string;
  /** 名称. */
  name?: string;
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
  /** 緯度 (WGS84). */
  latitude?: string;
  /** 経度 (WGS84). */
  longitude?: string;
  /** 所有者等. */
  owner?: string;
  /** 文化財指定日 (raw source string, no calendar semantics invented). */
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
}

/** Adapter configuration for one ODS 文化財一覧 source. */
export interface OdsCulturalPropertySourceConfig {
  /**
   * Source column carrying the original record id (e.g. `NO`). When the column
   * is absent or the cell is empty, the 1-based row index is used instead —
   * the original id is preserved where the source provides one.
   */
  originalIdColumn?: string;
  /** Canonical field → source column mapping. */
  fields: OdsCulturalPropertyFieldMap;
  /**
   * Source columns that must be present in the artifact header. A schema
   * change must fail loudly, not silently produce undefined rows.
   */
  requiredColumns: string[];
  /** Prefix for the deterministic acquisition-layer record id. */
  idPrefix: string;
  /**
   * Set when the source artifact systematically stores 経度 in the 緯度 column
   * and 緯度 in the 経度 column (verified per-source, e.g. 八王子市 2026-08-15).
   * The normalization swaps the two so the canonical fields carry the correct
   * hemisphere values. Never set on uncertain data.
   */
  swapLatLon?: boolean;
}

/**
 * Per-source config registry, keyed by `SourceManifest.id`.
 *
 * `fields.name` / `fields.classification` are the record identity and must be
 * defined for every configured source (enforced in `adapter.ts` at normalize
 * time); their source columns are expected to also appear in `requiredColumns`.
 */
export const ODS_CULTURAL_PROPERTY_CONFIGS: Record<
  string,
  OdsCulturalPropertySourceConfig
> = {
  // 東京都指定文化財一覧 — 東京都教育庁 (Tokyo Open Data Catalog t000021d0000000017).
  [CULTURAL_PROPERTY_SOURCE_ID]: {
    originalIdColumn: 'NO',
    idPrefix: 'cp',
    requiredColumns: ['名称', '文化財分類'],
    fields: {
      classification: '文化財分類',
      category: '種類',
      name: '名称',
      nameKana: '名称_カナ',
      nameEn: '名称_英語',
      placeName: '場所名称',
      address: '住所',
      addressDetail: '方書',
      latitude: '緯度',
      longitude: '経度',
      owner: '所有者等',
      designatedOn: '文化財指定日',
      summaryJa: '概要',
      summaryEn: '概要_英語',
      descriptionJa: '説明',
      descriptionEn: '説明_英語',
      imageUrl: '画像',
      imageLicense: '画像_ライセンス',
      url: 'URL',
      lastConfirmedOn: '最終確認日',
    },
  },
  // 国立市 文化財一覧 — new ODS 標準 Ver1.5 (45 cols), UTF-8 CSV (no BOM).
  [KUNITACHI_CULTURAL_PROPERTY_SOURCE_ID]: {
    originalIdColumn: 'ID',
    idPrefix: 'cp',
    requiredColumns: ['名称', '文化財分類'],
    fields: {
      classification: '文化財分類',
      category: '種類',
      name: '名称',
      nameKana: '名称_カナ',
      nameEn: '名称_英語',
      placeName: '場所名称',
      address: '所在地_連結表記',
      addressDetail: '建物名等(方書)',
      latitude: '緯度',
      longitude: '経度',
      owner: '所有者等',
      designatedOn: '文化財指定日',
      summaryJa: '概要',
      summaryEn: '概要_英語',
      descriptionJa: '説明',
      descriptionEn: '説明_英語',
      imageUrl: '画像',
      imageLicense: '画像_ライセンス',
      url: 'URL',
    },
  },
  // 八王子市 文化財一覧 — old ODS 標準 (35 cols), XLSX. The source stores 経度
  // in the 緯度 column and 緯度 in the 経度 column (verified on all 135 filled
  // rows, 2026-08-15); `swapLatLon` restores the correct hemisphere values.
  [HACHIOJI_CULTURAL_PROPERTY_SOURCE_ID]: {
    originalIdColumn: 'NO',
    idPrefix: 'cp',
    requiredColumns: ['名称', '文化財分類'],
    swapLatLon: true,
    fields: {
      classification: '文化財分類',
      category: '種類',
      name: '名称',
      nameKana: '名称_カナ',
      nameEn: '名称_英語',
      placeName: '場所名称',
      address: '住所',
      addressDetail: '方書',
      latitude: '緯度',
      longitude: '経度',
      owner: '所有者等',
      designatedOn: '文化財指定日',
      summaryJa: '概要',
      summaryEn: '概要_英語',
      descriptionJa: '説明',
      descriptionEn: '説明_英語',
      imageUrl: '画像',
      imageLicense: '画像_ライセンス',
      url: 'URL',
    },
  },
};

/**
 * Resolve the config for a source. An unknown source id fails loudly so a
 * manifest that points at this adapter without a config cannot silently
 * produce nothing.
 */
export function resolveOdsCulturalPropertyConfig(
  manifestId: string,
): OdsCulturalPropertySourceConfig {
  const config = ODS_CULTURAL_PROPERTY_CONFIGS[manifestId];
  if (config === undefined) {
    throw new Error(`ods-cultural-property: no config registered for source "${manifestId}"`);
  }
  return config;
}
