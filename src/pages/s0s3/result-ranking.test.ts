import { describe, expect, it } from 'vitest';
import type { CandidateEvaluation, RecommendationDecision } from '../../lib/recommendation';
import { buildResultRanking } from './result-ranking';

function evaluation(id: string): CandidateEvaluation {
  return {
    candidate: {
      id,
      regionId: `region-${id}`,
      foodCultureId: `culture-${id}`,
      journeyId: `journey-${id}`,
      availability: 'ready',
      tastes: [],
      experiences: [],
      interests: [],
      durations: ['half-day'],
      travelTimeByBaseArea: {},
      tourismDispersion: { status: 'unknown' },
    },
    eligible: true,
    hardExclusions: [],
    rankingFactors: [],
    score: 0,
    explanation: { reasons: [], cautions: [] },
  };
}

function decision(ids: string[]): RecommendationDecision {
  const ranked = ids.map(evaluation);
  return { selected: ranked[0], ranked, excluded: [] };
}

describe('Result Top 3 ranking (#255)', () => {
  it('returns the selected journey followed by the next two ranked candidates', () => {
    const recommendation = decision(['wasabi', 'produce', 'sake', 'ginger']);

    expect(buildResultRanking(recommendation).map((item) => item.candidate.id)).toEqual([
      'wasabi',
      'produce',
      'sake',
    ]);
  });

  it('keeps a historical MOGU candidate first without reranking the decision', () => {
    const recommendation = decision(['wasabi', 'produce', 'sake', 'ginger']);
    const historical = recommendation.ranked[3];

    expect(
      buildResultRanking(recommendation, historical).map((item) => item.candidate.id),
    ).toEqual(['ginger', 'wasabi', 'produce']);
  });

  it('deduplicates the preferred candidate and never pads a short ranking', () => {
    const recommendation = decision(['wasabi', 'produce']);

    expect(
      buildResultRanking(recommendation, recommendation.ranked[0]).map(
        (item) => item.candidate.id,
      ),
    ).toEqual(['wasabi', 'produce']);
  });
});
