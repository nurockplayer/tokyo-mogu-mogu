/**
 * The single frozen pilot journey for the 8/23 demo (Issue #127).
 *
 * One canonical record that Result / Story / Route / Spot / Discover all read,
 * instead of each surface hard-coding the same ids. The journey stays DATA (ids
 * resolved through the existing canonical seed) — no Okutama/Tokyo-Wasabi
 * semantics are baked into the reusable domain model (`src/data/model.ts`).
 */
import type { ModelRoute } from './seed-routes';

export const PILOT_JOURNEY = {
  /** The recommended food culture (deterministic Result → Story). */
  foodCultureId: 'wasabi-okutama',
  /** The deterministic model route (Story → Route → Spot). */
  routeId: 'okutama-wasabi-journey',
} as const;

/** The frozen pilot-journey record's shape. */
export type PilotJourney = typeof PILOT_JOURNEY;

/**
 * The place ids surfaced on Discover — the union of the pilot route's step
 * stops across both variants. Deriving the list from the route (instead of a
 * second hard-coded array) keeps Discover and Route on the same canonical data.
 */
export function pilotDiscoverPlaceIds(route: ModelRoute): string[] {
  const ids = new Set<string>();
  for (const variant of Object.values(route.variants)) {
    for (const step of variant.steps) {
      ids.add(step.placeId);
    }
  }
  return [...ids];
}
