/**
 * Seed data: Tokyo places.
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
 *   location-based demo infrastructure and the non-pilot cultures. Their source
 *   metadata is `sourceType: 'demo'` + `verificationStatus: 'demo'` (Issue #10
 *   audit): they are scaffolds, not unconfirmed real facilities, so they must
 *   never read as official_web data awaiting confirmation.
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
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
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
    coordinatePrecision: 'precise',
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
    coordinatePrecision: 'approximate',
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
    coordinatePrecision: 'approximate',
    // A soba restaurant (snapshot: category restaurant, no wasabi menu) — the
    // wasabi association is NOT sourced, so only the soba culture is listed
    // (Issue #127: foodCultureIds = cultures experienced HERE).
    foodCultureIds: ['okutama-soba'],
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
    coordinatePrecision: 'approximate',
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
    // Source-backed English name from the committed snapshot (Otaba-gawa, not
    // "Odanba-gawa") — Issue #127.
    nameEn: 'Otaba-gawa International Rainbow Trout Pond',
    address: '東京都西多摩郡奥多摩町大丹波114',
    // District-centroid coordinate (approx) from the generated okutama dataset.
    latitude: 35.8305487,
    longitude: 139.1621017,
    coordinatePrecision: 'approximate',
    // A rainbow-trout fishing facility (snapshot). It stays on the wasabi
    // journey as an editorial stop, but no FoodCulture can be experienced HERE,
    // so foodCultureIds is empty (Issue #127).
    foodCultureIds: [],
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
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
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
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
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
    // Demo fixture for the konnyaku culture (off the frozen journey). The soba
    // back-ref was tied to the old wasabi journey's step 4 and is no longer
    // reciprocal, so it was removed to keep Place ↔ FoodCulture symmetric.
    foodCultureIds: ['okutama-konnyaku'],
    type: 'shop',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
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
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
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
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
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
      sourceType: 'demo',
      retrievedAt: '2026-08-08',
      verificationStatus: 'demo',
      originalId: 'seed-place-8',
    },
    origin: 'demo',
  },
  // ---- 青梅・沢井 slice (Issue #163) ----------------------------------------
  // Real Ome/Sawai facilities for the source-backed `ome-sawai-sake-journey`.
  // Names/addresses are transcribed from the cited official / open-data sources
  // (official pages refreshed 2026-08-19): 小澤酒造 official site (sawanoi-sake.com), its 澤乃井園
  // page, and 東京都教育庁 文化財一覧 (東京都指定文化財, CC BY 4.0,
  // 130001_cultural_property.csv). These records are origin: 'source' with
  // verificationStatus: 'needs_confirmation' — coordinates for the brewery and
  // garden are APPROXIMATE (Sawai-Station / Tama-riverside area, not
  // field-verified); the shrine coordinate is the authoritative coordinate from
  // the designated-cultural-property open data. No confirmedAt exists.
  {
    id: 'sawai-ozawa-shuzo',
    nameJa: '小澤酒造（沢井・澤乃井）',
    nameEn: 'Ozawa Shuzo Sawai (Sawanoi)',
    address: '東京都青梅市沢井2-770',
    // Approximate area coordinate near Sawai Station on the Tama River; the
    // precise building point was not field-verified (needs field confirmation).
    latitude: 35.7967,
    longitude: 139.167,
    coordinatePrecision: 'approximate',
    foodCultureIds: ['sake-ome'],
    type: 'brewery',
    source: {
      name: '小澤酒造（公式サイト）',
      url: 'https://www.sawanoi-sake.com/',
      sourceType: 'official_web',
      retrievedAt: '2026-08-19',
      verificationStatus: 'needs_confirmation',
      originalId: 'ozawa-shuzo',
    },
    origin: 'source',
  },
  {
    id: 'sawanoien-garden',
    nameJa: '澤乃井園',
    nameEn: 'Sawanoien Garden',
    address: '東京都青梅市沢井2-770',
    // Approximate area coordinate near Sawai Station / Tama riverside, shared
    // with the brewery premises (needs field confirmation).
    latitude: 35.7966,
    longitude: 139.1671,
    coordinatePrecision: 'approximate',
    foodCultureIds: ['sake-ome'],
    type: 'restaurant',
    source: {
      name: '小澤酒造 澤乃井園（公式）',
      url: 'https://www.sawanoi-sake.com/service/sawanoien/',
      sourceType: 'official_web',
      retrievedAt: '2026-08-19',
      verificationStatus: 'needs_confirmation',
      originalId: 'sawanoien',
    },
    origin: 'source',
  },
  {
    id: 'mitake-shrine',
    nameJa: '御嶽神社',
    nameEn: 'Mitake Shrine',
    address: '東京都青梅市御岳山176',
    // Authoritative coordinate from the Tokyo designated cultural property open
    // data (東京都教育庁 文化財一覧, 130001_cultural_property.csv, CC BY 4.0).
    latitude: 35.782772,
    longitude: 139.150253,
    coordinatePrecision: 'precise',
    // A designated cultural property (御嶽神社旧本殿); no sake is experienced
    // HERE, so foodCultureIds stays empty (Issue #127, like odanba-fishing).
    foodCultureIds: [],
    type: 'other',
    source: {
      name: '東京都教育庁 文化財一覧（東京都指定文化財）',
      url: 'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
      license: 'CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）',
      sourceType: 'open_data',
      sourceDatasetId: '445ee18d-ee49-4659-9667-de8630bd0d0e',
      retrievedAt: '2026-08-14',
      verificationStatus: 'needs_confirmation',
      originalId: '御嶽神社旧本殿',
    },
    origin: 'source',
  },
  {
    id: 'baba-oshijutaku',
    nameJa: '馬場家御師住宅',
    nameEn: 'Baba House Oshi Residence',
    address: '東京都青梅市御岳山54',
    // Authoritative coordinate from the Tokyo designated cultural property open
    // data (東京都教育庁 文化財一覧, 130001_cultural_property.csv, CC BY 4.0).
    latitude: 35.785996,
    longitude: 139.151073,
    coordinatePrecision: 'precise',
    // A designated cultural property with no sake experience HERE.
    foodCultureIds: [],
    type: 'other',
    source: {
      name: '東京都教育庁 文化財一覧（東京都指定文化財）',
      url: 'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
      license: 'CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）',
      sourceType: 'open_data',
      sourceDatasetId: '445ee18d-ee49-4659-9667-de8630bd0d0e',
      retrievedAt: '2026-08-14',
      verificationStatus: 'needs_confirmation',
      originalId: '馬場家御師住宅',
    },
    origin: 'source',
  },
  // ---- 八王子 slice (Issue #238) -------------------------------------------
  // The roadside station is a public, source-backed food-culture destination.
  // Its map point is an approximate OpenStreetMap point; use the sourced name
  // and address for directions rather than treating it as field-verified.
  {
    id: 'hachioji-takiyama-roadside-station',
    nameJa: '道の駅八王子滝山',
    nameEn: 'Michi-no-Eki Hachioji Takiyama',
    address: '東京都八王子市滝山町1-592-2',
    latitude: 35.6864699,
    longitude: 139.3414479,
    coordinatePrecision: 'approximate',
    foodCultureIds: ['hachioji-ginger'],
    type: 'shop',
    source: {
      name: '道の駅八王子滝山（公式）／OpenStreetMap',
      url: 'https://www.michinoeki-hachioji.net/',
      license: 'ODbL 1.0（座標）／施設情報は公式サイト',
      sourceType: 'official_web',
      retrievedAt: '2026-08-19',
      verificationStatus: 'needs_confirmation',
      originalId: 'michi-no-eki-hachioji-takiyama',
    },
    origin: 'source',
  },
  // This is a contextual heritage stop on the route, not a place where the
  // ginger is sold. The cultural-property row is CC BY 4.0; the displayed map
  // point is an approximate OpenStreetMap point for the broad castle site.
  {
    id: 'hachioji-takiyama-castle',
    nameJa: '滝山城跡',
    nameEn: 'Takiyama Castle Ruins',
    address: '東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目',
    latitude: 35.6973812,
    longitude: 139.3252639,
    coordinatePrecision: 'approximate',
    foodCultureIds: [],
    type: 'other',
    source: {
      name: '八王子市文化財一覧（オープンデータ）／OpenStreetMap',
      url: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018',
      license: 'CC BY 4.0（文化財データ）／ODbL 1.0（座標）',
      sourceType: 'open_data',
      sourceDatasetId: 't132012d3000000018',
      retrievedAt: '2026-08-15',
      verificationStatus: 'needs_confirmation',
      originalId: 'cp-t132012d3000000018-0000000003',
    },
    origin: 'source',
  },
];
