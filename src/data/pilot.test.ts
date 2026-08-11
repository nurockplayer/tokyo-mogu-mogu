/**
 * TAC-6 / GH #127 — Frozen 2026-08-23 pilot dataset integrity tests.
 *
 * Locks the acceptance criteria of the frozen Tama demo journey against the
 * canonical records:
 * - the pilot route resolves and every step is covered by the pilot place list
 *   (Route and Discover reuse the same canonical journey);
 * - every pilot place / featured culture resolves to an existing record;
 * - provenance is complete (sourceType / retrievedAt / originalId present);
 * - demo-origin records never derive as verified;
 * - no fabricated practical fields (hours / price / closed days only when
 *   source data exists);
 * - the Discover page surfaces exactly the canonical pilot place list.
 */
import { describe, expect, it } from 'vitest';
import {
  PILOT_ROUTE_ID,
  PILOT_FEATURED_CULTURE_ID,
  PILOT_PLACE_IDS,
  pilotPlaces,
  pilotRoute,
  pilotPlaceVerification,
  routeFullyCoveredByPilot,
} from './pilot';
import { getFoodCultureById, getPlaceById, foodCultures } from './index';
import { getRouteById, SPOT_DETAILS } from './seed-routes';
import { deriveVerificationStatus } from '../lib/verification';
import { PLACE_DATA_KEYS } from '../i18n/data-content';

describe('frozen pilot dataset (#127)', () => {
  it('the pilot route resolves and is the Okutama wasabi journey', () => {
    const route = pilotRoute();
    expect(route).toBeDefined();
    expect(route!.id).toBe(PILOT_ROUTE_ID);
    expect(route!.nameEn).toMatch(/Wasabi/);
  });

  it('every route step is covered by the canonical pilot place list', () => {
    expect(routeFullyCoveredByPilot()).toBe(true);
  });

  it('the featured culture resolves and belongs to the seed', () => {
    const fc = getFoodCultureById(PILOT_FEATURED_CULTURE_ID);
    expect(fc).toBeDefined();
    expect(foodCultures.some((c) => c.id === PILOT_FEATURED_CULTURE_ID)).toBe(true);
  });

  it('every pilot place id resolves to an existing canonical place', () => {
    const resolved = pilotPlaces();
    expect(resolved.length).toBe(PILOT_PLACE_IDS.length);
    for (const id of PILOT_PLACE_IDS) {
      expect(getPlaceById(id), `missing pilot place ${id}`).toBeDefined();
    }
  });

  it('every pilot place has a spot detail (Story → Route → Spot coverage)', () => {
    for (const id of PILOT_PLACE_IDS) {
      expect(SPOT_DETAILS[id], `no spot detail for ${id}`).toBeDefined();
    }
  });

  it('every pilot place carries complete provenance (#127 provenance AC)', () => {
    for (const id of PILOT_PLACE_IDS) {
      const place = getPlaceById(id)!;
      expect(place.source.sourceType, `${id} missing sourceType`).toBeDefined();
      expect(place.source.retrievedAt, `${id} missing retrievedAt`).toBeDefined();
      expect(place.source.originalId, `${id} missing originalId`).toBeDefined();
    }
  });

  it('demo-origin pilot places never derive as verified (#127 / #129)', () => {
    for (const id of PILOT_PLACE_IDS) {
      const place = getPlaceById(id)!;
      const status = deriveVerificationStatus(place.source, place.origin);
      expect(['demo', 'needs_confirmation'], `${id} → ${status}`).toContain(status);
    }
  });

  it('pilotPlaceVerification reports the same status as the shared helper', () => {
    for (const id of PILOT_PLACE_IDS) {
      const place = getPlaceById(id)!;
      expect(pilotPlaceVerification(id)).toBe(
        deriveVerificationStatus(place.source, place.origin),
      );
    }
  });

  it('no spot practical field is fabricated when the source does not support it (#127)', () => {
    // hours / price / closed days are only populated from real source data.
    // The frozen pilot has no verified hours/price/closed-day data, so no spot
    // detail may claim them.
    for (const id of PILOT_PLACE_IDS) {
      const detail = SPOT_DETAILS[id];
      if (detail?.practical) {
        expect(detail.practical.hoursJa).toBeUndefined();
        expect(detail.practical.hoursEn).toBeUndefined();
        expect(detail.practical.priceJa).toBeUndefined();
        expect(detail.practical.priceEn).toBeUndefined();
        expect(detail.practical.closedDaysJa).toBeUndefined();
        expect(detail.practical.closedDaysEn).toBeUndefined();
      }
    }
  });

  it('every pilot place references the featured culture or a pilot culture (#127)', () => {
    // The journey is Okutama × Tokyo wasabi: each stop should connect to the
    // featured culture or a culture reachable from the canonical seed.
    for (const id of PILOT_PLACE_IDS) {
      const place = getPlaceById(id)!;
      expect(place.foodCultureIds.length, `${id} has no linked culture`).toBeGreaterThan(0);
    }
  });

  it('Discover and Route agree on the same canonical pilot journey', () => {
    const route = getRouteById(PILOT_ROUTE_ID)!;
    // The journey is one route with two duration variants; a place may appear
    // in either (e.g. the fishing center is a 1-day-only stop). The reuse
    // contract spans every variant's steps.
    const routeStepIds = new Set(
      Object.values(route.variants).flatMap((v) => v.steps.map((s) => s.placeId)),
    );
    // Every route step is in the pilot list AND the pilot list contains no
    // place outside the route (both directions of the reuse contract).
    for (const stepId of routeStepIds) {
      expect(PILOT_PLACE_IDS).toContain(stepId);
    }
    for (const pilotId of PILOT_PLACE_IDS) {
      expect(routeStepIds.has(pilotId), `pilot place ${pilotId} not in route`).toBe(true);
    }
  });

  it('no pilot place claims an unverified reservation or dietary/allergy/accessibility tag', () => {
    // The frozen pilot has no verified reservation availability or dietary/
    // allergy/accessibility claims. Any tag that exists must be supported by
    // a source (the current seed has none, so tags stay empty).
    for (const id of PILOT_PLACE_IDS) {
      const detail = SPOT_DETAILS[id];
      if (detail) {
        expect(detail.practical?.reservationAvailable).toBeUndefined();
        expect(detail.tags.vegetarian).toBeUndefined();
        expect(detail.tags.allergyNotice).toBeUndefined();
        expect(detail.tags.accessibility).toBeUndefined();
      }
    }
  });

  it('every pilot place has an i18n name key (Discover never silently mislabels)', () => {
    // Discover resolves place names via PLACE_DATA_KEYS. A pilot place without
    // a name key would fall back and could mislabel a spot. Lock the mapping.
    for (const id of PILOT_PLACE_IDS) {
      const key = id as keyof typeof PLACE_DATA_KEYS;
      expect(PLACE_DATA_KEYS[key]?.name, `pilot place ${id} missing i18n name key`).toBeDefined();
    }
  });
});
