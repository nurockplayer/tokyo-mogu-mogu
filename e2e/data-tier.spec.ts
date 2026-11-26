import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { JOURNEY_RECORDS } from '../src/data/journey-records';
import type { JourneyRecord } from '../src/data/journey-record';

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
  return [...ids].map((id) => {
    const record = JOURNEY_RECORDS.find((item) => item.journey.id === id);
    if (!record) throw new Error(`Changed Stage C record is not published: ${id}`);
    return record;
  });
}

for (const record of selectedRecords()) {
  test(`opens ${record.journey.id} from MOGU through its source-backed Spot`, async ({ page }) => {
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
    await expect(screen('story').getByText(/確認中/).first()).toBeVisible();
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
}
