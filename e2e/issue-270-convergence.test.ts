/**
 * Issue #270 primary convergence gates.
 *
 * These checks lock the interaction contracts that are easy to regress while
 * reconciling the approved Figma journey with the Netlify reference: route
 * continuity, measured progress, authentic Spot media, keyboard behavior, and
 * a non-animated reduced-motion path.
 */
import { expect, test, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';
const LOCALE_KEY = 'tmm:locale';
const TUTORIAL_KEY = 'tmm:tutorial:v1';

const foodProfile = {
  dietary: [],
  dietaryOther: '',
  hasNoRestrictions: true,
  savedAt: '2026-08-23T00:00:00.000Z',
  version: 1,
} as const;

const completedExploration = {
  tastes: ['refreshing'],
  experiences: ['eat'],
  baseArea: 'okutama',
  travelTime: 'within-60',
  interests: ['nature'],
  duration: 'half-day',
} as const;

async function seedGoldenPath(page: Page, locale: 'ja' | 'en' | 'zh-TW' = 'ja') {
  await page.goto('/');
  await page.evaluate(
    ([profileKey, profile, explorationKey, answers, localeKey, localeValue, tutorialKey]) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem(profileKey, JSON.stringify(profile));
      localStorage.setItem(localeKey, localeValue);
      sessionStorage.setItem(explorationKey, JSON.stringify(answers));
      sessionStorage.setItem(tutorialKey, 'complete');
    },
    [
      FOOD_PROFILE_KEY,
      foodProfile,
      EXPLORATION_KEY,
      completedExploration,
      LOCALE_KEY,
      locale,
      TUTORIAL_KEY,
    ] as const,
  );
}

test.describe('Issue #270 interaction convergence', () => {
  test.use({ locale: 'ja-JP', viewport: { width: 375, height: 812 } });

  test('starts forward pages at the top, focuses their heading, and restores browser-back context', async ({
    page,
  }) => {
    await seedGoldenPath(page);
    await page.goto('/explore/result');
    const resultHeading = page.getByRole('heading', {
      level: 1,
      name: 'あなたに合う食の旅を見つけました！',
    });
    await expect(resultHeading).toBeVisible();

    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'auto' }));
    const resultScroll = await page.evaluate(() => window.scrollY);
    expect(resultScroll).toBeGreaterThan(500);

    await page.getByRole('link', { name: '東京わさびの物語を読む' }).click();
    await page.waitForURL('**/story/wasabi-okutama*');
    const storyHeading = page.getByRole('heading', { level: 1, name: '東京わさび' });
    await expect(storyHeading).toBeFocused();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);

    await page.goBack();
    await expect(page).toHaveURL(/\/explore\/result$/);
    await expect(resultHeading).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(resultScroll - 80);
  });

  test('leaves focus and scroll intact for in-place search-parameter updates', async ({ page }) => {
    await page.goto('/map');
    const heading = page.getByRole('heading', { level: 1, name: '地図' });
    const locationButton = page.getByRole('button', { name: '現在地を表示' });
    const marker = page.locator('.leaflet-marker-icon').first();
    await expect(heading).toBeVisible();
    await expect(marker).toBeVisible();

    // Give the document a deterministic scroll range without changing any app
    // routing behavior, then keep focus on a stable control outside MapView.
    await page.locator('.page').evaluate((node) => {
      (node as HTMLElement).style.minHeight = '1600px';
    });
    await locationButton.focus();
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'auto' }));
    await expect(locationButton).toBeFocused();

    await marker.evaluate((node) => {
      node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await expect(page).toHaveURL(/\/map\?place=/);
    await expect(locationButton).toBeFocused();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(390);
    await expect(heading).not.toBeFocused();
  });

  test('exposes all six measured journey stages from diagnosis through Result', async ({ page }) => {
    await seedGoldenPath(page);
    await page.goto('/explore');

    const progress = page.getByTestId('journey-progress');
    await expect(progress).toHaveAttribute('role', 'progressbar');
    await expect(progress).toHaveAttribute('aria-valuemin', '1');
    await expect(progress).toHaveAttribute('aria-valuemax', '6');
    await expect(progress).toHaveAttribute('aria-valuenow', '1');
    await expect(progress.locator('[data-journey-milestone]')).toHaveCount(6);

    await page.goto('/explore/result');
    await expect(page.getByTestId('journey-progress')).toHaveAttribute('aria-valuenow', '6');
    await expect(
      page.getByRole('link', { name: 'もう一度食旅を見つける' }),
    ).toBeVisible();
  });

  test('keeps measured Story/Route actions attached to navigation and restores explicit Back', async ({
    page,
  }) => {
    await seedGoldenPath(page);
    await page.goto(
      '/story/wasabi-okutama?backTo=%2Fexplore%2Fresult&candidateId=demo-okutama-wasabi',
    );
    await expect(page.getByRole('heading', { level: 1, name: '東京わさび' })).toBeVisible();

    const storyGeometry = await page.evaluate(() => {
      const action = document.querySelector<HTMLElement>('.s4-sticky-cta')!;
      const nav = document.querySelector<HTMLElement>('.tmm-nav')!;
      const actionRect = action.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      return { height: actionRect.height, gap: navRect.top - actionRect.bottom };
    });
    expect(storyGeometry.height).toBe(73);
    expect(Math.abs(storyGeometry.gap)).toBeLessThan(1);

    await page.goto(
      '/route?from=story&backTo=%2Fexplore%2Fresult&candidateId=demo-okutama-wasabi',
    );
    await expect(page.getByRole('heading', { level: 1, name: '奥多摩わさび紀行' })).toBeVisible();
    const routeGeometry = await page.evaluate(() => {
      const action = document.querySelector<HTMLElement>('.s5-sticky-actions')!;
      const nav = document.querySelector<HTMLElement>('.tmm-nav')!;
      const actionRect = action.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      return { height: actionRect.height, gap: navRect.top - actionRect.bottom };
    });
    expect(routeGeometry.height).toBe(155);
    expect(Math.abs(routeGeometry.gap)).toBeLessThan(1);

    const officeStop = page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '奥多摩観光案内所' });
    await officeStop.scrollIntoViewIfNeeded();
    const routeScroll = await page.evaluate(() => window.scrollY);
    expect(routeScroll).toBeGreaterThan(400);
    await officeStop.click();
    await page.waitForURL('**/spot/okutama-tourism-office*');
    await page.locator('.s6-hero-back').click();
    await expect(page).toHaveURL(/\/route\?/);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(routeScroll - 80);
  });

  test('uses the matching fieldwork gallery with keyboard controls and pagination', async ({ page }) => {
    await seedGoldenPath(page);
    await page.goto('/spot/okutama-tourism-office?routeId=okutama-wasabi-half-day');

    const gallery = page.getByTestId('spot-gallery');
    await expect(gallery).toBeVisible();
    await expect(gallery.locator('[data-gallery-slide]')).toHaveCount(3);
    await expect(gallery.locator('[data-gallery-slide] img')).toHaveCount(3);
    await expect(gallery.locator('[data-gallery-slide] img').first()).toHaveAttribute(
      'alt',
      /奥多摩観光案内所/,
    );
    await expect(gallery.getByTestId('gallery-status')).toHaveText('1 / 3');

    const trackBox = await gallery.getByTestId('gallery-track').boundingBox();
    expect(trackBox).not.toBeNull();
    // Start on the image itself, outside the overlaid 44px next control.
    await page.mouse.move(
      trackBox!.x + trackBox!.width * 0.75,
      trackBox!.y + trackBox!.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      trackBox!.x + trackBox!.width * 0.1,
      trackBox!.y + trackBox!.height / 2,
      { steps: 5 },
    );
    expect(
      await gallery.getByTestId('gallery-track').evaluate((track) => track.scrollLeft),
    ).toBeGreaterThan(trackBox!.width / 2);
    await page.mouse.up();
    await expect(gallery.getByTestId('gallery-status')).toHaveText('2 / 3');

    await gallery.focus();
    await gallery.press('Home');
    await expect(gallery.getByTestId('gallery-status')).toHaveText('1 / 3');
    await gallery.press('ArrowRight');
    await expect(gallery.getByTestId('gallery-status')).toHaveText('2 / 3');
    await expect(gallery.locator('[data-gallery-pagination][aria-current="true"]')).toHaveCount(1);
  });

  test('keeps repeat diagnosis and truthful gallery copy localized at 375px', async ({ page }) => {
    const expectations = [
      {
        locale: 'ja' as const,
        repeat: 'もう一度食旅を見つける',
        gallery: '奥多摩観光案内所のフィールドワーク写真',
      },
      {
        locale: 'en' as const,
        repeat: 'Find another food journey',
        gallery: 'Fieldwork photos of the Okutama visitor information office',
      },
      {
        locale: 'zh-TW' as const,
        repeat: '再找一次飲食旅程',
        gallery: '奧多摩觀光服務處的田野調查照片',
      },
    ];

    for (const item of expectations) {
      await seedGoldenPath(page, item.locale);
      await page.goto('/explore/result');
      await expect(page.getByRole('link', { name: item.repeat })).toBeVisible();
      await page.goto('/spot/okutama-tourism-office?routeId=okutama-wasabi-journey');
      await expect(page.getByRole('region', { name: item.gallery })).toBeVisible();
      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
    }
  });

  test('removes page and gallery scrolling animation for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await seedGoldenPath(page);
    await page.goto('/spot/okutama-tourism-office?routeId=okutama-wasabi-half-day');

    const galleryTrack = page.getByTestId('gallery-track');
    await expect(galleryTrack).toBeVisible();
    await expect
      .poll(() => galleryTrack.evaluate((node) => getComputedStyle(node).scrollBehavior))
      .toBe('auto');
    await expect
      .poll(() =>
        page
          .locator('.tmm-route-transition')
          .evaluate((node) => getComputedStyle(node).animationName),
      )
      .toBe('none');
  });
});
