/**
 * Selected journey identity resolution (Issue #123 Codex P1).
 *
 * The recommendation layer can select any Tokyo Region × FoodCulture candidate;
 * the downstream Result → Story → Route flow must keep resolving the recorded
 * journey instead of collapsing to the pilot. These tests lock the resolution
 * contract: configured candidates resolve from data, and unknown / legacy /
 * direct-entry identities fail safe to the frozen demo journey.
 */
import { describe, expect, it } from 'vitest';
import type { RecommendationCandidate } from '../lib/recommendation';
import { resolveJourneyIdentity } from './journey';
import { PILOT_JOURNEY } from './pilot-journey';
import { DEMO_RECOMMENDATION_CANDIDATE_ID } from './demo-recommendation';

/** A minimal data/config-only candidate for a second Region × FoodCulture. */
const FUTURE_CANDIDATE: RecommendationCandidate = {
  id: 'future-ome-sake',
  regionId: 'ome',
  foodCultureId: 'sake-ome',
  journeyId: 'ome-sake-journey',
  availability: 'ready',
  tastes: [],
  experiences: [],
  interests: [],
  durations: ['half-day', 'full-day'],
  travelTimeByBaseArea: {},
  tourismDispersion: { status: 'unknown' },
};

describe('selected journey identity (#123)', () => {
  it('resolves the configured demo candidate to its canonical food culture and journey', () => {
    expect(resolveJourneyIdentity(DEMO_RECOMMENDATION_CANDIDATE_ID)).toEqual({
      candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
    });
  });

  it('resolves a second Region × FoodCulture purely from candidate data/config', () => {
    // A future verified candidate passes through the shared resolver without
    // any shared-flow change; the ids come from the candidate record alone.
    const identity = resolveJourneyIdentity('future-ome-sake', [FUTURE_CANDIDATE]);
    expect(identity).toEqual({
      candidateId: 'future-ome-sake',
      foodCultureId: 'sake-ome',
      journeyId: 'ome-sake-journey',
    });
  });

  it('falls back to the frozen demo journey when no candidate identity is carried', () => {
    expect(resolveJourneyIdentity(null)).toEqual({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
    });
    expect(resolveJourneyIdentity(undefined)).toEqual({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
    });
  });

  it('fails safe to the demo journey for an unknown or removed candidate', () => {
    expect(resolveJourneyIdentity('removed-candidate')).toEqual({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
    });
  });

  it('fails safe to the demo journey when a candidate has no journey yet', () => {
    // A candidate may be production-ready without a Route; no journey is
    // invented and the demo journey stays the safe navigation default.
    const noJourney = { ...FUTURE_CANDIDATE, id: 'culture-only', journeyId: undefined };
    expect(resolveJourneyIdentity('culture-only', [noJourney])).toEqual({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
    });
  });
});
