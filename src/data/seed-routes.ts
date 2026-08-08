/**
 * Seed data: deterministic model routes and spot details (Issue #45, S5/S6).
 *
 * Provenance:
 * - Route structure, step ordering, stay durations, and mobility segments are
 *   TEAM-EDITORIAL (origin: 'editorial') authored for the 奥多摩 × 東京わさび
 *   demo. They are a coherent suggested itinerary, not a verified schedule.
 * - Places referenced here are the existing records in `src/data/seed-places.ts`
 *   (all origin: 'demo' — approximate coordinates / addresses) — do not change
 *   their semantics.
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
  /** Short narrative of the step's role in the wasabi journey (editorial). */
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
  /** The variant shown first; the user toggles to the other. */
  defaultDuration: RouteDuration;
  variants: Record<RouteDuration, RouteVariant>;
  /** Provenance of the editorial route. */
  source: DataSource;
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
  /** Editorial story of the spot's role in the wasabi journey. */
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
  name: '奥多摩観光協会',
  url: 'https://www.okutokanko.jp/',
  lastVerified: '2026-08-08',
  sourceType: 'official_web',
  retrievedAt: '2026-08-08',
  originalId: 'seed-route-1',
};

/** Deterministic editorial model route — 奥多摩 × 東京わさび. */
export const MODEL_ROUTES: ModelRoute[] = [
  {
    id: 'okutama-wasabi-journey',
    nameJa: '奥多摩わさび紀行',
    nameEn: 'Okutama Wasabi Journey',
    defaultDuration: 'half-day',
    source: SOURCE_OKUTAMA,
    variants: {
      'half-day': {
        transportJa: 'JR青梅線・西東京バス',
        transportEn: 'JR Ome Line & Nishi Tokyo Bus',
        totalMinutes: 190,
        steps: [
          {
            placeId: 'okutama-tourism-office',
            stepNumber: 1,
            stayMinutes: 15,
            roleJa: '出発点。わさび田への行き方と地域の情報を集めます。',
            roleEn: 'Start here to pick up maps and local guidance for the wasabi fields.',
          },
          {
            placeId: 'okutama-wasabi-field',
            stepNumber: 2,
            stayMinutes: 45,
            roleJa: '谷の清流が育てる東京わさびの栽培現場を見学します。',
            roleEn: 'See the terraced wasabi paddies fed by clear mountain stream water.',
          },
          {
            placeId: 'okutama-soba-shop',
            stepNumber: 3,
            stayMinutes: 60,
            roleJa: 'おろしたてのわさびをのせた手打ちそばで昼食を。',
            roleEn: 'Lunch: hand-made soba topped with freshly grated wasabi.',
          },
          {
            placeId: 'okutama-michi-no-eki',
            stepNumber: 4,
            stayMinutes: 30,
            roleJa: 'わさび加工品やこんにゃくなど、お土産を選びます。',
            roleEn: 'Pick up wasabi products and konnyaku as souvenirs.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 20,
            labelJa: '徒歩（沢沿い）',
            labelEn: 'Walk (along the stream)',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'bus',
            durationMinutes: 10,
            labelJa: '西東京バス',
            labelEn: 'Nishi Tokyo Bus',
          },
          {
            fromStep: 3,
            toStep: 4,
            mode: 'walk',
            durationMinutes: 5,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
        ],
      },
      '1-day': {
        transportJa: 'JR青梅線・西東京バス',
        transportEn: 'JR Ome Line & Nishi Tokyo Bus',
        totalMinutes: 280,
        steps: [
          {
            placeId: 'okutama-tourism-office',
            stepNumber: 1,
            stayMinutes: 15,
            roleJa: '出発点。わさび田への行き方と地域の情報を集めます。',
            roleEn: 'Start here to pick up maps and local guidance for the wasabi fields.',
          },
          {
            placeId: 'okutama-wasabi-field',
            stepNumber: 2,
            stayMinutes: 60,
            roleJa: '谷の清流が育てる東京わさびの栽培現場をゆっくり見学。',
            roleEn: 'Spend more time among the terraced wasabi paddies and clear streams.',
          },
          {
            placeId: 'okutama-fishing-center',
            stepNumber: 3,
            stayMinutes: 60,
            roleJa: '渓流魚やまめの釣り体験。わさびの恵みとともにある川の味わいへ。',
            roleEn:
              'Try river fishing for yamame trout — the other taste of Okutama\'s waters.',
          },
          {
            placeId: 'okutama-soba-shop',
            stepNumber: 4,
            stayMinutes: 60,
            roleJa: 'おろしたてのわさびをのせた手打ちそばで昼食を。',
            roleEn: 'Lunch: hand-made soba topped with freshly grated wasabi.',
          },
          {
            placeId: 'okutama-michi-no-eki',
            stepNumber: 5,
            stayMinutes: 30,
            roleJa: 'わさび加工品やこんにゃくなど、お土産を選びます。',
            roleEn: 'Pick up wasabi products and konnyaku as souvenirs.',
          },
        ],
        mobility: [
          {
            fromStep: 1,
            toStep: 2,
            mode: 'walk',
            durationMinutes: 20,
            labelJa: '徒歩（沢沿い）',
            labelEn: 'Walk (along the stream)',
          },
          {
            fromStep: 2,
            toStep: 3,
            mode: 'bus',
            durationMinutes: 15,
            labelJa: '西東京バス',
            labelEn: 'Nishi Tokyo Bus',
          },
          {
            fromStep: 3,
            toStep: 4,
            mode: 'walk',
            durationMinutes: 10,
            labelJa: '徒歩',
            labelEn: 'Walk',
          },
          {
            fromStep: 4,
            toStep: 5,
            mode: 'walk',
            durationMinutes: 5,
            labelJa: '徒歩',
            labelEn: 'Walk',
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
  'okutama-wasabi-field': {
    placeId: 'okutama-wasabi-field',
    roleJa:
      'わさびは清らかな冷水でしか育ちません。奥多摩のわさび田は谷の沢水を引き込んだ棚田状で、急流を利用した伝統的な水掛け栽培が今も続いています。この地を訪れると、東京わさびが「作られる」場所を自分の目で確かめられます。',
    roleEn:
      'Wasabi only grows in clean cold water. Okutama\'s wasabi paddies are terraced fields fed by valley streams, still cultivated with traditional water-flush methods. Visiting here lets you see where Tokyo Wasabi is actually grown.',
    practical: {
      accessJa: '奥多摩駅からバスまたは徒歩（デモ表記）',
      accessEn: 'Bus or walk from Okutama Station (demo)',
    },
    demoNote: {
      tone: 'warning',
      noteJa: '見学条件は時期により異なります。事前に現地へご確認ください（デモ）',
      noteEn: 'Visiting conditions vary by season. Please confirm on site in advance (demo)',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
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
  'okutama-fishing-center': {
    placeId: 'okutama-fishing-center',
    roleJa:
      '清流の恵みはわさびだけではありません。多摩川の支流でやまめを釣り、その場で味わえる施設です。わさびの「生産」から、川魚という「消費」まで、奥多摩の水の物語を続けて体感できます。',
    roleEn:
      'The clear streams feed more than wasabi. At this riverside facility you can fish for yamame trout and taste it on the spot — from wasabi to river fish, one story of Okutama\'s water.',
    practical: {
      accessJa: '奥多摩駅からバス（デモ表記）',
      accessEn: 'Bus from Okutama Station (demo)',
    },
    demoNote: {
      tone: 'info',
      noteJa: '釣り体験は料金・予約条件が異なります。現地へご確認ください（デモ）',
      noteEn: 'Fishing experience prices and booking rules vary. Please confirm on site (demo)',
    },
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  'okutama-soba-shop': {
    placeId: 'okutama-soba-shop',
    roleJa:
      'おろしたてのわさびをのせた手打ちそば。わさびは薬味ではなく、奥多摩の水が生んだ「主役」です。生産者の仕事が食卓に届く、物語の味わいの場。',
    roleEn:
      'Hand-made soba topped with freshly grated wasabi — where wasabi becomes the star, not just a garnish. The moment the grower\'s craft reaches your table.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
  },
  'okutama-michi-no-eki': {
    placeId: 'okutama-michi-no-eki',
    roleJa:
      '奥多摩駅前に広がる道の駅。わさび加工品やこんにゃくなど、地域の恵みを土産に選べます。訪れた人が「持ち帰る」ことで、文化の継承が支えられます。',
    roleEn:
      'A roadside station by Okutama Station. Pick up wasabi products and konnyaku — taking a little of the region home supports its cultural succession.',
    tags: {},
    origin: 'editorial',
    source: SOURCE_OKUTAMA,
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
 * Project route stops onto a [0,100] × [0,100] map canvas so pins can be laid
 * out deterministically. x grows with longitude, y grows with latitude
 * (inverted when rendered so north is up). Pin number == step number.
 */
export function projectRoutePins(
  steps: Array<{ stepNumber: number; placeId: string }>,
  places: ReadonlyArray<Place>,
): Array<{ stepNumber: number; x: number; y: number }> {
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
  // Keep pins off the very edge of the canvas.
  const PAD = 12;

  return coords.map(({ step, coord }) => ({
    stepNumber: step.stepNumber,
    x: PAD + ((coord.longitude - minLng) / lngSpan) * (100 - 2 * PAD),
    // Normalize so the smallest latitude (south) is at the bottom.
    y: 100 - (PAD + ((coord.latitude - minLat) / latSpan) * (100 - 2 * PAD)),
  }));
}
