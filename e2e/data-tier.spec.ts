import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { checkJourneyAdmission } from '../src/data/journey-admission';
import { JOURNEY_RECORDS } from '../src/data/journey-records';
import { selectRouteStop, type JourneyRecord } from '../src/data/journey-record';

const admittedFixture = 'b01-hachioji-farm-table';
const fixturePublicationDate = new Date('2026-11-27T13:00:00Z');

function selectedRecords(): JourneyRecord[] {
  const ids = new Set<string>();
  const base = process.env.CI_BASE;
  if (base) {
    const changedFiles = execFileSync('git', [
      'diff', '--no-renames', '--name-only', '--diff-filter=AM', base, 'HEAD', '--',
      'src/data/journey-records',
    ], { encoding: 'utf8' });
    for (const [, id] of changedFiles.matchAll(/^src\/data\/journey-records\/(b\d+-[^/]+)\.ts$/gm)) {
      ids.add(id);
    }

    const publicationDiff = execFileSync('git', [
      'diff', '--no-renames', '--unified=0', base, 'HEAD', '--',
      'src/data/journey-records/publication',
    ], { encoding: 'utf8' });
    for (const [, id] of publicationDiff.matchAll(/^\+import \{ \w+ \} from '\.\.\/(b\d+-[^']+)';/gm)) {
      ids.add(id);
    }
  }

  if (ids.size === 0) ids.add('b08-tama-farm-table');
  ids.add(admittedFixture);
  return [...ids].map((id) => {
    const record = JOURNEY_RECORDS.find((item) => item.journey.id === id);
    if (!record) throw new Error(`Stage C record is missing from the registry: ${id}`);
    return record;
  });
}

for (const record of selectedRecords()) {
  test(`enforces publication for ${record.journey.id} from MOGU through Spot`, async ({ page }) => {
    const isFixture = record.journey.id === admittedFixture;
    const now = isFixture ? fixturePublicationDate : new Date();
    const { defaultVariant } = checkJourneyAdmission(record, now);
    if (isFixture) expect(defaultVariant, 'The smoke fixture must be admitted on its publication date').toBeDefined();
    await page.clock.setFixedTime(now);
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('tmm:locale', 'ja');
    });
    await page.goto('/mogu');
    const screen = (name: string) => page.locator(`[data-screen="${name}"][data-screen-active="true"]`);
    await expect(screen('mogu')).toBeVisible();
    const card = screen('mogu').locator(`[data-journey-id="${record.journey.id}"]`);
    if (!defaultVariant) {
      await expect(card).toHaveCount(0);
      await page.goto(`/story/${record.journey.storyId}`);
      await expect(screen('journey-unavailable').getByRole('heading')).toHaveText('この食旅は現在ご覧いただけません');
      return;
    }

    await expect(card.locator('[data-verification-status="needs_confirmation"]')).toHaveText('確認中');
    await card.click();
    await expect(screen('story')).toBeVisible();
    await expect(screen('story').getByText(/未確認/).first()).toBeVisible();
    await screen('story').getByRole('button', { name: 'この食旅のルートを見る' }).click();
    const route = screen('route');
    await expect(route).toBeVisible();
    const primarySpotId = defaultVariant.primarySpotId!;
    const spotId = selectRouteStop(record, primarySpotId);
    if (spotId !== primarySpotId) {
      await expect(route.locator(`[data-spot-id="${primarySpotId}"]`)).toHaveCount(0);
      await expect(route.locator('.tl')).toContainText(record.spots[primarySpotId].unavailable!.reason.ja);
    }
    if (!spotId) {
      await expect(route.getByText('この立ち寄り先の代替スポットはありません。', { exact: true })).toBeVisible();
      return;
    }
    await route.locator(`[data-spot-id="${spotId}"]`).click();
    const spot = screen('spot');
    await expect(spot).toHaveAttribute('data-spot-id', spotId);
    const { visitorSourceId, officialSource } = record.spots[spotId];
    const source = visitorSourceId ? record.sources[visitorSourceId] : officialSource;
    expect(source?.url, 'The primary Spot has an official visitor URL').toMatch(/^https:\/\//);
    const officialLink = spot.getByRole('link', { name: '公式の訪問案内を開く' });
    await expect(officialLink).toBeVisible();
    await expect(officialLink).toHaveAttribute('href', source!.url!);
  });
}
