import { describe, expect, it } from 'vitest';
import {
  createDefaultExplorationAnswers,
  deriveMatchTags,
  fillTemplate,
  isExplorationAnswers,
  WIZARD_STEP_COUNT,
  type ExplorationAnswers,
} from './exploration';

describe('exploration defaults (#78 reframe of #43)', () => {
  it('starts with unanswered current-trip questions', () => {
    const a = createDefaultExplorationAnswers();
    expect(a.tastes).toEqual([]);
    expect(a.experiences).toEqual([]);
    expect(a.baseArea).toBeNull();
    expect(a.travelTime).toBeNull();
    expect(a.interests).toEqual([]);
    expect(a.duration).toBeNull();
  });

  it('wizard spans exactly the five Exploration questions', () => {
    expect(WIZARD_STEP_COUNT).toBe(5);
  });
});

describe('deriveMatchTags (#78 reframe of #43)', () => {
  it('always recommends the core freshly-grated wasabi tag', () => {
    const a = createDefaultExplorationAnswers();
    const tags = deriveMatchTags(a);
    expect(tags).toContain('grate-fresh');
  });

  it('derives a tag for each selected condition (multi-select)', () => {
    const a: ExplorationAnswers = {
      ...createDefaultExplorationAnswers(),
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
    const a: ExplorationAnswers = {
      ...createDefaultExplorationAnswers(),
      experiences: ['eat'],
      interests: [],
    };
    const tags = deriveMatchTags(a);
    expect(tags).toEqual(['grate-fresh']);
  });

  it('maps full-day to the full-day tag', () => {
    const a: ExplorationAnswers = { ...createDefaultExplorationAnswers(), duration: 'full-day' };
    expect(deriveMatchTags(a)).toContain('full-day');
  });

  it('adds the craft tag for craft interest but never duplicates make-craft', () => {
    const a: ExplorationAnswers = {
      ...createDefaultExplorationAnswers(),
      interests: ['craft'],
    };
    const tags = deriveMatchTags(a);
    expect(tags).toContain('make-craft');
    expect(tags.filter((t) => t === 'make-craft')).toHaveLength(1);
  });

  it('returns a stable tag order for identical answers', () => {
    const a: ExplorationAnswers = {
      ...createDefaultExplorationAnswers(),
      tastes: ['refreshing'],
      experiences: ['meet', 'buy', 'make'],
      interests: ['nature', 'tradition', 'daily-life'],
      duration: 'full-day',
    };
    expect(deriveMatchTags(a)).toEqual(deriveMatchTags(a));
  });
});

describe('fillTemplate (#78 reframe of #43)', () => {
  it('replaces named placeholders with values', () => {
    expect(fillTemplate('約{n}m', { n: '500' })).toBe('約500m');
  });

  it('leaves unmatched placeholders untouched', () => {
    expect(fillTemplate('半径{n}m以内', {})).toBe('半径{n}m以内');
  });
});

describe('isExplorationAnswers (#78 reframe of #43)', () => {
  it('accepts a well-formed answers object', () => {
    expect(isExplorationAnswers(createDefaultExplorationAnswers())).toBe(true);
  });

  it('rejects null / non-objects / missing fields', () => {
    expect(isExplorationAnswers(null)).toBe(false);
    expect(isExplorationAnswers(undefined)).toBe(false);
    expect(isExplorationAnswers('answers')).toBe(false);
    expect(isExplorationAnswers({ tastes: [] })).toBe(false);
  });
});
