import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { strings, type LocaleKey } from '../../../i18n/resources';
import { demoJourneys } from '../content';
import {
  createDefaultExplorationAnswers,
  type MatchTagKey,
} from '../../../lib/exploration';
import { loadMoguRecent, recordMoguRecent } from '../../../lib/mogu-recent';
import {
  bottomNavigationPaths,
  journeyStoryPath,
  journeyToMoguRecent,
  routeSpotPath,
} from './presentation';

class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() { return this.store.size; }
  clear() { this.store.clear(); }
  getItem(key: string) { return this.store.get(key) ?? null; }
  key(index: number) { return Array.from(this.store.keys())[index] ?? null; }
  removeItem(key: string) { this.store.delete(key); }
  setItem(key: string, value: string) { this.store.set(key, String(value)); }
}

const originalLocalStorage = globalThis.localStorage;

beforeEach(() => {
  globalThis.localStorage = new MemoryStorage();
});

afterAll(() => {
  globalThis.localStorage = originalLocalStorage;
});

const tagLabelKeys: Record<MatchTagKey, LocaleKey> = {
  'grate-fresh': 's3TagGrateFresh',
  'stream-fresh': 's3TagStreamFresh',
  'meet-maker': 's3TagMeetMaker',
  'buy-gift': 's3TagBuyGift',
  'make-craft': 's3TagMakeCraft',
  'nature-valley': 's3TagNature',
  'tradition-edo': 's3TagTradition',
  'daily-life': 's3TagDaily',
  'half-day': 's3TagHalfDay',
  'full-day': 's3TagFullDay',
};

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
      summary: ['nature-valley', 'tradition-edo', 'half-day'],
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

  it('round-trips renderable MatchTagKey summaries through MOGU Recent', () => {
    const draft = journeyToMoguRecent(
      demoJourneys[0],
      createDefaultExplorationAnswers(),
      false,
    );
    recordMoguRecent(draft, '2026-08-23T00:00:00.000Z');

    const [loaded] = loadMoguRecent();
    expect(loaded.summary).toEqual(['nature-valley', 'tradition-edo', 'half-day']);

    for (const tag of loaded.summary as MatchTagKey[]) {
      const labelKey = tagLabelKeys[tag];
      expect(labelKey).toBeDefined();
      for (const locale of ['ja', 'en', 'zh-TW'] as const) {
        expect(strings[locale][labelKey]).toEqual(expect.any(String));
        expect(strings[locale][labelKey]).not.toHaveLength(0);
      }
    }
  });
});
