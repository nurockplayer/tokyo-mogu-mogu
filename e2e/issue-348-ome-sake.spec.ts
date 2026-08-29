import { expect, test, type Locator, type Page } from '@playwright/test';

const previewPort = process.env.PLAYWRIGHT_PORT ?? '4173';

test.use({
  baseURL: `http://127.0.0.1:${previewPort}`,
  locale: 'ja-JP',
  viewport: { width: 375, height: 812 },
});

const OME_SAKE = {
  candidateId: 'demo-ome-sake',
  foodCultureId: 'sake-ome',
  routeId: 'ome-sawai-sake-journey',
  representativeSpotId: 'sawai-ozawa-shuzo',
} as const;

const okutamaFallbackName =
  /奥多摩観光案内所|Okutama Tourist Information Center|奧多摩觀光案內所/;

function activeScreen(page: Page, screen: string): Locator {
  return page.locator(`[data-screen="${screen}"][data-screen-active="true"]`);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        phoneClientWidth: document.querySelector<HTMLElement>('.reference-phone')?.clientWidth,
        phoneScrollWidth: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth,
      })),
    )
    .toEqual({
      documentClientWidth: 375,
      documentScrollWidth: 375,
      phoneClientWidth: 375,
      phoneScrollWidth: 375,
    });
}

async function expectUnavailableMedia(container: Locator): Promise<void> {
  await expect(container.locator('[data-media-state="unavailable"]')).toBeVisible();
  await expect(container.locator('img')).toHaveCount(0);
}

async function seedLocale(page: Page, locale: 'ja' | 'en' | 'zh-TW'): Promise<void> {
  await page.goto('/');
  await page.evaluate((nextLocale) => {
    localStorage.clear();
    localStorage.setItem('tmm:locale', nextLocale);
  }, locale);
}

test('opens the recovered Ome/Sawai journey from MOGU through Story, Route, and Spot', async ({
  page,
}) => {
  await page.goto('/mogu');

  const mogu = activeScreen(page, 'mogu');
  const omeCard = mogu.locator(`[data-journey-id="${OME_SAKE.candidateId}"]`);
  await expect(omeCard).toBeVisible();
  await expect(omeCard.getByLabel(/マッチ度 \d+%/)).toHaveCount(0);
  await expectUnavailableMedia(omeCard.locator('.ph'));
  await omeCard.click();

  await expect(page).toHaveURL(new RegExp(`/story/${OME_SAKE.foodCultureId}(?:\\?.*)?$`));
  const story = activeScreen(page, 'story');
  await expect(story.locator('h1').first()).toContainText(/青梅|沢井|Ome|Sawai/i);
  await expectUnavailableMedia(story.locator('.story-hero'));
  await expect(story.locator('[data-spot-id="okutama-tourism-office"]')).toHaveCount(0);
  await story
    .getByRole('button', { name: 'この食文化の観光ルートを作成する' })
    .click();

  await expect(page).toHaveURL(
    new RegExp(`/route\\?candidateId=${OME_SAKE.candidateId}$`),
    { timeout: 4_000 },
  );
  const route = activeScreen(page, 'route');
  const representativeSpot = route.locator(
    `[data-spot-id="${OME_SAKE.representativeSpotId}"]`,
  );
  await expect(representativeSpot).toBeVisible();
  await expectUnavailableMedia(route.locator('.route-map'));
  await expect(route.getByText(/所要時間と移動順は編集部による目安/)).toBeVisible();
  await expect(route.locator('[data-spot-id="okutama-tourism-office"]')).toHaveCount(0);
  await representativeSpot.click();

  await expect(page).toHaveURL(
    new RegExp(
      `/spot/${OME_SAKE.representativeSpotId}\\?candidateId=${OME_SAKE.candidateId}$`,
    ),
  );
  const spot = activeScreen(page, 'spot');
  await expect(spot).toHaveAttribute('data-spot-id', OME_SAKE.representativeSpotId);
  await expect(spot.getByRole('heading', { level: 1 })).toContainText(/小澤酒造|Ozawa Shuzo/);
  await expectUnavailableMedia(spot.locator('.spot-hero'));
  await expect(spot).not.toContainText(okutamaFallbackName);
});

test('resolves a direct Ome Story path in the current UI without Okutama fallback', async ({
  page,
}) => {
  await page.goto(`/story/${OME_SAKE.foodCultureId}`);

  const app = page.locator('.reference-app');
  const story = activeScreen(page, 'story');
  await expect(app).toHaveAttribute('data-pathname', `/story/${OME_SAKE.foodCultureId}`);
  await expect(story.locator('h1').first()).toContainText(/青梅|沢井|Ome|Sawai/i);
  await expect(story.locator('[data-spot-id="okutama-tourism-office"]')).toHaveCount(0);
  await expect(story).not.toContainText(okutamaFallbackName);
});

test('resolves direct Ome candidate and Route identities without Okutama fallback', async ({
  page,
}) => {
  await page.goto(`/route?routeId=${OME_SAKE.routeId}`);

  const route = activeScreen(page, 'route');
  await expect(
    route.locator(`[data-spot-id="${OME_SAKE.representativeSpotId}"]`),
  ).toBeVisible();
  await expect(route.locator('[data-spot-id="okutama-tourism-office"]')).toHaveCount(0);
  await expect(route).not.toContainText(okutamaFallbackName);
});

test('resolves a direct Ome Spot path and candidate identity without Okutama fallback', async ({
  page,
}) => {
  await page.goto(`/spot/${OME_SAKE.representativeSpotId}`);

  const spot = activeScreen(page, 'spot');
  await expect(spot).toHaveAttribute('data-spot-id', OME_SAKE.representativeSpotId);
  await expect(spot.getByRole('heading', { level: 1 })).toContainText(/小澤酒造|Ozawa Shuzo/);
  await expect(spot).not.toContainText(okutamaFallbackName);
  await spot.getByRole('button', { name: '戻る' }).click();
  await expect(activeScreen(page, 'route').locator(
    `[data-spot-id="${OME_SAKE.representativeSpotId}"]`,
  )).toBeVisible();
  await expect(activeScreen(page, 'route')).not.toContainText(okutamaFallbackName);
});

const conflictingJourneyLocations = [
  {
    label: 'candidate and route query identities',
    path: `/route?candidateId=${OME_SAKE.candidateId}&routeId=okutama-wasabi-journey`,
  },
  {
    label: 'candidate and result query identities',
    path: `/route?candidateId=${OME_SAKE.candidateId}&resultId=wasabi-okutama`,
  },
  {
    label: 'route and result query identities',
    path: `/route?routeId=${OME_SAKE.routeId}&resultId=wasabi-okutama`,
  },
  {
    label: 'Story path and candidate query identities',
    path: `/story/${OME_SAKE.foodCultureId}?candidateId=demo-okutama-wasabi`,
  },
  {
    label: 'Ome Spot path and candidate query identities',
    path: `/spot/${OME_SAKE.representativeSpotId}?candidateId=demo-okutama-wasabi`,
  },
  {
    label: 'Okutama Spot path and candidate query identities',
    path: '/spot/okutama-tourism-office?candidateId=demo-ome-sake',
  },
] as const;

for (const conflict of conflictingJourneyLocations) {
  test(`fails closed for conflicting ${conflict.label}`, async ({ page }) => {
    await page.goto(conflict.path);

    await expect(page.locator('.reference-app')).toHaveCount(0);
    await expect(page.locator('.page-title')).toBeVisible();
    await expect(activeScreen(page, 'story')).toHaveCount(0);
    await expect(activeScreen(page, 'route')).toHaveCount(0);
    await expect(activeScreen(page, 'spot')).toHaveCount(0);
  });
}

test('keeps Result limited to the two current recommendation cards', async ({ page }) => {
  await page.goto('/explore/result');

  const result = activeScreen(page, 'result');
  const resultCards = result.locator('[data-journey-id]');
  await expect(resultCards).toHaveCount(2);
  await expect(resultCards.nth(0)).toHaveAttribute('data-journey-id', 'demo-okutama-wasabi');
  await expect(resultCards.nth(1)).toHaveAttribute('data-journey-id', 'demo-okutama-yamame');
  await expect(result.locator(`[data-journey-id="${OME_SAKE.candidateId}"]`)).toHaveCount(0);
});

const localizedJourneyIdentity = [
  {
    locale: 'ja',
    title: /青梅|沢井/,
    transfer: /JR青梅線.*バス.*ケーブルカー.*徒歩.*編集部目安/,
    garden: /生原酒のタンク量り売り/,
  },
  {
    locale: 'en',
    title: /Ome|Sawai/i,
    transfer: /JR Ome Line.*bus.*cable car.*walking.*editorial estimate/i,
    garden: /sells nama genshu from a tank by volume/i,
  },
  {
    locale: 'zh-TW',
    title: /青梅|沢井/,
    transfer: /JR青梅線.*巴士.*纜車.*步行.*編輯部參考/,
    garden: /販售桶裝生原酒/,
  },
] as const;

for (const expected of localizedJourneyIdentity) {
  test(`keeps the recovered journey 375px-safe in ${expected.locale}`, async ({ page }) => {
    await seedLocale(page, expected.locale);

    await page.goto('/mogu');
    await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', expected.locale);
    await expect(
      activeScreen(page, 'mogu').locator(`[data-journey-id="${OME_SAKE.candidateId}"]`),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(
      `/story/${OME_SAKE.foodCultureId}?candidateId=${OME_SAKE.candidateId}`,
    );
    const story = activeScreen(page, 'story');
    await expect(story.locator('h1').first()).toContainText(expected.title);
    await expectNoHorizontalOverflow(page);

    await page.goto(`/route?candidateId=${OME_SAKE.candidateId}`);
    const route = activeScreen(page, 'route');
    await expect(route.locator(
      `[data-spot-id="${OME_SAKE.representativeSpotId}"]`,
    )).toBeVisible();
    const transfer = route.locator('.seg').filter({ hasText: expected.transfer });
    await transfer.scrollIntoViewIfNeeded();
    await expect(transfer).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(
      `/spot/${OME_SAKE.representativeSpotId}?candidateId=${OME_SAKE.candidateId}`,
    );
    await expect(activeScreen(page, 'spot')).toHaveAttribute(
      'data-spot-id',
      OME_SAKE.representativeSpotId,
    );
    await expectNoHorizontalOverflow(page);

    await page.goto(`/spot/sawanoien-garden?candidateId=${OME_SAKE.candidateId}`);
    const garden = activeScreen(page, 'spot');
    await expect(garden).toHaveAttribute('data-spot-id', 'sawanoien-garden');
    await expect(garden.locator('.desc')).toContainText(expected.garden);
    await expectNoHorizontalOverflow(page);
  });
}
