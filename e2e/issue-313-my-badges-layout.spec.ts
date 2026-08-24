/**
 * Focused visual regressions for Issue #313.
 *
 * Live KiKi frames 269:1031, 269:1210, and 269:1451 define the in-app
 * composition. The 48px Figma device status bar is intentionally excluded.
 */
import { expect, test, type Locator, type Page } from '@playwright/test';

const viewports = [
  { width: 375, height: 844 },
  { width: 390, height: 844 },
  { width: 430, height: 1000 },
  { width: 1440, height: 1200 },
];

const routes = [
  { path: '/home', screen: 'home', hasDock: true },
  { path: '/mogu', screen: 'mogu', hasDock: true },
  { path: '/my-route', screen: 'favorites', hasDock: true },
  { path: '/my', screen: 'my', hasDock: true },
  { path: '/badges', screen: 'badges', hasDock: false },
];

const canonicalFlexibleGaps = [19, 20.721, 21.165, 42, 68];
const canonicalFlexibleTotal = canonicalFlexibleGaps.reduce((total, gap) => total + gap, 0);
const canonicalGapShares = canonicalFlexibleGaps.map((gap) => gap / canonicalFlexibleTotal);

async function box(locator: Locator) {
  const bounds = await locator.boundingBox();
  expect(bounds).not.toBeNull();
  return bounds!;
}

async function expectNoHorizontalOverflow(page: Page, viewportWidth: number) {
  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    phone: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth,
  }));

  expect(widths.document).toBeLessThanOrEqual(viewportWidth);
  expect(widths.phone).toBeLessThanOrEqual(Math.min(viewportWidth, 430));
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('uses the shared shell without Figma device chrome and keeps each Dock at the bottom', async ({
  page,
}) => {
  test.setTimeout(60_000);

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    const expectedWidth = Math.min(viewport.width, 430);

    for (const route of routes) {
      await page.goto(route.path);

      const phoneBounds = await box(page.locator('.reference-phone'));
      expect(phoneBounds.width).toBeCloseTo(expectedWidth, 0);
      expect(phoneBounds.height).toBeCloseTo(viewport.height, 0);
      expect(phoneBounds.x).toBeCloseTo((viewport.width - expectedWidth) / 2, 0);
      expect(phoneBounds.y).toBeCloseTo(0, 0);

      const screen = page.locator(
        `[data-screen="${route.screen}"][data-screen-active="true"]`,
      );
      expect(await box(screen)).toEqual(phoneBounds);
      await expect(screen.locator('.issue-296-status-bar')).toHaveCount(0);
      await expect(screen.locator('img[src*="status-bar"]')).toHaveCount(0);

      if (route.screen === 'my' || route.screen === 'badges') {
        const headerBounds = await box(screen.locator('.issue-296-header'));
        expect(headerBounds.y).toBeCloseTo(phoneBounds.y, 0);
        expect(headerBounds.x).toBeCloseTo(phoneBounds.x, 0);
        expect(headerBounds.width).toBeCloseTo(phoneBounds.width, 0);
      }

      if (route.hasDock) {
        const dockBounds = await box(screen.getByRole('navigation', { name: 'Primary' }));
        expect(dockBounds.y + dockBounds.height).toBeCloseTo(
          phoneBounds.y + phoneBounds.height,
          0,
        );
      }

      await expectNoHorizontalOverflow(page, viewport.width);
    }
  }
});

test('distributes My flexible space with the canonical Figma gap proportions', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/my');

    const my = page.locator('[data-screen="my"][data-screen-active="true"]');
    const middle = await box(my.locator('.issue-296-my-scroll'));
    const profileEdit = await box(my.locator('.issue-296-profile-edit'));
    const nickname = await box(my.locator('.issue-296-nickname'));
    const actions = await box(my.locator('.issue-296-action-grid'));
    const menu = await box(my.locator('.issue-296-menu'));
    const logout = await box(my.locator('.issue-296-logout'));

    expect(profileEdit.y).toBeLessThan(nickname.y);
    expect(nickname.y + nickname.height).toBeLessThan(actions.y);
    expect(actions.y + actions.height).toBeLessThan(menu.y);
    expect(menu.y + menu.height).toBeLessThan(logout.y);
    expect(logout.y + logout.height).toBeLessThanOrEqual(middle.y + middle.height);

    const gaps = [
      profileEdit.y - middle.y,
      actions.y - (nickname.y + nickname.height),
      menu.y - (actions.y + actions.height),
      logout.y - (menu.y + menu.height),
      middle.y + middle.height - (logout.y + logout.height),
    ];
    const flexibleTotal = gaps.reduce((total, gap) => total + gap, 0);

    for (const [index, gap] of gaps.entries()) {
      expect(gap).toBeGreaterThan(0);
      expect(gap / flexibleTotal).toBeCloseTo(canonicalGapShares[index], 2);
    }

    await expectNoHorizontalOverflow(page, viewport.width);
  }
});
