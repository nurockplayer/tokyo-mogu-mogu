import { describe, expect, it } from 'vitest';
import { createDefaultExplorationAnswers } from '../lib/exploration';
import { createDefaultFoodProfile } from '../lib/food-profile';
import { recommendCandidates } from '../lib/recommendation';
import {
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
} from './demo-recommendation';
import { getFoodCultureById, getRouteById } from './index';
import { resolveJourneyIdentity } from './journey';
import {
  discoverableCandidates,
  isCandidateDiscoverable,
  isCandidateRecommendable,
  recommendableCandidates,
  releaseRoleOf,
  type ReleaseConfigEntry,
} from './release-config';

/**
 * A test-only release config simulating the team decision to keep Ome/Sawai out
 * of the 8/23 release surface via a single `enabled: false` change. Pure
 * selector tests supply a config instead of mutating global runtime state.
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

describe('8/23 release boundary (#171)', () => {
  it('keeps Okutama × Tokyo Wasabi primary and Ome/Sawai × sake secondary by default', () => {
    expect(releaseRoleOf(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe('primary');
    expect(releaseRoleOf(DEMO_OME_SAKE_CANDIDATE_ID)).toBe('secondary');
  });

  it('exposes both slices on Discover and recommendation by default', () => {
    expect(isCandidateRecommendable(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe(true);
    expect(isCandidateDiscoverable(DEMO_RECOMMENDATION_CANDIDATE_ID)).toBe(true);
    expect(isCandidateRecommendable(DEMO_OME_SAKE_CANDIDATE_ID)).toBe(true);
    expect(isCandidateDiscoverable(DEMO_OME_SAKE_CANDIDATE_ID)).toBe(true);

    expect(recommendableCandidates(DEMO_RECOMMENDATION_CANDIDATES).map((c) => c.id)).toEqual([
      DEMO_RECOMMENDATION_CANDIDATE_ID,
      DEMO_OME_SAKE_CANDIDATE_ID,
    ]);
    expect(discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES).map((c) => c.id)).toEqual([
      DEMO_RECOMMENDATION_CANDIDATE_ID,
      DEMO_OME_SAKE_CANDIDATE_ID,
    ]);
  });

  it('a single enabled:false change removes Ome from recommendation selection', () => {
    const recommended = recommendableCandidates(DEMO_RECOMMENDATION_CANDIDATES, DISABLED_OME_CONFIG);
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
    const discoverable = discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES, DISABLED_OME_CONFIG);
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
  });
});
