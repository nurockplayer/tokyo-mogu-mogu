import { mkdir } from 'node:fs/promises';
import { expect, test, type Locator, type Page } from '@playwright/test';

const EVIDENCE_DIR = 'docs/evidence/issue-276';
const CAPTURE_EVIDENCE = process.env.ISSUE_276_EVIDENCE === '1';

async function capture(page: Page, name: string, settleMs = 450): Promise<void> {
  if (!CAPTURE_EVIDENCE) return;
  await mkdir(EVIDENCE_DIR, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  if (settleMs > 0) await page.waitForTimeout(settleMs);
  await page.screenshot({ path: `${EVIDENCE_DIR}/${name}.png`, animations: 'allow' });
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        phoneClientWidth: document.querySelector<HTMLElement>('.reference-phone')?.clientWidth ?? 0,
        phoneScrollWidth: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth ?? 0,
      })),
    )
    .toEqual({
      documentClientWidth: 375,
      documentScrollWidth: 375,
      phoneClientWidth: 375,
      phoneScrollWidth: 375,
    });
}

async function expectActionWithinViewport(action: Locator): Promise<void> {
  await action.scrollIntoViewIfNeeded();
  await expect(action).toBeVisible();
  await expect(action).toBeEnabled();
  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  expect(box!.y + box!.height).toBeGreaterThan(0);
  expect(box!.y).toBeLessThan(812);
}

async function expectHitTarget(action: Locator): Promise<void> {
  await expectActionWithinViewport(action);
  const box = await action.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
}

async function expectNonOverlapping(first: Locator, second: Locator): Promise<void> {
  const [a, b] = await Promise.all([first.boundingBox(), second.boundingBox()]);
  expect(a).not.toBeNull();
  expect(b).not.toBeNull();
  const overlaps =
    a!.x < b!.x + b!.width &&
    a!.x + a!.width > b!.x &&
    a!.y < b!.y + b!.height &&
    a!.y + a!.height > b!.y;
  expect(overlaps).toBe(false);
}

async function expectTextContrast(action: Locator, minimum: number): Promise<void> {
  const ratio = await action.evaluate((element) => {
    const parse = (color: string) =>
      (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const luminance = ([red, green, blue]: number[]) => {
      const [r, g, b] = [red, green, blue].map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const style = getComputedStyle(element);
    let backgroundElement: Element | null = element;
    let backgroundColor = style.backgroundColor;
    while (
      backgroundElement.parentElement &&
      (backgroundColor === 'transparent' || /rgba\([^)]*,\s*0(?:\.0+)?\)$/.test(backgroundColor))
    ) {
      backgroundElement = backgroundElement.parentElement;
      backgroundColor = getComputedStyle(backgroundElement).backgroundColor;
    }
    const foreground = luminance(parse(style.color));
    const background = luminance(parse(backgroundColor));
    return (Math.max(foreground, background) + 0.05) /
      (Math.min(foreground, background) + 0.05);
  });
  expect(ratio).toBeGreaterThanOrEqual(minimum);
}

async function expectVisibleFocusRing(control: Locator): Promise<void> {
  await control.focus();
  const focusStyle = await control.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
}

test.use({
  viewport: { width: 375, height: 812 },
  locale: 'ja-JP',
  trace: 'on',
  video: 'on',
});

test.describe('Issue #276 authoritative Netlify choreography', () => {
  test('replays every timed Food Profile state and Result → Story → Route → Spot', async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();

    const splash = page.locator('[data-screen="splash"]');
    await expect(splash).toHaveAttribute('data-screen-active', 'true');
    await capture(page, '01-splash-ja-375');
    await splash.click();

    await expect(page.getByText(/MOGU MOGUへようこそ/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'はじめる！' })).toBeVisible();
    await capture(page, '02-profile-welcome-ja-375');
    await page.getByRole('button', { name: 'はじめる！' }).click();

    await expect(page.getByText('はい！はじめましょう！')).toBeVisible();
    await expect(page.locator('[data-chat-typing]')).toHaveCount(0);
    await expect(page.getByPlaceholder('ニックネームを入力')).toHaveCount(0);
    await page.waitForTimeout(300);
    await expect(page.getByPlaceholder('ニックネームを入力')).toHaveCount(0);
    await expect(page.getByPlaceholder('ニックネームを入力')).toBeVisible({ timeout: 450 });
    await expect(page.getByPlaceholder('ニックネームを入力')).toBeFocused();

    await page.getByPlaceholder('ニックネームを入力').fill('ナナ');
    await page.getByRole('button', { name: '送信' }).click();
    await expect(page.getByText('私はナナです😊')).toBeVisible();
    await expect(page.getByText(/ナナさん、/)).toHaveCount(0);
    await page.waitForTimeout(300);
    await expect(page.getByText(/ナナさん、/)).toHaveCount(0);
    await expect(page.getByText(/ナナさん、/)).toBeVisible({ timeout: 450 });
    await expect(page.locator('[data-question-index="0"]')).toHaveCount(0);
    await page.waitForTimeout(250);
    await expect(page.locator('[data-question-index="0"]')).toHaveCount(0);
    await expect(page.locator('[data-question-index="0"]')).toBeVisible({ timeout: 400 });
    await capture(page, '03-profile-allergy-ja-375');

    const profilePath = [
      { index: 0, options: ['🥚 卵', '🥜 ナッツ'] },
      { index: 1, options: ['特になし'] },
      { index: 2, options: ['🐖 豚肉', '☪️ ハラール対応が必要'] },
      { index: 3, options: ['🐟 生もの'] },
    ] as const;

    for (const [pathIndex, question] of profilePath.entries()) {
      const bubble = page.locator(`[data-question-index="${question.index}"]`);
      await expect(bubble).toBeVisible();
      for (const option of question.options) {
        await bubble.getByRole('button', { name: option, exact: true }).click();
        await expect(bubble.getByRole('button', { name: option, exact: true })).toHaveClass(/sel/);
      }
      await bubble.getByRole('button', { name: '送信', exact: true }).click();
      await expect(bubble).toHaveAttribute('data-frozen', 'true');
      if (pathIndex < profilePath.length - 1) {
        const next = page.locator(`[data-question-index="${question.index + 1}"]`);
        await page.waitForTimeout(300);
        await expect(next).toHaveCount(0);
        await expect(next).toBeVisible({ timeout: 450 });
      }
    }

    await page.waitForTimeout(300);
    await expect(page.getByText('あなたのFood Profile：')).toHaveCount(0);
    await expect(page.getByText('あなたのFood Profile：')).toBeVisible({ timeout: 450 });
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toHaveCount(0);
    await page.waitForTimeout(450);
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toBeVisible({ timeout: 500 });
    await expect(page.getByText(/MOGU MOGUへようこそ/)).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator('[data-screen="food-profile"][data-screen-active="true"] .chat-body')
          .evaluate((element) =>
          Math.round(element.scrollHeight - element.clientHeight - element.scrollTop),
        ),
      )
      .toBeLessThanOrEqual(1);
    await capture(page, '04-profile-complete-ja-375');

    await page
      .getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' })
      .click();
    await expect(page).toHaveURL(/\/home$/);
    await expect(page.locator('[data-screen="home"]')).toHaveAttribute(
      'data-screen-active',
      'true',
    );
    await capture(page, '05-home-ja-375');

    await page.goBack();
    await expect(
      page.locator('[data-screen="food-profile"][data-screen-active="true"]'),
    ).toBeVisible();
    await expect(page.getByText(/MOGU MOGUへようこそ/)).toBeVisible();
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toBeVisible();
    await page.goForward();
    await expect(page.locator('[data-screen="home"]')).toHaveAttribute(
      'data-screen-active',
      'true',
    );

    await page
      .locator('[data-screen="home"][data-screen-active="true"] .trip-card')
      .first()
      .click();
    await expect(page).toHaveURL(/\/story\/wasabi-okutama$/);
    await page
      .locator('[data-screen="story"][data-screen-active="true"] .fab-back')
      .click();
    await expect(page).toHaveURL(/\/home$/);

    await page.getByRole('button', { name: /Let's Go!/ }).click();

    await expect(page).toHaveURL(/\/explore$/);
    await expect(page.locator('[data-exploration-step="0"]')).toBeVisible();
    await page.getByRole('button', { name: /^食べる/ }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await expect(page.locator('[data-exploration-step="1"]')).toBeVisible();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '時間は気にしない' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '半日' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '辛いもの', exact: true }).click();
    await page.getByRole('button', { name: '濃厚な味', exact: true }).click();
    await page.getByRole('button', { name: '伝統', exact: true }).click();
    await page.getByRole('button', { name: '自然', exact: true }).click();
    await capture(page, '06-exploration-ja-375');
    await page.getByRole('button', { name: '次へ' }).click();

    await expect(page).toHaveURL(/\/explore\/result$/);
    await expect(page.getByText('96%')).toBeVisible();
    await expect(page.getByText('91%')).toBeVisible();
    await capture(page, '07-result-ja-375');
    await page
      .locator('[data-screen="result"][data-screen-active="true"] [data-journey-id="demo-okutama-wasabi"]')
      .click();

    await expect(page).toHaveURL(/\/story\/wasabi-okutama/);
    await expect(page.getByRole('heading', { name: '水がつなぐ、江戸から続く辛味' })).toBeVisible();
    await capture(page, '08-story-ja-375');
    const routeGenerationStartedAt = Date.now();
    await page.getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
    await expect(page.locator('[data-route-loading]')).toBeVisible();
    await expect(page).toHaveURL(/\/route/, { timeout: 3_500 });
    const routeGenerationElapsed = Date.now() - routeGenerationStartedAt;
    expect(routeGenerationElapsed).toBeGreaterThanOrEqual(2_100);
    expect(routeGenerationElapsed).toBeLessThan(3_500);

    await expect(page.locator('[data-screen="route"]')).toHaveAttribute(
      'data-screen-active',
      'true',
    );
    await capture(page, '09-route-ja-375');
    await page
      .locator('[data-screen="route"][data-screen-active="true"] [data-spot-id="okutama-tourism-office"]')
      .click();
    await expect(page).toHaveURL(/\/spot\/okutama-tourism-office/);
    await expect(page.getByRole('heading', { name: '奥多摩観光案内所' })).toBeVisible();
    await capture(page, '10-spot-ja-375');
    await expectNoHorizontalOverflow(page);
  });

  test('keeps ja/en/zh-TW primary actions and navigation usable at 375px', async ({ page }) => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      await page.goto('/food-profile');
      const localeSelect = page.locator('.locale-control select');
      await localeSelect.selectOption(locale);
      await expectNoHorizontalOverflow(page);
      await expectHitTarget(localeSelect);
      await expectVisibleFocusRing(localeSelect);
      const profileStart = page.locator(
        '[data-screen="food-profile"][data-screen-active="true"] .choice-card .orange',
      );
      await expectActionWithinViewport(profileStart);
      await expectTextContrast(profileStart, 4.5);

      await page.goto('/explore');
      await page.locator('.locale-control select').selectOption(locale);
      const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');

      for (let step = 0; step < 5; step += 1) {
        await expect(explore.locator(`[data-exploration-step="${step}"]`)).toBeVisible();
        await expectNoHorizontalOverflow(page);

        if (step === 0) await explore.locator('.exp-card').first().click();
        if (step === 1) {
          const opener = explore.locator('.searchbar');
          await opener.click();
          const dialog = page.getByRole('dialog');
          await expect(dialog).toBeVisible();
          await expect(dialog.locator('input')).toBeFocused();
          await page.keyboard.press('Escape');
          await expect(dialog).toBeHidden();
          await expect(opener).toBeFocused();
        }
        if (step === 2) await explore.locator('.opt').last().click();
        if (step === 3) await explore.locator('.opt').first().click();
        if (step === 4) {
          const firstTasteChip = explore.locator('.chip-group').first().locator('.chip').first();
          await firstTasteChip.click();
          await expectHitTarget(firstTasteChip);
          await explore.locator('.chip-group').nth(1).locator('.chip').first().click();
        }

        await expectTextContrast(explore.locator('.wiz-q em'), 4.5);

        const next = explore.locator('.wiz-nav .next');
        await expectActionWithinViewport(next);
        await expectTextContrast(next, 4.5);
        if (step < 4) await next.click();
      }

      const primaryActions = [
        ['/home', '.letsgo'],
        ['/explore/result', '[data-journey-id="demo-okutama-wasabi"]'],
        ['/story/wasabi-okutama', '.story-cta'],
        ['/route', '.route-actions .save'],
        ['/spot/okutama-tourism-office', '.guide-box .book'],
      ] as const;
      for (const [path, actionSelector] of primaryActions) {
        await page.goto(path);
        await expectNoHorizontalOverflow(page);
        if (path === '/home' && locale === 'en') await capture(page, '11-home-en-375');
        if (path === '/home' && locale === 'zh-TW') await capture(page, '12-home-zh-TW-375');
        const activeScreen = page.locator('.reference-screen[data-screen-active="true"]');
        await expect(activeScreen).toBeVisible();
        const primaryAction = activeScreen.locator(actionSelector);
        await expectActionWithinViewport(primaryAction);
        if (path !== '/explore/result') await expectTextContrast(primaryAction, 4.5);

        if (path === '/route') {
          const back = activeScreen.locator('.back');
          const share = activeScreen.locator('.share-btn');
          const localeSelect = page.locator('.locale-control select');
          await expectHitTarget(back);
          await expectHitTarget(share);
          await expectNonOverlapping(localeSelect, share);
          await expectTextContrast(activeScreen.locator('.tl-row .num.start'), 4.5);
          await expectTextContrast(activeScreen.locator('.goal-row .num.goal'), 4.5);
        }
        if (path === '/explore/result') {
          await expectTextContrast(activeScreen.locator('.res-head em'), 4.5);
        }
        if (path === '/story/wasabi-okutama') {
          await expectHitTarget(activeScreen.locator('.fab-back'));
        }
      }
    }
  });

  test('replays the authoritative Food Profile edit choreography and returns to My', async ({
    page,
  }) => {
    await page.goto('/my');
    const editStartedAt = Date.now();
    await page.getByRole('button', { name: '編集する' }).click();
    await expect(page).toHaveURL(/\/food-profile\/edit$/);
    await expect(page.getByText(/Food Profileを編集しましょう/)).toBeVisible();
    await expect(page.getByPlaceholder('ニックネームを入力')).toHaveCount(0);
    await expect(page.getByText(/MOGU MOGUへようこそ/)).toBeHidden();
    await capture(page, '13-profile-edit-intro-ja-375', 0);

    const editScreen = page.locator(
      '[data-screen="food-profile"][data-screen-active="true"]',
    );
    await expect(editScreen.locator('[data-question-index="0"]')).toHaveCount(0);
    const remainingUntilEarlyCheck = 300 - (Date.now() - editStartedAt);
    if (remainingUntilEarlyCheck > 0) await page.waitForTimeout(remainingUntilEarlyCheck);
    await expect(editScreen.locator('[data-question-index="0"]')).toHaveCount(0);
    await expect(editScreen.locator('[data-question-index="0"]')).toBeVisible({ timeout: 800 });
    const editQuestionElapsed = Date.now() - editStartedAt;
    expect(editQuestionElapsed).toBeGreaterThanOrEqual(450);
    expect(editQuestionElapsed).toBeLessThan(1_300);
    await capture(page, '14-profile-edit-question-ja-375');

    for (let questionIndex = 0; questionIndex < 4; questionIndex += 1) {
      const question = editScreen.locator(`[data-question-index="${questionIndex}"]`);
      await question.getByRole('button', { name: '送信', exact: true }).click();
      if (questionIndex < 3) {
        await expect(
          editScreen.locator(`[data-question-index="${questionIndex + 1}"]`),
        ).toBeVisible({ timeout: 650 });
      }
    }

    await expect(page.getByText(/食のプロフィールを更新しました/)).toBeVisible({ timeout: 650 });
    const returnToMy = page.getByRole('button', { name: 'マイページへ戻る' });
    await expect(returnToMy).toBeVisible();
    await capture(page, '15-profile-edit-complete-ja-375');
    await returnToMy.click();
    await expect(page).toHaveURL(/\/my$/);
    await expect(
      page
        .locator('[data-screen="my"][data-screen-active="true"]')
        .getByText('特別な制限はありません'),
    ).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/food-profile\/edit$/);
    await expect(returnToMy).toBeVisible();

    await page.goForward();
    await expect(page).toHaveURL(/\/my$/);
    await page.getByRole('button', { name: '編集する' }).click();
    await expect(page).toHaveURL(/\/food-profile\/edit$/);
    const freshEdit = page.locator(
      '[data-screen="food-profile"][data-screen-active="true"]',
    );
    await expect(freshEdit.getByRole('button', { name: 'マイページへ戻る' })).toHaveCount(0);
    await expect(freshEdit.locator('[data-question-index="0"]')).toHaveCount(0);
    await expect(freshEdit.locator('[data-question-index="0"]')).toBeVisible({ timeout: 800 });
    await expect(freshEdit.locator('[data-question-index="0"]')).not.toHaveAttribute(
      'data-frozen',
      'true',
    );
  });

  test('cancels route generation when Story is no longer active', async ({ page }) => {
    await page.goto('/story/wasabi-okutama');
    await page.getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
    await expect(page.locator('[data-route-loading]')).toBeVisible();
    await page.goto('/home');
    await page.waitForTimeout(2_300);
    await expect(page).toHaveURL(/\/home$/);
    await expect(page.locator('[data-screen="home"][data-screen-active="true"]')).toBeVisible();
  });

  test('keeps a saved route across reload and exposes it through My Routes', async ({ page }) => {
    await page.goto('/route');
    const activeRoute = page.locator('[data-screen="route"][data-screen-active="true"]');
    const save = activeRoute.getByRole('button', { name: 'マイルートに保存' });
    await save.scrollIntoViewIfNeeded();
    await save.click();
    await expect(save).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    const reloadedRoute = page.locator('[data-screen="route"][data-screen-active="true"]');
    await expect(
      reloadedRoute.getByRole('button', { name: 'マイルートに保存' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await reloadedRoute.getByRole('button', { name: 'マイルートを見る' }).click();
    await expect(page).toHaveURL(/\/my-route$/);
    await expect(
      page.locator('[data-screen="favorites"] [data-journey-id="demo-okutama-wasabi"]'),
    ).toBeVisible();
  });

  test('preserves the visible Yamame journey identity through Story and Route reloads', async ({
    page,
  }) => {
    const yamameRoute = page.locator(
      '[data-screen="route"][data-screen-active="true"]',
    );
    const yamameRouteTitle = '新宿から約90分、奥多摩やまめを味わう旅';

    await page.goto('/route?candidateId=demo-okutama-yamame');
    await expect(yamameRoute.getByText(yamameRouteTitle, { exact: true })).toBeVisible();
    await page.reload();
    await expect(yamameRoute.getByText(yamameRouteTitle, { exact: true })).toBeVisible();

    await page.goto('/route?routeId=okutama-yamame-journey');
    await expect(yamameRoute.getByText(yamameRouteTitle, { exact: true })).toBeVisible();
    await yamameRoute.getByRole('button', { name: 'マイルートに保存' }).click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          JSON.parse(localStorage.getItem('tmm:savedRoutes') ?? '[]').map(
            (entry: { routeId: string }) => entry.routeId,
          ),
        ),
      )
      .toContain('okutama-yamame-journey');

    await page.goto('/story/yamame-okutama');
    await page.getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
    await expect(page.locator('[data-route-loading]')).toBeVisible();
    await expect(page).toHaveURL(/\/route\?candidateId=demo-okutama-yamame$/, {
      timeout: 3_500,
    });
    await expect(yamameRoute.getByText(yamameRouteTitle, { exact: true })).toBeVisible();
    await page.reload();
    await expect(yamameRoute.getByText(yamameRouteTitle, { exact: true })).toBeVisible();

    await yamameRoute.locator('[data-spot-id="okutama-tourism-office"]').click();
    await expect(page).toHaveURL(
      /\/spot\/okutama-tourism-office\?candidateId=demo-okutama-yamame$/,
    );
    await page.locator('[data-screen="spot"][data-screen-active="true"] .fab-back').click();
    await expect(page).toHaveURL(/\/route\?candidateId=demo-okutama-yamame$/);
    await expect(yamameRoute.getByText(yamameRouteTitle, { exact: true })).toBeVisible();
  });

  test('delegates non-demo Tokyo content to the established data-backed routes', async ({ page }) => {
    await page.goto('/story/sake-ome');

    await expect(page.locator('.reference-app')).toHaveCount(0);
    await expect(page.getByText('青梅・沢井の日本酒').first()).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() =>
          getComputedStyle(document.documentElement).getPropertyValue('--tmm-color-warm').trim(),
        ),
      )
      .not.toBe('');

    await page.getByRole('link', { name: '酒蔵の旅を見る' }).click();
    await expect(page).toHaveURL(
      /\/route\?from=story&backTo=%2Fexplore%2Fresult&candidateId=demo-ome-sake$/,
    );
    await expect(page.locator('.reference-app')).toHaveCount(0);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: '沢井の酒蔵と御嶽の文化財をめぐる旅',
      }),
    ).toBeVisible();

    await page
      .getByRole('link', { name: 'スポット 1: 小澤酒造（沢井・澤乃井）' })
      .click();
    await expect(page).toHaveURL(
      /\/spot\/sawai-ozawa-shuzo\?from=story&backTo=%2Fexplore%2Fresult&candidateId=demo-ome-sake$/,
    );
    await expect(page.locator('.reference-app')).toHaveCount(0);
    await expect(
      page.getByRole('heading', { level: 1, name: '小澤酒造（沢井・澤乃井）' }),
    ).toBeVisible();

    await page.evaluate(() => {
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
      sessionStorage.setItem(
        'tmm:exploration:v1',
        JSON.stringify({
          tastes: [],
          experiences: [],
          baseArea: null,
          travelTime: null,
          interests: [],
          duration: null,
        }),
      );
    });
    await page.goto(
      '/explore/result?from=mogu&resultId=sake-ome&candidateId=demo-ome-sake',
    );
    await expect(page.locator('.reference-app')).toHaveCount(0);
    await expect(page.getByText('青梅・沢井の日本酒').first()).toBeVisible();

    await page.goto('/route?from=my&routeId=ome-sawai-sake-journey');
    await expect(page.locator('.reference-app')).toHaveCount(0);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: '沢井の酒蔵と御嶽の文化財をめぐる旅',
      }),
    ).toBeVisible();
  });
});
