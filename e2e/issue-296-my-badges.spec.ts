/**
 * Focused current-Product regressions for Issue #296 My and Badge surfaces.
 *
 * These checks intentionally stay outside the canonical Golden Path gate.
 * Live KiKi Figma nodes 269:1031, 269:1210, and 269:1451 remain the visual
 * authority; this suite protects the implemented interactions and shell contract.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('matches My and 食のバッジ navigation at 375px and 390px', async ({ page }) => {
  for (const width of [375, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/my');

    const my = page.locator('[data-screen="my"][data-screen-active="true"]');
    await expect(my.getByRole('heading', { name: 'マイページ' })).toBeVisible();
    await expect(
      my.locator('.issue-296-route-card').getByText('マイルート', { exact: true }),
    ).toBeVisible();
    await expect(
      my.locator('.issue-296-action-card').nth(1).getByText('食のバッジ', { exact: true }),
    ).toBeVisible();
    await expect(page.locator('.locale-control')).toHaveCount(0);

    const myDock = my.getByRole('navigation', { name: 'Primary' });
    await expect(myDock.getByRole('button', { name: 'マイ' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    const dockBounds = await myDock.boundingBox();
    expect(dockBounds?.height).toBeCloseTo(84, 0);
    expect((dockBounds?.y ?? 0) + (dockBounds?.height ?? 0)).toBeCloseTo(844, 0);
    await expect(myDock).toHaveCSS('padding-bottom', '16px');

    await myDock.evaluate((element) => {
      element.style.setProperty('--issue-296-dock-safe-bottom', '34px');
    });
    await expect(myDock).toHaveCSS('padding-bottom', '34px');
    const safeAreaDockBounds = await myDock.boundingBox();
    expect(safeAreaDockBounds?.height).toBeCloseTo(102, 0);
    expect(
      (safeAreaDockBounds?.y ?? 0) + (safeAreaDockBounds?.height ?? 0),
    ).toBeCloseTo(844, 0);
    await myDock.evaluate((element) => {
      element.style.removeProperty('--issue-296-dock-safe-bottom');
    });

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );

    await my.getByRole('button', { name: '食のバッジ' }).click();
    await expect(page).toHaveURL(/\/badges$/);

    const badges = page.locator('[data-screen="badges"][data-screen-active="true"]');
    await expect(badges.getByRole('heading', { name: '食のバッジ' })).toBeVisible();
    await expect(badges.getByText('1/100')).toBeVisible();
    await expect(badges.getByText('2026/08/23 獲得')).toBeVisible();

    await badges.getByRole('button', { name: '次のバッジ' }).click();
    await expect(badges).toHaveAttribute('data-badge-page', '2');
    await expect(badges.getByText('2/100')).toBeVisible();
    await expect(badges.getByText('まだバッジがありません')).toBeVisible();

    await badges.getByRole('button', { name: '前のバッジ' }).click();
    await expect(badges).toHaveAttribute('data-badge-page', '1');
    await badges.getByRole('button', { name: 'マイページに戻る' }).click();
    await expect(page).toHaveURL(/\/my$/);
  }
});

test('uses one shared shell across current Dock routes and Badge', async ({ page }) => {
  const routes = [
    { path: '/home', screen: 'home' },
    { path: '/mogu', screen: 'mogu' },
    { path: '/my-route', screen: 'favorites' },
    { path: '/my', screen: 'my' },
    { path: '/badges', screen: 'badges' },
  ];

  for (const viewport of [
    { width: 375, height: 844 },
    { width: 390, height: 844 },
    { width: 430, height: 1000 },
    { width: 1440, height: 1100 },
  ]) {
    await page.setViewportSize(viewport);
    const expectedWidth = Math.min(viewport.width, 430);

    for (const route of routes) {
      await page.goto(route.path);

      const phone = page.locator('.reference-phone');
      const phoneBounds = await phone.boundingBox();
      expect(phoneBounds).not.toBeNull();
      expect(phoneBounds?.width).toBeCloseTo(expectedWidth, 0);
      expect(phoneBounds?.height).toBeCloseTo(viewport.height, 0);
      expect(phoneBounds?.x).toBeCloseTo((viewport.width - expectedWidth) / 2, 0);
      expect(phoneBounds?.y).toBeCloseTo(0, 0);

      const screen = page.locator(
        `[data-screen="${route.screen}"][data-screen-active="true"]`,
      );
      expect(await screen.boundingBox()).toEqual(phoneBounds);

      if (route.screen === 'my') {
        await expect(screen).toHaveCSS('background-size', 'cover');
        await expect(screen.locator('.issue-296-status-bar')).toHaveCount(0);
        const headerBounds = await screen.locator('.issue-296-header').boundingBox();
        const dockBounds = await screen
          .getByRole('navigation', { name: 'Primary' })
          .boundingBox();
        for (const bounds of [headerBounds, dockBounds]) {
          expect(bounds?.x).toBeCloseTo(phoneBounds?.x ?? 0, 0);
          expect(bounds?.width).toBeCloseTo(expectedWidth, 0);
        }
        expect(headerBounds?.y).toBeCloseTo(phoneBounds?.y ?? 0, 0);
        expect((dockBounds?.y ?? 0) + (dockBounds?.height ?? 0)).toBeCloseTo(
          viewport.height,
          0,
        );
      }

      if (route.screen === 'badges') {
        await expect(screen).toHaveCSS('background-size', 'cover');
        await expect(screen.locator('.issue-296-status-bar')).toHaveCount(0);
        const headerBounds = await screen.locator('.issue-296-header').boundingBox();
        expect(headerBounds?.x).toBeCloseTo(phoneBounds?.x ?? 0, 0);
        expect(headerBounds?.y).toBeCloseTo(phoneBounds?.y ?? 0, 0);
        expect(headerBounds?.width).toBeCloseTo(expectedWidth, 0);
      }
    }
  }
});

test('keeps both Badge binder states aligned to the shared shell width', async ({ page }) => {
  for (const viewport of [
    { width: 375, height: 844 },
    { width: 390, height: 844 },
    { width: 430, height: 1000 },
    { width: 1440, height: 1100 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/badges');

    const expectedWidth = Math.min(viewport.width, 430);
    const badges = page.locator('[data-screen="badges"][data-screen-active="true"]');
    const binder = badges.locator('.issue-296-binder');
    const badgesBounds = await badges.boundingBox();
    const earnedBinderBounds = await binder.boundingBox();
    expect(earnedBinderBounds?.x).toBeCloseTo(badgesBounds?.x ?? 0, 0);
    expect(earnedBinderBounds?.width).toBeCloseTo(expectedWidth, 0);
    expect(
      (earnedBinderBounds?.x ?? 0) + (earnedBinderBounds?.width ?? 0),
    ).toBeCloseTo((badgesBounds?.x ?? 0) + (badgesBounds?.width ?? 0), 0);

    await badges.getByRole('button', { name: '次のバッジ' }).click();
    await expect(badges).toHaveAttribute('data-badge-page', '2');
    await expect(badges.getByText('2/100')).toBeVisible();
    const emptyBinderBounds = await binder.boundingBox();
    expect(emptyBinderBounds?.x).toBeCloseTo(badgesBounds?.x ?? 0, 0);
    expect(emptyBinderBounds?.width).toBeCloseTo(expectedWidth, 0);
    expect(
      (emptyBinderBounds?.x ?? 0) + (emptyBinderBounds?.width ?? 0),
    ).toBeCloseTo((badgesBounds?.x ?? 0) + (badgesBounds?.width ?? 0), 0);
  }
});

test('uses 言語設定 as the persisted language entry surface', async ({ page }) => {
  await page.goto('/my');
  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  const languageEntry = my.getByRole('button', { name: '言語設定' });

  await languageEntry.focus();
  await page.keyboard.press('Enter');
  const languageDialog = my.getByRole('dialog', { name: '言語を選択' });
  await expect(languageDialog).toBeVisible();
  await expect(languageDialog.getByRole('button', { name: '日本語' })).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(languageDialog.getByRole('button', { name: '閉じる' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(languageDialog.getByRole('button', { name: '日本語' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(languageDialog).toBeHidden();
  await expect(languageEntry).toBeFocused();

  await languageEntry.click();
  await languageDialog.getByRole('button', { name: 'English' }).click();

  await expect(my.getByRole('heading', { name: 'My' })).toBeVisible();
  await expect(my.getByRole('button', { name: 'Language' })).toBeFocused();
  await expect(page.locator('.locale-control')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('tmm:locale'))).toBe('en');
});
