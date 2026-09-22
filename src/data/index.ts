/**
 * Data layer entry point for the app.
 *
 * All feature code reads food cultures and places through this module so the
 * underlying source (static seed data today) can be swapped later without
 * touching consumers.
 */
import { FOOD_CULTURES } from './seed-food-cultures';
import { PLACES } from './seed-places';
import { getRouteById as _getRouteById, getRouteIdForPlace as _getRouteIdForPlace, getSpotDetail as _getSpotDetail, MODEL_ROUTES, projectRoutePins as _projectRoutePins } from './seed-routes';
import type { FoodCulture, Place } from './model';
import type { ModelRoute, SpotDetail } from './seed-routes';

export type { FoodCulture, Place, FixedPlace, MobilePlace, PlaceMobileVenue, PlaceVisitorInformation, PlaceBusinessHours, PlaceWeekday, PlaceParkingInformation, PlaceMenuListing, PlaceSourceConflictStatement, DataSource, DataOrigin, VerificationStatus, UnlockMethod, FoodCultureCategory, PlaceType, RegionId } from './model';
export type { ModelRoute, RouteDuration, RouteMobilityMode, RouteStepData, RouteMobilitySegment, RouteVariant, SpotDetail, SpotPracticalInfo, SpotTags } from './seed-routes';
export { UNLOCK_RADIUS_METERS, isAddressedPlace, isFixedPlace } from './model';

/** All food cultures in the seed dataset. */
export const foodCultures: FoodCulture[] = FOOD_CULTURES;

/** All places in the seed dataset. */
export const places: Place[] = PLACES;

/** All deterministic model routes (Issue #45, S5). */
export const modelRoutes: ModelRoute[] = MODEL_ROUTES;

/** Look up a deterministic model route by id (Issue #45). */
export function getRouteById(id: string): ModelRoute | undefined {
  return _getRouteById(id);
}

/** Look up editorial spot detail by place id (Issue #45, S6). */
export function getSpotDetail(placeId: string): SpotDetail | undefined {
  return _getSpotDetail(placeId);
}

/**
 * Project route stops onto a [0,100] × [0,100] map canvas (Issue #45).
 * Pin number == step number. Pins are de-overlapped for the 375px baseline so
 * each stays individually tappable (Issue #69).
 */
export function projectRoutePins(
  steps: Array<{ stepNumber: number; placeId: string }>,
  placesList: ReadonlyArray<Place>,
): Array<{ stepNumber: number; x: number; y: number }> {
  return _projectRoutePins(steps, placesList);
}

/** Resolve the model route that contains a place, if any (Issue #69, S6 save). */
export function getRouteIdForPlace(placeId: string): string | undefined {
  return _getRouteIdForPlace(placeId);
}

/**
 * The single frozen pilot journey (Issue #127). Result / Story / Route / Spot /
 * Discover read this record instead of each hard-coding the same ids.
 */
export { PILOT_JOURNEY, pilotDiscoverPlaceIds } from './pilot-journey';
export {
  DEMO_RECOMMENDATION_CANDIDATES,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
  DEMO_FUSSA_SAKE_CANDIDATE_ID,
  DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
  demoRecommendationMatchTags,
} from './demo-recommendation';
export {
  SLICE_MANIFEST,
  maturityOf,
  discoverVisibilityOf,
  releaseRoleOf,
  isCandidateRecommendable,
  isCandidateDiscoverable,
  recommendableCandidates,
  discoverableCandidates,
  hiddenManagedFoodCultureIds,
} from './slice-manifest';
export type {
  ReleaseRole,
  SliceMaturity,
  SliceVisibility,
  SliceManifestEntry,
} from './slice-manifest';
export { resolveJourneyIdentity, resolveRouteId, resolveStoryJourney } from './journey';
export type { JourneyIdentity } from './journey';
export {
  STORY_REGIONAL_EVIDENCE,
  getDisplayableStoryRegionalEvidence,
  getStoryRegionalEvidence,
  isStoryRegionalEvidenceDisplayable,
} from './regional-evidence';
export type { StoryRegionalEvidence } from './regional-evidence';
export { buildJourneyPresentation } from './journey-presentation';
export type { JourneyPresentation, JourneyPresentationPlace } from './journey-presentation';
export type { PilotJourney } from './pilot-journey';

export function getFoodCultureById(id: string): FoodCulture | undefined {
  return FOOD_CULTURES.find((fc) => fc.id === id);
}

/** Municipality-level agriculture context (Issue #128). */
export {
  MUNICIPALITY_AGRICULTURE_PROFILES,
  MUNICIPALITY_INDICATOR_KEYS,
  OKUTAMA_MUNICIPALITY_ID,
  getMunicipalityAgricultureById,
  municipalityIndicatorValue,
} from './municipality-agriculture';
export type {
  MunicipalityAgricultureIndicator,
  MunicipalityAgricultureProfile,
  MunicipalityIndicatorKey,
} from './municipality-agriculture';

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
