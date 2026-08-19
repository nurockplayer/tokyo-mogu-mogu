/**
 * Phase 1 determinism contract (Issue #217).
 *
 * The guided conversation preserves the canonical Figma values and the Phase
 * 1 Result selects among the enabled source-backed candidates. The default
 * refreshing / nature answers remain deterministic for 奥多摩 × 東京わさび,
 * while distinct rich/tradition and rich/daily-life answers route to Ome/Sawai
 * and Hachioji.
 */
import { describe, expect, it } from 'vitest';
import {
  DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
  DEMO_FUSSA_SAKE_CANDIDATE_ID,
  DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
} from '../../data';
import {
  createDefaultExplorationAnswers,
  type ExplorationAnswers,
} from '../../lib/exploration';
import { createDefaultFoodProfile } from '../../lib/food-profile';
import { recommendCandidates } from '../../lib/recommendation';
import {
  PHASE1_AREA_TRAVEL_PAIRS,
  PHASE1_BASE_AREAS,
  PHASE1_DURATIONS,
  PHASE1_EXPERIENCES,
  PHASE1_INTERESTS,
  PHASE1_TASTES,
  phase1RecommendableCandidates,
  phase1TravelTimesFor,
} from './phase1-exploration';

describe('Phase 1 multi-region choice sets (#238)', () => {
  it('keeps every ready candidate value inside the canonical option sets', () => {
    for (const candidate of DEMO_RECOMMENDATION_CANDIDATES) {
      for (const value of candidate.tastes) expect(PHASE1_TASTES).toContain(value);
      for (const value of candidate.experiences) expect(PHASE1_EXPERIENCES).toContain(value);
      for (const value of candidate.interests) expect(PHASE1_INTERESTS).toContain(value);
      for (const value of candidate.durations) expect(PHASE1_DURATIONS).toContain(value);
    }
  });

  it('preserves the full canonical Figma option vocabulary', () => {
    expect(PHASE1_TASTES).toEqual(expect.arrayContaining(['refreshing', 'rich', 'spicy', 'sweet']));
    expect(PHASE1_EXPERIENCES).toEqual(expect.arrayContaining(['eat', 'make', 'buy', 'meet']));
    expect(PHASE1_INTERESTS).toEqual(expect.arrayContaining(['nature', 'tradition', 'daily-life', 'craft']));
  });

  it('phase1RecommendableCandidates returns every enabled ready journey', () => {
    const candidates = phase1RecommendableCandidates();
    expect(candidates.map((c) => c.id)).toEqual([
      DEMO_RECOMMENDATION_CANDIDATE_ID,
      DEMO_OME_SAKE_CANDIDATE_ID,
      DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
      DEMO_FUSSA_SAKE_CANDIDATE_ID,
      DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
    ]);
  });
});

describe('Phase 1 departure × travel-time allow-list (Issue #220)', () => {
  it('offers the canonical base areas in the Phase 1 conversation', () => {
    expect(PHASE1_BASE_AREAS).toEqual(['okutama', 'tama-center', 'tokyo-west']);
  });

  it('pairs every offered departure with believable travel times for Okutama', () => {
    expect(PHASE1_AREA_TRAVEL_PAIRS).toEqual([
      { baseArea: 'okutama', travelTime: 'within-30' },
      { baseArea: 'okutama', travelTime: 'within-60' },
      { baseArea: 'tama-center', travelTime: 'within-60' },
      { baseArea: 'tama-center', travelTime: 'over-60' },
      { baseArea: 'tokyo-west', travelTime: 'over-60' },
    ]);
  });

  it('never pairs a central-Tokyo/Shinjuku departure with a short travel tolerance', () => {
    const tokyoWestTimes = PHASE1_AREA_TRAVEL_PAIRS.filter(
      (pair) => pair.baseArea === 'tokyo-west',
    ).map((pair) => pair.travelTime);
    expect(tokyoWestTimes).toEqual(['over-60']);
  });

  it('offers only within-30/within-60 from Okutama and within-60/over-60 from Tama', () => {
    expect(phase1TravelTimesFor('okutama')).toEqual(['within-30', 'within-60']);
    expect(phase1TravelTimesFor('tama-center')).toEqual(['within-60', 'over-60']);
    expect(phase1TravelTimesFor('tokyo-west')).toEqual(['over-60']);
  });

  it('exposes no pair that obviously contradicts reaching Okutama', () => {
    const contradictory = PHASE1_AREA_TRAVEL_PAIRS.filter(
      (pair) =>
        (pair.baseArea === 'tokyo-west' && pair.travelTime !== 'over-60') ||
        (pair.baseArea === 'tama-center' && pair.travelTime === 'within-30') ||
        (pair.baseArea === 'okutama' && pair.travelTime === 'over-60'),
    );
    expect(contradictory).toEqual([]);
  });
});

describe('Phase 1 deterministic multi-region outcomes (#238)', () => {
  const profile = createDefaultFoodProfile();

  function answersFor(patch: Partial<ExplorationAnswers>): ExplorationAnswers {
    return { ...createDefaultExplorationAnswers(), ...patch };
  }

  const combos: Array<{ answers: ExplorationAnswers; candidateId: string }> = [
    {
      answers: answersFor({ tastes: ['refreshing'], experiences: ['eat'], interests: ['nature'], duration: 'half-day' }),
      candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    },
    {
      answers: answersFor({ tastes: ['rich'], experiences: ['buy'], interests: ['tradition'], duration: 'full-day' }),
      candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    },
    {
      answers: answersFor({ tastes: ['rich'], experiences: ['buy'], interests: ['daily-life'], duration: 'half-day' }),
      candidateId: DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
    },
    {
      answers: answersFor({ tastes: ['refreshing', 'spicy'], experiences: ['eat', 'buy', 'meet'], interests: ['nature', 'tradition', 'craft'], duration: 'half-day' }),
      candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    },
    {
      answers: answersFor({ tastes: ['refreshing'], experiences: ['meet'], interests: ['craft'], duration: 'full-day' }),
      candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    },
    // Different departure / travel-time choices never change the golden-path outcome.
    {
      answers: answersFor({ tastes: ['refreshing'], experiences: ['buy'], interests: ['tradition'], duration: 'full-day', baseArea: 'tokyo-west', travelTime: 'over-60' }),
      candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    },
  ];

  for (const [{ answers, candidateId }, index] of combos.map((combo, index) => [combo, index] as const)) {
    it(`combo ${index + 1} selects its intended source-backed journey`, () => {
      const decision = recommendCandidates(profile, answers, phase1RecommendableCandidates());
      expect(decision.selected?.candidate.id).toBe(candidateId);
      expect(decision.excluded.length).toBe(0);
    });
  }

  it('every allowed Phase 1 departure × travel-time pair preserves the golden path', () => {
    for (const pair of PHASE1_AREA_TRAVEL_PAIRS) {
      const answers = answersFor({
        tastes: ['refreshing'],
        experiences: ['eat'],
        interests: ['nature'],
        duration: 'half-day',
        baseArea: pair.baseArea,
        travelTime: pair.travelTime,
      });
      const decision = recommendCandidates(profile, answers, phase1RecommendableCandidates());
      expect(decision.selected?.candidate.id).toBe(DEMO_RECOMMENDATION_CANDIDATE_ID);
      expect(decision.excluded.length).toBe(0);
    }
  });
});
