import { expect, test, type Locator, type Page } from '@playwright/test';

const HACHIOJI = {
  candidateId: 'demo-tokyo-hachioji-ginger',
  foodCultureId: 'hachioji-ginger',
  routeId: 'hachioji-ginger-journey',
  marketId: 'hachioji-takiyama-roadside-station',
  castleId: 'hachioji-takiyama-castle',
} as const;

function activeScreen(page: Page, screen: string): Locator {
  return page.locator(`[data-screen="${screen}"][data-screen-active="true"]`);
}

async function initializeApp(page: Page, locale: 'ja' | 'en' | 'zh-TW' = 'ja'): Promise<void> {
  await page.addInitScript((nextLocale) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('tmm:locale', nextLocale);
  }, locale);
}

const localizedCopy = {
  ja: {
    journeyTitle: '八王子ショウガと滝山の食文化をたどる旅',
    marketName: '道の駅八王子滝山',
    castleName: '滝山城跡',
  },
  en: {
    journeyTitle: 'Hachioji Ginger & Takiyama Food Culture Journey',
    marketName: 'Michi-no-Eki Hachioji Takiyama',
    castleName: 'Takiyama Castle Ruins',
  },
  'zh-TW': {
    journeyTitle: '八王子薑與滝山飲食文化之旅',
    marketName: '道之驛八王子滝山',
    castleName: '滝山城跡',
  },
} as const;

async function expectRenderedLocale(page: Page, locale: 'ja' | 'en' | 'zh-TW'): Promise<void> {
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', locale);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect.poll(() => page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    phoneWidth: document.querySelector<HTMLElement>('.reference-phone')?.clientWidth,
    phoneScrollWidth: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth,
  }))).toEqual({ width: 375, scrollWidth: 375, phoneWidth: 375, phoneScrollWidth: 375 });
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
});

test('keeps Result at two cards while the recovered Hachioji journey resolves without Okutama fallback', async ({ page }) => {
  await initializeApp(page);
  await page.goto('/explore/result');
  const result = activeScreen(page, 'result');
  const cards = result.locator('[data-journey-id]');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toHaveAttribute('data-journey-id', 'demo-okutama-wasabi');
  await expect(cards.nth(1)).toHaveAttribute('data-journey-id', 'demo-okutama-yamame');
  await expect(result.locator(`[data-journey-id="${HACHIOJI.candidateId}"]`)).toHaveCount(0);

  await page.goto('/mogu');
  const moguCard = activeScreen(page, 'mogu').locator(`[data-journey-id="${HACHIOJI.candidateId}"]`);
  await expect(moguCard).toBeVisible();
  await moguCard.click();
  await expect(page).toHaveURL(new RegExp(`/story/${HACHIOJI.foodCultureId}(?:\\?.*)?$`));
  const story = activeScreen(page, 'story');
  await expect(story.locator('h1').first()).toContainText(/八王子|Hachioji/);
  await expect(story).not.toContainText(/奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光案內所/);
  await story.getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
  await expect(page).toHaveURL(new RegExp(`/route\\?candidateId=${HACHIOJI.candidateId}$`));
  const route = activeScreen(page, 'route');
  const marketRouteStop = route.locator(`[data-spot-id="${HACHIOJI.marketId}"]`);
  await expect(marketRouteStop).toBeVisible();
  await expect(route.locator(`[data-spot-id="${HACHIOJI.castleId}"]`)).toBeVisible();
  await expect(route).not.toContainText(/奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光案内所/);
  await marketRouteStop.click();
  await expect(page).toHaveURL(new RegExp(`/spot/${HACHIOJI.marketId}\\?candidateId=${HACHIOJI.candidateId}$`));
  const market = activeScreen(page, 'spot');
  await expect(market).toHaveAttribute('data-spot-id', HACHIOJI.marketId);
  await expect(market).not.toContainText(/奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光案內所/);

  await page.goto(`/spot/${HACHIOJI.castleId}?candidateId=${HACHIOJI.candidateId}`);
  await expect(activeScreen(page, 'spot')).toHaveAttribute('data-spot-id', HACHIOJI.castleId);
});

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test(`renders the Hachioji route and Spots in ${locale} at 375px without overflow`, async ({ page }) => {
    await initializeApp(page, locale);
    await page.goto('/mogu');
    const mogu = activeScreen(page, 'mogu');
    const card = mogu.locator(`[data-journey-id="${HACHIOJI.candidateId}"]`);
    await expectRenderedLocale(page, locale);
    await expect(card).toBeVisible();
    await expect(card.locator('h3')).toHaveText(localizedCopy[locale].journeyTitle);
    await expect(card.locator('[data-verification-status="needs_confirmation"]')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(`/story/${HACHIOJI.foodCultureId}?candidateId=${HACHIOJI.candidateId}`);
    const story = activeScreen(page, 'story');
    await expectRenderedLocale(page, locale);
    await expect(story.locator('h1').first()).toHaveText(localizedCopy[locale].journeyTitle);
    await expectNoHorizontalOverflow(page);

    await page.goto(`/route?candidateId=${HACHIOJI.candidateId}`);
    const route = activeScreen(page, 'route');
    await expectRenderedLocale(page, locale);
    await expect(route.locator('.ghead span')).toHaveText(localizedCopy[locale].journeyTitle);
    await expect(route.locator(`[data-spot-id="${HACHIOJI.marketId}"]`)).toBeVisible();
    await expect(route.locator(`[data-spot-id="${HACHIOJI.castleId}"]`)).toBeVisible();
    await expectNoHorizontalOverflow(page);

    for (const spotId of [HACHIOJI.marketId, HACHIOJI.castleId]) {
      await page.goto(`/spot/${spotId}?candidateId=${HACHIOJI.candidateId}`);
      const spot = activeScreen(page, 'spot');
      await expectRenderedLocale(page, locale);
      await expect(spot).toHaveAttribute('data-spot-id', spotId);
      await expect(spot.locator('h1')).toHaveText(
        spotId === HACHIOJI.marketId ? localizedCopy[locale].marketName : localizedCopy[locale].castleName,
      );
      await expectNoHorizontalOverflow(page);
    }
  });
}

test('fails closed for mismatched Hachioji identities', async ({ page }) => {
  await initializeApp(page);
  await page.goto(`/story/${HACHIOJI.foodCultureId}?candidateId=demo-okutama-wasabi`);
  await expect(page.locator('.reference-app')).toHaveCount(0);
  await expect(page.locator('.page-title')).toBeVisible();
  await expect(activeScreen(page, 'story')).toHaveCount(0);
});
