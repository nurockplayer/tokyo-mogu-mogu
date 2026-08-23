/**
 * Focused locale/responsive characterization for Issue #208.
 *
 * This suite intentionally stays outside the canonical merge gate. It records
 * the current 375px behavior across every visible MVP route while the durable
 * Phase 2+ Figma/responsive ownership questions remain open.
 */
import { expect, test, type Locator, type Page } from '@playwright/test';

type Locale = 'ja' | 'en' | 'zh-TW';

interface LocaleExpectation {
  locale: Locale;
  languageEntry: string;
  languageDialog: string;
  myHeading: string;
}

type LocalizedControlName = Record<Locale, string | RegExp>;

function controlName(
  ja: string | RegExp,
  en: string | RegExp,
  zhTW: string | RegExp,
): LocalizedControlName {
  return { ja, en, 'zh-TW': zhTW };
}

const localeExpectations: Record<Locale, LocaleExpectation> = {
  ja: {
    locale: 'ja',
    languageEntry: '言語設定',
    languageDialog: '言語を選択',
    myHeading: 'マイページ',
  },
  en: {
    locale: 'en',
    languageEntry: 'Language',
    languageDialog: 'Choose a language',
    myHeading: 'My',
  },
  'zh-TW': {
    locale: 'zh-TW',
    languageEntry: '語言設定',
    languageDialog: '選擇語言',
    myHeading: '我的',
  },
};

const routes = [
  {
    path: '/',
    screen: 'splash',
    keyControlName: controlName('はじめる！', 'Start!', '開始！'),
  },
  {
    path: '/food-profile',
    screen: 'food-profile',
    keyControlName: controlName('はじめる！', 'Start!', '開始！'),
  },
  {
    path: '/food-profile/edit',
    screen: 'food-profile',
    keyControlName: controlName('🥚 卵', '🥚 Egg', '🥚 蛋'),
  },
  {
    path: '/home',
    screen: 'home',
    keyControlName: controlName(/Let's Go!/, /Let's Go!/, /Let's Go!/),
  },
  {
    path: '/explore',
    screen: 'explore',
    keyControlName: controlName(/^食べる/, /^Eat/, /^品嚐/),
  },
  {
    path: '/explore/result',
    screen: 'result',
    keyControlName: controlName(/^この物語を読む:/, /^Read this story:/, /^閱讀這段故事:/),
  },
  {
    path: '/story/wasabi-okutama',
    screen: 'story',
    keyControlName: controlName(
      'この食文化の観光ルートを作成する',
      'Create a sightseeing route for this food culture',
      '建立這項飲食文化的觀光路線',
    ),
  },
  {
    path: '/route?candidateId=demo-okutama-wasabi',
    screen: 'route',
    keyControlName: controlName('ルートをシェア', 'Share route', '分享路線'),
  },
  {
    path: '/spot/okutama-tourism-office?candidateId=demo-okutama-wasabi',
    screen: 'spot',
    keyControlName: controlName(
      'お気に入りに保存',
      'Save to favorites',
      '儲存至收藏',
    ),
  },
  {
    path: '/mogu',
    screen: 'mogu',
    keyControlName: controlName(/^この物語を読む:/, /^Read this story:/, /^閱讀這段故事:/),
  },
  {
    path: '/my-route',
    screen: 'favorites',
    keyControlName: controlName('お気に入り', 'Favorites', '收藏'),
  },
  {
    path: '/my',
    screen: 'my',
    keyControlName: controlName('言語設定', 'Language', '語言設定'),
  },
  {
    path: '/badges',
    screen: 'badges',
    keyControlName: controlName('次のバッジ', 'Next badge', '下一枚徽章'),
  },
] as const;

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => {
    const seedMarker = 'tmm:e2e:issue-208-locale-responsive';
    if (localStorage.getItem(seedMarker)) return;

    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(seedMarker, 'seeded');
    localStorage.setItem('tmm:nickname:v1', 'ナナ');
    localStorage.setItem(
      'tmm:foodProfile:v1',
      JSON.stringify({
        dietary: [],
        dietaryOther: '',
        hasNoRestrictions: true,
        savedAt: '2026-08-23T00:00:00.000Z',
        version: 1,
      }),
    );
    localStorage.setItem('tmm:locale', 'ja');
  });
});

async function expectHorizontalBounds(page: Page, activeScreen: Locator): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const active = document.querySelector<HTMLElement>(
          '.reference-screen[data-screen-active="true"]',
        );
        const phone = document.querySelector<HTMLElement>('.reference-phone');
        if (!active || !phone) return ['missing active screen or phone shell'];

        const viewportWidth = window.innerWidth;
        const phoneRect = phone.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();
        const epsilon = 1;
        const violations: string[] = [];
        const widths = [
          ['document', document.documentElement],
          ['body', document.body],
          ['phone', phone],
          ['active-screen', active],
        ] as const;

        for (const [name, element] of widths) {
          if (element.scrollWidth > element.clientWidth + epsilon) {
            violations.push(`${name} scrolls ${element.scrollWidth}/${element.clientWidth}`);
          }
        }

        if (document.documentElement.scrollWidth > viewportWidth + epsilon) {
          violations.push('document exceeds viewport');
        }
        if (document.body.scrollWidth > viewportWidth + epsilon) {
          violations.push('body exceeds viewport');
        }
        if (phoneRect.left < -epsilon || phoneRect.right > viewportWidth + epsilon) {
          violations.push('phone exceeds viewport bounds');
        }
        if (
          activeRect.left < phoneRect.left - epsilon ||
          activeRect.right > phoneRect.right + epsilon
        ) {
          violations.push('active screen exceeds phone bounds');
        }

        return violations;
      }),
    )
    .toEqual([]);

  const bounds = await activeScreen.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds?.x).toBeCloseTo(0, 0);
  expect(bounds?.width).toBeCloseTo(375, 0);
}

async function expectRouteReachable(
  page: Page,
  route: (typeof routes)[number],
  locale: Locale,
): Promise<void> {
  await page.goto(route.path);

  const app = page.locator('main.reference-app[data-route-focus-target]');
  await expect(app).toHaveAttribute('data-locale', locale);
  await expect(page.locator('html')).toHaveAttribute('lang', locale);
  await expect(app).toBeFocused();

  const activeScreen = page.locator(
    `.reference-screen[data-screen="${route.screen}"][data-screen-active="true"]`,
  );
  await expect(activeScreen).toBeVisible();

  const keyControl = page
    .getByRole('button', { name: route.keyControlName[locale], exact: true })
    .first();
  await expect(keyControl).toBeVisible();
  await expect(keyControl).toBeEnabled();
  await expect(keyControl).toBeInViewport();
  await expectHorizontalBounds(page, activeScreen);
}

async function switchLocale(
  page: Page,
  current: LocaleExpectation,
  optionLabel: string,
  next: LocaleExpectation,
): Promise<void> {
  await page.goto('/my');
  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  await expect(my.getByRole('heading', { name: current.myHeading })).toBeVisible();

  await my.getByRole('button', { name: current.languageEntry, exact: true }).click();
  const dialog = my.getByRole('dialog', { name: current.languageDialog });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: optionLabel, exact: true }).click();

  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', next.locale);
  await expect(page.locator('html')).toHaveAttribute('lang', next.locale);
  await expect(my.getByRole('heading', { name: next.myHeading })).toBeVisible();
  await expect(my.getByRole('button', { name: next.languageEntry, exact: true })).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('tmm:locale')))
    .toBe(next.locale);
}

test('keeps every current MVP route reachable and bounded while switching all locales', async ({
  page,
}) => {
  test.setTimeout(120_000);

  for (const route of routes) {
    await expectRouteReachable(page, route, 'ja');
  }

  await switchLocale(page, localeExpectations.ja, 'English', localeExpectations.en);
  for (const route of routes) {
    await expectRouteReachable(page, route, 'en');
  }

  await switchLocale(
    page,
    localeExpectations.en,
    '繁體中文',
    localeExpectations['zh-TW'],
  );
  for (const route of routes) {
    await expectRouteReachable(page, route, 'zh-TW');
  }

  await switchLocale(
    page,
    localeExpectations['zh-TW'],
    '日本語',
    localeExpectations.ja,
  );
  for (const route of routes) {
    await expectRouteReachable(page, route, 'ja');
  }
});
