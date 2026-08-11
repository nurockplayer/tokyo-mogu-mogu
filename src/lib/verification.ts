/**
 * Verification / freshness helpers for the provenance contract (Issue #129).
 *
 * These pure functions give the app a single, deterministic way to answer the
 * two questions every consumer of practical data must ask:
 *
 *  1. `deriveVerificationStatus` / `recordVerificationStatus` — what degree of
 *     stakeholder confirmation stands behind a source or a whole record.
 *  2. `isStale` — whether the source document has moved on since the facts were
 *     last confirmed, so they should be treated as unverified rather than
 *     claimed as current.
 *
 * The rule used everywhere in this module: **absence of evidence is not
 * evidence of verified**. Missing / unspecified status always degrades to a
 * safe `needs_confirmation`-style state, never to `verified`.
 *
 * This module deliberately lives outside the data files so seed authors add
 * explicit status where they know it and the app derives a safe default
 * everywhere else.
 */
import type { DataSource, VerificationStatus } from '../data/model';

/**
 * The date the confirmation behind a source was last established: `confirmedAt`
 * when a stakeholder confirmed it, otherwise the retrieval / last-verified date
 * (`retrievedAt` / `lastVerified`) that represents when the facts were checked.
 */
export function confirmationDate(source: DataSource): string | undefined {
  return source.confirmedAt ?? source.retrievedAt ?? source.lastVerified;
}

/**
 * True when the confirmation behind a source is older than the source document
 * itself, i.e. the source may have moved on since we last checked. The date
 * comparison is string-based (ISO 8601 `YYYY-MM-DD` sorts lexicographically),
 * mirroring how the rest of the codebase compares dates.
 *
 * Only sources that have both dates and a non-demo origin can be stale — a demo
 * fixture is labelled demo, not stale. A missing confirmation date is not
 * "stale" here; it falls through to the needs_confirmation default.
 *
 * This is a document-freshness rule, not an elapsed-time rule: use
 * `isConfirmationOlderThan` when the intent is "no re-check within N days".
 */
export function isStale(source: DataSource): boolean {
  if (source.verificationStatus === 'demo' || source.sourceType === 'demo') {
    return false;
  }
  const confirmed = confirmationDate(source);
  const updated = source.sourceUpdatedAt;
  if (confirmed === undefined || updated === undefined) {
    return false;
  }
  return updated > confirmed;
}

/**
 * True when the source has not been confirmed within the last `maxAgeDays`
 * days of `todayIso` — an elapsed-time staleness rule for consumers that want
 * to fail safe against silent drift rather than only against source updates.
 */
export function isConfirmationOlderThan(
  source: DataSource,
  todayIso: string,
  maxAgeDays: number,
): boolean {
  const confirmed = confirmationDate(source);
  if (confirmed === undefined) {
    return true;
  }
  const confirmedMs = Date.parse(confirmed);
  const todayMs = Date.parse(todayIso);
  if (Number.isNaN(confirmedMs) || Number.isNaN(todayMs)) {
    return true;
  }
  return todayMs - confirmedMs > maxAgeDays * 86_400_000;
}

/**
 * Derive a safe default verification status for a source (or an aggregate for
 * a whole record) when no explicit status is recorded.
 *
 * Order:
 * 1. A demo fixture (`origin: 'demo'` at the record level, or a `demo`
 *    sourceType) is NEVER presented as verified — `demo` wins even over an
 *    explicit status, so a mislabeled demo record can never leak out as a
 *    verified production fact (Issue #129).
 * 2. An explicit status wins.
 * 3. An updated source with no matching confirmation → `stale`.
 * 4. Anything else degrades to `needs_confirmation` — never to `verified`.
 */
export function deriveVerificationStatus(
  source: Pick<DataSource, 'verificationStatus' | 'sourceType' | 'sourceUpdatedAt' | 'retrievedAt' | 'lastVerified' | 'confirmedAt'>,
  origin: 'source' | 'editorial' | 'demo',
): VerificationStatus {
  if (origin === 'demo' || source.sourceType === 'demo') {
    return 'demo';
  }
  if (source.verificationStatus !== undefined) {
    return source.verificationStatus;
  }
  if (isStale(source as DataSource)) {
    return 'stale';
  }
  return 'needs_confirmation';
}

/** Aggregate the verification status across a record's sources (Issue #129). */
export function recordVerificationStatus(
  sources: ReadonlyArray<DataSource>,
  origin: 'source' | 'editorial' | 'demo',
): VerificationStatus {
  const statuses = sources.map((s) => deriveVerificationStatus(s, origin));

  // A demo fixture anywhere in the record means the record cannot be a verified
  // production fact, regardless of the other sources.
  if (origin === 'demo' || statuses.includes('demo')) {
    return 'demo';
  }
  if (statuses.includes('conflict')) {
    return 'conflict';
  }
  if (statuses.includes('stale')) {
    return 'stale';
  }
  if (statuses.includes('needs_confirmation')) {
    return 'needs_confirmation';
  }
  return 'verified';
}

/**
 * The `conflict` state keeps both evidence and resolution status (Issue #129).
 * A record is in conflict when its sources carry different truth values for the
 * same practical question (e.g. one source says "open", another says "closed").
 * This helper names the conflict explicitly instead of silently picking one
 * source — consumers decide how to present it.
 */
export function sourceConflictLabel(
  conflict: {
    status: 'conflict';
    facts: ReadonlyArray<{ value: string; source: string }>;
  },
): string {
  return conflict.facts.map((f) => `${f.source}: ${f.value}`).join(' / ');
}

/**
 * A machine-readable list of record fields that still need stakeholder
 * confirmation (Issue #129 AC: "a machine-readable list of needs_confirmation
 * fields can be generated for stakeholder review").
 *
 * Returns stable `{ recordType, recordId, field, source }` entries — one per
 * field per record — for every record whose verification is not `verified`
 * (including fully `demo` records, which are called out as demo so reviewers
 * can separate them). Records with no data need no confirmation rows.
 */
export interface UnverifiedFieldEntry {
  recordType: 'place' | 'foodCulture' | 'spot';
  recordId: string;
  field: string;
  source: string;
}

export function listUnverifiedFields(input: {
  places: ReadonlyArray<{
    id: string;
    origin: 'source' | 'editorial' | 'demo';
    source: DataSource;
  }>;
  foodCultures: ReadonlyArray<{
    id: string;
    origin: 'source' | 'editorial' | 'demo';
    sources: ReadonlyArray<DataSource>;
  }>;
  spots: ReadonlyArray<{
    placeId: string;
    origin: 'editorial';
    source: DataSource;
  }>;
}): UnverifiedFieldEntry[] {
  const entries: UnverifiedFieldEntry[] = [];

  for (const place of input.places) {
    const status = deriveVerificationStatus(place.source, place.origin);
    if (status === 'verified') {
      continue;
    }
    entries.push({
      recordType: 'place',
      recordId: place.id,
      field: 'basic',
      source: place.source.name,
    });
  }

  for (const fc of input.foodCultures) {
    const status = recordVerificationStatus(fc.sources, fc.origin);
    if (status === 'verified') {
      continue;
    }
    entries.push({
      recordType: 'foodCulture',
      recordId: fc.id,
      field: 'facts',
      source: fc.sources.map((s) => s.name).join(' / ') || 'unspecified',
    });
  }

  for (const spot of input.spots) {
    const status = deriveVerificationStatus(spot.source, spot.origin);
    if (status === 'verified') {
      continue;
    }
    entries.push({
      recordType: 'spot',
      recordId: spot.placeId,
      field: 'practical',
      source: spot.source.name,
    });
  }

  return entries;
}
