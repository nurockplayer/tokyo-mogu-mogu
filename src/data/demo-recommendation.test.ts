import { describe, expect, it } from 'vitest';
import { createDefaultExplorationAnswers } from '../lib/exploration';
import { createDefaultFoodProfile } from '../lib/food-profile';
import { recommendCandidates } from '../lib/recommendation';
import {
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  demoRecommendationMatchTags,
} from './demo-recommendation';
import { PILOT_JOURNEY } from './pilot-journey';

describe('8/23 demo recommendation configuration (#123 / #127 / #163)', () => {
  it('keeps the two production-ready demo candidates aligned with their journeys', () => {
    expect(DEMO_RECOMMENDATION_CANDIDATES).toHaveLength(2);

    // The frozen Okutama × Tokyo Wasabi demo golden path (#127) stays the
    // deterministic default.
    const wasabi = DEMO_RECOMMENDATION_CANDIDATES.find(
      (c) => c.id === DEMO_RECOMMENDATION_CANDIDATE_ID,
    );
    expect(wasabi).toMatchObject({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
      availability: 'ready',
      tourismDispersion: { status: 'unknown' },
    });

    // Issue #163: the source-backed Ome/Sawai × sake slice, added through
    // data/config with no shared-contract redesign.
    const sake = DEMO_RECOMMENDATION_CANDIDATES.find(
      (c) => c.id === DEMO_OME_SAKE_CANDIDATE_ID,
    );
    expect(sake).toMatchObject({
      foodCultureId: 'sake-ome',
      journeyId: 'ome-sawai-sake-journey',
      availability: 'ready',
      tourismDispersion: { status: 'unknown' },
    });
  });

  it('gets the deterministic demo result through the reusable multi-candidate engine', () => {
    const decision = recommendCandidates(
      createDefaultFoodProfile('2026-08-12T00:00:00.000Z'),
      createDefaultExplorationAnswers(),
      DEMO_RECOMMENDATION_CANDIDATES,
    );

    expect(decision.selected?.candidate.foodCultureId).toBe(PILOT_JOURNEY.foodCultureId);
    expect(decision.excluded).toEqual([]);
  });

  it('renders tags only for reasons that actually matched the selected candidate', () => {
    const matching = recommendCandidates(
      createDefaultFoodProfile('2026-08-12T00:00:00.000Z'),
      {
        ...createDefaultExplorationAnswers(),
        tastes: ['refreshing'],
        experiences: ['eat'],
        interests: ['nature'],
      },
      DEMO_RECOMMENDATION_CANDIDATES,
    ).selected!;
    expect(demoRecommendationMatchTags(matching.candidate.id, matching.explanation.reasons)).toEqual([
      'stream-fresh',
      'grate-fresh',
      'nature-valley',
    ]);

    const unsupported = recommendCandidates(
      createDefaultFoodProfile('2026-08-12T00:00:00.000Z'),
      {
        ...createDefaultExplorationAnswers(),
        experiences: ['make'],
        interests: ['daily-life'],
      },
      DEMO_RECOMMENDATION_CANDIDATES,
    ).selected!;
    expect(
      demoRecommendationMatchTags(unsupported.candidate.id, unsupported.explanation.reasons),
    ).toEqual([]);
  });

  it('selects the Ome/Sawai sake candidate for a rich/tradition trip and renders only its own tags (#163)', () => {
    const matching = recommendCandidates(
      createDefaultFoodProfile('2026-08-12T00:00:00.000Z'),
      {
        ...createDefaultExplorationAnswers(),
        tastes: ['rich'],
        experiences: ['buy'],
        interests: ['tradition'],
        duration: 'half-day',
      },
      DEMO_RECOMMENDATION_CANDIDATES,
    ).selected!;
    expect(matching.candidate.id).toBe(DEMO_OME_SAKE_CANDIDATE_ID);
    expect(matching.candidate.foodCultureId).toBe('sake-ome');
    // The engine caps reasons at MAX_RECOMMENDATION_REASONS (3): duration-match
    // is the 4th ranking factor here and drops out, so only the experience and
    // interest matches become tags — the half-day tag correctly does not render.
    // The sake tag mapping also never borrows wasabi's grate-fresh/stream-fresh.
    expect(
      demoRecommendationMatchTags(matching.candidate.id, matching.explanation.reasons),
    ).toEqual(['buy-gift', 'tradition-edo']);
  });
});
