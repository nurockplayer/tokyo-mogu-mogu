import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  demoJourneys,
  demoSpots,
  presentationSources,
  referenceAssetFiles,
  referenceCopy,
  type PresentationFacts,
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

  it('resolves every presentation asset to a bundled local file', () => {
    for (const assetFile of Object.values(referenceAssetFiles)) {
      expect(existsSync(fileURLToPath(new URL(assetFile, import.meta.url)))).toBe(true);
    }
  });

  it('keeps operational presentation facts dated, localized, and non-verified (#281)', () => {
    expect(
      Object.fromEntries(
        Object.entries(presentationSources).map(([id, source]) => [id, source.url]),
      ),
    ).toEqual({
      okutamaTourismAssociation: 'https://www.okutama.gr.jp/site/about/',
      okutamaTown: 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/shisetsuosagasu/2/1108.html',
      okutamaTownProfile: 'https://www.town.okutama.tokyo.jp/gyosei/8/chochonoheya/1827.html',
      okutamaEnvironmentPlan: 'https://www.town.okutama.tokyo.jp/material/files/group/9/2024kankyokeikaku.pdf',
      tokyoRegionalWasabi: 'https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_107.html',
      tokyoMokuWasabi: 'https://tokyomokunavi.metro.tokyo.lg.jp/activities/activities03/',
      tokyoWasabiAbout: 'https://tokyowasabi.com/about-us/',
      tokyoWasabiGuide: 'https://tokyowasabi.com/about-wasabi-en/',
      wasabiExperience: 'https://tokyowasabi.com/wasabi-experience/',
      wasabiFoodTruck: 'https://tokyowasabi.com/foodtruck/',
      wasabiFoodTruckSchedule: 'https://tokyowasabi.com/information/2751/260728/',
      yamashiroya: 'https://www.yamasiroya.co.jp/shop.html',
      jrEastOkutamaTimetable: 'https://timetables.jreast.co.jp/timetable/list0368.html',
      tokyoRegionalYamame: 'https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_36.html',
      okutamaFishFarmingCenter: 'https://www.tokyo-aff.or.jp/site/aboutus/1141.html',
      okutamaYamameNamingReport: 'https://www.ifarc.metro.tokyo.lg.jp/archive/resources/content/3355/20130904-170755.pdf',
      okutamaYamameBiologyReport: 'https://www.ifarc.metro.tokyo.lg.jp/archive/resources/content/3355/20130904-170001.pdf',
      okutamaTownYamame: 'https://www.town.okutama.tokyo.jp/gyosei/7/sangyoshinko/norinsuisangyo/2/1736.html',
    });
    for (const source of Object.values(presentationSources)) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.retrievedAt).toBe('2026-08-24');
      expect(source.verificationStatus).toBe('needs_confirmation');
      expect(locales.every((locale) => source.label[locale]?.trim().length > 0)).toBe(true);
    }

    const routeFacts: PresentationFacts[] = demoJourneys
      .flatMap((journey) => journey.routeVariants)
      .map((variant) => variant.facts);
    const spotFacts: PresentationFacts[] = Object.values(demoSpots).map((spot) => spot.facts);
    const sourceUrls = (facts: PresentationFacts): string[] => (
      facts.sources.map((source) => source.url)
    );

    expect(
      Object.fromEntries(
        demoJourneys.flatMap((journey) => journey.routeVariants.map((variant) => [
          `${journey.id}:${variant.id}`,
          sourceUrls(variant.facts),
        ])),
      ),
    ).toEqual({
      'demo-okutama-wasabi:half-day': [
        'https://www.okutama.gr.jp/site/about/',
        'https://www.town.okutama.tokyo.jp/1/kankosangyoka/shisetsuosagasu/2/1108.html',
        'https://tokyowasabi.com/foodtruck/',
        'https://tokyowasabi.com/information/2751/260728/',
        'https://timetables.jreast.co.jp/timetable/list0368.html',
      ],
      'demo-okutama-wasabi:full-day': [
        'https://tokyowasabi.com/wasabi-experience/',
        'https://www.yamasiroya.co.jp/shop.html',
        'https://timetables.jreast.co.jp/timetable/list0368.html',
      ],
      'demo-okutama-yamame:half-day': [
        'https://www.okutama.gr.jp/site/about/',
        'https://www.town.okutama.tokyo.jp/1/kankosangyoka/shisetsuosagasu/2/1108.html',
        'https://timetables.jreast.co.jp/timetable/list0368.html',
      ],
    });

    expect(
      Object.fromEntries(
        Object.entries(demoSpots)
          .filter(([, spot]) => spot.facts.sources.length > 0)
          .map(([spotId, spot]) => [spotId, sourceUrls(spot.facts)]),
      ),
    ).toEqual({
      'okutama-tourism-office': [
        'https://www.okutama.gr.jp/site/about/',
        'https://www.town.okutama.tokyo.jp/1/kankosangyoka/shisetsuosagasu/2/1108.html',
      ],
      yamashiroya: ['https://www.yamasiroya.co.jp/shop.html'],
      'wasabi-kitchen': [
        'https://tokyowasabi.com/foodtruck/',
        'https://tokyowasabi.com/information/2751/260728/',
      ],
      'wasabi-experience': ['https://tokyowasabi.com/wasabi-experience/'],
    });

    expect(routeFacts.every(Boolean)).toBe(true);
    expect(spotFacts.every(Boolean)).toBe(true);
    for (const facts of [...routeFacts, ...spotFacts]) {
      expect(locales.every((locale) => facts.disclosure[locale].trim().length > 0)).toBe(true);
    }

    expect(JSON.stringify({ demoJourneys, demoSpots, presentationSources })).not.toMatch(
      /authoritative Netlify|Netlify の参照画面|依 Netlify 參考畫面/,
    );
  });

  it('keeps both five-chapter Story fixtures source-backed and free of unsupported claims (#281)', () => {
    const journeyById = Object.fromEntries(demoJourneys.map((journey) => [journey.id, journey]));
    const wasabi = journeyById['demo-okutama-wasabi'];
    const yamame = journeyById['demo-okutama-yamame'];

    expect(wasabi?.facts.sources.map((source) => source.url)).toEqual([
      'https://www.town.okutama.tokyo.jp/gyosei/8/chochonoheya/1827.html',
      'https://www.town.okutama.tokyo.jp/material/files/group/9/2024kankyokeikaku.pdf',
      'https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_107.html',
      'https://tokyomokunavi.metro.tokyo.lg.jp/activities/activities03/',
      'https://tokyowasabi.com/about-us/',
      'https://tokyowasabi.com/about-wasabi-en/',
    ]);
    expect(yamame?.facts.sources.map((source) => source.url)).toEqual([
      'https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_36.html',
      'https://www.tokyo-aff.or.jp/site/aboutus/1141.html',
      'https://www.ifarc.metro.tokyo.lg.jp/archive/resources/content/3355/20130904-170755.pdf',
      'https://www.ifarc.metro.tokyo.lg.jp/archive/resources/content/3355/20130904-170001.pdf',
      'https://www.town.okutama.tokyo.jp/gyosei/7/sangyoshinko/norinsuisangyo/2/1736.html',
    ]);

    for (const journey of [wasabi, yamame]) {
      expect(journey).toBeDefined();
      expect(journey?.facts.sources.every(
        (source) => source.retrievedAt === '2026-08-24'
          && source.verificationStatus === 'needs_confirmation',
      )).toBe(true);
      for (const locale of locales) {
        expect(journey?.chapters[locale]).toHaveLength(5);
        expect(journey?.chapters[locale].every(
          (chapter) => chapter.title.trim().length > 0 && chapter.body.trim().length > 0,
        )).toBe(true);
        expect(journey?.facts.disclosure[locale].trim().length).toBeGreaterThan(0);
      }
    }

    expect(wasabi?.copy.en.intro[0]).toContain('225.53 km²');
    expect(wasabi?.copy.en.intro[0]).toContain('94%');
    expect(wasabi?.chapters.en[0]?.body).toContain('Late-Edo records');
    expect(wasabi?.chapters.en[1]?.body).toContain('Wasabi Brothers');
    expect(wasabi?.chapters.en[2]?.body).toContain('about two years');
    expect(wasabi?.chapters.en[3]?.body).toContain('2019 typhoon');

    expect(yamame?.copy.en.title).toBe('A large yamame born from research');
    expect(yamame?.copy.en.intro[0]).toContain('all-female triploid farmed yamame');
    expect(yamame?.copy.en.intro[1]).toContain('Irikawa and Unazawa');
    expect(yamame?.chapters.en[0]?.body).toBe(
      'The product name for the all-female triploid yamame was selected in July 1998 and presented as a new brand in Okutama that November.',
    );
    expect(yamame?.chapters.en[2]?.body).toContain('does not become sexually mature or produce eggs');
    expect(yamame?.chapters.en[3]?.body).toContain('lives longer and grows larger');

    expect(JSON.stringify({
      copy: demoJourneys.map((journey) => journey.copy),
      chapters: demoJourneys.map((journey) => journey.chapters),
    })).not.toMatch(
      /デイビッド・ヒューム|約10人|30代|約1年半|塩や醤油|生産者の収入|約120年|4代目|山梨出身|病気に弱い|養殖研究施設が2か所|希少な川魚|日帰り中心|宿泊客|David Hume|rare river fish|two research facilities|faster growth|two facilities|珍稀河魚|兩處研究設施/,
    );
  });
});
