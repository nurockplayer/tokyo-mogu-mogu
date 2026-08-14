/**
 * 8/23 demo recommendation candidates (Issue #123 / #127 / #163).
 *
 * This is demo data/config, not the durable recommendation domain. The shared
 * engine accepts any Tokyo Region × FoodCulture candidates with the same
 * shape. Two production-ready candidates ship for the 8/23 demo:
 * - Okutama × Tokyo Wasabi — the deterministic Hackathon Demo Golden Path
 *   (Issue #127). Its answer profile keeps it selected for the fixed golden
 *   path answers, so the e2e result stays deterministic.
 * - Ome/Sawai × Sake — the source-backed second slice (Issue #163, added
 *   mainly through data/config; no shared-contract redesign). Its profile is
 *   chosen so the golden-path answers still select wasabi, while users who
 *   answer for a rich/sweet tradition-focused trip can reach the sake journey.
 */
import {
  MAX_RECOMMENDATION_REASONS,
  type RankingFactor,
  type RecommendationCandidate,
} from '../lib/recommendation';
import type { MatchTagKey } from '../lib/exploration';
import { PILOT_JOURNEY } from './pilot-journey';

export const DEMO_RECOMMENDATION_CANDIDATE_ID = 'demo-okutama-wasabi';

/** Issue #163: the source-backed Ome/Sawai × sake playable slice. */
export const DEMO_OME_SAKE_CANDIDATE_ID = 'demo-ome-sake';

export const DEMO_RECOMMENDATION_CANDIDATES: readonly RecommendationCandidate[] = [
  {
    id: DEMO_RECOMMENDATION_CANDIDATE_ID,
    regionId: 'okutama',
    foodCultureId: PILOT_JOURNEY.foodCultureId,
    journeyId: PILOT_JOURNEY.routeId,
    availability: 'ready',
    tastes: ['refreshing', 'spicy'],
    experiences: ['eat', 'buy', 'meet'],
    interests: ['nature', 'tradition', 'craft'],
    durations: ['half-day', 'full-day'],
    // No source-backed base-area travel-time matrix is currently available.
    // Unknown remains visible as a caution rather than being invented.
    travelTimeByBaseArea: {},
    // Existing Tokyo evidence does not quantify Okutama-specific visitation
    // sufficiently to award the durable dispersion bonus.
    tourismDispersion: { status: 'unknown' },
  },
  {
    id: DEMO_OME_SAKE_CANDIDATE_ID,
    regionId: 'ome',
    foodCultureId: 'sake-ome',
    journeyId: 'ome-sawai-sake-journey',
    availability: 'ready',
    // Deliberately distinct from the wasabi profile: the golden-path answers
    // (refreshing / nature) never match here, so the demo Result stays
    // deterministically wasabi; a rich/sweet, tradition-focused trip reaches
    // the sake journey through the same reusable engine.
    tastes: ['rich', 'sweet'],
    experiences: ['eat', 'buy', 'meet'],
    interests: ['tradition', 'craft'],
    durations: ['half-day', 'full-day'],
    // Same honesty default as the pilot candidate: no source-backed matrix,
    // so unknown travel time is surfaced as a caution, never invented.
    travelTimeByBaseArea: {},
    // No quantified Ome-specific visitation evidence is available to award the
    // durable dispersion bonus; it stays unknown rather than fabricated.
    tourismDispersion: { status: 'unknown' },
  },
];

/**
 * Map the selected candidate's bounded explanation to the current approved S3
 * tag vocabulary. Unsupported answers never become visible match claims, and a
 * candidate never inherits another candidate's tag mapping (wasabi's
 * `grate-fresh`/`stream-fresh` are never applied to the sake candidate).
 */
export function demoRecommendationMatchTags(
  candidateId: string,
  reasons: readonly RankingFactor[],
): MatchTagKey[] {
  if (candidateId === DEMO_RECOMMENDATION_CANDIDATE_ID) {
    return matchWasabiTags(reasons);
  }
  if (candidateId === DEMO_OME_SAKE_CANDIDATE_ID) {
    return matchSakeTags(reasons);
  }
  return [];
}

/** Wasabi journey tag derivation (unchanged from #123). */
function matchWasabiTags(reasons: readonly RankingFactor[]): MatchTagKey[] {
  const tags: MatchTagKey[] = [];
  const add = (tag: MatchTagKey) => {
    if (!tags.includes(tag)) tags.push(tag);
  };

  for (const reason of reasons) {
    if (reason.code === 'taste-match' && reason.values.includes('refreshing')) {
      add('stream-fresh');
    }
    if (reason.code === 'taste-match' && reason.values.includes('spicy')) {
      add('grate-fresh');
    }
    if (reason.code === 'experience-match') {
      if (reason.values.includes('eat')) add('grate-fresh');
      if (reason.values.includes('meet')) add('meet-maker');
      if (reason.values.includes('buy')) add('buy-gift');
      if (reason.values.includes('make')) add('make-craft');
    }
    if (reason.code === 'interest-match') {
      if (reason.values.includes('nature')) add('nature-valley');
      if (reason.values.includes('tradition')) add('tradition-edo');
      if (reason.values.includes('daily-life')) add('daily-life');
      if (reason.values.includes('craft')) add('make-craft');
    }
    if (reason.code === 'duration-match') {
      if (reason.values.includes('half-day')) add('half-day');
      if (reason.values.includes('full-day')) add('full-day');
    }
  }

  return tags.slice(0, MAX_RECOMMENDATION_REASONS);
}

/**
 * Ome/Sawai sake journey tag derivation (Issue #163). Only matches that the
 * sake journey actually offers become tags: meeting the brewers, buying sake
 * as a gift, brewing craft, tradition, and duration. There is no generic
 * "eat/taste" tag in the approved vocabulary, so a food/drink match honestly
 * renders no tag rather than borrowing wasabi's `grate-fresh`.
 */
function matchSakeTags(reasons: readonly RankingFactor[]): MatchTagKey[] {
  const tags: MatchTagKey[] = [];
  const add = (tag: MatchTagKey) => {
    if (!tags.includes(tag)) tags.push(tag);
  };

  for (const reason of reasons) {
    if (reason.code === 'experience-match') {
      if (reason.values.includes('meet')) add('meet-maker');
      if (reason.values.includes('buy')) add('buy-gift');
      if (reason.values.includes('make')) add('make-craft');
    }
    if (reason.code === 'interest-match') {
      if (reason.values.includes('tradition')) add('tradition-edo');
      if (reason.values.includes('craft')) add('make-craft');
    }
    if (reason.code === 'duration-match') {
      if (reason.values.includes('half-day')) add('half-day');
      if (reason.values.includes('full-day')) add('full-day');
    }
  }

  return tags.slice(0, MAX_RECOMMENDATION_REASONS);
}
