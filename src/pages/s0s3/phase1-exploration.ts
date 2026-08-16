/**
 * Phase 1 constrained choice sets (Issue #217).
 *
 * The guided conversation deliberately offers only the values the fixed
 * Okutama × Tokyo Wasabi demo journey actually supports, so every allowed
 * answer path deterministically reaches 奥多摩 × 東京わさび with believable
 * match reasons — and no selectable option contradicts the final route or
 * implies a real recommendation engine.
 *
 * The canonical `ExplorationAnswers` value types and the durable
 * recommendation / Slice Manifest / data contracts stay unchanged; this module
 * only narrows what the Phase 1 UI offers and what the Phase 1 Result may
 * select. Ome/Sawai × sake remains in the durable data and manifest but never
 * surfaces in the Phase 1 conversation or Result.
 */
import {
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  recommendableCandidates,
} from '../../data';
import type { Experience, Interest, Taste, TripDuration } from '../../lib/exploration';

/** Taste values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_TASTES: readonly Taste[] = ['refreshing', 'spicy'];
/** Experience values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_EXPERIENCES: readonly Experience[] = ['eat', 'buy', 'meet'];
/** Interest values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_INTERESTS: readonly Interest[] = ['nature', 'tradition', 'craft'];
/** Duration values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_DURATIONS: readonly TripDuration[] = ['half-day', 'full-day'];

/**
 * The Phase 1 recommendation candidate set: only the Okutama × Tokyo Wasabi
 * demo golden path. Still fail-closed through the Slice Manifest so a future
 * `enabled: false` on the wasabi slice is honored; Ome/Sawai × sake and any
 * other slice can never be selected by the Phase 1 Result.
 */
export function phase1RecommendableCandidates() {
  return recommendableCandidates(
    DEMO_RECOMMENDATION_CANDIDATES.filter((c) => c.id === DEMO_RECOMMENDATION_CANDIDATE_ID),
  );
}
