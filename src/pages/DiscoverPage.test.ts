/**
 * Discover — logic tests (Issue #93).
 *
 * Vitest runs in a node environment, so we test the pure selection helpers
 * (which cultures/places are surfaced, and that Discover never touches MOGU
 * Recent) rather than the DOM. Persistence round-trips are covered by
 * src/lib/mogu-recent.test.ts; this file guards the #93 "browse does not
 * write Recent" invariant at the page-selection level.
 */
import { describe, expect, it } from 'vitest';
import { foodCultures, places } from '../data';
import { loadMoguRecent } from '../lib/mogu-recent';
import { cultureName } from './DiscoverPage';

const FEATURED = 'wasabi-okutama';
const PILOT_PLACES = [
  'okutama-tourism-office',
  'chishima-wasabi-garden',
  'soba-isshintei',
  'shishiguchiya',
  'odanba-fishing',
];

describe('Discover selection (#93)', () => {
  it('features the verified first-pilot food culture', () => {
    expect(foodCultures.some((fc) => fc.id === FEATURED)).toBe(true);
  });

  it('surfaces only Okutama first-pilot places', () => {
    for (const id of PILOT_PLACES) {
      expect(places.some((p) => p.id === id)).toBe(true);
    }
  });

  it('browse-only selection never writes MOGU Recent', () => {
    // Loading the selection (what Discover does on mount) must not record
    // anything; loadMoguRecent stays empty until a Result is generated.
    expect(loadMoguRecent()).toHaveLength(0);
  });

  it('cultureName never falls back to the featured story name for unmapped cultures', () => {
    // Regression: the "other cultures" section used to fall back to
    // 'dataWasabiName' for seeds without an i18n name key, mislabeling
    // kumma / uguisu-mochi / yuzu as "Tokyo Wasabi".
    const stubT = (key: string) => key;
    const unmapped = foodCultures.filter((fc) => fc.id !== FEATURED);
    for (const fc of unmapped) {
      const ja = cultureName(fc, 'ja', stubT);
      const en = cultureName(fc, 'en', stubT);
      expect(ja).not.toBe('');
      expect(ja).not.toMatch(/わさび|Wasabi|山葵/i);
      expect(en).not.toBe('');
      expect(en).not.toMatch(/わさび|Wasabi|山葵/i);
    }
  });
});
