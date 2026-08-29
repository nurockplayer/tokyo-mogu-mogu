import type {
  DataVerificationEvidence,
  DataVerificationEvidenceManifest,
  DataVerificationEvidenceOmission,
} from '../data/data-verification-evidence-manifest';
import type { DataSource } from '../data/model';
import type {
  CurrentProductFactualEntity,
  CurrentProductFactualEntityType,
} from './current-product-factual-inventory';
import type { LedgerClaim, LedgerVerification } from './data-verification-ledger';

export const DATA_REVIEW_STATUS_LABELS_JA: Readonly<Record<LedgerVerification, string>> = {
  verified: '✅ 確認済み',
  needs_confirmation: '🟡 出典あり・要確認',
  stale: '🟠 要再確認',
  conflict: '⚠️ 情報に矛盾あり',
  unknown: '❓ 未確認',
  demo: '🧪 デモ情報',
};

type SourceType = DataSource['sourceType'];

export interface HumanDataReviewFact {
  fieldKey: string;
  label: string;
  canonicalValue?: string;
  displayedValue?: string;
  comparedPresentationClaimId?: string;
  comparedPresentationValue?: string;
  status: LedgerVerification;
  claimIds: readonly string[];
  sourceName?: string;
  sourceUrl?: string;
  retrievedAt?: string;
  finding: LedgerClaim['finding'];
}

export interface HumanDataReviewUnknown {
  fieldKey: string;
  label: string;
  claimIds: readonly string[];
  note?: string;
}

export interface HumanDataReviewSource {
  name: string;
  url?: string;
  sourceType?: SourceType;
  retrievedAt?: string;
  status: LedgerVerification;
  coordinateProvider: boolean;
  claimIds: readonly string[];
}

export interface HumanDataReviewReference {
  label: string;
  href: string;
}

export interface HumanDataReviewEntity {
  id: string;
  type: CurrentProductFactualEntityType;
  name: string;
  headlineStatus: LedgerVerification;
  latestRetrievedAt?: string;
  unresolvedCount: number;
  needsConfirmationCount: number;
  staleCount: number;
  unknownCount: number;
  conflictCount: number;
  facts: readonly HumanDataReviewFact[];
  unknowns: readonly HumanDataReviewUnknown[];
  sources: readonly HumanDataReviewSource[];
  evidence: readonly DataVerificationEvidence[];
  omissions: readonly DataVerificationEvidenceOmission[];
  references: readonly HumanDataReviewReference[];
}

export interface HumanDataReviewBoard {
  entities: readonly HumanDataReviewEntity[];
  entityTypeCounts: Readonly<Record<CurrentProductFactualEntityType, number>>;
  statusCounts: Readonly<Record<LedgerVerification, number>>;
}

export interface HumanDataReviewBoardInput {
  claims: readonly LedgerClaim[];
  currentProductEntities: readonly CurrentProductFactualEntity[];
  evidenceManifest: DataVerificationEvidenceManifest;
}

interface HumanFieldDefinition {
  key: string;
  label: string;
  aliases: readonly string[];
  order: number;
}

const HUMAN_FIELDS: readonly HumanFieldDefinition[] = [
  { key: 'name', label: '施設名', aliases: ['information_name', 'name'], order: 10 },
  { key: 'venue_model', label: '営業形態', aliases: ['venue_model', 'place_type'], order: 15 },
  { key: 'address', label: '住所', aliases: ['address'], order: 20 },
  { key: 'operating_area', label: '主な出店エリア', aliases: ['operating_area'], order: 25 },
  { key: 'phone', label: '電話番号', aliases: ['phone'], order: 30 },
  { key: 'phone_hours', label: '電話受付時間', aliases: ['phone_hours'], order: 40 },
  { key: 'access', label: 'アクセス', aliases: ['access'], order: 50 },
  { key: 'hours', label: '営業時間', aliases: ['hours'], order: 60 },
  { key: 'schedule_guidance', label: '出店案内', aliases: ['schedule_guidance'], order: 62 },
  { key: 'schedule_url', label: '最新の出店予定', aliases: ['schedule_url'], order: 64 },
  { key: 'schedule_conflict', label: '日程情報の不一致', aliases: ['schedule_conflict'], order: 66 },
  { key: 'closed_days', label: '休業日', aliases: ['closed_days'], order: 70 },
  { key: 'price_availability', label: '価格・取扱情報', aliases: ['price_availability', 'price'], order: 80 },
  { key: 'service_availability', label: '取扱・サービス', aliases: ['service_availability'], order: 85 },
  { key: 'reservation', label: '予約', aliases: ['reservation'], order: 90 },
  { key: 'booking_destination', label: '予約方法・URL', aliases: ['booking_destination'], order: 100 },
  { key: 'parking', label: '駐車場', aliases: ['parking'], order: 110 },
  { key: 'multilingual_support', label: '多言語対応', aliases: ['multilingual_support'], order: 120 },
  { key: 'dietary_allergy', label: '食事制限・アレルギー対応', aliases: ['dietary_allergy'], order: 130 },
  { key: 'accessibility', label: 'アクセシビリティ', aliases: ['accessibility'], order: 140 },
  { key: 'official_current_url', label: '最新の公式情報', aliases: ['official_current_url'], order: 150 },
  { key: 'coordinates', label: '位置情報', aliases: ['coordinates'], order: 160 },
] as const;

const FIELD_BY_ALIAS = new Map(
  HUMAN_FIELDS.flatMap((definition) =>
    definition.aliases.map((alias) => [alias, definition] as const),
  ),
);

const STATUS_PRIORITY: Readonly<Record<LedgerVerification, number>> = {
  conflict: 6,
  stale: 5,
  needs_confirmation: 4,
  unknown: 3,
  demo: 2,
  verified: 1,
};

const UNRESOLVED_STATUSES = new Set<LedgerVerification>([
  'needs_confirmation',
  'stale',
  'conflict',
  'unknown',
]);

function baseFieldId(fieldId: string): string | undefined {
  if (fieldId.endsWith(':en') || fieldId.endsWith(':zh-TW')) return undefined;
  return fieldId.endsWith(':ja') ? fieldId.slice(0, -3) : fieldId;
}

function fieldDefinition(claim: LedgerClaim): HumanFieldDefinition | undefined {
  const base = baseFieldId(claim.fieldId);
  if (!base || base.includes(':source:')) return undefined;
  if (base.startsWith('presentation:')) {
    if (claim.finding !== 'presentation_mismatch') return undefined;
    const presentationLabels: Readonly<Record<string, string>> = {
      'presentation:result_origin_travel_time': 'Result と Route の移動時間表示',
    };
    return {
      key: `${claim.entityType.toLowerCase()}:${base}`,
      label: presentationLabels[base] ?? `表示間の比較（${claim.appSurface ?? claim.fieldLabel}）`,
      aliases: [base],
      order: 30,
    };
  }
  if (claim.entityType === 'Place' || claim.entityType === 'Spot') {
    return FIELD_BY_ALIAS.get(base);
  }

  const routePrefix = `route:${claim.entityId}:`;
  const routeVariant = claim.claimId.startsWith(routePrefix)
    ? claim.claimId.slice(routePrefix.length).split(':')[0]
    : undefined;
  const routeVariantLabel = routeVariant === 'half-day'
    ? '半日'
    : routeVariant === 'full-day' ? '1日' : routeVariant;

  if (claim.entityType === 'Route') {
    const routeFields: Readonly<Record<string, string>> = {
      duration_minutes: '所要時間（分）',
      stop_count: '立ち寄り数',
      stop_sequence: '立ち寄り順',
      transport_summary: '移動概要',
      origin_travel_time_guidance: '出発地からの所要時間',
      distance_guidance: '距離の目安',
      region_guidance: '地域案内',
    };
    const routeLabel = routeFields[base];
    if (routeLabel) {
      return {
        key: `route:${routeVariant ?? 'shared'}:${base}`,
        label: routeVariantLabel ? `${routeVariantLabel}の${routeLabel}` : routeLabel,
        aliases: [base],
        order: 20,
      };
    }
    const factual = /^step:([^:]+):factual:(.+)$/.exec(base);
    if (factual) {
      return {
        key: `route:${routeVariant ?? 'shared'}:step:${factual[1]}:${factual[2]}`,
        label: `取扱・運行情報（${factual[1]}）`,
        aliases: [base],
        order: 40,
      };
    }
  }

  if (claim.entityType === 'Story') {
    const product = /^story\.spot\.([^.]+)\.product-availability$/.exec(base);
    if (product) {
      return {
        key: `story:${product[1]}:product_availability`,
        label: `取扱・提供状況（${product[1]}）`,
        aliases: [base],
        order: 40,
      };
    }
  }

  return {
    key: `${claim.entityType.toLowerCase()}:${base}`,
    label: `確認項目（${claim.fieldLabel}）`,
    aliases: [base],
    order: 200,
  };
}

function preferredValueFor(claim: LedgerClaim): string | undefined {
  return claim.displayedValue || claim.canonicalValue;
}

function candidateScore(claim: LedgerClaim, definition: HumanFieldDefinition): number {
  const base = baseFieldId(claim.fieldId);
  let score = 0;
  if (claim.entityType === 'Spot') score += 40;
  if (claim.fieldId.endsWith(':ja')) score += 30;
  if (definition.key === 'name' && base === 'information_name') score += 50;
  if (claim.displayedValue) score += 20;
  if (claim.canonicalValue) score += 10;
  if (claim.primarySource) score += 5;
  score += STATUS_PRIORITY[claim.verification];
  return score;
}

function headlineStatus(statuses: readonly LedgerVerification[]): LedgerVerification {
  if (statuses.length === 0) return 'unknown';
  return statuses.reduce<LedgerVerification>(
    (current, status) => STATUS_PRIORITY[status] > STATUS_PRIORITY[current] ? status : current,
    'verified',
  );
}

function preferredEntityName(
  claims: readonly LedgerClaim[],
  type: CurrentProductFactualEntityType,
): string | undefined {
  const counts = new Map<string, number>();
  for (const claim of claims) {
    if (claim.entityType !== type) continue;
    counts.set(claim.entityName, (counts.get(claim.entityName) ?? 0) + 1);
  }
  return [...counts]
    .sort(([leftName, leftCount], [rightName, rightCount]) =>
      rightCount - leftCount || leftName.localeCompare(rightName))
    .at(0)?.[0];
}

function buildFacts(claims: readonly LedgerClaim[]): HumanDataReviewFact[] {
  const candidates = new Map<string, { claim: LedgerClaim; definition: HumanFieldDefinition }>();
  for (const claim of claims) {
    if (claim.verification === 'unknown' || !preferredValueFor(claim)) continue;
    const definition = fieldDefinition(claim);
    if (!definition) continue;
    const current = candidates.get(definition.key);
    const score = candidateScore(claim, definition);
    if (!current) {
      candidates.set(definition.key, { claim, definition });
      continue;
    }
    const currentScore = candidateScore(current.claim, definition);
    if (
      score > currentScore
      || (score === currentScore && claim.claimId.localeCompare(current.claim.claimId) < 0)
    ) {
      candidates.set(definition.key, { claim, definition });
    }
  }

  return [...candidates.values()]
    .sort((left, right) =>
      left.definition.order - right.definition.order
      || left.definition.key.localeCompare(right.definition.key),
    )
    .map(({ claim, definition }) => ({
      fieldKey: definition.key,
      label: definition.label,
      canonicalValue: claim.canonicalValue,
      displayedValue: claim.displayedValue,
      comparedPresentationClaimId: claim.comparedPresentationClaimId,
      comparedPresentationValue: claim.comparedPresentationValue,
      status: claim.verification,
      claimIds: [claim.claimId],
      sourceName: claim.primarySource,
      sourceUrl: claim.primarySourceUrl,
      retrievedAt: claim.retrievedAt,
      finding: claim.finding,
    }));
}

function buildUnknowns(claims: readonly LedgerClaim[]): HumanDataReviewUnknown[] {
  const candidates = new Map<string, { definition: HumanFieldDefinition; claims: LedgerClaim[] }>();
  for (const claim of claims) {
    if (claim.verification !== 'unknown') continue;
    const definition = fieldDefinition(claim);
    if (!definition) continue;
    const current = candidates.get(definition.key) ?? { definition, claims: [] };
    current.claims.push(claim);
    candidates.set(definition.key, current);
  }

  return [...candidates.values()]
    .sort((left, right) =>
      left.definition.order - right.definition.order
      || left.definition.key.localeCompare(right.definition.key),
    )
    .map((candidate) => {
    const { definition } = candidate;
    const sortedClaims = [...candidate.claims].sort((left, right) =>
      left.claimId.localeCompare(right.claimId),
    );
    return {
      fieldKey: definition.key,
      label: definition.label,
      claimIds: sortedClaims.map((claim) => claim.claimId),
      note: sortedClaims.find((claim) => claim.note)?.note,
    };
  });
}

function buildSources(claims: readonly LedgerClaim[]): HumanDataReviewSource[] {
  const sources = new Map<string, HumanDataReviewSource>();
  for (const claim of claims) {
    if (!claim.primarySource) continue;
    const coordinateProvider = baseFieldId(claim.fieldId) === 'coordinates';
    const key = `${coordinateProvider ? 'coordinates' : 'venue'}\u0000${claim.primarySourceUrl ?? ''}\u0000${claim.primarySource}`;
    const current = sources.get(key);
    if (!current) {
      sources.set(key, {
        name: claim.primarySource,
        url: claim.primarySourceUrl,
        sourceType: claim.primarySourceType,
        retrievedAt: claim.retrievedAt,
        status: claim.verification,
        coordinateProvider,
        claimIds: [claim.claimId],
      });
      continue;
    }
    const claimIds = [...current.claimIds, claim.claimId].sort();
    sources.set(key, {
      ...current,
      sourceType: current.sourceType ?? claim.primarySourceType,
      retrievedAt: [current.retrievedAt, claim.retrievedAt].filter(Boolean).sort().at(-1),
      status: headlineStatus([current.status, claim.verification]),
      claimIds,
    });
  }

  return [...sources.values()].sort((left, right) => {
    if (left.coordinateProvider !== right.coordinateProvider) {
      return left.coordinateProvider ? 1 : -1;
    }
    return `${left.name}\u0000${left.url ?? ''}`.localeCompare(`${right.name}\u0000${right.url ?? ''}`);
  });
}

function buildReferences(claims: readonly LedgerClaim[]): HumanDataReviewReference[] {
  const references = new Map<string, HumanDataReviewReference>();
  for (const reference of claims.flatMap((claim) => claim.issues)) {
    const pullRequest = /^PR #(\d+)$/.exec(reference);
    const issue = /^#(\d+)$/.exec(reference);
    if (pullRequest) {
      references.set(reference, {
        label: reference,
        href: `https://github.com/nurockplayer/tokyo-mogu-mogu/pull/${pullRequest[1]}`,
      });
    } else if (issue) {
      references.set(reference, {
        label: reference,
        href: `https://github.com/nurockplayer/tokyo-mogu-mogu/issues/${issue[1]}`,
      });
    }
  }
  return [...references.values()].sort((left, right) => left.label.localeCompare(right.label));
}

function evidenceForEntity(
  entityId: string,
  claimIds: ReadonlySet<string>,
  evidence: readonly DataVerificationEvidence[],
): DataVerificationEvidence[] {
  return evidence
    .filter((item) => item.entityId === entityId && item.claimIds.some((claimId) => claimIds.has(claimId)))
    .map((item) => ({ ...item, claimIds: [...item.claimIds] }))
    .sort((left, right) => left.evidenceId.localeCompare(right.evidenceId));
}

function omissionsForEntity(
  entityId: string,
  claimIds: ReadonlySet<string>,
  omissions: readonly DataVerificationEvidenceOmission[],
): DataVerificationEvidenceOmission[] {
  return omissions
    .filter((item) => item.entityId === entityId && item.claimIds.some((claimId) => claimIds.has(claimId)))
    .map((item) => ({ ...item, claimIds: [...item.claimIds] }))
    .sort((left, right) => left.omissionId.localeCompare(right.omissionId));
}

/**
 * Build the deterministic team projection from current Product identity,
 * Ledger claims, and evidence authority.
 */
export function buildHumanDataReviewBoard(input: HumanDataReviewBoardInput): HumanDataReviewBoard {
  const currentEntityTypes = new Map<string, CurrentProductFactualEntityType>();
  for (const entity of input.currentProductEntities) {
    const currentType = currentEntityTypes.get(entity.id);
    if (currentType && currentType !== entity.type) {
      throw new Error(`Current Product entity ${entity.id} has multiple review types.`);
    }
    currentEntityTypes.set(entity.id, entity.type);
  }

  const entities = [...currentEntityTypes]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([entityId, type]): HumanDataReviewEntity => {
    const projectionClaims = input.claims.filter((claim) => claim.entityId === entityId);
    const claimIds = new Set(projectionClaims.map((claim) => claim.claimId));
    const facts = buildFacts(projectionClaims);
    const unknowns = buildUnknowns(projectionClaims);
    const statuses = [
      ...facts.map((fact) => fact.status),
      ...unknowns.map((): LedgerVerification => 'unknown'),
    ];
    const nameFact = facts.find((fact) => fact.fieldKey === 'name');
    const name = nameFact?.displayedValue
      ?? nameFact?.canonicalValue
      ?? preferredEntityName(projectionClaims, type)
      ?? projectionClaims.find((claim) => claim.entityName)?.entityName
      ?? entityId;
    const relevantDates = projectionClaims.map((claim) => claim.retrievedAt).filter((date): date is string => Boolean(date));
    const needsConfirmationCount = facts.filter((fact) => fact.status === 'needs_confirmation').length;
    const staleCount = facts.filter((fact) => fact.status === 'stale').length;
    const conflictCount = facts.filter((fact) => fact.status === 'conflict').length;
    const unresolvedCount = needsConfirmationCount + staleCount + conflictCount + unknowns.length;

    return {
      id: entityId,
      type,
      name,
      headlineStatus: headlineStatus(statuses),
      latestRetrievedAt: relevantDates.sort().at(-1),
      unresolvedCount,
      needsConfirmationCount,
      staleCount,
      unknownCount: unknowns.length,
      conflictCount,
      facts,
      unknowns,
      sources: buildSources(projectionClaims),
      evidence: evidenceForEntity(entityId, claimIds, input.evidenceManifest.evidence),
      omissions: omissionsForEntity(entityId, claimIds, input.evidenceManifest.omissions),
      references: buildReferences(projectionClaims),
    };
  });

  const entityTypeCounts: Record<CurrentProductFactualEntityType, number> = {
    Spot: 0,
    Story: 0,
    Route: 0,
  };
  const statusCounts: Record<LedgerVerification, number> = {
    verified: 0,
    needs_confirmation: 0,
    stale: 0,
    conflict: 0,
    unknown: 0,
    demo: 0,
  };
  for (const entity of entities) {
    entityTypeCounts[entity.type] += 1;
    for (const fact of entity.facts) statusCounts[fact.status] += 1;
    statusCounts.unknown += entity.unknowns.length;
  }

  return { entities, entityTypeCounts, statusCounts };
}

/** Render a copyable Japanese summary from an already-built Board entity. */
export function createDataReviewShareSummaryJa(
  entity: HumanDataReviewEntity,
  detailUrl: string,
): string {
  const unresolvedLabels = [
    ...entity.facts.filter((fact) => UNRESOLVED_STATUSES.has(fact.status)).map((fact) => fact.label),
    ...entity.unknowns.map((field) => field.label),
  ];
  const unresolved = unresolvedLabels.length === 0
    ? '未解決項目なし'
    : `未確認・要対応 ${unresolvedLabels.length}件（${unresolvedLabels.slice(0, 4).join('、')}${unresolvedLabels.length > 4 ? ' ほか' : ''}）`;

  return [
    `【データ確認】${entity.name}`,
    `状態: ${DATA_REVIEW_STATUS_LABELS_JA[entity.headlineStatus]}`,
    unresolved,
    `最終確認: ${entity.latestRetrievedAt ?? '未確認'}`,
    `詳細: ${detailUrl}`,
  ].join('\n');
}
