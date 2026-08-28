import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { PLACES } from '../../data/seed-places';
import {
  demoJourneys,
  demoSpots,
  referenceAssetFiles,
  referenceCopy,
} from './content';
import {
  localizePlaceClosedDays,
  localizePlaceClosureConflict,
  localizePlaceParking,
  localizePlaceProductCategories,
  referenceSpotDetails,
  routeStepText,
  storySpotGroups,
} from './factual-presentation';

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

  it('keeps Spot visitor information free of obsolete internal terminology', () => {
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

  it('keeps every unconfirmed Spot fixture visibly labeled as reference information', () => {
    const expectedCaveats = {
      ja: ['参考情報', '未確認', '公式情報'],
      en: ['Reference information', 'may not be verified', 'official information'],
      'zh-TW': ['參考資訊', '尚未經確認', '官方資訊'],
    } as const;
    const editorialSpots = Object.entries(demoSpots);

    expect(editorialSpots.length).toBeGreaterThan(0);
    for (const [, spot] of editorialSpots) {
      for (const locale of locales) {
        const localized = spot.copy[locale];
        const visibleCopy = [
          ...localized.tags,
          ...localized.practicalInfo.flatMap((row) => [row.label, row.value]),
          ...localized.caution,
        ].join(' ');

        for (const phrase of expectedCaveats[locale]) {
          expect(visibleCopy).toContain(phrase);
        }
      }
    }
  });

  it('localizes the generic wasabi-experience Spot title in every locale (#339)', () => {
    expect(demoSpots['wasabi-experience'].copy).toMatchObject({
      ja: { name: 'わさび田体験' },
      en: { name: 'Wasabi Experience' },
      'zh-TW': { name: '山葵田體驗' },
    });
  });

  it('keeps the tourism-office fixture explicitly unverified in every locale', () => {
    const tourismOffice = demoSpots['okutama-tourism-office'];
    const expectedCaveats = {
      ja: ['参考情報', '未確認', '公式情報'],
      en: ['Reference information', 'may not be verified', 'official information'],
      'zh-TW': ['參考資訊', '尚未經確認', '官方資訊'],
    } as const;

    for (const locale of locales) {
      const localized = tourismOffice.copy[locale];
      const visibleCopy = [
        ...localized.tags,
        ...localized.practicalInfo.flatMap((row) => [row.label, row.value]),
        ...localized.caution,
      ].join(' ');

      for (const phrase of expectedCaveats[locale]) {
        expect(visibleCopy).toContain(phrase);
      }
    }
  });

  it('derives Yamashiroya product and closure presentation from the canonical Place (#323)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'yamashiroya');
    const visitor = place?.visitorInformation;
    expect(place).toBeDefined();
    expect(visitor).toBeDefined();

    const products = localizePlaceProductCategories(visitor?.productCategories ?? []);
    const closure = localizePlaceClosureConflict(
      visitor?.yearEndClosure?.statements ?? [],
    );
    const detail = referenceSpotDetails.yamashiroya;
    const routeStep = routeStepText['demo-okutama-wasabi:full-day'].find(
      (step) => step.spotId === 'yamashiroya',
    );

    expect(products).toEqual({
      ja: 'わさび漬・生わさび',
      en: 'pickled wasabi and fresh wasabi',
      'zh-TW': '山葵漬・新鮮山葵',
    });
    if (!detail) throw new Error('Missing Yamashiroya Spot presentation.');
    expect(
      detail.information.find((row) => row.fieldId === 'price_availability')?.value,
    ).toEqual(products);
    expect(
      detail.information.find((row) => row.fieldId === 'closed_days')?.value,
    ).toEqual(closure);
    expect(closure.en).toContain('Dec 30–Jan 4');
    expect(closure.en).toContain('Dec 30–Jan 5');
    expect(closure.en).not.toMatch(/[年月日]/);
    expect(detail.caution[1]).toEqual({
      ja: `・${closure.ja}`,
      en: `• ${closure.en}`,
      'zh-TW': `・${closure['zh-TW']}`,
    });
    for (const locale of locales) {
      expect(demoSpots.yamashiroya.copy[locale].lead).toContain(products[locale]);
    }
    expect(routeStep).toMatchObject({ description: products });
    expect(routeStep).not.toHaveProperty('walk');

    for (const journeyId of ['demo-okutama-wasabi', 'demo-okutama-yamame']) {
      const storyReference = storySpotGroups[journeyId].nearby.find(
        (reference) => reference.spotId === 'yamashiroya',
      );
      expect(storyReference?.description?.ja).toContain(products.ja);
      expect(storyReference?.description?.en).toContain(products.en);
      expect(storyReference?.description?.['zh-TW']).toContain(products['zh-TW']);
    }

    const changedClosure = localizePlaceClosureConflict(
      (visitor?.yearEndClosure?.statements ?? []).map((statement, index) => ({
        ...statement,
        value: `source-value-${index + 1}`,
      })),
    );
    expect(changedClosure.ja).toContain('source-value-1');
    expect(changedClosure.ja).toContain('source-value-2');
  });

  it('derives Okutama no Daidokoro Spot, Route, and Story facts from the canonical Place (#325)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'okutama-kitchen');
    const visitor = place?.visitorInformation;
    const listing = visitor?.menuListings?.find(
      (candidate) => candidate.id === 'special-soft-gelato',
    );
    const detail = referenceSpotDetails['okutama-kitchen'];
    const routeStep = routeStepText['demo-okutama-wasabi:half-day'].find(
      (step) => step.spotId === 'okutama-kitchen',
    );
    const storyReference = storySpotGroups['demo-okutama-wasabi'].nearby.find(
      (reference) => reference.spotId === 'okutama-kitchen',
    );

    expect(place).toBeDefined();
    expect(visitor).toBeDefined();
    expect(listing).toBeDefined();
    expect(detail).toBeDefined();
    if (!place || !visitor || !listing || !detail || !routeStep || !storyReference) {
      throw new Error('Missing source-backed Okutama no Daidokoro presentation.');
    }

    expect(demoSpots['okutama-kitchen'].copy.ja.name).toBe(place.nameJa);
    for (const [fieldId, expected] of [
      ['name', place.nameJa],
      ['address', place.address],
      ['phone', visitor.phone],
      ['official_current_url', place.source.url],
    ] as const) {
      expect(detail.information.find((row) => row.fieldId === fieldId)?.value.ja).toBe(expected);
    }
    expect(detail.information.find((row) => row.fieldId === 'hours')?.value.ja)
      .toContain(`${visitor.shopHours?.opens.slice(1)}〜${visitor.shopHours?.closes}`);
    expect(detail.information.find((row) => row.fieldId === 'hours')?.value.ja)
      .toContain(`L.O. ${visitor.shopHours?.lastOrder}`);
    expect(detail.information.find((row) => row.fieldId === 'access')?.value.ja)
      .toBe(`${visitor.access?.stationJa}より徒歩${visitor.access?.walkMinutes}分`);
    expect(detail.information.find((row) => row.fieldId === 'closed_days')?.value)
      .toEqual(localizePlaceClosedDays(visitor.regularClosedDays ?? []));
    expect(visitor.parking).toBeDefined();
    if (!visitor.parking) throw new Error('Missing canonical parking information.');
    expect(detail.information.find((row) => row.fieldId === 'parking')?.value)
      .toEqual(localizePlaceParking(visitor.parking));

    const productInformation = detail.information.find(
      (row) => row.fieldId === 'price_availability',
    )?.value;
    expect(productInformation?.ja).toContain(listing.nameJa);
    expect(productInformation?.ja).toContain('わさび');
    expect(productInformation?.ja).toContain(`${listing.listedPriceYen}円`);
    expect(productInformation?.ja).toContain('サイト掲載価格');

    const localizedProductNames = {
      ja: listing.nameJa,
      en: 'special soft gelato',
      'zh-TW': '特選霜淇淋',
    } as const;
    for (const locale of locales) {
      expect(routeStep.description[locale].toLowerCase()).toContain(
        localizedProductNames[locale].toLowerCase(),
      );
      expect(routeStep.description[locale].toLowerCase()).toContain(
        locale === 'ja' ? 'わさび' : locale === 'en' ? 'wasabi' : '山葵',
      );
      expect(storyReference.description?.[locale].toLowerCase()).toContain(
        localizedProductNames[locale].toLowerCase(),
      );
      expect(detail.caution.map((item) => item[locale]).join(' ')).toMatch(
        locale === 'ja' ? /確認|公式/ : locale === 'en' ? /check|confirm/i : /確認|官方/,
      );
    }
    expect(storyReference.description?.ja).not.toContain('わさびジェラートが名物');
  });

  it('resolves every presentation asset to a bundled local file', () => {
    for (const assetFile of Object.values(referenceAssetFiles)) {
      expect(existsSync(fileURLToPath(new URL(assetFile, import.meta.url)))).toBe(true);
    }
  });
});
