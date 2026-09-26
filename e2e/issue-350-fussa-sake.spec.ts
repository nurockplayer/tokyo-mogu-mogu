import { expect, test, type Locator, type Page } from '@playwright/test';

const FUSSA = {
  candidateId: 'demo-tokyo-west-fussa-sake',
  storyId: 'sake-fussa',
  routeId: 'fussa-sake-journey',
  spots: ['fussa-tamura-shuzo', 'fussa-kurumiru', 'fussa-ishikawa-shuzo'],
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
    route: '福生の2つの酒蔵と水のまちをめぐる旅',
    story: '福生の日本酒の物語',
    tamura: '田村酒造場',
    kurumiru: 'くるみる ふっさ',
    ishikawa: '石川酒造',
    access: '福生駅',
    half: '3 時間 15 分',
    full: '4 時間 25 分',
  },
  en: {
    route: 'Fussa Two Breweries & Water Heritage Journey',
    story: 'The Story of Fussa Sake',
    tamura: 'Tamura Shuzojo',
    kurumiru: 'Kurumiru Fussa Tourist Information Center',
    ishikawa: 'Ishikawa Brewery',
    access: 'Fussa Station',
    half: '3 hr 15 min',
    full: '4 hr 25 min',
  },
  'zh-TW': {
    route: '福生兩座酒藏與水之城之旅',
    story: '福生日本酒的故事',
    tamura: '田村酒造場',
    kurumiru: 'くるみる ふっさ',
    ishikawa: '石川酒造',
    access: '福生站',
    half: '3 小時 15 分鐘',
    full: '4 小時 25 分鐘',
  },
} as const;

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
});

test('keeps Result at two fixtures and follows the Fussa MOGU → Story → Route → all Spots identity chain', async ({ page }) => {
  await initializeApp(page);
  await page.goto('/explore/result');
  const result = activeScreen(page, 'result');
  const cards = result.locator('[data-journey-id]');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toHaveAttribute('data-journey-id', 'demo-okutama-wasabi');
  await expect(cards.nth(1)).toHaveAttribute('data-journey-id', 'demo-okutama-yamame');

  await page.goto('/mogu');
  const mogu = activeScreen(page, 'mogu');
  const fussaCard = mogu.locator(`[data-journey-id="${FUSSA.candidateId}"]`);
  await expect(fussaCard).toBeVisible();
  await expect(fussaCard.locator('h3')).toHaveText(copy.ja.route);
  await fussaCard.click();
  await expect(page).toHaveURL(new RegExp(`/story/${FUSSA.storyId}(?:\\?.*)?$`));
  const story = activeScreen(page, 'story');
  await expect(story.locator('h1').first()).toHaveText(copy.ja.route);
  await expect(story).not.toContainText(/奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光服務處/);
  await story.getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
  await expect(page).toHaveURL(new RegExp(`/route\\?candidateId=${FUSSA.candidateId}$`));

  for (const [index, spotId] of FUSSA.spots.entries()) {
    if (index > 0) await page.goto(`/route?candidateId=${FUSSA.candidateId}`);
    const route = activeScreen(page, 'route');
    const stop = route.locator(`[data-spot-id="${spotId}"]`);
    await expect(stop).toBeVisible();
    await stop.click();
    await expect(page).toHaveURL(new RegExp(`/spot/${spotId}\\?candidateId=${FUSSA.candidateId}$`));
    const spot = activeScreen(page, 'spot');
    await expect(spot).toHaveAttribute('data-spot-id', spotId);
    await expect(spot.locator('h1')).toHaveText(index === 0 ? copy.ja.tamura : index === 1 ? copy.ja.kurumiru : copy.ja.ishikawa);
    await expect(spot).not.toContainText(/奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光服務處/);
  }
});

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test(`renders Fussa MOGU, Story, both Route variants, and all Spots in ${locale} at 375px`, async ({ page }) => {
    await initializeApp(page, locale);
    await page.goto('/mogu');
    const mogu = activeScreen(page, 'mogu');
    const card = mogu.locator(`[data-journey-id="${FUSSA.candidateId}"]`);
    await expectRenderedLocale(page, locale);
    await expect(card.locator('h3')).toHaveText(copy[locale].route);
    await expect(card.locator('[data-verification-status="needs_confirmation"]')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(`/story/${FUSSA.storyId}?candidateId=${FUSSA.candidateId}`);
    const story = activeScreen(page, 'story');
    await expectRenderedLocale(page, locale);
    await expect(story.locator('h1').first()).toHaveText(copy[locale].route);
    await expect(story.locator('.story-sec').first()).toContainText(copy[locale].story);
    await expect(story).not.toContainText(/Okutama Tourist Information Center|奧多摩觀光服務處/);
    await expectNoHorizontalOverflow(page);

    await page.goto(`/route?candidateId=${FUSSA.candidateId}`);
    const route = activeScreen(page, 'route');
    await expectRenderedLocale(page, locale);
    await expect(route.locator('.ghead span')).toHaveText(copy[locale].route);
    await expect(route.locator('.route-info')).toContainText(copy[locale].access);
    for (const spotId of FUSSA.spots) await expect(route.locator(`[data-spot-id="${spotId}"]`)).toBeVisible();
    await expect(route.locator('.route-stats')).toContainText(copy[locale].half);
    await expect(route.locator('.route-stats')).toContainText('3');
    await route.getByRole('button', { name: locale === 'ja' ? '一日' : locale === 'en' ? 'Full day' : '一日' }).click();
    await expect(route.locator('.route-stats')).toContainText(copy[locale].full);
    await expect(route.locator('.route-stats')).toContainText('3');
    for (const spotId of FUSSA.spots) await expect(route.locator(`[data-spot-id="${spotId}"]`)).toBeVisible();
    await expectNoHorizontalOverflow(page);

    for (const [index, spotId] of FUSSA.spots.entries()) {
      await page.goto(`/spot/${spotId}?candidateId=${FUSSA.candidateId}`);
      const spot = activeScreen(page, 'spot');
      await expectRenderedLocale(page, locale);
      await expect(spot).toHaveAttribute('data-spot-id', spotId);
      await expect(spot.locator('h1')).toHaveText(index === 0 ? copy[locale].tamura : index === 1 ? copy[locale].kurumiru : copy[locale].ishikawa);
      await expect(spot).not.toContainText(/Okutama Tourist Information Center|奧多摩觀光服務處/);
      await expectNoHorizontalOverflow(page);
    }
  });
}

test('fails closed for unknown and contradictory Fussa identities', async ({ page }) => {
  await initializeApp(page);
  await page.goto(`/story/${FUSSA.storyId}?candidateId=demo-okutama-wasabi`);
  await expect(page.locator('.reference-app')).toHaveCount(0);
  await expect(page.locator('.page-title')).toBeVisible();
  await expect(activeScreen(page, 'story')).toHaveCount(0);

  await page.goto(`/spot/${FUSSA.spots[0]}?candidateId=unknown-candidate`);
  await expect(page.locator('.reference-app')).toHaveCount(0);
  await expect(activeScreen(page, 'spot')).toHaveCount(0);
});
