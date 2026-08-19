import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { codeChangedSurfaces, runGate } from './run-gate.ts';
import { fileMeta, makeFetch, makeState, nodeEntry } from './fixtures.ts';
import type { Checkpoint, SyncState } from './types.ts';

let tempRoots: string[] = [];

function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'tmm-figma-gate-'));
  tempRoots.push(dir);
  return dir;
}

afterEach(() => {
  for (const root of tempRoots) {
    rmSync(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

const CHECKPOINT: Checkpoint = {
  createdAt: '2026-08-18T00:00:00Z',
  fileName: 'KiKi Food App',
  fileVersion: 'v9948f714',
  fileLastModified: '2026-08-18T00:00:00Z',
};

/**
 * A checkpointed state where Landing (`1:95`) hashes to a value that does NOT
 * match live (so the gate sees it as changed), and Result (`23:3380`) matches
 * live (unchanged).
 */
function gateState(): SyncState {
  return makeState(
    [
      { id: '1:95', name: 'Landing', hash: 'a'.repeat(64) },
      { id: '23:3380', name: 'Result', hash: 'b'.repeat(64) },
    ],
    CHECKPOINT,
  );
}

const LIVE = {
  '1:95': nodeEntry('Landing'),
  '23:3380': nodeEntry('Result'),
};

function writeState(dir: string, state: SyncState): string {
  const path = join(dir, 'figma-sync-state.json');
  writeFileSync(path, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  return path;
}

describe('codeChangedSurfaces', () => {
  it('normalizes ./ prefixes and maps files to their surfaces', () => {
    const surfaces = codeChangedSurfaces([
      './src/pages/s0s3/LandingPage.tsx',
      'src/i18n/resources.ts',
    ]);
    const bySurface = new Map(surfaces.map((s) => [s.surface, s.codeFiles]));
    expect(bySurface.get('Landing')).toContain('src/pages/s0s3/LandingPage.tsx');
    expect(bySurface.has('Sticky story CTA')).toBe(true); // via resources.ts
  });

  it('ignores non-watched surfaces (cross-cutting deviations)', () => {
    // src/ui/tokens.css belongs only to the "Body font" non-watched deviation.
    expect(codeChangedSurfaces(['src/ui/tokens.css'])).toEqual([]);
  });

  it('ignores files that map to no surface', () => {
    expect(codeChangedSurfaces(['src/main.tsx', 'README.md'])).toEqual([]);
  });
});

describe('runGate', () => {
  it('exits 2 without a token', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, gateState());
    const result = await runGate({ statePath, token: '' });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('FIGMA_ACCESS_TOKEN');
  });

  it('exits 2 without a checkpoint', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, makeState([
      { id: '1:95', name: 'Landing', hash: null },
    ]));
    const result = await runGate({ statePath, token: 'fake' });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('no checkpoint yet');
  });

  it('exits 2 on an invalid baseRef (command-injection guard)', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, gateState());
    const result = await runGate({
      statePath,
      token: 'fake',
      baseRef: 'origin/main; rm -rf /',
      fetchImpl: makeFetch(fileMeta(), LIVE),
      exec: () => '',
    });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('invalid baseRef');
  });

  it('exits 2 when the git diff cannot be read', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, gateState());
    const result = await runGate({
      statePath,
      token: 'fake',
      baseRef: 'origin/main',
      fetchImpl: makeFetch(fileMeta(), LIVE),
      exec: () => {
        throw new Error('not a git repository');
      },
    });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('git diff');
  });

  it('exits 0 when there is no Figma↔code overlap (informational)', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, gateState());
    const result = await runGate({
      statePath,
      token: 'fake',
      baseRef: 'origin/main',
      fetchImpl: makeFetch(fileMeta(), LIVE),
      exec: () => 'src/main.tsx\nREADME.md\n',
    });
    expect(result.exitCode).toBe(0);
    expect(result.report).toContain('Overlap: none');
    expect(result.report).toContain('Landing');
  });

  it('exits 1 and flags the reviewer when Figma-changed and code-changed overlap', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, gateState());
    const result = await runGate({
      statePath,
      token: 'fake',
      baseRef: 'origin/main',
      fetchImpl: makeFetch(fileMeta(), LIVE), // Landing is changed vs the checkpoint
      exec: () => 'src/pages/s0s3/LandingPage.tsx\n',
    });
    expect(result.exitCode).toBe(1);
    expect(result.report).toContain('Overlap');
    expect(result.report).toContain('Landing');
    expect(result.report).toContain('re-check live Figma before merge');
  });

  it('exits 2 on a Figma operational failure', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, gateState());
    const result = await runGate({
      statePath,
      token: 'bad',
      baseRef: 'origin/main',
      fetchImpl: async () => ({
        ok: false,
        status: 429,
        statusText: 'Rate Limited',
        json: async () => ({}),
      }),
    });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('429');
  });
});
