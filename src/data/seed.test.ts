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
import {
  deriveVerificationStatus,
  recordVerificationStatus,
} from '../lib/verification';
import type { VerificationStatus } from './model';

const VERIFICATION_STATUSES: VerificationStatus[] = [
  'verified',
  'needs_confirmation',
  'stale',
  'conflict',
  'demo',
];

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

  it('every seed record tracks sourceType / retrievedAt / originalId (#2 provenance AC)', () => {
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        expect(s.sourceType, `${fc.id} source missing sourceType`).toBeDefined();
        expect(s.retrievedAt, `${fc.id} source missing retrievedAt`).toBeDefined();
        expect(s.originalId, `${fc.id} source missing originalId`).toBeDefined();
      }
    }
    for (const p of places) {
      expect(p.source.sourceType, `${p.id} source missing sourceType`).toBeDefined();
      expect(p.source.retrievedAt, `${p.id} source missing retrievedAt`).toBeDefined();
      expect(p.source.originalId, `${p.id} source missing originalId`).toBeDefined();
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

  it('every source timestamp is a parseable ISO date (#129)', () => {
    const dates: string[] = [];
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.sourceUpdatedAt) dates.push(s.sourceUpdatedAt);
        if (s.confirmedAt) dates.push(s.confirmedAt);
        if (s.retrievedAt) dates.push(s.retrievedAt);
      }
    }
    for (const p of places) {
      if (p.source.sourceUpdatedAt) dates.push(p.source.sourceUpdatedAt);
      if (p.source.confirmedAt) dates.push(p.source.confirmedAt);
      if (p.source.retrievedAt) dates.push(p.source.retrievedAt);
    }
    for (const d of dates) {
      expect(Number.isNaN(Date.parse(d)), `${d} is not parseable`).toBe(false);
      // Date-only ISO strings are stable to compare lexicographically.
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('sourceUpdatedAt is absent from seed records unless the publisher supplies it (#129)', () => {
    // sourceUpdatedAt means the source document's own update date. The current
    // seed only records retrieval dates — do not invent publisher update dates.
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        expect(s.sourceUpdatedAt, `${fc.id} source has an unsupported sourceUpdatedAt`).toBeUndefined();
      }
    }
    for (const p of places) {
      expect(p.source.sourceUpdatedAt, `${p.id} source has an unsupported sourceUpdatedAt`).toBeUndefined();
    }
  });

  it('retrievedAt is never equaled to sourceUpdatedAt by copying (#129)', () => {
    // Where sourceUpdatedAt exists it must be a real publisher update date,
    // not a copy of retrievedAt (see the absent test above for current seed).
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.sourceUpdatedAt && s.retrievedAt) {
          expect(
            s.sourceUpdatedAt === s.retrievedAt,
            `${fc.id} sourceUpdatedAt copies retrievedAt`,
          ).toBe(false);
        }
      }
    }
    for (const p of places) {
      const s = p.source;
      if (s.sourceUpdatedAt && s.retrievedAt) {
        expect(s.sourceUpdatedAt === s.retrievedAt, `${p.id} sourceUpdatedAt copies retrievedAt`).toBe(
          false,
        );
      }
    }
  });

  it('confirmedAt never precedes the source update (#129)', () => {
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.confirmedAt && s.sourceUpdatedAt) {
          expect(
            s.confirmedAt >= s.sourceUpdatedAt,
            `${fc.id}: confirmedAt ${s.confirmedAt} < sourceUpdatedAt ${s.sourceUpdatedAt}`,
          ).toBe(true);
        }
      }
    }
    for (const p of places) {
      const s = p.source;
      if (s.confirmedAt && s.sourceUpdatedAt) {
        expect(s.confirmedAt >= s.sourceUpdatedAt, `${p.id} confirmedAt precedes source update`).toBe(
          true,
        );
      }
    }
  });

  it('verification status derives to a closed, safe union for every record (#129)', () => {
    for (const fc of foodCultures) {
      const status = recordVerificationStatus(fc.sources, fc.origin);
      expect(VERIFICATION_STATUSES, `${fc.id} → ${status}`).toContain(status);
    }
    for (const p of places) {
      const status = deriveVerificationStatus(p.source, p.origin);
      expect(VERIFICATION_STATUSES, `${p.id} → ${status}`).toContain(status);
    }
  });

  it('demo fixtures are never derived as verified production facts (#129)', () => {
    for (const p of places) {
      if (p.origin === 'demo') {
        expect(
          deriveVerificationStatus(p.source, p.origin),
          `${p.id} demo place must not be verified`,
        ).toBe('demo');
      }
    }
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
