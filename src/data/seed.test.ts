import { describe, expect, it } from 'vitest';
import {
  foodCultures,
  places,
  getFoodCultureById,
  getPlaceById,
  getRelatedPlaces,
  getRelatedFoodCultures,
} from './index';
import { isWithinRadius, distanceInMeters } from '../lib/geo';

describe('seed data contract (#2)', () => {
  it('has at least 5 food cultures', () => {
    expect(foodCultures.length).toBeGreaterThanOrEqual(5);
  });

  it('has at least 5 places', () => {
    expect(places.length).toBeGreaterThanOrEqual(5);
  });

  it('every food culture id is unique', () => {
    const ids = foodCultures.map((fc) => fc.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every place id is unique', () => {
    const ids = places.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('food culture placeIds resolve to existing places', () => {
    for (const fc of foodCultures) {
      for (const placeId of fc.placeIds) {
        expect(getPlaceById(placeId), `missing place ${placeId} for ${fc.id}`).toBeDefined();
      }
    }
  });

  it('place foodCultureIds resolve to existing food cultures', () => {
    for (const p of places) {
      for (const fcId of p.foodCultureIds) {
        expect(getFoodCultureById(fcId), `missing food culture ${fcId} for ${p.id}`).toBeDefined();
      }
    }
  });

  it('every food culture and place carries provenance', () => {
    for (const fc of foodCultures) {
      expect(fc.sources.length, `${fc.id} has no sources`).toBeGreaterThan(0);
    }
    for (const p of places) {
      expect(p.source.name.length, `${p.id} has no source`).toBeGreaterThan(0);
    }
  });

  it('relation helpers return the linked records', () => {
    const wasabi = getFoodCultureById('wasabi-okutama');
    expect(wasabi).toBeDefined();
    expect(getRelatedPlaces(wasabi!).length).toBeGreaterThan(0);

    const firstPlace = getPlaceById(wasabi!.placeIds[0]);
    expect(firstPlace).toBeDefined();
    expect(getRelatedFoodCultures(firstPlace!)).toContain(wasabi);
  });
});

describe('geo helpers', () => {
  it('distance between identical coordinates is 0', () => {
    expect(distanceInMeters(35.8, 139.1, 35.8, 139.1)).toBe(0);
  });

  it('approximately 1 degree of latitude is ~111 km', () => {
    const d = distanceInMeters(35.8, 139.1, 36.8, 139.1);
    expect(d).toBeGreaterThan(110000);
    expect(d).toBeLessThan(112000);
  });

  it('isWithinRadius is true inside and false outside', () => {
    expect(isWithinRadius(35.8, 139.1, 35.8005, 139.1, 500)).toBe(true);
    expect(isWithinRadius(35.8, 139.1, 35.82, 139.1, 500)).toBe(false);
  });
});
