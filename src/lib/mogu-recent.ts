/**
 * MOGU Recent recommendation history (Issue #78 → #94 contract).
 *
 * #78 hands off a successfully generated Result here so it is automatically
 * recorded into Recent — before #94 builds the MOGU list UI. This module is the
 * persistence/integration point for that contract:
 *
 * - recommendation Result is recorded on successful creation (no Save needed)
 * - at most 5 entries, newest first
 * - duplicate / repeated deterministic results are handled by replacing the
 *   existing entry for the same candidate identity (legacy entries fall back
 *   to resultId), moving it to the front with a new timestamp
 * - distinct from Saved Routes (which live under `tmm:savedRoutes`), even
 *   though both are accountless local persistence
 * - corrupted / stale payloads fail safely (treated as empty)
 */
import { isExplorationAnswers, type ExplorationAnswers } from './exploration';

export const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
/** Maximum number of recent entries retained. */
export const MOGU_RECENT_MAX = 5;

/** One automatically-recorded Recent entry (the #94 core contract). */
export interface MoguRecentEntry {
  /** Stable recommendation-candidate identity (#123); absent on legacy v1 entries. */
  candidateId?: string;
  /** result / food-culture identifier, e.g. 'wasabi-okutama'. */
  resultId: string;
  /** i18n key for the result title (resolved by the UI, not baked in). */
  titleKey: string;
  /** Match / exploration summary for display (MatchTagKey strings). */
  summary: string[];
  /** ISO 8601 timestamp of when the result was recommended. */
  createdAt: string;
  /** Enough context to reopen the same Result → Story → Route experience. */
  exploration: ExplorationAnswers;
  /** Snapshot of the dietary-context state shown for this historical result. */
  hasDietaryConsiderations: boolean;
}

const isMoguRecentEntry = (value: unknown): value is MoguRecentEntry => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.candidateId === undefined ||
      (typeof v.candidateId === 'string' && v.candidateId.length > 0)) &&
    typeof v.resultId === 'string' &&
    typeof v.titleKey === 'string' &&
    Array.isArray(v.summary) &&
    v.summary.every((s) => typeof s === 'string') &&
    typeof v.createdAt === 'string' &&
    isExplorationAnswers(v.exploration) &&
    typeof v.hasDietaryConsiderations === 'boolean'
  );
};

/** Loads Recent entries, or [] when nothing is stored / storage is unavailable. */
export function loadMoguRecent(): MoguRecentEntry[] {
  try {
    const raw = localStorage.getItem(MOGU_RECENT_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Keep only well-formed entries so a corrupted record degrades gracefully.
    return parsed.filter(isMoguRecentEntry).slice(0, MOGU_RECENT_MAX);
  } catch {
    // Unreadable or blocked storage (e.g. private mode) — treat as no data.
    return [];
  }
}

/** Candidate-aware identity with a legacy result-id fallback. */
export function moguRecentIdentity(entry: Pick<MoguRecentEntry, 'candidateId' | 'resultId'>): string {
  return entry.candidateId ?? entry.resultId;
}

/**
 * Candidate-aware equality that also migrates a legacy result-id-only entry.
 * Two candidate-aware entries may share a food culture without collapsing;
 * when either side is legacy, resultId is the only compatible identity.
 */
export function isSameMoguRecommendation(
  left: Pick<MoguRecentEntry, 'candidateId' | 'resultId'>,
  right: Pick<MoguRecentEntry, 'candidateId' | 'resultId'>,
): boolean {
  if (left.candidateId && right.candidateId) {
    return left.candidateId === right.candidateId;
  }
  return left.resultId === right.resultId;
}

/** Writes the Recent list; silently no-ops when storage is unavailable. */
export function saveMoguRecent(entries: MoguRecentEntry[]): void {
  try {
    localStorage.setItem(MOGU_RECENT_KEY, JSON.stringify(entries.slice(0, MOGU_RECENT_MAX)));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/**
 * Records a successfully generated Result into Recent. Newest first, capped at
 * MOGU_RECENT_MAX. Repeating the same candidate identity replaces that entry
 * (moves it to the front with the new timestamp) instead of duplicating it.
 */
export function recordMoguRecent(
  entry: Omit<MoguRecentEntry, 'createdAt'>,
  now = new Date().toISOString(),
): MoguRecentEntry[] {
  const full: MoguRecentEntry = { ...entry, createdAt: now };
  const rest = loadMoguRecent().filter((existing) => !isSameMoguRecommendation(existing, full));
  const next = [full, ...rest].slice(0, MOGU_RECENT_MAX);
  saveMoguRecent(next);
  return next;
}

/** Removes all Recent entries (demo reset). */
export function clearMoguRecent(): void {
  try {
    localStorage.removeItem(MOGU_RECENT_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}
