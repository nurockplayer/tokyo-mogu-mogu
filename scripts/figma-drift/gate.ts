import { resolve } from 'node:path';
import { runGate } from './run-gate';
import { DEFAULT_STATE_PATH } from './state';

/**
 * `pnpm figma:gate` CLI (Issue #233, optional) — surfaces the overlap between
 * Figma-changed surfaces and the surfaces whose code changed in the current
 * branch/PR diff.
 *
 * Exit codes:
 *   0 = no overlap (informational only)
 *   1 = overlap found — the reviewer must re-check live Figma before merge
 *   2 = operational failure (no token / no checkpoint / fetch or git failure)
 */

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function statePathFromArg(): string {
  const value = argument('--state');
  return value === undefined
    ? resolve(process.cwd(), DEFAULT_STATE_PATH)
    : resolve(process.cwd(), value);
}

async function main(): Promise<void> {
  const result = await runGate({
    statePath: statePathFromArg(),
    token: process.env.FIGMA_ACCESS_TOKEN ?? '',
    baseRef: argument('--base') ?? 'origin/main',
  });
  process.stdout.write(result.report);
  process.exit(result.exitCode);
}

void main();
