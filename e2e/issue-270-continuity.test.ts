import { expect, test, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';
const TUTORIAL_KEY = 'tmm:tutorial:v1';

async function seedGoldenPath(page: Page): Promise<void> {
  await page.goto('/');
  await page.evaluate(
    ([profileKey, explorationKey, tutorialKey]) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem(
        profileKey,
        JSON.stringify({
          dietary: [],
          dietaryOther: '',
          hasNoRestrictions: true,
          savedAt: '2026-08-22T00:00:00.000Z',
          version: 1,
        }),
      );
      sessionStorage.setItem(
        explorationKey,
        JSON.stringify({
          tastes: ['refreshing'],
          experiences: ['eat'],
          baseArea: 'okutama',
          travelTime: 'within-60',
          interests: ['nature'],
          duration: 'half-day',
        }),
      );
      sessionStorage.setItem(tutorialKey, 'complete');
    },
    [FOOD_PROFILE_KEY, EXPLORATION_KEY, TUTORIAL_KEY] as const,
  );
}

async function expectAtPageTop(page: Page): Promise<void> {
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
}

test.describe('Issue #270 judged-journey navigation continuity', () => {
  test('starts forward screens at the top and restores Route context on Back', async ({ page }) => {
    await seedGoldenPath(page);
    await page.goto('/explore/result');
    await page.getByRole('heading', { name: 'あなたに合う食の旅を見つけました！' }).waitFor();

    await page.evaluate(() => window.scrollTo(0, 420));
    await page.getByRole('link', { name: '東京わさびの物語を読む' }).click();
    await page.waitForURL('**/story/wasabi-okutama*');
    await page.getByRole('heading', { level: 1, name: '東京わさび' }).waitFor();
    await expectAtPageTop(page);

    await page.getByRole('link', { name: 'この食文化の観光ルートを作成する' }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { level: 1, name: '奥多摩わさび紀行' }).waitFor();
    await expectAtPageTop(page);

    const firstStop = page.locator('.s5-timeline__pin-link').first();
    await firstStop.scrollIntoViewIfNeeded();
    const routeScrollY = await page.evaluate(() => window.scrollY);
    expect(routeScrollY).toBeGreaterThan(100);

    await firstStop.click();
    await page.waitForURL('**/spot/okutama-tourism-office*');
    await page.getByRole('heading', { level: 1, name: '奥多摩観光案内所' }).waitFor();
    await expectAtPageTop(page);

    await page.locator('.s6-hero-back').click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { level: 1, name: '奥多摩わさび紀行' }).waitFor();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThanOrEqual(routeScrollY - 2);
  });
});

