import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { IMPLEMENTATION_MAP, lookupMapEntry, watchedMapEntries } from './map.ts';
import { parseState } from './state.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = resolve(HERE, '../../docs/design/figma-sync-state.json');
const MAP_DOC = resolve(HERE, '../../docs/design/figma-implementation-map.md');

const stateFileText = readFileSync(STATE_FILE, 'utf8');
const mapDocText = readFileSync(MAP_DOC, 'utf8');

describe('lookupMapEntry', () => {
  it('finds a watched surface by node id', () => {
    const entry = lookupMapEntry('1:95');
    expect(entry?.surface).toBe('Landing');
    expect(entry?.watched).toBe(true);
    expect(entry?.issues).toContain('#201');
  });

  it('returns null for an unknown node id', () => {
    expect(lookupMapEntry('999:999')).toBeNull();
  });

  it('records the Story transition as a presentation-only adaptation', () => {
    const entry = lookupMapEntry('119:254');
    expect(entry?.surface).toBe('Story route transition presentation reference');
    expect(entry?.status).toBe('INTENTIONALLY_DIFFERENT');
    expect(entry?.note).toContain('PRESENTATION_ONLY');
    expect(watchedMapEntries().some((surface) => surface.status === 'UNRESOLVED')).toBe(false);
  });
});

describe('watchedMapEntries', () => {
  it('exposes exactly the 41 current watched surfaces with node ids', () => {
    const watched = watchedMapEntries();
    expect(watched).toHaveLength(41);
    for (const entry of watched) {
      expect(entry.nodeId).not.toBeNull();
      expect(entry.watched).toBe(true);
    }
  });

  it('keeps cross-cutting deviations out of the watchlist', () => {
    const crossCutting = IMPLEMENTATION_MAP.filter((e) => e.nodeId === null);
    expect(crossCutting.length).toBeGreaterThan(0);
    for (const entry of crossCutting) {
      expect(entry.watched).toBe(false);
    }
  });
});

describe('map ↔ state file consistency', () => {
  it('the state file is valid per the tool schema', () => {
    const state = parseState(stateFileText, STATE_FILE);
    expect(state.fileKey).toBe('fHqhA3d26OdXqm0cQxfK31');
    expect(state.checkpoint).toBeNull(); // initial checkpoint intentionally not created (#233)
  });

  it('the state-file watchlist node-id set equals the map watched node-id set', () => {
    const state = parseState(stateFileText, STATE_FILE);
    const stateIds = new Set(state.watchedNodes.map((n) => n.id));
    const mapIds = new Set(watchedMapEntries().map((e) => e.nodeId as string));
    expect(stateIds).toEqual(mapIds);
  });

  it('state-file node names match the map surface names', () => {
    const state = parseState(stateFileText, STATE_FILE);
    for (const node of state.watchedNodes) {
      expect(lookupMapEntry(node.id)?.surface).toBe(node.name);
    }
  });

  it('every watched node id appears in the markdown mirror', () => {
    const state = parseState(stateFileText, STATE_FILE);
    for (const node of state.watchedNodes) {
      expect(mapDocText).toContain(`\`${node.id}\``);
    }
  });
});
