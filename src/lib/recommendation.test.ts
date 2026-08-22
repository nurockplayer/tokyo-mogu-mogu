import { describe, expect, it } from 'vitest';
import { createDefaultExplorationAnswers, type ExplorationAnswers } from './exploration';
import { createDefaultFoodProfile, type FoodProfile } from './food-profile';
import {
  MAX_RECOMMENDATION_CAUTIONS,
  MAX_RECOMMENDATION_REASONS,
  recommendCandidates,
  resolveHistoricalRecommendation,
  TOURISM_DISPERSION_BONUS,
  type RecommendationCandidate,
} from './recommendation';

const profile = createDefaultFoodProfile('2026-08-12T00:00:00.000Z');
const answers = createDefaultExplorationAnswers();

function candidate(
  id: string,
  overrides: Partial<RecommendationCandidate> = {},
): RecommendationCandidate {
  return {
    id,
    regionId: `region-${id}`,
    foodCultureId: `food-${id}`,
    journeyId: `journey-${id}`,
    availability: 'ready',
    tastes: [],
    experiences: [],
    interests: [],
    durations: ['half-day', 'full-day'],
    travelTimeByBaseArea: {},
    tourismDispersion: { status: 'unknown' },
    ...overrides,
  };
}

describe('explainable recommendation contract (#123)', () => {
  it('applies hard exclusions before ranking', () => {
    const trip: ExplorationAnswers = {
      ...answers,
      baseArea: 'tokyo-west',
      travelTime: 'within-30',
      duration: 'half-day',
    };
    const decision = recommendCandidates(profile, trip, [
      candidate('unavailable', { availability: 'unavailable' }),
      candidate('too-far', { travelTimeByBaseArea: { 'tokyo-west': 'over-60' } }),
      candidate('wrong-duration', { durations: ['full-day'] }),
      candidate('eligible'),
    ]);

    expect(decision.selected?.candidate.id).toBe('eligible');
    expect(decision.excluded.map((item) => item.hardExclusions[0]?.code)).toEqual([
      'candidate-unavailable',
      'travel-time-infeasible',
      'duration-infeasible',
    ]);
  });

  it('keeps every current broad Food Profile category caution-only', () => {
    for (const restriction of ['allergy', 'vegetarian-vegan', 'religious', 'dislike'] as const) {
      const restricted: FoodProfile = {
        ...profile,
        hasNoRestrictions: false,
        dietary: [restriction],
      };
      const decision = recommendCandidates(restricted, answers, [candidate('unknown-compatibility')]);

      expect(decision.selected?.candidate.id).toBe('unknown-compatibility');
      expect(decision.excluded).toEqual([]);
      expect(decision.selected?.explanation.cautions[0]?.code).toBe(
        'dietary-confirmation-required',
      );
    }
  });

  it('keeps a tutorial-forced, unassessed Food Profile explicit in the explanation', () => {
    const notEvaluated: FoodProfile = {
      ...profile,
      dietary: [],
      dietaryOther: '',
      hasNoRestrictions: false,
    };

    const decision = recommendCandidates(notEvaluated, answers, [candidate('unassessed')]);

    expect(decision.selected?.explanation.cautions[0]).toEqual({
      code: 'dietary-profile-unassessed',
      values: [],
    });
  });

  it('never lets tourism dispersion rescue an infeasible candidate', () => {
    const trip: ExplorationAnswers = {
      ...answers,
      baseArea: 'tama-center',
      travelTime: 'within-30',
    };
    const decision = recommendCandidates(profile, trip, [
      candidate('dispersed-but-too-far', {
        tourismDispersion: { status: 'under-visited', sourceRef: 'source:visitation' },
        travelTimeByBaseArea: { 'tama-center': 'over-60' },
      }),
      candidate('feasible'),
    ]);

    expect(decision.selected?.candidate.id).toBe('feasible');
    expect(decision.excluded[0]?.candidate.id).toBe('dispersed-but-too-far');
  });

  it('keeps one user-preference match stronger than the dispersion bonus', () => {
    const trip: ExplorationAnswers = { ...answers, interests: ['nature'] };
    const decision = recommendCandidates(profile, trip, [
      candidate('preference-match', { interests: ['nature'] }),
      candidate('dispersion-only', {
        tourismDispersion: { status: 'under-visited', sourceRef: 'source:visitation' },
      }),
    ]);

    expect(TOURISM_DISPERSION_BONUS).toBeLessThan(4);
    expect(decision.selected?.candidate.id).toBe('preference-match');
  });

  it('uses evidence-backed dispersion as a bounded tie-break factor', () => {
    const decision = recommendCandidates(profile, answers, [
      candidate('neutral', {
        tourismDispersion: { status: 'neutral', sourceRef: 'source:visitation' },
      }),
      candidate('under-visited', {
        tourismDispersion: { status: 'under-visited', sourceRef: 'source:visitation' },
      }),
    ]);

    expect(decision.selected?.candidate.id).toBe('under-visited');
    expect(decision.selected?.rankingFactors).toContainEqual({
      code: 'tourism-dispersion',
      points: TOURISM_DISPERSION_BONUS,
      values: ['region-under-visited'],
      evidenceRefs: ['source:visitation'],
    });
  });

  it('does not apply a dispersion bonus when its evidence reference is empty', () => {
    const unsupported = candidate('unsupported', {
      tourismDispersion: { status: 'under-visited', sourceRef: '' },
    });
    const decision = recommendCandidates(profile, answers, [unsupported]);

    expect(decision.selected?.candidate.id).toBe('unsupported');
    expect(decision.selected?.rankingFactors).not.toContainEqual(
      expect.objectContaining({ code: 'tourism-dispersion' }),
    );
    expect(decision.selected?.explanation.cautions).toEqual([]);
  });

  it('returns stable ordering and bounded reasons/cautions', () => {
    const restricted: FoodProfile = {
      ...profile,
      hasNoRestrictions: false,
      dietary: ['religious'],
      dietaryOther: 'custom note',
    };
    const trip: ExplorationAnswers = {
      ...answers,
      tastes: ['refreshing'],
      experiences: ['eat'],
      baseArea: 'okutama',
      travelTime: 'within-60',
      interests: ['nature'],
      duration: 'half-day',
    };
    const candidates = [
      candidate('b', {
        tastes: ['refreshing'],
        experiences: ['eat'],
        interests: ['nature'],
        tourismDispersion: { status: 'under-visited', sourceRef: 'source:visitation' },
      }),
      candidate('a', {
        tastes: ['refreshing'],
        experiences: ['eat'],
        interests: ['nature'],
        tourismDispersion: { status: 'under-visited', sourceRef: 'source:visitation' },
      }),
    ];

    const decision = recommendCandidates(restricted, trip, candidates);
    expect(decision.ranked.map((item) => item.candidate.id)).toEqual(['a', 'b']);
    expect(decision.selected?.explanation.reasons).toHaveLength(MAX_RECOMMENDATION_REASONS);
    expect(decision.selected?.explanation.cautions.length).toBeLessThanOrEqual(
      MAX_RECOMMENDATION_CAUTIONS,
    );
    expect(decision.selected?.explanation.cautions.map((item) => item.code)).toEqual([
      'dietary-confirmation-required',
      'travel-time-unknown',
    ]);
  });

  it('selects a single production-ready demo candidate deterministically without contract-specific ids', () => {
    const only = candidate('configured-demo');
    expect(recommendCandidates(profile, answers, [only]).selected?.candidate).toEqual(only);
    expect(recommendCandidates(profile, answers, []).selected).toBeUndefined();
  });

  it('reopens the recorded candidate identity instead of selecting the new top rank', () => {
    const trip: ExplorationAnswers = { ...answers, interests: ['nature'] };
    const decision = recommendCandidates(profile, trip, [
      candidate('recorded'),
      candidate('new-top-rank', { interests: ['nature'] }),
    ]);

    expect(decision.selected?.candidate.id).toBe('new-top-rank');
    expect(resolveHistoricalRecommendation(decision, 'recorded', 'food-new-top-rank')?.candidate.id)
      .toBe('recorded');
    expect(resolveHistoricalRecommendation(decision, null, 'food-recorded')?.candidate.id).toBe(
      'recorded',
    );
    expect(resolveHistoricalRecommendation(decision, 'removed', null)).toBeUndefined();
  });
});
