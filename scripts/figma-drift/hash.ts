import { createHash } from 'node:crypto';

/**
 * Deterministic hashing / canonicalization (Issue #233).
 *
 * Figma REST responses are plain JSON; object key order is not guaranteed to
 * be stable across calls, so we canonicalize (recursively sort object keys)
 * before hashing. Arrays keep their order because child order IS layout order.
 */

/** Recursively sort object keys so equal data hashes identically regardless of field order. */
export function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(record).sort()) {
      out[key] = canonicalize(record[key]);
    }
    return out;
  }
  return value;
}

/** Deterministic canonical JSON serialization of any value. */
export function canonicalStringify(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

/** Best-effort human node name extraction from a `/nodes` response entry. */
export function extractNodeName(entry: unknown): string | null {
  if (entry === null || typeof entry !== 'object') {
    return null;
  }
  const record = entry as { name?: unknown; document?: unknown };
  if (typeof record.name === 'string') {
    return record.name;
  }
  const document = record.document;
  if (document !== null && typeof document === 'object') {
    const docName = (document as { name?: unknown }).name;
    if (typeof docName === 'string') {
      return docName;
    }
  }
  return null;
}

/**
 * Deterministic fingerprint for a watched Figma node.
 *
 * Input is one entry from the Figma `/v1/files/:key/nodes` response. We hash
 * only the node's own `name` + `document` subtree; the file-global
 * `components` / `componentSets` / `styles` / `themes` keys on the entry are
 * intentionally excluded so an unrelated change elsewhere in the file does not
 * perturb this node's fingerprint.
 */
export function hashNode(entry: unknown): string {
  const record = (entry ?? null) as { name?: unknown; document?: unknown } | null;
  const document = record?.document ?? record;
  const name = extractNodeName(entry) ?? '';
  const payload = canonicalStringify({ name, document });
  return createHash('sha256').update(payload).digest('hex');
}
