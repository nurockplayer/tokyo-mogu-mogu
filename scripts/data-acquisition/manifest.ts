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
import { CULTURAL_PROPERTY_SOURCE_ID } from './adapters/cultural-property/adapter.ts';

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
  adapterId: 'cultural-property',
  credentialsRequired: false,
  sourceUpdatedAt: '2026-01-15T03:07:25Z',
  lastVerifiedAt: '2026-08-15',
  productUsage:
    'Potential Story / Spot / Route enrichment anchor (research #130 C1). Acquisition alone makes no Product-visible claim.',
  cachePath: 'cultural-property/130001_cultural_property.csv',
};

/** Every configured source. `data:sync` iterates this list in order. */
export const SOURCE_MANIFESTS: SourceManifest[] = [CULTURAL_PROPERTY_SOURCE];
