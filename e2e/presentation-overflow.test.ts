/**
 * Route / Spot / My — 375px no-horizontal-overflow guard (Issue #186).
 *
 * The presentation-upgrade screens (Route, Spot, My Saved Routes) must never
 * overflow horizontally at the 375px mobile baseline in any shipping locale
 * (ja / en / zh-TW). Direct navigation covers both slices — the Okutama ×
 * Tokyo Wasabi demo route and the Ome/Sawai secondary route — plus the
 * saved-routes surface on /my and the standalone /my-route list.
 *
 * Uses the same localStorage locale switch as the Ome/Sawai locale smoke tests
 * and seeds a deterministic saved-routes state before opening the My screens.
 * The check measures the root scroll width after webfonts settle, so
 * font-driven reflow cannot slip past it.
 */
import { test, expect, type Page } from '@playwright/test';

/** localStorage keys owned by the app (persistence contracts). */
const LOCALE_KEY = 'tmm:locale';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';

type Locale = 'ja' | 'en' | 'zh-TW';

/** Switch the app locale before a direct navigation (same pattern as #177). */
async function setLocale(page: Page, locale: Locale): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
}

/** Seed a deterministic saved-routes state (both slices present). */
async function seedSavedRoutes(page: Page): Promise<void> {
  await page.evaluate(
    ([key, value]) => localStorage.setItem(key, JSON.stringify(value)),
    [
      SAVED_ROUTES_KEY,
      [
        { routeId: 'okutama-wasabi-journey', savedAt: '2026-08-16T00:00:00.000Z' },
        { routeId: 'ome-sawai-sake-journey', savedAt: '2026-08-15T00:00:00.000Z' },
      ],
    ] as const,
  );
}

/** A screen renders with no horizontal overflow at the 375px baseline. */
async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(async () => {
    // Fonts change metrics after first paint; measure only once they are ready.
    await document.fonts.ready;
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(
    scrollWidth,
    `horizontal overflow: scrollWidth ${scrollWidth}px > clientWidth ${clientWidth}px`,
  ).toBeLessThanOrEqual(clientWidth);
}

/** The Figma Route bar stays a 53px, single-line mobile control in every locale. */
async function assertStableRouteHeader(page: Page): Promise<void> {
  const header = page.locator('.s5-figma-header');
  const title = header.locator('p');
  const back = header.locator('.s5-figma-header__back');
  const reset = page.locator('.demo-reset');

  await expect(header).toBeVisible();
  await expect(back).toHaveCount(1);
  await expect(title).toHaveCSS('white-space', 'nowrap');

  const [headerBox, backBox, titleBox, resetBox, titleMetrics] = await Promise.all([
    header.boundingBox(),
    back.boundingBox(),
    title.boundingBox(),
    reset.boundingBox(),
    title.evaluate((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    })),
  ]);
  expect(headerBox?.height).toBe(53);
  expect(backBox?.width).toBeGreaterThanOrEqual(44);
  expect(backBox?.height).toBeGreaterThanOrEqual(44);
  expect((titleBox?.x ?? 0) + (titleBox?.width ?? 0)).toBeLessThanOrEqual(resetBox?.x ?? 0);
  expect(titleMetrics.scrollHeight).toBeLessThanOrEqual(titleMetrics.clientHeight);
}

/** Localized heading used as a "content rendered" signal on the My screens. */
const MY_HEADINGS: Record<Locale, { my: string; myRoute: string }> = {
  ja: { my: '保存した旅程', myRoute: 'マイルート' },
  en: { my: 'Saved Routes', myRoute: 'My Route' },
  'zh-TW': { my: '已儲存的旅程', myRoute: '我的路線' },
};

const SAVED_ACTION_LABELS: Record<Locale, string> = {
  ja: '保存した旅程の操作',
  en: 'Saved itinerary actions',
  'zh-TW': '已儲存行程操作',
};

const ROUTE_PATHS: { path: string; label: string; signal: string }[] = [
  { path: '/route', label: 'Okutama × Tokyo Wasabi route', signal: '.s5-timeline' },
  {
    path: '/route?from=my&routeId=ome-sawai-sake-journey',
    label: 'Ome/Sawai route',
    signal: '.s5-timeline',
  },
  {
    path: '/route?from=my&candidateId=demo-tokyo-west-fussa-sake',
    label: 'Fussa long-label route',
    signal: '.s5-timeline',
  },
];

const STORY_PATHS: { path: string; label: string; signal: string }[] = [
  {
    path: '/story/wasabi-okutama?candidateId=demo-okutama-wasabi',
    label: 'Okutama × Tokyo Wasabi story',
    signal: '.s4-fieldwork',
  },
];

const SPOT_PATHS: { path: string; label: string; signal: string }[] = [
  { path: '/spot/okutama-tourism-office', label: 'Okutama tourism office spot', signal: '.s6-gallery__hero-image' },
  { path: '/spot/sawai-ozawa-shuzo', label: 'Ozawa Shuzo spot', signal: '.pv-visual' },
];

const FIELDWORK_GALLERY_COPY: Record<Locale, {
  story: string;
  spot: string;
  wasapy: string;
}> = {
  ja: {
    story: '奥多摩の景色',
    spot: '奥多摩観光案内所の写真',
    wasapy: '写真を表示: 案内所のわさぴー',
  },
  en: {
    story: 'Scenes from Okutama',
    spot: 'Photos of the Okutama Tourism Office',
    wasapy: 'Show photo: Wasapy at the office',
  },
  'zh-TW': {
    story: '奧多摩風景',
    spot: '奧多摩遊客服務中心照片',
    wasapy: '顯示照片: 服務中心的Wasapy',
  },
};

for (const locale of ['ja', 'en', 'zh-TW'] as const) {
  test.describe(`Route / Spot / My overflow (${locale}, 375px)`, () => {
    test.use({ locale: locale === 'ja' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'zh-TW' });

    test('saved Route actions stay usable without horizontal overflow', async ({ page }) => {
      await setLocale(page, locale);
      await seedSavedRoutes(page);
      await page.goto('/route');
      await expect(page.getByRole('group', { name: SAVED_ACTION_LABELS[locale] })).toBeVisible();
      await assertNoHorizontalOverflow(page);
    });

    for (const { path, label, signal } of ROUTE_PATHS) {
      test(`no horizontal overflow on ${label}`, async ({ page }) => {
        await setLocale(page, locale);
        await page.goto(path);
        await page.waitForURL(/\/route/);
        // Route chunks are code-split: wait for real page content (the timeline),
        // not just the URL, so an unrendered page cannot false-pass the measure.
        await page.waitForSelector(signal);
        await assertNoHorizontalOverflow(page);
        await assertStableRouteHeader(page);
      });
    }

    for (const { path, label, signal } of STORY_PATHS) {
      test(`no horizontal overflow on ${label}`, async ({ page }) => {
        await setLocale(page, locale);
        await page.goto(path);
        await page.waitForURL(/\/story\//);
        await page.waitForSelector(signal);
        const gallery = page.getByRole('region', {
          name: FIELDWORK_GALLERY_COPY[locale].story,
        });
        await expect(gallery.locator('img')).toHaveCount(3);
        await assertNoHorizontalOverflow(page);
      });
    }

    for (const { path, label, signal } of SPOT_PATHS) {
      test(`no horizontal overflow on ${label}`, async ({ page }) => {
        await setLocale(page, locale);
        await page.goto(path);
        await page.waitForURL(/\/spot\//);
        // Same code-split guard: wait for the spot visual before measuring.
        await page.waitForSelector(signal);
        if (path.includes('okutama-tourism-office')) {
          const gallery = page.getByRole('region', {
            name: FIELDWORK_GALLERY_COPY[locale].spot,
          });
          const wasapy = gallery.getByRole('button', {
            name: FIELDWORK_GALLERY_COPY[locale].wasapy,
          });
          await expect(gallery.getByRole('button')).toHaveCount(3);
          await expect
            .poll(() =>
              gallery.locator('img').evaluateAll((images) =>
                images.every((image) => image.complete && image.naturalWidth > 0),
              ),
            )
            .toBe(true);
          await wasapy.click();
          await expect(wasapy).toHaveAttribute('aria-pressed', 'true');
        }
        await assertNoHorizontalOverflow(page);
      });
    }

    test('no horizontal overflow on My Saved Routes (/my)', async ({ page }) => {
      await setLocale(page, locale);
      await seedSavedRoutes(page);
      await page.goto('/my');
      await page.getByRole('heading', { name: MY_HEADINGS[locale].my }).waitFor();
      await assertNoHorizontalOverflow(page);
    });

    test('no horizontal overflow on My Route list (/my-route)', async ({ page }) => {
      await setLocale(page, locale);
      await seedSavedRoutes(page);
      await page.goto('/my-route');
      await page.getByRole('heading', { name: MY_HEADINGS[locale].myRoute }).waitFor();
      await assertNoHorizontalOverflow(page);
    });
  });
}
