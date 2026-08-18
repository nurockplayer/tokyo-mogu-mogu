/**
 * Hachioji × Hachioji ginger playable-slice browser gate (Issue #238).
 *
 * The slice must remain reachable through the same Discover → Story → Route →
 * Spot chain in each shipping locale at the 375px mobile baseline. The test
 * also checks that the market action points at the official facility site and
 * that the new geography does not introduce horizontal overflow.
 */
import { test, expect, type Page } from '@playwright/test';

const LOCALE_KEY = 'tmm:locale';
const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';

const COPY = {
  ja: {
    locale: 'ja-JP',
    story: '八王子ショウガと八王子野菜',
    route: '八王子ショウガと滝山の食文化をたどる旅',
    market: '道の駅八王子滝山',
    cta: '八王子の旅を見る',
    resultCta: '八王子ショウガと八王子野菜の物語を読む',
    estimate: '所要時間・滞在時間・徒歩時間は編集部の目安です。現地の案内と当日の状況を確認してください。',
    sources: '情報源',
  },
  en: {
    locale: 'en-US',
    story: 'Hachioji Ginger & Local Produce',
    route: 'Hachioji Ginger & Takiyama Food Culture Journey',
    market: 'Michi-no-Eki Hachioji Takiyama',
    cta: 'Start the Hachioji journey',
    resultCta: 'Read the Hachioji Ginger & Local Produce story',
    estimate: 'Total, stay, and walking times are editorial estimates; check local guidance and conditions on the day.',
    sources: 'Sources',
  },
  'zh-TW': {
    locale: 'zh-TW',
    story: '八王子薑與八王子在地蔬菜',
    route: '八王子薑與滝山飲食文化之旅',
    market: '道之驛八王子滝山',
    cta: '展開八王子之旅',
    resultCta: '閱讀八王子薑與八王子在地蔬菜的故事',
    estimate: '總時間、停留時間與步行時間為編輯部估算；請確認現地指引與當日狀況。',
    sources: '資料來源',
  },
} as const;

async function setLocale(page: Page, locale: keyof typeof COPY): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= 375)).toBe(true);
}

async function seedHachiojiRecommendation(page: Page, locale: keyof typeof COPY): Promise<void> {
  await page.goto('/');
  await page.evaluate(([localeKey, localeValue, profileKey, explorationKey]) => {
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
        tastes: ['rich'],
        experiences: ['buy'],
        baseArea: null,
        travelTime: null,
        interests: ['daily-life'],
        duration: 'full-day',
      }),
    );
  }, [LOCALE_KEY, locale, FOOD_PROFILE_KEY, EXPLORATION_KEY]);
}

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test.describe(`Hachioji ginger playable journey (${locale}, 375px)`, () => {
    test.use({ locale: COPY[locale].locale });

    test('plays Discover → Story → Route → Spot with official market action', async ({ page }) => {
      const copy = COPY[locale];
      await setLocale(page, locale);

      await page.goto('/discover');
      await page.getByRole('link', { name: copy.story }).click();
      await page.waitForURL(/\/story\/hachioji-ginger/);
      await expect(page.getByRole('heading', { name: copy.story })).toBeVisible();
      await expect(page.locator('body')).toContainText(copy.story);
      await expectNoHorizontalOverflow(page);

      await page.getByRole('link', { name: copy.cta }).click();
      await page.waitForURL(/\/route\?/);
      await expect(page.getByRole('heading', { name: copy.route })).toBeVisible();
      await expect(page.getByText(copy.estimate)).toBeVisible();
      await expectNoHorizontalOverflow(page);

      await page.locator('.s5-timeline__pin-link').first().click();
      await page.waitForURL(/\/spot\/hachioji-takiyama-roadside-station/);
      await expect(page.getByRole('heading', { name: copy.market })).toBeVisible();
      await expect(
        page.locator('.s6-actions a[href="https://www.michinoeki-hachioji.net/"]'),
      ).toBeVisible();
      await expect(page.locator('.s6-sources__summary')).toContainText(copy.sources);
      await expectNoHorizontalOverflow(page);
    });

    test('reaches the same Hachioji story from the recommendation Result', async ({ page }) => {
      const copy = COPY[locale];
      await seedHachiojiRecommendation(page, locale);

      await page.goto('/explore/result');
      await expect(page.getByRole('link', { name: copy.resultCta })).toBeVisible();
      await expectNoHorizontalOverflow(page);

      await page.getByRole('link', { name: copy.resultCta }).click();
      await page.waitForURL(/\/story\/hachioji-ginger/);
      await expect(page.getByRole('heading', { name: copy.story })).toBeVisible();
      await expectNoHorizontalOverflow(page);
    });
  });
}
