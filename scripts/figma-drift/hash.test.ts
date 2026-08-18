import { describe, expect, it } from 'vitest';
import {
  canonicalStringify,
  canonicalize,
  extractNodeName,
  hashNode,
} from './hash.ts';
import { nodeEntry, nodeEntryVariant } from './fixtures.ts';

describe('canonicalization', () => {
  it('hashes equal data identically regardless of object key order', () => {
    const a = canonicalStringify({ b: 1, a: { d: 2, c: 3 }, list: [1, 2, 3] });
    const b = canonicalStringify({ list: [1, 2, 3], a: { c: 3, d: 2 }, b: 1 });
    expect(a).toBe(b);
    expect(a).toContain('"list":[1,2,3]');
  });

  it('recursively sorts nested objects', () => {
    const out = canonicalize({ z: { y: 1, x: 2 }, a: 0 });
    expect(Object.keys(out as Record<string, unknown>)).toEqual(['a', 'z']);
    expect(Object.keys((out as { z: Record<string, unknown> }).z)).toEqual(['x', 'y']);
  });

  it('preserves array order (child order is layout order)', () => {
    const a = canonicalStringify({ children: ['first', 'second'] });
    const b = canonicalStringify({ children: ['second', 'first'] });
    expect(a).not.toBe(b);
  });
});

describe('hashNode', () => {
  it('is deterministic for identical entries', () => {
    const entry = nodeEntry('Landing');
    expect(hashNode(entry)).toBe(hashNode(nodeEntry('Landing')));
    expect(hashNode(entry)).toMatch(/^[0-9a-f]{64}$/);
  });

  it('changes when the node content changes', () => {
    expect(hashNode(nodeEntry('Landing'))).not.toBe(
      hashNode(nodeEntryVariant('Landing')),
    );
  });

  it('changes when the node name changes', () => {
    expect(hashNode(nodeEntry('Landing'))).not.toBe(hashNode(nodeEntry('Landing v2')));
  });

  it('ignores file-global components/styles so unrelated edits do not perturb the hash', () => {
    const base = nodeEntry('Landing');
    const withExtraGlobal = {
      ...base,
      components: { ...(base.components as object), '999:1': { key: 'y', name: 'NewButton' } },
      styles: { 'new-style': { key: 's', name: 'accent' } },
    };
    expect(hashNode(base)).toBe(hashNode(withExtraGlobal));
  });

  it('produces different hashes for different nodes', () => {
    expect(hashNode(nodeEntry('Landing'))).not.toBe(hashNode(nodeEntry('Result')));
  });
});

describe('extractNodeName', () => {
  it('prefers the top-level entry name', () => {
    expect(extractNodeName(nodeEntry('Landing'))).toBe('Landing');
  });

  it('falls back to the document name', () => {
    expect(
      extractNodeName({ document: { id: 'root', name: 'Result', type: 'FRAME' } }),
    ).toBe('Result');
  });

  it('returns null when no name is present', () => {
    expect(extractNodeName(null)).toBeNull();
    expect(extractNodeName({})).toBeNull();
    expect(extractNodeName('scalar')).toBeNull();
  });
});
