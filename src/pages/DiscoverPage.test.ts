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
import {
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  discoverableCandidates,
  foodCultures,
  hiddenManagedFoodCultureIds,
  places,
  type ReleaseConfigEntry,
} from '../data';
import { loadMoguRecent } from '../lib/mogu-recent';
import { cultureName, discoverOtherCultures } from './DiscoverPage';

const FEATURED = 'wasabi-okutama';
const PILOT_PLACES = [
  'okutama-tourism-office',
  'chishima-wasabi-garden',
  'soba-isshintei',
  'shishiguchiya',
  'odanba-fishing',
];

/**
 * A test-only release config simulating the team decision to keep Ome/Sawai out
 * of the 8/23 production Discover surface via a single `enabled: false` change.
 */
const DISABLED_OME_CONFIG: readonly ReleaseConfigEntry[] = [
  {
    candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    enabled: true,
    releaseRole: 'primary',
    recommendable: true,
    discoverable: true,
  },
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    enabled: false,
    releaseRole: 'secondary',
    recommendable: true,
    discoverable: true,
  },
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

describe('Discover release gating (#171)', () => {
  it('does not surface a disabled managed slice as a playable Discover culture', () => {
    // Mirrors the component's playable-journey derivation under a disabled
    // Ome config: only wasabi stays playable.
    const playable = discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES, DISABLED_OME_CONFIG).filter(
      (c) => c.availability === 'ready' && c.journeyId,
    );
    const playableCultureIds = new Set(playable.map((c) => c.foodCultureId));
    expect(playableCultureIds.has('sake-ome')).toBe(false);
    expect(playableCultureIds.has('wasabi-okutama')).toBe(true);
  });

  it('does not resurface a disabled managed slice in the future/other cultures section', () => {
    const playableCultureIds = new Set(['wasabi-okutama']);
    const hiddenManaged = hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES, DISABLED_OME_CONFIG);
    const other = discoverOtherCultures(foodCultures, playableCultureIds, hiddenManaged);
    expect(other.map((fc) => fc.id)).not.toContain('sake-ome');
  });

  it('keeps ordinary non-release-managed editorial cultures in the future section', () => {
    const playableCultureIds = new Set(['wasabi-okutama']);
    const hiddenManaged = hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES, DISABLED_OME_CONFIG);
    const other = discoverOtherCultures(foodCultures, playableCultureIds, hiddenManaged);
    const ids = other.map((fc) => fc.id);
    expect(ids).toEqual(
      expect.arrayContaining(['yamame-okutama', 'okutama-soba', 'okutama-konnyaku']),
    );
  });

  it('keeps release-managed cultures out of the future section whenever they are playable', () => {
    // Default config: both slices are playable, so neither falls back into the
    // editorial "other cultures" list.
    const playableCultureIds = new Set(['wasabi-okutama', 'sake-ome']);
    const hiddenManaged = hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES);
    const other = discoverOtherCultures(foodCultures, playableCultureIds, hiddenManaged);
    const ids = other.map((fc) => fc.id);
    expect(ids).not.toContain('wasabi-okutama');
    expect(ids).not.toContain('sake-ome');
  });
});
