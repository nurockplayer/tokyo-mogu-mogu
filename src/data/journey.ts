/**
 * Canonical selected-journey identity for navigation (Issue #123).
 *
 * The recommendation layer selects a Tokyo Region × FoodCulture candidate; the
 * downstream Result → Story → Route → Spot flow must keep resolving from that
 * same candidate instead of collapsing to the demo pilot journey. This module
 * is the single resolution point between the stable candidate identity
 * (candidate id, the same id persisted in MOGU Recent) and the concrete
 * food-culture / model-route ids that the Story and Route screens render.
 *
 * Resolution rules:
 * - A known candidate keeps its own `foodCultureId` even when it has no
 *   `journeyId`: the Story exists for the culture, and the missing Route is
 *   represented explicitly (absent `journeyId`), never substituted with the
 *   pilot journey.
 * - Only missing / unknown / legacy identities (no candidate id at all, or a
 *   candidate id that no longer resolves) fall back to the frozen demo
 *   journey — the 8/23 golden path for Discover's direct links and pre-#123
 *   history.
 *
 * The candidate list is caller-supplied (defaulting to the configured demo
 * list), so a future verified Region × FoodCulture resolves through data/config
 * without changing this shared flow.
 */
import type { RecommendationCandidate } from '../lib/recommendation';
import { DEMO_RECOMMENDATION_CANDIDATES } from './demo-recommendation';
import { PILOT_JOURNEY } from './pilot-journey';

/** The identity a candidate contributes to Result → Story → Route → Spot. */
export interface JourneyIdentity {
  /** Stable recommendation-candidate id when one is known. */
  candidateId?: string;
  /** The food-culture id the Story screen reads. */
  foodCultureId: string;
  /**
   * The model-route id the Route screen renders. Absent when the candidate is
   * known but has no Route yet — the missing Route is explicit, never the
   * pilot journey.
   */
  journeyId?: string;
}

/**
 * Resolve the canonical journey identity from a candidate id.
 *
 * Candidate identity comes from the configured candidate data. A known
 * candidate always keeps its culture identity; only missing / unknown / legacy
 * identities fall back to the frozen demo journey.
 */
export function resolveJourneyIdentity(
  candidateId: string | null | undefined,
  candidates: readonly RecommendationCandidate[] = DEMO_RECOMMENDATION_CANDIDATES,
): JourneyIdentity {
  if (candidateId) {
    const candidate = candidates.find((item) => item.id === candidateId);
    if (candidate?.foodCultureId) {
      return {
        candidateId,
        foodCultureId: candidate.foodCultureId,
        ...(candidate.journeyId ? { journeyId: candidate.journeyId } : {}),
      };
    }
  }
  return {
    foodCultureId: PILOT_JOURNEY.foodCultureId,
    journeyId: PILOT_JOURNEY.routeId,
  };
}

/**
 * Resolve the route id the Route screen should render from its URL context.
 *
 * An explicit `?routeId=` (a saved-route reopen from My) is authoritative and
 * is never substituted: an unknown/stale route id resolves to itself so the
 * Route screen renders its honest not-found state rather than the pilot route.
 * Otherwise the route comes from the candidate journey identity.
 */
export function resolveRouteId(search: string): string | undefined {
  const params = new URLSearchParams(search);
  const explicitRouteId = params.get('routeId');
  if (explicitRouteId) return explicitRouteId;
  return resolveJourneyIdentity(params.get('candidateId')).journeyId;
}

/**
 * Resolve the Story screen's identity from the displayed culture and the
 * selected candidate (Issue #123).
 *
 * Invariant: the displayed Story culture always equals the resolved culture,
 * and a Route is attached only when it belongs to that same culture.
 *
 * - The displayed culture is the URL `foodCultureId`, or — when absent — the
 *   candidate's culture, or the demo journey's culture (legacy `/story` entry).
 * - A candidate whose `foodCultureId` matches the displayed culture contributes
 *   its journey (absent when the candidate is route-less).
 * - A mismatched candidate (different culture) is never combined with the
 *   displayed Story: the culture is kept and the journey is represented as
 *   absent.
 * - Without a candidate id, a journey is resolved only when it can be
 *   unambiguously derived from the displayed culture/config (the demo wasabi
 *   culture, or a single configured candidate for that culture). Otherwise the
 *   journey is absent — the Okutama pilot is never attached merely because a
 *   candidate id is missing.
 */
export function resolveStoryJourney(
  foodCultureId: string | null | undefined,
  candidateId: string | null | undefined,
  candidates: readonly RecommendationCandidate[] = DEMO_RECOMMENDATION_CANDIDATES,
): JourneyIdentity {
  const candidate = candidateId
    ? candidates.find((item) => item.id === candidateId)
    : undefined;

  // The displayed culture is the URL id, else the candidate's culture, else the
  // demo journey's culture (legacy `/story` entry).
  const cultureId = foodCultureId ?? candidate?.foodCultureId ?? PILOT_JOURNEY.foodCultureId;

  if (candidate) {
    if (candidate.foodCultureId === cultureId) {
      return {
        candidateId: candidateId ?? undefined,
        foodCultureId: cultureId,
        ...(candidate.journeyId ? { journeyId: candidate.journeyId } : {}),
      };
    }
    // Mismatched candidate: keep the displayed culture, journey absent.
    return { candidateId: candidateId ?? undefined, foodCultureId: cultureId };
  }

  // No candidate id: derive the journey unambiguously from the culture/config.
  if (cultureId === PILOT_JOURNEY.foodCultureId) {
    return { foodCultureId: cultureId, journeyId: PILOT_JOURNEY.routeId };
  }
  const matching = candidates.filter((item) => item.foodCultureId === cultureId);
  if (matching.length === 1 && matching[0].journeyId) {
    return {
      candidateId: matching[0].id,
      foodCultureId: cultureId,
      journeyId: matching[0].journeyId,
    };
  }
  return { foodCultureId: cultureId };
}
