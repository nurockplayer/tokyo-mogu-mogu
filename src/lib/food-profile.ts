/**
 * Durable Food Profile (Issue #78 reframe of S1).
 *
 * Stable, accountless, locally persisted data about what the user can / cannot
 * eat — kept separate from the transient Exploration answers for a single trip.
 *
 * Relationship to legacy diagnosis (Issue #43):
 *   - The old `DiagnosisAnswers` bundled S1 dietary input with S2 preference
 *     answers in one sessionStorage payload.
 *   - That temporary diagnosis/session payload must NOT be silently interpreted
 *     as the new durable profile. This module's `isFoodProfile` guard only
 *     accepts the durable shape (versioned, timestamped), so a stale
 *     `tmm:diagnosis:v1` blob never becomes the profile.
 *
 * Dietary input is used only for recommendation / match reasons and is never a
 * safety guarantee (product contract "Safety Boundary").
 */

export type DietaryRestriction = 'allergy' | 'vegetarian-vegan' | 'religious' | 'dislike';

/** A valid persisted Food Profile (schema version `1`). */
export interface FoodProfile {
  /** Multi-select restrictions (allergy / vegetarian-vegan / religious / dislike). */
  dietary: DietaryRestriction[];
  /** Free-text note for other restrictions / foods the user cannot eat. */
  dietaryOther: string;
  /** "No restrictions" skip path; mutually exclusive with `dietary`. */
  hasNoRestrictions: boolean;
  /** ISO 8601 timestamp of when the profile was created or last edited. */
  savedAt: string;
  /** Schema version so a future migration is explicit and reversible. */
  version: 1;
}

/** Starting (unset) profile state: no restrictions, skip path on. */
export function createDefaultFoodProfile(now = new Date().toISOString()): FoodProfile {
  return {
    dietary: [],
    dietaryOther: '',
    hasNoRestrictions: true,
    savedAt: now,
    version: 1,
  };
}

/**
 * Whether a value is a valid Food Profile. Legacy `DiagnosisAnswers` blobs
 * (which also carry `dietary` / `dietaryOther` / `hasNoRestrictions`) are
 * rejected because they lack the durable `version` / `savedAt` fields.
 */
export function isFoodProfile(value: unknown): value is FoodProfile {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  if (v.version !== 1) return false;
  if (typeof v.savedAt !== 'string' || v.savedAt.length === 0) return false;
  if (typeof v.hasNoRestrictions !== 'boolean') return false;
  if (typeof v.dietaryOther !== 'string') return false;
  if (!Array.isArray(v.dietary) || !v.dietary.every((d) => typeof d === 'string')) {
    return false;
  }
  return true;
}
