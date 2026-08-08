import { describe, expect, it } from 'vitest';
import {
  createDefaultAnswers,
  deriveMatchTags,
  fillTemplate,
  hasDietaryConsideration,
  isDiagnosisAnswers,
  S2_FIRST_STEP,
  WIZARD_STEP_COUNT,
  type DiagnosisAnswers,
} from './diagnosis';

describe('diagnosis defaults (#43)', () => {
  it('starts with no dietary selections and the skip path on', () => {
    const a = createDefaultAnswers();
    expect(a.dietary).toEqual([]);
    expect(a.dietaryOther).toBe('');
    expect(a.hasNoRestrictions).toBe(true);
  });

  it('starts with unanswered preference questions', () => {
    const a = createDefaultAnswers();
    expect(a.tastes).toEqual([]);
    expect(a.experiences).toEqual([]);
    expect(a.baseArea).toBeNull();
    expect(a.travelTime).toBeNull();
    expect(a.interests).toEqual([]);
    expect(a.duration).toBeNull();
  });

  it('wizard spans S1 dietary plus the five S2 questions', () => {
    expect(WIZARD_STEP_COUNT).toBe(6);
    expect(S2_FIRST_STEP).toBe(1);
  });
});

describe('deriveMatchTags (#43)', () => {
  it('always recommends the core freshly-grated wasabi tag', () => {
    const a = createDefaultAnswers();
    const tags = deriveMatchTags(a);
    expect(tags).toContain('grate-fresh');
  });

  it('derives a tag for each selected preference (multi-select)', () => {
    const a: DiagnosisAnswers = {
      ...createDefaultAnswers(),
      tastes: ['refreshing'],
      experiences: ['meet', 'buy'],
      interests: ['nature', 'tradition'],
      duration: 'half-day',
    };
    const tags = deriveMatchTags(a);
    for (const expected of [
      'grate-fresh',
      'stream-fresh',
      'meet-maker',
      'buy-gift',
      'nature-valley',
      'tradition-edo',
      'half-day',
    ]) {
      expect(tags).toContain(expected);
    }
    expect(tags).not.toContain('make-craft');
    expect(tags).not.toContain('daily-life');
    expect(tags).not.toContain('full-day');
  });

  it('does not add the make / daily-life tags when not selected', () => {
    const a: DiagnosisAnswers = {
      ...createDefaultAnswers(),
      experiences: ['eat'],
      interests: [],
    };
    const tags = deriveMatchTags(a);
    expect(tags).toEqual(['grate-fresh']);
  });

  it('maps full-day to the full-day tag', () => {
    const a: DiagnosisAnswers = { ...createDefaultAnswers(), duration: 'full-day' };
    expect(deriveMatchTags(a)).toContain('full-day');
  });

  it('returns a stable tag order for identical answers', () => {
    const a: DiagnosisAnswers = {
      ...createDefaultAnswers(),
      tastes: ['refreshing'],
      experiences: ['meet', 'buy', 'make'],
      interests: ['nature', 'tradition', 'daily-life'],
      duration: 'full-day',
    };
    expect(deriveMatchTags(a)).toEqual(deriveMatchTags(a));
  });
});

describe('hasDietaryConsideration (#43)', () => {
  it('is false when no dietary input is present', () => {
    expect(hasDietaryConsideration(createDefaultAnswers())).toBe(false);
  });

  it('is true when a restriction is selected', () => {
    const a: DiagnosisAnswers = { ...createDefaultAnswers(), dietary: ['allergy'] };
    expect(hasDietaryConsideration(a)).toBe(true);
  });

  it('is true when a free-text note is present', () => {
    const a: DiagnosisAnswers = { ...createDefaultAnswers(), dietaryOther: '食べられないものがあります' };
    expect(hasDietaryConsideration(a)).toBe(true);
  });

  it('ignores leading/trailing whitespace-only notes', () => {
    const a: DiagnosisAnswers = { ...createDefaultAnswers(), dietaryOther: '   ' };
    expect(hasDietaryConsideration(a)).toBe(false);
  });
});

describe('fillTemplate (#43)', () => {
  it('replaces named placeholders with values', () => {
    expect(fillTemplate('約{n}m', { n: '500' })).toBe('約500m');
  });

  it('leaves unmatched placeholders untouched', () => {
    expect(fillTemplate('半径{n}m以内', {})).toBe('半径{n}m以内');
  });
});

describe('isDiagnosisAnswers (#43)', () => {
  it('accepts a well-formed answers object', () => {
    expect(isDiagnosisAnswers(createDefaultAnswers())).toBe(true);
  });

  it('rejects null / non-objects / missing fields', () => {
    expect(isDiagnosisAnswers(null)).toBe(false);
    expect(isDiagnosisAnswers(undefined)).toBe(false);
    expect(isDiagnosisAnswers('answers')).toBe(false);
    expect(isDiagnosisAnswers({ dietary: [] })).toBe(false);
  });
});
