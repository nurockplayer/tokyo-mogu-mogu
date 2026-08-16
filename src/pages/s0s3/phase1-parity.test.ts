/**
 * Phase 1 latest-Figma parity regression tests (Issue #224).
 *
 * Locks the presentation-only boundaries introduced for the latest-Figma
 * convergence that is not covered by the durable recommendation contract:
 *   - the dietary interview is presentation-only data (structure + label
 *     resolution + none-exclusivity), never a safety claim;
 *   - the Phase 1 neutral durable profile means "not evaluated", never "no
 *     restrictions".
 */
import { describe, expect, it } from 'vitest';
import {
  PHASE1_INTERVIEW,
  createEmptyInterviewAnswers,
  interviewSelectionLabels,
  toggleInterviewAnswer,
  createPhase1NeutralProfile,
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

describe('createPhase1NeutralProfile (Issue #224)', () => {
  it('persists a valid non-claiming profile: no restrictions claim, empty dietary', () => {
    const profile = createPhase1NeutralProfile('2026-08-16T00:00:00.000Z');
    expect(isFoodProfile(profile)).toBe(true);
    expect(profile.hasNoRestrictions).toBe(false);
    expect(profile.dietary).toEqual([]);
    expect(profile.dietaryOther).toBe('');
    expect(profile.savedAt).toBe('2026-08-16T00:00:00.000Z');
  });
});
