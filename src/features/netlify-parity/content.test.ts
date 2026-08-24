import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  demoJourneys,
  demoSpots,
  referenceAssetFiles,
  referenceCopy,
} from './content';

const locales = ['ja', 'en', 'zh-TW'] as const;

describe('Netlify parity presentation content', () => {
  it.each(locales)('%s exposes every primary action', (locale) => {
    const copy = referenceCopy(locale);

    expect(copy.actions).toMatchObject({
      start: expect.any(String),
      beginProfile: expect.any(String),
      next: expect.any(String),
      openStory: expect.any(String),
      createRoute: expect.any(String),
      openSpot: expect.any(String),
    });
    expect(Object.values(copy.actions).every((label) => label.trim().length > 0)).toBe(true);
  });

  it('keeps the complete primary copy shape in every supported locale', () => {
    const shapeOf = (value: unknown): unknown => {
      if (typeof value === 'string') return 'string';
      if (Array.isArray(value)) return value.map(shapeOf);
      if (value && typeof value === 'object') {
        return Object.fromEntries(
          Object.entries(value as Record<string, unknown>)
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([key, child]) => [key, shapeOf(child)]),
        );
      }
      return typeof value;
    };
    const allStrings = (value: unknown): string[] => {
      if (typeof value === 'string') return [value];
      if (Array.isArray(value)) return value.flatMap(allStrings);
      if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
      return [];
    };
    const baseline = JSON.stringify(shapeOf(referenceCopy('ja')));

    for (const locale of locales) {
      const copy = referenceCopy(locale);
      expect(JSON.stringify(shapeOf(copy))).toBe(baseline);
      expect(allStrings(copy).every((value) => value.trim().length > 0)).toBe(true);
    }
  });

  it('keeps demo journeys generic and links their presentation IDs to local imagery', () => {
    expect(demoJourneys).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'demo-okutama-wasabi',
          regionId: 'okutama',
          foodCultureId: 'wasabi-okutama',
          routeId: 'okutama-wasabi-journey',
        }),
      ]),
    );

    const referencedAssetIds = [
      ...demoJourneys.flatMap((journey) => [
        journey.imageAssetId,
        journey.heroAssetId,
        ...journey.routeVariants.flatMap((variant) => [
          variant.imageAssetId,
          ...variant.steps.map((step) => step.imageAssetId),
        ]),
      ]),
      ...Object.values(demoSpots).flatMap((spot) => [spot.imageAssetId, ...spot.thumbnailAssetIds]),
    ];

    expect(referencedAssetIds.every((assetId) => assetId in referenceAssetFiles)).toBe(true);
  });

  it('provides the complete semantic Food Profile and exploration vocabulary', () => {
    const copy = referenceCopy('ja');

    expect(copy.profile.welcomeBody).toBe(
      'MOGU MOGUへようこそ！😊<br>あなたにぴったりの東京の食文化や体験を見つけるために、まずはあなたの「食」のことを少しだけ教えてください。',
    );
    expect(copy.profile.questions.allergy).toMatchObject({
      prompt: 'まず、食物アレルギーはありますか？(複数選択) (1/4)',
      options: {
        egg: '🥚 卵', dairy: '🥛 乳製品', wheat: '🌾 小麦', crustacean: '🦐 甲殻類',
        nuts: '🥜 ナッツ', fish: '🐟 魚', none: 'アレルギーはありません', other: '✏️ その他',
      },
    });
    expect(copy.profile.questions.diet.options).toEqual({
      vegetarian: '🥗 ベジタリアン', vegan: '🌱 ヴィーガン', pescatarian: '🐟 ペスカタリアン', none: '特になし',
    });
    expect(copy.profile.questions.religion.options).toHaveProperty('halal', '☪️ ハラール対応が必要');
    expect(copy.profile.questions.dislike.options).toHaveProperty('shellfish', '🐚 貝類');
    expect(copy.exploration.experienceCards).toHaveProperty('meetMaker.label', '職人に会う');
    expect(copy.exploration.departureSuggestions).toHaveLength(6);
    expect(copy.exploration.movementOptions).toHaveLength(5);
    expect(copy.exploration.durationOptions).toHaveLength(3);
    expect(copy.exploration.tasteOptions).toHaveLength(9);
    expect(copy.exploration.themeOptions).toHaveLength(9);
  });

  it('keeps Spot visitor information free of internal demo and reference wording', () => {
    const internalReferenceWording =
      /Netlify|デモ用編集情報|デモ参考情報|Demo editorial presentation|Demo reference|示範編輯資訊|示範參考資訊/;

    for (const spot of Object.values(demoSpots)) {
      for (const locale of locales) {
        const localized = spot.copy[locale];
        const visibleCopy = [
          ...localized.tags,
          ...localized.practicalInfo.flatMap((row) => [row.label, row.value]),
        ];

        expect(visibleCopy.every((value) => !internalReferenceWording.test(value))).toBe(true);
      }
    }
  });

  it('resolves every presentation asset to a bundled local file', () => {
    for (const assetFile of Object.values(referenceAssetFiles)) {
      expect(existsSync(fileURLToPath(new URL(assetFile, import.meta.url)))).toBe(true);
    }
  });
});
