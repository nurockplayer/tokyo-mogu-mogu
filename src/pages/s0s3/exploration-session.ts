/**
 * Compatibility projection for older Exploration consumers (Issue #78).
 *
 * The current ReferenceApp keeps raw answers in mounted reducer state and does
 * not restore this projection after a remount or reload. This per-tab,
 * best-effort sessionStorage value is separate from the durable Food Profile
 * and saved itineraries; failed reads return null and failed writes/removes are
 * ignored.
 */
import { isExplorationAnswers, type ExplorationAnswers } from '../../lib/exploration';

const STORAGE_KEY = 'tmm:exploration:v1';

export function saveExplorationAnswers(answers: ExplorationAnswers): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // Storage unavailable or blocked — keep the active in-memory flow usable.
  }
}

export function loadExplorationAnswers(): ExplorationAnswers | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isExplorationAnswers(parsed) ? parsed : null;
  } catch {
    // Missing, blocked, or unreadable storage behaves as no saved projection.
    return null;
  }
}

export function clearExplorationAnswers(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable or blocked — removal is best effort.
  }
}

/** Starts a genuinely new per-trip Exploration instead of reusing prior answers. */
export function beginNewExploration(): void {
  clearExplorationAnswers();
}
