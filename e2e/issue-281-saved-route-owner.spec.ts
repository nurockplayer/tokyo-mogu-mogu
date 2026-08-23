/**
 * Focused persistence-owner regression for Issue #281.
 *
 * This stays outside the release gate: it verifies a localStorage no-op that
 * is intentionally specific to the Support panel's saved-route integration.
 */
import { expect, test } from '@playwright/test';

const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const MODEL_ROUTE_ID = 'okutama-wasabi-journey';
const UNRELATED_ROUTE_ID = 'ome-sawai-sake-journey';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    ({ storageKey, savedRoutes }) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem(storageKey, JSON.stringify(savedRoutes));

      let savedRouteWrites = 0;
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function setItem(key: string, value: string): void {
        if (key === storageKey) savedRouteWrites += 1;
        originalSetItem.call(this, key, value);
      };

      Object.assign(window, {
        __issue281SavedRouteWrites: () => savedRouteWrites,
        __issue281ResetSavedRouteWrites: () => {
          savedRouteWrites = 0;
        },
      });
    },
    {
      storageKey: SAVED_ROUTES_KEY,
      savedRoutes: [
        { routeId: MODEL_ROUTE_ID, savedAt: '2026-08-24T00:00:00.000Z' },
        { routeId: UNRELATED_ROUTE_ID, savedAt: '2026-08-24T00:00:00.000Z' },
      ],
    },
  );
});

test('does not rewrite saved routes when Support unsaves an entry removed externally', async ({
  page,
}) => {
  await page.goto('/support');

  const saveToggle = page.getByRole('button', { name: '保存済み' });
  await expect(saveToggle).toHaveAttribute('aria-pressed', 'true');

  await page.evaluate(
    ({ storageKey, unrelatedRouteId }) => {
      localStorage.setItem(
        storageKey,
        JSON.stringify([{ routeId: unrelatedRouteId, savedAt: '2026-08-24T00:00:00.000Z' }]),
      );
      (window as Window & { __issue281ResetSavedRouteWrites: () => void })
        .__issue281ResetSavedRouteWrites();
    },
    { storageKey: SAVED_ROUTES_KEY, unrelatedRouteId: UNRELATED_ROUTE_ID },
  );

  await saveToggle.click();

  await expect(page.getByRole('button', { name: '旅程に保存' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as Window & { __issue281SavedRouteWrites: () => number })
            .__issue281SavedRouteWrites(),
      ),
    )
    .toBe(0);
  await expect
    .poll(() => page.evaluate((storageKey) => localStorage.getItem(storageKey), SAVED_ROUTES_KEY))
    .toBe(JSON.stringify([{ routeId: UNRELATED_ROUTE_ID, savedAt: '2026-08-24T00:00:00.000Z' }]));
});
