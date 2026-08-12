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
import { resolveJourneyIdentity, resolveRouteId, resolveStoryJourney } from './journey';
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

  it('keeps a known candidate that has no journey its own culture identity', () => {
    // A candidate may be production-ready without a Route. The missing Route is
    // represented explicitly (absent journeyId) — the culture identity is
    // preserved and the pilot journey is never attached.
    const noJourney = { ...FUTURE_CANDIDATE, id: 'culture-only', journeyId: undefined };
    expect(resolveJourneyIdentity('culture-only', [noJourney])).toEqual({
      candidateId: 'culture-only',
      foodCultureId: 'sake-ome',
    });
    expect(resolveJourneyIdentity('culture-only', [noJourney]).journeyId).toBeUndefined();
  });
});

describe('route resolution from URL context (#123)', () => {
  it('uses an explicit saved-route id from My without substituting it', () => {
    // A saved route reopened from My carries its own route id; even an unknown
    // id resolves to itself so the Route screen shows its honest not-found
    // state rather than the pilot route.
    expect(resolveRouteId('?routeId=ome-sake-journey')).toBe('ome-sake-journey');
    expect(resolveRouteId('?from=my&routeId=stale-route')).toBe('stale-route');
  });

  it('resolves the demo journey for the configured demo candidate', () => {
    expect(resolveRouteId(`?candidateId=${DEMO_RECOMMENDATION_CANDIDATE_ID}`)).toBe(
      PILOT_JOURNEY.routeId,
    );
  });

  it('falls back to the demo journey when no route or candidate identity is carried', () => {
    expect(resolveRouteId('')).toBe(PILOT_JOURNEY.routeId);
    expect(resolveRouteId('?from=discover')).toBe(PILOT_JOURNEY.routeId);
    // A candidate id that is not in the configured list is a legacy/unknown
    // identity → demo default (route-less candidates are covered above).
    expect(resolveRouteId('?candidateId=culture-only')).toBe(PILOT_JOURNEY.routeId);
  });
});

describe('story journey resolution (#123)', () => {
  it('keeps the pilot Discover story resolving its demo journey', () => {
    // /story/wasabi-okutama without candidateId (the Discover link shape).
    expect(resolveStoryJourney('wasabi-okutama', null)).toEqual({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
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
    // No candidate id and no configured candidate for this culture: the story
    // keeps its culture and the Okutama pilot is never attached.
    expect(resolveStoryJourney('sake-ome', null, [])).toEqual({ foodCultureId: 'sake-ome' });
    expect(resolveStoryJourney('sake-ome', null, []).journeyId).toBeUndefined();
  });

  it('derives an unambiguous journey from a single configured culture when candidate-less', () => {
    // One configured candidate for the displayed culture → unambiguous journey.
    expect(resolveStoryJourney('sake-ome', null, [FUTURE_CANDIDATE])).toEqual({
      candidateId: 'future-ome-sake',
      foodCultureId: 'sake-ome',
      journeyId: 'ome-sake-journey',
    });
  });

  it('never combines one culture\'s story with a mismatched candidate\'s journey', () => {
    // URL culture wasabi-okutama, candidate is the Ome sake candidate.
    const identity = resolveStoryJourney('wasabi-okutama', 'future-ome-sake', [FUTURE_CANDIDATE]);
    expect(identity.foodCultureId).toBe('wasabi-okutama');
    expect(identity.journeyId).toBeUndefined();
  });
});
