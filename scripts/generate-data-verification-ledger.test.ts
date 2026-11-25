import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, vi } from 'vitest';
import { parseArguments, writeLedger } from './generate-data-verification-ledger';

const root = fileURLToPath(new URL('..', import.meta.url));
const script = fileURLToPath(new URL('./generate-data-verification-ledger.ts', import.meta.url));

function run(...args: string[]) {
  return spawnSync(process.execPath, ['--import', 'tsx', script, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

describe('data verification ledger repository command (#333)', () => {
  it('validates output arguments and writes or checks without rewriting', () => {
    expect(() => parseArguments([])).toThrow('--output <path>');
    expect(() => parseArguments(['--output'])).toThrow('--output requires a path');
    expect(() => parseArguments(['--unknown'])).toThrow('Unknown argument');
    const directory = mkdtempSync(join(tmpdir(), 'tmm-ledger-'));
    const output = join(directory, 'data-verification-ledger.md');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      writeLedger({ check: false, output }, 'rendered ledger\n');
      expect(readFileSync(output, 'utf8')).toBe('rendered ledger\n');
      writeLedger({ check: true, output }, 'rendered ledger\n');
      expect(readFileSync(output, 'utf8')).toBe('rendered ledger\n');
      expect(log).toHaveBeenCalledTimes(2);
    } finally {
      log.mockRestore();
    }
  });

  it('reports a stale explicit output without rewriting it', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tmm-ledger-'));
    const output = join(directory, 'data-verification-ledger.md');
    writeFileSync(output, 'stale ledger\n', 'utf8');
    const stale = run('--check', '--output', output);
    expect(stale.status).not.toBe(0);
    expect(stale.stderr).toContain('stale');
    expect(readFileSync(output, 'utf8')).toBe('stale ledger\n');
  }, 20_000);
});
