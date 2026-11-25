import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { JOURNEY_RECORDS } from '../src/data/journey-records';
import type { JourneyRecord } from '../src/data/journey-record';

async function selectedRecord(): Promise<JourneyRecord> {
  if (process.env.CI_BASE) {
    const diff = execFileSync('git', [
      'diff', '--no-renames', '--unified=0', process.env.CI_BASE, 'HEAD', '--',
      'src/data/journey-records/publication',
    ], { encoding: 'utf8' });
    const addedImport = diff.match(/^\+import \{ (\w+) \} from '\.\.\/([^']+)';/m);
    if (addedImport) {
      const module = await import(`../src/data/journey-records/${addedImport[2]}`);
      const record = module[addedImport[1]] as JourneyRecord;
      if (!JOURNEY_RECORDS.some((item) => item.journey.id === record.journey.id)) {
        throw new Error(`Added record is not published: ${record.journey.id}`);
      }
      return record;
    }
  }
  return JOURNEY_RECORDS.find((record) => record.journey.id === 'b08-tama-farm-table')!;
}

test('opens a published data journey from MOGU through its source-backed Spot', async ({ page }) => {
  const record = await selectedRecord();
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('tmm:locale', 'ja');
  });
  await page.goto('/mogu');
  const screen = (name: string) => page.locator(`[data-screen="${name}"][data-screen-active="true"]`);
  const card = screen('mogu').locator(`[data-journey-id="${record.journey.id}"]`);
  await expect(card.locator('[data-verification-status="needs_confirmation"]')).toBeVisible();
  await card.click();
  await expect(screen('story')).toBeVisible();
  await expect(screen('story').getByText(/未確認/).first()).toBeVisible();
  await screen('story').getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
  const route = screen('route');
  await expect(route).toBeVisible();
  await route.locator('[data-spot-id]').first().click();
  const spot = screen('spot');
  await expect(spot).toBeVisible();
  const spotId = await spot.getAttribute('data-spot-id');
  const sourceUrl = record.spots[spotId!]?.officialSource?.url;
  expect(sourceUrl, 'The opened Spot has an official source URL').toMatch(/^https?:\/\//);
  await expect(spot.locator('.info-sec').getByText(sourceUrl!, { exact: true })).toBeVisible();
});
