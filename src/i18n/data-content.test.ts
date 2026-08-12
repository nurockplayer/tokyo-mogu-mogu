/**
 * S4 story content resolution (Issue #123 Codex P1).
 *
 * The Story screen renders only cultures that resolve a complete story-content
 * entry, so a future verified Region × FoodCulture supplies its own copy as
 * data/config and un-authored cultures show the honest empty state instead of
 * wasabi fallback text. These tests lock availability and locale completeness.
 */
import { describe, expect, it } from 'vitest';
import { storyContent, STORY_DATA_KEYS } from './data-content';
import { resolveKey } from './fallback';
import { strings } from './resources';
import { PILOT_JOURNEY } from '../data/pilot-journey';

describe('S4 story content availability (#123)', () => {
  it('resolves full story content for the frozen demo culture', () => {
    const content = storyContent(PILOT_JOURNEY.foodCultureId);
    expect(content).toBeDefined();
    expect(content?.name).toBe('dataWasabiName');
    expect(content?.support).toBe('dataStorySupport');
  });

  it('treats cultures without full story copy as unavailable (honest empty state)', () => {
    // yamame/soba/konnyaku have a name key but no authored story; unknown ids
    // have nothing. None may render wasabi fallback copy.
    expect(storyContent('yamame-okutama')).toBeUndefined();
    expect(storyContent('okutama-soba')).toBeUndefined();
    expect(storyContent('unknown')).toBeUndefined();
  });

  it('ships every required story key in all three locales', () => {
    const locales = ['ja', 'en', 'zh-TW'] as const;
    for (const id of Object.keys(STORY_DATA_KEYS)) {
      const entry = STORY_DATA_KEYS[id];
      expect(entry, `culture ${id}`).toBeDefined();
      for (const [field, key] of Object.entries(entry)) {
        expect(key, `culture ${id} field ${field}`).toBeTypeOf('string');
        for (const locale of locales) {
          const value = resolveKey(strings, locale, key);
          expect(value.startsWith('missing:'), `${locale} ${key}`).toBe(false);
          expect(value.length, `${locale} ${key}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('keeps the story key set structurally equivalent across locales', () => {
    // Mirrors the app-wide structural-equivalence invariant for new keys.
    const jaKeys = Object.keys(strings.ja).sort();
    expect(jaKeys).toEqual(Object.keys(strings.en).sort());
    expect(jaKeys).toEqual(Object.keys(strings['zh-TW']).sort());
  });
});
