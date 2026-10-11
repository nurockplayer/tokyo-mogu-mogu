/**
 * Focused iOS viewport regressions for Issue #408.
 *
 * Measured on a real iPhone (iOS 27.0.1, Safari 27 Compact layout and Chrome
 * 155): `100vh` resolves to the large viewport (Safari 815px, Chrome 841px)
 * while the visible viewport is 775px / 742px. The base `body` min-height of
 * `100vh` therefore gave the viewport-locked shell 40–99px of document scroll,
 * which shifted the whole app under the browser toolbars. Chrome also shrinks
 * the viewport to 400px while the keyboard is open.
 *
 * Desktop engines resolve `100vh` to the visible viewport, so the iOS delta is
 * emulated by sizing `body` with `100lvh` plus the measured 99px difference.
 * This is not proof of real-device behavior; see Issue #408 for device evidence.
 */
import { expect, test, type Browser, type Page } from '@playwright/test';

const iosLargeViewportDelta = 99;

async function openPage(browser: Browser, baseURL: string | undefined, withProfile = true): Promise<Page> {
  const context = await browser.newContext({ baseURL, locale: 'ja-JP' });
  const page = await context.newPage();
  await page.addInitScript((seedProfile) => {
    localStorage.clear();
    sessionStorage.clear();
    if (!seedProfile) return;
    localStorage.setItem('tmm:nickname:v1', 'ナナ');
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
  }, withProfile);
  return page;
}

/** Whether the control is fully inside its clipping box and the viewport, and receives hits. */
async function isReachable(page: Page, selector: string, clipSelector: string) {
  return page.locator(selector).evaluate((control, clip) => {
    const bounds = control.closest(clip)!.getBoundingClientRect();
    const rect = control.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return rect.top >= bounds.top - 0.5
      && rect.bottom <= bounds.bottom + 0.5
      && rect.top >= -0.5
      && rect.bottom <= window.innerHeight + 0.5
      && hit !== null
      && control.contains(hit);
  }, clipSelector);
}

for (const browserName of ['chromium', 'webkit'] as const) {
  test.describe(`${browserName}`, () => {
    let browser: Browser;
    let page: Page;

    test.beforeEach(async ({ playwright, baseURL }) => {
      browser = await playwright[browserName].launch();
      page = await openPage(browser, baseURL);
    });

    test.afterEach(async () => {
      await browser.close();
    });

    test('keeps the shell in place when vh resolves to the iOS large viewport', async () => {
      for (const viewport of [
        { width: 430, height: 775 },
        { width: 430, height: 742 },
        { width: 375, height: 667 },
      ]) {
        await page.setViewportSize(viewport);
        for (const path of ['/home', '/explore', '/story', '/spot/wasabi-kitchen', '/my']) {
          await page.goto(path);
          const screen = page.locator('[data-screen-active="true"]');
          await expect(screen).toBeVisible();
          await page.addStyleTag({
            content: `body { min-height: calc(100lvh + ${iosLargeViewportDelta}px); }`,
          });

          const state = await page.evaluate(() => {
            window.scrollTo(0, 40);
            const phone = document.querySelector<HTMLElement>('.reference-phone')!.getBoundingClientRect();
            const result = {
              scrollY: window.scrollY,
              documentScrollHeight: document.documentElement.scrollHeight,
              documentClientHeight: document.documentElement.clientHeight,
              phoneTop: phone.top,
              phoneBottom: phone.bottom,
            };
            window.scrollTo(0, 0);
            return result;
          });

          expect(state, `${path} at ${viewport.width}x${viewport.height}`).toEqual({
            scrollY: 0,
            documentScrollHeight: viewport.height,
            documentClientHeight: viewport.height,
            phoneTop: 0,
            phoneBottom: viewport.height,
          });
        }
      }
    });

    test('lets every departure suggestion scroll into the sheet on short viewports', async () => {
      // 430x400 is the measured iOS Chrome viewport with the keyboard open;
      // 667x375 is a landscape phone.
      for (const viewport of [
        { width: 430, height: 400 },
        { width: 667, height: 375 },
      ]) {
        await page.setViewportSize(viewport);
        await page.goto('/explore');
        const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
        await explore.getByRole('button', { name: /^食べる/ }).click();
        await explore.getByRole('button', { name: '次へ', exact: true }).click();
        await expect(explore.getByLabel('2 / 5')).toBeVisible();
        await explore.locator('.searchbar').click();

        const dialog = explore.getByRole('dialog', { name: 'エリアを検索' });
        await expect(dialog).toBeVisible();
        await dialog.getByPlaceholder('エリア、場所、駅を入力').fill('駅');
        const suggestions = dialog.locator('.sug li button');
        await expect(suggestions).toHaveCount(6);

        await dialog.locator('.sug').evaluate((list) => {
          list.scrollTop = list.scrollHeight;
        });
        const sheet = '[data-screen="explore"][data-screen-active="true"] .reference-modal[data-open="true"] .sheet';
        expect(
          {
            lastSuggestion: await isReachable(page, `${sheet} .sug li:last-child button`, '.sug'),
            close: await isReachable(page, `${sheet} > .x`, '.sheet'),
            search: await isReachable(page, `${sheet} .field input`, '.sheet'),
            shellScroll: await page.evaluate(() => [
              window.scrollY,
              document.querySelector<HTMLElement>('.reference-phone')!.scrollTop,
            ]),
          },
          `${viewport.width}x${viewport.height}`,
        ).toEqual({ lastSuggestion: true, close: true, search: true, shellScroll: [0, 0] });

        const last = suggestions.last();
        await last.click();
        await expect(dialog).toBeHidden();
      }
    });

    test('keeps the Food Profile input dialog usable on short viewports', async ({ baseURL }) => {
      const firstRun = await openPage(browser, baseURL, false);
      for (const viewport of [
        { width: 430, height: 400 },
        { width: 667, height: 375 },
      ]) {
        await firstRun.setViewportSize(viewport);
        await firstRun.goto('/food-profile');
        const profile = firstRun.locator('[data-screen="food-profile"][data-screen-active="true"]');
        await profile.getByRole('button', { name: 'はじめる！' }).click();
        const dialog = profile.getByRole('dialog', { name: '私は...' });
        await expect(dialog.getByRole('textbox', { name: 'ニックネームを入力' })).toBeFocused();

        const card = '[data-screen="food-profile"][data-screen-active="true"] .profile-input-card';
        expect(
          {
            submit: await isReachable(firstRun, `${card} > .btn`, '.profile-input-modal'),
            input: await isReachable(firstRun, `${card} input`, '.profile-input-modal'),
            documentScrollY: await firstRun.evaluate(() => window.scrollY),
          },
          `${viewport.width}x${viewport.height}`,
        ).toEqual({ submit: true, input: true, documentScrollY: 0 });
      }
    });
  });
}
