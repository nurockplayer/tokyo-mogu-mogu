/**
 * Issue #252 public-beta gate.
 *
 * Every shipping journey must be understandable in Discover, selectable from
 * Result, and usable through Story -> Route -> Spot at the 375px baseline in
 * all supported locales.
 */
import { test, expect, type Page } from '@playwright/test';

const LOCALE_KEY = 'tmm:locale';
const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';

type Locale = 'ja' | 'en' | 'zh-TW';

const LOCALES: ReadonlyArray<{ value: Locale; browser: string; browse: string }> = [
  { value: 'ja', browser: 'ja-JP', browse: '登録なし、自分で見てみる' },
  { value: 'en', browser: 'en-US', browse: 'No registration, let me browse' },
  { value: 'zh-TW', browser: 'zh-TW', browse: '免註冊，自己逛逛看' },
];

const JOURNEYS = [
  {
    candidateId: 'demo-okutama-wasabi',
    cultureId: 'wasabi-okutama',
    answers: { tastes: ['refreshing'], experiences: ['eat'], interests: ['nature'], duration: 'half-day' },
    golden: true,
  },
  {
    candidateId: 'demo-ome-sake',
    cultureId: 'sake-ome',
    answers: { tastes: ['rich'], experiences: ['buy'], interests: ['tradition'], duration: 'full-day' },
    golden: false,
  },
  {
    candidateId: 'demo-tokyo-hachioji-ginger',
    cultureId: 'hachioji-ginger',
    answers: { tastes: ['rich'], experiences: ['buy'], interests: ['daily-life'], duration: 'half-day' },
    golden: false,
  },
  {
    candidateId: 'demo-tokyo-west-fussa-sake',
    cultureId: 'sake-fussa',
    answers: { tastes: ['sweet'], experiences: ['meet'], interests: ['daily-life'], duration: 'half-day' },
    golden: false,
  },
  {
    candidateId: 'demo-tokyo-west-akiruno-produce',
    cultureId: 'produce-akiruno',
    answers: { tastes: ['sweet'], experiences: ['buy'], interests: ['nature'], duration: 'half-day' },
    golden: false,
  },
] as const;

async function setLocale(page: Page, locale: Locale): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
}

async function seedRecommendation(
  page: Page,
  locale: Locale,
  answers: (typeof JOURNEYS)[number]['answers'],
): Promise<void> {
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
          savedAt: '2026-08-20T00:00:00.000Z',
          version: 1,
        }),
      );
      sessionStorage.setItem(
        explorationKey,
        JSON.stringify({ ...explorationAnswers, baseArea: null, travelTime: null }),
      );
    },
    [LOCALE_KEY, locale, FOOD_PROFILE_KEY, EXPLORATION_KEY, answers],
  );
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(async () => {
    await document.fonts.ready;
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
}

async function expectPrimaryNav(page: Page): Promise<void> {
  const hrefs = await page.locator('.tmm-nav a').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  );
  expect(hrefs).toEqual(['/', '/discover', '/mogu', '/my']);
}

for (const locale of LOCALES) {
  test.describe(`Issue #252 launch journey matrix (${locale.value}, 375px)`, () => {
    test.use({ locale: locale.browser });

    test('makes accountless browse and the established primary IA actionable', async ({ page }) => {
      await setLocale(page, locale.value);
      await page.goto('/food-profile');
      await page.getByRole('button', { name: locale.browse }).click();
      await page.waitForURL('**/discover');
      await expectPrimaryNav(page);
      await expectNoHorizontalOverflow(page);
    });

    test('plays all five Discover -> Story -> Route -> Spot chains without identity loss', async ({
      page,
    }) => {
      test.setTimeout(90_000);
      await setLocale(page, locale.value);

      for (const journey of JOURNEYS) {
        await page.goto('/discover');
        const journeyLink = page.locator(
          `a.journey-card__link[href*="candidateId=${journey.candidateId}"]`,
        );
        await expect(journeyLink).toBeVisible();
        await expect(journeyLink.locator('.journey-meta__facts')).toBeVisible();
        await expect(journeyLink.locator('.journey-meta__places')).toBeVisible();
        await journeyLink.click();

        await page.waitForURL(new RegExp(`/story/${journey.cultureId}\\?.*candidateId=${journey.candidateId}`));
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expectPrimaryNav(page);

        const routeLink = page.locator(
          `a[href^="/route?"][href*="candidateId=${journey.candidateId}"]`,
        ).first();
        await expect(routeLink).toBeVisible();
        await routeLink.click();
        await page.waitForURL(new RegExp(`/route\\?.*candidateId=${journey.candidateId}`));
        await expect(page.locator('.s5-hero__title')).toBeVisible();
        await expectPrimaryNav(page);

        await page.locator('.s5-timeline__pin-link').first().click();
        await page.waitForURL(new RegExp(`/spot/[^?]+\\?.*candidateId=${journey.candidateId}`));
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expect(page.locator('.s6-sources__summary')).toBeVisible();
        await expect(page.locator('.s6-actions a.tmm-btn--primary').first()).toHaveAttribute(
          'href',
          /^https:\/\//,
        );
        await expectPrimaryNav(page);
        await expectNoHorizontalOverflow(page);

        await page.locator('a.s6-back').click();
        await page.waitForURL(new RegExp(`/route\\?.*candidateId=${journey.candidateId}`));
      }
    });

    test('shows all five Results without fake non-golden scores', async ({ page }) => {
      test.setTimeout(60_000);

      for (const journey of JOURNEYS) {
        await seedRecommendation(page, locale.value, journey.answers);
        await page.goto('/explore/result');

        const storyLink = page.locator(
          `a[href^="/story/${journey.cultureId}"][href*="candidateId=${journey.candidateId}"]`,
        );
        await expect(storyLink).toBeVisible();
        await expect(page.locator('.journey-meta__route')).toBeVisible();
        await expect(page.locator('.tmm-result__summary-desc')).toContainText('5');
        await expect(page.locator('.tmm-result-card--hero .tmm-result-match')).toHaveCount(
          journey.golden ? 1 : 0,
        );
        await expect(page.locator('.tmm-result-card--hero .tmm-result-match__note')).toHaveCount(
          journey.golden ? 1 : 0,
        );
        await expectPrimaryNav(page);
        await expectNoHorizontalOverflow(page);
      }
    });
  });
}

test.describe('Issue #252 post-profile browse entry (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('routes the saved-profile browse choice to Discover', async ({ page }) => {
    await page.goto('/food-profile');
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByTestId('fp-modal-submit').click();
    for (let step = 0; step < 4; step += 1) {
      await page.getByRole('button', { name: '送信' }).click();
    }
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.getByRole('button', { name: '自分で旅を探す' }).click();
    await page.waitForURL('**/discover');
  });
});
