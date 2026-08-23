/**
 * Focused current-product regression for Issue #281's Result identity guard.
 *
 * A malformed Result identity must resolve to the queryless current Reference
 * Result instead of reaching the historical ranked Result screen.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(
      'tmm:foodProfile:v1',
      JSON.stringify({
        dietary: [],
        dietaryOther: '',
        hasNoRestrictions: true,
        savedAt: '2026-08-24T00:00:00.000Z',
        version: 1,
      }),
    );
    sessionStorage.setItem(
      'tmm:exploration:v1',
      JSON.stringify({
        tastes: ['refreshing', 'spicy'],
        experiences: ['eat'],
        baseArea: 'tokyo-west',
        travelTime: 'over-60',
        interests: ['nature', 'tradition'],
        duration: 'half-day',
      }),
    );
  });
});

test('canonicalizes a mismatched Result identity instead of exposing the obsolete ranked UI', async ({
  page,
}) => {
  await page.goto('/explore/result?candidateId=demo-okutama-wasabi&resultId=sake-ome');

  await expect(
    page.getByRole('heading', { name: 'あなたへのおすすめ Top 3' }),
  ).not.toBeVisible();
  await expect(page).toHaveURL(/\/explore\/result$/);
  await expect(
    page.locator('[data-screen="result"][data-screen-active="true"]'),
  ).toBeVisible();
});

test('keeps an unknown explicit Route candidate on the honest not-found surface', async ({ page }) => {
  await page.goto('/route?candidateId=unknown-candidate');

  await expect(page).toHaveURL(/\/route\?candidateId=unknown-candidate$/);
  await expect(page.getByRole('heading', { name: /ルートが見つかりません|Route not found/ })).toBeVisible();
  await expect(page.locator('[data-screen="route"][data-screen-active="true"]')).toHaveCount(0);
});

test('canonicalizes an empty Route identity to the current Route', async ({ page }) => {
  await page.goto('/route?routeId=');

  await expect(page).toHaveURL(/\/route$/);
  await expect(page.locator('[data-screen="route"][data-screen-active="true"]')).toBeVisible();
});

test('keeps an explicit stale Route identity on the honest not-found surface', async ({ page }) => {
  await page.goto('/route?routeId=stale-route');

  await expect(page).toHaveURL(/\/route\?routeId=stale-route$/);
  await expect(page.getByRole('heading', { name: /ルートが見つかりません|Route not found/ })).toBeVisible();
  await expect(page.locator('[data-screen="route"][data-screen-active="true"]')).toHaveCount(0);
});

test('canonicalizes contradictory repeated current candidate identities', async ({ page }) => {
  await page.goto(
    '/route?candidateId=demo-okutama-wasabi&candidateId=demo-okutama-yamame&routeId=okutama-wasabi-journey',
  );

  await expect(page).toHaveURL(/\/route$/);
  await expect(
    page.locator('[data-screen="route"][data-screen-active="true"]'),
  ).toBeVisible();
  await expect(page.locator('.tmm-page')).toHaveCount(0);
});

test('accepts identical repeated current candidate identities as one value', async ({ page }) => {
  const search =
    '?candidateId=demo-okutama-wasabi&candidateId=demo-okutama-wasabi&routeId=okutama-wasabi-journey';
  await page.goto(`/route${search}`);

  await expect(page).toHaveURL(`/route${search}`);
  await expect(
    page.locator('[data-screen="route"][data-screen-active="true"]'),
  ).toBeVisible();
});

test('keeps identical repeated stale Route identities on the honest not-found surface', async ({
  page,
}) => {
  const search = '?routeId=stale-route&routeId=stale-route';
  await page.goto(`/route${search}`);

  await expect(page).toHaveURL(`/route${search}`);
  await expect(
    page.getByRole('heading', { name: /ルートが見つかりません|Route not found/ }),
  ).toBeVisible();
  await expect(page.locator('[data-screen="route"][data-screen-active="true"]')).toHaveCount(0);
});

test.describe('known current Route tuple conflicts', () => {
  for (const [description, search] of [
    [
      'yamame candidate with the wasabi route',
      '?candidateId=demo-okutama-yamame&routeId=okutama-wasabi-journey',
    ],
    [
      'wasabi candidate with the yamame route',
      '?candidateId=demo-okutama-wasabi&routeId=okutama-yamame-journey',
    ],
  ] as const) {
    test(`canonicalizes ${description} to the current Route`, async ({ page }) => {
      await page.goto(`/route${search}`);

      await expect(page).toHaveURL(/\/route$/);
      await expect(
        page.locator('[data-screen="route"][data-screen-active="true"]'),
      ).toBeVisible();
      await expect(page.locator('.tmm-page')).toHaveCount(0);
    });
  }
});

test('removes contradictory known current context before a Spot can forward it to Route', async ({
  page,
}) => {
  await page.goto(
    '/spot/okutama-tourism-office?candidateId=demo-okutama-yamame&resultId=yamame-okutama&routeId=okutama-wasabi-journey',
  );

  await expect(page).toHaveURL(/\/spot\/okutama-tourism-office$/);
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expect(spot).toBeVisible();

  await spot.locator('button.fab-back').click();

  await expect(page).toHaveURL(/\/route$/);
  await expect(
    page.locator('[data-screen="route"][data-screen-active="true"]'),
  ).toBeVisible();
  await expect(page.locator('.tmm-page')).toHaveCount(0);
});

test.describe('valid complete current Spot contexts', () => {
  for (const [description, search] of [
    [
      'wasabi',
      '?candidateId=demo-okutama-wasabi&resultId=wasabi-okutama&routeId=okutama-wasabi-journey',
    ],
    [
      'yamame',
      '?candidateId=demo-okutama-yamame&resultId=yamame-okutama&routeId=okutama-yamame-journey',
    ],
  ] as const) {
    test(`keeps the ${description} Spot context usable`, async ({ page }) => {
      await page.goto(`/spot/okutama-tourism-office${search}`);

      const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
      await expect(spot).toBeVisible();
      await expect(page).toHaveURL(`/spot/okutama-tourism-office${search}`);

      await spot.locator('button.fab-back').click();

      await expect(page).toHaveURL(`/route${search}`);
      await expect(
        page.locator('[data-screen="route"][data-screen-active="true"]'),
      ).toBeVisible();
    });
  }
});
