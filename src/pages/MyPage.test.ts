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
import type { FoodProfile } from '../lib/food-profile';
import { foodProfileSummaryState } from './my-food-profile';

const here = dirname(fileURLToPath(import.meta.url));
const myPageSource = readFileSync(resolve(here, 'MyPage.tsx'), 'utf8');
const localeToggleSource = readFileSync(resolve(here, '..', 'i18n', 'LocaleToggle.tsx'), 'utf8');
const appShellSource = readFileSync(resolve(here, '..', 'app', 'AppShell.tsx'), 'utf8');
const prototypeShellSource = readFileSync(resolve(here, '..', 'app', 'PrototypeShell.tsx'), 'utf8');
const referenceAppSource = readFileSync(resolve(here, '..', 'features', 'netlify-parity', 'ReferenceApp.tsx'), 'utf8');
const referenceMySource = readFileSync(resolve(here, '..', 'features', 'netlify-parity', 'screens', 'MyScreen.tsx'), 'utf8');
const referenceLocaleControlSource = readFileSync(resolve(here, '..', 'features', 'netlify-parity', 'components', 'LocaleControl.tsx'), 'utf8');

describe('My Food Profile edit CTA (#81)', () => {
  it('resolves to /food-profile/edit (the actual edit route), not /food-profile', () => {
    // The Edit CTA must target the edit-mode route. Any bare `/food-profile`
    // link here would be the view/summary route (mode="view").
    expect(myPageSource).toMatch(/<Link\s+to="\/food-profile\/edit"/);
    // Guard against a regression to the view route.
    expect(myPageSource).not.toMatch(/<Link\s+to="\/food-profile"\s/);
  });
});

describe('Language preference placement (#285)', () => {
  it('keeps the selector in My and out of reachable MVP headers', () => {
    expect(myPageSource).toMatch(
      /import\s*\{[^}]*\bLocaleToggle\b[^}]*\}\s*from\s*'\.\.\/i18n'/,
    );
    expect(myPageSource).toMatch(/<section[^>]*aria-label=\{t\('myLanguageTitle'\)\}/);
    expect(myPageSource).toMatch(/<LocaleToggle\s*\/>/);
    expect(appShellSource).not.toContain('LocaleToggle');
    expect(prototypeShellSource).not.toContain('LocaleToggle');
    expect(referenceAppSource).not.toContain('<LocaleControl');
    expect(referenceAppSource).toContain('onChangeLocale={setLocale}');
    expect(referenceMySource).toMatch(/<LocaleControl\s+locale=\{locale\}/);
  });

  it('offers each supported locale by its native name', () => {
    expect(localeToggleSource).toContain("label: '日本語'");
    expect(localeToggleSource).toContain("label: 'English'");
    expect(localeToggleSource).toContain("label: '繁體中文'");
    expect(referenceLocaleControlSource).toContain("ja: '日本語'");
    expect(referenceLocaleControlSource).toContain("en: 'English'");
    expect(referenceLocaleControlSource).toContain("'zh-TW': '繁體中文'");
  });
});

describe('My Food Profile summary state (P1-04)', () => {
  const base: FoodProfile = {
    dietary: [],
    dietaryOther: '',
    hasNoRestrictions: false,
    savedAt: '2026-08-22T00:00:00.000Z',
    version: 1,
  };

  it('distinguishes restrictions, explicit none, guided-neutral, and no profile', () => {
    expect(foodProfileSummaryState({ ...base, dietary: ['allergy'] })).toBe(
      'restrictions-recorded',
    );
    expect(foodProfileSummaryState({ ...base, hasNoRestrictions: true })).toBe(
      'no-restrictions',
    );
    expect(foodProfileSummaryState(base)).toBe('not-evaluated');
    expect(foodProfileSummaryState(null)).toBe('missing');
  });
});
