/**
 * Phase 1 determinism contract (Issue #217).
 *
 * The guided conversation only offers values the fixed Okutama × Tokyo Wasabi
 * demo journey supports, and the Phase 1 Result only selects the wasabi
 * candidate — so every allowed answer combination deterministically reaches
 * 奥多摩 × 東京わさび, no option contradicts the final route, and Ome/Sawai /
 * future slices can never surface in the Phase 1 Result.
 */
import { describe, expect, it } from 'vitest';
import {
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

/** The wasabi candidate's offered values (the determinism target). */
const wasabi = DEMO_RECOMMENDATION_CANDIDATES.find(
  (c) => c.id === DEMO_RECOMMENDATION_CANDIDATE_ID,
);

describe('Phase 1 constrained choice sets (Issue #217)', () => {
  it('every offered option is one the wasabi journey actually supports', () => {
    expect(wasabi).toBeDefined();
    for (const taste of PHASE1_TASTES) {
      expect(wasabi!.tastes).toContain(taste);
    }
    for (const experience of PHASE1_EXPERIENCES) {
      expect(wasabi!.experiences).toContain(experience);
    }
    for (const interest of PHASE1_INTERESTS) {
      expect(wasabi!.interests).toContain(interest);
    }
    for (const duration of PHASE1_DURATIONS) {
      expect(wasabi!.durations).toContain(duration);
    }
  });

  it('does not offer values that could select Ome/Sawai or contradict wasabi', () => {
    // Taste is the only discriminating axis between the two demo candidates;
    // rich/sweet uniquely match the sake profile and must not be selectable.
    expect(PHASE1_TASTES).not.toContain('rich');
    expect(PHASE1_TASTES).not.toContain('sweet');
    // Experiences / interests are narrowed to wasabi's offered set.
    expect(PHASE1_EXPERIENCES).not.toContain('make');
    expect(PHASE1_INTERESTS).not.toContain('daily-life');
  });

  it('phase1RecommendableCandidates returns only the wasabi candidate', () => {
    const candidates = phase1RecommendableCandidates();
    expect(candidates.map((c) => c.id)).toEqual([DEMO_RECOMMENDATION_CANDIDATE_ID]);
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

describe('Phase 1 deterministic wasabi outcome (Issue #217)', () => {
  const profile = createDefaultFoodProfile();

  function answersFor(patch: Partial<ExplorationAnswers>): ExplorationAnswers {
    return { ...createDefaultExplorationAnswers(), ...patch };
  }

  const combos: ExplorationAnswers[] = [
    answersFor({ tastes: ['refreshing'], experiences: ['eat'], interests: ['nature'], duration: 'half-day' }),
    answersFor({ tastes: ['spicy'], experiences: ['buy', 'meet'], interests: ['tradition', 'craft'], duration: 'full-day' }),
    answersFor({ tastes: ['refreshing', 'spicy'], experiences: ['eat', 'buy', 'meet'], interests: ['nature', 'tradition', 'craft'], duration: 'half-day' }),
    answersFor({ tastes: ['refreshing'], experiences: ['meet'], interests: ['craft'], duration: 'full-day' }),
    answersFor({ tastes: ['spicy'], experiences: ['eat'], interests: ['nature', 'craft'], duration: 'half-day' }),
    // Different departure / travel-time choices never change the outcome.
    answersFor({ tastes: ['refreshing'], experiences: ['buy'], interests: ['tradition'], duration: 'full-day', baseArea: 'tokyo-west', travelTime: 'over-60' }),
  ];

  for (const [index, answers] of combos.entries()) {
    it(`combo ${index + 1} always selects Okutama × Tokyo Wasabi`, () => {
      const decision = recommendCandidates(profile, answers, phase1RecommendableCandidates());
      expect(decision.selected?.candidate.id).toBe(DEMO_RECOMMENDATION_CANDIDATE_ID);
      expect(decision.excluded.length).toBe(0);
    });
  }

  it('every allowed Phase 1 departure × travel-time pair still selects wasabi', () => {
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
