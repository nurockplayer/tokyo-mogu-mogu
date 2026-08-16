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
import type {
  BaseArea,
  Experience,
  ExplorationAnswers,
  Interest,
  Taste,
  TravelTime,
  TripDuration,
} from '../../lib/exploration';

/** Taste values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_TASTES: readonly Taste[] = ['refreshing', 'spicy'];
/** Experience values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_EXPERIENCES: readonly Experience[] = ['eat', 'buy', 'meet'];
/** Interest values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_INTERESTS: readonly Interest[] = ['nature', 'tradition', 'craft'];
/** Duration values the wasabi journey offers (canonical values, narrowed). */
export const PHASE1_DURATIONS: readonly TripDuration[] = ['half-day', 'full-day'];

/**
 * Phase 1 allowed departure × travel-time pairs (Issue #220).
 *
 * A small explicit allow-list instead of a travel-time engine. Every pair is
 * believable for reaching 奥多摩 from the departure area, so no selectable
 * combination obviously contradicts the fixed Okutama × Tokyo Wasabi result.
 * A central-Tokyo/Shinjuku departure (`tokyo-west`) is only paired with
 * `over-60`; a Tama-area departure with `within-60` / `over-60`; an Okutama
 * departure with `within-30` / `within-60`. The obviously implausible pairs
 * (`tokyo-west × within-30 / within-60`, `tama-center × within-30`, and
 * `okutama × over-60`) are intentionally absent. Values stay canonical; no
 * realtime routing or source-backed travel claims are introduced.
 */
export const PHASE1_AREA_TRAVEL_PAIRS: readonly { baseArea: BaseArea; travelTime: TravelTime }[] = [
  { baseArea: 'okutama', travelTime: 'within-30' },
  { baseArea: 'okutama', travelTime: 'within-60' },
  { baseArea: 'tama-center', travelTime: 'within-60' },
  { baseArea: 'tama-center', travelTime: 'over-60' },
  { baseArea: 'tokyo-west', travelTime: 'over-60' },
];

/** Base-area values Phase 1 offers (the areas present in the allow-list). */
export const PHASE1_BASE_AREAS: readonly BaseArea[] = [
  ...new Set(PHASE1_AREA_TRAVEL_PAIRS.map((pair) => pair.baseArea)),
];

/** The travel-time values Phase 1 offers for a given departure area. */
export function phase1TravelTimesFor(baseArea: BaseArea): readonly TravelTime[] {
  return PHASE1_AREA_TRAVEL_PAIRS.filter((pair) => pair.baseArea === baseArea).map(
    (pair) => pair.travelTime,
  );
}

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

/**
 * Fixed canonical answers handed to the Phase 1 Result (Issue #224).
 *
 * The visible Figma Exploration selections are presentation-only fixture state
 * (see `phase1-figma-session.ts`); the demo outcome stays the deterministic
 * Okutama × Tokyo Wasabi golden path, so the canonical answers the Result
 * consumes are this fixed, wasabi-matching payload regardless of the user's
 * visible choices. Values stay canonical; no real scoring or multi-candidate
 * ranking is introduced (#201 / #206 deferred).
 */
export const PHASE1_DEMO_ANSWERS: ExplorationAnswers = {
  tastes: ['refreshing'],
  experiences: ['eat'],
  interests: ['nature'],
  duration: 'half-day',
  baseArea: 'tokyo-west',
  travelTime: 'over-60',
};
