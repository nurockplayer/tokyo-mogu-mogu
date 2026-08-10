/**
 * My page — Food Profile edit CTA regression test (Issue #81).
 *
 * Vitest runs in a node environment (no DOM), so we assert the contract from
 * source, following the same approach as `src/app/AppShell.test.ts`: the My
 * page's Food Profile Edit CTA must enter the actual edit route
 * (`/food-profile/edit`), not the view/summary route (`/food-profile`).
 *
 * `/food-profile` renders `FoodProfilePage mode="view"` (first-use setup or
 * summary); `/food-profile/edit` renders `mode="edit"`. A CTA labeled Edit
 * that lands on the view route would fail to enter edit mode.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const myPageSource = readFileSync(resolve(here, 'MyPage.tsx'), 'utf8');

describe('My Food Profile edit CTA (#81)', () => {
  it('resolves to /food-profile/edit (the actual edit route), not /food-profile', () => {
    // The Edit CTA must target the edit-mode route. Any bare `/food-profile`
    // link here would be the view/summary route (mode="view").
    expect(myPageSource).toMatch(/<Link\s+to="\/food-profile\/edit"/);
    // Guard against a regression to the view route.
    expect(myPageSource).not.toMatch(/<Link\s+to="\/food-profile"\s/);
  });
});
