/**
 * First-run guided tutorial state (Issue #257).
 *
 * Tutorial progress is presentation-only session state. It never joins the
 * durable Food Profile, recommendation inputs, MOGU history, or Saved Routes.
 * The first-use Food Profile flow starts it explicitly; Result completes it;
 * demo reset removes it so the next first-use run can start cleanly.
 */
const STORAGE_KEY = 'tmm:tutorial:v1';
const ACTIVE = 'active';
const COMPLETE = 'complete';

export function startGuidedTutorial(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, ACTIVE);
  } catch {
    // Storage can be unavailable in strict/private contexts. Failing open to
    // normal exploration is safer than trapping the user in a partial tour.
  }
}

export function isGuidedTutorialActive(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === ACTIVE;
  } catch {
    return false;
  }
}

export function isGuidedTutorialComplete(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === COMPLETE;
  } catch {
    return false;
  }
}

/** First-use fallback that can distinguish absent state from blocked storage. */
export function shouldStartGuidedTutorial(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== COMPLETE;
  } catch {
    return false;
  }
}

export function completeGuidedTutorial(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, COMPLETE);
  } catch {
    // See startGuidedTutorial: storage failure degrades to normal exploration.
  }
}

export function resetGuidedTutorial(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Reset is best-effort when browser storage is unavailable.
  }
}
