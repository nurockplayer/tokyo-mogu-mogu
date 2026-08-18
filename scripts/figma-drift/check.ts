import { resolve } from 'node:path';
import { runCheck } from './run-check';
import { DEFAULT_STATE_PATH } from './state';

/**
 * `pnpm figma:check` CLI (Issue #233) — strictly read-only drift report.
 *
 * Exit codes:
 *   0 = no drift
 *   1 = at least one watched surface changed / new / missing
 *   2 = operational failure (auth / network / schema / missing token /
 *       missing checkpoint)
 *
 * Never writes `figma-sync-state.json`. When there is no checkpoint yet it
 * reports that clearly and does NOT auto-create a baseline.
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
  const result = await runCheck({
    statePath: statePathFromArg(),
    token: process.env.FIGMA_ACCESS_TOKEN ?? '',
  });
  process.stdout.write(result.report);
  process.exit(result.exitCode);
}

void main();
