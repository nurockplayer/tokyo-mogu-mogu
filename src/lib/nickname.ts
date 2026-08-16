/**
 * Locally persisted conversational nickname (Issue #217 Phase 1; Issue #226
 * moves it to localStorage for prototype continuity).
 *
 * The guided prototype asks for the user's preferred nickname and reuses it in
 * later MOGU messages. It is deliberately local-only state: it never joins the
 * durable Food Profile, never becomes an account/profile, and is cleared by the
 * demo reset (which calls `clearNickname`). Falling back to a generic greeting
 * when no nickname was entered is the caller's responsibility.
 */
const NICKNAME_KEY = 'tmm:nickname:v1';
const NICKNAME_MAX_LENGTH = 32;

/** Loads the nickname, trimmed; null when unset / blank / unavailable. */
export function loadNickname(): string | null {
  try {
    const raw = localStorage.getItem(NICKNAME_KEY);
    const value = raw?.trim();
    return value ? value : null;
  } catch {
    // Storage unavailable (e.g. private mode) — treat as no nickname.
    return null;
  }
}

/** Persists the nickname (trimmed, length-capped). */
export function saveNickname(name: string): void {
  try {
    localStorage.setItem(NICKNAME_KEY, name.trim().slice(0, NICKNAME_MAX_LENGTH));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** Whether a non-blank nickname exists. */
export function hasNickname(): boolean {
  return loadNickname() !== null;
}

/** Removes the nickname (demo reset). */
export function clearNickname(): void {
  try {
    localStorage.removeItem(NICKNAME_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}
