/**
 * Food Profile persistence (Issue #78).
 *
 * Durable, accountless local storage for the Food Profile — distinct from the
 * transient Exploration session (sessionStorage) and from Saved Routes. A
 * corrupted or stale payload fails safely (treated as "no profile").
 */
import { isFoodProfile, type FoodProfile } from './food-profile';

export const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';

/** Loads the durable profile, or null when nothing is stored / storage is unavailable. */
export function loadFoodProfile(): FoodProfile | null {
  try {
    const raw = localStorage.getItem(FOOD_PROFILE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isFoodProfile(parsed) ? parsed : null;
  } catch {
    // Unreadable or blocked storage (e.g. private mode) — treat as no profile.
    return null;
  }
}

/** Persists the profile; silently no-ops when storage is unavailable. */
export function saveFoodProfile(profile: FoodProfile): void {
  try {
    localStorage.setItem(FOOD_PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** Removes the persisted profile (demo reset). */
export function clearFoodProfile(): void {
  try {
    localStorage.removeItem(FOOD_PROFILE_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** True when a valid durable profile exists. */
export function hasFoodProfile(): boolean {
  return loadFoodProfile() !== null;
}
