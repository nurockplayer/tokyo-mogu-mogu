import { describe, expect, it } from 'vitest';
import {
  getRouteById,
  getRouteIdForPlace,
  mapCanvasWidthPx,
  MODEL_ROUTES,
  PIN_LAYOUT,
  projectRoutePins,
  SPOT_DETAILS,
  type ModelRoute,
  type RouteDuration,
} from './seed-routes';
import { places, getPlaceById } from './index';
import { deriveVerificationStatus } from '../lib/verification';

describe('model routes (#45 S5)', () => {
  it('has a deterministic model route for 奥多摩 × 東京わさび', () => {
    expect(MODEL_ROUTES.length).toBeGreaterThanOrEqual(1);
    const route = getRouteById('okutama-wasabi-journey');
    expect(route).toBeDefined();
    expect(route?.nameEn).toMatch(/Wasabi/);
  });

  it('exposes a source-backed Hachioji ginger journey with public places (#238)', () => {
    const route = getRouteById('hachioji-ginger-journey');
    expect(route).toMatchObject({
      areaEn: 'Hachioji',
      defaultDuration: 'half-day',
    });
    expect(route?.isDemo).toBeUndefined();
    expect(route?.source.verificationStatus).toBe('needs_confirmation');
    expect(route?.sources?.map((source) => source.sourceType)).toEqual(
      expect.arrayContaining(['official_web', 'open_data']),
    );
    expect(route?.sources?.map((source) => source.name)).toEqual([
      '編集部（八王子ショウガと滝山の食文化）',
      '道の駅八王子滝山（公式）',
      '八王子市文化財一覧（オープンデータ）',
      'OpenStreetMap（八王子滝山・滝山城跡の概略座標）',
    ]);
    expect(route?.sources?.at(-1)?.license).toBe('ODbL 1.0');
    expect(route?.variants['half-day'].steps.map((step) => step.placeId)).toEqual([
      'hachioji-takiyama-roadside-station',
      'hachioji-takiyama-castle',
    ]);
    expect(route?.variants['1-day'].steps.length).toBeGreaterThanOrEqual(2);
    expect(route?.variants['half-day'].mobility[0].mode).toBe('walk');
  });

  it('exposes each first-party and public source behind the Ome journey (#348)', () => {
    const route = getRouteById('ome-sawai-sake-journey');

    expect(route?.sources?.map((source) => source.originalId)).toEqual([
      'seed-route-ome',
      'sawanoi-brewery-tour',
      'sawanoien',
      'mitake-tozan-access',
      '御嶽神社旧本殿',
    ]);
    for (const source of route?.sources?.slice(0, 4) ?? []) {
      expect(source).toMatchObject({
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
      });
    }
  });

  it('marks only the frozen 8/23 demo route as demo content', () => {
    const demoRoutes = MODEL_ROUTES.filter((r) => r.isDemo);
    expect(demoRoutes).toHaveLength(1);
    expect(demoRoutes[0].id).toBe('okutama-wasabi-journey');
  });

  it('offers both half-day and 1-day variants', () => {
    const route = getRouteById('okutama-wasabi-journey');
    expect(route).toBeDefined();
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const variant = route!.variants[duration];
      expect(variant.steps.length).toBeGreaterThanOrEqual(3);
      expect(variant.mobility.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps displayed route totals equal to stop and mobility durations', () => {
    for (const route of MODEL_ROUTES) {
      for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
        const variant = route.variants[duration];
        const componentMinutes =
          variant.steps.reduce((sum, step) => sum + step.stayMinutes, 0) +
          variant.mobility.reduce((sum, segment) => sum + segment.durationMinutes, 0);
        expect(variant.totalMinutes, `${route.id} ${duration}`).toBe(componentMinutes);
      }
    }
  });

  it('route step numbers are 1-based and consecutive', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const variant = route!.variants[duration];
      const numbers = variant.steps.map((s) => s.stepNumber);
      expect(numbers).toEqual(Array.from({ length: numbers.length }, (_, i) => i + 1));
    }
  });

  it('every route stop resolves to an existing place', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      for (const step of route!.variants[duration].steps) {
        expect(getPlaceById(step.placeId), `missing place ${step.placeId}`).toBeDefined();
      }
    }
  });

  it('mobility segments connect consecutive steps and stay in range', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const { steps, mobility } = route!.variants[duration];
      const stepNumbers = new Set(steps.map((s) => s.stepNumber));
      for (const seg of mobility) {
        expect(stepNumbers.has(seg.fromStep), `bad fromStep ${seg.fromStep}`).toBe(true);
        expect(stepNumbers.has(seg.toStep), `bad toStep ${seg.toStep}`).toBe(true);
        expect(seg.toStep).toBe(seg.fromStep + 1);
        expect(seg.durationMinutes).toBeGreaterThan(0);
      }
    }
  });

  it('half-day is strictly shorter than 1-day', () => {
    const route = getRouteById('okutama-wasabi-journey');
    expect(route!.variants['half-day'].totalMinutes).toBeLessThan(
      route!.variants['1-day'].totalMinutes,
    );
  });
});

describe('spot details (#45 S6)', () => {
  it('each place referenced by the route has a spot detail', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      for (const step of route!.variants[duration].steps) {
        expect(SPOT_DETAILS[step.placeId], `no spot detail for ${step.placeId}`).toBeDefined();
      }
    }
  });

  it('keeps practical details bounded to source-backed fields', () => {
    // Practical data is allowed only for fields transcribed from the official
    // pages: the Hachioji roadside station, the Ozawa brewery tour, and
    // Sawanoien. Every other spot keeps the explicit unknown state.
    for (const detail of Object.values(SPOT_DETAILS)) {
      const p = detail.practical;
      if (p) {
        if (detail.placeId === 'hachioji-takiyama-roadside-station') {
          expect(p.hoursJa).toContain('8');
          expect(p.hoursEn).toContain('7:00');
          expect(p.closedDaysJa).toContain('年中無休');
        } else if (detail.placeId === 'sawai-ozawa-shuzo') {
          expect(p.hoursJa).toContain('11:00');
          expect(p.hoursEn).toContain('reservation required');
          expect(p.priceJa).toContain('700円');
          expect(p.reservationAvailable).toBe(true);
        } else if (detail.placeId === 'sawanoien-garden') {
          expect(p.hoursJa).toBe('10:00〜17:00');
          expect(p.hoursEn).toContain('5:00 p.m.');
          expect(p.closedDaysJa).toContain('月曜日');
        } else if (detail.placeId === 'fussa-tamura-shuzo') {
          expect(p.accessJa).toContain('徒歩約10分');
          expect(p.accessEn).toContain('10-minute walk');
          expect(p.hoursJa).toContain('営業カレンダー');
          expect(p.hoursEn).toContain('calendar');
        } else if (detail.placeId === 'fussa-ishikawa-shuzo') {
          expect(p.accessJa).toContain('熊川1番地');
          expect(p.accessEn).toContain('Kumagawa 1');
        } else if (detail.placeId === 'akiruno-farmers-center') {
          expect(p.hoursJa).toBe('9:00〜17:00');
          expect(p.hoursEn).toContain('5:00 p.m.');
          expect(p.closedDaysJa).toContain('12月31日');
        } else if (detail.placeId === 'akiruno-seoto-no-yu') {
          expect(p.accessJa).toContain('瀬音の湯');
          expect(p.accessEn).toContain('Seoto-no-Yu');
        } else {
          expect(p.hoursJa).toBeUndefined();
          expect(p.hoursEn).toBeUndefined();
          expect(p.closedDaysJa).toBeUndefined();
          expect(p.closedDaysEn).toBeUndefined();
          expect(p.priceJa).toBeUndefined();
          expect(p.priceEn).toBeUndefined();
        }
      }
    }
  });

  it('keeps current Ome tour operations source-caveated and unconfirmed (#348)', () => {
    const brewery = SPOT_DETAILS['sawai-ozawa-shuzo'];
    const garden = SPOT_DETAILS['sawanoien-garden'];

    expect(brewery.source).toMatchObject({
      retrievedAt: '2026-08-29',
      verificationStatus: 'needs_confirmation',
    });
    expect(brewery.practical).toMatchObject({
      accessJa: expect.stringMatching(/約40分.*公式/),
      accessEn: expect.stringMatching(/about 40 minutes.*official/i),
      hoursJa: '酒蔵見学：平日 11:00・13:00／土日祝 11:00・12:30・14:00（予約制）',
      closedDaysJa: '月曜日（祝日の場合は翌火曜日）',
      priceJa: '700円（税込）／1人',
      reservationAvailable: true,
    });
    expect(garden.source).toMatchObject({
      retrievedAt: '2026-08-29',
      verificationStatus: 'needs_confirmation',
    });
    expect(garden.practical).toMatchObject({
      hoursJa: '10:00〜17:00',
      closedDaysJa: expect.stringMatching(/月曜日.*火曜日.*年末年始.*公式/),
      closedDaysEn: expect.stringMatching(/Monday.*Tuesday.*year-end.*official/i),
    });
    expect(garden.roleJa).toMatch(/生原酒.*タンク量り売り/);
    expect(garden.roleJa).not.toMatch(/生原酒を楽しめ/);
    expect(garden.roleEn).toMatch(/sells.*nama genshu/i);
    expect(garden.roleEn).not.toMatch(/serving.*nama genshu/i);
  });

  it('marks every authored Ome route time as an estimate and names the complete Mitake transfer (#348)', () => {
    const route = getRouteById('ome-sawai-sake-journey');

    for (const variant of Object.values(route?.variants ?? {})) {
      expect(variant.transportJa).toMatch(/JR青梅線.*バス.*ケーブル.*徒歩.*目安/);
      expect(variant.transportEn).toMatch(/JR Ome Line.*bus.*cable car.*walking.*estimate/i);
      for (const mobility of variant.mobility) {
        expect(mobility.labelJa).toMatch(/目安/);
        expect(mobility.labelEn).toMatch(/estimate/i);
      }

      const mitakeTransfer = variant.mobility.find((mobility) => mobility.toStep === 3);
      expect(mitakeTransfer?.labelJa).toMatch(/JR青梅線.*バス.*ケーブル.*徒歩/);
      expect(mitakeTransfer?.labelEn).toMatch(/JR Ome Line.*bus.*cable car.*walking/i);
    }
  });

  it('spot details are editorial and carry provenance', () => {
    for (const detail of Object.values(SPOT_DETAILS)) {
      expect(detail.origin).toBe('editorial');
      expect(detail.source.name.length).toBeGreaterThan(0);
      expect(detail.source.url).toBeDefined();
    }
  });

  it('spot verification never derives as verified and tracks source freshness (#129)', () => {
    for (const detail of Object.values(SPOT_DETAILS)) {
      const status = deriveVerificationStatus(detail.source, detail.origin);
      // Editorial route seed is not stakeholder-verified; must degrade to a
      // safe needs_confirmation / demo state, never to verified.
      expect(['needs_confirmation', 'stale', 'demo']).toContain(status);
    }
  });
});

describe('pin projection (#45)', () => {
  it('produces one pin per step, numbered by stepNumber', () => {
    const route = getRouteById('okutama-wasabi-journey');
    const steps = route!.variants['half-day'].steps;
    const pins = projectRoutePins(steps, places);
    expect(pins).toHaveLength(steps.length);
    expect(pins.map((p) => p.stepNumber)).toEqual(steps.map((s) => s.stepNumber));
  });

  it('keeps pins inside the [0,100] canvas', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const pins = projectRoutePins(route!.variants[duration].steps, places);
      for (const pin of pins) {
        expect(pin.x).toBeGreaterThanOrEqual(0);
        expect(pin.x).toBeLessThanOrEqual(100);
        expect(pin.y).toBeGreaterThanOrEqual(0);
        expect(pin.y).toBeLessThanOrEqual(100);
      }
    }
  });

  it('returns an empty list when no place resolves', () => {
    const pins = projectRoutePins(
      [{ stepNumber: 1, placeId: 'does-not-exist' }],
      places,
    );
    expect(pins).toEqual([]);
  });
});

describe('pin de-overlap (#69, #74)', () => {
  /** Convert a projected canvas point to 375px-baseline pixel coordinates.
   *  Uses the same `mapCanvasWidthPx()` source as the de-overlap so the test
   *  models the real rendered canvas width (Issue #74). */
  function toPixels(pin: { x: number; y: number }): { x: number; y: number } {
    const mapWidth = mapCanvasWidthPx();
    const mapHeight = mapWidth / PIN_LAYOUT.mapAspect;
    return {
      x: (pin.x / PIN_LAYOUT.canvasSize) * mapWidth,
      y: (pin.y / PIN_LAYOUT.canvasSize) * mapHeight,
    };
  }

  // The de-overlap reaches the target exactly; only a float epsilon is allowed.
  const EPSILON = 1e-6;

  it('models the real rendered canvas width (375 − main − borders)', () => {
    // At a 375px viewport the real `.s5-map__canvas` is ~341px wide: 375 minus
    // 16×2 (`.tmm-main` shell gutter) minus 0×2 (`.tmm-page`, gutter owned by
    // the shell since Issue #77) minus 1×2 (`.s5-map` border). This guards the
    // model against regressing to a stale padding assumption (Issues #74/#77).
    expect(mapCanvasWidthPx()).toBe(
      375 - 2 * 16 - 2 * PIN_LAYOUT.baselineGutter - 2 * 1,
    );
    // The canvas still sits inside the single shared gutter (never bleeds into it).
    expect(mapCanvasWidthPx()).toBeLessThan(375 - 2 * PIN_LAYOUT.appMainGutter);
  });

  it('keeps every pair of pins ≥44px apart at the 375px baseline, for both variants', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const pins = projectRoutePins(route!.variants[duration].steps, places);
      for (let i = 0; i < pins.length; i++) {
        for (let j = i + 1; j < pins.length; j++) {
          const a = toPixels(pins[i]);
          const b = toPixels(pins[j]);
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          expect(
            dist,
            `${duration} pins ${pins[i].stepNumber}-${pins[j].stepNumber} overlap (${dist.toFixed(4)}px)`,
          ).toBeGreaterThanOrEqual(PIN_LAYOUT.minSeparationPx - EPSILON);
        }
      }
    }
  });

  it('keeps every pin inside the padded [0,100] canvas after de-overlap', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const pins = projectRoutePins(route!.variants[duration].steps, places);
      for (const pin of pins) {
        expect(pin.x).toBeGreaterThanOrEqual(PIN_LAYOUT.pad - EPSILON);
        expect(pin.x).toBeLessThanOrEqual(PIN_LAYOUT.canvasSize - PIN_LAYOUT.pad + EPSILON);
        expect(pin.y).toBeGreaterThanOrEqual(PIN_LAYOUT.pad - EPSILON);
        expect(pin.y).toBeLessThanOrEqual(PIN_LAYOUT.canvasSize - PIN_LAYOUT.pad + EPSILON);
      }
    }
  });

  it('is deterministic — the same input always yields the same pins', () => {
    const route = getRouteById('okutama-wasabi-journey');
    for (const duration of ['half-day', '1-day'] as RouteDuration[]) {
      const steps = route!.variants[duration].steps;
      const first = projectRoutePins(steps, places);
      const second = projectRoutePins(steps, places);
      expect(second).toEqual(first);
    }
  });

  it('separates the coincident wasabi-garden and soba pins (#69)', () => {
    // 千島わさび園 and 一心亭 share the 丹三郎 district centroid, so their pins
    // project onto the exact same padded-canvas top-right corner; the free pin
    // must absorb the full separation — the pair reaches the target in a single
    // pass (no asymptotic convergence).
    const route = getRouteById('okutama-wasabi-journey');
    const pins = projectRoutePins(route!.variants['half-day'].steps, places);
    const garden = toPixels(pins.find((p) => p.stepNumber === 2)!);
    const soba = toPixels(pins.find((p) => p.stepNumber === 3)!);
    const dist = Math.hypot(garden.x - soba.x, garden.y - soba.y);
    expect(dist).toBeGreaterThanOrEqual(PIN_LAYOUT.minSeparationPx - EPSILON);
  });
});

describe('route-id lookup for a place (#69)', () => {
  it('resolves the model route that contains a spot', () => {
    const routeId = getRouteIdForPlace('soba-isshintei');
    expect(routeId).toBe('okutama-wasabi-journey');
  });

  it('returns undefined for a place outside every model route', () => {
    expect(getRouteIdForPlace('does-not-exist')).toBeUndefined();
  });

  it('does not arbitrarily choose a route when a place belongs to multiple routes', () => {
    const base = getRouteById('okutama-wasabi-journey');
    expect(base).toBeDefined();
    const sharedPlace = 'shared-place';
    const makeRoute = (id: string): ModelRoute => {
      const route = base!;
      const step = route.variants['half-day'].steps[0];
      const replaceSteps = (variant: typeof route.variants['half-day']): typeof variant => ({
        ...variant,
        steps: [{ ...step, placeId: sharedPlace, stepNumber: 1 }],
      });
      return {
        ...route,
        id,
        variants: {
          'half-day': replaceSteps(route.variants['half-day']),
          '1-day': replaceSteps(route.variants['1-day']),
        },
      };
    };
    const routeA = makeRoute('route-a');
    const routeB = makeRoute('route-b');
    // Ambiguous: a shared place must stay unavailable rather than pick one.
    expect(getRouteIdForPlace(sharedPlace, [routeA, routeB])).toBeUndefined();
    // Unambiguous: single route containing the place resolves to itself.
    expect(getRouteIdForPlace(sharedPlace, [routeA])).toBe('route-a');
  });
});
