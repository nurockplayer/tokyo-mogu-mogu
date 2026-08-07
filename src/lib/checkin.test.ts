import { describe, expect, it } from 'vitest';
import { PLACES } from '../data/seed-places';
import { UNLOCK_RADIUS_METERS } from '../data/model';
import { checkInAtPlace } from './checkin';
import type { CheckInResult } from './checkin';

/** A real seed place used across the check-in tests. */
const wasabiField = PLACES.find((p) => p.id === 'okutama-wasabi-field');
const sobaShop = PLACES.find((p) => p.id === 'okutama-soba-shop');

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
