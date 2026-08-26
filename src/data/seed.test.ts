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
      if (p.coordinateSource) {
        expect(p.coordinateSource.sourceType, `${p.id} coordinate source missing sourceType`).toBeDefined();
        expect(p.coordinateSource.retrievedAt, `${p.id} coordinate source missing retrievedAt`).toBeDefined();
        expect(p.coordinateSource.originalId, `${p.id} coordinate source missing originalId`).toBeDefined();
      }
    }
  });

  it('keeps the tourism-office seed aligned with its checked source facts (#322)', () => {
    const tourismOffice = getPlaceById('okutama-tourism-office');

    expect(tourismOffice).toMatchObject({
      address: '東京都西多摩郡奥多摩町氷川210',
      source: {
        url: 'https://www.okutama.gr.jp/site/',
        retrievedAt: '2026-08-26',
        verificationStatus: 'needs_confirmation',
        originalId: 'okutama-tourism-office',
      },
    });
    expect(tourismOffice?.source).not.toHaveProperty('confirmedAt');
  });

  it('relation helpers return the linked records', () => {
    const wasabi = getFoodCultureById('wasabi-okutama');
    expect(wasabi).toBeDefined();
    expect(getRelatedPlaces(wasabi!).length).toBeGreaterThan(0);

    const firstPlace = getPlaceById(wasabi!.placeIds[0]);
    expect(firstPlace).toBeDefined();
    expect(getRelatedFoodCultures(firstPlace!)).toContain(wasabi);
  });

  it('keeps every Place ↔ FoodCulture relationship symmetric (#127)', () => {
    // Shared consumers traverse from FoodCulture.placeIds (FoodCulturePage,
    // map) AND from Place.foodCultureIds (SpotPage, check-in). A one-way link
    // makes one side invisible, so every pair must agree:
    //   place.foodCultureIds includes culture.id  ⟺  culture.placeIds includes place.id
    // The canonical seed is intentionally fully symmetric, including the
    // retained demo fixtures (okutama-soba-shop ↔ okutama-soba etc.). Any
    // future intentional asymmetric demo fixture must be documented at its
    // definition site rather than silently accepted here.
    for (const fc of foodCultures) {
      for (const placeId of fc.placeIds) {
        const place = getPlaceById(placeId);
        expect(place, `${fc.id} → missing place ${placeId}`).toBeDefined();
        expect(place!.foodCultureIds, `${fc.id} → ${placeId} missing back-ref`).toContain(fc.id);
      }
    }
    for (const place of places) {
      for (const fcId of place.foodCultureIds) {
        const fc = getFoodCultureById(fcId);
        expect(fc, `${place.id} → missing culture ${fcId}`).toBeDefined();
        expect(fc!.placeIds, `${place.id} → ${fcId} missing back-ref`).toContain(place.id);
      }
    }
  });

  it('registers the Hachioji ginger slice as source-backed Tokyo-wide data (#238)', () => {
    const culture = getFoodCultureById('hachioji-ginger');
    expect(culture).toMatchObject({
      area: 'hachioji',
      category: 'produce',
      origin: 'editorial',
      placeIds: ['hachioji-takiyama-roadside-station'],
    });
    expect(culture?.sources.map((source) => source.sourceType)).toContain('official_web');

    const market = getPlaceById('hachioji-takiyama-roadside-station');
    expect(market).toMatchObject({
      type: 'shop',
      origin: 'source',
      foodCultureIds: ['hachioji-ginger'],
      coordinatePrecision: 'approximate',
    });
    expect(market?.source.url).toMatch(/^https:\/\//);
    expect(market?.source.verificationStatus).toBe('needs_confirmation');
    expect(market?.coordinateSource).toMatchObject({
      name: 'OpenStreetMap',
      license: 'ODbL 1.0',
      originalId: 'geocoded-hachioji-takiyama-roadside-station',
    });
    expect(market?.coordinateSource).toMatchObject({
      name: 'OpenStreetMap',
      sourceType: 'open_data',
      license: 'ODbL 1.0',
      retrievedAt: '2026-08-19',
    });
    expect(market?.coordinateSource?.url).toContain('openstreetmap.org');

    const heritage = getPlaceById('hachioji-takiyama-castle');
    expect(heritage).toMatchObject({
      foodCultureIds: [],
      origin: 'source',
      coordinatePrecision: 'approximate',
    });
    expect(heritage?.source.sourceDatasetId).toBe('t132012d3000000018');
    expect(heritage?.source.license).toBe('CC BY 4.0');
    expect(heritage?.coordinateSource?.license).toBe('ODbL 1.0');
    expect(heritage?.coordinateSource?.url).toContain('openstreetmap.org');
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
      if (p.coordinateSource?.sourceUpdatedAt) dates.push(p.coordinateSource.sourceUpdatedAt);
      if (p.coordinateSource?.confirmedAt) dates.push(p.coordinateSource.confirmedAt);
      if (p.coordinateSource?.retrievedAt) dates.push(p.coordinateSource.retrievedAt);
    }
    for (const d of dates) {
      expect(Number.isNaN(Date.parse(d)), `${d} is not parseable`).toBe(false);
      // Date-only ISO strings are stable to compare lexicographically.
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('sourceUpdatedAt is absent from seed records unless the publisher supplies it (#129)', () => {
    // sourceUpdatedAt means the source document's own update date. Keep an
    // explicit allow-list for the publisher markers observed for the current
    // Fussa/Akiruno slices; do not infer or copy dates for other records.
    const publisherSuppliedSourceIds = new Set([
      'fussa-tokyo-sake-brewery-1005934',
      'fussa-water-heritage-course-1004236',
      'kurumiru-fussa-1001605',
      'akiruno-specialty-foods-1109',
      'akiruno-farmers-center-3556',
      'gotokyo-seoto-no-yu-397',
      'kurumiru-fussa-honcho23',
    ]);
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.sourceUpdatedAt) {
          expect(
            publisherSuppliedSourceIds.has(s.originalId ?? ''),
            `${fc.id} source has an unsupported sourceUpdatedAt`,
          ).toBe(true);
        }
      }
    }
    for (const p of places) {
      if (p.source.sourceUpdatedAt) {
        expect(
          publisherSuppliedSourceIds.has(p.source.originalId ?? ''),
          `${p.id} source has an unsupported sourceUpdatedAt`,
        ).toBe(true);
      }
      if (p.coordinateSource?.sourceUpdatedAt) {
        expect(
          publisherSuppliedSourceIds.has(p.coordinateSource.originalId ?? ''),
          `${p.id} coordinate source has an unsupported sourceUpdatedAt`,
        ).toBe(true);
      }
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
      const coordinateSource = p.coordinateSource;
      if (coordinateSource?.sourceUpdatedAt && coordinateSource.retrievedAt) {
        expect(
          coordinateSource.sourceUpdatedAt === coordinateSource.retrievedAt,
          `${p.id} coordinate sourceUpdatedAt copies retrievedAt`,
        ).toBe(false);
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
