/**
 * Phase 1 constrained choice sets (Issue #217).
 *
 * The guided conversation keeps the canonical values represented by the
 * current Figma options, while the recommendation set is allowed to route a
 * traveler to any ready source-backed journey. The default refreshing /
 * nature answers still reach 奥多摩 × 東京わさび, preserving the 8/23 golden
 * path; distinct answer sets can also reach the source-backed Ome/Sawai,
 * Hachioji, Fussa, and Akiruno journeys.
 *
 * The canonical `ExplorationAnswers` value types and the durable
 * recommendation / Slice Manifest / data contracts stay unchanged; this module
 * only defines the Phase 1 presentation boundary and the recommendation
 * candidate set. The Slice Manifest remains the fail-closed release authority
 * for what the Result may select.
 */
import { DEMO_RECOMMENDATION_CANDIDATES, recommendableCandidates } from '../../data';
import type {
  BaseArea,
  Experience,
  Interest,
  Taste,
  TravelTime,
  TripDuration,
} from '../../lib/exploration';

/** Canonical taste values represented by the current Figma option set. */
export const PHASE1_TASTES: readonly Taste[] = ['refreshing', 'rich', 'spicy', 'sweet'];
/** Canonical experience values represented by the current Figma option set. */
export const PHASE1_EXPERIENCES: readonly Experience[] = ['eat', 'make', 'buy', 'meet'];
/** Canonical interest values represented by the current Figma option set. */
export const PHASE1_INTERESTS: readonly Interest[] = ['tradition', 'nature', 'daily-life', 'craft'];
/** Canonical duration values represented by the current Figma option set. */
export const PHASE1_DURATIONS: readonly TripDuration[] = ['half-day', 'full-day'];

/**
 * Phase 1 allowed departure × travel-time pairs (Issue #220).
 *
 * A small explicit allow-list instead of a travel-time engine. Every pair is
 * believable for reaching the current western-Tokyo journeys, while no
 * source-backed travel matrix is invented for any candidate.
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
 * The Phase 1 recommendation candidate set. It is fail-closed through the
 * Slice Manifest, so disabled or non-eligible slices never surface; the
 * current manifest exposes the Okutama, Ome/Sawai, Hachioji, Fussa, and
 * Akiruno journeys.
 */
export function phase1RecommendableCandidates() {
  return recommendableCandidates(DEMO_RECOMMENDATION_CANDIDATES);
}
