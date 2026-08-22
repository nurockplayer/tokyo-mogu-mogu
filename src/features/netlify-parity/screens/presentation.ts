import type { ExplorationAnswers } from '../../../lib/exploration';
import type { MoguRecentEntry } from '../../../lib/mogu-recent';
import type { JourneyPresentation } from '../content';

export const bottomNavigationPaths = {
  home: '/home',
  mogu: '/mogu',
  favorites: '/my-route',
  my: '/my',
} as const;

export function journeyStoryPath(journey: Pick<JourneyPresentation, 'storyId'>): string {
  return `/story/${journey.storyId}`;
}

export function routeSpotPath(spotId: string): string {
  return `/spot/${spotId}`;
}

export function journeyToMoguRecent(
  journey: JourneyPresentation,
  exploration: ExplorationAnswers,
  hasDietaryConsiderations: boolean,
): Omit<MoguRecentEntry, 'createdAt'> {
  return {
    candidateId: journey.id,
    resultId: journey.foodCultureId,
    titleKey: `reference.${journey.id}.title`,
    summary: [...journey.copy.ja.tags],
    exploration,
    hasDietaryConsiderations,
  };
}
