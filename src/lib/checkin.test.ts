import { describe, expect, it } from 'vitest';
import { PLACES } from '../data/seed-places';
import { isFixedPlace, UNLOCK_RADIUS_METERS } from '../data/model';
import { checkInAtPlace, parseDemoLocationOverride } from './checkin';
import type { CheckInResult } from './checkin';
import type { FixedPlace } from '../data/model';

/** A real seed place used across the check-in tests. */
const wasabiField = PLACES.find(
  (p): p is FixedPlace => p.id === 'okutama-wasabi-field' && isFixedPlace(p),
);
const sobaShop = PLACES.find(
  (p): p is FixedPlace => p.id === 'okutama-soba-shop' && isFixedPlace(p),
);

function resultOf(r: CheckInResult) {
  return r;
}

describe('checkInAtPlace (#6)', () => {
  it('succeeds when the user is within the default unlock radius', () => {
    expect(wasabiField).toBeDefined();
    const r = resultOf(checkInAtPlace(wasabiField!.latitude, wasabiField!.longitude, wasabiField!));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.distanceMeters).toBeLessThanOrEqual(UNLOCK_RADIUS_METERS);
      expect(r.collected).toEqual(wasabiField!.foodCultureIds);
    }
  });

  it('succeeds just inside the radius and returns the distance', () => {
    // ~0.0045 deg of latitude is about 500 m, so staying well inside (0.001)
    // must pass regardless of rounding.
    const r = resultOf(checkInAtPlace(wasabiField!.latitude + 0.001, wasabiField!.longitude, wasabiField!));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.distanceMeters).toBeGreaterThan(0);
      expect(r.distanceMeters).toBeLessThanOrEqual(UNLOCK_RADIUS_METERS);
    }
  });

  it('fails with too-far and the distance when outside the radius', () => {
    // ~1 degree of latitude is ~111 km, far outside the 500 m radius.
    const r = resultOf(checkInAtPlace(wasabiField!.latitude + 1, wasabiField!.longitude, wasabiField!));
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe('too-far');
      expect(r.distanceMeters).toBeGreaterThan(UNLOCK_RADIUS_METERS);
    }
  });

  it('honors a custom radius override (demo) and fails when just outside it', () => {
    const tinyRadius = 50;
    const at = checkInAtPlace(wasabiField!.latitude, wasabiField!.longitude, wasabiField!, tinyRadius);
    expect(at.ok).toBe(true);

    const tooFar = resultOf(
      checkInAtPlace(wasabiField!.latitude + 0.001, wasabiField!.longitude, wasabiField!, tinyRadius),
    );
    expect(tooFar.ok).toBe(false);
    if (!tooFar.ok) {
      expect(tooFar.reason).toBe('too-far');
    }
  });

  it('collects every food culture tied to the place', () => {
    expect(sobaShop).toBeDefined();
    const r = resultOf(checkInAtPlace(sobaShop!.latitude, sobaShop!.longitude, sobaShop!));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.collected).toEqual(sobaShop!.foodCultureIds);
      expect(r.collected.length).toBeGreaterThan(0);
    }
  });

  it('is idempotent: repeated calls return identical results (duplicates are handled by the store)', () => {
    const first = resultOf(checkInAtPlace(wasabiField!.latitude, wasabiField!.longitude, wasabiField!));
    const second = resultOf(checkInAtPlace(wasabiField!.latitude, wasabiField!.longitude, wasabiField!));
    expect(second).toEqual(first);
    // The store's collect/visitPlace ignore duplicate ids, so a repeated
    // check-in never double-collects. This function is pure by design.
    if (first.ok && second.ok) {
      expect(second.collected).toEqual(first.collected);
    }
  });
});

describe('demo location override parsing (#6)', () => {
  it('is disabled when no override params are present', () => {
    const override = parseDemoLocationOverride(new URLSearchParams(''));
    expect(override.enabled).toBe(false);
  });

  it('is disabled with only one of demoLat/demoLng', () => {
    const override = parseDemoLocationOverride(new URLSearchParams('demoLat=35.8'));
    expect(override.enabled).toBe(false);
  });

  it('is enabled with both demoLat and demoLng', () => {
    const override = parseDemoLocationOverride(new URLSearchParams('demoLat=35.8&demoLng=139.1'));
    expect(override).toEqual({ enabled: true, latitude: 35.8, longitude: 139.1 });
  });

  it('enables at a seed place via at=place:<id>', () => {
    expect(wasabiField).toBeDefined();
    const override = parseDemoLocationOverride(
      new URLSearchParams(`at=place:${wasabiField!.id}`),
    );
    expect(override.enabled).toBe(true);
    expect(override.latitude).toBe(wasabiField!.latitude);
    expect(override.longitude).toBe(wasabiField!.longitude);
  });

  it('ignores an unknown at=place:<id>', () => {
    const override = parseDemoLocationOverride(new URLSearchParams('at=place:nope'));
    expect(override.enabled).toBe(false);
  });
});
