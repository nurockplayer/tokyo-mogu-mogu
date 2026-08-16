/**
 * Phase 1 latest-Figma parity regression tests (Issue #224).
 *
 * Locks the presentation-only boundaries:
 *   - the fixed canonical demo answers always resolve to Okutama × Tokyo Wasabi
 *     (determinism preserved, no real scoring introduced);
 *   - the dietary interview is presentation-only data (structure + label
 *     resolution), never a safety claim;
 *   - the Figma exploration presentation session round-trips as fixture state.
 */
import { describe, expect, it, afterAll, beforeEach } from 'vitest';
import {
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
} from '../../data';
import { createDefaultFoodProfile } from '../../lib/food-profile';
import { recommendCandidates } from '../../lib/recommendation';
import { PHASE1_DEMO_ANSWERS, phase1RecommendableCandidates } from './phase1-exploration';
import {
  createEmptyFigmaExplorationAnswers,
  loadFigmaExplorationAnswers,
  saveFigmaExplorationAnswers,
  clearFigmaExplorationAnswers,
} from './phase1-figma-session';
import {
  PHASE1_INTERVIEW,
  createEmptyInterviewAnswers,
  interviewSelectionLabels,
  toggleInterviewAnswer,
  createPhase1NeutralProfile,
} from './FoodProfilePage';
import { isFoodProfile } from '../../lib/food-profile';
import { type LocaleKey } from '../../i18n/resources';

const wasabi = DEMO_RECOMMENDATION_CANDIDATES.find(
  (c) => c.id === DEMO_RECOMMENDATION_CANDIDATE_ID,
);

/** Minimal in-memory sessionStorage shim (vitest env is node). */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
}

const originalSessionStorage = globalThis.sessionStorage;

beforeEach(() => {
  globalThis.sessionStorage = new MemoryStorage() as unknown as Storage;
});

afterAll(() => {
  globalThis.sessionStorage = originalSessionStorage;
});

/** Minimal t(): returns the key so label resolution is deterministic. */
const keyAsLabel = (key: LocaleKey): string => key;

describe('PHASE1_DEMO_ANSWERS determinism (Issue #224)', () => {
  it('the fixed canonical payload selects Okutama × Tokyo Wasabi', () => {
    const decision = recommendCandidates(
      createDefaultFoodProfile(),
      PHASE1_DEMO_ANSWERS,
      phase1RecommendableCandidates(),
    );
    expect(decision.selected?.candidate.id).toBe(DEMO_RECOMMENDATION_CANDIDATE_ID);
    expect(decision.excluded.length).toBe(0);
  });

  it('matches the wasabi candidate offered values (no contradictory selection)', () => {
    expect(wasabi).toBeDefined();
    for (const taste of PHASE1_DEMO_ANSWERS.tastes) expect(wasabi!.tastes).toContain(taste);
    for (const exp of PHASE1_DEMO_ANSWERS.experiences) expect(wasabi!.experiences).toContain(exp);
    for (const interest of PHASE1_DEMO_ANSWERS.interests) expect(wasabi!.interests).toContain(interest);
    expect(wasabi!.durations).toContain(PHASE1_DEMO_ANSWERS.duration);
  });
});

describe('PHASE1_INTERVIEW presentation-only dietary interview (Issue #224)', () => {
  it('has four questions with emoji quick-reply options', () => {
    expect(PHASE1_INTERVIEW.length).toBe(4);
    for (const q of PHASE1_INTERVIEW) {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('offers a "none" escape option in every question', () => {
    for (const q of PHASE1_INTERVIEW) {
      expect(q.options.some((o) => o.value === 'none')).toBe(true);
    }
  });

  it('resolves selected labels without inventing text', () => {
    const answers = createEmptyInterviewAnswers();
    answers[0] = ['egg', 'nuts'];
    answers[3] = ['raw'];
    const q0 = interviewSelectionLabels(answers, 0, keyAsLabel);
    const q4 = interviewSelectionLabels(answers, 3, keyAsLabel);
    expect(q0).toEqual(['fpIvEgg', 'fpIvNuts']);
    expect(q4).toEqual(['fpIvRaw']);
  });

  it('never feeds the durable recommendation path', () => {
    // The interview is presentation-only: it carries no candidate-selection
    // semantics, so its structure exposes nothing the recommendation contract
    // could consume.
    for (const q of PHASE1_INTERVIEW) {
      expect(q.titleKey.startsWith('fpIv')).toBe(true);
    }
  });
});

describe('Figma exploration presentation session (Issue #224)', () => {
  it('round-trips a presentation-only answers payload', () => {
    clearFigmaExplorationAnswers();
    expect(loadFigmaExplorationAnswers()).toBeNull();
    saveFigmaExplorationAnswers({
      experiences: ['eat', 'make'],
      departure: 'tokyo',
      departureSearch: '東京駅',
      travelTime: 'within-90',
      duration: 'undecided',
      tastes: ['spicy'],
      themes: ['nature'],
    });
    const loaded = loadFigmaExplorationAnswers();
    expect(loaded).toEqual({
      experiences: ['eat', 'make'],
      departure: 'tokyo',
      departureSearch: '東京駅',
      travelTime: 'within-90',
      duration: 'undecided',
      tastes: ['spicy'],
      themes: ['nature'],
    });
    clearFigmaExplorationAnswers();
  });

  it('starts empty', () => {
    expect(createEmptyFigmaExplorationAnswers()).toEqual({
      experiences: [],
      departure: null,
      departureSearch: '',
      travelTime: null,
      duration: null,
      tastes: [],
      themes: [],
    });
  });
});

describe('interview "none" mutual exclusivity (P1 / Issue #224)', () => {
  it('selecting "none" clears every substantive option', () => {
    expect(toggleInterviewAnswer(['egg', 'nuts'], 'none')).toEqual(['none']);
  });

  it('selecting a substantive option clears "none"', () => {
    expect(toggleInterviewAnswer(['none'], 'egg')).toEqual(['egg']);
  });

  it('toggling "none" off leaves the question empty', () => {
    expect(toggleInterviewAnswer(['none'], 'none')).toEqual([]);
  });

  it('toggling a substantive option off removes only that option', () => {
    expect(toggleInterviewAnswer(['egg', 'nuts'], 'egg')).toEqual(['nuts']);
  });
});

describe('Phase 1 neutral profile never claims false "no restrictions" (Blocking 2)', () => {
  it('persists a non-claiming profile: hasNoRestrictions false with empty dietary', () => {
    const profile = createPhase1NeutralProfile('2026-08-16T00:00:00.000Z');
    expect(profile.hasNoRestrictions).toBe(false);
    expect(profile.dietary).toEqual([]);
    expect(profile.dietaryOther).toBe('');
    // The neutral shape is a valid durable FoodProfile.
    expect(isFoodProfile(profile)).toBe(true);
  });

  it('declaring an allergy/restriction in the prototype never stores "no restrictions"', () => {
    // Even when the user visibly selects a restriction in the interview, the
    // durable profile the Phase 1 flow persists stays the neutral non-claiming
    // profile — it must not become hasNoRestrictions: true.
    const interviewAnswers = createEmptyInterviewAnswers();
    interviewAnswers[0] = toggleInterviewAnswer([], 'egg');
    expect(interviewAnswers[0]).toEqual(['egg']);

    const persisted = createPhase1NeutralProfile();
    expect(persisted.hasNoRestrictions).toBe(false);
    expect(persisted.dietary).toEqual([]);
  });
});
