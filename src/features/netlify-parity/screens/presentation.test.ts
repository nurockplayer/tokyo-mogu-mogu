import { describe, expect, it } from 'vitest';
import { strings } from '../../../i18n/resources';
import { demoJourneys } from '../content';
import { createDefaultExplorationAnswers } from '../../../lib/exploration';
import {
  bottomNavigationPaths,
  journeyStoryPath,
  journeyToMoguRecent,
  routeSpotPath,
} from './presentation';

describe('Issue #276 presentation adapters', () => {
  it('keeps the authoritative primary result on the wasabi Story path', () => {
    const primary = demoJourneys[0];
    expect(primary.id).toBe('demo-okutama-wasabi');
    expect(journeyStoryPath(primary)).toBe('/story/wasabi-okutama');
  });

  it('maps a route stop to its stable Spot URL', () => {
    expect(routeSpotPath('okutama-tourism-office')).toBe('/spot/okutama-tourism-office');
  });

  it('maps the Netlify tab labels to stable product URLs', () => {
    expect(bottomNavigationPaths).toEqual({
      home: '/home',
      mogu: '/mogu',
      favorites: '/my-route',
      my: '/my',
    });
  });

  it('builds the established MOGU Recent boundary from presentation data', () => {
    const journey = demoJourneys[0];
    expect(
      journeyToMoguRecent(journey, createDefaultExplorationAnswers(), true),
    ).toEqual({
      candidateId: 'demo-okutama-wasabi',
      resultId: 'wasabi-okutama',
      titleKey: 'dataWasabiName',
      summary: ['自然', '伝統', '半日巡り'],
      exploration: createDefaultExplorationAnswers(),
      hasDietaryConsiderations: true,
    });
  });

  it('persists only title keys that resolve in every supported locale', () => {
    const locales = ['ja', 'en', 'zh-TW'] as const;

    for (const journey of demoJourneys) {
      const recent = journeyToMoguRecent(
        journey,
        createDefaultExplorationAnswers(),
        false,
      );
      const titleKey = recent.titleKey;

      for (const locale of locales) {
        expect(strings[locale][titleKey]).toEqual(expect.any(String));
        expect(strings[locale][titleKey]).not.toHaveLength(0);
      }
    }
  });
});
