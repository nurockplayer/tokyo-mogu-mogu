/**
 * S4 story content resolution (Issue #123 Codex P1 / Issue #177).
 *
 * The Story screen renders only cultures that resolve a complete story-content
 * entry, so a future verified Region × FoodCulture supplies its own copy as
 * data/config and un-authored cultures show the honest empty state instead of
 * wasabi fallback text. These tests lock availability, locale completeness,
 * and the source-audited Ome/Sawai content boundary.
 */
import { describe, expect, it } from 'vitest';
import {
  FOOD_CULTURE_DATA_KEYS,
  mobilityLabelKey,
  placeNameKey,
  routeAdvisoryKeys,
  routeAreaKey,
  routeEstimateKey,
  routeNameKey,
  routeTransportKey,
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

  it('resolves a complete, region-specific Hachioji story and route mapping (#238)', () => {
    const content = storyContent('hachioji-ginger');
    expect(content).toBeDefined();
    expect(content?.name).toBe('dataHachiojiName');
    expect(content?.area).toBe('areaHachioji');
    expect(content?.challengeEvidence).toBeUndefined();
    expect(routeNameKey('hachioji-ginger-journey')).toBe('dataHachiojiRouteName');
    expect(routeAreaKey('hachioji-ginger-journey')).toBe('areaHachioji');
    expect(routeTransportKey('hachioji-ginger-journey')).toBe('dataHachiojiRouteTransport');
    expect(routeEstimateKey('hachioji-ginger-journey')).toBe('dataHachiojiRouteEstimate');
    expect(placeNameKey('hachioji-takiyama-roadside-station')).toBe(
      'dataPlaceHachiojiRoadsideStationName',
    );
    expect(placeNameKey('hachioji-takiyama-castle')).toBe('dataPlaceHachiojiCastleName');
    expect(stepRoleKey('hachioji-ginger-journey', 'hachioji-takiyama-castle', '1-day')).toBe(
      'dataHachiojiStopRoleCastleFullDay',
    );
    expect(mobilityLabelKey('hachioji-ginger-journey', 1, 2)).toBe('dataRouteMobilityWalk');
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      expect(resolveKey(strings, locale, 'dataHachiojiName')).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, 'dataHachiojiStickyCta')).not.toMatch(/^missing:/);
    }
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
      // A non-wasabi story may define its OWN chrome keys (the sake-ome story
      // ships dataSakeHeroKicker etc. for the S4 layout, Issue #163), but it
      // must never reuse wasabi's shared s4* chrome or wasabi's municipality-
      // evidence template — that would mislabel another culture's copy.
      expect(entry.heroKicker, `culture ${id}`).not.toBe('s4HeroKicker');
      expect(entry.craftMediaAlt, `culture ${id}`).not.toBe('s4CraftMediaAlt');
      expect(entry.ctaSub, `culture ${id}`).not.toBe('s4CtaSub');
      expect(entry.stickyCta, `culture ${id}`).not.toBe('s4StickyCta');
      expect(entry.challengeEvidence, `culture ${id}`).not.toBe('dataStoryChallengeEvidence');
    }
  });

  it('downgrades unsupported Ome/Sawai local-rice claims out of production mappings (#177)', () => {
    const foodCultureKeys = Object.values(FOOD_CULTURE_DATA_KEYS['sake-ome'] ?? {});
    const storyKeys = Object.values(STORY_DATA_KEYS['sake-ome'] ?? {});

    // The current canonical resource bundle still contains these legacy strings,
    // but official evidence supports brewery water + selected rice, not rice
    // grown in Ome/Sawai. Production-visible bridges must not select them.
    expect(foodCultureKeys).not.toContain('dataSakeStory');
    expect(storyKeys).not.toContain('dataSakeStory');
    expect(storyKeys).not.toContain('dataSakeStoryMakerRole');

    // Reuse already source-backed copy rather than replacing the overclaim with
    // invented evidence. All three locales resolve through the same safe keys.
    expect(FOOD_CULTURE_DATA_KEYS['sake-ome']?.story).toBe('dataSakeDescription');
    expect(storyContent('sake-ome')?.story).toBe('dataSakeDescription');
    expect(storyContent('sake-ome')?.makerRole).toBe('dataOzawaRole');
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      const content = storyContent('sake-ome')!;
      const visibleCopy = [
        resolveKey(strings, locale, content.story),
        resolveKey(strings, locale, content.makerRole),
      ].join('\n');
      const normalized = visibleCopy.toLowerCase().replace(/[\u2018\u2019]/g, "'");
      expect(normalized).not.toContain("land's rice");
      expect(visibleCopy).not.toContain('土地の米');
      expect(visibleCopy).not.toContain('土地之米');
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

  it('does not falsely label an unmapped mobility segment as Walk', () => {
    // A future route's bus/train segment without an i18n mapping has no label
    // key — RoutePage falls back to the segment's own canonical label, never a
    // substituted transport mode.
    expect(mobilityLabelKey('unknown-route', 1, 2)).toBeUndefined();
    // The demo route's known segments keep their explicit keys.
    expect(mobilityLabelKey('okutama-wasabi-journey', 1, 2)).toBe('dataRouteMobilityBus');
  });

  it('keeps route transport localized in ja/en/zh-TW', () => {
    const key = routeTransportKey('okutama-wasabi-journey');
    expect(key).toBe('dataRouteTransport');
    expect(resolveKey(strings, 'ja', key!)).toBe('JR青梅線・西東京バス');
    expect(resolveKey(strings, 'en', key!)).toBe('JR Ome Line & Nishi Tokyo Bus');
    expect(resolveKey(strings, 'zh-TW', key!)).toBe('JR青梅線・西東京巴士');
    // A future route without a localized mapping has no transport key — its own
    // canonical variant data is the honest fallback, never another route's copy.
    expect(routeTransportKey('ome-sake-journey')).toBeUndefined();
  });

  it('keeps saved-route area localized in ja/en/zh-TW', () => {
    const key = routeAreaKey('okutama-wasabi-journey');
    expect(key).toBe('areaOkutama');
    expect(resolveKey(strings, 'ja', key!)).toBe('奥多摩');
    expect(resolveKey(strings, 'en', key!)).toBe('Okutama');
    expect(resolveKey(strings, 'zh-TW', key!)).toBe('奧多摩');
    expect(routeAreaKey('ome-sake-journey')).toBeUndefined();
  });

  it('keeps the story key set structurally equivalent across locales', () => {
    // Mirrors the app-wide structural-equivalence invariant for new keys.
    const jaKeys = Object.keys(strings.ja).sort();
    expect(jaKeys).toEqual(Object.keys(strings.en).sort());
    expect(jaKeys).toEqual(Object.keys(strings['zh-TW']).sort());
  });
});
