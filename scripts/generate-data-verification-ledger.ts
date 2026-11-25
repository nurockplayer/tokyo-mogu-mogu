import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateRepositoryDataVerificationLedger } from '../src/lib/data-verification-ledger-generator';

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url));

function parseArguments(argv: readonly string[]): { check: boolean; output: string } {
  let check = false;
  let output: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--check') {
      check = true;
      continue;
    }
    if (argument === '--output') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error('--output requires a path.');
      output = resolve(repositoryRoot, value);
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  if (!output) throw new Error('Usage: pnpm data:verification-ledger [--check] --output <path>');
  return { check, output };
}

function main() {
  const { check, output } = parseArguments(process.argv.slice(2));
  const rendered = generateRepositoryDataVerificationLedger();

  if (check) {
    let existing: string;
    try {
      existing = readFileSync(output, 'utf8');
    } catch {
      console.error(`Data verification ledger is stale or missing: ${output}`);
      process.exitCode = 1;
      return;
    }
    if (existing !== rendered) {
      console.error(`Data verification ledger is stale: ${output}`);
      process.exitCode = 1;
      return;
    }
    console.log(`Data verification ledger is current: ${output}`);
    return;
  }

  writeFileSync(output, rendered, 'utf8');
  console.log(`Wrote data verification ledger: ${output}`);
}

main();
