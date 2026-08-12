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
 * Unknown or absent identities resolve to the frozen demo journey as a safe
 * default: Discover's direct links and legacy pre-#123 history carry no
 * candidate id, and both must keep opening the 奥多摩 × 東京わさび golden path.
 * A candidate id that no longer resolves fails safe to the same default rather
 * than inventing content.
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
  /** The model-route id the Route screen renders. */
  journeyId: string;
}

/**
 * Resolve the canonical journey identity from a candidate id.
 *
 * Candidate identity comes from the configured candidate data. The frozen
 * pilot journey is the fallback for missing / unknown identities, so legacy
 * and direct-entry flows keep the deterministic demo behavior.
 */
export function resolveJourneyIdentity(
  candidateId: string | null | undefined,
  candidates: readonly RecommendationCandidate[] = DEMO_RECOMMENDATION_CANDIDATES,
): JourneyIdentity {
  if (candidateId) {
    const candidate = candidates.find((item) => item.id === candidateId);
    if (candidate?.foodCultureId && candidate.journeyId) {
      return {
        candidateId,
        foodCultureId: candidate.foodCultureId,
        journeyId: candidate.journeyId,
      };
    }
  }
  return {
    foodCultureId: PILOT_JOURNEY.foodCultureId,
    journeyId: PILOT_JOURNEY.routeId,
  };
}
