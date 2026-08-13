import { describe, expect, it } from 'vitest';
import { createDefaultExplorationAnswers } from '../lib/exploration';
import { createDefaultFoodProfile } from '../lib/food-profile';
import { recommendCandidates } from '../lib/recommendation';
import {
  DEMO_RECOMMENDATION_CANDIDATES,
  demoRecommendationMatchTags,
} from './demo-recommendation';
import { PILOT_JOURNEY } from './pilot-journey';

describe('8/23 demo recommendation configuration (#123 / #127)', () => {
  it('keeps the sole production-ready demo candidate aligned with the frozen demo journey', () => {
    expect(DEMO_RECOMMENDATION_CANDIDATES).toHaveLength(1);
    expect(DEMO_RECOMMENDATION_CANDIDATES[0]).toMatchObject({
      foodCultureId: PILOT_JOURNEY.foodCultureId,
      journeyId: PILOT_JOURNEY.routeId,
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
});
