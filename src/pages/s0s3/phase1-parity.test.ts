/**
 * Phase 1 latest-Figma parity regression tests (Issue #224).
 *
 * Locks the dietary Food Profile boundaries introduced for the latest-Figma
 * convergence that are not covered by the recommendation contract:
 *   - the interview keeps its structure, label resolution and none-exclusivity;
 *   - first-use answers are mapped to the existing durable coarse categories;
 *   - persistence remains recommendation-only and never becomes a safety claim.
 */
import { describe, expect, it } from 'vitest';
import {
  PHASE1_INTERVIEW,
  createEmptyInterviewAnswers,
  interviewSelectionLabels,
  interviewSummaryLines,
  toggleInterviewAnswer,
  updateInterviewAnswer,
  createFoodProfileFromInterviewAnswers,
} from './FoodProfilePage';
import { isFoodProfile } from '../../lib/food-profile';

describe('PHASE1_INTERVIEW structure (Issue #224)', () => {
  it('is the four latest-Figma dietary questions in order', () => {
    expect(PHASE1_INTERVIEW.map((q) => q.titleKey)).toEqual([
      'fpIvQ1Title',
      'fpIvQ2Title',
      'fpIvQ3Title',
      'fpIvQ4Title',
    ]);
  });

  it('Q1 allergy offers the Figma emoji quick replies plus a none option', () => {
    const values = PHASE1_INTERVIEW[0].options.map((o) => o.value);
    expect(values).toEqual(['egg', 'dairy', 'wheat', 'shellfish', 'nuts', 'fish', 'none']);
  });

  it('Q2 diet offers only the Figma set with no "other" affordance', () => {
    const q = PHASE1_INTERVIEW[1];
    expect(q.allowOther).toBe(false);
    expect(q.options.map((o) => o.value)).toEqual(['vegetarian', 'vegan', 'pescatarian', 'none']);
  });

  it('Q3 religion and Q4 dislikes keep the Figma "other" affordance', () => {
    expect(PHASE1_INTERVIEW[2].allowOther).toBe(true);
    expect(PHASE1_INTERVIEW[3].allowOther).toBe(true);
    // Q4 includes the Figma 貝類 (shellfish) dislike option.
    expect(PHASE1_INTERVIEW[3].options.map((o) => o.value)).toContain('shellfish');
  });
});

describe('toggleInterviewAnswer — none exclusivity (Issue #224)', () => {
  it('selecting none clears every substantive choice', () => {
    expect(toggleInterviewAnswer(['egg', 'nuts'], 'none')).toEqual(['none']);
  });

  it('selecting a substantive choice clears none', () => {
    expect(toggleInterviewAnswer(['none'], 'egg')).toEqual(['egg']);
  });

  it('deselects an already-selected value and toggles none off', () => {
    expect(toggleInterviewAnswer(['egg', 'nuts'], 'egg')).toEqual(['nuts']);
    expect(toggleInterviewAnswer(['none'], 'none')).toEqual([]);
  });

  it('clears stale Other text when a user goes back and selects none', () => {
    const answers = createEmptyInterviewAnswers();
    answers[0] = ['egg'];
    answers.other[0] = 'そば';

    const updated = updateInterviewAnswer(answers, 0, 'none');

    expect(updated[0]).toEqual(['none']);
    expect(updated.other[0]).toBe('');
    expect(createFoodProfileFromInterviewAnswers(updated).dietaryOther).toBe('');
  });

  it('clears none before committing a nonempty Other answer', () => {
    const answers = createEmptyInterviewAnswers();
    answers[0] = ['none'];

    const updated = updateInterviewAnswer(answers, 0, { other: 'そば' });

    expect(updated[0]).toEqual([]);
    expect(updated.other[0]).toBe('そば');
    expect(createFoodProfileFromInterviewAnswers(updated)).toMatchObject({
      dietary: ['allergy'],
      dietaryOther: 'そば',
      hasNoRestrictions: false,
    });
  });
});

describe('interviewSelectionLabels (Issue #224)', () => {
  const keyAsLabel = (key: string): string => key;

  it('resolves chips and free text to labels per question', () => {
    const answers = createEmptyInterviewAnswers();
    answers[0] = ['egg', 'nuts'];
    answers.other[2] = '  ';
    const labels = interviewSelectionLabels(answers, 0, keyAsLabel as never);
    expect(labels).toEqual(['fpIvEgg', 'fpIvNuts']);
  });

  it('includes the "other" label when free text is present', () => {
    const answers = createEmptyInterviewAnswers();
    answers.other[2] = 'そば';
    const labels = interviewSelectionLabels(answers, 2, keyAsLabel as never);
    expect(labels).toEqual(['fpIvOther']);
  });

  it('returns empty for an unanswered question', () => {
    expect(interviewSelectionLabels(createEmptyInterviewAnswers(), 1, keyAsLabel as never)).toEqual([]);
  });
});

describe('interviewSummaryLines — zero-selection safety (Issue #224)', () => {
  const keyAsLabel = (key: string): string => key;

  it('all four questions skipped renders neutral "not evaluated" copy, never "no restrictions"', () => {
    const lines = interviewSummaryLines(createEmptyInterviewAnswers(), keyAsLabel as never);
    expect(lines).toEqual(['fpNotEvaluated']);
    expect(lines).not.toContain('fpNoRestrictions');
  });

  it('renders the selected labels when at least one question is answered', () => {
    const answers = createEmptyInterviewAnswers();
    answers[0] = ['egg'];
    const lines = interviewSummaryLines(answers, keyAsLabel as never);
    expect(lines).toEqual(['fpIvEgg']);
  });

  it('keeps the durable profile non-claiming after a skipped interview', () => {
    const profile = createFoodProfileFromInterviewAnswers(
      createEmptyInterviewAnswers(),
      '2026-08-16T00:00:00.000Z',
    );
    expect(profile.hasNoRestrictions).toBe(false);
    expect(profile.dietary).toEqual([]);
  });
});

describe('createFoodProfileFromInterviewAnswers (Issue #268)', () => {
  it('maps first-use interview answers into the existing durable profile categories', () => {
    const answers = createEmptyInterviewAnswers();
    answers[0] = ['egg', 'nuts'];
    answers[1] = ['vegan'];
    answers[2] = ['pork'];
    answers[3] = ['spicy'];
    answers.other[0] = 'そば';
    answers.other[2] = 'ゼラチン';

    const profile = createFoodProfileFromInterviewAnswers(
      answers,
      '2026-08-16T00:00:00.000Z',
    );

    expect(isFoodProfile(profile)).toBe(true);
    expect(profile.hasNoRestrictions).toBe(false);
    expect(profile.dietary).toEqual([
      'allergy',
      'vegetarian-vegan',
      'religious',
      'dislike',
    ]);
    expect(profile.dietaryOther).toBe('そば / ゼラチン');
    expect(profile.savedAt).toBe('2026-08-16T00:00:00.000Z');
  });

  it('stores an explicit all-none interview as no restrictions', () => {
    const answers = createEmptyInterviewAnswers();
    for (let index = 0; index < PHASE1_INTERVIEW.length; index += 1) {
      answers[index] = ['none'];
    }

    const profile = createFoodProfileFromInterviewAnswers(answers);

    expect(profile.hasNoRestrictions).toBe(true);
    expect(profile.dietary).toEqual([]);
    expect(profile.dietaryOther).toBe('');
  });

  it('keeps tutorial-forced all-none answers non-claiming', () => {
    const answers = createEmptyInterviewAnswers();
    for (let index = 0; index < PHASE1_INTERVIEW.length; index += 1) {
      answers[index] = ['none'];
    }

    const profile = createFoodProfileFromInterviewAnswers(
      answers,
      '2026-08-16T00:00:00.000Z',
      'guided-tutorial',
    );

    expect(profile.hasNoRestrictions).toBe(false);
    expect(profile.dietary).toEqual([]);
    expect(profile.dietaryOther).toBe('');
  });

  it('does not convert incomplete or contradictory answers into a no-restrictions claim', () => {
    const incomplete = createFoodProfileFromInterviewAnswers(createEmptyInterviewAnswers());
    expect(incomplete.hasNoRestrictions).toBe(false);

    const answers = createEmptyInterviewAnswers();
    for (let index = 0; index < PHASE1_INTERVIEW.length; index += 1) {
      answers[index] = ['none'];
    }
    answers.other[3] = 'パクチー';

    const withOther = createFoodProfileFromInterviewAnswers(answers);
    expect(withOther.hasNoRestrictions).toBe(false);
    expect(withOther.dietary).toEqual(['dislike']);
    expect(withOther.dietaryOther).toBe('パクチー');
  });
});
