/**
 * Seed data: deterministic model routes and spot details (Issue #45, S5/S6).
 *
 * Provenance:
 * - Route structure, step ordering, stay durations, and mobility segments are
 *   TEAM-EDITORIAL (origin: 'editorial') authored for the frozen 奥多摩 × 東京わさび
 *   pilot journey (Issue #127). They are a coherent suggested itinerary, not a
 *   verified schedule.
 * - The journey's stops are the REAL facilities curated in `src/data/seed-places.ts`
 *   (奥多摩観光案内所 / 千島わさび園 / 一心亭 / 獅子口屋 / 大丹波川国際虹ます釣場,
 *   origin: 'source', coordinates approximate — needs_confirmation).
 * - Practical spot details (hours / price / reservation) are ONLY populated
 *   when the underlying source data supports them. Everything else renders as
 *   an explicit unknown/unverified state in the S6 screen.
 *
 * This module is additive: it imports from `src/data/model.ts` but never edits
 * it. All types below are route-specific and live here.
 */
import type { DataSource, Place } from './model';

/** Which of the two authored route durations is shown. */
export type RouteDuration = 'half-day' | '1-day';

/** Transport mode for a between-step mobility segment. */
export type RouteMobilityMode = 'train' | 'bus' | 'walk';

/** One numbered stop on a route (pin number == step number on the map). */
export interface RouteStepData {
  /** Place id — must resolve via getPlaceById. */
  placeId: string;
  /** 1-based step number; also the map pin number. */
  stepNumber: number;
  /** Recommended time spent at this stop, in minutes. */
  stayMinutes: number;
  /** Short narrative of the step's role in its food-culture journey (editorial). */
  roleJa: string;
  roleEn: string;
}

/** Mobility between two consecutive route steps. */
export interface RouteMobilitySegment {
  /** 1-based step the traveller is leaving. */
  fromStep: number;
  /** 1-based step the traveller arrives at. */
  toStep: number;
  mode: RouteMobilityMode;
  durationMinutes: number;
  /** Line / route label, e.g. "JR青梅線". */
  labelJa: string;
  labelEn: string;
}

/** One fully-authored route variant (half-day or 1-day). */
export interface RouteVariant {
  /** Transport summary for the course header (editorial). */
  transportJa: string;
  transportEn: string;
  /** Sum of stop stays + mobility, minutes (editorial estimate). */
  totalMinutes: number;
  steps: RouteStepData[];
  mobility: RouteMobilitySegment[];
}

/** A deterministic model route with two authored variants. */
export interface ModelRoute {
  id: string;
  nameJa: string;
  nameEn: string;
  /** Region/area the route serves, e.g. 奥多摩 / Okutama. */
  areaJa: string;
  areaEn: string;
  /** The variant shown first; the user toggles to the other. */
  defaultDuration: RouteDuration;
  variants: Record<RouteDuration, RouteVariant>;
  /** Provenance of the editorial route. */
  source: DataSource;
  /** Additional sources used by this route's stops or contextual facts. */
  sources?: readonly DataSource[];
  /** True only for the frozen 8/23 Okutama golden-path demo route. */
  isDemo?: boolean;
}

/** Optional verified practical data — only present when source data exists. */
export interface SpotPracticalInfo {
  accessJa?: string;
  accessEn?: string;
  hoursJa?: string;
  hoursEn?: string;
  closedDaysJa?: string;
  closedDaysEn?: string;
  priceJa?: string;
  priceEn?: string;
  /** True only when the venue is verifiably reservable (booking available). */
  reservationAvailable?: boolean;
}

/** Tags shown on S6 where data exists (never claimed when absent). */
export interface SpotTags {
  /** Languages spoken on site, when the source states them. */
  language?: Array<'ja' | 'en'>;
  /** True when the venue is known to be vegetarian-friendly. */
  vegetarian?: boolean;
  /** True when an allergy notice / disclosure exists on site. */
  allergyNotice?: boolean;
  /** True when accessibility support is stated by the source. */
  accessibility?: boolean;
}

/**
 * Editorial + optional verified data for one spot's S6 page.
 *
 * `practical` is only populated from real source data; otherwise leave it
 * undefined and the screen renders an explicit unknown/unverified state.
 */
export interface SpotDetail {
  placeId: string;
  /** Editorial story of the spot's role in its food-culture journey. */
  roleJa: string;
  roleEn: string;
  /** Practical info verified from a source; absent ⇒ unverified state. */
  practical?: SpotPracticalInfo;
  /** Clearly-marked demo fixture for a status/warning the demo needs. */
  demoNote?: {
    tone: 'warning' | 'info';
    noteJa: string;
    noteEn: string;
  };
  /** Data-backed tags; each only when the source supports it. */
  tags: SpotTags;
  origin: 'editorial';
  source: DataSource;
}

const SOURCE_OKUTAMA: DataSource = {
  name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
  url: 'https://www.okutama.gr.jp/site/',
  license: 'All Rights Reserved（参考情報としてのみ利用）',
  sourceType: 'official_web',
  retrievedAt: '2026-08-08',
  verificationStatus: 'needs_confirmation',
  originalId: 'seed-route-1',
};

/**
 * 青梅・沢井 slice (Issue #163) — the source-backed sake × culture journey.
 *
 * Route structure, step ordering, stay durations, and mobility segments are
 * TEAM-EDITORIAL (origin: 'editorial') authored as a coherent suggested
 * itinerary, not a verified schedule. The stops are the REAL facilities
 * curated in `src/data/seed-places.ts` (小澤酒造 / 澤乃井園 / 御嶽神社 / 馬場家御師住宅,
 * origin: 'source', needs_confirmation). Mobility for the 沢井 → 御岳 leg
 * combines JR青梅線 with the 御岳登山鉄道 cable car; run information is
 * editorial/hedged and no transit times are claimed. Practical spot details
 * are populated only where the current official source states them. The
 * brewery tour and Sawanoien fields remain needs_confirmation at the record
 * boundary; unsourced dietary/accessibility claims stay absent.
 * isDemo is intentionally ABSENT — this is a source-backed route, not demo.
 */
const SOURCE_OME_ROUTE: DataSource = {
  name: '編集部（青梅・沢井の酒蔵と御嶽の文化財）',
  url: 'https://www.sawanoi-sake.com/',
  sourceType: 'official_web',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'seed-route-ome',
};

const SOURCE_SAWANOI: DataSource = {
  name: '小澤酒造 酒蔵見学（公式）',
  url: 'https://www.sawanoi-sake.com/service/kengaku/',
  sourceType: 'official_web',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'sawanoi-brewery-tour',
};

const SOURCE_SAWANOIEN: DataSource = {
  name: '小澤酒造 澤乃井園（公式）',
  url: 'https://www.sawanoi-sake.com/service/sawanoien/',
  sourceType: 'official_web',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'sawanoien',
};

const SOURCE_MITAKE_HERITAGE: DataSource = {
  name: '東京都教育庁 文化財一覧（東京都指定文化財）',
  url: 'https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv',
  license: 'CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）',
  sourceType: 'open_data',
  sourceDatasetId: '445ee18d-ee49-4659-9667-de8630bd0d0e',
  retrievedAt: '2026-08-14',
  verificationStatus: 'needs_confirmation',
  originalId: '御嶽神社旧本殿',
};

/** Hachioji × ginger/produce slice (Issue #238). */
const SOURCE_HACHIOJI_ROUTE: DataSource = {
  name: '編集部（八王子ショウガと滝山の食文化）',
  url: 'https://www.tokyo-ja.or.jp/farm/edo/41.php',
  sourceType: 'official_web',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'seed-route-hachioji-ginger',
};

const SOURCE_HACHIOJI_MARKET: DataSource = {
  name: '道の駅八王子滝山（公式）',
  url: 'https://www.michinoeki-hachioji.net/',
  sourceType: 'official_web',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'michi-no-eki-hachioji-takiyama',
};

const SOURCE_HACHIOJI_HERITAGE: DataSource = {
  name: '八王子市文化財一覧（オープンデータ）',
  url: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018',
  license: 'CC BY 4.0',
  sourceType: 'open_data',
  sourceDatasetId: 't132012d3000000018',
  retrievedAt: '2026-08-15',
  verificationStatus: 'needs_confirmation',
  originalId: 'cp-t132012d3000000018-0000000003',
};

const SOURCE_HACHIOJI_COORDINATES: DataSource = {
  name: 'OpenStreetMap（八王子滝山・滝山城跡の概略座標）',
  url: 'https://www.openstreetmap.org/?mlat=35.6864699&mlon=139.3414479#map=13/35.692/139.333',
  license: 'ODbL 1.0',
  sourceType: 'open_data',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'geocoded-hachioji-places',
};

/** Fussa × Tokyo Sake journey sources (Issue #243). */
const SOURCE_FUSSA_ROUTE: DataSource = {
  name: '編集部（福生の2つの酒蔵と水のまち）',
  url: 'https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html',
  sourceType: 'official_web',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'seed-route-fussa-sake',
};

const SOURCE_FUSSA_CITY_SAKE: DataSource = {
  name: '福生市「Tokyo SAKE Brewery」',
  url: 'https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2017-01-10',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'fussa-tokyo-sake-brewery-1005934',
};

const SOURCE_FUSSA_WATER: DataSource = {
  name: '福生市「水と緑の味わいコース」',
  url: 'https://www.city.fussa.tokyo.jp/sightseeing/jousui/1004236.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2016-07-28',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'fussa-water-heritage-course-1004236',
};

const SOURCE_FUSSA_TAMURA: DataSource = {
  name: '田村酒造場（公式）',
  url: 'https://www.tamurashuzojo.com/page/kura',
  sourceType: 'business',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'tamura-shuzojo-kura',
};

const SOURCE_FUSSA_ISHIKAWA: DataSource = {
  name: '石川酒造（公式アクセス）',
  url: 'https://www.tamajiman.co.jp/access/',
  sourceType: 'business',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'ishikawa-shuzo-access',
};

const SOURCE_FUSSA_KURUMIRU: DataSource = {
  name: '福生市「くるみる ふっさ」',
  url: 'https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2021-06-16',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'kurumiru-fussa-1001605',
};

const SOURCE_FUSSA_COORDINATES: DataSource = {
  name: 'MapFan（福生駅周辺の概略座標）',
  url: 'https://mapfan.com/spots/SCH%2CJ%2CSN',
  sourceType: 'business',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'geocoded-fussa-station-area',
};

const SOURCE_FUSSA_ISHIKAWA_COORDINATES: DataSource = {
  name: 'OpenStreetMap（石川酒造）',
  url: 'https://www.openstreetmap.org/node/2365654277',
  license: 'ODbL 1.0',
  sourceType: 'open_data',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'geocoded-fussa-ishikawa-shuzo',
};

/** Akiruno seasonal-produce journey sources (Issue #244). */
const SOURCE_AKIRUNO_ROUTE: DataSource = {
  name: '編集部（秋川の旬の農産物）',
  url: 'https://www.city.akiruno.tokyo.jp/kanko/0000001109.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2024-04-09',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'seed-route-akiruno-seasonal-produce',
};

const SOURCE_AKIRUNO_SPECIALTIES: DataSource = {
  name: 'あきる野市「特産品」',
  url: 'https://www.city.akiruno.tokyo.jp/kanko/0000001109.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2024-04-09',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'akiruno-specialty-foods-1109',
};

const SOURCE_AKIRUNO_FARMERS: DataSource = {
  name: 'あきる野市「秋川ファーマーズセンター」',
  url: 'https://www.city.akiruno.tokyo.jp/0000003556.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2026-04-02',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'akiruno-farmers-center-3556',
};

const SOURCE_AKIRUNO_SEOTO: DataSource = {
  name: '秋川渓谷 瀬音の湯（公式アクセス）',
  url: 'https://www.seotonoyu.jp/access',
  sourceType: 'business',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'seoto-no-yu-access',
};

const SOURCE_AKIRUNO_GOTOKYO: DataSource = {
  name: '東京の観光公式サイト GO TOKYO「秋川渓谷 瀬音の湯」',
  url: 'https://www.gotokyo.org/jp/spot/397/index.html',
  sourceType: 'official_web',
  sourceUpdatedAt: '2025-10-31',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'gotokyo-seoto-no-yu-397',
};

const SOURCE_AKIRUNO_FARMERS_COORDINATES: DataSource = {
  name: 'OpenStreetMap（秋川ファーマーズセンター）',
  url: 'https://www.openstreetmap.org/node/1668525947',
  license: 'ODbL 1.0',
  sourceType: 'open_data',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'geocoded-akiruno-farmers-center',
};

const SOURCE_AKIRUNO_SEOTO_COORDINATES: DataSource = {
  name: 'NAVITIME（瀬音の湯の概略座標）',
  url: 'https://www.navitime.co.jp/poi?spot=02301-3000011',
  sourceType: 'business',
  retrievedAt: '2026-08-19',
  verificationStatus: 'needs_confirmation',
  originalId: 'geocoded-akiruno-seoto-no-yu',
};

/** Deterministic editorial model route — 奥多摩 × 東京わさび. */
export const MODEL_ROUTES: ModelRoute[] = [
  {
    id: 'okutama-wasabi-journey',
    nameJa: '奥多摩わさび紀行',
    nameEn: 'Okutama Wasabi Journey',
    areaJa: '奥多摩',
    areaEn: 'Okutama',
    defaultDuration: 'half-day',
    source: SOURCE_OKUTAMA,
    isDemo: true,
    variants: {
      'half-day': {
        transportJa: 'JR青梅線・西東京バス',
        transportEn: 'JR Ome Line & Nishi Tokyo Bus',
        totalMinutes: 200,
        steps: [
          {
            placeId: 'okutama-tourism-office',
            stepNumber: 1,
            stayMinutes: 15,
            roleJa: '出発点。わさびの産地への行き方と地域の情報を集めます。',
            roleEn: 'Start here to pick up maps and local guidance for the wasabi-growing area.',
          },
          {
            placeId: 'chishima-wasabi-garden',
            stepNumber: 2,
            stayMinutes: 45,
            roleJa: '奥多摩のわさびの産地、丹三郎へ。わさびと加工品を扱う千島わさび園があります。',
            roleEn:
              'Head to Tanzaburo, Okutama\'s wasabi-growing area — home of Chishima Wasabi Garden, which sells wasabi and wasabi products.',
          },
          {
            placeId: 'soba-isshintei',
            stepNumber: 3,
            stayMinutes: 60,
            roleJa: '丹三郎のそば店で昼食を。',
            roleEn: 'Lunch at the soba restaurant in Tanzaburo.',
          },
          {
            placeId: 'shishiguchiya',
            stepNumber: 4,
            stayMinutes: 30,
            roleJa: '大丹波のわさびの店で、わさびのお土産を選べます。',
            roleEn: 'Choose wasabi souvenirs at the wasabi shop in Odanba.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'bus',
            durationMinutes: 25,
            labelJa: '西東京バス',
            labelEn: 'Nishi Tokyo Bus',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'walk',
            durationMinutes: 10,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
          {
            fromStep: 3,
            toStep: 4,
            mode: 'bus',
            durationMinutes: 15,
            labelJa: '西東京バス',
            labelEn: 'Nishi Tokyo Bus',
          },
        ],
      },
      '1-day': {
        transportJa: 'JR青梅線・西東京バス',
        transportEn: 'JR Ome Line & Nishi Tokyo Bus',
        totalMinutes: 285,
        steps: [
          {
            placeId: 'okutama-tourism-office',
            stepNumber: 1,
            stayMinutes: 15,
            roleJa: '出発点。わさびの産地への行き方と地域の情報を集めます。',
            roleEn: 'Start here to pick up maps and local guidance for the wasabi-growing area.',
          },
          {
            placeId: 'chishima-wasabi-garden',
            stepNumber: 2,
            stayMinutes: 60,
            roleJa: '奥多摩のわさびの産地、丹三郎を訪れます。わさびと加工品を扱う千島わさび園があります。',
            roleEn:
              'Visit Tanzaburo, Okutama\'s wasabi-growing area — home of Chishima Wasabi Garden, which sells wasabi and wasabi products.',
          },
          {
            placeId: 'soba-isshintei',
            stepNumber: 3,
            stayMinutes: 60,
            roleJa: '丹三郎のそば店で昼食を。',
            roleEn: 'Lunch at the soba restaurant in Tanzaburo.',
          },
          {
            placeId: 'odanba-fishing',
            stepNumber: 4,
            stayMinutes: 60,
            roleJa: '大丹波にある虹ますの釣り施設。大丹波川国際虹ます釣場を訪ねます。',
            roleEn:
              'A rainbow-trout fishing facility in Odanba — Otaba-gawa International Rainbow Trout Pond.',
          },
          {
            placeId: 'shishiguchiya',
            stepNumber: 5,
            stayMinutes: 30,
            roleJa: '大丹波のわさびの店で、わさびのお土産を選べます。',
            roleEn: 'Choose wasabi souvenirs at the wasabi shop in Odanba.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'bus',
            durationMinutes: 25,
            labelJa: '西東京バス',
            labelEn: 'Nishi Tokyo Bus',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'walk',
            durationMinutes: 10,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
          {
            fromStep: 3,
            toStep: 4,
            mode: 'bus',
            durationMinutes: 15,
            labelJa: '西東京バス',
            labelEn: 'Nishi Tokyo Bus',
          },
          {
            fromStep: 4,
            toStep: 5,
            mode: 'walk',
            durationMinutes: 10,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
        ],
      },
    },
  },
  {
    id: 'ome-sawai-sake-journey',
    nameJa: '沢井の酒蔵と御嶽の文化財をめぐる旅',
    nameEn: 'Sawai Sake & Mitake Heritage Journey',
    areaJa: '青梅・沢井',
    areaEn: 'Ome / Sawai',
    defaultDuration: 'half-day',
    // Source-backed editorial route: isDemo is intentionally absent (only the
    // frozen 8/23 Okutama golden path is demo).
    source: SOURCE_OME_ROUTE,
    variants: {
      'half-day': {
        transportJa: 'JR青梅線・徒歩',
        transportEn: 'JR Ome Line & walking',
        totalMinutes: 215,
        steps: [
          {
            placeId: 'sawai-ozawa-shuzo',
            stepNumber: 1,
            stayMinutes: 45,
            roleJa:
              '沢井駅から徒歩で、澤乃井を醸す小澤酒造へ。多摩川の清流が流れる渓谷のほとりに酒蔵があります。',
            roleEn:
              'Walk from Sawai Station to Ozawa Shuzo, the brewery behind the Sawanoi label, on the banks of the clear Tama River valley.',
          },
          {
            placeId: 'sawanoien-garden',
            stepNumber: 2,
            stayMinutes: 60,
            roleJa:
              '蔵元直営の清流ガーデン。多摩川を見下ろすオープンガーデンで、軽食やおつまみを楽しめます。',
            roleEn:
              'The brewery-run Clear Stream Garden — an open garden overlooking the Tama River where you can enjoy light meals and snacks.',
          },
          {
            placeId: 'mitake-shrine',
            stepNumber: 3,
            stayMinutes: 60,
            roleJa:
              '青梅市御岳に鎮座する御嶽神社。東京都指定有形文化財「御嶽神社旧本殿」が現存します。',
            roleEn:
              'Mitake Shrine in Mitake, Ome, preserves its former main hall — a Tokyo-designated cultural property.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 5,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'train',
            durationMinutes: 45,
            labelJa: 'JR青梅線・御岳登山鉄道ケーブル',
            labelEn: 'JR Ome Line & Mitake Tozan cable car',
          },
        ],
      },
      '1-day': {
        transportJa: 'JR青梅線・徒歩',
        transportEn: 'JR Ome Line & walking',
        totalMinutes: 370,
        steps: [
          {
            placeId: 'sawai-ozawa-shuzo',
            stepNumber: 1,
            stayMinutes: 60,
            roleJa:
              '沢井駅から徒歩で、澤乃井を醸す小澤酒造へ。多摩川の清流が流れる渓谷のほとりに酒蔵があります。',
            roleEn:
              'Walk from Sawai Station to Ozawa Shuzo, the brewery behind the Sawanoi label, on the banks of the clear Tama River valley.',
          },
          {
            placeId: 'sawanoien-garden',
            stepNumber: 2,
            stayMinutes: 90,
            roleJa:
              '蔵元直営の清流ガーデン。多摩川を見下ろすオープンガーデンで、軽食やおつまみを楽しめます。',
            roleEn:
              'The brewery-run Clear Stream Garden — an open garden overlooking the Tama River where you can enjoy light meals and snacks.',
          },
          {
            placeId: 'mitake-shrine',
            stepNumber: 3,
            stayMinutes: 120,
            roleJa:
              '青梅市御岳に鎮座する御嶽神社。東京都指定有形文化財「御嶽神社旧本殿」が現存します。',
            roleEn:
              'Mitake Shrine in Mitake, Ome, preserves its former main hall — a Tokyo-designated cultural property.',
          },
          {
            placeId: 'baba-oshijutaku',
            stepNumber: 4,
            stayMinutes: 30,
            roleJa:
              'かつて御嶽神社への参拝者を迎えた「馬場家御師住宅」。東京都指定有形文化財に指定されています。',
            roleEn:
              'The Baba House oshi residence, which once lodged pilgrims to Mitake Shrine — a Tokyo-designated cultural property.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 5,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'train',
            durationMinutes: 45,
            labelJa: 'JR青梅線・御岳登山鉄道ケーブル',
            labelEn: 'JR Ome Line & Mitake Tozan cable car',
          },
          {
            fromStep: 3,
            toStep: 4,
            mode: 'walk',
            durationMinutes: 20,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
        ],
      },
    },
  },
  {
    id: 'hachioji-ginger-journey',
    nameJa: '八王子ショウガと滝山の食文化をたどる旅',
    nameEn: 'Hachioji Ginger & Takiyama Food Culture Journey',
    areaJa: '八王子',
    areaEn: 'Hachioji',
    defaultDuration: 'half-day',
    source: SOURCE_HACHIOJI_ROUTE,
    sources: [SOURCE_HACHIOJI_ROUTE, SOURCE_HACHIOJI_MARKET, SOURCE_HACHIOJI_HERITAGE, SOURCE_HACHIOJI_COORDINATES],
    // Source-backed route, not part of the frozen 8/23 demo.
    variants: {
      'half-day': {
        transportJa: '徒歩（現地の案内を確認）',
        transportEn: 'Walking (check local guidance)',
        totalMinutes: 145,
        steps: [
          {
            placeId: 'hachioji-takiyama-roadside-station',
            stepNumber: 1,
            stayMinutes: 75,
            roleJa:
              '八王子市の食文化ミュージアムに認定された道の駅。市内の生産者が届ける野菜や、旬の八王子ショウガを探します。品揃えは季節と当日の入荷で変わります。',
            roleEn:
              'Start at the city-recognized food culture museum and farm market. Look for Hachioji produce and seasonal ginger; stock changes with the season and day.',
          },
          {
            placeId: 'hachioji-takiyama-castle',
            stepNumber: 2,
            stayMinutes: 45,
            roleJa:
              '滝山城跡で加住・滝山の文化景観をたどります。食材の販売場所ではなく、八王子の土地の背景を知るための文化財ストップです。',
            roleEn:
              'Trace the cultural landscape of Kazumi and Takiyama at the castle ruins. This is a heritage context stop, not a place to buy food.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 25,
            labelJa: '徒歩（目安）',
            labelEn: 'Walk (editorial estimate)',
          },
        ],
      },
      '1-day': {
        transportJa: '徒歩（現地の案内を確認）',
        transportEn: 'Walking (check local guidance)',
        totalMinutes: 220,
        steps: [
          {
            placeId: 'hachioji-takiyama-roadside-station',
            stepNumber: 1,
            stayMinutes: 100,
            roleJa:
              '直売所と地場食材の料理をゆっくり見て、八王子ショウガが入荷しているか現地で確認します。品揃えは季節と当日の入荷で変わります。',
            roleEn:
              'Take time with the farm market and local-food options, then check on site whether Hachioji ginger has arrived. Stock changes with the season and day.',
          },
          {
            placeId: 'hachioji-takiyama-castle',
            stepNumber: 2,
            stayMinutes: 90,
            roleJa:
              '滝山城跡を歩き、加住地域の文化景観をたどります。城跡は食材の販売場所ではないため、食文化を支える土地の背景として訪ねます。',
            roleEn:
              'Walk through the castle ruins and the Kazumi landscape. The site is not a food venue; visit it as context for the land behind the food culture.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 30,
            labelJa: '徒歩（目安）',
            labelEn: 'Walk (editorial estimate)',
          },
        ],
      },
    },
  },
  {
    id: 'fussa-sake-journey',
    nameJa: '福生の2つの酒蔵と水のまちをめぐる旅',
    nameEn: 'Fussa Two Breweries & Water Heritage Journey',
    areaJa: '福生',
    areaEn: 'Fussa',
    defaultDuration: 'half-day',
    source: SOURCE_FUSSA_ROUTE,
    sources: [
      SOURCE_FUSSA_ROUTE,
      SOURCE_FUSSA_CITY_SAKE,
      SOURCE_FUSSA_WATER,
      SOURCE_FUSSA_TAMURA,
      SOURCE_FUSSA_ISHIKAWA,
      SOURCE_FUSSA_KURUMIRU,
      SOURCE_FUSSA_COORDINATES,
      SOURCE_FUSSA_ISHIKAWA_COORDINATES,
    ],
    variants: {
      'half-day': {
        transportJa: '徒歩・JR青梅線（目安、現地の案内を確認）',
        transportEn: 'Walking & JR Ome Line (estimate; check local guidance)',
        totalMinutes: 195,
        steps: [
          {
            placeId: 'fussa-tamura-shuzo',
            stepNumber: 1,
            stayMinutes: 55,
            roleJa:
              '福生駅から田村酒造場へ。文政5年（1822年）創業と紹介される酒蔵の物語をたどり、見学や販売の条件は公式情報で確認します。',
            roleEn:
              'Walk from Fussa Station to Tamura Shuzojo. Follow the story of a brewery founded in 1822, and check the official site for current visit and sales conditions.',
          },
          {
            placeId: 'fussa-kurumiru',
            stepNumber: 2,
            stayMinutes: 25,
            roleJa:
              'くるみる ふっさで、市内の観光情報や名産品の情報を集めます。2つの酒蔵をめぐる最新の案内を出発前に確認しましょう。',
            roleEn:
              'Use Kurumiru Fussa to gather current sightseeing and local-product information before continuing to the second brewery.',
          },
          {
            placeId: 'fussa-ishikawa-shuzo',
            stepNumber: 3,
            stayMinutes: 70,
            roleJa:
              '石川酒造で、福生に続く酒造りのもう一つの系譜をたどります。施設ごとの営業・見学条件は公式サイトで確認してください。',
            roleEn:
              'Trace Fussa’s other brewing lineage at Ishikawa Brewery. Check the operator site for current conditions by facility and visit type.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 10,
            labelJa: '徒歩（目安）',
            labelEn: 'Walk (estimate)',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'train',
            durationMinutes: 35,
            labelJa: 'JR青梅線・徒歩（目安）',
            labelEn: 'JR Ome Line & walk (estimate)',
          },
        ],
      },
      '1-day': {
        transportJa: '徒歩・JR青梅線（目安、現地の案内を確認）',
        transportEn: 'Walking & JR Ome Line (estimate; check local guidance)',
        totalMinutes: 265,
        steps: [
          {
            placeId: 'fussa-tamura-shuzo',
            stepNumber: 1,
            stayMinutes: 80,
            roleJa:
              '田村酒造場で、福生の水と酒造りの歴史を知ります。見学・予約・販売の条件は当日の公式情報を確認してください。',
            roleEn:
              'Spend time with Fussa’s water and brewing history at Tamura Shuzojo. Confirm tours, reservations, and sales conditions from the current official information.',
          },
          {
            placeId: 'fussa-kurumiru',
            stepNumber: 2,
            stayMinutes: 40,
            roleJa:
              '観光案内所で、酒蔵や水のまちに関する最新情報と、当日立ち寄れる場所を確認します。',
            roleEn:
              'At the tourist information center, check current options for the breweries and Fussa’s water heritage.',
          },
          {
            placeId: 'fussa-ishikawa-shuzo',
            stepNumber: 3,
            stayMinutes: 100,
            roleJa:
              '石川酒造の酒造りと地域に根づく施設を訪ねます。食事・売店・見学の営業条件は施設ごとに異なるため、公式サイトで確認します。',
            roleEn:
              'Explore Ishikawa Brewery and its place in the local area. Dining, retail, and tour conditions vary by facility, so check the current official site.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 10,
            labelJa: '徒歩（目安）',
            labelEn: 'Walk (estimate)',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'train',
            durationMinutes: 35,
            labelJa: 'JR青梅線・徒歩（目安）',
            labelEn: 'JR Ome Line & walk (estimate)',
          },
        ],
      },
    },
  },
  {
    id: 'akiruno-seasonal-produce-journey',
    nameJa: 'あきる野の旬と秋川渓谷をめぐる旅',
    nameEn: 'Akiruno Seasonal Produce & Akikawa Valley Journey',
    areaJa: 'あきる野',
    areaEn: 'Akiruno',
    defaultDuration: 'half-day',
    source: SOURCE_AKIRUNO_ROUTE,
    sources: [
      SOURCE_AKIRUNO_ROUTE,
      SOURCE_AKIRUNO_SPECIALTIES,
      SOURCE_AKIRUNO_FARMERS,
      SOURCE_AKIRUNO_SEOTO,
      SOURCE_AKIRUNO_GOTOKYO,
      SOURCE_AKIRUNO_FARMERS_COORDINATES,
      SOURCE_AKIRUNO_SEOTO_COORDINATES,
    ],
    variants: {
      'half-day': {
        transportJa: 'JR五日市線・西東京バス（目安、現地の案内を確認）',
        transportEn: 'JR Itsukaichi Line & Nishi Tokyo Bus (estimate; check local guidance)',
        totalMinutes: 195,
        steps: [
          {
            placeId: 'akiruno-farmers-center',
            stepNumber: 1,
            stayMinutes: 70,
            roleJa:
              '秋川ファーマーズセンターで、生産者が持ち寄る農産物と季節の直売に出会います。のらぼう菜や旬の品は時期と当日の入荷を確認します。',
            roleEn:
              'Meet seasonal direct sales from local producers at Akikawa Farmers Center. Check the season and day’s stock for norabō greens and other produce.',
          },
          {
            placeId: 'akiruno-seoto-no-yu',
            stepNumber: 2,
            stayMinutes: 90,
            roleJa:
              '瀬音の湯で、秋川渓谷の自然と、地元食材の料理・物産販売につながる食の場を訪ねます。営業内容は公式サイトで確認してください。',
            roleEn:
              'Continue to Seoto-no-Yu, where the Akikawa valley setting meets local-food dining and specialty sales. Check the official site for current operations.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'bus',
            durationMinutes: 35,
            labelJa: '西東京バス（目安）',
            labelEn: 'Nishi Tokyo Bus (estimate)',
          },
        ],
      },
      '1-day': {
        transportJa: 'JR五日市線・西東京バス（目安、現地の案内を確認）',
        transportEn: 'JR Itsukaichi Line & Nishi Tokyo Bus (estimate; check local guidance)',
        totalMinutes: 285,
        steps: [
          {
            placeId: 'akiruno-farmers-center',
            stepNumber: 1,
            stayMinutes: 100,
            roleJa:
              '直売所で、のらぼう菜やとうもろこし、梨など、季節に応じた秋川の農産物を探します。品揃えは季節と当日の入荷で変わります。',
            roleEn:
              'Take time with Akikawa’s seasonal produce, from norabō greens to corn and pears when in season. Stock changes with the season and day.',
          },
          {
            placeId: 'akiruno-seoto-no-yu',
            stepNumber: 2,
            stayMinutes: 150,
            roleJa:
              '秋川渓谷の景色と、地元食材を使う料理・物産販売の情報をつなげます。最新の営業・交通情報を出発前に確認してください。',
            roleEn:
              'Connect the Akikawa valley landscape with local-food dining and specialty sales. Check current operations and transport before setting out.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'bus',
            durationMinutes: 35,
            labelJa: '西東京バス（目安）',
            labelEn: 'Nishi Tokyo Bus (estimate)',
          },
        ],
      },
    },
  },
];

/**
 * Editorial spot details keyed by place id. Places without an entry still get
 * a valid S6 screen: the seed place record supplies photo/name/category/
 * address, and practical fields render as unverified.
 */
export const SPOT_DETAILS: Record<string, SpotDetail> = {
  'okutama-tourism-office': {
    placeId: 'okutama-tourism-office',
    roleJa:
      '奥多摩の玄関口となる案内所。わさび田への行き方や周辺の観光情報を集めて、旅程を組み立てる出発点です。',
    roleEn:
      'The gateway to Okutama. Gather route guidance and local information here before heading to the wasabi fields.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  'chishima-wasabi-garden': {
    placeId: 'chishima-wasabi-garden',
    roleJa:
      '千島わさび園は丹三郎にあるわさびの農園で、わさびとわさび加工品を扱っています。奥多摩のわさびの産地を訪ねる旅の中継点です。',
    roleEn:
      'Chishima Wasabi Garden is a wasabi farm in Tanzaburo that deals in wasabi and wasabi products — a stop on a journey through Okutama\'s wasabi-growing area.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  'soba-isshintei': {
    placeId: 'soba-isshintei',
    roleJa:
      '一心亭は丹三郎にあるそば店です。奥多摩の山あいの旅で、昼食に立ち寄ります。',
    roleEn:
      'Isshintei is a soba restaurant in Tanzaburo — a lunch stop on the journey through the Okutama mountains.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  'shishiguchiya': {
    placeId: 'shishiguchiya',
    roleJa:
      '獅子口屋は大丹波にあるわさびの店です。わさびのお土産を扱っています。',
    roleEn:
      'Shishiguchiya is a wasabi shop in Odanba that sells wasabi souvenirs.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  'odanba-fishing': {
    placeId: 'odanba-fishing',
    roleJa:
      '大丹波川国際虹ます釣場は、大丹波にある虹ますの釣り施設です。',
    roleEn:
      'Otaba-gawa International Rainbow Trout Pond is a rainbow-trout fishing facility in Odanba.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  // ---- 青梅・沢井 slice (Issue #163) spot details ---------------------------
  // Practical fields below are transcribed from the current official pages and
  // stay needs_confirmation until stakeholder confirmation. tags stay {} — no
  // dietary / language / accessibility claims are sourced.
  'sawai-ozawa-shuzo': {
    placeId: 'sawai-ozawa-shuzo',
    roleJa:
      '小澤酒造は沢井にある酒蔵で、日本酒「澤乃井」を醸しています。多摩川の清流が流れる渓谷のほとりに位置します。',
    roleEn:
      'Ozawa Shuzo is a sake brewery in Sawai that brews the "Sawanoi" label, on the banks of the clear Tama River valley.',
    practical: {
      accessJa: '酒蔵見学は予約制。個人見学は公式予約ページから申し込みます。',
      accessEn: 'Brewery tours require reservations; individual tours use the official booking page.',
      hoursJa: '酒蔵見学：平日 11:00・13:00／土日祝 11:00・12:30・14:00（予約制）',
      hoursEn:
        'Brewery tours: weekdays at 11:00 and 13:00; weekends and holidays at 11:00, 12:30, and 14:00 (reservation required)',
      priceJa: '700円（税込）／1人（20歳未満は無料）',
      priceEn: '¥700 per person (tax included; free for visitors under 20)',
      reservationAvailable: true,
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_SAWANOI,
  },
  'sawanoien-garden': {
    placeId: 'sawanoien-garden',
    roleJa:
      '澤乃井園は小澤酒造が営む清流ガーデンです。多摩川の清流を見下ろすオープンガーデンで、軽食や澤乃井の生原酒を楽しめます。',
    roleEn:
      'Sawanoien is the brewery-run Clear Stream Garden overlooking the Tama River, serving light meals and Sawanoi nama genshu.',
    practical: {
      hoursJa: '10:00〜17:00',
      hoursEn: '10:00 a.m.–5:00 p.m.',
      closedDaysJa: '月曜日（祝日の場合は火曜日）・年末年始、その他休業あり（営業カレンダー）',
      closedDaysEn:
        'Mondays (Tuesday when Monday is a holiday) and year-end/New Year; other closures may apply (see the operating calendar)',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_SAWANOIEN,
  },
  'mitake-shrine': {
    placeId: 'mitake-shrine',
    roleJa:
      '青梅市御岳にある御嶽神社。現存する旧本殿は、東京都指定有形文化財に指定されています。',
    roleEn:
      'Mitake Shrine stands in Mitake, Ome; its surviving former main hall is designated as a Tokyo cultural property.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_MITAKE_HERITAGE,
  },
  'baba-oshijutaku': {
    placeId: 'baba-oshijutaku',
    roleJa:
      '馬場家御師住宅は、かつて御嶽神社への参拝者を迎えた御師の住宅で、東京都指定有形文化財です。',
    roleEn:
      'The Baba House is a former oshi (pilgrim-host) residence that once received Mitake Shrine pilgrims — a Tokyo-designated cultural property.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_MITAKE_HERITAGE,
  },
  // ---- 八王子 slice (Issue #238) -------------------------------------------
  'hachioji-takiyama-roadside-station': {
    placeId: 'hachioji-takiyama-roadside-station',
    roleJa:
      '市内の農産物や地域の食文化に出会える道の駅です。八王子ショウガは季節商品として扱われるため、当日の入荷は現地で確認します。',
    roleEn:
      'A roadside station where visitors can meet Hachioji produce and local food culture. Hachioji ginger is seasonal, so check the day’s stock on site.',
    practical: {
      hoursJa: '8:00〜19:00（施設内一部店舗を除く）',
      hoursEn: '8:00 a.m.–7:00 p.m. (some facilities have separate hours)',
      closedDaysJa: '年中無休（施設内一部店舗を除く）',
      closedDaysEn: 'Open year-round (some facilities have separate schedules)',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_HACHIOJI_MARKET,
  },
  'hachioji-takiyama-castle': {
    placeId: 'hachioji-takiyama-castle',
    roleJa:
      '八王子市の文化財一覧に掲載される滝山城跡。食材を買う場所ではなく、八王子ショウガを育ててきた加住・滝山の土地の背景をたどる文化財ストップです。',
    roleEn:
      'Listed in Hachioji’s cultural-property data, Takiyama Castle Ruins provide heritage context for the Kazumi and Takiyama land behind Hachioji ginger; they are not a food venue.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_HACHIOJI_HERITAGE,
  },
  // ---- 福生 × 東京の日本酒 slice (#243) -------------------------------
  'fussa-tamura-shuzo': {
    placeId: 'fussa-tamura-shuzo',
    roleJa:
      '田村酒造場は福生で酒造りを続ける酒蔵です。見学・販売・営業日の条件は、当日の公式情報を確認してください。',
    roleEn:
      'Tamura Shuzojo is a Fussa brewery with a long brewing history. Check the current official information for tours, sales, and opening conditions.',
    practical: {
      accessJa: 'JR青梅線「福生駅」から徒歩約10分（公式案内）。',
      accessEn: 'About a 10-minute walk from JR Ome Line Fussa Station (official guidance).',
      hoursJa: '営業時間は公式案内の営業カレンダーを確認してください。',
      hoursEn: 'Check the operator’s calendar for current opening hours.',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_FUSSA_TAMURA,
  },
  'fussa-kurumiru': {
    placeId: 'fussa-kurumiru',
    roleJa:
      'くるみる ふっさは、福生の観光情報や名産品の情報を集める案内所です。酒蔵めぐりの最新情報を確認する中継点にします。',
    roleEn:
      'Kurumiru Fussa is a visitor center for local sightseeing information and products — a useful checkpoint for current brewery-visit details.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_FUSSA_KURUMIRU,
  },
  'fussa-ishikawa-shuzo': {
    placeId: 'fussa-ishikawa-shuzo',
    roleJa:
      '石川酒造は福生・熊川にある酒蔵です。日本酒を軸にした施設や飲食・販売の条件は、公式サイトで確認してください。',
    roleEn:
      'Ishikawa Brewery is a Fussa brewery in Kumagawa. Check the official site for current conditions across its sake, dining, and retail facilities.',
    practical: {
      accessJa: '東京都福生市熊川1番地。施設ごとの営業条件は公式アクセスページを確認してください。',
      accessEn: 'Kumagawa 1, Fussa. Check the official access page for current conditions by facility.',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_FUSSA_ISHIKAWA,
  },
  // ---- あきる野 × 秋川の旬の農産物 slice (#244) ----------------------
  'akiruno-farmers-center': {
    placeId: 'akiruno-farmers-center',
    roleJa:
      '秋川ファーマーズセンターは、生産者の農産物を季節ごとに買える直売所です。品揃えと不定休の有無は当日に確認します。',
    roleEn:
      'Akikawa Farmers Center is a direct-sale market for producers’ seasonal farm products. Check stock and any irregular closure on the day.',
    practical: {
      accessJa: 'JR五日市線「東秋留駅」から徒歩約8分（公式案内）。',
      accessEn: 'About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance).',
      hoursJa: '9:00〜17:00',
      hoursEn: '9:00 a.m.–5:00 p.m.',
      closedDaysJa: '12月31日〜1月4日。不定休あり。',
      closedDaysEn: 'Closed December 31–January 4; irregular closures may apply.',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_AKIRUNO_FARMERS,
  },
  'akiruno-seoto-no-yu': {
    placeId: 'akiruno-seoto-no-yu',
    roleJa:
      '瀬音の湯は、秋川渓谷の自然の中で地元食材の料理や地域の物産販売につながる施設です。最新の営業内容と交通を公式サイトで確認します。',
    roleEn:
      'Seoto-no-Yu sits in the Akikawa valley and connects the landscape with local-food dining and regional products. Check the official site for current operations and transport.',
    practical: {
      accessJa: '武蔵五日市駅から西東京バス「瀬音の湯」下車すぐ。バス時刻は当日確認してください。',
      accessEn: 'From Musashi-Itsukaichi Station, take a Nishi Tokyo Bus to the Seoto-no-Yu stop. Check bus times on the day.',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_AKIRUNO_SEOTO,
  },
};

/** All deterministic model routes. */
export const routes: ModelRoute[] = MODEL_ROUTES;

/** Look up a model route by id. */
export function getRouteById(id: string): ModelRoute | undefined {
  return MODEL_ROUTES.find((r) => r.id === id);
}

/** Look up a spot detail by place id (may be undefined for a valid place). */
export function getSpotDetail(placeId: string): SpotDetail | undefined {
  return SPOT_DETAILS[placeId];
}

/**
 * Layout constants for the S5 route map (Issue #69, #74).
 *
 * They mirror the real 375px render chain so `projectRoutePins` can guarantee
 * pins never visually overlap and stay individually tappable at the actual
 * rendered canvas width (Issue #74). The chain at a 375px viewport is:
 *
 *   viewport → `.tmm-main` (ui.css, `padding: 8px 16px 24px`) →
 *   `.tmm-page` (ui.css, `padding: 16px 0 24px`; horizontal gutter owned by the
 *   shell, Issue #77) → `.s5-map` (1px `--tmm-border` each side) →
 *   `.s5-map__canvas`
 *
 * `mapCanvasWidthPx()` sums those into the real canvas width; it is the single
 * source of truth used both by the de-overlap and by the tests.
 */
export const PIN_LAYOUT = {
  /** Projected canvas is [0, canvasSize] × [0, canvasSize]. */
  canvasSize: 100,
  /** Keep pins off the very edge of the canvas. */
  pad: 12,
  /** Mobile-first baseline viewport width (px). */
  baselineViewportWidth: 375,
  /** `.tmm-main` horizontal padding (ui.css, the shared shell gutter), per side (px). */
  appMainGutter: 16,
  /** `.tmm-page` horizontal padding (ui.css), per side (px). 0 since Issue #77. */
  baselineGutter: 0,
  /** `.s5-map` border width (`--tmm-border`), per side (px). */
  mapBorderPx: 1,
  /** `.s5-map__canvas` aspect-ratio (width / height). */
  mapAspect: 1.45,
  /** Minimum center-to-center pin separation (px) — the tappable-target bar. */
  minSeparationPx: 44,
} as const;

/**
 * The real rendered `.s5-map__canvas` width (px) at the 375px baseline.
 *
 * Single source of truth for the de-overlap and the tests, so the geometry the
 * pins are separated in matches what a browser actually lays out.
 */
export function mapCanvasWidthPx(): number {
  const { baselineViewportWidth, appMainGutter, baselineGutter, mapBorderPx } = PIN_LAYOUT;
  // baselineGutter is 0 since Issue #77: the shared shell owns the gutter, so
  // the S5 map no longer re-applies horizontal padding.
  return (
    baselineViewportWidth -
    2 * appMainGutter -
    2 * baselineGutter -
    2 * mapBorderPx
  );
}

/**
 * Deterministically push overlapping pins apart so that at the 375px baseline
 * every pin is individually tappable (≥ `minSeparationPx` center-to-center).
 *
 * Nearby pins are pushed apart along the line joining them, then clamped back
 * inside the padded canvas. Direction and magnitude are pure functions of the
 * input (no randomness), so the result is deterministic and replayable — the
 * same projection always yields the same pins.
 */
function deoverlapPins(
  pins: Array<{ stepNumber: number; x: number; y: number }>,
): Array<{ stepNumber: number; x: number; y: number }> {
  const {
    canvasSize,
    pad,
    mapAspect,
    minSeparationPx,
  } = PIN_LAYOUT;

  // Convert to baseline pixel space so the separation guarantee is in px. The
  // canvas width comes from `mapCanvasWidthPx()` (the same real geometry the
  // tests model) so the pins are separated in the actual rendered space.
  const mapWidth = mapCanvasWidthPx();
  const mapHeight = mapWidth / mapAspect;
  const scaleX = mapWidth / canvasSize;
  const scaleY = mapHeight / canvasSize;
  const minX = pad * scaleX;
  const minY = pad * scaleY;
  const maxX = (canvasSize - pad) * scaleX;
  const maxY = (canvasSize - pad) * scaleY;
  const clamp = (v: number, lo: number, hi: number): number => Math.max(lo, Math.min(hi, v));

  // How far `p` can move along `(dx, dy)` before leaving the padded canvas.
  // The distance is capped by each axis (Infinity when the movement does not
  // push against a boundary).
  const moveCap = (p: { x: number; y: number }, dx: number, dy: number): number => {
    const xCap = dx > 0 ? (maxX - p.x) / dx : dx < 0 ? (p.x - minX) / -dx : Infinity;
    const yCap = dy > 0 ? (maxY - p.y) / dy : dy < 0 ? (p.y - minY) / -dy : Infinity;
    return Math.max(0, Math.min(xCap, yCap));
  };

  const pts = pins.map((p) => ({ ...p, x: p.x * scaleX, y: p.y * scaleY }));

  // Iterative relaxation. For every pair closer than the minimum separation we
  // move the two pins apart along the line joining them. Each pin may only move
  // as far as the padded canvas allows (`moveCap`): a pin already flush against
  // a boundary is "pinned", and the free pin absorbs the full remaining gap —
  // so the pair reaches ≥ `minSeparationPx` in a single pass instead of
  // converging asymptotically. The demo configurations resolve in one pass; the
  // pass cap is only a safety bound.
  const MAX_PASSES = 12;
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i];
        const b = pts[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist = Math.hypot(dx, dy);
        if (dist >= minSeparationPx) {
          continue;
        }
        // Deterministic tie-break when two pins project to the exact same spot.
        if (dist === 0) {
          dx = j % 2 === 0 ? 1 : -1;
          dy = i % 2 === 0 ? 1 : -1;
          dist = Math.sqrt(2);
        }
        const gap = minSeparationPx - dist;
        const ux = dx / dist;
        const uy = dy / dist;
        const capA = moveCap(a, -ux, -uy);
        const capB = moveCap(b, ux, uy);
        let moveA: number;
        let moveB: number;
        if (capA + capB < gap) {
          // Both pins hit a boundary before the gap closes — move each to its
          // cap (the physical maximum for this pair in the canvas).
          moveA = capA;
          moveB = capB;
        } else {
          // Prefer an equal split; if one pin cannot take its half, the other
          // absorbs the remainder so the pair closes the gap in one pass.
          moveA = Math.max(gap - capB, Math.min(gap / 2, capA));
          moveB = gap - moveA;
        }
        a.x -= ux * moveA;
        a.y -= uy * moveA;
        b.x += ux * moveB;
        b.y += uy * moveB;
        if (moveA > 0 || moveB > 0) {
          moved = true;
        }
      }
    }
    for (const p of pts) {
      p.x = clamp(p.x, minX, maxX);
      p.y = clamp(p.y, minY, maxY);
    }
    if (!moved) {
      break;
    }
  }

  return pts.map((p) => ({
    stepNumber: p.stepNumber,
    x: p.x / scaleX,
    y: p.y / scaleY,
  }));
}

/**
 * Project route stops onto a [0,100] × [0,100] map canvas so pins can be laid
 * out deterministically. x grows with longitude, y grows with latitude
 * (inverted when rendered so north is up). Pin number == step number.
 *
 * The raw linear projection is post-processed so that at the 375px baseline no
 * two pins overlap (≥44px apart, individually tappable) — see `deoverlapPins`.
 */
export function projectRoutePins(
  steps: Array<{ stepNumber: number; placeId: string }>,
  places: ReadonlyArray<Place>,
): Array<{ stepNumber: number; x: number; y: number }> {
  const { canvasSize, pad } = PIN_LAYOUT;

  const resolve = (placeId: string): { latitude: number; longitude: number } | undefined => {
    const place = places.find((p) => p.id === placeId);
    return place ? { latitude: place.latitude, longitude: place.longitude } : undefined;
  };

  const coords = steps
    .map((step) => ({ step, coord: resolve(step.placeId) }))
    .filter(
      (c): c is {
        step: { stepNumber: number; placeId: string };
        coord: { latitude: number; longitude: number };
      } => c.coord !== undefined,
    );

  if (coords.length === 0) {
    return [];
  }

  const lngs = coords.map((c) => c.coord.longitude);
  const lats = coords.map((c) => c.coord.latitude);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const lngSpan = maxLng - minLng || 1;
  const latSpan = maxLat - minLat || 1;

  const projected = coords.map(({ step, coord }) => ({
    stepNumber: step.stepNumber,
    x: pad + ((coord.longitude - minLng) / lngSpan) * (canvasSize - 2 * pad),
    // Normalize so the smallest latitude (south) is at the bottom.
    y: canvasSize - (pad + ((coord.latitude - minLat) / latSpan) * (canvasSize - 2 * pad)),
  }));

  return deoverlapPins(projected);
}

/**
 * The route id whose variants include the given place, when that is
 * unambiguous. A place shared by multiple model routes has no single parent,
 * so it resolves to `undefined` — the Spot "save" action must never pick one
 * route arbitrarily. (Current seed places belong to exactly one route.)
 */
export function getRouteIdForPlace(
  placeId: string,
  routes: readonly ModelRoute[] = MODEL_ROUTES,
): string | undefined {
  const matching = routes.filter((route) =>
    Object.values(route.variants).some((variant) =>
      variant.steps.some((s) => s.placeId === placeId),
    ),
  );
  return matching.length === 1 ? matching[0].id : undefined;
}
