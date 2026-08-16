/**
 * Session-scoped conversational nickname (Issue #217 Phase 1).
 *
 * The guided prototype asks for the user's preferred nickname and reuses it in
 * later MOGU messages. This is deliberately session-only state: it never joins
 * the durable Food Profile, never becomes an account/profile, and is cleared
 * with the rest of the session (demo reset). Falling back to a generic greeting
 * when no nickname was entered is the caller's responsibility.
 */
const NICKNAME_KEY = 'tmm:nickname:v1';
const NICKNAME_MAX_LENGTH = 32;

/** Loads the session nickname, trimmed; null when unset / blank / unavailable. */
export function loadNickname(): string | null {
  try {
    const raw = sessionStorage.getItem(NICKNAME_KEY);
    const value = raw?.trim();
    return value ? value : null;
  } catch {
    // Storage unavailable (e.g. private mode) — treat as no nickname.
    return null;
  }
}

/** Persists the session nickname (trimmed, length-capped). */
export function saveNickname(name: string): void {
  try {
    sessionStorage.setItem(NICKNAME_KEY, name.trim().slice(0, NICKNAME_MAX_LENGTH));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** Whether a non-blank session nickname exists. */
export function hasNickname(): boolean {
  return loadNickname() !== null;
}

/** Removes the session nickname (demo reset). */
export function clearNickname(): void {
  try {
    sessionStorage.removeItem(NICKNAME_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}
