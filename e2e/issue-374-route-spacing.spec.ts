import { expect, test, type Locator, type Page } from '@playwright/test';

const previewPort = process.env.PLAYWRIGHT_PORT ?? '4173';

test.use({
  baseURL: `http://127.0.0.1:${previewPort}`,
  locale: 'ja-JP',
  viewport: { width: 375, height: 812 },
});

async function boundingBox(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box!;
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

const localeExpectations = [
  {
    locale: 'ja',
    mission: /ミッション/,
    stationWalk: '徒歩 約1分',
    followingWalk: '徒歩 約 5 分',
  },
  {
    locale: 'en',
    mission: /Mission/,
    stationWalk: 'About 1 min on foot',
    followingWalk: 'About 5 min on foot',
  },
  {
    locale: 'zh-TW',
    mission: /任務/,
    stationWalk: '步行約 1 分鐘',
    followingWalk: '步行約 5 分鐘',
  },
] as const;

for (const expected of localeExpectations) {
  test(`keeps the segment-less Wasabi Shokudo transition 375px-safe in ${expected.locale} (#374)`, async ({
    page,
  }) => {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/route?candidateId=demo-okutama-wasabi');

    expect(page.viewportSize()).toEqual({ width: 375, height: 812 });

    const route = page.locator('[data-screen="route"][data-screen-active="true"]');
    const tourismOfficeCard = route.locator('[data-spot-id="okutama-tourism-office"]');
    const tourismOfficeStep = route.locator(
      '.tl-step:has([data-spot-id="okutama-tourism-office"])',
    );
    const wasabiCard = route.locator('[data-spot-id="wasabi-kitchen"]');
    const wasabiStep = route.locator('.tl-step:has([data-spot-id="wasabi-kitchen"])');
    const missionBadge = wasabiCard.locator('.mission-tag');
    const nextCard = route.locator('[data-spot-id="okutama-kitchen"]');
    const nextStep = route.locator('.tl-step:has([data-spot-id="okutama-kitchen"])');
    const nextMobilitySegment = nextStep.locator(':scope > .seg');

    await expect(route).toBeVisible();
    await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', expected.locale);
    await expect(tourismOfficeCard).toBeAttached();
    await expect(wasabiCard).toBeAttached();
    await expect(missionBadge).toHaveText(expected.mission);
    await expect(tourismOfficeStep.locator(':scope > .seg')).toHaveText(expected.stationWalk);
    await expect(wasabiStep.locator(':scope > .seg')).toHaveCount(0);
    await expect(nextMobilitySegment).toHaveText(expected.followingWalk);
    await expect(route.getByText(expected.stationWalk, { exact: true })).toHaveCount(1);
    await expect(route.locator('.seg')).toHaveCount(5);
    await expectNoHorizontalOverflow(page);

    const tourismOfficeBox = await boundingBox(tourismOfficeCard);
    const wasabiBox = await boundingBox(wasabiCard);
    const missionBox = await boundingBox(missionBadge);
    const nextSegmentBox = await boundingBox(nextMobilitySegment);
    const nextCardBox = await boundingBox(nextCard);
    const tourismOfficeBottom = tourismOfficeBox.y + tourismOfficeBox.height;
    const wasabiBottom = wasabiBox.y + wasabiBox.height;

    expect(wasabiBox.y - tourismOfficeBottom).toBeGreaterThanOrEqual(16);
    expect(missionBox.y).toBeGreaterThanOrEqual(tourismOfficeBottom);
    expect(nextSegmentBox.y).toBeGreaterThanOrEqual(wasabiBottom);
    expect(nextCardBox.y).toBeGreaterThanOrEqual(nextSegmentBox.y + nextSegmentBox.height);
  });
}
