import type { ExplorationAnswers, MatchTagKey } from '../../../lib/exploration';
import type { MoguRecentEntry } from '../../../lib/mogu-recent';
import { foodCultureKey } from '../../../i18n/data-content';
import type { LocaleKey } from '../../../i18n/resources';
import type { JourneyPresentation } from '../content';

const journeySummaryTags: Record<string, readonly MatchTagKey[]> = {
  'demo-okutama-wasabi': ['nature-valley', 'tradition-edo', 'half-day'],
  'demo-okutama-yamame': ['nature-valley', 'daily-life', 'half-day'],
};

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
): Omit<MoguRecentEntry, 'createdAt' | 'titleKey' | 'summary'> & {
  titleKey: LocaleKey;
  summary: MatchTagKey[];
} {
  const titleKey = foodCultureKey(journey.foodCultureId, 'name');
  if (!titleKey) {
    throw new Error(`Missing localized food-culture name for ${journey.foodCultureId}`);
  }
  const summary = journeySummaryTags[journey.id];
  if (!summary) {
    throw new Error(`Missing MOGU Recent summary tags for ${journey.id}`);
  }

  return {
    candidateId: journey.id,
    resultId: journey.foodCultureId,
    titleKey,
    summary: [...summary],
    exploration,
    hasDietaryConsiderations,
  };
}
