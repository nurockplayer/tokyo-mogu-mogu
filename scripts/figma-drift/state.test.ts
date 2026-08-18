import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { loadState, parseState, writeStateAtomic } from './state.ts';
import { OperationalError } from './types.ts';
import { makeState, TWO_NODE_WATCH } from './fixtures.ts';

let tempRoots: string[] = [];

function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'tmm-figma-drift-'));
  tempRoots.push(dir);
  return dir;
}

afterEach(() => {
  for (const root of tempRoots) {
    rmSync(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

function writeTempState(dir: string, state: unknown, name = 'state.json'): string {
  const path = join(dir, name);
  writeFileSync(path, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  return path;
}

describe('parseState', () => {
  it('accepts the bootstrap state (checkpoint null, hash null)', () => {
    const state = makeState(TWO_NODE_WATCH);
    const parsed = parseState(JSON.stringify(state), 'test');
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.checkpoint).toBeNull();
    expect(parsed.watchedNodes[0].hash).toBeNull();
  });

  it('accepts a checkpointed state', () => {
    const state = makeState(
      [{ id: '1:95', name: 'Landing', hash: 'a'.repeat(64) }],
      {
        createdAt: '2026-08-18T00:00:00Z',
        fileName: 'KiKi Food App',
        fileVersion: 'v1',
        fileLastModified: '2026-08-18T00:00:00Z',
      },
    );
    expect(parseState(JSON.stringify(state), 'test').checkpoint).not.toBeNull();
  });

  it('rejects non-JSON as schema-incomplete', () => {
    expect(() => parseState('not json {', 'test')).toThrowError(OperationalError);
    expect(() => parseState('not json {', 'test')).toThrowError(/not valid JSON/);
  });

  it('rejects a schemaVersion mismatch', () => {
    const state = makeState(TWO_NODE_WATCH, {
      createdAt: 'x',
      fileName: 'x',
      fileVersion: 'x',
      fileLastModified: 'x',
    });
    expect(() =>
      parseState(JSON.stringify({ ...state, schemaVersion: 2 }), 'test'),
    ).toThrowError(/schemaVersion mismatch/);
  });

  it('rejects a missing fileKey', () => {
    const state = makeState(TWO_NODE_WATCH) as unknown as Record<string, unknown>;
    delete state.fileKey;
    expect(() => parseState(JSON.stringify(state), 'test')).toThrowError(
      /missing fileKey/,
    );
  });

  it('rejects a malformed watchedNodes entry', () => {
    const state = makeState(TWO_NODE_WATCH);
    (state.watchedNodes[0] as { hash: unknown }).hash = 12345;
    expect(() => parseState(JSON.stringify(state), 'test')).toThrowError(
      /watchedNodes entry malformed/,
    );
  });

  it('rejects a checkpoint that is neither null nor an object', () => {
    const state = makeState(
      TWO_NODE_WATCH,
      'not-an-object' as never,
    ) as unknown as Record<string, unknown>;
    expect(() => parseState(JSON.stringify(state), 'test')).toThrowError(
      /checkpoint must be null or an object/,
    );
  });
});

describe('loadState', () => {
  it('loads a valid state file', () => {
    const dir = tempDir();
    const path = writeTempState(dir, makeState(TWO_NODE_WATCH));
    const state = loadState(path);
    expect(state.watchedNodes).toHaveLength(2);
  });

  it('throws state-file-missing for a missing file', () => {
    expect(() => loadState(join(tempDir(), 'nope.json'))).toThrowError(
      /state file not found/,
    );
  });
});

describe('writeStateAtomic', () => {
  it('writes valid JSON and leaves no temp file behind', () => {
    const dir = tempDir();
    const path = join(dir, 'figma-sync-state.json');
    const state = makeState(TWO_NODE_WATCH, {
      createdAt: '2026-08-18T00:00:00Z',
      fileName: 'KiKi Food App',
      fileVersion: 'v1',
      fileLastModified: '2026-08-18T00:00:00Z',
    });
    writeStateAtomic(path, state);
    expect(JSON.parse(readFileSync(path, 'utf8'))).toEqual(state);
    expect(readdirSync(dir)).toEqual(['figma-sync-state.json']);
  });

  it('overwrites the previous checkpoint atomically', () => {
    const dir = tempDir();
    const path = join(dir, 'figma-sync-state.json');
    writeStateAtomic(path, makeState(TWO_NODE_WATCH, null));
    writeStateAtomic(path, makeState(TWO_NODE_WATCH, {
      createdAt: '2026-08-19T00:00:00Z',
      fileName: 'KiKi Food App',
      fileVersion: 'v2',
      fileLastModified: '2026-08-19T00:00:00Z',
    }));
    const state = loadState(path);
    expect(state.checkpoint?.fileVersion).toBe('v2');
  });

  it('throws state-write-failed when the target is unwritable and cleans up temp', () => {
    const dir = tempDir();
    const blocker = join(dir, 'blocked');
    writeFileSync(blocker, 'i am a file, not a directory', 'utf8');
    const path = join(blocker, 'figma-sync-state.json'); // parent is a regular file
    expect(() => writeStateAtomic(path, makeState(TWO_NODE_WATCH))).toThrowError(
      OperationalError,
    );
    expect(readdirSync(dir)).toEqual(['blocked']);
  });
});
