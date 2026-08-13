/**
 * Selected journey identity resolution (Issue #123 Codex P1).
 *
 * The recommendation layer can select any Tokyo Region × FoodCulture candidate;
 * the downstream Result → Story → Route flow must keep resolving the recorded
 * journey instead of collapsing to the pilot. These tests lock the resolution
 * contract: only an ABSENT candidate id uses the frozen demo default, while an
 * explicit unknown / removed / unavailable candidate resolves to `undefined`
 * (invalid) and never substitutes the pilot.
 */
import { describe, expect, it } from 'vitest';
import type { RecommendationCandidate } from '../lib/recommendation';
import { resolveJourneyIdentity, resolveRouteId, resolveStoryJourney } from './journey';
import { PILOT_JOURNEY } from './pilot-journey';
import { DEMO_RECOMMENDATION_CANDIDATE_ID, DEMO_RECOMMENDATION_CANDIDATES } from './demo-recommendation';

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

const UNAVAILABLE_CANDIDATE: RecommendationCandidate = {
  ...FUTURE_CANDIDATE,
  id: 'unavailable-ome-sake',
  availability: 'unavailable',
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

  it('rejects an explicit unknown or removed candidate instead of falling back to the demo', () => {
    expect(resolveJourneyIdentity('removed-candidate')).toBeUndefined();
    expect(resolveJourneyIdentity('unknown-candidate')).toBeUndefined();
  });

  it('rejects an explicit unavailable candidate (no journey)', () => {
    expect(resolveJourneyIdentity('unavailable-ome-sake', [UNAVAILABLE_CANDIDATE])).toBeUndefined();
  });

  it('keeps a known ready candidate that has no journey its own culture identity', () => {
    const noJourney = { ...FUTURE_CANDIDATE, id: 'culture-only', journeyId: undefined };
    const identity = resolveJourneyIdentity('culture-only', [noJourney]);
    expect(identity).toEqual({ candidateId: 'culture-only', foodCultureId: 'sake-ome' });
    expect(identity?.journeyId).toBeUndefined();
  });
});

describe('route resolution from URL context (#123)', () => {
  it('uses an explicit saved-route id from My without substituting it', () => {
    expect(resolveRouteId('?routeId=ome-sake-journey')).toBe('ome-sake-journey');
    expect(resolveRouteId('?from=my&routeId=stale-route')).toBe('stale-route');
  });

  it('resolves the demo journey for the configured demo candidate', () => {
    expect(resolveRouteId(`?candidateId=${DEMO_RECOMMENDATION_CANDIDATE_ID}`)).toBe(
      PILOT_JOURNEY.routeId,
    );
  });

  it('reaches the not-found state for an explicit invalid candidate (not the pilot)', () => {
    expect(resolveRouteId('?candidateId=unknown-candidate')).toBeUndefined();
    expect(resolveRouteId('?candidateId=removed-candidate')).toBeUndefined();
  });

  it('falls back to the demo journey only when no route or candidate identity is carried', () => {
    expect(resolveRouteId('')).toBe(PILOT_JOURNEY.routeId);
    expect(resolveRouteId('?from=discover')).toBe(PILOT_JOURNEY.routeId);
  });
});

describe('story journey resolution (#123)', () => {
  it('keeps the pilot Discover story resolving its demo journey when the demo candidate is ready', () => {
    expect(resolveStoryJourney('wasabi-okutama', null)).toEqual({
      candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
    });
  });

  it('does not attach the pilot journey when the demo candidate is unavailable', () => {
    // The Story may still render its authored content, but the unavailable demo
    // candidate must not contribute a journey.
    const unavailableDemo = {
      ...DEMO_RECOMMENDATION_CANDIDATES[0],
      availability: 'unavailable' as const,
    };
    expect(resolveStoryJourney('wasabi-okutama', null, [unavailableDemo])).toEqual({
      foodCultureId: 'wasabi-okutama',
    });
  });

  it('attaches the candidate journey only when its culture matches the story', () => {
    expect(resolveStoryJourney('sake-ome', 'future-ome-sake', [FUTURE_CANDIDATE])).toEqual({
      candidateId: 'future-ome-sake',
      foodCultureId: 'sake-ome',
      journeyId: 'ome-sake-journey',
    });
  });

  it('keeps a candidate-less non-demo story culture and represents its journey as absent', () => {
    expect(resolveStoryJourney('sake-ome', null, [])).toEqual({ foodCultureId: 'sake-ome' });
    expect(resolveStoryJourney('sake-ome', null, [])?.journeyId).toBeUndefined();
  });

  it('derives an unambiguous journey from a single configured ready culture when candidate-less', () => {
    expect(resolveStoryJourney('sake-ome', null, [FUTURE_CANDIDATE])).toEqual({
      candidateId: 'future-ome-sake',
      foodCultureId: 'sake-ome',
      journeyId: 'ome-sake-journey',
    });
  });

  it('never combines one culture\'s story with a mismatched candidate\'s journey', () => {
    const identity = resolveStoryJourney('wasabi-okutama', 'future-ome-sake', [FUTURE_CANDIDATE]);
    expect(identity?.foodCultureId).toBe('wasabi-okutama');
    expect(identity?.journeyId).toBeUndefined();
  });

  it('rejects an explicit unknown candidate: a valid URL story renders without a journey, else invalid', () => {
    expect(resolveStoryJourney('wasabi-okutama', 'unknown-candidate')).toEqual({
      foodCultureId: 'wasabi-okutama',
    });
    expect(resolveStoryJourney(undefined, 'unknown-candidate')).toBeUndefined();
  });

  it('rejects an explicit unavailable candidate (no journey)', () => {
    expect(resolveStoryJourney('sake-ome', 'unavailable-ome-sake', [UNAVAILABLE_CANDIDATE])).toEqual({
      foodCultureId: 'sake-ome',
    });
  });

  it('ignores unavailable candidates when deriving a candidate-less journey', () => {
    // One unavailable candidate for the culture must not become the
    // unambiguous default route.
    expect(resolveStoryJourney('sake-ome', null, [UNAVAILABLE_CANDIDATE])).toEqual({
      foodCultureId: 'sake-ome',
    });
  });
});
