import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const script = fileURLToPath(new URL('./generate-data-verification-ledger.ts', import.meta.url));

function run(...args: string[]) {
  return spawnSync(process.execPath, ['--import', 'tsx', script, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

describe('data verification ledger repository command (#333)', () => {
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
