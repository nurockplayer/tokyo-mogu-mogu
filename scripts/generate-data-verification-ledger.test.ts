import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const scriptPath = fileURLToPath(
  new URL('./generate-data-verification-ledger.ts', import.meta.url),
);

function runCheck(outputPath?: string) {
  return spawnSync(
    process.execPath,
    ['--import', 'tsx', scriptPath, '--check', ...(outputPath ? ['--output', outputPath] : [])],
    { cwd: repositoryRoot, encoding: 'utf8' },
  );
}

describe('data verification ledger command (#333)', () => {
  it('--check fails on a stale artifact without rewriting it', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tmm-ledger-'));
    const outputPath = join(directory, 'ledger.md');
    writeFileSync(outputPath, 'stale fixture\n', 'utf8');

    try {
      const result = runCheck(outputPath);

      expect(result.status).toBe(1);
      expect(result.stderr).toContain('Data Verification Ledger is stale');
      expect(readFileSync(outputPath, 'utf8')).toBe('stale fixture\n');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('--check passes for the committed generated ledger', () => {
    const result = runCheck();

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Data Verification Ledger is current');
  });
});
