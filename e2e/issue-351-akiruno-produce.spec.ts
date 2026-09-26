import { expect, test, type Locator, type Page } from '@playwright/test';

const AKIRUNO = {
  candidateId: 'demo-tokyo-west-akiruno-produce',
  storyId: 'produce-akiruno',
  routeId: 'akiruno-seasonal-produce-journey',
  spots: ['akiruno-farmers-center', 'akiruno-seoto-no-yu'],
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

const copy = {
  ja: {
    route: 'あきる野の旬と秋川渓谷をめぐる旅',
    story: '秋川の旬の農産物の物語',
    farmers: '秋川ファーマーズセンター',
    seoto: '秋川渓谷 瀬音の湯',
    access: '東秋留駅',
    half: '3 時間 15 分',
    full: '4 時間 45 分',
    storyCta: 'この食文化の観光ルートを作成する',
    fullDay: '一日',
  },
  en: {
    route: 'Akiruno Seasonal Produce & Akigawa Valley Journey',
    story: 'The Story of Akikawa Seasonal Produce',
    farmers: 'Akikawa Farmers Center',
    seoto: 'Akikawa Keikoku Seoto-no-Yu',
    access: 'Higashi-Akiru Station',
    half: '3 hr 15 min',
    full: '4 hr 45 min',
    storyCta: 'Create a travel route for this food culture',
    fullDay: 'Full day',
  },
  'zh-TW': {
    route: '秋留野當季農產與秋川溪谷之旅',
    story: '秋川當季農產的故事',
    farmers: '秋川 Farmers Center',
    seoto: '秋川溪谷 瀨音之湯',
    access: '東秋留站',
    half: '3 小時 15 分鐘',
    full: '4 小時 45 分鐘',
    storyCta: '為此飲食文化建立觀光路線',
    fullDay: '一日',
  },
} as const;

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
});

test('keeps Result at two fixtures and follows the Akiruno MOGU → Story → Route → Spot identity chain', async ({ page }) => {
  await initializeApp(page);
  await page.goto('/explore/result');
  const result = activeScreen(page, 'result');
  const cards = result.locator('[data-journey-id]');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toHaveAttribute('data-journey-id', 'demo-okutama-wasabi');
  await expect(cards.nth(1)).toHaveAttribute('data-journey-id', 'demo-okutama-yamame');

  await page.goto('/mogu');
  const card = activeScreen(page, 'mogu').locator(`[data-journey-id="${AKIRUNO.candidateId}"]`);
  await expect(card.locator('h3')).toHaveText(copy.ja.route);
  await card.click();
  await expect(page).toHaveURL(new RegExp(`/story/${AKIRUNO.storyId}(?:\\?.*)?$`));
  const story = activeScreen(page, 'story');
  await expect(story.locator('h1').first()).toHaveText(copy.ja.route);
  await story.getByRole('button', { name: copy.ja.storyCta }).click();
  await expect(page).toHaveURL(new RegExp(`/route\\?candidateId=${AKIRUNO.candidateId}$`));

  for (const spotId of AKIRUNO.spots) {
    const route = activeScreen(page, 'route');
    const stop = route.locator(`[data-spot-id="${spotId}"]`);
    await expect(stop).toBeVisible();
    await stop.click();
    await expect(page).toHaveURL(new RegExp(`/spot/${spotId}\\?candidateId=${AKIRUNO.candidateId}$`));
    await expect(activeScreen(page, 'spot')).toHaveAttribute('data-spot-id', spotId);
    await expect(activeScreen(page, 'spot')).not.toContainText(/奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光服務處/);
    if (spotId !== AKIRUNO.spots.at(-1)) await page.goBack();
  }
});

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test(`renders Akiruno Story, both Route variants, and both Spots in ${locale} at 375px`, async ({ page }) => {
    await initializeApp(page, locale);
    await page.goto('/mogu');
    const card = activeScreen(page, 'mogu').locator(`[data-journey-id="${AKIRUNO.candidateId}"]`);
    await expectRenderedLocale(page, locale);
    await expect(card.locator('h3')).toHaveText(copy[locale].route);
    await expect(card.locator('[data-verification-status="needs_confirmation"]')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(`/story/${AKIRUNO.storyId}?candidateId=${AKIRUNO.candidateId}`);
    const story = activeScreen(page, 'story');
    await expectRenderedLocale(page, locale);
    await expect(story.locator('h1').first()).toHaveText(copy[locale].route);
    await expect(story.locator('.story-sec').first()).toContainText(copy[locale].story);
    await expectNoHorizontalOverflow(page);

    await page.goto(`/route?candidateId=${AKIRUNO.candidateId}`);
    const route = activeScreen(page, 'route');
    await expectRenderedLocale(page, locale);
    await expect(route.locator('.ghead span')).toHaveText(copy[locale].route);
    await expect(route.locator('.route-info')).toContainText(copy[locale].access);
    for (const spotId of AKIRUNO.spots) await expect(route.locator(`[data-spot-id="${spotId}"]`)).toBeVisible();
    await expect(route.locator('.route-stats')).toContainText(copy[locale].half);
    await expect(route.locator('.route-stats')).toContainText('2');
    await route.getByRole('button', { name: copy[locale].fullDay }).click();
    await expect(route.locator('.route-stats')).toContainText(copy[locale].full);
    await expect(route.locator('.route-stats')).toContainText('2');
    await expectNoHorizontalOverflow(page);

    for (const [index, spotId] of AKIRUNO.spots.entries()) {
      await page.goto(`/spot/${spotId}?candidateId=${AKIRUNO.candidateId}`);
      const spot = activeScreen(page, 'spot');
      await expectRenderedLocale(page, locale);
      await expect(spot).toHaveAttribute('data-spot-id', spotId);
      await expect(spot.locator('h1')).toHaveText(index === 0 ? copy[locale].farmers : copy[locale].seoto);
      await expect(spot).not.toContainText(/Okutama Tourist Information Center|奧多摩觀光服務處/);
      await expectNoHorizontalOverflow(page);
    }
  });
}

test('fails closed for unknown and contradictory Akiruno identities', async ({ page }) => {
  await initializeApp(page);
  await page.goto(`/story/${AKIRUNO.storyId}?candidateId=demo-okutama-wasabi`);
  await expect(page.locator('.reference-app')).toHaveCount(0);
  await expect(page.locator('.page-title')).toBeVisible();
  await expect(activeScreen(page, 'story')).toHaveCount(0);

  await page.goto(`/spot/${AKIRUNO.spots[0]}?candidateId=unknown-candidate`);
  await expect(page.locator('.reference-app')).toHaveCount(0);
  await expect(activeScreen(page, 'spot')).toHaveCount(0);
});
