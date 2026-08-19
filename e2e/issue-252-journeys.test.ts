/**
 * Issue #252 productization smoke coverage: the enabled five-journey choice
 * surface and the Okutama golden-path entry remain usable at the 375px
 * baseline in every supported locale.
 */
import { test, expect, type Page } from '@playwright/test';

const LOCALE_KEY = 'tmm:locale';
const JOURNEY_CANDIDATES = [
  'demo-okutama-wasabi',
  'demo-ome-sake',
  'demo-tokyo-hachioji-ginger',
  'demo-tokyo-west-fussa-sake',
  'demo-tokyo-west-akiruno-produce',
] as const;

async function setLocale(page: Page, locale: 'ja' | 'en' | 'zh-TW'): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= 375)).toBe(true);
}

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test.describe(`Issue #252 multi-journey surface (${locale}, 375px)`, () => {
    test.use({ locale: locale === 'ja' ? 'ja-JP' : locale === 'zh-TW' ? 'zh-TW' : 'en-US' });

    test('shows every enabled journey with route metadata and keeps all destinations reachable', async ({
      page,
    }) => {
      await setLocale(page, locale);
      await page.goto('/discover');

      const journeyCards = page.locator('.journey-card');
      await expect(journeyCards).toHaveCount(5);
      await expect(page.locator('.journey-meta__facts')).toHaveCount(5);
      await expect(page.locator('.journey-meta__places')).toHaveCount(5);

      const hrefs = await page.locator('a.journey-card__link').evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')),
      );
      for (const candidateId of JOURNEY_CANDIDATES) {
        expect(hrefs.some((href) => href?.includes(`candidateId=${candidateId}`))).toBe(true);
      }

      // The directory is secondary, not removed: it still exposes every
      // route-derived destination when the disclosure is opened.
      await page.locator('.discover-destinations__summary').click();
      const destinationLinks = page.locator('.discover-destinations .discover-link');
      await expect(destinationLinks).toHaveCount(16);
      await expectNoHorizontalOverflow(page);
    });

    test('keeps the Okutama Golden Path entry coherent from Story to Spot', async ({ page }) => {
      await setLocale(page, locale);
      await page.goto('/story/wasabi-okutama?candidateId=demo-okutama-wasabi');
      await page.locator('a[href^="/route?"]').first().click();
      await page.waitForURL(/\/route\?/);
      await expect(page.locator('.s5-hero__title')).toBeVisible();
      await page.locator('.s5-timeline__pin-link').first().click();
      await page.waitForURL(/\/spot\//);
      await expect(page.locator('h1')).toBeVisible();
      await expectNoHorizontalOverflow(page);
    });
  });
}
