/**
 * S0 Food Profile — route-mode & save-freshness logic tests (Issue #78 P1 fix).
 *
 * Vitest runs in a node environment, so we test the pure helpers:
 *   - `foodProfileView(mode, hasExisting)`: which view renders (setup / edit /
 *     summary), derived directly from the route `mode` + persisted-profile
 *     presence — never duplicated in local state. This is the regression lock
 *     for the stale-edit-mode finding: navigating /food-profile ⇄
 *     /food-profile/edit must switch view immediately.
 *   - the save→summary freshness contract: after `saveFoodProfile`, the
 *     persisted profile that the summary renders must be the just-saved one.
 * Persistence round-trips are covered by src/lib/food-profile.test.ts.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  createDefaultFoodProfile,
  type FoodProfile,
} from '../../lib/food-profile';
import {
  clearFoodProfile,
  loadFoodProfile,
  saveFoodProfile,
} from '../../lib/food-profile-storage';
import { foodProfileView } from './FoodProfilePage';

/** Minimal in-memory localStorage shim (vitest env is node). */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
}

const originalLocalStorage = globalThis.localStorage;

beforeEach(() => {
  globalThis.localStorage = new MemoryStorage() as unknown as Storage;
});

afterAll(() => {
  globalThis.localStorage = originalLocalStorage;
});

describe('foodProfileView — route-mode transitions (#78 P1)', () => {
  it('renders setup when no persisted profile exists, regardless of mode', () => {
    expect(foodProfileView('view', false)).toBe('setup');
    expect(foodProfileView('edit', false)).toBe('setup');
  });

  it('renders edit immediately when the route mode is edit', () => {
    // /food-profile/edit → edit
    expect(foodProfileView('edit', true)).toBe('edit');
  });

  it('renders the summary immediately when the route mode is view', () => {
    // /food-profile → summary (view ⇄ edit navigation reflects mode at once)
    expect(foodProfileView('view', true)).toBe('summary');
  });
});

describe('save → summary freshness (#78 P1)', () => {
  it('returns to the summary with the newly saved profile visible after edit save', () => {
    // Existing profile, then save an edited profile.
    saveFoodProfile({
      ...createDefaultFoodProfile('2026-08-10T01:00:00.000Z'),
      dietary: ['allergy'],
      hasNoRestrictions: false,
    });

    const edited: FoodProfile = {
      ...createDefaultFoodProfile('2026-08-10T02:00:00.000Z'),
      dietary: ['vegetarian-vegan', 'dislike'],
      dietaryOther: 'no pork',
      hasNoRestrictions: false,
    };
    saveFoodProfile(edited);

    // The summary route re-reads storage, so it must reflect the just-saved
    // profile, not the previous one.
    const fresh = loadFoodProfile();
    expect(fresh).not.toBeNull();
    expect(fresh!.dietary).toEqual(['vegetarian-vegan', 'dislike']);
    expect(fresh!.dietaryOther).toBe('no pork');
    expect(fresh!.savedAt).toBe('2026-08-10T02:00:00.000Z');
  });

  it('persists the first-use setup profile so setup → /explore continuation is intact', () => {
    // No profile: first-use setup path. Save, then confirm the durable profile
    // exists so the caller can continue to /explore.
    clearFoodProfile();
    expect(loadFoodProfile()).toBeNull();

    const setupProfile: FoodProfile = {
      ...createDefaultFoodProfile('2026-08-10T03:00:00.000Z'),
      dietary: ['religious'],
      hasNoRestrictions: false,
    };
    saveFoodProfile(setupProfile);

    const saved = loadFoodProfile();
    expect(saved).not.toBeNull();
    expect(saved!.dietary).toEqual(['religious']);
    // After a first-use save the page still derives setup from absence of a
    // profile; once saved, the durable profile exists.
    expect(foodProfileView('view', saved !== null)).toBe('summary');
  });
});
