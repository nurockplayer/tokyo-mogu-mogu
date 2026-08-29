import { expect, test, type Locator } from '@playwright/test';

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

test('keeps the segment-less Wasabi Shokudo transition separated at 375px (#374)', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('tmm:locale', 'ja');
  });
  await page.goto('/route?candidateId=demo-okutama-wasabi');

  expect(page.viewportSize()).toEqual({ width: 375, height: 812 });

  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  const tourismOfficeCard = route.locator('[data-spot-id="okutama-tourism-office"]');
  const tourismOfficeStep = tourismOfficeCard.locator('..').locator('..');
  const wasabiCard = route.locator('[data-spot-id="wasabi-kitchen"]');
  const wasabiStep = wasabiCard.locator('..').locator('..');
  const missionBadge = wasabiCard.locator('.mission-tag');
  const nextCard = route.locator('[data-spot-id="okutama-kitchen"]');
  const nextStep = nextCard.locator('..').locator('..');
  const nextMobilitySegment = nextStep.locator(':scope > .seg');

  await expect(tourismOfficeCard).toBeAttached();
  await expect(wasabiCard).toBeAttached();
  await expect(missionBadge).toHaveText(/ミッション/);
  await expect(tourismOfficeStep.locator(':scope > .seg')).toHaveText('徒歩 約1分');
  await expect(wasabiStep.locator(':scope > .seg')).toHaveCount(0);
  await expect(nextMobilitySegment).toHaveText('徒歩 約 5 分');
  await expect(route.getByText('徒歩 約1分', { exact: true })).toHaveCount(1);
  await expect(route.locator('.seg')).toHaveCount(5);

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
