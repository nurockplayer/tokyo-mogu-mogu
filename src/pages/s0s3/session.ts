/**
 * Session persistence for the diagnosis flow (Issue #43).
 *
 * The wizard and the S3 result share one answers payload across route
 * changes (S1/S2 wizard → /diagnosis/result → edit back to the wizard).
 * sessionStorage keeps it alive across those navigations and a page reload,
 * while staying out of localStorage so it is never part of a saved itinerary.
 */
import { isDiagnosisAnswers, type DiagnosisAnswers } from '../../lib/diagnosis';

const STORAGE_KEY = 'tmm:diagnosis:v1';

export function saveDiagnosisAnswers(answers: DiagnosisAnswers): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadDiagnosisAnswers(): DiagnosisAnswers | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isDiagnosisAnswers(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearDiagnosisAnswers(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
