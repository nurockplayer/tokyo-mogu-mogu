import type { RawEnv } from './env';

/**
 * Environment variables that MUST be present for the app to start.
 *
 * Deliberately empty today: every variable has a safe default (or is optional
 * for the local demo), so a fresh developer setup works without any env file.
 * Add a key here when a feature hard-requires a variable — the app will then
 * refuse to start with a clear message until it is provided.
 */
export const requiredEnv: string[] = [];

/**
 * Returns the subset of `requiredKeys` that are missing (undefined or empty
 * string). Pure — safe to call with a stub env in tests.
 */
export function checkMissingEnv(env: RawEnv, requiredKeys: string[] = requiredEnv): string[] {
  return requiredKeys.filter((key) => !env[key]);
}

/**
 * Pure validation against a raw env map. Throws a clear, actionable error when
 * any required variable is missing. Safe for tests: pass a stub env.
 */
export function validateConfigImpl(env: RawEnv, requiredKeys: string[] = requiredEnv): void {
  const missing = checkMissingEnv(env, requiredKeys);
  if (missing.length === 0) return;
  throw new Error(
    `Missing required environment variable(s): ${missing.join(', ')}.\n` +
      `Copy .env.example to .env and fill in the missing values before starting.\n` +
      `Boundary: any VITE_-prefixed value is bundled and visible to clients; ` +
      `server-only secrets must NOT use the VITE_ prefix and must never be ` +
      `imported in client code.`,
  );
}

/**
 * Validates the live `import.meta.env` at startup. Called from the module init
 * of `src/config/index.ts` so a missing required variable fails the app fast
 * with a clear reason instead of silently running misconfigured.
 */
export function validateConfig(): void {
  validateConfigImpl(import.meta.env as RawEnv);
}
