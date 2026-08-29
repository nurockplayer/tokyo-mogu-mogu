import { expect, test } from '@playwright/test';

test.describe('Human Data Review Board (#340)', () => {
  test('lets a desktop reviewer filter entities and inspect source/evidence boundaries', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/data-review/');

    await expect(page).toHaveTitle(/Human Data Review Board/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
    await expect(page.getByRole('heading', { name: 'Human Data Review Board' })).toBeVisible();
    const coverage = page.getByLabel('現在のProduct確認対象');
    await expect(coverage).toContainText('現在のProduct確認対象 15件');
    await expect(coverage).toContainText('Spot 11件');
    await expect(coverage).toContainText('Story 2件');
    await expect(coverage).toContainText('Route 2件');
    await expect(page.getByText('奥多摩町観光案内所', { exact: true })).toBeVisible();
    await expect(page.getByText('奥多摩わさび本舗 山城屋', { exact: true })).toBeVisible();
    await expect(page.getByText('手作りお弁当・お惣菜の専門店 奥多摩の台所', { exact: true })).toBeVisible();
    await expect(page.getByText('炉ばた あかべこ', { exact: true })).toBeVisible();
    await expect(page.getByText('PORT OKUTAMA', { exact: true })).toBeVisible();
    await expect(page.getByText('わさび食堂', { exact: true })).toBeVisible();
    await expect(page.getByText('新宿から約90分、奥多摩やまめを味わう旅', { exact: true })).toBeVisible();
    await expect(page.getByText('奥多摩やまめのストーリー', { exact: true })).toBeVisible();

    const portCard = page.getByRole('button', { name: /PORT OKUTAMAの詳細/ });
    await expect(portCard).toContainText('出典確認済み・人の確認待ち');
    await expect(portCard).toContainText('人待ち');
    await expect(portCard).toContainText('根拠なし');
    await expect(portCard).toContainText('0 矛盾');
    await expect(portCard).toContainText('3 アプリ証拠');

    await page.getByRole('button', { name: '矛盾' }).click();
    await expect(page.getByText('奥多摩わさび本舗 山城屋', { exact: true })).toBeVisible();
    await expect(page.getByText('奥多摩町観光案内所', { exact: true })).toHaveCount(0);

    await page.getByRole('button', { name: '根拠未登録' }).click();
    await expect(page.getByText('PORT OKUTAMA', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: '人の確認待ち' }).click();
    await expect(page.getByText('奥多摩町観光案内所', { exact: true })).toBeVisible();
    await expect(page.getByText('PORT OKUTAMA', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: '全部' }).click();
    await page.getByRole('button', { name: /奥多摩の台所の詳細/ }).click();

    await expect(page).toHaveURL(/#okutama-kitchen$/);
    await expect(page.getByRole('heading', { name: '現在わかっていること' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'まだわからないこと' })).toBeVisible();
    const unknowns = page.locator('.drb-unknowns');
    await expect(unknowns.getByText('予約方法・URL', { exact: true })).toBeVisible();
    await expect(unknowns.getByText('食事制限・アレルギー対応', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '出典・確認状況' })).toBeVisible();
    await expect(page.getByText('位置情報の出典', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'アプリでの表示' })).toBeVisible();
    await expect(page.getByRole('img', { name: /奥多摩の台所.*アプリ表示/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: '証拠を保存していない理由' })).toBeVisible();
    await expect(page.getByText(/All Rights Reserved/).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: '関連する作業' })).toBeVisible();
    await expect(page.getByRole('link', { name: '#325' })).toHaveAttribute(
      'href',
      'https://github.com/nurockplayer/tokyo-mogu-mogu/issues/325',
    );

    const summary = page.getByLabel('Slack共有用サマリー');
    await expect(summary).toContainText('🟡 出典確認済み・人の確認待ち');
    await expect(summary).toContainText('最新出典確認: 2026-08-28');
    await expect(summary).not.toContainText('最終確認');
    await expect(summary).toContainText('/data-review/#okutama-kitchen');
    await expect(summary).not.toContainText('✅ 人による確認済み');

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test('keeps the review overview and detail readable at 375px without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/data-review/');

    await expect(page.getByLabel('現在のProduct確認対象')).toContainText('15件');
    const overviewDimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overviewDimensions.scrollWidth).toBeLessThanOrEqual(overviewDimensions.clientWidth);

    await page.goto('/data-review/#wasabi-kitchen');

    await expect(page.getByRole('heading', { name: 'わさび食堂' })).toBeVisible();
    await expect(page.getByText('⚠️ 情報に矛盾あり', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'レビュー判断' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Productへの影響' })).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test('shows source-backed PORT OKUTAMA facts without hiding unknowns or evidence omissions (#327)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/data-review/#port-okutama');

    await expect(page.getByRole('heading', { name: 'PORT OKUTAMA' })).toBeVisible();
    await expect(page.getByText('🟡 出典確認済み・人の確認待ち', { exact: true }).first()).toBeVisible();
    const facts = page.getByRole('table', { name: '現在わかっていること' });
    await expect(facts.getByText('営業時間', { exact: true })).toBeVisible();
    await expect(facts.getByText('取扱・サービス', { exact: true })).toBeVisible();
    await expect(facts.getByText('最新の公式情報', { exact: true })).toBeVisible();
    await expect(page.locator('.drb-unknowns').getByText('予約方法・URL', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'レビュー判断' })).toBeVisible();
    const addressRow = page.getByRole('row').filter({ has: page.getByText('住所', { exact: true }) });
    await expect(addressRow.getByRole('link', { name: 'JR東日本（PORT OKUTAMA）' })).toHaveAttribute(
      'href',
      'https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail382787.html',
    );
    const phoneRow = page.getByRole('row').filter({ has: page.getByText('電話番号', { exact: true }) });
    await expect(phoneRow.getByRole('link', { name: 'PORT OKUTAMA（公式サイト）' })).toHaveAttribute(
      'href',
      'https://www.okutama.ne.jp/',
    );
    const coordinateRow = page.getByRole('row').filter({ has: page.getByText('位置情報', { exact: true }) });
    await expect(coordinateRow.getByRole('link', { name: 'OpenStreetMap（PORT OKUTAMA）' })).toHaveAttribute(
      'href',
      'https://www.openstreetmap.org/node/6552267871',
    );
    const operatorSource = page.locator('.drb-source').filter({
      has: page.getByText('PORT OKUTAMA（公式サイト）', { exact: true }),
    });
    await expect(operatorSource.getByRole('link', { name: '参照元を開く ↗' })).toHaveAttribute(
      'href',
      'https://www.okutama.ne.jp/',
    );
    await expect(page.getByText('位置情報の出典', { exact: true })).toBeVisible();
    await expect(page.getByRole('img', { name: /PORT OKUTAMA.*ja・375px/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /PORT OKUTAMA.*en・375px/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /PORT OKUTAMA.*zh-TW・375px/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: '証拠を保存していない理由' })).toBeVisible();
    await expect(page.getByText(/再利用許可を確認できない/).first()).toBeVisible();
    await expect(page.getByRole('link', { name: '#327' })).toHaveAttribute(
      'href',
      'https://github.com/nurockplayer/tokyo-mogu-mogu/issues/327',
    );
  });

  test('enriches the existing Wasabi Shokudo entity with mobile authority (#324)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/data-review/#wasabi-kitchen');

    await expect(page.getByRole('heading', { name: 'わさび食堂' })).toBeVisible();
    await expect(page.getByText('⚠️ 情報に矛盾あり', { exact: true }).first()).toBeVisible();
    for (const label of [
      '営業形態',
      '主な出店エリア',
      '出店案内',
      '最新の出店予定',
      '日程情報の不一致',
      '価格・取扱情報',
      '最新の公式情報',
    ]) {
      await expect(page.getByRole('table', { name: '現在わかっていること' }).getByText(label, { exact: true })).toBeVisible();
    }
    await expect(page.getByText('住所', { exact: true })).toHaveCount(0);
    await expect(page.getByText('位置情報', { exact: true })).toHaveCount(0);
    await expect(page.getByText('mobile_food_truck / no_permanent_storefront', { exact: true })).toBeVisible();
    await expect(page.getByText('固定店舗のないキッチンカー', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'レビュー判断' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '判断ポイント' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Productへの影響' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '確認対象画面' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '残っている不確実性' })).toBeVisible();
    await expect(page.getByText('移動型の営業形態を、固定店舗のように見せていないか', { exact: true })).toBeVisible();
    await expect(page.getByText(/固定住所・固定マップピン・固定地点への経路案内・GPSチェックイン/)).toBeVisible();
    const reviewLayer = page.getByLabel('レビュー判断');
    for (const surface of ['Spot', 'Story', 'Route']) {
      await expect(reviewLayer.getByText(surface, { exact: true })).toBeVisible();
    }
    const scheduleConflictRow = page.getByRole('row').filter({
      has: page.getByText('日程情報の不一致', { exact: true }),
    });
    await expect(scheduleConflictRow.getByRole('link', { name: 'TOKYO WASABI（2026年8月 わさび食堂営業日）' })).toHaveAttribute(
      'href',
      'https://tokyowasabi.com/information/2751/260728/',
    );
    await expect(scheduleConflictRow.getByRole('link', { name: 'TOKYO WASABI（FUSSA TANABATA CHALLENGE）' })).toHaveAttribute(
      'href',
      'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/',
    );
    await expect(scheduleConflictRow).toContainText('2026-08-07〜2026-08-09');
    await expect(scheduleConflictRow).toContainText('2026-08-08〜2026-08-10');
    for (const url of [
      'https://tokyowasabi.com/foodtruck/',
      'https://tokyowasabi.com/category/information/',
      'https://tokyowasabi.com/information/2751/260728/',
      'https://tokyowasabi.com/wasabi-don/',
      'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/',
    ]) {
      await expect(page.locator(`.drb-source a[href="${url}"]`)).toBeVisible();
    }
    await expect(page.getByRole('img', { name: /わさび食堂.*ja・375px/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /わさび食堂.*en・375px/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /わさび食堂.*zh-TW・375px/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: '証拠を保存していない理由' })).toBeVisible();
    await expect(page.getByText('サイトが無断転載や画像への直接リンクを禁止しているため、参照元だけを記録し画像は保存していません。').first()).toBeVisible();
    await expect(page.getByRole('link', { name: '#324' })).toHaveAttribute(
      'href',
      'https://github.com/nurockplayer/tokyo-mogu-mogu/issues/324',
    );
  });

  test('keeps both Akabeko phone source sides unresolved and shows their actual Spot usage', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/data-review/#akabeko');

    const phoneRow = page.getByRole('row').filter({ has: page.getByText('電話番号', { exact: true }) });
    await expect(phoneRow).toContainText('⚠️ 情報に矛盾あり');
    await expect(phoneRow.getByRole('link', { name: '炉ばた あかべこ（公式サイト）' })).toHaveAttribute(
      'href',
      'https://akabeko.tokyo/',
    );
    await expect(phoneRow.getByRole('link', { name: '炉ばた あかべこ（公式ニュースページ）' })).toHaveAttribute(
      'href',
      'https://akabeko.tokyo/news',
    );
    await expect(phoneRow.getByRole('link', { name: '民話の宿 荒澤屋（公式お問い合わせ）' })).toHaveAttribute(
      'href',
      'https://arasawaya.co.jp/contact/',
    );
    await expect(phoneRow.getByText('Spot', { exact: true })).toBeVisible();
    await expect(phoneRow.getByText('Route', { exact: true })).toHaveCount(0);
    await expect(phoneRow.getByText('Story', { exact: true })).toHaveCount(0);
    await expect(page.getByText('不一致が解消されるまで、いずれかの値を確定情報として選ばない', { exact: true })).toBeVisible();
  });

  test('represents both current Route and Story identities', async ({ page }) => {
    const identities = [
      ['okutama-wasabi-journey', '東京わさび文化を巡る旅'],
      ['okutama-yamame-journey', '新宿から約90分、奥多摩やまめを味わう旅'],
      ['wasabi-okutama', '奥多摩わさびのストーリー'],
      ['yamame-okutama', '奥多摩やまめのストーリー'],
    ] as const;

    for (const [id, name] of identities) {
      await page.goto(`/data-review/#${id}`);
      await expect(page.getByRole('heading', { name })).toBeVisible();
    }
  });

  test('does not expose the team Board in consumer Product navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/home');

    await expect(page.locator('a[href^="/data-review"]')).toHaveCount(0);
  });

  test('renders child-owned Route claims through the same generic detail surface', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/data-review/#okutama-wasabi-journey');

    await expect(page.getByRole('heading', { name: '東京わさび文化を巡る旅' })).toBeVisible();
    const durationRow = page.getByRole('row').filter({ hasText: '半日の所要時間（分）' });
    await expect(durationRow.getByText('表示差異あり（レビュー対象）', { exact: true })).toBeVisible();
    await expect(durationRow.getByText('正本', { exact: true })).toBeVisible();
    await expect(durationRow.getByText('200', { exact: true })).toBeVisible();
    await expect(durationRow.getByText('現在の表示', { exact: true })).toBeVisible();
    await expect(durationRow.getByText('150', { exact: true })).toBeVisible();
    await expect(durationRow.getByText('🟡 出典確認済み・人の確認待ち', { exact: true })).toBeVisible();

    const presentationRow = page.getByRole('row').filter({
      hasText: 'Result と Route の移動時間表示',
    });
    await expect(presentationRow.getByText('表示差異あり（レビュー対象）', { exact: true })).toBeVisible();
    await expect(presentationRow.getByText('現在の表示', { exact: true })).toBeVisible();
    await expect(presentationRow.getByText('東京駅 / から電車で　約120分', { exact: true })).toBeVisible();
    await expect(presentationRow.getByText('比較対象の表示', { exact: true })).toBeVisible();
    await expect(presentationRow.getByText('東京駅 / 60 分', { exact: true })).toBeVisible();
    await expect(page.getByRole('table', { name: '現在わかっていること' })
      .getByText('取扱・運行情報（okutama-kitchen）', { exact: true })).toBeVisible();
    await expect(page.getByText('特選ソフトジェラート（わさび味を含む・提供状況は要確認）', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('img', { name: /東京わさび文化を巡る旅.*アプリ表示/ }).first()).toBeVisible();
  });
});
