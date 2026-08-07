/**
 * Collection progression logic (Issue #8).
 *
 * Pure functions for area/category completion and "next discovery"
 * suggestions. No framework dependencies — unit-testable.
 */
import type { FoodCulture, FoodCultureCategory, Place, TamaArea } from '../data/model';
import { distanceInMeters } from './geo';

/** Food cultures that have NOT been collected yet. */
export function getUndiscovered(
  collectedIds: string[],
  foodCultures: FoodCulture[],
): FoodCulture[] {
  const collected = new Set(collectedIds);
  return foodCultures.filter((fc) => !collected.has(fc.id));
}

export interface AreaCompletion {
  area: TamaArea;
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
  const byArea = new Map<TamaArea, { total: number; collected: number }>();
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
