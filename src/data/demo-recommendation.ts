/**
 * 8/23 demo recommendation candidate (Issue #123 / #127).
 *
 * This is demo data/config, not the durable recommendation domain. The shared
 * engine accepts any Tokyo Region × FoodCulture candidates with the same
 * shape. Okutama × Tokyo Wasabi is the sole production-ready candidate for the
 * Hackathon Demo Golden Path, so selection is intentionally deterministic.
 */
import {
  MAX_RECOMMENDATION_REASONS,
  type RankingFactor,
  type RecommendationCandidate,
} from '../lib/recommendation';
import type { MatchTagKey } from '../lib/exploration';
import { PILOT_JOURNEY } from './pilot-journey';

export const DEMO_RECOMMENDATION_CANDIDATE_ID = 'demo-okutama-wasabi';

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
];

/**
 * Map the selected candidate's bounded explanation to the current approved S3
 * tag vocabulary. Unsupported answers never become visible match claims.
 */
export function demoRecommendationMatchTags(
  candidateId: string,
  reasons: readonly RankingFactor[],
): MatchTagKey[] {
  if (candidateId !== DEMO_RECOMMENDATION_CANDIDATE_ID) return [];

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
