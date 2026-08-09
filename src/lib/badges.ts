/**
 * Badge persistence (Issue #39, contract #38).
 *
 * Accountless local storage for the My → Badges collection. The exact earning
 * condition is an open product decision (#38), so for the Hackathon this module
 * only supports a clearly-labeled deterministic demo state: 東京わさび is
 * demo-earned, and every other slot is future/locked. This never claims real
 * visit/purchase verification.
 *
 * Badge state is separate from MOGU Recent (`tmm:moguRecent:v1`) and Saved
 * Routes (`tmm:savedRoutes`).
 */

export const BADGES_KEY = 'tmm:badges:v1';

/** Stable badge ids. 東京わさび is the real first-pilot fixture. */
export const BADGE_WASABI_OKUTAMA = 'badge-wasabi-okutama';

/** Badge status: earned (achieved) or unearned (not achieved). */
export type BadgeStatus = 'earned' | 'unearned';

/** One badge collection entry (#38 state shape, reduced for the demo). */
export interface BadgeRecord {
  id: string;
  status: BadgeStatus;
  /** ISO 8601 timestamp, set when earned. */
  earnedAt?: string;
}

const isBadgeRecord = (value: unknown): value is BadgeRecord => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    (v.status === 'earned' || v.status === 'unearned') &&
    (v.earnedAt === undefined || typeof v.earnedAt === 'string')
  );
};

/** Loads badge records, or [] when nothing is stored / storage is unavailable. */
export function loadBadges(): BadgeRecord[] {
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBadgeRecord);
  } catch {
    return [];
  }
}

/** Writes badge records; silently no-ops when storage is unavailable. */
export function saveBadges(records: BadgeRecord[]): void {
  try {
    localStorage.setItem(BADGES_KEY, JSON.stringify(records));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/**
 * Demo-earned baseline for the Hackathon: 東京わさび is the first-pilot fixture
 * and ships demo-earned (clearly labeled), with all other slots unearned.
 * Idempotent: re-running never duplicates a record.
 */
export function loadBadgeState(): BadgeRecord[] {
  const stored = loadBadges();
  const hasWasabi = stored.some((b) => b.id === BADGE_WASABI_OKUTAMA);
  if (!hasWasabi) {
    const baseline: BadgeRecord[] = [
      { id: BADGE_WASABI_OKUTAMA, status: 'earned', earnedAt: '2026-08-10T00:00:00.000Z' },
      ...stored.filter((b) => b.id !== BADGE_WASABI_OKUTAMA),
    ];
    saveBadges(baseline);
    return baseline;
  }
  return stored;
}
