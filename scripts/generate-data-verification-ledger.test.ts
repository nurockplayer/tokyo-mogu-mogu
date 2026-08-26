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
  it('generates deterministic bytes and --check detects drift without rewriting', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tmm-ledger-'));
    const output = join(directory, 'data-verification-ledger.md');

    const generated = run('--output', output);
    expect(generated.status, generated.stderr).toBe(0);
    const first = readFileSync(output, 'utf8');
    expect(first).toContain('# Data Verification Ledger');

    const regenerated = run('--output', output);
    expect(regenerated.status, regenerated.stderr).toBe(0);
    expect(readFileSync(output, 'utf8')).toBe(first);

    const checked = run('--check', '--output', output);
    expect(checked.status, checked.stderr).toBe(0);
    expect(readFileSync(output, 'utf8')).toBe(first);

    writeFileSync(output, 'stale ledger\n', 'utf8');
    const stale = run('--check', '--output', output);
    expect(stale.status).not.toBe(0);
    expect(stale.stderr).toContain('stale');
    expect(readFileSync(output, 'utf8')).toBe('stale ledger\n');
  });

  it('exposes the default repository regeneration command', () => {
    const pkg = JSON.parse(
      readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
    ) as { scripts: Record<string, string> };

    expect(pkg.scripts['data:verification-ledger']).toBe(
      'tsx scripts/generate-data-verification-ledger.ts',
    );
  });
});
