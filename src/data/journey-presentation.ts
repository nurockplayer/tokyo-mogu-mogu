import type { RecommendationCandidate } from '../lib/recommendation';
import { recordVerificationStatus, sourceDateLabel } from '../lib/verification';
import type {
  DataOrigin,
  FoodCulture,
  FoodCultureCategory,
  Place,
  VerificationStatus,
} from './model';
import type { ModelRoute, RouteDuration } from './seed-routes';

/** A resolved place name carried by a journey choice view-model. */
export interface JourneyPresentationPlace {
  id: string;
  nameJa: string;
  nameEn: string;
}

/**
 * Presentation-only metadata shared by Discover and Result.
 *
 * This is intentionally derived from the existing candidate, FoodCulture,
 * ModelRoute, and Place records. It does not rank candidates, create a new
 * journey domain, or infer missing operational facts.
 */
export interface JourneyPresentation {
  candidateId: string;
  foodCultureId: string;
  routeId: string;
  cultureNameJa: string;
  cultureNameEn: string;
  cultureDescriptionJa: string;
  cultureDescriptionEn: string;
  image: string;
  category: FoodCultureCategory;
  routeNameJa: string;
  routeNameEn: string;
  areaJa: string;
  areaEn: string;
  duration: RouteDuration;
  totalMinutes: number;
  stopCount: number;
  transportJa: string;
  transportEn: string;
  representativePlaces: readonly JourneyPresentationPlace[];
  origin: DataOrigin;
  sourceStatus: VerificationStatus;
  sourceDate?: ReturnType<typeof sourceDateLabel>;
}

/**
 * Build the shared journey-choice presentation model from existing data.
 *
 * Invalid or unavailable candidate identities are omitted rather than
 * substituted with the demo journey. Missing route stops remain absent from
 * the representative-place list, while the stop count continues to reflect
 * the authored route variant itself.
 */
export function buildJourneyPresentation(
  candidate: RecommendationCandidate,
  culture: FoodCulture,
  route: ModelRoute,
  availablePlaces: readonly Place[],
): JourneyPresentation | undefined {
  if (
    candidate.availability !== 'ready' ||
    candidate.foodCultureId !== culture.id ||
    candidate.journeyId !== route.id
  ) {
    return undefined;
  }

  const duration = route.defaultDuration;
  const variant = route.variants[duration];
  if (!variant) return undefined;

  const placeById = new Map(availablePlaces.map((place) => [place.id, place]));
  const representativePlaces = variant.steps.slice(0, 3).flatMap((step) => {
    const place = placeById.get(step.placeId);
    return place
      ? [{ id: place.id, nameJa: place.nameJa, nameEn: place.nameEn }]
      : [];
  });

  const routeSources = [route.source, ...(route.sources ?? [])];
  const sourceStatus = recordVerificationStatus(routeSources, culture.origin);
  const sourceDate = routeSources
    .map((source) => sourceDateLabel(source, culture.origin))
    .find((date): date is NonNullable<typeof date> => date !== undefined);

  return {
    candidateId: candidate.id,
    foodCultureId: culture.id,
    routeId: route.id,
    cultureNameJa: culture.nameJa,
    cultureNameEn: culture.nameEn,
    cultureDescriptionJa: culture.descriptionJa,
    cultureDescriptionEn: culture.descriptionEn,
    image: culture.image,
    category: culture.category,
    routeNameJa: route.nameJa,
    routeNameEn: route.nameEn,
    areaJa: route.areaJa,
    areaEn: route.areaEn,
    duration,
    totalMinutes: variant.totalMinutes,
    stopCount: variant.steps.length,
    transportJa: variant.transportJa,
    transportEn: variant.transportEn,
    representativePlaces,
    origin: culture.origin,
    sourceStatus,
    ...(sourceDate ? { sourceDate } : {}),
  };
}
