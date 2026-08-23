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
