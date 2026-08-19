/**
 * Issue #241 browser gates for the selected Fussa and Akiruno lanes.
 *
 * Each lane is exercised through Discover → Story → Route → Spot and through
 * its recommendation Result → Story entry in all shipping locales at the
 * 375px baseline. The source disclosures and editorial estimate copy are
 * intentionally part of the gate so a new route cannot silently inherit the
 * Okutama demo's content.
 */
import { expect, test, type Page } from '@playwright/test';

const LOCALE_KEY = 'tmm:locale';
const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';

const COPY = {
  ja: {
    locale: 'ja-JP',
    fussa: {
      cultureId: 'sake-fussa',
      candidateId: 'demo-tokyo-west-fussa-sake',
      story: '福生の日本酒',
      area: '福生',
      route: '福生の2つの酒蔵と水のまちをめぐる旅',
      spot: '田村酒造場',
      resultCta: '福生の日本酒の物語を読む',
      estimate: '所要時間・滞在時間・移動時間は編集部の目安です。見学・営業・交通の最新情報を確認してください。',
    },
    akiruno: {
      cultureId: 'produce-akiruno',
      candidateId: 'demo-tokyo-west-akiruno-produce',
      story: '秋川の旬の農産物',
      area: 'あきる野',
      route: 'あきる野の旬と秋川渓谷をめぐる旅',
      spot: '秋川ファーマーズセンター',
      resultCta: '秋川の旬の農産物の物語を読む',
      estimate: '所要時間・滞在時間・移動時間は編集部の目安です。季節・営業・交通の最新情報を確認してください。',
    },
    routeCta: 'この食文化の観光ルートを作成する',
    sources: '情報源',
  },
  en: {
    locale: 'en-US',
    fussa: {
      cultureId: 'sake-fussa',
      candidateId: 'demo-tokyo-west-fussa-sake',
      story: 'Fussa Sake',
      area: 'Fussa',
      route: 'Fussa Two Breweries & Water Heritage Journey',
      spot: 'Tamura Shuzojo',
      resultCta: 'Read the Fussa Sake story',
      estimate: 'Total, stay, and travel times are editorial estimates; check current tour, opening, and transport information.',
    },
    akiruno: {
      cultureId: 'produce-akiruno',
      candidateId: 'demo-tokyo-west-akiruno-produce',
      story: 'Akikawa Seasonal Produce',
      area: 'Akiruno',
      route: 'Akiruno Seasonal Produce & Akikawa Valley Journey',
      spot: 'Akikawa Farmers Center',
      resultCta: 'Read the Akikawa Seasonal Produce story',
      estimate: 'Total, stay, and travel times are editorial estimates; check current seasonal, opening, and transport information.',
    },
    routeCta: 'Create a sightseeing route for this food culture',
    sources: 'Sources',
  },
  'zh-TW': {
    locale: 'zh-TW',
    fussa: {
      cultureId: 'sake-fussa',
      candidateId: 'demo-tokyo-west-fussa-sake',
      story: '福生的日本酒',
      area: '福生',
      route: '福生兩座酒藏與水之城之旅',
      spot: '田村酒造場',
      resultCta: '閱讀福生的日本酒的故事',
      estimate: '總時間、停留時間與移動時間為編輯部估算；請確認最新的見學、營業與交通資訊。',
    },
    akiruno: {
      cultureId: 'produce-akiruno',
      candidateId: 'demo-tokyo-west-akiruno-produce',
      story: '秋川當季農產',
      area: 'あきる野',
      route: '秋留野當季農產與秋川溪谷之旅',
      spot: '秋川 Farmers Center',
      resultCta: '閱讀秋川當季農產的故事',
      estimate: '總時間、停留時間與移動時間為編輯部估算；請確認最新的季節、營業與交通資訊。',
    },
    routeCta: '為這項飲食文化建立觀光路線',
    sources: '資料來源',
  },
} as const;

type Locale = keyof typeof COPY;
type Lane = 'fussa' | 'akiruno';

async function setLocale(page: Page, locale: Locale): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= 375)).toBe(true);
}

async function seedRecommendation(page: Page, locale: Locale, lane: Lane): Promise<void> {
  const answers =
    lane === 'fussa'
      ? {
          tastes: ['sweet'],
          experiences: ['meet'],
          interests: ['daily-life'],
        }
      : {
          tastes: ['sweet'],
          experiences: ['buy'],
          interests: ['nature'],
        };

  await page.goto('/');
  await page.evaluate(
    ([localeKey, localeValue, profileKey, explorationKey, explorationAnswers]) => {
      localStorage.setItem(localeKey, localeValue);
      localStorage.setItem(
        profileKey,
        JSON.stringify({
          dietary: [],
          dietaryOther: '',
          hasNoRestrictions: true,
          savedAt: '2026-08-19T00:00:00.000Z',
          version: 1,
        }),
      );
      sessionStorage.setItem(
        explorationKey,
        JSON.stringify({
          ...explorationAnswers,
          baseArea: null,
          travelTime: null,
          duration: 'half-day',
        }),
      );
    },
    [LOCALE_KEY, locale, FOOD_PROFILE_KEY, EXPLORATION_KEY, answers],
  );
}

async function playDiscoverChain(page: Page, locale: Locale, lane: Lane): Promise<void> {
  const copy = COPY[locale][lane];
  const common = COPY[locale];

  await setLocale(page, locale);
  await page.goto('/discover');
  const storyLink = page.getByRole('link', { name: copy.story });
  await expect(storyLink.locator('.discover-card__area')).toHaveText(copy.area);
  await storyLink.click();
  await page.waitForURL(new RegExp(`/story/${copy.cultureId}`));
  await expect(page.getByRole('heading', { name: copy.story })).toBeVisible();
  await expect(page.locator('.s4-sources__summary')).toContainText(common.sources);
  await expectNoHorizontalOverflow(page);

  await page.getByRole('link', { name: common.routeCta }).click();
  await page.waitForURL(/\/route\?/);
  await expect(page.getByRole('heading', { name: copy.route })).toBeVisible();
  await expect(page.locator('.s5-hero__note')).toContainText(copy.estimate);
  await expectNoHorizontalOverflow(page);

  await page.locator('.s5-timeline__pin-link').first().click();
  await page.waitForURL(/\/spot\//);
  await expect(page.getByRole('heading', { name: copy.spot })).toBeVisible();
  await expect(page.locator('.s6-sources__summary')).toContainText(common.sources);
  await expectNoHorizontalOverflow(page);
}

async function playResultChain(page: Page, locale: Locale, lane: Lane): Promise<void> {
  const copy = COPY[locale][lane];

  await seedRecommendation(page, locale, lane);
  await page.goto('/explore/result');
  await expect(page.getByRole('link', { name: copy.resultCta })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole('link', { name: copy.resultCta }).click();
  await page.waitForURL(new RegExp(`/story/${copy.cultureId}`));
  await expect(page.getByRole('heading', { name: copy.story })).toBeVisible();
  await expectNoHorizontalOverflow(page);
}

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test.describe(`Issue #241 selected journeys (${locale}, 375px)`, () => {
    test.use({ locale: COPY[locale].locale });

    for (const lane of ['fussa', 'akiruno'] as const) {
      test(`${lane}: Discover → Story → Route → Spot and Result → Story`, async ({ page }) => {
        await playDiscoverChain(page, locale, lane);
        await playResultChain(page, locale, lane);
      });
    }
  });
}
