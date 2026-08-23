/**
 * Focused post-MVP operational-fact and provenance regression for Issue #281.
 *
 * Current KiKi Figma remains the geometry authority. This suite protects the
 * source-backed copy corrections and compact disclosures added around it.
 */
import { expect, test, type Locator, type Page } from '@playwright/test';

const locales = [
  {
    locale: 'ja',
    office: {
      hours: '8:30–17:00（年末年始を除く）',
      address: '東京都西多摩郡奥多摩町氷川210',
      phone: '0428-83-2152',
      access: '奥多摩駅から徒歩 約1分',
      tag: '観光案内',
      guideTitle: 'ガイド・体験の最新情報',
      guideAction: '公式情報を確認する　＞',
      disclosure: '公式情報を2026-08-24に取得しました。営業時間・連絡先・アクセス・現在のガイドや体験は、訪問前に再確認してください。',
    },
    duration: { full: '一日' },
    routeDisclosure: 'デモ用のモデル推定です。所要時間・距離・乗換・営業状況は、交通機関と各運営者の最新情報をご確認ください。',
    foodTruck: '土日を中心に出店・最新の出店予定を確認',
    experienceWalk: '集合時間は季節・予約時に確認',
    experience: 'わさび田プライベートツアー\n・2〜2.5時間・1日1組\n・料金・空き状況は要確認',
    yamashiroya: '長くわさび栽培・加工を続ける奥多摩のわさび専門店',
    neutralMenu: '地域の味を探すデモ参考スポット',
  },
  {
    locale: 'en',
    office: {
      hours: '8:30–17:00 (closed over New Year)',
      address: '210 Hikawa, Okutama, Nishitama, Tokyo',
      phone: '0428-83-2152',
      access: 'About 1 minute on foot from Okutama Station',
      tag: 'Visitor information',
      guideTitle: 'Current guide and experience information',
      guideAction: 'Check official information  ›',
      disclosure: 'Official information retrieved 2026-08-24. Recheck hours, contact details, access, and current guide or experience options before travel.',
    },
    duration: { full: 'Full day' },
    routeDisclosure: 'Demo/model estimates. Check current transit, operator schedules, and venue availability before travel.',
    foodTruck: 'Operates mainly on weekends · Check the current schedule',
    experienceWalk: 'Confirm seasonal meeting time when booking',
    experience: 'Private wasabi-field tour\n· 2–2.5 hours · One group daily\n· Confirm current price and availability',
    yamashiroya: 'A long-running Okutama shop specializing in wasabi',
    neutralMenu: 'A demo reference stop for exploring local flavors',
  },
  {
    locale: 'zh-TW',
    office: {
      hours: '8:30–17:00（年末年始休息）',
      address: '東京都西多摩郡奧多摩町冰川 210',
      phone: '0428-83-2152',
      access: '從奧多摩站步行約 1 分鐘',
      tag: '觀光案內',
      guideTitle: '最新導覽與體驗資訊',
      guideAction: '確認官方資訊　›',
      disclosure: '官方資訊擷取於 2026-08-24。造訪前請重新確認營業時間、聯絡方式、交通與最新導覽／體驗選項。',
    },
    duration: { full: '一日' },
    routeDisclosure: '此為示範／模型估算。造訪前請向交通機構與各營運者確認最新時間、轉乘與營業狀況。',
    foodTruck: '主要於週末出店・請確認最新行程',
    experienceWalk: '集合時間依季節調整・預約時確認',
    experience: '山葵田私人導覽\n・2～2.5 小時・每日一組\n・請確認最新價格與名額',
    yamashiroya: '長期從事山葵栽培與加工的奧多摩山葵專門店',
    neutralMenu: '探索地方風味的示範參考景點',
  },
] as const;

async function openAs(page: Page, locale: string, path: string): Promise<void> {
  await page.goto('/');
  await page.evaluate((nextLocale) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('tmm:locale', nextLocale);
  }, locale);
  await page.goto(path);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const widths = await page.evaluate(() => {
    const phone = document.querySelector<HTMLElement>('.reference-phone');
    const screen = document.querySelector<HTMLElement>('[data-screen-active="true"]');
    return {
      documentClient: document.documentElement.clientWidth,
      documentScroll: document.documentElement.scrollWidth,
      phoneClient: phone?.clientWidth,
      phoneScroll: phone?.scrollWidth,
      screenClient: screen?.clientWidth,
      screenScroll: screen?.scrollWidth,
    };
  });
  expect(widths).toEqual({
    documentClient: 375,
    documentScroll: 375,
    phoneClient: 375,
    phoneScroll: 375,
    screenClient: 375,
    screenScroll: 375,
  });
}

async function expectSafeSourceLinks(facts: Locator, minimum: number): Promise<void> {
  const links = facts.getByRole('link');
  expect(await links.count()).toBeGreaterThanOrEqual(minimum);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\//);
    await expect(link).toHaveAttribute('target', '_blank');
    const rel = (await link.getAttribute('rel'))?.split(/\s+/) ?? [];
    expect(rel).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    await expect(link).toHaveAttribute('data-verification-status', 'needs_confirmation');
    await expect(link).toHaveAttribute('data-source-retrieved-at', '2026-08-24');
  }
}

test('shows corrected tourism-office facts and dated official sources in every locale (#281)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  for (const expected of locales) {
    await openAs(page, expected.locale, '/spot/okutama-tourism-office?candidateId=demo-okutama-wasabi');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(spot).toBeVisible();
    await expect(spot.locator('.spot-tags span')).toHaveText([expected.office.tag]);
    for (const value of [expected.office.hours, expected.office.address, expected.office.phone, expected.office.access]) {
      await expect(spot.getByText(value, { exact: true })).toBeVisible();
    }
    await expect(spot.getByRole('heading', { name: expected.office.guideTitle })).toBeVisible();
    await expect(spot.getByRole('link', { name: expected.office.guideAction })).toHaveAttribute(
      'href',
      'https://www.okutama.gr.jp/site/about/',
    );
    await expect(spot.getByText(/9:00|205|Wi-Fi|Souvenirs|おみやげ|伴手禮|Restroom|トイレ|洗手間|1,500|90 minutes|90 分鐘|年中無休|year-round|全年無休/)).toHaveCount(0);

    const facts = spot.locator('[data-presentation-facts]');
    await expect(facts).toHaveAttribute('data-verification-status', 'needs_confirmation');
    await expect(facts).toHaveAttribute('data-source-retrieved-at', '2026-08-24');
    await expect(facts.getByText(expected.office.disclosure, { exact: true })).toBeVisible();
    await expectSafeSourceLinks(facts, 2);
    await expectNoHorizontalOverflow(page);
  }
});

test('labels route estimates and corrects operational venue cards in every locale (#281)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  for (const expected of locales) {
    await openAs(page, expected.locale, '/route?candidateId=demo-okutama-wasabi');
    let route = page.locator('[data-screen="route"][data-screen-active="true"]');
    let facts = route.locator('[data-presentation-facts]');
    await expect(facts.getByText(expected.routeDisclosure, { exact: true })).toBeVisible();
    await expect(route.locator('[data-spot-id="wasabi-kitchen"] p')).toHaveText(expected.foodTruck);
    await expect(route.getByText(/わさぴー|Wasapy|¥900|Weekends only|僅週末營業/)).toHaveCount(0);
    await expectSafeSourceLinks(facts, 3);
    await expectNoHorizontalOverflow(page);

    await route.getByRole('button', { name: expected.duration.full, exact: true }).click();
    await expect(route.locator('[data-spot-id="wasabi-experience"] p')).toHaveText(expected.experience);
    await expect(route.locator('[data-route-segment-for="wasabi-experience"]')).toHaveText(expected.experienceWalk);
    await expect(route.locator('[data-spot-id="yamashiroya"] p')).toHaveText(expected.yamashiroya);
    await expect(route.locator('[data-spot-id="akabeko"] p')).toHaveText(expected.neutralMenu);
    await expect(route.getByText(/13:30|チーズわさび|cheese wasabi|起司山葵/)).toHaveCount(0);
    facts = route.locator('[data-presentation-facts]');
    await expect(facts.getByText(expected.routeDisclosure, { exact: true })).toBeVisible();
    await expect(route.locator('[data-spot-id="akabeko"] p')).toHaveText(expected.neutralMenu);
    await expectSafeSourceLinks(facts, 2);
    await expectNoHorizontalOverflow(page);

    await page.goto('/route?candidateId=demo-okutama-yamame');
    route = page.locator('[data-screen="route"][data-screen-active="true"]');
    facts = route.locator('[data-presentation-facts]');
    await expect(facts.getByText(expected.routeDisclosure, { exact: true })).toBeVisible();
    await expectSafeSourceLinks(facts, 2);
    await expectNoHorizontalOverflow(page);

    await page.goto('/story/wasabi-okutama');
    let story = page.locator('[data-screen="story"][data-screen-active="true"]');
    await expect(story.locator('[data-spot-id="yamashiroya"] p')).toHaveText(expected.yamashiroya);
    await expect(story.locator('[data-spot-id="wasabi-kitchen"] p')).toHaveText(expected.foodTruck);
    await expect(story.locator('[data-spot-id="okutama-kitchen"] p')).toHaveText(expected.neutralMenu);
    await expect(story.getByText(/172|sixth generation|第六代|チーズわさび|cheese wasabi|起司山葵/)).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.goto('/story/yamame-okutama');
    story = page.locator('[data-screen="story"][data-screen-active="true"]');
    await expect(story.locator('[data-spot-id="yamashiroya"] p')).toHaveText(expected.yamashiroya);
    await expect(story.getByText(/チーズわさび|cheese wasabi|起司山葵/)).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  }
});
