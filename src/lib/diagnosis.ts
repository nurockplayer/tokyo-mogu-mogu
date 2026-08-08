/**
 * Onboarding / diagnosis logic for S1–S3 (Issue #43).
 *
 * Pure, framework-free helpers for the diagnosis wizard and result: the answer
 * model, defaults, wizard step constants, and the deterministic answer → match
 * tag derivation used by the S3 result. Kept free of i18n and data-layer
 * coupling so it stays unit-testable.
 */

export type DietaryRestriction = 'allergy' | 'vegetarian-vegan' | 'religious' | 'dislike';

export type Taste = 'refreshing' | 'rich' | 'spicy' | 'sweet';
export type Experience = 'eat' | 'make' | 'buy' | 'meet';
export type BaseArea = 'okutama' | 'tama-center' | 'tokyo-west';
export type TravelTime = 'within-30' | 'within-60' | 'over-60';
export type Interest = 'tradition' | 'nature' | 'daily-life';
export type TripDuration = 'half-day' | 'full-day';

/**
 * Everything collected during S1 (dietary) and S2 (preference diagnosis).
 * The wizard keeps a single instance of this in component state so Back/Next
 * never lose prior answers; the S3 result derives tags from it.
 */
export interface DiagnosisAnswers {
  /** S1 dietary restrictions (multi-select). */
  dietary: DietaryRestriction[];
  /** S1 free-text note for other restrictions / dislikes. */
  dietaryOther: string;
  /** S1 "no restrictions" skip path; mutually exclusive with `dietary`. */
  hasNoRestrictions: boolean;
  /** S2 Q1 好きな味 (multi-select). */
  tastes: Taste[];
  /** S2 Q2 したい体験 (multi-select). */
  experiences: Experience[];
  /** S2 Q3 宿泊エリア (single-select). */
  baseArea: BaseArea | null;
  /** S2 Q3 移動可能時間 (single-select). */
  travelTime: TravelTime | null;
  /** S2 Q4 興味 (multi-select). */
  interests: Interest[];
  /** S2 Q5 半日/1日 (single-select). */
  duration: TripDuration | null;
}

/** Starting state: no restrictions, unanswered preference questions. */
export function createDefaultAnswers(): DiagnosisAnswers {
  return {
    dietary: [],
    dietaryOther: '',
    hasNoRestrictions: true,
    tastes: [],
    experiences: [],
    baseArea: null,
    travelTime: null,
    interests: [],
    duration: null,
  };
}

/** Wizard steps: S1 dietary (1) + S2 preference questions (5). */
export const WIZARD_STEP_COUNT = 6;
/** Index of the first S2 step (step 0 is S1 dietary). */
export const S2_FIRST_STEP = 1;

/** Stable match-tag keys rendered on the S3 result (localized by the UI). */
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
 * Deterministically derive the S3 match tags for 東京わさび from the user's
 * answers. Always starts with the core "freshly harvested wasabi" tag, then
 * adds one tag per matching taste / experience / interest / duration. The order
 * is stable so the result card renders identically for the same answers.
 */
export function deriveMatchTags(answers: DiagnosisAnswers): MatchTagKey[] {
  const tags: MatchTagKey[] = ['grate-fresh'];
  if (answers.tastes.includes('refreshing')) tags.push('stream-fresh');
  if (answers.experiences.includes('meet')) tags.push('meet-maker');
  if (answers.experiences.includes('buy')) tags.push('buy-gift');
  if (answers.experiences.includes('make')) tags.push('make-craft');
  if (answers.interests.includes('nature')) tags.push('nature-valley');
  if (answers.interests.includes('tradition')) tags.push('tradition-edo');
  if (answers.interests.includes('daily-life')) tags.push('daily-life');
  if (answers.duration === 'half-day') tags.push('half-day');
  if (answers.duration === 'full-day') tags.push('full-day');
  return tags;
}

/**
 * Whether the S3 result should surface the dietary-consideration state.
 * Only used to shape recommendation copy — never as a safety guarantee.
 */
export function hasDietaryConsideration(answers: DiagnosisAnswers): boolean {
  return answers.dietary.length > 0 || answers.dietaryOther.trim().length > 0;
}

/** Replaces `{key}` placeholders in a translated template with values. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match,
  );
}

/** Runtime guard for answers arriving through router state. */
export function isDiagnosisAnswers(value: unknown): value is DiagnosisAnswers {
  return (
    typeof value === 'object' &&
    value !== null &&
    'dietary' in value &&
    'dietaryOther' in value &&
    'tastes' in value &&
    'experiences' in value &&
    'interests' in value &&
    'duration' in value
  );
}
