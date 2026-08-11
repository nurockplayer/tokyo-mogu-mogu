/**
 * TAC-6 / GH #127 — Frozen 2026-08-23 pilot dataset manifest.
 *
 * This module is the single source of truth for what the frozen Tama demo
 * journey IS for the 2026-08-23 hackathon. Consumers (Discover, Story, Route,
 * Spot) reuse the same canonical records via `src/data/index.ts`; this file
 * anchors which records belong to the frozen journey so the app surfaces and
 * the tests agree on the pilot scope without each page hard-coding its own
 * id list.
 *
 * Provenance rules (GH #127 / Sol scope gate):
 * - `retrievedAt` is retrieval, never stakeholder confirmation.
 * - Only `confirmedAt` / derived verification support verified presentation.
 * - Demo-origin records (approximate coordinates, demo fixtures) are always
 *   rendered as demo, never as verified production facts.
 * - No field is invented: hours / price / reservation / dietary / allergy /
 *   multilingual / accessibility / image-reuse are populated only when a source
 *   supports them, and degrade to an explicit unknown/unverified state
 *   otherwise.
 */
import { foodCultures, places, getFoodCultureById, getPlaceById } from './index';
import { getRouteById, MODEL_ROUTES } from './seed-routes';
import { deriveVerificationStatus } from '../lib/verification';

/** The frozen Okutama × Tokyo-wasabi journey id (the pilot route). */
export const PILOT_ROUTE_ID = 'okutama-wasabi-journey';

/** The featured first-pilot food culture surfaced at the top of Discover. */
export const PILOT_FEATURED_CULTURE_ID = 'wasabi-okutama';

/**
 * The Okutama first-pilot spots (real facilities, demo-approximate
 * coordinates). This is the single canonical list; Discover imports it so it
 * cannot drift from the route/seed records.
 */
export const PILOT_PLACE_IDS: readonly string[] = [
  'okutama-tourism-office',
  'okutama-wasabi-field',
  'okutama-soba-shop',
  'okutama-michi-no-eki',
  'okutama-fishing-center',
];

/** Resolved canonical place records for the pilot (order follows PILOT_PLACE_IDS). */
export function pilotPlaces() {
  return PILOT_PLACE_IDS.map((id) => getPlaceById(id)).filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  );
}

/** The frozen pilot route record, if it resolves. */
export function pilotRoute() {
  return getRouteById(PILOT_ROUTE_ID);
}

/**
 * True when every route step of every variant is covered by the frozen pilot
 * place list — the guarantee that Route and Discover agree on the same
 * canonical journey.
 */
export function routeFullyCoveredByPilot(): boolean {
  const route = pilotRoute();
  if (!route) {
    return false;
  }
  const pilotSet = new Set(PILOT_PLACE_IDS);
  for (const variant of Object.values(route.variants)) {
    for (const step of variant.steps) {
      if (!pilotSet.has(step.placeId)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The verification status a place actually renders as (via the shared helper),
 * so callers/tests can assert demo-vs-production honesty in one place.
 */
export function pilotPlaceVerification(placeId: string) {
  const place = getPlaceById(placeId);
  if (!place) {
    return undefined;
  }
  return deriveVerificationStatus(place.source, place.origin);
}

// Re-exported for convenience so consumers import the manifest, not data modules.
export { foodCultures, places, getFoodCultureById, getPlaceById, MODEL_ROUTES };
