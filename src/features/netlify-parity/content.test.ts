import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { PLACES } from '../../data/seed-places';
import { isFixedPlace } from '../../data/model';
import {
  demoJourneys,
  demoSpots,
  referenceAssetFiles,
  referenceCopy,
} from './content';
import {
  buildWasabiExperiencePresentation,
  localizePlaceClosedDays,
  localizePlaceClosureConflict,
  localizePlaceParking,
  localizePlacePhoneConflict,
  localizePlaceProductCategories,
  referenceSpotDetails,
  routeRegionGuidance,
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

  it('separates the Ome meeting place from Okutama journey grouping (#328)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'wasabi-experience');
    const journey = demoJourneys.find((candidate) => candidate.id === 'demo-okutama-wasabi');

    expect(place).toMatchObject({
      nameJa: 'WASABI EXPERIENCE',
      address: '〒198-0147 東京都青梅市御岳1-192-4',
      coordinatePrecision: 'approximate',
      foodCultureIds: ['wasabi-okutama'],
      visitorInformation: {
        access: { stationJa: 'JR青梅線「御嶽駅」', walkMinutes: 7 },
        experienceTour: {
          seasonalMeetingTimes: [
            { season: 'may-september', time: '08:30' },
            { season: 'october-april', time: '11:00' },
          ],
          meetingTimeMayChange: true,
          bookingRequestRequiresConfirmation: true,
          weekendHolidayAvailability: 'request-only',
          listedPrice: {
            amountYen: 19500,
            taxIncluded: true,
            conditionalPrice: {
              amountYen: 14500,
              eligibility: 'japan-resident-and-japanese-conversation',
            },
            surcharge: {
              amountYen: 5000,
              appliesOn: expect.arrayContaining(['weekends', 'public-holidays']),
            },
          },
          durationConflict: {
            verificationStatus: 'conflict',
            statements: [
              expect.objectContaining({ id: 'japanese-page', durationMinutes: { min: 120, max: 150 } }),
              expect.objectContaining({ id: 'english-page', durationMinutes: { min: 120, max: 120 } }),
            ],
          },
        },
      },
    });
    expect(place?.coordinateSource?.url).toContain('google.com/maps');
    expect(journey?.regionId).toBe('okutama');
    expect(demoSpots['wasabi-experience'].regionId).toBe('okutama');
  });

  it('derives seasonal Wasabi Experience guidance without a timeless 8:30 claim (#328)', () => {
    const detail = referenceSpotDetails['wasabi-experience'];
    const routeStep = routeStepText['demo-okutama-wasabi:full-day'].find(
      (step) => step.spotId === 'wasabi-experience',
    );

    expect(detail?.information).toEqual(expect.arrayContaining([
      expect.objectContaining({ fieldId: 'address', value: expect.objectContaining({ ja: expect.stringContaining('青梅市御岳') }) }),
      expect.objectContaining({ fieldId: 'seasonal_meeting_times', value: expect.objectContaining({ ja: expect.stringContaining('5〜9月 8:30') }) }),
      expect.objectContaining({ fieldId: 'booking_destination', value: expect.objectContaining({ en: expect.stringContaining('#booking-form') }) }),
    ]));
    expect(detail?.guide?.url).toBe('https://tokyowasabi.com/wasabi-experience/#booking-form');
    expect(routeStep?.walk?.ja).toContain('5〜9月 8:30');
    expect(routeStep?.walk?.ja).toContain('10〜4月 11:00');
    expect(routeStep?.walk?.ja).not.toBe('集合 8:30');
    expect(routeRegionGuidance['demo-okutama-wasabi:full-day'].ja).toContain('青梅・御岳');
    expect(routeRegionGuidance['demo-okutama-wasabi:half-day'].ja).not.toContain('青梅・御岳');
  });

  it('flows canonical Wasabi Experience changes through localized presentation (#328)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'wasabi-experience');
    if (!place || !isFixedPlace(place)) throw new Error('Missing fixed Wasabi Experience Place.');
    const changed = structuredClone(place);
    const visitor = changed.visitorInformation;
    const tour = visitor?.experienceTour;
    const access = visitor?.access;
    if (!tour || !access) throw new Error('Missing Wasabi Experience visitor facts.');

    tour.seasonalMeetingTimes = [
      { season: 'may-september', time: '09:15' },
      { season: 'october-april', time: '12:30' },
    ];
    tour.privateGroupsPerDay = 2;
    tour.listedPrice.amountYen = 22000;
    tour.listedPrice.conditionalPrice = undefined;
    tour.listedPrice.surcharge = undefined;
    access.walkMinutes = 9;
    changed.source.retrievedAt = '2027-01-02';
    const japaneseDuration = tour.durationConflict.statements.find(
      (statement) => statement.id === 'japanese-page',
    );
    const englishDuration = tour.durationConflict.statements.find(
      (statement) => statement.id === 'english-page',
    );
    if (!japaneseDuration || !englishDuration) throw new Error('Missing duration statements.');
    japaneseDuration.durationMinutes = { min: 150, max: 180 };
    englishDuration.durationMinutes = { min: 135, max: 135 };

    const presentation = buildWasabiExperiencePresentation(changed);

    expect(presentation.seasonalTimes.ja).toContain('5〜9月 9:15／10〜4月 12:30');
    expect(presentation.stationDescription.en).toContain('About 9 min');
    expect(presentation.privateGroupLimit.en).toContain('2 groups daily');
    expect(presentation.duration.en).toContain('about 2.5–3 hours');
    expect(presentation.duration.en).toContain('about 2.25 hours');
    expect(presentation.price.en).toContain('¥22,000');
    expect(presentation.price.en).not.toContain('conditions and surcharges apply');
    expect(presentation.verificationNote.en).toContain('Jan 2, 2027');
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

  it('derives Wasabi Shokudo Spot, Route, and Story as a mobile venue (#324)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'wasabi-kitchen');
    const detail = referenceSpotDetails['wasabi-kitchen'];
    const routeStep = routeStepText['demo-okutama-wasabi:half-day'].find(
      (step) => step.spotId === 'wasabi-kitchen',
    );
    const storyReference = storySpotGroups['demo-okutama-wasabi'].nearby.find(
      (reference) => reference.spotId === 'wasabi-kitchen',
    );
    const routePresentation = demoJourneys.find((journey) => journey.id === 'demo-okutama-wasabi')
      ?.routeVariants.find((variant) => variant.id === 'half-day')
      ?.steps.find((step) => step.spotId === 'wasabi-kitchen');

    expect(place).toMatchObject({ locationKind: 'mobile', type: 'food-truck' });
    expect(detail).toBeDefined();
    expect(routeStep).toBeDefined();
    expect(storyReference).toBeDefined();
    if (!place || place.locationKind !== 'mobile' || !detail || !routeStep || !storyReference) {
      throw new Error('Missing source-backed Wasabi Shokudo mobile presentation.');
    }

    expect(detail.information.map((row) => row.fieldId)).toEqual(expect.arrayContaining([
      'venue_model',
      'operating_area',
      'schedule_guidance',
      'schedule_url',
      'price_availability',
      'schedule_conflict',
      'official_current_url',
    ]));
    expect(detail.information.map((row) => row.fieldId)).not.toContain('address');
    expect(detail.information.find((row) => row.fieldId === 'operating_area')?.value).toEqual({
      ja: 'JR青梅線「奥多摩駅」前を中心',
      en: 'Mainly around the front of JR Okutama Station',
      'zh-TW': '主要在 JR 奧多摩站前一帶出攤',
    });
    expect(detail.guide?.url).toBe('https://tokyowasabi.com/category/information/');
    expect(place.mobileVenue.scheduleDirectorySource.url).toBe(
      'https://tokyowasabi.com/category/information/',
    );
    expect(place.mobileVenue.datedScheduleSource.url).toBe(
      'https://tokyowasabi.com/information/2751/260728/',
    );
    expect(demoSpots['wasabi-kitchen']).toMatchObject({
      imageAssetId: 'wasabiHero',
      thumbnailAssetIds: ['eatIllustration', 'originIllustration'],
    });
    expect(routePresentation?.imageAssetId).toBe('wasabiHero');
    expect(storyReference.imageAssetId).toBe('wasabiHero');
    expect([
      demoSpots['wasabi-kitchen'].imageAssetId,
      ...demoSpots['wasabi-kitchen'].thumbnailAssetIds,
      routePresentation?.imageAssetId,
      storyReference.imageAssetId,
    ]).not.toContain('wasabiKitchen');
    expect(routeStep).not.toHaveProperty('walk');
    expect(routeStep).not.toHaveProperty('note');

    for (const locale of locales) {
      const spotCopy = [
        demoSpots['wasabi-kitchen'].copy[locale].lead,
        detail.description[locale],
        ...detail.information.map((row) => row.value[locale]),
        ...detail.caution.map((item) => item[locale]),
      ].join(' ');
      const routeCopy = routeStep.description[locale];
      const storyCopy = `${storyReference.badge[locale]} ${storyReference.description?.[locale]}`;

      expect(`${spotCopy} ${routeCopy} ${storyCopy}`).toMatch(
        locale === 'ja' ? /キッチンカー|FOOD TRUCK/ : locale === 'en' ? /food truck/i : /行動餐車|餐車/,
      );
      expect(`${spotCopy} ${routeCopy} ${storyCopy}`).toMatch(
        locale === 'ja' ? /最新.*予定|公式.*予定/ : locale === 'en' ? /current.*schedule|official.*schedule/i : /最新.*行程|官方.*行程/,
      );
      expect(routeCopy).not.toMatch(
        locale === 'ja' ? /土日のみ|平日はあかべこ|¥900〜/ : locale === 'en' ? /weekends only|Akabeko.*weekdays|from ¥900/i : /僅週末|平日.*AKABEKO|¥900 起/,
      );
    }
    expect(detail.information.find((row) => row.fieldId === 'price_availability')?.value.ja)
      .toContain('2026年7月');
    expect(detail.information.find((row) => row.fieldId === 'schedule_conflict')?.value.ja)
      .toContain('不一致');
    expect(storyReference.badge).toEqual({
      ja: 'FOOD TRUCK',
      en: 'FOOD TRUCK',
      'zh-TW': '行動餐車',
    });
  });

  it('derives PORT OKUTAMA Spot, Route, and Story facts from the canonical Place (#327)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'port-okutama');
    const visitor = place?.visitorInformation;
    const detail = referenceSpotDetails['port-okutama'];
    const halfDayStep = routeStepText['demo-okutama-wasabi:half-day'].find(
      (step) => step.spotId === 'port-okutama',
    );
    const fullDayStep = routeStepText['demo-okutama-wasabi:full-day'].find(
      (step) => step.spotId === 'port-okutama',
    );
    const storyReference = storySpotGroups['demo-okutama-wasabi'].nearby.find(
      (reference) => reference.spotId === 'port-okutama',
    );

    expect(place).toBeDefined();
    expect(visitor).toBeDefined();
    expect(detail).toBeDefined();
    if (!place || !visitor || !detail || !halfDayStep || !fullDayStep || !storyReference) {
      throw new Error('Missing source-backed PORT OKUTAMA presentation.');
    }

    expect(demoSpots['port-okutama'].copy.ja.name).toBe(place.nameJa);
    for (const [fieldId, expected] of [
      ['name', place.nameJa],
      ['address', place.address],
      ['phone', visitor.phone],
      ['official_current_url', place.source.url],
    ] as const) {
      expect(detail.information.find((row) => row.fieldId === fieldId)?.value.ja).toBe(expected);
    }
    expect(detail.information.find((row) => row.fieldId === 'hours')?.value).toEqual({
      ja: '平日 11:00〜17:00（L.O. 16:30）／土日祝 11:00〜17:30（L.O. 17:00）',
      en: 'Weekdays 11:00–17:00 (L.O. 16:30) / Weekends & holidays 11:00–17:30 (L.O. 17:00)',
      'zh-TW': '平日 11:00–17:00（最後點餐 16:30）／週末及國定假日 11:00–17:30（最後點餐 17:00）',
    });
    expect(detail.information.find((row) => row.fieldId === 'closed_days')?.value.ja)
      .toBe('無休（不定休あり・最新情報を確認）');
    expect(detail.information.find((row) => row.fieldId === 'service_availability')?.value.ja)
      .toContain('食事・スペシャルティコーヒー・クラフトビール');

    for (const locale of locales) {
      expect(halfDayStep.description[locale]).toMatch(
        locale === 'ja' ? /コーヒー|食事/ : locale === 'en' ? /coffee|food/i : /咖啡|餐飲/,
      );
      expect(fullDayStep.description[locale]).toMatch(
        locale === 'ja' ? /コーヒー/ : locale === 'en' ? /coffee/i : /咖啡/,
      );
      expect(storyReference.description?.[locale]).toMatch(
        locale === 'ja' ? /複合ショップ/ : locale === 'en' ? /combined shop/i : /複合商店/,
      );
      expect(detail.caution.map((item) => item[locale]).join(' ')).toMatch(
        locale === 'ja' ? /公式|確認/ : locale === 'en' ? /official|check/i : /官方|確認/,
      );
    }
    expect(halfDayStep.walk).toEqual({
      ja: '徒歩 約 5 分',
      en: 'About 5 min on foot',
      'zh-TW': '步行約 5 分鐘',
    });
  });

  it('derives Akabeko Spot, Route, and Story facts without resolving its phone conflict (#326)', () => {
    const place = PLACES.find((candidate) => candidate.id === 'akabeko');
    const visitor = place?.visitorInformation;
    const detail = referenceSpotDetails.akabeko;
    const wasabiRouteStep = routeStepText['demo-okutama-wasabi:full-day'].find(
      (step) => step.spotId === 'akabeko',
    );
    const yamameRouteStep = routeStepText['demo-okutama-yamame:half-day'].find(
      (step) => step.spotId === 'akabeko',
    );
    const wasabiStory = storySpotGroups['demo-okutama-wasabi'].nearby.find(
      (reference) => reference.spotId === 'akabeko',
    );
    const yamameStory = storySpotGroups['demo-okutama-yamame'].nearby.find(
      (reference) => reference.spotId === 'akabeko',
    );

    expect(place).toBeDefined();
    expect(visitor).toBeDefined();
    expect(detail).toBeDefined();
    if (!place || !visitor || !detail || !wasabiRouteStep || !yamameRouteStep || !wasabiStory || !yamameStory) {
      throw new Error('Missing source-backed Akabeko presentation.');
    }

    expect(demoSpots.akabeko.copy.ja.name).toBe(place.nameJa);
    const phone = localizePlacePhoneConflict(visitor.phoneConflict?.statements ?? []);
    expect(detail.information.find((row) => row.fieldId === 'phone')?.value).toEqual(phone);
    for (const locale of locales) {
      expect(phone[locale]).toContain('050-5304-3644');
      expect(phone[locale]).toContain('0428-83-2365');
      expect(phone[locale]).toMatch(
        locale === 'ja' ? /利用する番号.*未確認/ : locale === 'en' ? /which number to use.*unconfirmed/i : /應使用哪個號碼.*尚未確認/,
      );
      expect(detail.caution.map((item) => item[locale]).join(' ')).toMatch(
        locale === 'ja' ? /2つの電話番号|公式/ : locale === 'en' ? /two phone|official/i : /兩個電話|官方/,
      );
      expect(detail.caution.map((item) => item[locale]).join(' ')).toMatch(
        locale === 'ja' ? /050.*0428.*荒澤屋共通/ : locale === 'en' ? /050.*0428.*shared with Arasawaya/i : /050.*0428.*與荒澤屋共用/,
      );
    }

    expect(detail.information.find((row) => row.fieldId === 'hours')?.value).toEqual({
      ja: 'ランチ 11:30〜L.O. 13:30／ディナー 18:00〜L.O. 20:00',
      en: 'Lunch 11:30–L.O. 13:30 / Dinner 18:00–L.O. 20:00',
      'zh-TW': '午餐 11:30–最後點餐 13:30／晚餐 18:00–最後點餐 20:00',
    });
    expect(detail.information.find((row) => row.fieldId === 'reservation')?.value.ja)
      .toContain('予約推奨');
    expect(wasabiRouteStep.description.ja).toContain(
      visitor.mealHourSchedules?.find((schedule) => schedule.id === 'lunch')?.lastOrder ?? '',
    );
    expect(yamameRouteStep.description.ja).toContain('奥多摩ヤマメ');
    expect(yamameRouteStep.description.ja).toContain('60分');
    for (const locale of locales) {
      expect(wasabiStory.description?.[locale]).toMatch(
        locale === 'ja' ? /ヤマメ|こんにゃく|わさびジェラート/ : locale === 'en' ? /yamame|konnyaku|wasabi gelato/i : /山女魚|蒟蒻|山葵義式冰淇淋/,
      );
      expect(yamameStory.description?.[locale]).toMatch(
        locale === 'ja' ? /刺身.*炭火焼/ : locale === 'en' ? /sashimi.*charcoal-grilled/i : /生魚片.*炭火烤/,
      );
    }
    expect(yamameStory.description?.ja).not.toMatch(/味噌|山椒/);
  });

  it('resolves every presentation asset to a bundled local file', () => {
    for (const assetFile of Object.values(referenceAssetFiles)) {
      expect(existsSync(fileURLToPath(new URL(assetFile, import.meta.url)))).toBe(true);
    }
  });
});
