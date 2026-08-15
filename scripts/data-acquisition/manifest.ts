/**
 * Source registry for the acquisition layer (#175).
 *
 * This is the single machine-readable inventory of acquirable sources. Each
 * entry is declarative; the sync engine (`sync.ts`) drives acquisition from
 * this list. Adding a source is one manifest entry plus a registered adapter.
 *
 * `retrievedAt` / `checksum` are the last-known state recorded by a
 * `data:sync` run (persisted under `.data-cache/`, not committed here) — they
 * are intentionally absent from the static manifest until a run happens.
 */
import type { SourceManifest } from './types.ts';
import {
  CULTURAL_PROPERTY_SOURCE_ID,
  HACHIOJI_CULTURAL_PROPERTY_SOURCE_ID,
  KUNITACHI_CULTURAL_PROPERTY_SOURCE_ID,
} from './adapters/ods-cultural-property/config.ts';

/** 東京都指定文化財一覧 — 東京都教育庁, Tokyo Open Data Catalog (CC BY 4.0). */
export const CULTURAL_PROPERTY_SOURCE: SourceManifest = {
  id: CULTURAL_PROPERTY_SOURCE_ID,
  provider: '東京都教育庁',
  url: 'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
  acquisitionType: 'http_file',
  datasetId: 't000021d0000000017',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t000021d0000000017',
  format: 'csv',
  encoding: 'cp932',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  reuseNotes:
    '東京オープンデータカタログ経由（東京都教育庁）。東京都指定文化財の一覧で、所有者・管理者の承諾が得られたもののみ公開。出典表示が条件。',
  adapterId: 'ods-cultural-property',
  credentialsRequired: false,
  sourceUpdatedAt: '2026-01-15T03:07:25Z',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential Story / Spot / Route enrichment anchor (research #130 C1). Acquisition alone makes no Product-visible claim.',
  cachePath: 'ods-cultural-property/130001_cultural_property.csv',
};

/** 国立市 文化財一覧 — 国立市, Tokyo Open Data Catalog, 新 ODS 標準 Ver1.5 (CC BY 4.0). */
export const KUNITACHI_CULTURAL_PROPERTY_SOURCE: SourceManifest = {
  id: KUNITACHI_CULTURAL_PROPERTY_SOURCE_ID,
  provider: '国立市',
  url: 'https://www.opendata.metro.tokyo.lg.jp/kunitachi/132152_cultural_property.csv',
  acquisitionType: 'http_file',
  datasetId: 't132152d0000000014',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132152d0000000014',
  format: 'csv',
  encoding: 'utf-8',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  reuseNotes:
    '東京オープンデータカタログ経由（国立市）。自治体標準データセット（新 ODS 標準 Ver1.5）準拠の文化財一覧。出典表示が条件。',
  adapterId: 'ods-cultural-property',
  credentialsRequired: false,
  sourceUpdatedAt: '2025-03-27T05:00:00',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential Story / Spot / Route enrichment anchor (research #130 C1). Acquisition alone makes no Product-visible claim.',
  cachePath: 'ods-cultural-property/132152_cultural_property.csv',
};

/** 八王子市 文化財一覧 — 八王子市, Tokyo Open Data Catalog, 旧 ODS 標準 (CC BY 4.0). */
export const HACHIOJI_CULTURAL_PROPERTY_SOURCE: SourceManifest = {
  id: HACHIOJI_CULTURAL_PROPERTY_SOURCE_ID,
  provider: '八王子市',
  url: 'https://www.city.hachioji.tokyo.jp/contents/open/002/p005877_d/fil/bunkazaiichiran.xlsx',
  acquisitionType: 'http_file',
  datasetId: 't132012d3000000018',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018',
  format: 'xlsx',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  reuseNotes:
    '東京オープンデータカタログ経由（八王子市）。自治体標準データセット（旧 ODS 標準）準拠の文化財一覧。ソースの 緯度/経度 列は値が入れ替わって収録されているため、正しい半球値に補正して正規化する（2026-08-15 検証）。出典表示が条件。',
  adapterId: 'ods-cultural-property',
  credentialsRequired: false,
  sourceUpdatedAt: '2024-04-30T15:00:00',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential Story / Spot / Route enrichment anchor (research #130 C1). Acquisition alone makes no Product-visible claim.',
  cachePath: 'ods-cultural-property/132012_cultural_property.xlsx',
};

/** 東京都内の飲食店のバリアフリー情報 — 東京都産業労働局, CC BY 4.0, CP932 CSV. */
export const BARRIER_FREE_SOURCE: SourceManifest = {
  id: 'tokyo-barrier-free-guide',
  provider: '東京都産業労働局観光部受入環境課',
  url: 'https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/barrier-free-guide.csv',
  acquisitionType: 'http_file',
  datasetId: 't000012d0000000063',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t000012d0000000063',
  format: 'csv',
  encoding: 'cp932',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  reuseNotes:
    '東京オープンデータカタログ経由（東京都産業労働局）。飲食店のバリアフリー情報。店舗の自己申告による参照であり安全性の保証ではない。空欄は「無い」ではなく「不明」。出典表示が条件。',
  adapterId: 'barrier-free',
  credentialsRequired: false,
  sourceUpdatedAt: '2024-03-12T08:00:00',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential Story / Spot accessibility-reference enrichment anchor. Acquisition alone makes no Product-visible claim.',
  cachePath: 'barrier-free/barrier-free-guide.csv',
};

/** 東京都青梅市における飲食店一覧 — 青梅市, CC BY 4.0, XLSX. */
export const OME_FOOD_BUSINESS_SOURCE: SourceManifest = {
  id: 'ome-food-business-list',
  provider: '青梅市地域経済部商工業振興課',
  url: 'https://www.opendata.metro.tokyo.lg.jp/ome/132055_food_business_all.xlsx',
  acquisitionType: 'http_file',
  datasetId: 't132055d0000000009',
  catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132055d0000000009',
  format: 'xlsx',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  reuseNotes:
    '東京オープンデータカタログ経由（青梅市）。飲食店営業許可の一覧・登録情報で、施設の識別・営業状態の調査用途のみ。メニュー・原材料・営業時間・バリアフリー情報は無く、現在営業中であることや東京産食材の使用を証明するものではない。出典表示が条件。',
  adapterId: 'ome-food-business',
  credentialsRequired: false,
  sourceUpdatedAt: '2024-03-21T03:27:00',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential facility-identity / status-investigation anchor for Ome food businesses. Acquisition alone makes no Product-visible claim.',
  cachePath: 'ome-food-business/132055_food_business_all.xlsx',
};

/**
 * 農林業センサス 市町村別統計表 — 総務省統計局 e-Stat (credential-gated seam).
 *
 * Declared acquisition seam: without an `ESTAT_APPLICATION_ID`, `data:sync`
 * reports this source as 'skipped' (never fetched). The adapter is not yet
 * implemented; with a credential present the source would fail loudly until an
 * `estat` adapter is registered — this is the required explicit skipped/manual
 * boundary for authenticated sources without a live fetch promise (Issue #175).
 */
export const ESTAT_AGRICULTURE_CENSUS_SOURCE: SourceManifest = {
  id: 'estat-agriculture-census-municipal',
  provider: '農林水産省 / e-Stat',
  url: 'https://www.e-stat.go.jp/stat-search/files?toukei=00500209&tstat=000001032920',
  acquisitionType: 'api',
  datasetId: '000001032920',
  catalogUrl: 'https://www.e-stat.go.jp/stat-search/files?toukei=00500209&tstat=000001032920',
  format: 'json',
  license: '政府標準利用規約（第2.0版）準拠・出典表示が必要（e-Stat）',
  reuseNotes:
    'e-Stat API 経由（統計法に基づく調査）。市町村別の農業経営体指標（2020年センサス）。取得には Application ID が必要。出典表示が条件。',
  adapterId: 'estat',
  credentialsRequired: true,
  credentialEnv: 'ESTAT_APPLICATION_ID',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential municipality agriculture-vitality profile (research #130 F6). Declared seam: skipped without a credential, never a Product-visible claim.',
  cachePath: 'estat/agriculture-census.json',
};

/** Every configured source. `data:sync` iterates this list in order. */
export const SOURCE_MANIFESTS: SourceManifest[] = [
  CULTURAL_PROPERTY_SOURCE,
  KUNITACHI_CULTURAL_PROPERTY_SOURCE,
  HACHIOJI_CULTURAL_PROPERTY_SOURCE,
  BARRIER_FREE_SOURCE,
  OME_FOOD_BUSINESS_SOURCE,
  ESTAT_AGRICULTURE_CENSUS_SOURCE,
];
