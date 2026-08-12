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
  /** Region/area the route serves, e.g. 奥多摩 / Okutama. */
  areaJa: string;
  areaEn: string;
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
  name: '一般社団法人奥多摩観光協会（奥多摩町観光案内所）',
  url: 'https://www.okutama.gr.jp/site/',
  license: 'All Rights Reserved（参考情報としてのみ利用）',
  lastVerified: '2026-08-08',
  sourceType: 'official_web',
  retrievedAt: '2026-08-08',
  verificationStatus: 'needs_confirmation',
  originalId: 'seed-route-1',
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
 * The route id whose variants include the given place. Spots in the S6 page
 * belong to exactly one model route in the current demo, so this resolves the
 * shared `tmm:savedRoutes` entry for a spot-level "save" action.
 */
export function getRouteIdForPlace(placeId: string): string | undefined {
  for (const route of MODEL_ROUTES) {
    for (const variant of Object.values(route.variants)) {
      if (variant.steps.some((s) => s.placeId === placeId)) {
        return route.id;
      }
    }
  }
  return undefined;
}
