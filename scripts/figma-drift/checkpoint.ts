import { createInterface } from 'node:readline';
import { resolve } from 'node:path';
import { runCheckpoint } from './run-checkpoint';
import { DEFAULT_STATE_PATH } from './state';

/**
 * `pnpm figma:checkpoint` CLI (Issue #233) — the ONLY normal baseline-write
 * path. Re-fetches live Figma, shows a proposed change summary, asks for
 * confirmation, then writes `figma-sync-state.json` atomically.
 *
 * Use `--yes` to skip the interactive prompt in a scripted / team context.
 * A malformed / partial API response refuses the write and never overwrites
 * the last good checkpoint.
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

function promptBoolean(message: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  return new Promise((resolvePromise) => {
    rl.question(`${message}\nWrite the checkpoint? [y/N] `, (answer) => {
      rl.close();
      resolvePromise(answer.trim().toLowerCase() === 'y');
    });
  });
}

async function main(): Promise<void> {
  const yes = process.argv.includes('--yes');
  const result = await runCheckpoint({
    statePath: statePathFromArg(),
    token: process.env.FIGMA_ACCESS_TOKEN ?? '',
    confirm: yes ? async () => true : promptBoolean,
  });
  process.stdout.write(result.report);
  process.exit(result.exitCode);
}

void main();
