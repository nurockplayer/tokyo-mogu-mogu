import { expect, test, type Page } from '@playwright/test';
import { checkJourneyAdmission, resolveJourneyVisitorSource } from '../src/data/journey-admission';
import { JOURNEY_RECORDS } from '../src/data/journey-records';

const publicationDate = new Date('2026-11-27T13:00:00Z');
const publication = JOURNEY_RECORDS.map((record) => ({
  record,
  ...checkJourneyAdmission(record, publicationDate),
}));
const admitted = publication.find(({ admitted }) => admitted);
const excluded = publication.find(({ admitted }) => !admitted)?.record;
const retrievalDate = /\d{4}-\d{2}-\d{2}(?: \/ \d{4}-\d{2}-\d{2})* \(JST\)/;

for (const [locale, viewRoute, unavailable, backToMogu] of [
  ['ja', 'この食旅のルートを見る', 'この食旅は現在ご覧いただけません', 'モグモグるに戻る'],
  ['en', 'View this route', 'This food journey is currently unavailable', 'Back to MOGU'],
  ['zh-TW', '查看這趟美食之旅的路線', '目前無法瀏覽這趟美食之旅', '返回 MOGU'],
] as const) {
  test(`#442 walks the admitted journey in ${locale}`, async ({ page, context }, testInfo) => {
    expect(admitted, 'The publication snapshot must contain an admitted journey').toBeDefined();
    const { record, defaultVariant } = admitted!;
    const { id: admittedId, storyId } = record.journey;
    const primarySpotId = defaultVariant!.primarySpotId!;
    const variant = record.variants[defaultVariant!.id]!;
    const arrival = variant.arrival!;
    const visitorSource = resolveJourneyVisitorSource(record, primarySpotId, publicationDate)!;
    const officialDestination = visitorSource.url;
    await page.clock.setFixedTime(publicationDate);
    await page.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
    const active = (screen: string) => page.locator(`[data-screen="${screen}"][data-screen-active="true"]`);
    const screenshot = async (name: string) => {
      if (locale === 'ja') await page.screenshot({ path: testInfo.outputPath(`${name}.png`), animations: 'disabled' });
    };

    await page.goto('/mogu');
    const mogu = active('mogu');
    const card = mogu.locator(`[data-journey-id="${admittedId}"]`);
    await expect(card).toBeVisible();
    await expect(card).toContainText(retrievalDate);
    await screenshot('mogu-ja');
    await card.click();

    const story = active('story');
    await expect(page).toHaveURL(`/story/${storyId}`);
    await expect(story.locator('.page-card').first()).toContainText(retrievalDate);
    await screenshot('story-ja');
    await story.getByRole('button', { name: viewRoute }).click();
    await expect(story.locator('[data-route-loading][data-loading="true"]')).toHaveCount(0);

    const route = active('route');
    await expect(page).toHaveURL(`/route?candidateId=${admittedId}`);
    await expect(route.locator('.route-info')).toContainText(arrival.name[locale]);
    await expect(route.locator('.route-info')).toContainText(record.sources[arrival.sourceId].retrievedAt!);
    await expect(route.locator('.route-stats')).toContainText(variant.stats[locale].time);
    await expect(route.locator('.regen')).toHaveCount(0);
    await route.locator('.route-info').scrollIntoViewIfNeeded();
    await screenshot('route-ja');
    await route.locator(`[data-spot-id="${primarySpotId}"]`).click();

    const spot = active('spot');
    const guide = spot.locator('.guide-box');
    const handoff = guide.getByRole('link');
    await expect(page).toHaveURL(`/spot/${primarySpotId}?candidateId=${admittedId}`);
    await expect(spot.locator('.info-sec')).toContainText(retrievalDate);
    await expect(guide).toContainText(visitorSource.retrievedAt);
    await expect(handoff).toHaveAttribute('href', officialDestination);
    await expect(handoff).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(spot).not.toContainText(/予約が完了|アレルギーでも安心|booking confirmed|allergy.safe|預約成功|過敏者可安心/i);
    await expectNoHorizontalOverflow(page);
    await guide.scrollIntoViewIfNeeded();
    await screenshot('spot-ja');
    await context.route(officialDestination, (request) => request.fulfill({ body: 'Official visitor information' }));
    const popupPromise = page.waitForEvent('popup');
    await handoff.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(officialDestination);
    await popup.close();
  });

  test(`#442 hides excluded journeys and their direct links in ${locale}`, async ({ page }, testInfo) => {
    test.skip(!excluded, 'The publication snapshot has no excluded journey records');
    const { id, storyId, routeId, routeVariants } = excluded!.journey;
    const { spotId } = routeVariants[0].steps[0];
    await page.clock.setFixedTime(publicationDate);
    await page.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
    await page.goto('/mogu');
    const mogu = page.locator('[data-screen="mogu"][data-screen-active="true"]');
    await expect(mogu).toBeVisible();
    await expect(mogu.locator(`[data-journey-id="${id}"]`)).toHaveCount(0);

    const unavailableScreen = page.locator('[data-screen="journey-unavailable"][data-screen-active="true"]');
    for (const path of [`/story/${storyId}`, `/route?routeId=${routeId}`, `/spot/${spotId}?candidateId=${id}`]) {
      await page.goto(path);
      await expect(unavailableScreen.getByRole('heading', { name: unavailable })).toBeVisible();
      await expect(unavailableScreen.locator('header').getByRole('button')).toBeVisible();
      await expect(unavailableScreen.getByRole('navigation')).toBeVisible();
      await expect(unavailableScreen.getByRole('link', { name: backToMogu })).toHaveAttribute('href', '/mogu');
    }
    await expectNoHorizontalOverflow(page);
    const textFits = await unavailableScreen.locator('h1, p').evaluateAll((elements) =>
      elements.every((element) => element.scrollWidth <= element.clientWidth),
    );
    expect(textFits).toBe(true);
    if (locale === 'ja') {
      await page.screenshot({ path: testInfo.outputPath('unavailable-ja.png'), animations: 'disabled' });
    }
    await page.getByRole('link', { name: backToMogu }).click();
    await expect(page).toHaveURL('/mogu');
  });
}

test('#442 gives an expired optional Spot guidance and a way back', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-12-21T15:00:00Z'));
  const journeyId = 'b01-hachioji-takao-soba';
  await page.goto(`/spot/${journeyId}-takahashiya?candidateId=${journeyId}`);
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  const guide = spot.locator('.guide-box');
  await expect(guide).toContainText('現在利用できる公式の訪問案内リンクはありません');
  await expect(guide.getByRole('link')).toHaveCount(0);
  await expect(guide.getByRole('button')).toHaveCount(0);
  await spot.getByRole('button', { name: '戻る' }).click();
  await expect(page).toHaveURL(`/route?candidateId=${journeyId}`);
  await expect(page.locator('[data-screen="route"][data-screen-active="true"]')).toBeVisible();
});

test('opens canonical Spot information safely with the keyboard', async ({ page, context }) => {
  const destinations = [
    ['okutama-tourism-office', 'https://www.okutama.gr.jp/site/'],
    ['wasabi-kitchen', 'https://tokyowasabi.com/category/information/'],
    ['wasabi-experience', 'https://tokyowasabi.com/wasabi-experience/#booking-form'],
    ['hikawa-valley', 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html'],
    ['sawai-ozawa-shuzo', 'https://www.sawanoi-sake.com/service/kengaku/'],
  ];
  for (const [id, url] of destinations) {
    // Fulfil the external request locally: no operator traffic or booking action.
    await context.route(url.split('#')[0], (route) => route.fulfill({ contentType: 'text/html', body: '<title>Official destination test</title>' }));
    await page.goto(`/spot/${id}`);
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    const link = spot.locator('.guide-box a.book');
    await expect(link).toHaveAttribute('href', url);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await link.focus();
    await expect(link).toBeFocused();
    const popupPromise = page.waitForEvent('popup');
    await page.keyboard.press('Enter');
    const popup = await popupPromise;
    await expect(popup).toHaveURL(url);
    await popup.waitForLoadState();
    expect(await popup.evaluate(() => window.opener)).toBeNull();
    await popup.close();
    await expect(page).toHaveURL(new RegExp(`/spot/${id}$`));
  }
});

test('keeps an unavailable official destination local with honest feedback in every locale', async ({ page }) => {
  let unavailableSourceInjected = false;
  // Exercise a missing/unsupported source in the production bundle without a
  // test-only runtime route or a guessed URL in canonical Product data.
  await page.route('**/assets/*.js', async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    const source = 'https://www.okutama.gr.jp/site/';
    unavailableSourceInjected ||= body.includes(source);
    await route.fulfill({ response, body: body.replaceAll(source, 'unsupported:') });
  });
  for (const [locale, feedback] of [
    ['ja', 'このスポットの公式最新情報リンクは現在用意されていません。'],
    ['en', 'An official current-information link is not available for this spot yet.'],
    ['zh-TW', '目前尚未提供此景點的官方最新資訊連結。'],
  ]) {
    await page.goto('/');
    await page.evaluate((value) => localStorage.setItem('tmm:locale', value), locale);
    await page.goto('/spot/okutama-tourism-office');
    expect(unavailableSourceInjected).toBe(true);
    const guide = page.locator('[data-screen="spot"][data-screen-active="true"] .guide-box');
    await expect(guide.getByRole('link')).toHaveCount(0);
    const action = guide.getByRole('button');
    await action.focus();
    await expect(action).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status')).toHaveText(feedback);
    await expect(page).toHaveURL(/\/spot\/okutama-tourism-office$/);
    expect(page.context().pages()).toHaveLength(1);
    await expectNoHorizontalOverflow(page);
  }
});

const persistedFoodProfile = {
  dietary: [],
  dietaryOther: '',
  hasNoRestrictions: true,
  savedAt: '2026-08-24T00:00:00.000Z',
  version: 1,
};

async function seedPersistedProfile(page: Page): Promise<void> {
  await page.addInitScript((profile) => {
    localStorage.setItem('tmm:nickname:v1', '123');
    localStorage.setItem('tmm:foodProfile:v1', JSON.stringify(profile));
  }, persistedFoodProfile);
}

async function startFromWelcome(page: Page): Promise<void> {
  await page.goto('/');
  const splash = page.locator('[data-screen="splash"][data-screen-active="true"]');
  await expect(splash).toBeVisible();
  await splash.click();
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        phoneClientWidth: document.querySelector<HTMLElement>('.reference-phone')?.clientWidth,
        phoneScrollWidth: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth,
      })),
    )
    .toEqual({
      documentClientWidth: 375,
      documentScrollWidth: 375,
      phoneClientWidth: 375,
      phoneScrollWidth: 375,
    });
}

async function reachProfilePreferences(page: Page, allergy = false) {
  const splash = page.locator('[data-screen="splash"][data-screen-active="true"]');
  await expect(splash).toBeVisible();
  await splash.click();

  await expect(page).toHaveURL(/\/food-profile$/);
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  await expect(profile).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await profile.getByRole('button', { name: 'はじめる！' }).click();
  const nicknameDialog = profile.getByRole('dialog', { name: '私は...' });
  const nicknameInput = nicknameDialog.getByRole('textbox', { name: 'ニックネームを入力' });
  await expect(nicknameInput).toBeFocused();
  await nicknameInput.fill('ナナ');
  await nicknameDialog.getByRole('button', { name: '送信', exact: true }).click();

  const noRestrictionChoices = [
    'アレルギーはありません',
    '特になし',
    '特になし',
    '特になし',
  ];
  for (const [questionIndex, choice] of noRestrictionChoices.entries()) {
    const question = profile.locator(`[data-question-index="${questionIndex}"]`);
    await expect(question).toBeVisible();
    const answer = allergy && questionIndex === 0 ? '🥚 卵' : choice;
    await question.getByRole('button', { name: answer, exact: true }).click();
    await question.getByRole('button', { name: '送信', exact: true }).click();
    await expect(question).toHaveAttribute('data-frozen', 'true');
  }

  await expect(profile.getByRole('heading', { name: '食旅の希望（任意）' })).toBeVisible();
  return profile;
}

async function completeExploration(page: Page): Promise<void> {
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  for (let step = 1; step <= 5; step += 1) {
    await expect(explore.getByLabel(`${step} / 5`)).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await explore.getByRole('button', { name: '次へ', exact: true }).click();
  }
}

async function findJourneysFromProfile(page: Page, profile: Awaited<ReturnType<typeof reachProfilePreferences>>) {
  await profile.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
  await expect(page).toHaveURL('/home');
  const home = page.locator('[data-screen="home"][data-screen-active="true"]');
  await home.getByRole('button', { name: /Let's Go!/ }).click();
  await expect(page).toHaveURL('/explore');
  await completeExploration(page);
  await expect(page).toHaveURL('/explore/result');
  return page.locator('[data-screen="result"][data-screen-active="true"]');
}

test('#443 applies two Food Profiles, explains empty results and clears filters', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.clock.setFixedTime(publicationDate);
  const screenshot = (name: string) => page.screenshot({ path: testInfo.outputPath(`${name}.png`), animations: 'disabled' });
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  const cards = result.locator('[data-journey-id]');
  const firstReason = result.locator('[data-match-reason]').first();
  const ids = () => cards.evaluateAll((items) => items.map((item) => item.getAttribute('data-journey-id')));

  await page.goto('/');
  let profile = await reachProfilePreferences(page);
  await profile.getByLabel('出発エリア').selectOption({ label: '八王子市' });
  await profile.getByLabel('出発駅・停留所').selectOption({ label: '八王子駅' });
  await profile.getByLabel('現地で使える時間').selectOption({ label: '120分以内' });
  await expectNoHorizontalOverflow(page);
  await profile.getByRole('heading', { name: '食旅の希望（任意）' }).scrollIntoViewIfNeeded();
  await screenshot('food-profile-ja');
  await findJourneysFromProfile(page, profile);
  await expect(firstReason).toContainText('出発エリア · 八王子市');
  await expect(firstReason).toContainText('出発駅・停留所 · 八王子駅');
  await expect(firstReason).toContainText('現地で使える時間 · 120分以内');
  await screenshot('result-profile-one-ja');
  const firstIds = await ids();

  await page.goto('/');
  profile = await reachProfilePreferences(page, true);
  await expect(profile.getByLabel('出発エリア')).toHaveValue('hachioji');
  await findJourneysFromProfile(page, profile);
  await expect(result.getByText('調理中の混入', { exact: false })).toBeVisible();
  expect(await ids()).toEqual(firstIds);

  await page.goto('/');
  profile = await reachProfilePreferences(page);
  await profile.getByLabel('出発エリア').selectOption({ label: '福生市' });
  await profile.getByLabel('出発駅・停留所').selectOption('');
  await findJourneysFromProfile(page, profile);
  await expect(firstReason).toContainText('出発エリア · 福生市');
  await expect(firstReason).toContainText('120分以内');
  const secondIds = await ids();
  expect(secondIds.every((id) => !firstIds.includes(id))).toBe(true);
  await screenshot('result-profile-two-ja');

  await result.getByRole('button', { name: '条件を変更' }).click();
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  const next = explore.getByRole('button', { name: '次へ', exact: true });
  await next.click();
  await next.click();
  await explore.getByLabel('現地で使える時間').selectOption({ label: '15分以内' });
  await next.click();
  await next.click();
  await next.click();

  await expect(result.getByText('条件に合う食旅が見つかりませんでした。')).toBeVisible();
  await expect(result.locator('.empty')).toContainText('出発エリア · 福生市');
  await expect(result.locator('.empty')).toContainText('現地で使える時間 · 15分以内');
  await expect(cards).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  await screenshot('result-empty-ja');
  await result.getByRole('button', { name: '条件をクリア' }).click();
  await expect(firstReason).toContainText('公開中の食旅');
  expect((await ids()).some((id) => firstIds.includes(id))).toBe(true);
});

test('#443 skips Food Profile to browse the admitted catalog', async ({ page }) => {
  await page.clock.setFixedTime(publicationDate);
  await startFromWelcome(page);
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  await profile.getByRole('button', { name: '登録なし、自分で見てみる' }).click();
  await expect(page).toHaveURL('/mogu');
  await expect(page.locator('[data-screen="mogu"][data-screen-active="true"] [data-journey-id]').first()).toBeVisible();
});

test('completes the current Exploration when its sessionStorage write is blocked', async ({
  page,
}) => {
  await page.clock.setFixedTime(publicationDate);
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (this === window.sessionStorage && key === 'tmm:exploration:v1') {
        throw new Error('blocked exploration session write');
      }
      originalSetItem.call(this, key, value);
    };
  });

  await page.goto('/home');
  const home = page.locator('[data-screen="home"][data-screen-active="true"]');
  await home.getByRole('button', { name: /Let's Go!/ }).click();
  await expect(page).toHaveURL(/\/explore$/);
  await completeExploration(page);

  await expect(page).toHaveURL(/\/explore\/result$/);
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  await expect(result.getByRole('button', { name: /この物語を読む:/ }).first()).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test.describe('Issue #316 Welcome entry routing', () => {
  test('starts the Food Profile conversation with clean storage', async ({ page }) => {
    await startFromWelcome(page);

    await expect(page).toHaveURL(/\/food-profile$/);
    await expect(
      page.locator('[data-screen="food-profile"][data-screen-active="true"]'),
    ).toBeVisible();
  });

  test('starts the Food Profile conversation with a persisted nickname and profile', async ({
    page,
  }) => {
    await seedPersistedProfile(page);
    await startFromWelcome(page);

    await expect(page).toHaveURL(/\/food-profile$/);
    await expect(page).not.toHaveURL(/\/home$/);
    await expect(
      page.locator('[data-screen="food-profile"][data-screen-active="true"]'),
    ).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('tmm:nickname:v1')))
      .toBe('123');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('tmm:foodProfile:v1')))
      .not.toBeNull();
  });

  test('keeps direct Home navigation directly accessible', async ({ page }) => {
    await seedPersistedProfile(page);
    await page.goto('/home');

    await expect(page).toHaveURL(/\/home$/);
    const home = page.locator('[data-screen="home"][data-screen-active="true"]');
    await expect(home).toBeVisible();
    await expect(home.getByText('123さん')).toBeVisible();
  });
});

test('completes the current 375px Japanese Golden Path and preserves saved state', async ({
  page,
}) => {
  test.setTimeout(45_000);

  await page.clock.setFixedTime(publicationDate);
  await page.goto('/');
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'ja');
  const result = await findJourneysFromProfile(page, await reachProfilePreferences(page));
  await expectNoHorizontalOverflow(page);

  const firstCard = result.locator('[data-journey-id]').first();
  await expect(firstCard).toBeVisible();
  const journeyId = await firstCard.getAttribute('data-journey-id');
  await firstCard.click();
  await expect(page).toHaveURL(/\/story\/[^/]+$/);

  const story = page.locator('[data-screen="story"][data-screen-active="true"]');
  await expectNoHorizontalOverflow(page);
  await story.getByRole('button', { name: 'この食旅のルートを見る' }).click();

  await expect(page).toHaveURL(`/route?candidateId=${journeyId}`);
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  await expectNoHorizontalOverflow(page);
  await route.getByRole('button', { name: 'マイルートに保存' }).click();
  await expect(route.getByRole('button', { name: '保存済み' })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(route.getByRole('button', { name: '保存済み' })).toHaveAttribute('aria-pressed', 'true');

  const firstStop = route.locator('[data-spot-id]').first();
  const spotId = await firstStop.getAttribute('data-spot-id');
  await firstStop.click();
  await expect(page).toHaveURL(`/spot/${spotId}?candidateId=${journeyId}`);
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expectNoHorizontalOverflow(page);
  await spot.getByRole('button', { name: 'お気に入りに保存' }).click();
  await expect(spot.getByRole('button', { name: 'お気に入りから削除' })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(spot.getByRole('button', { name: 'お気に入りから削除' })).toHaveAttribute('aria-pressed', 'true');

  const dock = spot.getByRole('navigation', { name: 'Primary' });
  await expect(dock.getByRole('button')).toHaveCount(4);
  for (const destination of ['食旅を見つけ', 'モグモグる', 'お気に入り', 'マイ']) {
    await expect(dock.getByRole('button', { name: destination })).toBeVisible();
  }
  await dock.getByRole('button', { name: 'お気に入り' }).click();

  await expect(page).toHaveURL(/\/my-route$/);
  const favorites = page.locator('[data-screen="favorites"][data-screen-active="true"]');
  await expect(favorites.locator(`[data-journey-id="${journeyId}"]`)).toBeVisible();
  await expect(favorites.locator(`[data-spot-id="${spotId}"]`)).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await favorites
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'マイ' })
    .click();

  await expect(page).toHaveURL(/\/my$/);
  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  await my
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'モグモグる' })
    .click();

  await expect(page).toHaveURL(/\/mogu$/);
  const mogu = page.locator('[data-screen="mogu"][data-screen-active="true"]');
  await mogu
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: '食旅を見つけ' })
    .click();
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator('[data-screen="home"][data-screen-active="true"]')).toBeVisible();
});

test('opens the source-backed Yamashiroya Spot from the full-day Route (#323)', async ({
  page,
}) => {
  await page.goto('/route?candidateId=demo-okutama-wasabi');
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');

  await route.getByRole('button', { name: '一日', exact: true }).click();
  const yamashiroyaCard = route.locator('[data-spot-id="yamashiroya"]');
  await expect(yamashiroyaCard).toContainText('奥多摩わさび本舗 山城屋');
  await expect(yamashiroyaCard).toContainText('わさび漬・生わさび');
  await yamashiroyaCard.click();

  await expect(page).toHaveURL(
    /\/spot\/yamashiroya\?candidateId=demo-okutama-wasabi$/,
  );
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expect(
    spot.getByRole('heading', { name: '奥多摩わさび本舗 山城屋' }),
  ).toBeVisible();
  await expect(spot).toContainText('東京都西多摩郡奥多摩町氷川717-3');
  await expect(spot).toContainText('0428-83-2368');
  await expect(spot).toContainText('9:00〜17:00');
  await expect(spot).toContainText('JR「奥多摩駅」より徒歩3分');
  await expect(spot).toContainText('あり（12台・大型車可）');
  await expect(spot).toContainText('12月30日～1月4日');
  await expect(spot).toContainText('12月30日～1月5日');
  await expect(spot).toContainText('不一致。最新情報を確認');
  await expect(spot).toContainText('掲載内容は現在確認中です');
  await expect(spot).not.toContainText(/創業172年|6代目|参考スポットです/);
  await expectNoHorizontalOverflow(page);
});

test('opens the source-backed Okutama no Daidokoro Spot from the half-day Route (#325)', async ({
  page,
}) => {
  await page.goto('/route?candidateId=demo-okutama-wasabi');
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  const kitchenCard = route.locator('[data-spot-id="okutama-kitchen"]');

  await expect(kitchenCard).toContainText('手作りお弁当・お惣菜の専門店 奥多摩の台所');
  await expect(kitchenCard).toContainText('特選ソフトジェラート');
  await expect(kitchenCard).toContainText('わさび味');
  await kitchenCard.click();

  await expect(page).toHaveURL(
    /\/spot\/okutama-kitchen\?candidateId=demo-okutama-wasabi$/,
  );
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expect(
    spot.getByRole('heading', {
      name: '手作りお弁当・お惣菜の専門店 奥多摩の台所',
    }),
  ).toBeVisible();
  await expect(spot).toContainText('〒198-0212 東京都西多摩郡奥多摩町氷川199-7');
  await expect(spot).toContainText('0428-83-2401');
  await expect(spot).toContainText('9:00〜18:00（L.O. 16:00）');
  await expect(spot).toContainText('JR青梅線「奥多摩駅」より徒歩1分');
  await expect(spot).toContainText('木曜日');
  await expect(spot).toContainText('駐車場なし（近隣コインパーキングあり）');
  await expect(spot).toContainText('サイト掲載価格・提供状況は要確認');
  await expect(spot).toContainText('掲載内容は現在確認中です');
  await expect(spot).not.toContainText(/わさびジェラートが名物|参考スポットです/);
  await expectNoHorizontalOverflow(page);
});

test('keeps the source-backed Okutama no Daidokoro facts safe in every locale (#325)', async ({
  page,
}) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      name: '手作りお弁当・お惣菜の専門店 奥多摩の台所',
      hours: '9:00〜18:00（L.O. 16:00）',
      parking: '駐車場なし',
      product: '特選ソフトジェラート',
      pending: '確認中',
    },
    {
      locale: 'en',
      name: 'Okutama no Daidokoro Handmade Bento & Deli',
      hours: '09:00–18:00 (L.O. 16:00)',
      parking: 'No on-site parking',
      product: 'Special soft gelato',
      pending: 'Confirmation pending',
    },
    {
      locale: 'zh-TW',
      name: '手作便當與熟食專門店 奧多摩的廚房',
      hours: '09:00–18:00（最後點餐 16:00）',
      parking: '無店內停車場',
      product: '特選霜淇淋',
      pending: '確認中',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/okutama-kitchen?candidateId=demo-okutama-wasabi');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText(expected.hours);
    await expect(spot).toContainText(expected.parking);
    await expect(spot).toContainText(expected.product);
    await expect(spot).toContainText(expected.pending);
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }
});

test('opens the source-backed PORT OKUTAMA Spot from both Route variants (#327)', async ({
  page,
}) => {
  await page.goto('/route?candidateId=demo-okutama-wasabi');
  let route = page.locator('[data-screen="route"][data-screen-active="true"]');
  let portCard = route.locator('[data-spot-id="port-okutama"]');

  await expect(portCard).toContainText('PORT OKUTAMA');
  await expect(portCard).toContainText('食事・コーヒー・土産');
  await portCard.click();

  await expect(page).toHaveURL(
    /\/spot\/port-okutama\?candidateId=demo-okutama-wasabi$/,
  );
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expect(spot.getByRole('heading', { name: 'PORT OKUTAMA' })).toBeVisible();
  await expect(spot).toContainText('東京都西多摩郡奥多摩町氷川210（JR奥多摩駅2階）');
  await expect(spot).toContainText('0428-85-8630');
  await expect(spot).toContainText('平日 11:00〜17:00（L.O. 16:30）');
  await expect(spot).toContainText('土日祝 11:00〜17:30（L.O. 17:00）');
  await expect(spot).toContainText('無休（不定休あり・最新情報を確認）');
  await expect(spot).toContainText('食事・スペシャルティコーヒー・クラフトビール');
  await expect(spot).toContainText('https://www.okutama.ne.jp/');
  await expect(spot).toContainText('掲載内容は現在確認中です');
  await expect(spot).not.toContainText(/旅の最後に立ち寄るための、参考スポットです|Netlify/);
  await expectNoHorizontalOverflow(page);

  await page.goto('/route?candidateId=demo-okutama-wasabi');
  route = page.locator('[data-screen="route"][data-screen-active="true"]');
  await route.getByRole('button', { name: '一日', exact: true }).click();
  portCard = route.locator('[data-spot-id="port-okutama"]');
  await expect(portCard).toContainText('スペシャルティコーヒー');
  await expect(portCard).toContainText('提供状況は要確認');
  await expectNoHorizontalOverflow(page);
});

test('keeps source-backed PORT OKUTAMA facts safe in every locale (#327)', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      hours: '平日 11:00〜17:00',
      services: '食事・スペシャルティコーヒー',
      closures: '不定休あり',
      pending: '確認中',
    },
    {
      locale: 'en',
      hours: 'Weekdays 11:00–17:00',
      services: 'Food, specialty coffee',
      closures: 'irregular closures may occur',
      pending: 'Confirmation pending',
    },
    {
      locale: 'zh-TW',
      hours: '平日 11:00–17:00',
      services: '餐飲、精品咖啡',
      closures: '可能臨時休業',
      pending: '確認中',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/port-okutama?candidateId=demo-okutama-wasabi');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot.getByRole('heading', { name: 'PORT OKUTAMA' })).toBeVisible();
    await expect(spot).toContainText(expected.hours);
    await expect(spot).toContainText(expected.services);
    await expect(spot).toContainText(expected.closures);
    await expect(spot).toContainText(expected.pending);
    await expect(spot).toContainText('https://www.okutama.ne.jp/');
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }
});

test('keeps Akabeko phone divergence and source-backed operations visible in every locale (#326)', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      name: '炉ばた あかべこ',
      hours: 'ランチ 11:30〜L.O. 13:30',
      reservation: '予約推奨',
      routing: '利用する番号は未確認',
      conflict: '電話情報に不一致',
    },
    {
      locale: 'en',
      name: 'Robata Akabeko',
      hours: 'Lunch 11:30–L.O. 13:30',
      reservation: 'Reservations recommended',
      routing: 'which number to use remains unconfirmed',
      conflict: 'Phone sources conflict',
    },
    {
      locale: 'zh-TW',
      name: '爐端燒 AKABEKO',
      hours: '午餐 11:30–最後點餐 13:30',
      reservation: '建議預約',
      routing: '應使用哪個號碼尚未確認',
      conflict: '電話資訊不一致',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/akabeko?candidateId=demo-okutama-wasabi');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText('050-5304-3644');
    await expect(spot).toContainText('0428-83-2365');
    await expect(spot).toContainText(expected.hours);
    await expect(spot).toContainText(expected.reservation);
    await expect(spot).toContainText(expected.routing);
    await expect(spot).toContainText(expected.conflict);
    await expect(spot).toContainText('https://akabeko.tokyo/');
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }

  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('tmm:locale', 'ja'));
  await page.goto('/route?candidateId=demo-okutama-wasabi');
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  await route.getByRole('button', { name: '一日', exact: true }).click();
  await expect(route.locator('[data-spot-id="akabeko"]')).toContainText('L.O. 13:30');
  await expectNoHorizontalOverflow(page);

  await page.goto('/story/wasabi-okutama?candidateId=demo-okutama-wasabi');
  const story = page.locator('[data-screen="story"][data-screen-active="true"]');
  await expect(story.locator('[data-spot-id="akabeko"]')).toContainText('わさびジェラート');
  await expectNoHorizontalOverflow(page);
});

test('keeps Wasabi Shokudo mobile and time-sensitive in every locale (#324)', async ({ page }) => {
  const localizedExpectations = [
    { locale: 'ja', name: 'わさび食堂', addressLabel: '住所', foodTruck: '固定店舗のないキッチンカー', operatingArea: 'JR青梅線「奥多摩駅」前を中心', schedule: '最新の公式予定', priceDate: '2026年7月', conflict: '公式ページ間で不一致' },
    { locale: 'en', name: 'Wasabi Shokudo', addressLabel: 'Address', foodTruck: 'Mobile food truck with no permanent storefront', operatingArea: 'Mainly around the front of JR Okutama Station', schedule: 'current official schedule', priceDate: 'July 2026', conflict: 'Official pages conflict' },
    { locale: 'zh-TW', name: '山葵食堂', addressLabel: '地址', foodTruck: '沒有固定店面的行動餐車', operatingArea: '主要在 JR 奧多摩站前一帶出攤', schedule: '最新官方行程', priceDate: '2026 年 7 月', conflict: '官方頁面對' },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/wasabi-kitchen?candidateId=demo-okutama-wasabi');

    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText(expected.foodTruck);
    await expect(spot).toContainText(expected.operatingArea);
    await expect(spot).toContainText(expected.schedule);
    await expect(spot).toContainText(expected.priceDate);
    await expect(spot).toContainText(expected.conflict);
    await expect(spot.getByRole('link', { name: expected.schedule })).toHaveAttribute(
      'href',
      'https://tokyowasabi.com/category/information/',
    );
    await expect(spot.locator('.spot-hero > img')).toHaveAttribute('src', /wasabi_photo/);
    await expect(spot.locator('.info-row .k').filter({ hasText: new RegExp(`^${expected.addressLabel}$`) })).toHaveCount(0);
    await expect(spot).not.toContainText(/土日のみ|Weekends only|僅週末營業|平日はあかべこ|Akabeko is recommended|平日建議前往 AKABEKO|¥900〜|From ¥900|¥900 起/);
    await expectNoHorizontalOverflow(page);

    await page.goto('/route?candidateId=demo-okutama-wasabi');
    const route = page.locator('[data-screen="route"][data-screen-active="true"]');
    const routeCard = route.locator('[data-spot-id="wasabi-kitchen"]');
    await expect(routeCard.locator('img')).toHaveAttribute('src', /wasabi_photo/);
    await expect(routeCard).toContainText(expected.schedule);
    await expect(routeCard).toContainText(expected.priceDate);
    await expect(routeCard).not.toContainText(/徒歩 約 1 分|About 1 min on foot|步行約 1 分鐘|土日のみ|Weekends only|僅週末營業|平日はあかべこ|Akabeko is recommended|平日建議前往 AKABEKO|¥900〜|From ¥900|¥900 起/);
    await expectNoHorizontalOverflow(page);

    await page.goto('/story/wasabi-okutama?candidateId=demo-okutama-wasabi');
    const story = page.locator('[data-screen="story"][data-screen-active="true"]');
    const storyCard = story.locator('[data-spot-id="wasabi-kitchen"]');
    await expect(storyCard.locator('img')).toHaveAttribute('src', /wasabi_photo/);
    await expect(storyCard).toContainText(expected.locale === 'zh-TW' ? '行動餐車' : 'FOOD TRUCK');
    await expect(storyCard).toContainText(expected.schedule);
    await expectNoHorizontalOverflow(page);

    await page.goto('/food-cultures/wasabi-okutama');
    const foodCulture = page.locator('main');
    await expect(foodCulture).toContainText(expected.operatingArea);
    await expect.poll(() => page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))).toEqual({ clientWidth: 375, scrollWidth: 375 });
  }
});

test('separates the Ome meeting place from Okutama culture and keeps times seasonal (#328)', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja', region: '青梅・御岳 → 奥多摩', name: 'WASABI EXPERIENCE',
      address: '〒198-0147 東京都青梅市御岳1-192-4', seasonal: '5〜9月 8:30／10〜4月 11:00',
      access: '御嶽駅」から徒歩約7分', booking: '公式フォームから予約してください',
      duration: '日本語公式 約2〜2.5時間／英語公式 約2時間', durationCaveat: '記載不一致。予約時に確認',
    },
    {
      locale: 'en', region: 'Ome / Mitake → Okutama', name: 'WASABI EXPERIENCE',
      address: '1-192-4 Mitake, Ome, Tokyo 198-0147', seasonal: 'May–Sep 8:30 / Oct–Apr 11:00',
      access: '7 minutes on foot from Mitake Station', booking: 'Use the official form to book',
      duration: 'Japanese official page: about 2–2.5 hours / English official page: about 2 hours', durationCaveat: 'sources differ; confirm when booking',
    },
    {
      locale: 'zh-TW', region: '青梅・御嶽 → 奧多摩', name: 'WASABI EXPERIENCE',
      address: '〒198-0147 東京都青梅市御岳 1-192-4', seasonal: '5～9 月 8:30／10～4 月 11:00',
      access: '從 JR 青梅線「御嶽站」步行約 7 分鐘', booking: '請使用官方表單預約',
      duration: '日文官方約 2～2.5 小時／英文官方約 2 小時', durationCaveat: '資訊不一致，預約時請確認',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);

    await page.goto('/route?candidateId=demo-okutama-wasabi');
    const route = page.locator('[data-screen="route"][data-screen-active="true"]');
    await route.getByRole('button', { name: expected.locale === 'en' ? 'Full day' : '一日', exact: true }).click();
    await expect(route).toContainText(expected.region);
    await expect(route.locator('[data-spot-id="mitake-station"]')).toContainText(expected.locale === 'en' ? 'Ome / Mitake' : expected.locale === 'ja' ? '青梅市御岳' : '青梅市御嶽');
    await expect(route).toContainText(expected.seasonal);
    await expect(route).toContainText(expected.duration);
    await expect(route).toContainText(expected.durationCaveat);
    await expect(route).not.toContainText(/集合 8:30(?!.*10〜4月)|Meet at 8:30|8:30 集合/);
    await expectNoHorizontalOverflow(page);

    await page.goto('/spot/wasabi-experience?candidateId=demo-okutama-wasabi');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText(expected.address);
    await expect(spot).toContainText(expected.access);
    await expect(spot).toContainText(expected.seasonal);
    await expect(spot).toContainText(expected.duration);
    await expect(spot).toContainText(expected.durationCaveat);
    await expect(spot).toContainText(expected.booking);
    await expect(spot.getByRole('link', { name: expected.locale === 'ja' ? '公式予約フォームを開く' : expected.locale === 'en' ? 'Open the official booking form' : '開啟官方預約表單' })).toHaveAttribute(
      'href',
      'https://tokyowasabi.com/wasabi-experience/#booking-form',
    );
    await expectNoHorizontalOverflow(page);
  }
});

test('keeps the tourism-office caveat complete in every locale', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      reference: '参考情報',
      pending: '施設名・所在地・電話番号を含む掲載内容は現在確認中です',
      official: '訪問前に奥多摩観光協会の公式情報をご確認ください',
      actionTitle: '公式情報',
      action: '公式情報を確認する',
    },
    {
      locale: 'en',
      reference: 'Reference information',
      pending: 'The listed place name, address, and phone number are still being confirmed',
      official: 'Check the Okutama Tourism Association’s official information before visiting',
      actionTitle: 'Official information',
      action: 'Check official information',
    },
    {
      locale: 'zh-TW',
      reference: '參考資訊',
      pending: '刊載的設施名稱、地址與電話號碼仍在確認中',
      official: '造訪前請以奧多摩觀光協會的官方資訊為準',
      actionTitle: '官方資訊',
      action: '查看官方資訊',
    },
  ] as const;
  const unsupportedClaims =
    /ガイドサービス|Guided service|導覽服務|約90分|About 90 minutes|約 90 分鐘|1,500|おみやげ|Souvenirs|伴手禮|Wi-Fi|トイレあり|Restroom|設有洗手間|駐車場|paid car park|付費停車場|混雑時|when it is busy|人潮眾多/;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/okutama-tourism-office?candidateId=demo-okutama-wasabi');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot).toContainText(expected.reference);
    await expect(spot).toContainText(expected.pending);
    await expect(spot).toContainText(expected.official);
    await expect(spot.getByRole('heading', { name: expected.actionTitle })).toBeVisible();
    const officialLink = spot.getByRole('link', { name: expected.action });
    await expect(officialLink).toHaveAttribute('href', 'https://www.okutama.gr.jp/site/');
    await expect(officialLink).toHaveAttribute('target', '_blank');
    await expect(officialLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(spot).not.toContainText(unsupportedClaims);
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }
});

test('keeps header and footer fixed while only the middle content scrolls', async ({ page }) => {
  const viewport = { width: 375, height: 812 };
  await page.setViewportSize(viewport);

  await page.goto('/explore');
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  await expect(explore).toBeVisible();
  const exploreHead = explore.locator('.ghead');
  const exploreProgress = explore.locator('.progress');
  expect(await exploreHead.boundingBox()).toMatchObject({ y: 0 });
  expect((await exploreProgress.boundingBox())?.y).toBeGreaterThanOrEqual(viewport.height - 110);
  await expectNoHorizontalOverflow(page);

  await page.clock.setFixedTime(publicationDate);
  await page.goto('/explore/result');
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  await expect(result).toBeVisible();
  const resultHead = result.locator('.ghead');
  const resultProgress = result.locator('.progress');
  const resultScroll = result.locator('.scroll');

  const resultBefore = {
    head: await resultHead.boundingBox(),
    progress: await resultProgress.boundingBox(),
    scrollMetrics: await resultScroll.evaluate((element) => ({
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
      scrollTop: element.scrollTop,
    })),
  };

  expect(resultBefore.scrollMetrics.scrollHeight).toBeGreaterThan(
    resultBefore.scrollMetrics.clientHeight,
  );
  expect(resultBefore.progress?.y).toBeGreaterThanOrEqual(viewport.height - 110);
  expect(resultBefore.progress?.y + (resultBefore.progress?.height ?? 0)).toBeCloseTo(
    viewport.height,
    0,
  );

  await resultScroll.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });

  const resultAfter = {
    head: await resultHead.boundingBox(),
    progress: await resultProgress.boundingBox(),
    scrollTop: await resultScroll.evaluate((element) => element.scrollTop),
  };

  expect(resultAfter.scrollTop).toBeGreaterThan(resultBefore.scrollMetrics.scrollTop);
  expect(Math.round(await page.evaluate(() => window.scrollY))).toBe(0);
  expect(resultAfter.head?.y).toBeCloseTo(resultBefore.head?.y ?? 0, 1);
  expect(resultAfter.progress?.y).toBeCloseTo(resultBefore.progress?.y ?? 0, 1);
});

test('keeps route aggregates and station guidance consistent in all locales (#330)', async ({ page }) => {
  for (const locale of ['ja', 'en', 'zh-TW']) {
    await page.goto('/');
    await page.evaluate((value) => localStorage.setItem('tmm:locale', value), locale);
    for (const [candidateId, count, minutes] of [
      ['demo-okutama-wasabi', 7, 135],
      ['demo-okutama-yamame', 4, 120],
    ] as const) {
      await page.goto(`/route?candidateId=${candidateId}`);
      const route = page.locator('[data-screen="route"][data-screen-active="true"]');
      await expect(route.locator('[data-spot-id]')).toHaveCount(count);
      await expect(route.locator('.route-stats .st').last()).toContainText(String(count));
      await expect(route.locator('.route-info')).toContainText(String(minutes));
      await expect(route.locator('.route-stats')).not.toContainText(/\d+\s*km/i);
      await expectNoHorizontalOverflow(page);
      if (candidateId === 'demo-okutama-wasabi') {
        await route.locator('.day-toggle button').nth(1).click();
        await expect(route.locator('[data-spot-id]')).toHaveCount(6);
        await expect(route.locator('.route-stats .st').last()).toContainText('6');
        await expect(route.locator('.route-info')).toContainText(/御嶽|Mitake/);
        await expect(route.locator('.route-info')).not.toContainText(/135|90|東京駅|Tokyo Station|東京站/);
        await expectNoHorizontalOverflow(page);
      }
    }
  }
});
