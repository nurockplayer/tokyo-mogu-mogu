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
 * - Only an ABSENT candidate identity (no candidate id at all) uses the frozen
 *   demo journey default — the 8/23 golden path for Discover's direct links and
 *   pre-#123 history.
 * - An explicit candidate id must resolve to a production-ready candidate
 *   (`availability === 'ready'`, matching the recommendation contract's
 *   `candidate-unavailable` hard exclusion). Unknown, removed, or unavailable
 *   candidates resolve to `undefined` (invalid) — never the pilot journey.
 * - A known ready candidate keeps its own `foodCultureId`; a missing
 *   `journeyId` is represented explicitly (absent `journeyId`), never
 *   substituted with the pilot journey.
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
 * An explicit candidate id must resolve to a production-ready candidate;
 * unknown / removed / unavailable candidates resolve to `undefined` (invalid)
 * and are never substituted with the pilot journey. Only an absent candidate
 * id falls back to the frozen demo journey for legacy/direct golden-path
 * compatibility.
 */
export function resolveJourneyIdentity(
  candidateId: string | null | undefined,
  candidates: readonly RecommendationCandidate[] = DEMO_RECOMMENDATION_CANDIDATES,
): JourneyIdentity | undefined {
  if (candidateId) {
    const candidate = candidates.find((item) => item.id === candidateId);
    if (!candidate || candidate.availability !== 'ready' || !candidate.foodCultureId) {
      return undefined;
    }
    return {
      candidateId,
      foodCultureId: candidate.foodCultureId,
      ...(candidate.journeyId ? { journeyId: candidate.journeyId } : {}),
    };
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
 * Otherwise the route comes from the candidate journey identity; an explicit
 * invalid candidate resolves to `undefined` (not-found), never the pilot.
 */
export function resolveRouteId(search: string): string | undefined {
  const params = new URLSearchParams(search);
  const explicitRouteId = params.get('routeId');
  if (explicitRouteId) return explicitRouteId;
  return resolveJourneyIdentity(params.get('candidateId'))?.journeyId;
}

/**
 * Resolve the Story screen's identity from the displayed culture and the
 * selected candidate (Issue #123).
 *
 * Invariant: the displayed Story culture always equals the resolved culture,
 * and a Route is attached only when it belongs to that same culture.
 *
 * - The displayed culture is the URL `foodCultureId`, else the candidate's
 *   culture, else the demo journey's culture (legacy `/story` entry).
 * - An explicit invalid candidate (unknown/removed/unavailable) never
 *   contributes a route: the URL's valid Story culture may still render without
 *   a journey, and if neither a valid culture nor a valid candidate resolves,
 *   `undefined` is returned (honest empty state).
 * - A ready candidate whose `foodCultureId` matches the displayed culture
 *   contributes its journey (absent when route-less); a mismatched candidate is
 *   never combined with the displayed Story.
 * - Without a candidate id, a journey is resolved only from READY candidates
 *   (the demo wasabi culture, or a single ready candidate for that culture);
 *   unavailable candidates never become the unambiguous default route.
 */
export function resolveStoryJourney(
  foodCultureId: string | null | undefined,
  candidateId: string | null | undefined,
  candidates: readonly RecommendationCandidate[] = DEMO_RECOMMENDATION_CANDIDATES,
): JourneyIdentity | undefined {
  const candidate = candidateId
    ? candidates.find((item) => item.id === candidateId)
    : undefined;

  // Explicit invalid candidate: never resolves a journey. A valid URL story
  // culture may still render without one; otherwise it is invalid.
  if (candidateId && (!candidate || candidate.availability !== 'ready')) {
    return foodCultureId ? { foodCultureId } : undefined;
  }

  // Displayed culture: URL id, else the ready candidate's culture.
  const cultureId = foodCultureId ?? candidate?.foodCultureId ?? undefined;

  if (candidate) {
    // candidate is ready here; its culture is the displayed culture when the
    // URL does not name one.
    const cid = foodCultureId ?? candidate.foodCultureId;
    if (candidate.foodCultureId === cid) {
      return {
        candidateId: candidateId ?? undefined,
        foodCultureId: cid,
        ...(candidate.journeyId ? { journeyId: candidate.journeyId } : {}),
      };
    }
    // Mismatched ready candidate: keep the displayed culture, journey absent.
    return { candidateId: candidateId ?? undefined, foodCultureId: cid };
  }

  // No candidate id: derive the journey unambiguously from the culture/config.
  if (!cultureId) {
    // `/story` with no id and no candidate → legacy demo journey.
    return { foodCultureId: PILOT_JOURNEY.foodCultureId, journeyId: PILOT_JOURNEY.routeId };
  }
  // One shared readiness-aware derivation path: only a READY candidate matching
  // the displayed culture contributes a journey (the pilot culture included —
  // an unavailable demo candidate never attaches the pilot Route).
  const matching = candidates.filter(
    (item) => item.foodCultureId === cultureId && item.availability === 'ready',
  );
  if (matching.length === 1 && matching[0].journeyId) {
    return {
      candidateId: matching[0].id,
      foodCultureId: cultureId,
      journeyId: matching[0].journeyId,
    };
  }
  return { foodCultureId: cultureId };
}
