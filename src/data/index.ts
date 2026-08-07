/**
 * Data layer entry point for the app.
 *
 * All feature code reads food cultures and places through this module so the
 * underlying source (static seed data today) can be swapped later without
 * touching consumers.
 */
import { FOOD_CULTURES } from './seed-food-cultures';
import { PLACES } from './seed-places';
import type { FoodCulture, Place } from './model';

export type { FoodCulture, Place, DataSource, DataOrigin, UnlockMethod, FoodCultureCategory, PlaceType, TamaArea } from './model';
export { UNLOCK_RADIUS_METERS } from './model';

/** All food cultures in the seed dataset. */
export const foodCultures: FoodCulture[] = FOOD_CULTURES;

/** All places in the seed dataset. */
export const places: Place[] = PLACES;

export function getFoodCultureById(id: string): FoodCulture | undefined {
  return FOOD_CULTURES.find((fc) => fc.id === id);
}

export function getPlaceById(id: string): Place | undefined {
  return PLACES.find((p) => p.id === id);
}

/** Places related to a food culture via its placeIds. */
export function getRelatedPlaces(foodCulture: FoodCulture): Place[] {
  return foodCulture.placeIds
    .map((id) => getPlaceById(id))
    .filter((p): p is Place => p !== undefined);
}

/** Food cultures related to a place via its foodCultureIds. */
export function getRelatedFoodCultures(place: Place): FoodCulture[] {
  return place.foodCultureIds
    .map((id) => getFoodCultureById(id))
    .filter((fc): fc is FoodCulture => fc !== undefined);
}
