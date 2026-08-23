/**
 * Focused Story editorial-fact and provenance regression for Issue #281.
 *
 * Current KiKi remains the geometry authority. This suite protects the
 * evidence-backed five-chapter Story copy and its compact source disclosure.
 */
import { expect, test, type Locator, type Page } from '@playwright/test';

const locales = [
  {
    locale: 'ja',
    wasabi: {
      path: '/story/wasabi-okutama',
      title: '水がつなぐ、江戸から続く辛味',
      intro: '奥多摩町は東京都の北西端にあり、町域225.53平方キロメートルは都内の区市町村で最も広く、94％が山林です。',
      chapter: '江戸後期の史料に地域の特産品・幕府への献上品として登場します。',
      point: '東京都の公式紹介では、力を入れず細かくすりおろすと風味と辛味が引き出され、3〜5分で香りと辛味が最も高まるとされています。',
    },
    yamame: {
      path: '/story/yamame-okutama',
      title: '研究から生まれた、大型のヤマメ',
      intro: '「奥多摩やまめ」は、東京都水産試験場奥多摩分場が研究・作出した全雌三倍体の養殖ヤマメです。',
      naming: '全雌三倍体ヤマメの商品名は1998年7月に選定され、同年11月に奥多摩町で新ブランドとして発表されました。',
      center: '奥多摩さかな養殖センターは、入川と海沢の2か所の飼育池を運営しています。',
    },
    disclosure: '2026年8月24日に取得した公式情報をもとに編集したデモ記事です。未確認の人物・数値・因果関係は掲載していません。最新情報は各公式サイトをご確認ください。',
    homeYamame: '研究から生まれた、大型のヤマメ',
    routeAction: 'この食文化の観光ルートを作成する',
  },
  {
    locale: 'en',
    wasabi: {
      path: '/story/wasabi-okutama',
      title: 'A pungent taste carried by water since Edo',
      intro: 'Okutama lies at Tokyo’s northwestern edge. At 225.53 km², it is Tokyo’s largest municipality by area, and 94% of the town is forest.',
      chapter: 'Late-Edo records describe Okutama wasabi as a local specialty presented to the shogunate.',
      point: 'Tokyo’s official guide says gentle, fine grating brings out its flavor and heat, which peak after about 3–5 minutes',
    },
    yamame: {
      path: '/story/yamame-okutama',
      title: 'A large yamame born from research',
      intro: 'Okutama Yamame is an all-female triploid farmed yamame created through research at the Tokyo Metropolitan Fisheries Experiment Station’s Okutama Branch.',
      naming: 'The product name for the all-female triploid yamame was selected in July 1998 and presented as a new brand in Okutama that November.',
      center: 'The Okutama Fish Farming Center operates pond sites at Irikawa and Unazawa.',
    },
    disclosure: 'Demo editorial story based on official sources retrieved 24 Aug 2026. Unverified biographies, figures, and causal claims are not presented as facts.',
    homeYamame: 'A large yamame born from research',
    routeAction: 'Create a sightseeing route for this food culture',
  },
  {
    locale: 'zh-TW',
    wasabi: {
      path: '/story/wasabi-okutama',
      title: '由水串起、延續自江戶的辛香',
      intro: '奧多摩町位於東京都西北端，面積225.53平方公里，為東京都各區市町村之最，其中94%為山林。',
      chapter: '江戶後期史料記載，奧多摩山葵是當地特產，並曾進獻幕府',
      point: '東京都官方介紹指出，輕柔細磨可帶出風味與辛味，約3–5分鐘達到高峰',
    },
    yamame: {
      path: '/story/yamame-okutama',
      title: '從研究中誕生的大型山女魚',
      intro: '「奧多摩山女魚」是東京都水產試驗場奧多摩分場經研究培育出的全雌三倍體養殖山女魚。',
      naming: '這款全雌三倍體山女魚的商品名稱於1998年7月選定，並於同年11月在奧多摩以新品牌對外發表。',
      center: '奧多摩魚類養殖中心營運入川與海澤兩處養殖池',
    },
    disclosure: '本示範編輯故事依據 2026 年 8 月 24 日取得的官方資料整理；未確認的人物經歷、數字與因果關係不作為事實呈現。',
    homeYamame: '從研究中誕生的大型山女魚',
    routeAction: '建立這項飲食文化的觀光路線',
  },
] as const;

const bannedClaims = /デイビッド・ヒューム|約10人|30代|約1年半|塩や醤油|生産者の収入|約120年|4代目|山梨出身|病気に弱い|養殖研究施設が2か所|希少な川魚|日帰り中心|宿泊客|David Hume|rare river fish|two research facilities|faster growth|珍稀河魚|兩處研究設施/;

async function openAs(page: Page, locale: string, path: string): Promise<Locator> {
  await page.goto('/');
  await page.evaluate((nextLocale) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('tmm:locale', nextLocale);
  }, locale);
  await page.goto(path);
  const story = page.locator('[data-screen="story"][data-screen-active="true"]');
  await expect(story).toBeVisible();
  return story;
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect.poll(() => page.evaluate(() => {
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
  })).toEqual({
    documentClient: 375,
    documentScroll: 375,
    phoneClient: 375,
    phoneScroll: 375,
    screenClient: 375,
    screenScroll: 375,
  });
}

async function expectSafeStorySources(facts: Locator, expectedCount: number): Promise<void> {
  await expect(facts).toHaveAttribute('data-verification-status', 'needs_confirmation');
  await expect(facts).toHaveAttribute('data-source-retrieved-at', '2026-08-24');
  const links = facts.getByRole('link');
  await expect(links).toHaveCount(expectedCount);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\//);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('rel', /noreferrer/);
    await expect(link).toHaveAttribute('data-verification-status', 'needs_confirmation');
    await expect(link).toHaveAttribute('data-source-retrieved-at', '2026-08-24');
  }
}

async function expectChapterCarouselUsable(story: Locator): Promise<void> {
  const carousel = story.locator('.story-sec').first().locator('.hscroll');
  const cards = carousel.locator('.page-card');
  await expect(cards).toHaveCount(5);
  await carousel.scrollIntoViewIfNeeded();
  const before = await carousel.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    scrollLeft: element.scrollLeft,
  }));
  expect(before.scrollWidth).toBeGreaterThan(before.clientWidth);
  await carousel.evaluate((element) => element.scrollTo({ left: element.scrollWidth, behavior: 'instant' }));
  await expect.poll(() => carousel.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(cards.last()).toBeInViewport();
}

async function expectStickyCtaUsable(story: Locator, actionName: string): Promise<void> {
  const scroller = story.locator(':scope > .scroll');
  await scroller.evaluate((element) => element.scrollTo({ top: element.scrollHeight, behavior: 'instant' }));
  const cta = story.getByRole('button', { name: actionName });
  await expect(cta).toBeVisible();
  await expect(cta).toBeEnabled();
  const [ctaBox, screenBox] = await Promise.all([cta.boundingBox(), story.boundingBox()]);
  expect(ctaBox).not.toBeNull();
  expect(screenBox).not.toBeNull();
  expect(ctaBox!.x).toBeGreaterThanOrEqual(screenBox!.x);
  expect(ctaBox!.x + ctaBox!.width).toBeLessThanOrEqual(screenBox!.x + screenBox!.width);
  expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(screenBox!.y + screenBox!.height);
}

test('shows source-backed five-chapter Story fixtures for both identities in every locale (#281)', async ({ page }) => {
  test.setTimeout(45_000);
  await page.setViewportSize({ width: 375, height: 812 });

  for (const expected of locales) {
    let story = await openAs(page, expected.locale, expected.wasabi.path);
    await expect(story.getByRole('heading', { name: expected.wasabi.title })).toBeVisible();
    await expect(story.getByText(expected.wasabi.intro, { exact: false })).toBeVisible();
    await expect(story.getByText(expected.wasabi.chapter, { exact: false })).toBeVisible();
    await expect(story.getByText(expected.wasabi.point, { exact: false })).toBeVisible();
    await expect(story.getByText(bannedClaims)).toHaveCount(0);
    let facts = story.locator('[data-presentation-facts]');
    await expect(facts.getByText(expected.disclosure, { exact: true })).toBeVisible();
    await expectSafeStorySources(facts, 6);
    await expectChapterCarouselUsable(story);
    await expectStickyCtaUsable(story, expected.routeAction);
    await expectNoHorizontalOverflow(page);

    story = await openAs(page, expected.locale, expected.yamame.path);
    await expect(story.getByRole('heading', { name: expected.yamame.title })).toBeVisible();
    await expect(story.getByText(expected.yamame.intro, { exact: true })).toBeVisible();
    await expect(story.getByText(expected.yamame.naming, { exact: true })).toBeVisible();
    await expect(story.locator('.page-card').getByText(expected.yamame.center, { exact: false })).toBeVisible();
    await expect(story.getByText(bannedClaims)).toHaveCount(0);
    facts = story.locator('[data-presentation-facts]');
    await expect(facts.getByText(expected.disclosure, { exact: true })).toBeVisible();
    await expectSafeStorySources(facts, 5);
    await expectChapterCarouselUsable(story);
    await expectStickyCtaUsable(story, expected.routeAction);
    await expectNoHorizontalOverflow(page);

    await page.goto('/home');
    await expect(page.locator('[data-screen="home"][data-screen-active="true"]')
      .getByText(expected.homeYamame, { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});
