/**
 * Session persistence for the current Exploration (Issue #78).
 *
 * The Exploration wizard and the Result share one answers payload across route
 * changes (/explore → /explore/result → back to the wizard). sessionStorage
 * keeps it alive across those navigations and a page reload, while staying out
 * of localStorage so it is never part of the durable Food Profile or a saved
 * itinerary. Exploration state is current-session / per-trip data.
 */
import { isExplorationAnswers, type ExplorationAnswers } from '../../lib/exploration';
import { clearFigmaExplorationAnswers } from './phase1-figma-session';

const STORAGE_KEY = 'tmm:exploration:v1';

export function saveExplorationAnswers(answers: ExplorationAnswers): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadExplorationAnswers(): ExplorationAnswers | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isExplorationAnswers(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearExplorationAnswers(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

/** Starts a genuinely new per-trip Exploration instead of reusing prior answers. */
export function beginNewExploration(): void {
  clearExplorationAnswers();
  clearFigmaExplorationAnswers();
}
