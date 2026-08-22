import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  createDefaultFoodProfile,
  foodProfileDietaryState,
  isFoodProfile,
  type FoodProfile,
} from './food-profile';
import {
  clearFoodProfile,
  FOOD_PROFILE_KEY,
  hasFoodProfile,
  loadFoodProfile,
  saveFoodProfile,
} from './food-profile-storage';

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

describe('Food Profile defaults (#78)', () => {
  it('starts with no dietary selections and the skip path on', () => {
    const p = createDefaultFoodProfile('2026-08-10T00:00:00.000Z');
    expect(p.dietary).toEqual([]);
    expect(p.dietaryOther).toBe('');
    expect(p.hasNoRestrictions).toBe(true);
    expect(p.version).toBe(1);
    expect(p.savedAt).toBe('2026-08-10T00:00:00.000Z');
  });
});

describe('Food Profile dietary state (#268)', () => {
  it('distinguishes recorded restrictions, explicit none, and not evaluated', () => {
    const explicitNone = createDefaultFoodProfile('2026-08-10T00:00:00.000Z');
    const restrictions: FoodProfile = {
      ...explicitNone,
      dietary: ['allergy'],
      hasNoRestrictions: false,
    };
    const notEvaluated: FoodProfile = {
      ...explicitNone,
      hasNoRestrictions: false,
    };

    expect(foodProfileDietaryState(restrictions)).toBe('restrictions-recorded');
    expect(foodProfileDietaryState(explicitNone)).toBe('no-restrictions');
    expect(foodProfileDietaryState(notEvaluated)).toBe('not-evaluated');
  });
});

describe('isFoodProfile (#78)', () => {
  it('accepts a well-formed durable profile', () => {
    expect(isFoodProfile(createDefaultFoodProfile('2026-08-10T00:00:00.000Z'))).toBe(true);
  });

  it('rejects the legacy diagnosis/session payload (no durable fields)', () => {
    // Legacy `tmm:diagnosis:v1` blob — carries dietary fields but lacks the
    // durable version/savedAt. Must NOT be interpreted as the profile.
    const legacy = {
      dietary: ['allergy'],
      dietaryOther: '',
      hasNoRestrictions: false,
      tastes: ['refreshing'],
      experiences: ['eat'],
      baseArea: null,
      travelTime: null,
      interests: [],
      duration: null,
    };
    expect(isFoodProfile(legacy)).toBe(false);
  });

  it('rejects null / non-objects / wrong version', () => {
    expect(isFoodProfile(null)).toBe(false);
    expect(isFoodProfile(undefined)).toBe(false);
    expect(isFoodProfile('profile')).toBe(false);
    expect(isFoodProfile({ ...createDefaultFoodProfile(), version: 2 })).toBe(false);
    expect(isFoodProfile({ ...createDefaultFoodProfile(), savedAt: '' })).toBe(false);
  });

  it('rejects unknown restriction values and contradictory no-restriction state', () => {
    expect(isFoodProfile({ ...createDefaultFoodProfile(), dietary: ['unknown'] })).toBe(false);
    expect(
      isFoodProfile({
        ...createDefaultFoodProfile(),
        dietary: ['allergy'],
        hasNoRestrictions: true,
      }),
    ).toBe(false);
  });
});

describe('Food Profile persistence (#78)', () => {
  it('round-trips a saved profile through localStorage', () => {
    const profile: FoodProfile = {
      ...createDefaultFoodProfile('2026-08-10T00:00:00.000Z'),
      dietary: ['allergy'],
      hasNoRestrictions: false,
    };
    saveFoodProfile(profile);
    expect(loadFoodProfile()).toEqual(profile);
    expect(hasFoodProfile()).toBe(true);
  });

  it('returns null when nothing is stored', () => {
    expect(loadFoodProfile()).toBeNull();
    expect(hasFoodProfile()).toBe(false);
  });

  it('returns null for corrupted data or a legacy diagnosis blob', () => {
    localStorage.setItem(FOOD_PROFILE_KEY, '{not json');
    expect(loadFoodProfile()).toBeNull();

    // A stale legacy diagnosis payload stored under the profile key must not
    // silently become the durable profile.
    localStorage.setItem(
      FOOD_PROFILE_KEY,
      JSON.stringify({
        dietary: ['vegetarian-vegan'],
        dietaryOther: '',
        hasNoRestrictions: false,
        tastes: [],
        experiences: [],
        baseArea: null,
        travelTime: null,
        interests: [],
        duration: null,
      }),
    );
    expect(loadFoodProfile()).toBeNull();
  });

  it('clearFoodProfile removes the persisted profile (demo reset)', () => {
    saveFoodProfile(createDefaultFoodProfile());
    expect(loadFoodProfile()).not.toBeNull();
    clearFoodProfile();
    expect(loadFoodProfile()).toBeNull();
    expect(localStorage.getItem(FOOD_PROFILE_KEY)).toBeNull();
  });
});
