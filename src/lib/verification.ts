/**
 * Verification / freshness helpers for the provenance contract (Issue #129).
 *
 * These pure functions give the app a single, deterministic way to answer the
 * two questions every consumer of practical data must ask:
 *
 *  1. `deriveVerificationStatus` / `recordVerificationStatus` — what degree of
 *     stakeholder confirmation stands behind a source or a whole record.
 *  2. `isStale` — whether the source document has moved on since the facts were
 *     last observed, so they should be treated as unverified rather than
 *     claimed as current.
 *
 * SEMANTICS — the three timestamps are deliberately kept separate (Issue #129):
 *
 * - `confirmedAt`  — actual stakeholder / team confirmation ONLY. Retrieval or
 *   cross-referencing a source is NOT confirmation. Missing `confirmedAt` means
 *   the record is unconfirmed.
 * - `retrievedAt`  — when the data was retrieved / observed, nothing more.
 * - `lastVerified` — legacy field kept as-is. It is a retrieval / check
 *   timestamp from before #129; it must never silently become stakeholder
 *   confirmation.
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
 * The stakeholder confirmation date behind a source. `confirmedAt` only:
 * a source that was retrieved or cross-referenced but never confirmed has no
 * confirmation date. Never falls back to `retrievedAt` / `lastVerified`,
 * because retrieval is not confirmation.
 */
export function confirmationDate(source: DataSource): string | undefined {
  return source.confirmedAt;
}

/**
 * True when the source document has moved on since the facts were last
 * observed: `sourceUpdatedAt` (the source document's own last-updated date) is
 * newer than the observation/retrieval timestamp (`retrievedAt`, falling back
 * to the legacy `lastVerified`). The date comparison is string-based (ISO 8601
 * `YYYY-MM-DD` sorts lexicographically), mirroring how the rest of the codebase
 * compares dates.
 *
 * This is a document-freshness rule and is deliberately NOT called
 * "confirmation": an updated source document means "the facts may have drifted
 * since we looked", never "a stakeholder confirmed the newer state". A missing
 * observation date or an updated-but-unobserved source is not "stale" here; it
 * falls through to the needs_confirmation default.
 */
export function isSourceDocumentStale(source: DataSource): boolean {
  const updated = source.sourceUpdatedAt;
  const observed = source.retrievedAt ?? source.lastVerified;
  if (updated === undefined || observed === undefined) {
    return false;
  }
  return updated > observed;
}

/**
 * True when the source has not been stakeholder-confirmed within the last
 * `maxAgeDays` days of `todayIso` — an elapsed-time rule. Uses `confirmedAt`
 * ONLY; a source with no `confirmedAt` is treated as never confirmed (returns
 * true regardless of how recently it was retrieved). Retrieval must never be
 * counted as stakeholder confirmation (Issue #129).
 */
export function isConfirmationOlderThan(
  source: DataSource,
  todayIso: string,
  maxAgeDays: number,
): boolean {
  const confirmed = source.confirmedAt;
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
 * 2. An explicit `verified` status requires stakeholder confirmation
 *    (`confirmedAt`) — a `verified` source with no `confirmedAt` degrades to
 *    `needs_confirmation` (official_web + retrieval is not confirmation).
 * 3. An explicit non-verified status wins.
 * 4. An updated source document with an older observation → `stale`.
 * 5. Anything else degrades to `needs_confirmation` — never to `verified`.
 */
export function deriveVerificationStatus(
  source: Pick<DataSource, 'verificationStatus' | 'sourceType' | 'sourceUpdatedAt' | 'retrievedAt' | 'lastVerified' | 'confirmedAt'>,
  origin: 'source' | 'editorial' | 'demo',
): VerificationStatus {
  if (origin === 'demo' || source.sourceType === 'demo') {
    return 'demo';
  }
  if (source.verificationStatus === 'verified') {
    // A record cannot be verified on the strength of retrieval / source
    // existence alone — it needs stakeholder confirmation (Issue #129).
    if (source.confirmedAt === undefined) {
      return 'needs_confirmation';
    }
    // Freshness beats an explicit verified status: once the source document
    // moved after the confirmation, the previously-verified facts may have
    // drifted and must be treated as stale rather than current.
    if (source.sourceUpdatedAt !== undefined && source.sourceUpdatedAt > source.confirmedAt) {
      return 'stale';
    }
    return 'verified';
  }
  if (source.verificationStatus !== undefined) {
    return source.verificationStatus;
  }
  if (isSourceDocumentStale(source as DataSource)) {
    return 'stale';
  }
  return 'needs_confirmation';
}

/** Aggregate the verification status across a record's sources (Issue #129). */
export function recordVerificationStatus(
  sources: ReadonlyArray<DataSource>,
  origin: 'source' | 'editorial' | 'demo',
): VerificationStatus {
  // A record with no sources has no evidence behind it — it cannot be verified
  // ("absence of evidence is not evidence of verified").
  if (sources.length === 0) {
    return origin === 'demo' ? 'demo' : 'needs_confirmation';
  }
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
 * A concrete review field for the machine-readable needs_confirmation list
 * (Issue #129 AC). The field identifiers below mirror the canonical data shape
 * (model.ts, seed-places.ts, seed-routes.ts) so #133 can act on the exact field
 * that needs stakeholder confirmation instead of a category bucket.
 */
export type ReviewField =
  | 'address'
  | 'coordinates'
  | 'hours'
  | 'closedDays'
  | 'price'
  | 'reservation'
  | 'bookingDestination'
  | 'multilingualSupport'
  | 'dietaryAllergy'
  | 'accessibility'
  | 'storyWording'
  | 'makerWording'
  | 'photoReusePermission'
  | 'facts';

/**
 * A machine-readable list of concrete record fields that still need stakeholder
 * review. One entry per field per record (deduplicated). Each entry carries the
 * record's derived verification status so #133 can route needs_confirmation /
 * stale / conflict / demo separately instead of collapsing them.
 *
 * For a record that is NOT verified, the queued fields cover BOTH:
 * - populated source-backed values that are unverified (e.g. a `hoursJa` the
 *   app currently displays), and
 * - fields that are absent / unknown (so reviewers know what is missing).
 *
 * No values are invented: a field is only emitted when it exists in the
 * canonical shape (or is structurally absent from it).
 */
export interface UnverifiedFieldEntry {
  recordType: 'place' | 'foodCulture' | 'spot';
  recordId: string;
  field: ReviewField;
  /** Derived status; keeps needs_confirmation / stale / conflict / demo distinct. */
  status: VerificationStatus;
  source: string;
}

/**
 * Concrete fields reviewed at the place level, derived from the canonical
 * `Place` shape: address, coordinates. `coordinates` is flagged as needs
 * confirmation for demo-origin places (approximate coords); for a non-demo
 * place the address is the field the app displays and therefore also needs
 * confirmation when the place is unverified.
 */
export function placeReviewFields(place: {
  origin: 'source' | 'editorial' | 'demo';
  address: string;
  latitude: number;
  longitude: number;
}): ReviewField[] {
  if (place.origin === 'demo') {
    return ['coordinates'];
  }
  return ['address'];
}

/**
 * Concrete fields reviewed for a spot, derived from the canonical
 * `SpotPracticalInfo` / `SpotTags` shape. Every source-backed field the app may
 * display is queued for review when the record is unverified — populated values
 * (hours/closedDays/price/reservation present in the data) are listed exactly
 * like absent ones, because their single spot source does not make them
 * verified (Issue #129). Absent fields are listed honestly as "needs review";
 * nothing is invented.
 */
export function spotReviewFields(detail: {
  practical?: {
    hoursJa?: string;
    hoursEn?: string;
    closedDaysJa?: string;
    closedDaysEn?: string;
    priceJa?: string;
    priceEn?: string;
    reservationAvailable?: boolean;
  };
  tags: {
    language?: Array<'ja' | 'en'>;
    vegetarian?: boolean;
    allergyNotice?: boolean;
    accessibility?: boolean;
  };
}): ReviewField[] {
  const fields: ReviewField[] = [];
  const t = detail.tags;

  // Every source-backed practical field the UI may display is queued for
  // review: this helper only runs for unverified spots, so populated values
  // (hours / closedDays / price / reservation) and absent ones both need
  // stakeholder confirmation. `reservationAvailable: true` is a populated
  // claim from the same unverified source and is queued like the rest.
  fields.push('hours', 'closedDays', 'price', 'reservation', 'bookingDestination');

  if (t.language === undefined || t.language.length === 0) fields.push('multilingualSupport');
  if (t.vegetarian !== true && t.allergyNotice !== true) fields.push('dietaryAllergy');
  if (t.accessibility !== true) fields.push('accessibility');
  fields.push('storyWording', 'makerWording', 'photoReusePermission');
  return fields;
}

export function listUnverifiedFields(input: {
  places: ReadonlyArray<{
    id: string;
    origin: 'source' | 'editorial' | 'demo';
    address: string;
    latitude: number;
    longitude: number;
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
    practical?: {
      hoursJa?: string;
      hoursEn?: string;
      closedDaysJa?: string;
      closedDaysEn?: string;
      priceJa?: string;
      priceEn?: string;
      reservationAvailable?: boolean;
    };
    tags: {
      language?: Array<'ja' | 'en'>;
      vegetarian?: boolean;
      allergyNotice?: boolean;
      accessibility?: boolean;
    };
    source: DataSource;
  }>;
}): UnverifiedFieldEntry[] {
  const entries: UnverifiedFieldEntry[] = [];
  const seen = new Set<string>();

  const add = (recordType: UnverifiedFieldEntry['recordType'], recordId: string, field: ReviewField, status: VerificationStatus, source: string) => {
    // At most one entry per recordType + recordId + field (Issue #129): route
    // variants sharing the same spot must not duplicate rows.
    const key = `${recordType}:${recordId}:${field}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    entries.push({ recordType, recordId, field, status, source });
  };

  for (const place of input.places) {
    const status = deriveVerificationStatus(place.source, place.origin);
    if (status === 'verified') {
      continue;
    }
    for (const field of placeReviewFields(place)) {
      add('place', place.id, field, status, place.source.name);
    }
  }

  for (const fc of input.foodCultures) {
    const status = recordVerificationStatus(fc.sources, fc.origin);
    if (status === 'verified') {
      continue;
    }
    // Food-culture facts are team-authored from sources; until a stakeholder
    // confirms the wording, the narrative (and any populated fact) stays
    // needs confirmation.
    add('foodCulture', fc.id, 'facts', status, fc.sources.map((s) => s.name).join(' / ') || 'unspecified');
  }

  for (const spot of input.spots) {
    const status = deriveVerificationStatus(spot.source, spot.origin);
    if (status === 'verified') {
      continue;
    }
    for (const field of spotReviewFields(spot)) {
      add('spot', spot.placeId, field, status, spot.source.name);
    }
  }

  return entries;
}
