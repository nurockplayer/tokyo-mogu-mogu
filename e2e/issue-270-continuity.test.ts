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

async function seedGuidedProfile(page: Page): Promise<void> {
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
      sessionStorage.removeItem(explorationKey);
      sessionStorage.setItem(tutorialKey, 'active');
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

    const storyRouteAction = page.getByRole('link', {
      name: 'この食文化の観光ルートを作成する',
    });
    await storyRouteAction.scrollIntoViewIfNeeded();
    const storyScrollY = await page.evaluate(() => window.scrollY);
    expect(storyScrollY).toBeGreaterThan(100);

    await storyRouteAction.click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { level: 1, name: '奥多摩わさび紀行' }).waitFor();
    await expectAtPageTop(page);

    await page.locator('.s5-figma-header__back').click();
    await page.waitForURL('**/story/wasabi-okutama*');
    await page.getByRole('heading', { level: 1, name: '東京わさび' }).waitFor();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThanOrEqual(storyScrollY - 2);

    await storyRouteAction.click();
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

  test('carries truthful Okutama fieldwork photography through Story, Route, and Spot', async ({ page }) => {
    await seedGoldenPath(page);

    await page.goto('/story/wasabi-okutama?candidateId=demo-okutama-wasabi');
    const storyRail = page.getByRole('region', { name: '奥多摩の景色' });
    await expect(storyRail).toBeVisible();
    await expect(storyRail.locator('img')).toHaveCount(3);
    await expect(storyRail.locator('.s4-fieldwork__rail')).toHaveCSS(
      'scroll-snap-type',
      'x mandatory',
    );
    const storyRailGeometry = await storyRail.locator('.s4-fieldwork__rail').evaluate((rail) => {
      const cards = Array.from(rail.children) as HTMLElement[];
      return {
        viewportWidth: document.documentElement.clientWidth,
        firstCardWidth: cards[0]?.getBoundingClientRect().width ?? 0,
        secondCardLeft: cards[1]?.getBoundingClientRect().left ?? Number.POSITIVE_INFINITY,
      };
    });
    expect(storyRailGeometry.firstCardWidth).toBeGreaterThanOrEqual(
      storyRailGeometry.viewportWidth * 0.72,
    );
    expect(storyRailGeometry.secondCardLeft).toBeLessThan(storyRailGeometry.viewportWidth);

    await page.getByRole('link', { name: 'この食文化の観光ルートを作成する' }).click();
    await page.waitForURL('**/route*');
    await expect(
      page.getByRole('img', { name: '奥多摩観光案内所の内観' }),
    ).toBeVisible();

    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '奥多摩観光案内所' })
      .click();
    await page.waitForURL('**/spot/okutama-tourism-office*');

    const gallery = page.getByRole('region', { name: '奥多摩観光案内所の写真' });
    const wasapyThumb = gallery.getByRole('button', {
      name: '写真を表示: 案内所のわさぴー',
    });
    await expect(gallery.getByRole('button')).toHaveCount(3);
    await expect(wasapyThumb).toHaveAttribute('aria-pressed', 'false');
    await wasapyThumb.click();
    await expect(wasapyThumb).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('img', { name: '奥多摩観光案内所のわさぴー' }),
    ).toBeVisible();
    await expect(page.locator('.s6-gallery__caption')).toContainText(
      '東京わさびをモチーフにした「わさぴー」',
    );

    const widths = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  });

  test('lets a single-choice reply visibly settle before revealing the next turn', async ({ page }) => {
    await seedGuidedProfile(page);
    await page.goto('/explore');

    const currentQuestion = page.getByRole('heading', {
      level: 1,
      name: '今回は、どんな食体験をしてみたいですか？',
    });
    const choice = page.getByRole('button', { name: '食べる' });
    await choice.click();

    await expect(choice).toHaveAttribute('aria-pressed', 'true');
    await expect(currentQuestion).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 1, name: 'どこから出発しますか？' }),
    ).toBeVisible();
  });

  test('keeps the primary Story action in the initial Result viewport', async ({ page }) => {
    await seedGoldenPath(page);
    await page.goto('/explore/result');
    await page.getByRole('heading', { name: 'あなたに合う食の旅を見つけました！' }).waitFor();

    const primaryCard = page.locator('.tmm-result-ranking__item').first();
    const primaryAction = primaryCard.getByRole('link', {
      name: '東京わさびの物語を読む',
    });
    await expect(primaryAction).toBeInViewport({ ratio: 1 });

    const [actionBox, navBox] = await Promise.all([
      primaryAction.boundingBox(),
      page.locator('.tmm-nav').boundingBox(),
    ]);
    expect(actionBox).not.toBeNull();
    expect(navBox).not.toBeNull();
    expect((actionBox?.y ?? 0) + (actionBox?.height ?? 0)).toBeLessThanOrEqual(
      (navBox?.y ?? 0) - 8,
    );
  });
});
