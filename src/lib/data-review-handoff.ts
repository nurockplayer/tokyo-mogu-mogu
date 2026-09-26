import type { ConfirmationReviewProgressRecord } from '../data/confirmation-review-metadata';
import type {
  HumanDataReviewDecisionItem,
  HumanDataReviewEntity,
  HumanDataReviewFact,
  HumanDataReviewUnknown,
} from './human-data-review-board';

export type ProductReviewOutcome = 'accepted' | 'correction_required' | 'deferred';
export type StakeholderConfirmationOutcome = ConfirmationReviewProgressRecord['outcome'];

export interface ReviewFieldSnapshot {
  entityType: HumanDataReviewEntity['type'];
  entityId: string;
  fieldKey: string;
  claimIds: readonly string[];
  status: HumanDataReviewFact['status'] | 'unknown';
  finding: HumanDataReviewFact['finding'] | 'unknown';
  canonicalValue?: string;
  displayedValue?: string;
  comparedPresentationValue?: string;
  sources: readonly {
    claimId: string;
    origin: string;
    /** Human-readable display only; excluded from the semantic fingerprint. */
    displayName: string;
    url?: string;
    sourceType?: string;
    license?: string;
    retrievedAt?: string;
    sourceUpdatedAt?: string;
    confirmedAt?: string;
    status: HumanDataReviewFact['sources'][number]['status'];
    value?: string;
    role: HumanDataReviewFact['sources'][number]['role'];
    relationship: HumanDataReviewFact['sources'][number]['relationship'];
  }[];
}

const compareText = (left: string, right: string): number => left < right ? -1 : left > right ? 1 : 0;
const sortedUnique = (values: readonly string[]): string[] => [...new Set(values)].sort(compareText);

function snapshotFact(entity: HumanDataReviewEntity, fact: HumanDataReviewFact): ReviewFieldSnapshot {
  return {
    entityType: entity.type,
    entityId: entity.id,
    fieldKey: fact.fieldKey,
    claimIds: sortedUnique(fact.claimIds),
    status: fact.status,
    finding: fact.finding,
    ...(fact.canonicalValue === undefined ? {} : { canonicalValue: fact.canonicalValue }),
    ...(fact.displayedValue === undefined ? {} : { displayedValue: fact.displayedValue }),
    ...(fact.comparedPresentationValue === undefined ? {} : { comparedPresentationValue: fact.comparedPresentationValue }),
    sources: fact.sources.map((source) => ({
      claimId: source.claimId,
      origin: source.origin,
      displayName: source.name,
      ...(source.url === undefined ? {} : { url: source.url }),
      ...(source.sourceType === undefined ? {} : { sourceType: source.sourceType }),
      ...(source.license === undefined ? {} : { license: source.license }),
      ...(source.retrievedAt === undefined ? {} : { retrievedAt: source.retrievedAt }),
      ...(source.sourceUpdatedAt === undefined ? {} : { sourceUpdatedAt: source.sourceUpdatedAt }),
      ...(source.confirmedAt === undefined ? {} : { confirmedAt: source.confirmedAt }),
      status: source.status,
      ...(source.value === undefined ? {} : { value: source.value }),
      role: source.role,
      relationship: source.relationship,
    })).sort((left, right) => compareText(left.claimId, right.claimId)),
  };
}

function snapshotUnknown(entity: HumanDataReviewEntity, field: HumanDataReviewUnknown): ReviewFieldSnapshot {
  return {
    entityType: entity.type,
    entityId: entity.id,
    fieldKey: field.fieldKey,
    claimIds: sortedUnique(field.claimIds),
    status: 'unknown',
    finding: 'unknown',
    sources: [],
  };
}

/** Current fields keyed by stable identity; labels never participate in identity or hashing. */
export function currentReviewFieldSnapshots(entity: HumanDataReviewEntity): ReviewFieldSnapshot[] {
  const byKey = new Map<string, ReviewFieldSnapshot>();
  for (const fact of entity.facts) {
    if (byKey.has(fact.fieldKey)) throw new Error(`Duplicate review field: ${fact.fieldKey}`);
    byKey.set(fact.fieldKey, snapshotFact(entity, fact));
  }
  for (const field of entity.unknowns) {
    if (byKey.has(field.fieldKey)) throw new Error(`Ambiguous review field: ${field.fieldKey}`);
    byKey.set(field.fieldKey, snapshotUnknown(entity, field));
  }
  return [...byKey.values()].sort((left, right) => compareText(left.fieldKey, right.fieldKey));
}

/** Canonical semantic serialization excludes labels and input-array order. */
export function serializeReviewFieldSnapshot(snapshot: ReviewFieldSnapshot): string {
  return JSON.stringify({
    version: 'review-field-snapshot-v1',
    entityType: snapshot.entityType,
    entityId: snapshot.entityId,
    fieldKey: snapshot.fieldKey,
    claimIds: sortedUnique(snapshot.claimIds),
    status: snapshot.status,
    finding: snapshot.finding,
    canonicalValue: snapshot.canonicalValue ?? null,
    displayedValue: snapshot.displayedValue ?? null,
    comparedPresentationValue: snapshot.comparedPresentationValue ?? null,
    sources: [...snapshot.sources].map((source) => ({
      claimId: source.claimId,
      origin: source.origin,
      url: source.url ?? null,
      sourceType: source.sourceType ?? null,
      license: source.license ?? null,
      retrievedAt: source.retrievedAt ?? null,
      sourceUpdatedAt: source.sourceUpdatedAt ?? null,
      confirmedAt: source.confirmedAt ?? null,
      status: source.status,
      value: source.value ?? null,
      role: source.role,
      relationship: source.relationship,
    })).sort((left, right) => compareText(left.claimId, right.claimId)),
  });
}

/** Standard Web Crypto SHA-256 only. Unsupported crypto fails closed. */
export async function fingerprintReviewField(snapshot: ReviewFieldSnapshot): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) throw new Error('SHA-256 is unavailable; review fingerprint cannot be created.');
  const bytes = new TextEncoder().encode(serializeReviewFieldSnapshot(snapshot));
  const digest = await subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

const PROGRESS_OUTCOMES = new Set(['confirmed', 'correction_required', 'unknown', 'not_applicable']);
const CONFIRMATION_METHODS = new Set(['in_person', 'phone', 'direct_message', 'email', 'other']);
const PROGRESS_KEYS = new Set([
  'entityType', 'entityId', 'fieldKey', 'claimIds', 'outcome', 'reviewedAt', 'method',
  'authorityReference', 'fingerprintVersion', 'fingerprint',
]);

function validDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validateProgressShape(record: ConfirmationReviewProgressRecord): void {
  if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('Invalid confirmation progress record.');
  if (Object.keys(record).some((key) => !PROGRESS_KEYS.has(key))) throw new Error('Confirmation progress cannot contain copied facts or correction values.');
  if (!['Spot', 'Story', 'Route'].includes(record.entityType)
    || !record.entityId.trim() || !record.fieldKey.trim()) throw new Error('Invalid confirmation progress identity.');
  if (!Array.isArray(record.claimIds) || !record.claimIds.length
    || record.claimIds.some((claimId) => typeof claimId !== 'string' || !claimId.trim())
    || new Set(record.claimIds).size !== record.claimIds.length
    || record.claimIds.some((claimId, index) => index > 0 && compareText(record.claimIds[index - 1], claimId) >= 0)) {
    throw new Error('Confirmation progress claim IDs must be nonempty, unique, and sorted.');
  }
  if (!PROGRESS_OUTCOMES.has(record.outcome)) throw new Error('Invalid confirmation progress outcome.');
  if (!validDate(record.reviewedAt)) throw new Error('Invalid confirmation progress date.');
  if (!CONFIRMATION_METHODS.has(record.method)) throw new Error('Invalid confirmation progress method.');
  if (record.authorityReference !== undefined
    && (typeof record.authorityReference !== 'string' || record.authorityReference.length > 160)) {
    throw new Error('Invalid minimal confirmation authority reference.');
  }
  if (record.fingerprintVersion !== 'sha256-v1' || !/^[0-9a-f]{64}$/.test(record.fingerprint)) {
    throw new Error('Invalid confirmation snapshot fingerprint.');
  }
}

/** Strictly rejects malformed, duplicate, unknown, stale, or ineligible progress. */
export async function validateConfirmationProgress(
  records: readonly ConfirmationReviewProgressRecord[],
  currentFields: readonly ReviewFieldSnapshot[],
): Promise<readonly ConfirmationReviewProgressRecord[]> {
  const currentByKey = new Map(currentFields.map((field) => [
    `${field.entityType}\u0000${field.entityId}\u0000${field.fieldKey}`, field,
  ]));
  const seen = new Set<string>();
  for (const record of records) {
    validateProgressShape(record);
    const key = `${record.entityType}\u0000${record.entityId}\u0000${record.fieldKey}`;
    if (seen.has(key)) throw new Error(`Duplicate confirmation progress identity: ${record.fieldKey}`);
    seen.add(key);
    const current = currentByKey.get(key);
    if (!current) throw new Error(`Unknown confirmation progress identity: ${record.entityId}/${record.fieldKey}`);
    if (JSON.stringify(record.claimIds) !== JSON.stringify(sortedUnique(current.claimIds))) {
      throw new Error(`Confirmation claim membership changed: ${record.fieldKey}`);
    }
    if (record.outcome === 'confirmed' && (current.status === 'unknown' || current.status === 'conflict')) {
      throw new Error(`Unknown or conflicting fields cannot be marked confirmed: ${record.fieldKey}`);
    }
    if (await fingerprintReviewField(current) !== record.fingerprint) {
      throw new Error(`Stale confirmation progress fingerprint: ${record.fieldKey}`);
    }
  }
  return records;
}

export async function countCurrentConfirmationProgress(
  records: readonly ConfirmationReviewProgressRecord[],
  currentFields: readonly ReviewFieldSnapshot[],
): Promise<{ total: number; answered: number; confirmed: number; stale: number }> {
  const currentByKey = new Map(currentFields.map((field) => [
    `${field.entityType}\u0000${field.entityId}\u0000${field.fieldKey}`, field,
  ]));
  const seen = new Set<string>();
  let answered = 0;
  let confirmed = 0;
  let stale = 0;
  for (const record of records) {
    validateProgressShape(record);
    const key = `${record.entityType}\u0000${record.entityId}\u0000${record.fieldKey}`;
    if (seen.has(key)) throw new Error(`Duplicate confirmation progress identity: ${record.fieldKey}`);
    seen.add(key);
    const current = currentByKey.get(key);
    if (!current || JSON.stringify(record.claimIds) !== JSON.stringify(sortedUnique(current.claimIds))
      || await fingerprintReviewField(current) !== record.fingerprint) {
      stale += 1;
      continue;
    }
    if (record.outcome === 'confirmed' && (current.status === 'unknown' || current.status === 'conflict')) {
      throw new Error(`Unknown or conflicting fields cannot be marked confirmed: ${record.fieldKey}`);
    }
    answered += 1;
    if (record.outcome === 'confirmed') confirmed += 1;
  }
  return { total: currentFields.length, answered, confirmed, stale };
}

/** Validate catalog identity and shape while allowing old fingerprints to be counted as stale. */
function validateProgressCatalogMembership(
  records: readonly ConfirmationReviewProgressRecord[],
  allCurrentFields: readonly ReviewFieldSnapshot[],
): void {
  const currentByKey = new Map(allCurrentFields.map((field) => [
    `${field.entityType}\u0000${field.entityId}\u0000${field.fieldKey}`, field,
  ]));
  const seen = new Set<string>();
  for (const record of records) {
    validateProgressShape(record);
    const key = `${record.entityType}\u0000${record.entityId}\u0000${record.fieldKey}`;
    if (seen.has(key)) throw new Error(`Duplicate confirmation progress identity: ${record.fieldKey}`);
    seen.add(key);
    const current = currentByKey.get(key);
    if (!current) throw new Error(`Unknown confirmation progress identity: ${record.entityId}/${record.fieldKey}`);
  }
}

export interface StakeholderFieldResult {
  outcome: StakeholderConfirmationOutcome;
  proposedValue?: string;
}

export interface StakeholderConfirmationInput {
  entity: HumanDataReviewEntity;
  reviewedAt: string;
  method: ConfirmationReviewProgressRecord['method'];
  authorityReference?: string;
  results: Readonly<Record<string, StakeholderFieldResult>>;
}

export interface ProductReviewInput {
  entity: HumanDataReviewEntity;
  item?: HumanDataReviewDecisionItem;
  reviewedAt: string;
  outcome: ProductReviewOutcome;
  note?: string;
}

function validateHandoffDateAndMethod(reviewedAt: string, method: string): void {
  if (!validDate(reviewedAt)) throw new Error('確認日を正しい YYYY-MM-DD で入力してください。');
  if (!CONFIRMATION_METHODS.has(method)) throw new Error('確認方法を選択してください。');
}

function mdJson(title: string, lines: readonly string[], payload: unknown): string {
  return [title, ...lines, '', '```json', JSON.stringify(payload, null, 2), '```', ''].join('\n');
}

export function serializeProductReviewHandoff(input: ProductReviewInput): string {
  if (!validDate(input.reviewedAt)) throw new Error('Product レビュー日を正しい YYYY-MM-DD で入力してください。');
  if (!['accepted', 'correction_required', 'deferred'].includes(input.outcome)) throw new Error('Invalid Product review result.');
  const item = input.item
    ? input.entity.reviewContext.decisionItems.find((candidate) => candidate.id === input.item?.id)
    : undefined;
  if (input.item && !item) {
    throw new Error('Product review decision item does not belong to the selected entity.');
  }
  const note = input.note?.trim();
  if (note && note.length > 1000) throw new Error('Product review note is too long.');
  const payload = {
    schema: 'tokyo-mogu-mogu-review-handoff/v1',
    review_type: 'product_review',
    entity: { type: input.entity.type, id: input.entity.id },
    reviewed_at: input.reviewedAt,
    result: input.outcome,
    decision: item
      ? { scope: 'decision_item', id: item.id, kind: item.kind, field_keys: sortedUnique(item.factFieldKeys) }
      : { scope: 'entity_interpretation', entity_id: input.entity.id },
    ...(note ? { note } : {}),
    authority: 'Product interpretation only; this receipt does not confirm facts or alter canonical data.',
  };
  return mdJson('## チーム / Product レビュー結果', [
    `- 対象: ${input.entity.type} / ${input.entity.id}`,
    '- レビュー種別: product_review（Product の解釈・表示のみ）',
    `- 判断日: ${input.reviewedAt}`,
    `- 結果: ${input.outcome}`,
    `- 判断対象: ${item?.id ?? 'entity interpretation'}`,
    ...(note ? [`- メモ: ${note}`] : []),
    '- この結果は事実確認、canonical data、verification status を変更しません。',
  ], payload);
}

export async function serializeStakeholderConfirmationHandoff(input: StakeholderConfirmationInput): Promise<string> {
  validateHandoffDateAndMethod(input.reviewedAt, input.method);
  if (input.authorityReference !== undefined && input.authorityReference.length > 160) {
    throw new Error('所属・役割または記録参照は160文字以内で入力してください。');
  }
  const snapshots = currentReviewFieldSnapshots(input.entity);
  const fieldByKey = new Map(snapshots.map((field) => [field.fieldKey, field]));
  const selectedKeys = Object.keys(input.results).sort(compareText);
  if (!selectedKeys.length) throw new Error('少なくとも1項目の結果を選択してください。');
  const results = [];
  for (const fieldKey of selectedKeys) {
    const field = fieldByKey.get(fieldKey);
    const result = input.results[fieldKey];
    if (!field || !result) throw new Error(`Unknown confirmation field: ${fieldKey}`);
    validateProgressShape({
      entityType: input.entity.type,
      entityId: input.entity.id,
      fieldKey,
      claimIds: sortedUnique(field.claimIds),
      outcome: result.outcome,
      reviewedAt: input.reviewedAt,
      method: input.method,
      fingerprintVersion: 'sha256-v1',
      fingerprint: '0'.repeat(64),
    });
    if (result.outcome === 'confirmed' && (field.status === 'unknown' || field.status === 'conflict')) {
      throw new Error(`Unknown or conflicting fields cannot be marked confirmed: ${fieldKey}`);
    }
    const proposedValue = result.proposedValue?.trim();
    if (result.outcome === 'correction_required' && !proposedValue) {
      throw new Error(`A proposed correction is required for ${fieldKey}.`);
    }
    if (result.outcome !== 'correction_required' && proposedValue) {
      throw new Error(`A proposed value is only allowed with correction_required for ${fieldKey}.`);
    }
    if (proposedValue && proposedValue.length > 500) throw new Error(`Proposed correction is too long for ${fieldKey}.`);
    results.push({
      identity: { entity_type: field.entityType, entity_id: field.entityId, field_key: field.fieldKey },
      claim_ids: sortedUnique(field.claimIds),
      result: result.outcome,
      current: {
        status: field.status,
        finding: field.finding,
        canonical_value: field.canonicalValue ?? null,
        displayed_value: field.displayedValue ?? null,
        compared_presentation_value: field.comparedPresentationValue ?? null,
        source_sides: field.sources.map((source) => ({ ...source })),
      },
      snapshot_fingerprint: {
        version: 'sha256-v1',
        digest: await fingerprintReviewField(field),
      },
      ...(proposedValue ? { proposed_value: proposedValue } : {}),
    });
  }
  const payload = {
    schema: 'tokyo-mogu-mogu-review-handoff/v1',
    review_type: 'stakeholder_confirmation',
    entity: { type: input.entity.type, id: input.entity.id },
    reviewed_at: input.reviewedAt,
    method: input.method,
    ...(input.authorityReference?.trim() ? { authority_reference: input.authorityReference.trim() } : {}),
    results,
    authority: 'Handoff only; proposed values require canonical source/provenance review in a normal PR. This payload does not set confirmedAt or verification status.',
  };
  const lines = [
    `- 対象: ${input.entity.type} / ${input.entity.id}`,
    '- 確認種別: stakeholder_confirmation（関係者への事実確認）',
    `- 確認日: ${input.reviewedAt}`,
    `- 方法: ${input.method}`,
    ...(input.authorityReference?.trim() ? [`- 所属・役割 / 記録参照: ${input.authorityReference.trim()}`] : []),
    ...results.flatMap((result) => [
      '',
      `### ${result.identity.field_key}`,
      `- stable identity: ${result.identity.entity_type}/${result.identity.entity_id}/${result.identity.field_key}`,
      `- claims: ${result.claim_ids.join(', ') || 'なし'}`,
      `- result: ${result.result}`,
      `- current status: ${result.current.status} / finding: ${result.current.finding}`,
      ...(result.proposed_value ? [`- proposed value (not canonical): ${result.proposed_value}`] : []),
      ...(result.current.source_sides.length > 1 ? ['- conflicting source sides are retained; no source is selected as winner.'] : []),
    ]),
    '',
    '- 修正案は提案であり、通常の canonical/source 更新 PR で反映するまで正本ではありません。',
    '- この handoff は confirmedAt、verification status、権利確認を変更しません。',
  ];
  return mdJson('## 関係者への事実確認 handoff', lines, payload);
}

/** Stable current fields and outcome totals; stale records are excluded. */
export async function summarizeEntityConfirmationProgress(
  entity: HumanDataReviewEntity,
  records: readonly ConfirmationReviewProgressRecord[],
  allCurrentFields: readonly ReviewFieldSnapshot[],
): Promise<{ total: number; answered: number; confirmed: number; stale: number }> {
  validateProgressCatalogMembership(records, allCurrentFields);
  const entityRecords = records.filter((record) => record.entityType === entity.type && record.entityId === entity.id);
  return countCurrentConfirmationProgress(entityRecords, currentReviewFieldSnapshots(entity));
}
