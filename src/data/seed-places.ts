/**
 * Seed data: Tama places.
 *
 * NOTE ON PROVENANCE:
 * - The FROZEN pilot journey (Issue #127) uses real Okutama facilities:
 *   奥多摩観光案内所 / 千島わさび園 / 一心亭 / 獅子口屋 / 大丹波川国際虹ます釣場.
 *   Names and addresses are transcribed from the 一般社団法人奥多摩観光協会
 *   directory (https://www.okutama.gr.jp/site/, All Rights Reserved) on
 *   2026-08-08 into `src/data/generated/okutama-places.ts`; the curated records
 *   here copy that data (originalId links back to the generated dataset).
 *   These records are `origin: 'source'` (real facility data from an official
 *   source) with `verificationStatus: 'needs_confirmation'` — their
 *   coordinates are APPROXIMATE (OpenStreetMap district centroids, not
 *   field-verified) and must be re-verified during the Issue #10 Okutama
 *   fieldwork before production use. No `confirmedAt` exists (no stakeholder
 *   confirmation has been obtained).
 * - The remaining demo records (okutama-wasabi-field, okutama-soba-shop,
 *   okutama-fishing-center, okutama-michi-no-eki, kumma-hyakka-shop,
 *   uguisu-mochi-shop, hinode-yuzu-stand) are demo fixtures / check-in test
 *   scaffolding for cultures outside the frozen journey; they are kept for the
 *   location-based demo infrastructure and the non-pilot cultures.
 */
import type { Place } from './model';

export const PLACES: Place[] = [
  {
    id: 'okutama-wasabi-field',
    nameJa: '奥多摩わさび田',
    nameEn: 'Okutama Wasabi Field',
    address: '東京都西多摩郡奥多摩町（沢沿いのわさび田）',
    latitude: 35.8015,
    longitude: 139.0831,
    // Demo fixture kept for the location-based check-in/GTFS scaffolding; the
    // frozen journey (Issue #127) uses the real 千島わさび園 instead.
    foodCultureIds: [],
    type: 'farm',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-1',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-tourism-office',
    nameJa: '奥多摩観光案内所',
    nameEn: 'Okutama Tourist Information Center',
    address: '東京都西多摩郡奥多摩町氷川',
    // Precise OSM point (not a centroid) from the generated okutama dataset.
    latitude: 35.8089218,
    longitude: 139.0967554,
    foodCultureIds: ['wasabi-okutama'],
    type: 'info-center',
    source: {
      name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
      url: 'https://www.okutama.gr.jp/site/',
      license: 'All Rights Reserved（参考情報としてのみ利用）',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'okutama-tourism-office',
    },
    origin: 'source',
  },
  {
    id: 'chishima-wasabi-garden',
    nameJa: '千島わさび園',
    nameEn: 'Chishima Wasabi Garden',
    address: '東京都西多摩郡奥多摩町丹三郎8-2',
    // District-centroid coordinate (approx) from the generated okutama dataset.
    latitude: 35.8104963,
    longitude: 139.1538298,
    foodCultureIds: ['wasabi-okutama'],
    type: 'farm',
    source: {
      name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
      url: 'https://www.okutama.gr.jp/site/shopping/',
      license: 'All Rights Reserved（参考情報としてのみ利用）',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'chishima-wasabi-garden',
    },
    origin: 'source',
  },
  {
    id: 'soba-isshintei',
    nameJa: '一心亭',
    nameEn: 'Isshintei',
    address: '東京都西多摩郡奥多摩町丹三郎41-1',
    // District-centroid coordinate (approx) from the generated okutama dataset.
    latitude: 35.8104963,
    longitude: 139.1538298,
    foodCultureIds: ['wasabi-okutama', 'okutama-soba'],
    type: 'restaurant',
    source: {
      name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
      url: 'http://okutama-k.jimdo.com/食事/一心亭/',
      license: 'All Rights Reserved（参考情報としてのみ利用）',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'soba-isshintei',
    },
    origin: 'source',
  },
  {
    id: 'shishiguchiya',
    nameJa: '獅子口屋（わさび）',
    nameEn: 'Shishiguchiya (Wasabi)',
    address: '東京都西多摩郡奥多摩町大丹波190',
    // District-centroid coordinate (approx) from the generated okutama dataset.
    latitude: 35.8305487,
    longitude: 139.1621017,
    foodCultureIds: ['wasabi-okutama'],
    type: 'shop',
    source: {
      name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
      url: 'https://www.okutama.gr.jp/site/shopping/',
      license: 'All Rights Reserved（参考情報としてのみ利用）',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'shishiguchiya',
    },
    origin: 'source',
  },
  {
    id: 'odanba-fishing',
    nameJa: '大丹波川国際虹ます釣場',
    nameEn: 'Odanba-gawa International Rainbow Trout Pond',
    address: '東京都西多摩郡奥多摩町大丹波114',
    // District-centroid coordinate (approx) from the generated okutama dataset.
    latitude: 35.8305487,
    longitude: 139.1621017,
    foodCultureIds: ['wasabi-okutama'],
    type: 'other',
    source: {
      name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
      url: 'http://www.ohtabaturiba.com/',
      license: 'All Rights Reserved（参考情報としてのみ利用）',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'odanba-trout-fishing',
    },
    origin: 'source',
  },
  {
    id: 'okutama-fishing-center',
    nameJa: '奥多摩フィッシングセンター',
    nameEn: 'Okutama Fishing Center',
    address: '東京都西多摩郡奥多摩町（多摩川沿い）',
    latitude: 35.8042,
    longitude: 139.0972,
    foodCultureIds: ['yamame-okutama'],
    type: 'other',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-3',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-soba-shop',
    nameJa: '奥多摩そば処',
    nameEn: 'Okutama Soba Shop',
    address: '東京都西多摩郡奥多摩町氷川（奥多摩駅周辺）',
    latitude: 35.8092,
    longitude: 139.0986,
    foodCultureIds: ['okutama-soba'],
    type: 'restaurant',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-4',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-michi-no-eki',
    nameJa: '奥多摩駅前 道の駅',
    nameEn: 'Okutama Station Roadside Station',
    address: '東京都西多摩郡奥多摩町氷川（奥多摩駅前）',
    latitude: 35.8095,
    longitude: 139.0994,
    foodCultureIds: ['okutama-konnyaku', 'okutama-soba'],
    type: 'shop',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-5',
    },
    origin: 'demo',
  },
  {
    id: 'kumma-hyakka-shop',
    nameJa: '青梅 くんまひゃっか店',
    nameEn: 'Ome Kumma Hyakka Shop',
    address: '東京都青梅市（青梅駅周辺）',
    latitude: 35.7881,
    longitude: 139.2757,
    foodCultureIds: ['kumma-hyakka-ome'],
    type: 'shop',
    source: {
      name: '青梅市',
      url: 'https://www.city.ome.tokyo.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-6',
    },
    origin: 'demo',
  },
  {
    id: 'uguisu-mochi-shop',
    nameJa: '青梅 和菓子店',
    nameEn: 'Ome Wagashi Shop',
    address: '東京都青梅市（青梅駅周辺）',
    latitude: 35.7874,
    longitude: 139.2745,
    foodCultureIds: ['uguisu-mochi-ome'],
    type: 'shop',
    source: {
      name: '青梅市観光協会',
      url: 'https://www.city.ome.tokyo.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-7',
    },
    origin: 'demo',
  },
  {
    id: 'hinode-yuzu-stand',
    nameJa: '日の出 ゆず直売所',
    nameEn: 'Hinode Yuzu Stand',
    address: '東京都西多摩郡日の出町（ゆず園周辺）',
    latitude: 35.7422,
    longitude: 139.2717,
    foodCultureIds: ['yuzu-hinode'],
    type: 'farm',
    source: {
      name: '日の出町',
      url: 'https://www.town.hinode.tokyo.jp/',
      lastVerified: '2026-08-08',
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
      originalId: 'seed-place-8',
    },
    origin: 'demo',
  },
];
