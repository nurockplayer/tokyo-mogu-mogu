import { describe, expect, it } from 'vitest';
import {
  getRouteById,
  getRouteIdForPlace,
  mapCanvasWidthPx,
  MODEL_ROUTES,
  PIN_LAYOUT,
  projectRoutePins,
  SPOT_DETAILS,
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

  it('practical info is never fabricated — hours/price/closed are absent when unverified', () => {
    // The route seed deliberately has NO verified hours/price/closed-day data,
    // so no spot detail may claim them. Access labels are demo-marked strings.
    for (const detail of Object.values(SPOT_DETAILS)) {
      const p = detail.practical;
      if (p) {
        expect(p.hoursJa).toBeUndefined();
        expect(p.hoursEn).toBeUndefined();
        expect(p.priceJa).toBeUndefined();
        expect(p.priceEn).toBeUndefined();
        expect(p.closedDaysJa).toBeUndefined();
        expect(p.closedDaysEn).toBeUndefined();
      }
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
});
