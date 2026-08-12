/**
 * S4 story content resolution (Issue #123 Codex P1).
 *
 * The Story screen renders only cultures that resolve a complete story-content
 * entry, so a future verified Region × FoodCulture supplies its own copy as
 * data/config and un-authored cultures show the honest empty state instead of
 * wasabi fallback text. These tests lock availability and locale completeness.
 */
import { describe, expect, it } from 'vitest';
import {
  placeNameKey,
  routeAdvisoryKeys,
  routeNameKey,
  stepRoleKey,
  storyContent,
  STORY_DATA_KEYS,
} from './data-content';
import { resolveKey } from './fallback';
import { strings, type LocaleKey } from './resources';
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
        if (field === 'municipalityId') continue; // non-i18n story data
        const localeKey = key as LocaleKey;
        expect(localeKey, `culture ${id} field ${field}`).toBeTypeOf('string');
        for (const locale of locales) {
          const value = resolveKey(strings, locale, localeKey);
          expect(value.startsWith('missing:'), `${locale} ${localeKey}`).toBe(false);
          expect(value.length, `${locale} ${localeKey}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('scopes municipality census evidence to the story that owns it', () => {
    // The Okutama story carries its municipality context; a future Ome/Hachioji
    // story must never inherit it.
    expect(storyContent('wasabi-okutama')?.municipalityId).toBe('133086');
    for (const [id, entry] of Object.entries(STORY_DATA_KEYS)) {
      if (id !== 'wasabi-okutama') {
        expect(entry.municipalityId, `culture ${id}`).toBeUndefined();
      }
    }
  });

  it('keeps culture-specific chrome and evidence copy inside the story content mapping', () => {
    const wasabi = storyContent('wasabi-okutama');
    expect(wasabi?.heroKicker).toBe('s4HeroKicker');
    expect(wasabi?.craftMediaAlt).toBe('s4CraftMediaAlt');
    expect(wasabi?.ctaSub).toBe('s4CtaSub');
    expect(wasabi?.stickyCta).toBe('s4StickyCta');
    // The municipality-evidence template is the story's own: only the Okutama
    // story names Okutama, and a non-Okutama story must never fall back to it.
    expect(wasabi?.challengeEvidence).toBe('dataStoryChallengeEvidence');
    for (const [id, entry] of Object.entries(STORY_DATA_KEYS)) {
      if (id === 'wasabi-okutama') continue;
      expect(entry.heroKicker, `culture ${id}`).toBeUndefined();
      expect(entry.craftMediaAlt, `culture ${id}`).toBeUndefined();
      expect(entry.ctaSub, `culture ${id}`).toBeUndefined();
      expect(entry.stickyCta, `culture ${id}`).toBeUndefined();
      expect(entry.challengeEvidence, `culture ${id}`).toBeUndefined();
    }
  });

  it('keeps route advisory copy route-specific (#83)', () => {
    expect(routeAdvisoryKeys('okutama-wasabi-journey')).toEqual({
      advisory: 's5CrowdingAdvisory',
      source: 's5CrowdingSource',
    });
    // A future non-Okutama route has no advisory → renders honest none, never
    // the Okutama field observation.
    expect(routeAdvisoryKeys('ome-sake-journey')).toBeUndefined();
  });

  it('does not fall back to wasabi/Okutama copy for unknown route or place ids', () => {
    expect(routeNameKey('unknown-route')).toBeUndefined();
    expect(placeNameKey('unknown-place')).toBeUndefined();
    expect(stepRoleKey('unknown-route', 'unknown-place', 'half-day')).toBeUndefined();
  });

  it('keeps the story key set structurally equivalent across locales', () => {
    // Mirrors the app-wide structural-equivalence invariant for new keys.
    const jaKeys = Object.keys(strings.ja).sort();
    expect(jaKeys).toEqual(Object.keys(strings.en).sort());
    expect(jaKeys).toEqual(Object.keys(strings['zh-TW']).sort());
  });
});
