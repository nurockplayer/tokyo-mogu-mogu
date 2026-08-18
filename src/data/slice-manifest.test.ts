import { describe, expect, it } from 'vitest';
import { createDefaultExplorationAnswers } from '../lib/exploration';
import { createDefaultFoodProfile } from '../lib/food-profile';
import { recommendCandidates } from '../lib/recommendation';
import { deriveVerificationStatus } from '../lib/verification';
import {
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
} from './demo-recommendation';
import { getFoodCultureById, getRelatedPlaces, getRouteById } from './index';
import { resolveJourneyIdentity } from './journey';
import {
  SLICE_MANIFEST,
  discoverVisibilityOf,
  discoverableCandidates,
  hiddenManagedFoodCultureIds,
  isCandidateDiscoverable,
  isCandidateRecommendable,
  maturityOf,
  recommendableCandidates,
  releaseRoleOf,
  type SliceManifestEntry,
} from './slice-manifest';

/** Default entry shape for test manifests. */
const WASABI_ENTRY: SliceManifestEntry = {
  candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
  maturity: 'playable',
  enabled: true,
  releaseRole: 'primary',
  discover: 'visible',
  recommendationEligible: true,
};

/**
 * A test-only manifest simulating the team decision to keep Ome/Sawai out of
 * the 8/23 release surface via a single `enabled: false` change. Pure selector
 * tests supply a manifest instead of mutating global runtime state.
 */
const DISABLED_OME_MANIFEST: readonly SliceManifestEntry[] = [
  WASABI_ENTRY,
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    maturity: 'playable',
    enabled: false,
    releaseRole: 'secondary',
    discover: 'visible',
    recommendationEligible: true,
  },
];

/** A playable Ome slice that is only preview-visible (never production Discover). */
const PREVIEW_OME_MANIFEST: readonly SliceManifestEntry[] = [
  WASABI_ENTRY,
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'secondary',
    discover: 'preview',
    recommendationEligible: true,
  },
];

/** A research slice that is fully hidden (no Discover, no recommendation). */
const RESEARCH_HIDDEN_MANIFEST: readonly SliceManifestEntry[] = [
  WASABI_ENTRY,
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    maturity: 'research',
    enabled: true,
    releaseRole: 'none',
    discover: 'hidden',
    recommendationEligible: false,
  },
];

/** A playable slice that is Discover-visible but not recommendation-eligible. */
const DISCOVER_ONLY_MANIFEST: readonly SliceManifestEntry[] = [
  WASABI_ENTRY,
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'secondary',
    discover: 'visible',
    recommendationEligible: false,
  },
];

describe('Slice Manifest registry (#170)', () => {
  it('registers the playable slices with one primary and secondary journeys', () => {
    expect(releaseRoleOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe('primary');
    expect(releaseRoleOf(DEMO_OME_SAKE_CANDIDATE_ID)).toBe('secondary');
    expect(maturityOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe('playable');
    expect(maturityOf(DEMO_OME_SAKE_CANDIDATE_ID)).toBe('playable');
    expect(discoverVisibilityOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe('visible');
    expect(discoverVisibilityOf(DEMO_OME_SAKE_CANDIDATE_ID)).toBe('visible');
    expect(releaseRoleOf(DEMO_HACHIOJI_GINGER_CANDIDATE_ID)).toBe('secondary');
    expect(maturityOf(DEMO_HACHIOJI_GINGER_CANDIDATE_ID)).toBe('playable');
    expect(discoverVisibilityOf(DEMO_HACHIOJI_GINGER_CANDIDATE_ID)).toBe('visible');
  });

  it('exposes all playable slices on Discover and recommendation by default', () => {
    expect(isCandidateRecommendable(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe(true);
    expect(isCandidateDiscoverable(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe(true);
    expect(isCandidateRecommendable(DEMO_OME_SAKE_CANDIDATE_ID)).toBe(true);
    expect(isCandidateDiscoverable(DEMO_OME_SAKE_CANDIDATE_ID)).toBe(true);
    expect(isCandidateRecommendable(DEMO_HACHIOJI_GINGER_CANDIDATE_ID)).toBe(true);
    expect(isCandidateDiscoverable(DEMO_HACHIOJI_GINGER_CANDIDATE_ID)).toBe(true);

    expect(recommendableCandidates(DEMO_RECOMMENDATION_CANDIDATES).map((c) => c.id)).toEqual([
      DEMO_RECOMMENDATION_CANDIDATE_ID,
      DEMO_OME_SAKE_CANDIDATE_ID,
      DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
    ]);
    expect(discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES).map((c) => c.id)).toEqual([
      DEMO_RECOMMENDATION_CANDIDATE_ID,
      DEMO_OME_SAKE_CANDIDATE_ID,
      DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
    ]);
  });

  it('keeps release role independent from maturity and visibility', () => {
    // Same maturity + visibility, different releaseRole → release metadata only.
    expect(maturityOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe(
      maturityOf(DEMO_OME_SAKE_CANDIDATE_ID),
    );
    expect(discoverVisibilityOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe(
      discoverVisibilityOf(DEMO_OME_SAKE_CANDIDATE_ID),
    );
    expect(releaseRoleOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).not.toBe(
      releaseRoleOf(DEMO_OME_SAKE_CANDIDATE_ID),
    );
    // Changing releaseRole never changes surface exposure.
    const roleChanged = SLICE_MANIFEST.map((entry) =>
      entry.candidateId === DEMO_RECOMMENDATION_CANDIDATE_ID
        ? { ...entry, releaseRole: 'none' as const }
        : entry,
    );
    expect(isCandidateDiscoverable(DEMO_RECOMMENDATION_CANDIDATE_ID, roleChanged)).toBe(true);
    expect(isCandidateRecommendable(DEMO_RECOMMENDATION_CANDIDATE_ID, roleChanged)).toBe(true);
  });

  it('keeps a playable slice out of production Discover when visibility is preview', () => {
    expect(isCandidateDiscoverable(DEMO_OME_SAKE_CANDIDATE_ID, PREVIEW_OME_MANIFEST)).toBe(false);
    expect(isCandidateRecommendable(DEMO_OME_SAKE_CANDIDATE_ID, PREVIEW_OME_MANIFEST)).toBe(true);
    // The preview slice is excluded from Discover playable selection and from
    // the hidden-managed set only when it is not production-visible.
    expect(discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES, PREVIEW_OME_MANIFEST).map((c) => c.id)).toEqual([
      DEMO_RECOMMENDATION_CANDIDATE_ID,
    ]);
  });

  it('keeps visibility and recommendation eligibility independent', () => {
    // Discover-visible but not recommendation-eligible.
    expect(isCandidateDiscoverable(DEMO_OME_SAKE_CANDIDATE_ID, DISCOVER_ONLY_MANIFEST)).toBe(true);
    expect(isCandidateRecommendable(DEMO_OME_SAKE_CANDIDATE_ID, DISCOVER_ONLY_MANIFEST)).toBe(false);
    const recommended = recommendableCandidates(
      DEMO_RECOMMENDATION_CANDIDATES,
      DISCOVER_ONLY_MANIFEST,
    );
    expect(recommended.map((c) => c.id)).toEqual([DEMO_RECOMMENDATION_CANDIDATE_ID]);
  });

  it('a hidden / research slice can never appear on production surfaces', () => {
    expect(isCandidateDiscoverable(DEMO_OME_SAKE_CANDIDATE_ID, RESEARCH_HIDDEN_MANIFEST)).toBe(false);
    expect(isCandidateRecommendable(DEMO_OME_SAKE_CANDIDATE_ID, RESEARCH_HIDDEN_MANIFEST)).toBe(
      false,
    );
    expect(recommendableCandidates(DEMO_RECOMMENDATION_CANDIDATES, RESEARCH_HIDDEN_MANIFEST).map((c) => c.id)).toEqual(
      [DEMO_RECOMMENDATION_CANDIDATE_ID],
    );
    expect(
      hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES, RESEARCH_HIDDEN_MANIFEST),
    ).toEqual(new Set(['sake-ome', 'hachioji-ginger']));
  });

  it('playable maturity never claims record-level verification (#129 stays authoritative)', () => {
    // The manifest carries no verification state for any slice.
    for (const entry of SLICE_MANIFEST) {
      expect('verificationStatus' in entry).toBe(false);
      expect('verification' in entry).toBe(false);
    }
    // A playable slice's canonical records keep their own #129 state — none are
    // promoted to `verified` by the manifest's maturity.
    const culture = getFoodCultureById('sake-ome');
    expect(culture).toBeDefined();
    const placesForCulture = getRelatedPlaces(culture!);
    expect(placesForCulture.length).toBeGreaterThan(0);
    for (const place of placesForCulture) {
      expect(deriveVerificationStatus(place.source, place.origin)).not.toBe('verified');
    }
  });
});

describe('Slice Manifest release boundary (#171 migration)', () => {
  it('a single enabled:false change removes Ome from recommendation selection', () => {
    const recommended = recommendableCandidates(
      DEMO_RECOMMENDATION_CANDIDATES,
      DISABLED_OME_MANIFEST,
    );
    expect(recommended.map((c) => c.id)).toEqual([DEMO_RECOMMENDATION_CANDIDATE_ID]);

    // The answers that would select sake when enabled now see only the wasabi
    // candidate through the same reusable engine — no engine redesign.
    const decision = recommendCandidates(
      createDefaultFoodProfile('2026-08-12T00:00:00.000Z'),
      {
        ...createDefaultExplorationAnswers(),
        tastes: ['rich'],
        experiences: ['buy'],
        interests: ['tradition'],
        duration: 'half-day',
      },
      recommended,
    );
    expect(decision.selected?.candidate.id).toBe(DEMO_RECOMMENDATION_CANDIDATE_ID);
    expect(decision.ranked.map((e) => e.candidate.id)).toEqual([DEMO_RECOMMENDATION_CANDIDATE_ID]);
  });

  it('a single enabled:false change removes Ome from Discover playable-slice selection', () => {
    const discoverable = discoverableCandidates(
      DEMO_RECOMMENDATION_CANDIDATES,
      DISABLED_OME_MANIFEST,
    );
    expect(discoverable.map((c) => c.id)).toEqual([DEMO_RECOMMENDATION_CANDIDATE_ID]);
  });

  it('disabling Ome does not delete or invalidate its canonical Story/Route/Spot path', () => {
    // Release exposure gating never touches the full candidate list that direct
    // Story / Route / Spot access resolves through (src/data/journey.ts), so the
    // hidden slice stays directly reachable even while disabled.
    const identity = resolveJourneyIdentity(DEMO_OME_SAKE_CANDIDATE_ID);
    expect(identity).toMatchObject({
      foodCultureId: 'sake-ome',
      journeyId: 'ome-sawai-sake-journey',
    });
    expect(getFoodCultureById('sake-ome')).toBeDefined();
    expect(getRouteById('ome-sawai-sake-journey')).toBeDefined();
  });

  it('unknown candidate ids fail closed (no production exposure)', () => {
    expect(isCandidateRecommendable('not-a-registered-candidate')).toBe(false);
    expect(isCandidateDiscoverable('not-a-registered-candidate')).toBe(false);
    expect(releaseRoleOf('not-a-registered-candidate')).toBeUndefined();
    expect(maturityOf('not-a-registered-candidate')).toBeUndefined();
  });

  it('derives hidden managed food-culture ids from the manifest', () => {
    // Default: both slices are discoverable, so nothing is hidden.
    expect(hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES)).toEqual(new Set());

    // A single enabled:false change marks sake-ome as the hidden managed
    // culture; wasabi stays exposed. This is the set Discover excludes from its
    // editorial "other cultures" section (#171).
    expect(
      hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES, DISABLED_OME_MANIFEST),
    ).toEqual(new Set(['sake-ome', 'hachioji-ginger']));
  });
});
