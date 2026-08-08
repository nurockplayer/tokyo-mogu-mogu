import { describe, expect, it } from 'vitest';
import {
  getRouteById,
  MODEL_ROUTES,
  projectRoutePins,
  SPOT_DETAILS,
  type RouteDuration,
} from './seed-routes';
import { places, getPlaceById } from './index';

describe('model routes (#45 S5)', () => {
  it('has a deterministic model route for 奥多摩 × 東京わさび', () => {
    expect(MODEL_ROUTES.length).toBeGreaterThanOrEqual(1);
    const route = getRouteById('okutama-wasabi-journey');
    expect(route).toBeDefined();
    expect(route?.nameEn).toMatch(/Wasabi/);
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
