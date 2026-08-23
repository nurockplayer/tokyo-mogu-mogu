/**
 * Focused current-SPA route-focus regressions for Issue #208.
 *
 * These checks stay outside the canonical release gate. They protect the
 * current Reference journey's keyboard continuity without defining new
 * navigation or visual behavior.
 */
import { expect, test, type Page } from '@playwright/test';

async function prepareStorage(page: Page, locale?: 'ja' | 'en' | 'zh-TW') {
  await page.addInitScript((selectedLocale) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('tmm:nickname:v1', 'ナナ');
    if (selectedLocale) localStorage.setItem('tmm:locale', selectedLocale);
  }, locale);
}

async function expectRouteFocus(page: Page, accessibleName: string) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const active = document.activeElement as HTMLElement | null;
        return {
          tag: active?.tagName.toLowerCase() ?? null,
          routeFocusTarget: active?.matches('main[data-route-focus-target]') ?? false,
          screen: active?.closest<HTMLElement>('[data-screen]')?.dataset.screen ?? null,
        };
      }),
    )
    .toEqual({ tag: 'main', routeFocusTarget: true, screen: null });

  const target = page.locator('main[data-route-focus-target]');
  await expect(target).toBeFocused();
  await expect(target).toHaveAccessibleName(accessibleName);
  await expect(target).toHaveAttribute('tabindex', '-1');
}

test('moves focus off keyboard-activated controls after current-SPA route changes', async ({
  page,
}) => {
  await prepareStorage(page);
  await page.goto('/');

  const splash = page.locator('[data-screen="splash"][data-screen-active="true"]');
  await splash.focus();
  await expect(splash).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/home$/);
  await expectRouteFocus(page, 'あなただけの食旅を見つけよう!');

  const home = page.locator('[data-screen="home"][data-screen-active="true"]');
  const startExploration = home.getByRole('button', { name: /Let's Go!/ });
  await startExploration.focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/explore$/);
  await expectRouteFocus(page, '食旅を見つけ');

  await page.goBack();
  await expect(page).toHaveURL(/\/home$/);
  await expectRouteFocus(page, 'あなただけの食旅を見つけよう!');

  const moguDockButton = page
    .locator('[data-screen="home"][data-screen-active="true"]')
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'モグモグる' });
  await moguDockButton.focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/mogu$/);
  await expectRouteFocus(page, 'モグモグる');
});

test('focuses a localized announcement target on direct route entry', async ({ page }) => {
  await prepareStorage(page, 'en');
  await page.goto('/explore/result');

  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'en');
  await expectRouteFocus(page, 'We found food journeys that suit you!');
});

test('keeps interactive focus during a query-only route update', async ({ page }) => {
  await prepareStorage(page);
  await page.goto('/route?candidateId=demo-okutama-wasabi');
  await expectRouteFocus(page, 'モデルルート');

  const halfDay = page.getByRole('button', { name: '半日', exact: true });
  await halfDay.focus();
  await expect(halfDay).toBeFocused();

  await page.evaluate(() => {
    window.history.pushState({}, '', '/route?candidateId=demo-okutama-yamame');
    window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
  });

  await expect(page).toHaveURL(/candidateId=demo-okutama-yamame$/);
  await expect(halfDay).toBeFocused();
});

test('keeps the established heading target on a non-Reference route', async ({ page }) => {
  await prepareStorage(page);
  await page.goto('/support');

  const heading = page.locator('main h1');
  await expect(heading).toBeFocused();
  await expect(heading).toHaveAttribute('tabindex', '-1');
});
