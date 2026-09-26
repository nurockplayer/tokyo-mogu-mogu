import { afterEach, describe, expect, it, vi } from 'vitest';
import { CONFIRMATION_REVIEW_PROGRESS } from '../data/confirmation-review-metadata';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { places } from '../data';
import { CURRENT_PRODUCT_FACTUAL_INVENTORY } from './current-product-factual-inventory';
import { buildRepositoryLedgerClaims } from './data-verification-ledger';
import {
  countCurrentConfirmationProgress,
  currentReviewFieldSnapshots,
  fingerprintReviewField,
  serializeProductReviewHandoff,
  serializeReviewFieldSnapshot,
  serializeStakeholderConfirmationHandoff,
  summarizeEntityConfirmationProgress,
  validateConfirmationProgress,
  type ReviewFieldSnapshot,
} from './data-review-handoff';
import { buildHumanDataReviewBoard, createDataReviewShareSummaryJa, type HumanDataReviewEntity } from './human-data-review-board';
import { deriveVerificationStatus, recordVerificationStatus } from './verification';
import { stakeholderConfirmationApplicationGuidanceJa } from './stakeholder-review-packet';

afterEach(() => vi.unstubAllGlobals());

const board = buildHumanDataReviewBoard({
  claims: buildRepositoryLedgerClaims(),
  currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
  evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
  places,
});

function fixtureEntity(): HumanDataReviewEntity {
  return {
    id: 'sample-venue', type: 'Spot', name: 'Sample Venue', headlineStatus: 'conflict',
    decisionCount: 0, unresolvedCount: 2, needsConfirmationCount: 0, staleCount: 0,
    unknownCount: 1, conflictCount: 1,
    reviewContext: { decisionItems: [], reviewFocus: [], productImpacts: [], affectedSurfaces: [], uncertainties: [], findings: [] },
    facts: [{
      fieldKey: 'phone', label: '電話番号', canonicalValue: '080-1111-1111', status: 'conflict',
      claimIds: ['claim:z', 'claim:a'], sourceChecked: true, affectedSurfaces: ['Spot'],
      finding: 'mismatch',
      sources: [
        { claimId: 'claim:z', origin: 'source', name: 'Newspaper B', url: 'https://b.example', sourceType: 'official_web', license: 'terms B', retrievedAt: '2026-09-01', status: 'conflict', value: '080-2222-2222', role: 'content', relationship: 'source_statement' },
        { claimId: 'claim:a', origin: 'source', name: 'Newspaper A', url: 'https://a.example', sourceType: 'official_web', license: 'terms A', retrievedAt: '2026-09-02', status: 'conflict', value: '080-1111-1111', role: 'content', relationship: 'primary' },
      ],
    }],
    unknowns: [{ fieldKey: 'hours', label: '営業時間', claimIds: ['claim:hours'], note: 'No source-backed value.' }],
    sources: [], evidence: [], omissions: [], references: [],
  } as unknown as HumanDataReviewEntity;
}

const recordFor = async (
  field: ReviewFieldSnapshot,
  outcome: 'confirmed' | 'correction_required' | 'unknown' | 'not_applicable' = 'confirmed',
) => ({
  entityType: field.entityType,
  entityId: field.entityId,
  fieldKey: field.fieldKey,
  claimIds: [...field.claimIds],
  outcome,
  reviewedAt: '2026-09-26',
  method: 'phone' as const,
  authorityReference: 'venue contact role',
  fingerprintVersion: 'sha256-v1' as const,
  fingerprint: await fingerprintReviewField(field),
});

describe('Board review handoff and confirmation progress (#133)', () => {
  it('projects all current Board fields without key collisions and validates the empty repository progress catalog', async () => {
    expect(board.entities).toHaveLength(34);
    const allFields = board.entities.flatMap(currentReviewFieldSnapshots);
    expect(CONFIRMATION_REVIEW_PROGRESS).toEqual([]);
    expect(new Set(allFields.map((field) => `${field.entityType}/${field.entityId}/${field.fieldKey}`)).size)
      .toBe(allFields.length);
    expect(allFields.some((field) => field.sources.some((source) => source.sourceUpdatedAt !== undefined))).toBe(true);
    expect(await validateConfirmationProgress(CONFIRMATION_REVIEW_PROGRESS, allFields)).toEqual([]);
    const totals = await summarizeEntityConfirmationProgress(board.entities[0], [], allFields);
    expect(totals).toMatchObject({ answered: 0, confirmed: 0, stale: 0 });
    expect(totals.total).toBeGreaterThan(0);
  });

  it('serializes fingerprints independent of set order and display-label changes', async () => {
    const entity = fixtureEntity();
    const base = currentReviewFieldSnapshots(entity)[0];
    const reversedEntity = {
      ...entity,
      facts: entity.facts.map((fact) => ({
        ...fact,
        label: 'Renamed display label',
        claimIds: [...fact.claimIds].reverse(),
        sources: [...fact.sources].reverse().map((source) => ({ ...source, name: `renamed:${source.name}` })),
      })),
    } as HumanDataReviewEntity;
    const reordered = currentReviewFieldSnapshots(reversedEntity)[0];
    expect(serializeReviewFieldSnapshot(base)).toBe(serializeReviewFieldSnapshot(reordered));
    expect(await fingerprintReviewField(base)).toBe(await fingerprintReviewField(reordered));
  });

  it('invalidates a fingerprint when a current value, source side, source date, claim membership, or unknown state changes', async () => {
    const entity = fixtureEntity();
    const base = currentReviewFieldSnapshots(entity).find((field) => field.fieldKey === 'phone')!;
    const digest = await fingerprintReviewField(base);
    const variants: ReviewFieldSnapshot[] = [
      { ...base, canonicalValue: 'changed' },
      { ...base, sources: base.sources.map((source) => source.claimId === 'claim:a' ? { ...source, value: 'changed side' } : source) },
      { ...base, sources: base.sources.map((source) => source.claimId === 'claim:a' ? { ...source, retrievedAt: '2026-09-03' } : source) },
      { ...base, sources: base.sources.map((source) => source.claimId === 'claim:a' ? { ...source, sourceUpdatedAt: '2026-09-03' } : source) },
      { ...base, claimIds: [...base.claimIds, 'claim:new'].sort() },
      { ...base, finding: 'mismatch', status: 'needs_confirmation' },
    ];
    for (const variant of variants) expect(await fingerprintReviewField(variant)).not.toBe(digest);
    const unknown = currentReviewFieldSnapshots(entity).find((field) => field.fieldKey === 'hours')!;
    expect(await fingerprintReviewField(unknown)).not.toBe(await fingerprintReviewField({ ...unknown, status: 'needs_confirmation' }));
  });

  it('invalidates current Route progress when a mapped English source date changes or that source statement disappears', async () => {
    const claims = buildRepositoryLedgerClaims();
    const makeBoard = (currentClaims: typeof claims) => buildHumanDataReviewBoard({
      claims: currentClaims,
      currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
      places,
    });
    const routeId = 'okutama-wasabi-journey';
    const fieldKey = 'route:full-day:step:wasabi-experience:tour-duration';
    const initialBoard = makeBoard(claims);
    const initialRoute = initialBoard.entities.find((entity) => entity.id === routeId)!;
    const initialField = currentReviewFieldSnapshots(initialRoute).find((field) => field.fieldKey === fieldKey)!;
    const priorRecord = await recordFor(initialField, 'correction_required');

    const dateChanged = makeBoard(claims.map((claim) => claim.claimId === 'place:wasabi-experience:tour_duration:source:english-page'
      ? { ...claim, sourceUpdatedAt: '2026-08-13' }
      : claim));
    const changedRoute = dateChanged.entities.find((entity) => entity.id === routeId)!;
    const changedFields = dateChanged.entities.flatMap(currentReviewFieldSnapshots);
    expect(await summarizeEntityConfirmationProgress(changedRoute, [priorRecord], changedFields))
      .toMatchObject({ answered: 0, confirmed: 0, stale: 1 });

    const retrievalChanged = makeBoard(claims.map((claim) => claim.claimId === 'place:wasabi-experience:tour_duration:source:english-page'
      ? { ...claim, retrievedAt: '2026-09-01' }
      : claim));
    const retrievalRoute = retrievalChanged.entities.find((entity) => entity.id === routeId)!;
    expect(await summarizeEntityConfirmationProgress(
      retrievalRoute,
      [priorRecord],
      retrievalChanged.entities.flatMap(currentReviewFieldSnapshots),
    )).toMatchObject({ answered: 0, confirmed: 0, stale: 1 });

    const statementRemoved = makeBoard(claims.filter((claim) =>
      claim.claimId !== 'place:wasabi-experience:tour_duration:source:english-page'));
    const removedRoute = statementRemoved.entities.find((entity) => entity.id === routeId)!;
    const removedFields = statementRemoved.entities.flatMap(currentReviewFieldSnapshots);
    expect(await summarizeEntityConfirmationProgress(removedRoute, [priorRecord], removedFields))
      .toMatchObject({ answered: 0, confirmed: 0, stale: 1 });

    const englishStatement = claims.find((claim) => claim.claimId === 'place:wasabi-experience:tour_duration:source:english-page')!;
    const statementAdded = makeBoard([...claims, {
      ...englishStatement,
      claimId: 'place:wasabi-experience:tour_duration:source:additional-fixture',
      fieldId: 'tour_duration:source:additional-fixture',
      primarySource: 'Synthetic additional source statement',
      primarySourceUrl: 'https://example.test/additional-tour-duration',
    }]);
    const addedRoute = statementAdded.entities.find((entity) => entity.id === routeId)!;
    expect(await summarizeEntityConfirmationProgress(
      addedRoute,
      [priorRecord],
      statementAdded.entities.flatMap(currentReviewFieldSnapshots),
    )).toMatchObject({ answered: 0, confirmed: 0, stale: 1 });
  });

  it('fails closed when Web Crypto SHA-256 is unavailable', async () => {
    vi.stubGlobal('crypto', {});
    await expect(fingerprintReviewField(currentReviewFieldSnapshots(fixtureEntity())[0]))
      .rejects.toThrow('SHA-256 is unavailable');
  });

  it('rejects copied factual values, unknown identities, duplicate metadata, ineligible confirmation and stale fingerprints', async () => {
    const entity = fixtureEntity();
    const fields = currentReviewFieldSnapshots(entity);
    const phone = fields.find((field) => field.fieldKey === 'phone')!;
    const hours = fields.find((field) => field.fieldKey === 'hours')!;
    const valid = await recordFor(phone, 'correction_required');
    expect(await validateConfirmationProgress([valid], fields)).toEqual([valid]);
    await expect(validateConfirmationProgress([{ ...valid, canonicalValue: 'copied fact' } as never], fields))
      .rejects.toThrow('cannot contain copied facts');
    await expect(validateConfirmationProgress([{ ...valid, entityId: 'not-current' }], fields))
      .rejects.toThrow('Unknown confirmation progress identity');
    await expect(validateConfirmationProgress([valid, valid], fields)).rejects.toThrow('Duplicate confirmation progress');
    await expect(validateConfirmationProgress([await recordFor(phone, 'confirmed')], [
      { ...phone, status: 'unknown', finding: 'unknown' },
    ])).rejects.toThrow('cannot be marked confirmed');
    await expect(validateConfirmationProgress([await recordFor(hours)], fields))
      .rejects.toThrow('cannot be marked confirmed');
    await expect(validateConfirmationProgress([{ ...valid, fingerprint: '0'.repeat(64) }], fields))
      .rejects.toThrow('Stale confirmation progress fingerprint');
  });

  it('counts only matching current metadata and never lets partial Board progress promote source status', async () => {
    const entity = fixtureEntity();
    const fields = currentReviewFieldSnapshots(entity);
    const phone = fields.find((field) => field.fieldKey === 'phone')!;
    const valid = await recordFor(phone, 'correction_required');
    const totals = await countCurrentConfirmationProgress([valid, { ...valid, fieldKey: 'stale' }], fields);
    expect(totals).toMatchObject({ total: 2, answered: 1, confirmed: 0, stale: 1 });
    expect(entity.facts[0].status).toBe('conflict');
    expect(entity.headlineStatus).toBe('conflict');
  });

  it('counts complete synthetic Board answers without promoting facts or changing the Slack summary', async () => {
    const allFields = board.entities.flatMap(currentReviewFieldSnapshots);
    const completeSyntheticProgress = await Promise.all(allFields.map((field) => recordFor(
      field,
      field.status === 'unknown' ? 'unknown' : field.status === 'conflict' ? 'correction_required' : 'confirmed',
    )));
    const entity = board.entities.find((candidate) => candidate.id === 'akabeko')!;
    const shareBefore = createDataReviewShareSummaryJa(entity, 'https://preview.example/data-review/#akabeko');
    const factualStatusBefore = JSON.stringify({ facts: entity.facts, status: entity.headlineStatus });
    const result = await summarizeEntityConfirmationProgress(entity, completeSyntheticProgress, allFields);
    expect(result).toMatchObject({ total: currentReviewFieldSnapshots(entity).length, answered: currentReviewFieldSnapshots(entity).length });
    expect(JSON.stringify({ facts: entity.facts, status: entity.headlineStatus })).toBe(factualStatusBefore);
    const handoff = await serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'phone',
      results: { phone: { outcome: 'correction_required', proposedValue: 'Review the source records' } },
    });
    const product = serializeProductReviewHandoff({ entity, reviewedAt: '2026-09-26', outcome: 'deferred' });
    expect(createDataReviewShareSummaryJa(entity, 'https://preview.example/data-review/#akabeko')).toBe(shareBefore);
    expect(handoff).not.toContain('Slack共有用');
    expect(product).not.toContain('Slack共有用');
    expect(handoff).not.toContain('photoReusePermission');
    expect(product).not.toContain('photoReusePermission');
  });

  it('rejects unknown catalog identities, accepts valid cross-entity records, and counts selected-entity drift as stale', async () => {
    const selected = fixtureEntity();
    const foreign = { ...selected, id: 'sample-venue-two' } as HumanDataReviewEntity;
    const selectedFields = currentReviewFieldSnapshots(selected);
    const foreignFields = currentReviewFieldSnapshots(foreign);
    const allFields = [...selectedFields, ...foreignFields];
    const selectedPhone = selectedFields.find((field) => field.fieldKey === 'phone')!;
    const foreignPhone = foreignFields.find((field) => field.fieldKey === 'phone')!;
    const selectedStale = { ...(await recordFor(selectedPhone, 'correction_required')), fingerprint: '0'.repeat(64) };
    const foreignValid = await recordFor(foreignPhone, 'correction_required');
    expect(await summarizeEntityConfirmationProgress(selected, [foreignValid, selectedStale], allFields))
      .toMatchObject({ total: 2, answered: 0, confirmed: 0, stale: 1 });
    await expect(summarizeEntityConfirmationProgress(selected, [
      { ...foreignValid, entityId: 'not-in-catalog' },
    ], allFields)).rejects.toThrow('Unknown confirmation progress identity');
    await expect(summarizeEntityConfirmationProgress(selected, [foreignValid, foreignValid], allFields))
      .rejects.toThrow('Duplicate confirmation progress identity');
  });

  it('counts a previously confirmed field that has become conflicting as stale rather than current progress', async () => {
    const entity = fixtureEntity();
    const priorEntity = {
      ...entity,
      facts: entity.facts.map((fact) => fact.fieldKey === 'phone' ? { ...fact, status: 'needs_confirmation' as const } : fact),
    } as HumanDataReviewEntity;
    const priorSnapshot = currentReviewFieldSnapshots(priorEntity).find((field) => field.fieldKey === 'phone')!;
    const previouslyConfirmed = await recordFor(priorSnapshot, 'confirmed');
    const current = currentReviewFieldSnapshots(entity);
    expect(await summarizeEntityConfirmationProgress(entity, [previouslyConfirmed], current))
      .toMatchObject({ total: 2, answered: 0, confirmed: 0, stale: 1 });
  });

  it('counts a full set of synthetic answers but leaves canonical field status unchanged', async () => {
    const allFields = board.entities.flatMap(currentReviewFieldSnapshots);
    const records = await Promise.all(allFields.map((field) => recordFor(
      field,
      field.status === 'unknown' ? 'unknown' : field.status === 'conflict' ? 'correction_required' : 'confirmed',
    )));
    const entity = board.entities.find((candidate) => candidate.id === 'okutama-tourism-office')!;
    const currentEntityFields = currentReviewFieldSnapshots(entity);
    const factsBefore = JSON.stringify(entity.facts);
    const totals = await summarizeEntityConfirmationProgress(entity, records, allFields);
    expect(totals).toMatchObject({ total: currentEntityFields.length, answered: currentEntityFields.length });
    expect(JSON.stringify(entity.facts)).toBe(factsBefore);
    expect(entity.facts.every((fact) => fact.status !== 'verified')).toBe(true);
  });

  it('keeps Product review and factual confirmation as distinct deterministic transports', async () => {
    const entity = board.entities.find((candidate) => candidate.id === 'okutama-tourism-office')!;
    const product = serializeProductReviewHandoff({
      entity,
      reviewedAt: '2026-09-25',
      outcome: 'accepted',
    });
    expect(product).toContain('product_review');
    expect(product).toContain('entity_interpretation');
    expect(product).toContain('2026-09-25');
    expect(product).not.toContain('stakeholder_confirmation');
    expect(product).not.toContain('canonical_value');
    expect(serializeProductReviewHandoff({ entity, reviewedAt: '2026-09-25', outcome: 'accepted' })).toBe(product);
    const entityLevel = board.entities.find((candidate) => candidate.reviewContext.decisionItems.length === 0)!;
    expect(entityLevel).toBeDefined();
    expect(serializeProductReviewHandoff({ entity: entityLevel, reviewedAt: '2026-09-26', outcome: 'deferred' }))
      .toContain('entity_interpretation');
    expect(() => serializeProductReviewHandoff({ entity: entityLevel, reviewedAt: '', outcome: 'deferred' }))
      .toThrow('Product レビュー日');

    const mobile = board.entities.find((candidate) => candidate.reviewContext.decisionItems.some((item) => item.kind === 'mobile_behavior'))!;
    expect(mobile).toBeDefined();
    const mobileProduct = serializeProductReviewHandoff({
      entity: mobile,
      item: mobile.reviewContext.decisionItems.find((item) => item.kind === 'mobile_behavior'),
      reviewedAt: '2026-09-26',
      outcome: 'correction_required',
    });
    expect(mobileProduct).toContain('mobile:no-fixed-storefront');
    expect(mobileProduct).not.toContain('verificationStatus');
  });

  it('retains all conflict source sides and refuses ordinary confirmation or silent source selection', async () => {
    const entity = board.entities.find((candidate) => candidate.id === 'akabeko')!;
    const phone = entity.facts.find((fact) => fact.fieldKey === 'phone')!;
    const snapshot = currentReviewFieldSnapshots(entity).find((field) => field.fieldKey === 'phone')!;
    expect(snapshot.sources.map((source) => source.url)).toEqual([
      'https://akabeko.tokyo/', 'https://akabeko.tokyo/news', 'https://arasawaya.co.jp/contact/',
    ]);
    await expect(serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'phone',
      results: { phone: { outcome: 'confirmed' } },
    })).rejects.toThrow('cannot be marked confirmed');
    const handoff = await serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'phone',
      results: { phone: { outcome: 'correction_required', proposedValue: 'Review the source records' } },
    });
    expect(handoff).toContain('stakeholder_confirmation');
    expect(handoff).toContain('source sides are retained');
    expect(handoff).toContain('https://akabeko.tokyo/news');
    expect(handoff).toContain('050-5304-3644 / reservation_inquiry / shared_business_group / unresolved');
    expect(handoff).toContain('proposed value (not canonical)');
    expect(handoff).toContain('does not set confirmedAt');
    expect(phone.sources).toHaveLength(3);
  });

  it('leaves unknown unresolved and requires correction text to remain a proposal', async () => {
    const entity = fixtureEntity();
    await expect(serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'other',
      results: { hours: { outcome: 'confirmed' } },
    })).rejects.toThrow('cannot be marked confirmed');
    const unknown = await serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'other',
      results: { hours: { outcome: 'unknown' } },
    });
    expect(unknown).toContain('current status: unknown');
    expect(unknown).not.toContain('proposed_value');
    await expect(serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'other',
      results: { hours: { outcome: 'correction_required' } },
    })).rejects.toThrow('proposed correction is required');
    const correction = await serializeStakeholderConfirmationHandoff({
      entity, reviewedAt: '2026-09-26', method: 'other',
      results: { hours: { outcome: 'correction_required', proposedValue: 'Proposed opening hours' } },
    });
    expect(correction).toContain('current status: unknown');
    expect(correction).toContain('Proposed opening hours');
    expect(correction).toContain('not canonical');
  });

  it('derives verification from confirmedAt and source-update freshness, and shares the complete-source application rule', () => {
    const base = { name: 'Official source', sourceType: 'official_web' as const, verificationStatus: 'verified' as const };
    const withoutDate = { ...base, retrievedAt: '2026-09-26' };
    const confirmedCurrent = { ...base, confirmedAt: '2026-09-26', sourceUpdatedAt: '2026-09-26' };
    const sourceUpdatedAfterConfirmation = { ...confirmedCurrent, sourceUpdatedAt: '2026-09-27' };
    expect(deriveVerificationStatus(withoutDate, 'source')).toBe('needs_confirmation');
    expect(deriveVerificationStatus(confirmedCurrent, 'source')).toBe('verified');
    expect(deriveVerificationStatus(sourceUpdatedAfterConfirmation, 'source')).toBe('stale');
    expect(recordVerificationStatus([confirmedCurrent, withoutDate], 'source')).toBe('needs_confirmation');
    expect(recordVerificationStatus([confirmedCurrent, { ...confirmedCurrent }], 'source')).toBe('verified');
    const guidance = stakeholderConfirmationApplicationGuidanceJa({ entityId: 'sample-venue' });
    expect(guidance).toContain('対象 source の表示対象項目をすべて実際に確認できた場合だけ');
    expect(guidance).toContain('一部の確認や Board の進捗だけでは source を verified にしません');
  });
});
