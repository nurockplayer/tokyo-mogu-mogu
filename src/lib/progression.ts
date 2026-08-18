/**
 * Collection progression logic (Issue #8).
 *
 * Pure functions for area/category completion and "next discovery"
 * suggestions. No framework dependencies — unit-testable.
 */
import type { FoodCulture, FoodCultureCategory, Place, RegionId } from '../data/model';
import { distanceInMeters } from './geo';
import { findNearbyStops, getNextDepartures } from './gtfs';
import type { GtfsDataset, GtfsDeparture, GtfsStop } from './gtfs';

/** Food cultures that have NOT been collected yet. */
export function getUndiscovered(
  collectedIds: string[],
  foodCultures: FoodCulture[],
): FoodCulture[] {
  const collected = new Set(collectedIds);
  return foodCultures.filter((fc) => !collected.has(fc.id));
}

export interface AreaCompletion {
  area: RegionId;
  /** Human-readable area label handled by the UI (i18n). */
  total: number;
  collected: number;
}

/** Per-area completion over the given food cultures. */
export function getAreaCompletion(
  collectedIds: string[],
  foodCultures: FoodCulture[],
): AreaCompletion[] {
  const collected = new Set(collectedIds);
  const byArea = new Map<RegionId, { total: number; collected: number }>();
  for (const fc of foodCultures) {
    const entry = byArea.get(fc.area) ?? { total: 0, collected: 0 };
    entry.total += 1;
    if (collected.has(fc.id)) entry.collected += 1;
    byArea.set(fc.area, entry);
  }
  return Array.from(byArea.entries()).map(([area, counts]) => ({ area, ...counts }));
}

export interface CategoryCompletion {
  category: FoodCultureCategory;
  total: number;
  collected: number;
}

/** Per-category completion over the given food cultures. */
export function getCategoryCompletion(
  collectedIds: string[],
  foodCultures: FoodCulture[],
): CategoryCompletion[] {
  const collected = new Set(collectedIds);
  const byCategory = new Map<FoodCultureCategory, { total: number; collected: number }>();
  for (const fc of foodCultures) {
    const entry = byCategory.get(fc.category) ?? { total: 0, collected: 0 };
    entry.total += 1;
    if (collected.has(fc.id)) entry.collected += 1;
    byCategory.set(fc.category, entry);
  }
  return Array.from(byCategory.entries()).map(([category, counts]) => ({
    category,
    ...counts,
  }));
}

/**
 * Next-discovery suggestions: undiscovered food cultures ranked so that
 * nearby ones (distance to their nearest place, or to the given location)
 * come first. When no location is provided, sort by number of places.
 */
export function getNextDiscoveries(
  collectedIds: string[],
  foodCultures: FoodCulture[],
  places: Place[],
  user?: { latitude: number; longitude: number },
  limit = 3,
): FoodCulture[] {
  const placeById = new Map(places.map((p) => [p.id, p]));

  const rank = (fc: FoodCulture): number => {
    const nearest = fc.placeIds
      .map((id) => placeById.get(id))
      .filter((p): p is Place => p !== undefined)
      .map((p) =>
        user
          ? distanceInMeters(user.latitude, user.longitude, p.latitude, p.longitude)
          : 1, // without a location, prefer items with places
      )
      .sort((a, b) => a - b);
    return nearest[0] ?? Number.POSITIVE_INFINITY;
  };

  return getUndiscovered(collectedIds, foodCultures)
    .map((fc) => ({ fc, score: rank(fc) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(({ fc }) => fc);
}

// ---------------------------------------------------------------------------
// Transit-aware next discovery (Issue #8 — transit extension, additive).
//
// Representation of "now": `afterTimeMinutes` is **minutes from midnight**
// (e.g. 510 = 08:30), the same representation GTFS stop_times use in
// `src/lib/gtfs.ts`. Callers that have a wall-clock `Date` convert with
// `toMinutesFromMidnight(date)`; tests pass explicit values so ranking is
// deterministic. GTFS availability is OPTIONAL: a null `gtfsDataset` makes
// every transit-aware call degrade to the existing distance-based behavior.
// ---------------------------------------------------------------------------

/**
 * Radius (meters) within which a bus stop counts as "reachable" for a Place.
 * Matches the demo fixture layout around 奥多摩駅 (~200–700 m), so the demo
 * actually shows transit info. This is a demo-oriented default, not a verified
 * accessibility threshold.
 */
export const TRANSIT_NEARBY_RADIUS_METERS = 1500;

/**
 * A departure is considered "catchable" when it leaves within this many
 * minutes from `afterTimeMinutes`. Candidates whose nearest stop only runs
 * later than this are treated as hard to reach.
 */
export const TRANSIT_MAX_WAIT_MINUTES = 60;

/**
 * Minutes from midnight (0–1439) for a wall-clock `Date` (local time).
 * GTFS stop_times use the same "minutes from midnight" representation
 * (see `src/lib/gtfs.ts`).
 */
export function toMinutesFromMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/** Nearest reachable stop + next departure for a Place, or null. */
export interface PlaceTransitInfo {
  nearestStop: GtfsStop;
  nextDeparture: GtfsDeparture;
}

/**
 * Nearest bus stop for a Place plus its next departure after
 * `afterTimeMinutes`. Returns null when `gtfsDataset` is null, the Place has no
 * stop within `radiusMeters`, or the nearest stop has no later departure.
 *
 * The departure comes from the nearest reachable stop (the one that actually
 * has a scheduled departure after `afterTimeMinutes`); a closer stop with no
 * upcoming service is skipped rather than reported as a dead end.
 */
export function getTransitInfoForPlace(
  gtfsDataset: GtfsDataset | null,
  place: Place,
  afterTimeMinutes: number,
  radiusMeters = TRANSIT_NEARBY_RADIUS_METERS,
): PlaceTransitInfo | null {
  if (!gtfsDataset) return null;

  for (const stop of findNearbyStops(gtfsDataset, place.latitude, place.longitude, radiusMeters)) {
    const [nextDeparture] = getNextDepartures(gtfsDataset, stop.stopId, afterTimeMinutes, 1);
    if (nextDeparture) {
      return { nearestStop: stop, nextDeparture };
    }
  }
  return null;
}

/** Whether `departure` leaves within `maxWaitMinutes` of `afterTimeMinutes`. */
function isWithinWaitWindow(departure: GtfsDeparture, afterTimeMinutes: number, maxWaitMinutes: number): boolean {
  return departure.stopTime.departureMin <= afterTimeMinutes + maxWaitMinutes;
}

/**
 * Tiered transit score for an undiscovered candidate. Tiers are compared first
 * (lower tier wins); within a tier, the earliest departure (then nearest-place
 * distance) decides. This keeps the demotion of hard-to-reach candidates
 * strict regardless of how far apart places are.
 */
interface TransitScore {
  /** 0 = catchable, 1 = reachable but waits too long, 2 = no transit. */
  tier: 0 | 1 | 2;
  /** Earliest catchable departure (minutes from midnight); Infinity when none. */
  earliestDeparture: number;
  /** Distance from the user to the nearest place (m); 0 without a location. */
  nearestDistance: number;
}

function transitScore(
  fc: FoodCulture,
  placeById: Map<string, Place>,
  gtfsDataset: GtfsDataset,
  afterTimeMinutes: number,
  user?: { latitude: number; longitude: number },
): TransitScore {
  const placesOf = fc.placeIds
    .map((id) => placeById.get(id))
    .filter((p): p is Place => p !== undefined);

  const reachable = placesOf.map((place) =>
    getTransitInfoForPlace(gtfsDataset, place, afterTimeMinutes),
  );
  const catchable = reachable
    .filter(
      (info): info is PlaceTransitInfo =>
        info !== null && isWithinWaitWindow(info.nextDeparture, afterTimeMinutes, TRANSIT_MAX_WAIT_MINUTES),
    )
    .map((info) => info.nextDeparture.stopTime.departureMin)
    .sort((a, b) => a - b);

  const nearestDistance = Math.min(
    ...placesOf.map((place) =>
      user
        ? distanceInMeters(user.latitude, user.longitude, place.latitude, place.longitude)
        : 0,
    ),
  );

  if (catchable.length > 0) {
    return { tier: 0, earliestDeparture: catchable[0], nearestDistance };
  }
  if (reachable.some((info): info is PlaceTransitInfo => info !== null)) {
    // A stop exists but only runs later than the wait window.
    return { tier: 1, earliestDeparture: Number.POSITIVE_INFINITY, nearestDistance };
  }
  // No stop nearby, or no scheduled departure at all.
  return { tier: 2, earliestDeparture: Number.POSITIVE_INFINITY, nearestDistance };
}

/** Compare two transit scores: tier, then departure, then distance. */
function compareTransitScores(a: TransitScore, b: TransitScore): number {
  if (a.tier !== b.tier) return a.tier - b.tier;
  if (a.earliestDeparture !== b.earliestDeparture) {
    return a.earliestDeparture - b.earliestDeparture;
  }
  return a.nearestDistance - b.nearestDistance;
}

/**
 * Transit-aware next-discovery ranking (Issue #8 transit extension).
 *
 * Same API shape as `getNextDiscoveries`, plus an optional GTFS dataset. With
 * GTFS present, candidates whose nearest place has a bus stop with a departure
 * within `TRANSIT_MAX_WAIT_MINUTES` of `afterTimeMinutes` rank first (earliest
 * departure wins, distance as a tiebreak). Candidates that have a stop but only
 * a later departure rank next; candidates without any reachable stop or
 * scheduled departure are demoted so transit-inaccessible options are never
 * prioritized by mistake.
 *
 * With a null `gtfsDataset`, this delegates to the existing distance-based
 * `getNextDiscoveries` — the app keeps working without GTFS.
 */
export function getNextDiscoveriesWithTransit(
  collectedIds: string[],
  foodCultures: FoodCulture[],
  places: Place[],
  gtfsDataset: GtfsDataset | null,
  user?: { latitude: number; longitude: number },
  limit = 3,
  afterTimeMinutes = 0,
): FoodCulture[] {
  if (!gtfsDataset) {
    return getNextDiscoveries(collectedIds, foodCultures, places, user, limit);
  }

  const placeById = new Map(places.map((p) => [p.id, p]));

  return getUndiscovered(collectedIds, foodCultures)
    .map((fc) => ({
      fc,
      score: transitScore(fc, placeById, gtfsDataset, afterTimeMinutes, user),
    }))
    .sort((a, b) => compareTransitScores(a.score, b.score))
    .slice(0, limit)
    .map(({ fc }) => fc);
}
