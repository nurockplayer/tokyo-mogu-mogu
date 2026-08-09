/**
 * Exploration logic for the current trip (Issue #78 reframe of S2).
 *
 * Pure, framework-free helpers for the Exploration wizard and Result: the
 * current-session answer model, defaults, wizard step constants, and the
 * deterministic answer → match tag derivation used by the Result. Kept free of
 * i18n and data-layer coupling so it stays unit-testable.
 *
 * These answers describe ONE trip ("今回どう体験したいか"), not the user's
 * permanent preferences. The durable Food Profile (src/lib/food-profile.ts)
 * holds the stable dietary data separately.
 */

export type Taste = 'refreshing' | 'rich' | 'spicy' | 'sweet';
export type Experience = 'eat' | 'make' | 'buy' | 'meet';
export type BaseArea = 'okutama' | 'tama-center' | 'tokyo-west';
export type TravelTime = 'within-30' | 'within-60' | 'over-60';
export type Interest = 'tradition' | 'nature' | 'daily-life' | 'craft';
export type TripDuration = 'half-day' | 'full-day';

/**
 * Everything collected for the current Exploration (the five S2 questions).
 * The wizard keeps a single instance in component state so Back/Next never lose
 * prior answers; the Result derives match tags from it. This is transient
 * current-trip data, persisted to sessionStorage — not the durable profile.
 */
export interface ExplorationAnswers {
  /** Q1 今回どんな味 (multi-select). */
  tastes: Taste[];
  /** Q2 今回何をしたいか (multi-select). */
  experiences: Experience[];
  /** Q3 今回どこから (single-select). */
  baseArea: BaseArea | null;
  /** Q3 どのくらい移動できるか (single-select). */
  travelTime: TravelTime | null;
  /** Q4 今回何に触れたいか (multi-select). */
  interests: Interest[];
  /** Q5 半日/1日 (single-select). */
  duration: TripDuration | null;
}

/** Starting state: unanswered current-trip questions. */
export function createDefaultExplorationAnswers(): ExplorationAnswers {
  return {
    tastes: [],
    experiences: [],
    baseArea: null,
    travelTime: null,
    interests: [],
    duration: null,
  };
}

/** Wizard steps: the five Exploration questions (S2 only). */
export const WIZARD_STEP_COUNT = 5;

/** Stable match-tag keys rendered on the Result (localized by the UI). */
export type MatchTagKey =
  | 'grate-fresh'
  | 'stream-fresh'
  | 'meet-maker'
  | 'buy-gift'
  | 'make-craft'
  | 'nature-valley'
  | 'tradition-edo'
  | 'daily-life'
  | 'half-day'
  | 'full-day';

/**
 * Deterministically derive the Result match tags for 東京わさび from the
 * current-trip answers. Always starts with the core "freshly harvested wasabi"
 * tag, then adds one tag per matching taste / experience / interest / duration.
 * The order is stable so the result card renders identically for the same
 * answers. Tags come from the current Exploration — never from the durable
 * Food Profile.
 */
export function deriveMatchTags(answers: ExplorationAnswers): MatchTagKey[] {
  const tags: MatchTagKey[] = ['grate-fresh'];
  if (answers.tastes.includes('refreshing')) tags.push('stream-fresh');
  if (answers.experiences.includes('meet')) tags.push('meet-maker');
  if (answers.experiences.includes('buy')) tags.push('buy-gift');
  if (answers.experiences.includes('make')) tags.push('make-craft');
  if (answers.interests.includes('nature')) tags.push('nature-valley');
  if (answers.interests.includes('tradition')) tags.push('tradition-edo');
  if (answers.interests.includes('daily-life')) tags.push('daily-life');
  if (answers.interests.includes('craft') && !tags.includes('make-craft')) tags.push('make-craft');
  if (answers.duration === 'half-day') tags.push('half-day');
  if (answers.duration === 'full-day') tags.push('full-day');
  return tags;
}

/** Replaces `{key}` placeholders in a translated template with values. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match,
  );
}

/** Runtime guard for answers arriving through router state. */
export function isExplorationAnswers(value: unknown): value is ExplorationAnswers {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray((value as Record<string, unknown>).tastes) &&
    Array.isArray((value as Record<string, unknown>).experiences) &&
    Array.isArray((value as Record<string, unknown>).interests) &&
    'duration' in value
  );
}
