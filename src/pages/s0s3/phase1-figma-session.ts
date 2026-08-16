/**
 * Presentation-only Figma answers for the Phase 1 Exploration conversation
 * (Issue #224).
 *
 * These raw selections are fixture state: they drive the chat transcript and
 * visible conversation only. They never feed the recommendation result, which
 * stays the fixed Okutama × Tokyo Wasabi golden path via `PHASE1_DEMO_ANSWERS`
 * (#201 / #220). No production semantics are inferred from these visual
 * controls (#206 deferred).
 */
export interface FigmaExplorationAnswers {
  experiences: string[];
  departure: string | null;
  departureSearch: string;
  travelTime: string | null;
  duration: string | null;
  tastes: string[];
  themes: string[];
}

const STORAGE_KEY = 'tmm:phase1-figma:v1';

export function createEmptyFigmaExplorationAnswers(): FigmaExplorationAnswers {
  return {
    experiences: [],
    departure: null,
    departureSearch: '',
    travelTime: null,
    duration: null,
    tastes: [],
    themes: [],
  };
}

export function loadFigmaExplorationAnswers(): FigmaExplorationAnswers | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FigmaExplorationAnswers;
    return typeof parsed === 'object' && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export function saveFigmaExplorationAnswers(answers: FigmaExplorationAnswers): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // Storage unavailable — the fixture can live in memory for the demo.
  }
}

export function clearFigmaExplorationAnswers(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}
