import { useEffect, useMemo, useState } from 'react';
import { places } from '../data';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { CURRENT_PRODUCT_FACTUAL_INVENTORY } from '../lib/current-product-factual-inventory';
import type { LedgerVerification } from '../lib/data-verification-ledger';
import { buildRepositoryLedgerClaims } from '../lib/data-verification-ledger';
import {
  buildHumanDataReviewBoard,
  createDataReviewShareSummaryJa,
  dataReviewStatusLabelJa,
  DATA_REVIEW_STATUS_LABELS_JA,
  type HumanDataReviewEntity,
  type HumanDataReviewDecisionItem,
  type HumanDataReviewFact,
  type HumanDataReviewSource,
} from '../lib/human-data-review-board';
import { dataReviewEvidenceAssetUrl } from './evidence-assets';
import {
  COMPETITION_RULES_AUTHORITY,
  PROJECT_ASSET_RIGHTS_MANIFEST,
  SUBMISSION_RIGHTS_STATUS_LABELS_JA,
  assessProjectAssetRights,
  buildProjectAssetRightsSummary,
  buildSubmissionReadinessChecks,
  type ProjectAssetAllowedScope,
  type SubmissionRightsStatus,
} from '../lib/submission-rights';

type ReviewFilter = 'all' | 'needs_confirmation' | 'conflict' | 'unknown';

const FILTERS: readonly { id: ReviewFilter; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'needs_confirmation', label: '人の確認待ち' },
  { id: 'conflict', label: '矛盾' },
  { id: 'unknown', label: '根拠未登録' },
] as const;

const STATUS_ORDER: readonly LedgerVerification[] = [
  'conflict',
  'stale',
  'needs_confirmation',
  'unknown',
  'demo',
  'verified',
];

const SOURCE_TYPE_JA: Readonly<Record<NonNullable<HumanDataReviewSource['sourceType']>, string>> = {
  open_data: 'オープンデータ',
  fieldwork: '現地調査',
  official_web: '公式Web',
  business: '事業者情報',
  manual: '手動記録',
  demo: 'デモ',
};

const ENTITY_TYPE_LABELS_JA = {
  Spot: 'Spot',
  Story: 'Story',
  Route: 'Route',
} as const;
const ENTITY_TYPE_ORDER = ['Spot', 'Story', 'Route'] as const;

const FACT_SOURCE_ROLE_JA: Readonly<Record<HumanDataReviewFact['sources'][number]['role'], string>> = {
  content: '内容の根拠',
  address: '住所の根拠',
  coordinates: '位置情報の根拠',
};

const board = buildHumanDataReviewBoard({
  claims: buildRepositoryLedgerClaims(),
  currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
  evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
  places,
});

const assetRightsSummary = buildProjectAssetRightsSummary(PROJECT_ASSET_RIGHTS_MANIFEST);
const submissionReadinessChecks = buildSubmissionReadinessChecks(
  board.entities.flatMap((entity) => entity.sources),
);

const ASSET_SCOPE_JA: Readonly<Record<ProjectAssetAllowedScope, string>> = {
  project_demo: 'プロジェクトデモ',
  hackathon_submission: '大会提出',
  public_web: '公開Web',
  commercial: '商用',
};

const ASSET_ORIGIN_JA = {
  team_created: 'チーム作成',
  fieldwork: '現地調査',
  figma_team: 'チームFigma',
  licensed: 'ライセンス素材',
  ai_generated: 'AI生成',
  third_party: '第三者素材',
  unknown: '未確認',
} as const;

const ASSET_AI_JA = {
  none: 'AI利用なし',
  generated: 'AI生成',
  composited: '合成',
  unknown: '未申告',
} as const;

const SOURCE_MATERIAL_RIGHTS_JA = {
  documented: '元素材の権利記録あり',
  not_applicable: '元素材なし',
  unknown: '元素材の権利未確認',
} as const;

function selectedEntityId(): string | undefined {
  const value = window.location.hash.slice(1);
  return value || undefined;
}

function matchesFilter(entity: HumanDataReviewEntity, filter: ReviewFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'conflict') return entity.conflictCount > 0;
  if (filter === 'unknown') return entity.unknownCount > 0;
  return entity.facts.some(
    (fact) => fact.status === 'needs_confirmation' || fact.status === 'stale',
  );
}

function detailUrl(entityId: string): string {
  return `${window.location.origin}/data-review/#${entityId}`;
}

function statusClass(status: LedgerVerification): string {
  return `drb-status drb-status--${status.replace('_', '-')}`;
}

function rightsStatusClass(status: SubmissionRightsStatus): string {
  return `drb-rights-status drb-rights-status--${status.replace('_', '-')}`;
}

function humanOmissionReason(reason: string): string {
  if (/Google Maps|map-provider/i.test(reason)) {
    return '地図サービスの画像は再利用せず、位置情報の提供元と参照URLだけを記録しています。';
  }
  if (/unauthorized reproduction|direct image linking/i.test(reason)) {
    return 'サイトが無断転載や画像への直接リンクを禁止しているため、参照元だけを記録し画像は保存していません。';
  }
  if (/All Rights Reserved/i.test(reason)) {
    return 'サイトの権利表示が All Rights Reserved のため、再利用許可を確認できず画像を保存していません。';
  }
  if (/reuse/i.test(reason)) {
    return 'リポジトリでの再利用許可を確認できないため、参照元だけを記録し画像は保存していません。';
  }
  return reason;
}

function FactValue({ fact }: { fact: HumanDataReviewFact }) {
  if (fact.finding === 'mismatch') {
    return (
      <div className="drb-fact__comparison" data-finding={fact.finding}>
        <strong>表示差異あり（レビュー対象）</strong>
        <dl>
          <div><dt>正本</dt><dd>{fact.canonicalValue ?? '記録なし'}</dd></div>
          <div><dt>現在の表示</dt><dd>{fact.displayedValue ?? '記録なし'}</dd></div>
        </dl>
      </div>
    );
  }
  if (fact.finding === 'presentation_mismatch') {
    return (
      <div className="drb-fact__comparison" data-finding={fact.finding}>
        <strong>表示差異あり（レビュー対象）</strong>
        <dl>
          <div><dt>現在の表示</dt><dd>{fact.displayedValue ?? '記録なし'}</dd></div>
          <div><dt>比較対象の表示</dt><dd>{fact.comparedPresentationValue ?? '記録なし'}</dd></div>
        </dl>
      </div>
    );
  }
  return (
    <span className="drb-fact__value">
      {fact.displayedValue ?? fact.canonicalValue}
    </span>
  );
}

function FactTraceability({ fact }: { fact: HumanDataReviewFact }) {
  if (fact.sources.length === 0 && fact.affectedSurfaces.length === 0) return null;

  return (
    <details className="drb-fact__traceability">
      <summary>根拠を見る</summary>
      <div className="drb-fact__traceability-content">
        {fact.sources.length > 0 && (
          <div className="drb-fact__sources" aria-label={`${fact.label}の根拠`}>
            <small>この項目の根拠</small>
            <div>
              {fact.sources.map((source) => (
                <article key={source.claimId} className="drb-fact-source">
                  <span>
                    {source.relationship === 'source_statement' ? '出典別の記載' : FACT_SOURCE_ROLE_JA[source.role]}
                  </span>
                  {source.url
                    ? <a href={source.url} target="_blank" rel="noreferrer">{source.name}</a>
                    : <strong>{source.name}</strong>}
                  {source.value && <p>{source.value}</p>}
                  <small>
                    {dataReviewStatusLabelJa(source.status, Boolean(source.retrievedAt))}
                    {' · '}出典確認 {source.retrievedAt ?? '未登録'}
                    {source.confirmedAt && <> · 人による確認 {source.confirmedAt}</>}
                  </small>
                </article>
              ))}
            </div>
          </div>
        )}
        {fact.affectedSurfaces.length > 0 && (
          <div className="drb-fact__surfaces" aria-label={`${fact.label}の確認対象画面`}>
            <small>確認対象画面</small>
            <div>{fact.affectedSurfaces.map((surface) => <span key={surface}>{surface}</span>)}</div>
          </div>
        )}
      </div>
    </details>
  );
}

function DecisionLayer({ entity }: { entity: HumanDataReviewEntity }) {
  const context = entity.reviewContext;
  return (
    <section className="drb-panel drb-decision" aria-label="レビュー判断" aria-labelledby="decision-heading">
      <div className="drb-panel__heading drb-decision__heading">
        <span>DECISION QUEUE</span>
        <h2 id="decision-heading">{entity.decisionCount}件の判断が必要です</h2>
      </div>
      <div className="drb-decision__list">
        {context.decisionItems.length === 0 && (
          <p className="drb-decision__empty">現在、Product上の解釈や表示について判断が必要な項目はありません。</p>
        )}
        {context.decisionItems.map((item) => (
          <DecisionCard key={item.id} entity={entity} item={item} />
        ))}
      </div>
      <p className="drb-decision__note">
        確認状態そのものではなく、現在のProduct表示・解釈に判断が必要な項目だけを表示しています。
      </p>
    </section>
  );
}

function DecisionCard({ entity, item }: { entity: HumanDataReviewEntity; item: HumanDataReviewDecisionItem }) {
  const facts = item.factFieldKeys
    .map((fieldKey) => entity.facts.find((fact) => fact.fieldKey === fieldKey))
    .filter((fact): fact is HumanDataReviewFact => Boolean(fact));
  const primaryFact = facts[0];
  const sources = [...new Map(
    facts.flatMap((fact) => fact.sources).map((source) => [source.claimId, source]),
  ).values()];
  const directSources = sources.filter((source) => source.origin === 'source'
    && (item.kind !== 'comparison' || item.directEvidenceClaimIds?.includes(source.claimId)));
  const comparisonSideLabel = primaryFact?.finding === 'presentation_mismatch'
    ? '比較対象のProduct表示'
    : primaryFact?.finding === 'canonical_missing'
      ? '根拠側の情報'
      : item.comparisonProvenance === 'source'
        ? '公式/根拠側の情報'
        : item.comparisonProvenance === 'editorial'
          ? '編集上の情報（未検証）'
          : item.comparisonProvenance === 'demo'
            ? 'デモ用の情報'
            : '比較対象の情報';

  return (
    <article className="drb-decision-card" aria-label={`${item.label}の判断`} data-decision-kind={item.kind}>
      <div className="drb-decision-card__topline">
        <span>{item.statusLabel}</span>
        <strong>{item.recommendationLabel}</strong>
      </div>
      <h3>{item.label}</h3>

      {item.kind === 'comparison' && primaryFact && (
        <dl className="drb-decision-card__comparison">
          <div>
            <dt>現在のProduct表示</dt>
            <dd>{primaryFact.displayedValue ?? '表示なし'}</dd>
          </div>
          <div>
            <dt>{comparisonSideLabel}</dt>
            <dd>{primaryFact.finding === 'presentation_mismatch'
              ? primaryFact.comparedPresentationValue ?? '表示なし'
              : primaryFact.canonicalValue ?? '記録なし'}</dd>
          </div>
        </dl>
      )}

      {item.kind === 'conflict' && primaryFact?.displayedValue && (
        <div className="drb-decision-card__current">
          <span>現在のProduct表示</span>
          <p>{primaryFact.displayedValue}</p>
        </div>
      )}

      {(item.kind === 'mobile_behavior' || item.kind === 'current_information' || item.kind === 'stale_information')
        && facts.length > 0 && (
          <ul className="drb-decision-card__fields">
            {facts.map((fact) => (
              <li key={fact.fieldKey}>
                <strong>{fact.label}</strong>
                {fact.displayedValue && <span>{fact.displayedValue}</span>}
              </li>
            ))}
          </ul>
      )}

      <p className="drb-decision-card__reason">{item.reason}</p>
      <div className="drb-decision-card__recommendation">
        <span>期待する扱い</span>
        <p>{item.recommendation}</p>
      </div>

      <div className="drb-decision-card__meta">
        <div className="drb-decision__surfaces" aria-label={`${item.label}の影響するProduct画面`}>
          <small>影響するProduct画面</small>
          <div>{item.affectedSurfaces.map((surface) => <span key={surface}>{surface}</span>)}</div>
        </div>
        {directSources.length > 0 && (
          <div className="drb-decision-card__sources" aria-label={`${item.label}の直接の根拠`}>
            <small>直接の根拠</small>
            {directSources.map((source) => (
              <div key={source.claimId}>
                {source.url
                  ? <a href={source.url} target="_blank" rel="noreferrer">{source.name}</a>
                  : <strong>{source.name}</strong>}
                {source.relationship === 'source_statement' && source.value && <p>{source.value}</p>}
                <span>出典確認日 {source.retrievedAt ?? '未登録'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Overview({ onSelect }: { onSelect: (entityId: string) => void }) {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const entities = board.entities.filter((entity) => matchesFilter(entity, filter));

  return (
    <main className="drb-shell">
      <header className="drb-hero">
        <div>
          <p className="drb-eyebrow">TOKYO MOGU MOGU · TEAM REVIEW</p>
          <h1>Human Data Review Board</h1>
          <p className="drb-hero__lead">
            いま分かっていること、確認が必要なこと、まだ分からないことを、
            同じ構造化データから読みやすくまとめています。
          </p>
        </div>
        <aside className="drb-boundary" aria-label="このボードの位置づけ">
          <span>READ ONLY</span>
          <strong>ここは事実の保存場所ではありません</strong>
          <p>正本は canonical data・Ledger・evidence manifest です。</p>
        </aside>
      </header>

      <CompetitionRulesPanel />
      <SubmissionReadinessPanel />

      <section className="drb-summary" aria-labelledby="summary-heading">
        <div className="drb-section-heading">
          <p>STATUS SNAPSHOT</p>
          <h2 id="summary-heading">確認状況</h2>
        </div>
        <div className="drb-summary__grid">
          {STATUS_ORDER.map((status) => (
            <article key={status} className={`drb-summary-card drb-summary-card--${status}`}>
              <span>{DATA_REVIEW_STATUS_LABELS_JA[status]}</span>
              <strong>{board.statusCounts[status]}</strong>
              <small>項目</small>
            </article>
          ))}
        </div>
        <div className="drb-coverage" aria-label="現在のProduct確認対象">
          <strong>現在のProduct確認対象 {board.entities.length}件</strong>
          {ENTITY_TYPE_ORDER.map((type) => (
            <span key={type}>{ENTITY_TYPE_LABELS_JA[type]} {board.entityTypeCounts[type]}件</span>
          ))}
        </div>
        <p className="drb-legend">
          <strong>「人の確認待ち」</strong>は人による確認が未完了の状態です。
          出典確認日がある項目だけを「出典確認済み」と表示し、出典がなければ「出典未登録」と表示します。
        </p>
      </section>

      <section className="drb-entities" aria-labelledby="entities-heading">
        <div className="drb-section-heading drb-section-heading--row">
          <div>
            <p>ENTITY QUEUE</p>
            <h2 id="entities-heading">確認対象</h2>
          </div>
          <div className="drb-filters" aria-label="確認対象を絞り込む">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? 'is-active' : undefined}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="drb-entity-list">
          {entities.map((entity) => (
            <button
              key={entity.id}
              type="button"
              className={`drb-entity-card drb-entity-card--${entity.headlineStatus}`}
              aria-label={`${entity.name}の詳細を見る`}
              onClick={() => onSelect(entity.id)}
            >
              <span className="drb-entity-card__signal" aria-hidden="true" />
              <span className="drb-entity-card__body">
                <span className={statusClass(entity.headlineStatus)}>
                  {dataReviewStatusLabelJa(entity.headlineStatus, entity.needsConfirmationSourceChecked)}
                </span>
                <strong>{entity.name}</strong>
                <span className="drb-entity-card__meta">
                  {ENTITY_TYPE_LABELS_JA[entity.type]} · 最新出典確認 {entity.latestRetrievedAt ?? '未登録'} · 未解決 {entity.unresolvedCount}件
                </span>
              </span>
              <span className="drb-entity-card__counts">
                <span><b>{entity.needsConfirmationCount}</b> 人待ち</span>
                <span><b>{entity.staleCount}</b> 情報が古い</span>
                <span><b>{entity.unknownCount}</b> 根拠なし</span>
                <span><b>{entity.conflictCount}</b> 矛盾</span>
                <span><b>{entity.evidence.length}</b> アプリ証拠</span>
              </span>
              <span className="drb-entity-card__arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function CompetitionRulesPanel() {
  return (
    <section className="drb-rules" aria-labelledby="competition-rules-heading">
      <div className="drb-section-heading drb-section-heading--row">
        <div>
          <p>COMPETITION AUTHORITY</p>
          <h2 id="competition-rules-heading">大会ルール・提出権利チェック</h2>
        </div>
        <span className="drb-rules__checked">公式情報確認 {COMPETITION_RULES_AUTHORITY.checkedAt}</span>
      </div>
      <div className="drb-rules__sources" aria-label="大会ルールの公式情報">
        {COMPETITION_RULES_AUTHORITY.sources.map((source) => (
          <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>
        ))}
      </div>
      <p className="drb-rules__version">{COMPETITION_RULES_AUTHORITY.versionNote}</p>
      <div className="drb-rules__grid">
        {COMPETITION_RULES_AUTHORITY.rules.map((rule) => (
          <article key={rule.id}>
            <span>{rule.authority === 'both' ? '募集要項 + ガイド' : rule.authority === 'guidebook' ? '参加者ガイド' : '募集要項'}</span>
            <h3>{rule.label}</h3>
            <p>{rule.summary}</p>
          </article>
        ))}
      </div>
      <p className="drb-rules__disclaimer">{COMPETITION_RULES_AUTHORITY.disclaimer}</p>
    </section>
  );
}

function SubmissionReadinessPanel() {
  return (
    <section className="drb-submission" aria-labelledby="submission-readiness-heading">
      <div className="drb-section-heading drb-section-heading--row">
        <div>
          <p>SUBMISSION READINESS</p>
          <h2 id="submission-readiness-heading">提出準備は未完了です</h2>
        </div>
        <span className={rightsStatusClass('blocked')}>不明な権利はfail closed</span>
      </div>

      <div className="drb-rights-summary" aria-label="アセット権利確認状況">
        {(['ready', 'needs_confirmation', 'blocked'] as const).map((status) => (
          <article key={status}>
            <span className={rightsStatusClass(status)}>{SUBMISSION_RIGHTS_STATUS_LABELS_JA[status]}</span>
            <strong>{assetRightsSummary.fileCounts[status]}</strong>
            <small>ファイル · {assetRightsSummary.groupCounts[status]}グループ</small>
          </article>
        ))}
      </div>

      <div className="drb-readiness-checks" aria-label="提出前の確認事項">
        {submissionReadinessChecks.map((check) => (
          <article key={check.id}>
            <span className={rightsStatusClass(check.status)}>
              {SUBMISSION_RIGHTS_STATUS_LABELS_JA[check.status]}
            </span>
            <h3>{check.label}</h3>
            <p>{check.summary}</p>
          </article>
        ))}
      </div>

      <details className="drb-asset-queue">
        <summary>プロジェクトアセット権利キューを見る（{PROJECT_ASSET_RIGHTS_MANIFEST.length}グループ）</summary>
        <div className="drb-asset-queue__list">
          {PROJECT_ASSET_RIGHTS_MANIFEST.map((item) => {
            const status = assessProjectAssetRights(item);
            return (
              <article key={item.id} className="drb-asset-group">
                <div className="drb-asset-group__heading">
                  <div>
                    <span className={rightsStatusClass(status)}>{SUBMISSION_RIGHTS_STATUS_LABELS_JA[status]}</span>
                    <h3>{item.label}</h3>
                  </div>
                  <strong>{item.paths.length}ファイル</strong>
                </div>
                <p>{item.note}</p>
                <dl>
                  <dt>由来</dt><dd>{ASSET_ORIGIN_JA[item.origin]}</dd>
                  <dt>権利根拠</dt><dd>{item.permissionBasis ?? '未登録'}</dd>
                  <dt>帰属表示</dt><dd>{item.attribution}</dd>
                  <dt>許可済み範囲</dt>
                  <dd>{item.allowedScopes.length > 0
                    ? item.allowedScopes.map((scope) => ASSET_SCOPE_JA[scope]).join(' / ')
                    : '未登録'}</dd>
                  <dt>AI / 元素材</dt><dd>{ASSET_AI_JA[item.aiUse]} / {SOURCE_MATERIAL_RIGHTS_JA[item.sourceMaterialRights]}</dd>
                </dl>
                {item.paths.length > 0 && (
                  <details className="drb-asset-paths">
                    <summary>対象パス {item.paths.length}件</summary>
                    <ul>{item.paths.map((path) => <li key={path}><code>{path}</code></li>)}</ul>
                  </details>
                )}
                <div className="drb-asset-group__links">
                  {item.supportingLinks.map((link) => link.startsWith('http')
                    ? <a key={link} href={link} target="_blank" rel="noreferrer">根拠リンク ↗</a>
                    : <code key={link}>{link}</code>)}
                </div>
              </article>
            );
          })}
        </div>
      </details>
    </section>
  );
}

function SourceCard({ source }: { source: HumanDataReviewSource }) {
  const evidenceLabel = source.evidenceState === 'captured'
    ? '出典証拠を保存済み'
    : source.evidenceState === 'omitted'
      ? '権利上の理由で保存せず'
      : '出典画像の保存記録なし';
  return (
    <article className={source.coordinateProvider ? 'drb-source drb-source--coordinates' : 'drb-source'}>
      <div className="drb-source__topline">
        <span>{source.coordinateProvider ? '位置情報の出典' : '内容の出典'}</span>
        <span className={statusClass(source.status)}>
          {dataReviewStatusLabelJa(source.status, Boolean(source.retrievedAt))}
        </span>
      </div>
      <strong>{source.name}</strong>
      <dl>
        {source.sourceType && <><dt>種別</dt><dd>{SOURCE_TYPE_JA[source.sourceType]}</dd></>}
        <dt>ライセンス / 再利用</dt>
        <dd>{source.license ?? '未登録 — 提出・公開利用前に確認'}</dd>
        <dt>提出権利</dt>
        <dd><span className={rightsStatusClass(source.rightsStatus)}>{SUBMISSION_RIGHTS_STATUS_LABELS_JA[source.rightsStatus]}</span></dd>
        <dt>出典証拠</dt><dd>{evidenceLabel}</dd>
        <dt>出典確認日</dt><dd>{source.retrievedAt ?? '未登録'}</dd>
        {source.confirmedAt && <><dt>人による確認日</dt><dd>{source.confirmedAt}</dd></>}
      </dl>
      {source.evidenceState === 'omitted' && source.evidenceNote && (
        <p className="drb-source__evidence-note">{humanOmissionReason(source.evidenceNote)}</p>
      )}
      {source.url && <a href={source.url} target="_blank" rel="noreferrer">参照元を開く ↗</a>}
    </article>
  );
}

function Detail({ entity, onBack }: { entity: HumanDataReviewEntity; onBack: () => void }) {
  const summary = useMemo(
    () => createDataReviewShareSummaryJa(entity, detailUrl(entity.id)),
    [entity],
  );
  const [copied, setCopied] = useState(false);

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="drb-shell drb-detail">
      <button type="button" className="drb-back" onClick={onBack}>← 一覧へ戻る</button>
      <header className="drb-detail-hero">
        <div>
          <p className="drb-eyebrow">ENTITY DETAIL · {entity.id}</p>
          <h1>{entity.name}</h1>
          <span className={statusClass(entity.headlineStatus)}>
            {dataReviewStatusLabelJa(entity.headlineStatus, entity.needsConfirmationSourceChecked)}
          </span>
        </div>
        <dl className="drb-detail-hero__stats">
          <div><dt>判断が必要</dt><dd>{entity.decisionCount}件</dd></div>
          <div><dt>最新出典確認</dt><dd>{entity.latestRetrievedAt ?? '未登録'}</dd></div>
          <div><dt>人による確認</dt><dd>{entity.latestConfirmedAt ?? '未確認'}</dd></div>
          <div><dt>アプリ証拠</dt><dd>{entity.evidence.length}件</dd></div>
        </dl>
      </header>

      <div className="drb-detail-grid">
        <div className="drb-detail-main">
          <DecisionLayer entity={entity} />

          <section className="drb-panel" aria-labelledby="known-heading">
            <div className="drb-panel__heading"><span>01</span><h2 id="known-heading">現在確認できる情報</h2></div>
            <p className="drb-panel__note">出典・確認状態はProduct上の判断要否とは別に記録しています。監査上の未解決は {entity.unresolvedCount}件です。</p>
            <div className="drb-facts" role="table" aria-label="現在わかっていること">
              <div className="drb-facts__header" role="row">
                <span role="columnheader">項目</span><span role="columnheader">値 / 比較</span><span role="columnheader">状態 / 出典確認日</span>
              </div>
              {entity.facts.length === 0 && <p className="drb-empty">構造化された現在値はまだありません。</p>}
              {entity.facts.map((fact) => (
                <div className="drb-fact" role="row" key={fact.fieldKey}>
                  <strong role="cell">{fact.label}</strong>
                  <div role="cell" className="drb-fact__detail">
                    <FactValue fact={fact} />
                    <FactTraceability fact={fact} />
                  </div>
                  <span role="cell" className="drb-fact__status">
                    <span className={statusClass(fact.status)}>
                      {dataReviewStatusLabelJa(fact.status, fact.sourceChecked)}
                    </span>
                    <small>出典確認 {fact.retrievedAt ?? '未登録'}</small>
                    {fact.confirmedAt && <small>人による確認 {fact.confirmedAt}</small>}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="drb-panel" aria-labelledby="unknown-heading">
            <div className="drb-panel__heading"><span>02</span><h2 id="unknown-heading">未確認のためProductで保証しない情報</h2></div>
            <p className="drb-panel__note">現在の根拠では確認できないため、推測して表示しません。</p>
            <ul className="drb-unknowns">
              {entity.unknowns.length === 0 && <li className="drb-empty">記録された未確認項目はありません。</li>}
              {entity.unknowns.map((field) => (
                <li key={field.fieldKey}><strong>{field.label}</strong></li>
              ))}
            </ul>
          </section>

          <section className="drb-panel" aria-labelledby="sources-heading">
            <div className="drb-panel__heading"><span>03</span><h2 id="sources-heading">出典・確認状況</h2></div>
            <div className="drb-sources">
              {entity.sources.length === 0 && <p className="drb-empty">記録された出典はありません。</p>}
              {entity.sources.map((source) => (
                <SourceCard key={`${source.coordinateProvider}:${source.name}:${source.url ?? ''}`} source={source} />
              ))}
            </div>
          </section>

          <section className="drb-panel" aria-labelledby="evidence-heading">
            <div className="drb-panel__heading"><span>04</span><h2 id="evidence-heading">アプリでの表示</h2></div>
            <p className="drb-panel__note">画像はレビュー証拠です。画像から事実や確認状態を推定しません。</p>
            <div className="drb-evidence-grid">
              {entity.evidence.length === 0 && <p className="drb-empty">保存されたアプリ証拠はありません。</p>}
              {entity.evidence.map((evidence) => (
                <figure key={evidence.evidenceId}>
                  <a href={dataReviewEvidenceAssetUrl(evidence.path)} target="_blank" rel="noreferrer">
                    <img
                      src={dataReviewEvidenceAssetUrl(evidence.path)}
                      alt={`${entity.name}のアプリ表示（${evidence.kind === 'app' ? `${evidence.locale}・${evidence.viewport.width}px` : evidence.kind}）`}
                    />
                  </a>
                  <figcaption>
                    {evidence.kind === 'app' ? `${evidence.locale} · ${evidence.viewport.width}px` : evidence.kind}
                    <span>{evidence.capturedAt}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="drb-panel" aria-labelledby="omissions-heading">
            <div className="drb-panel__heading"><span>05</span><h2 id="omissions-heading">証拠を保存していない理由</h2></div>
            <div className="drb-omissions">
              {entity.omissions.length === 0 && <p className="drb-empty">記録された証拠省略はありません。</p>}
              {entity.omissions.map((omission) => (
                <article key={omission.omissionId}>
                  <span>保存しない判断</span>
                  <p>{humanOmissionReason(omission.reason)}</p>
                  <a href={omission.sourceUrl} target="_blank" rel="noreferrer">対象の参照元 ↗</a>
                </article>
              ))}
            </div>
          </section>

          <section className="drb-panel" aria-labelledby="work-heading">
            <div className="drb-panel__heading"><span>06</span><h2 id="work-heading">関連する作業</h2></div>
            <div className="drb-references">
              {entity.references.length === 0 && <p className="drb-empty">関連する作業の記録はありません。</p>}
              {entity.references.map((reference) => (
                <a key={reference.label} href={reference.href} target="_blank" rel="noreferrer">{reference.label} ↗</a>
              ))}
            </div>
            <p className="drb-panel__note">Issue / PR は経緯を確認する場所です。事実の正本として読み込みません。</p>
          </section>
        </div>

        <aside className="drb-share">
          <p className="drb-eyebrow">SHARE NOTE</p>
          <h2>Slack共有用</h2>
          <pre aria-label="Slack共有用サマリー">{summary}</pre>
          <button type="button" onClick={copySummary}>{copied ? 'コピーしました' : 'サマリーをコピー'}</button>
          <small>自動投稿やWebhookは使用しません。</small>
        </aside>
      </div>
    </main>
  );
}

export function DataReviewBoardApp() {
  const [entityId, setEntityId] = useState(selectedEntityId);

  useEffect(() => {
    const onHashChange = () => setEntityId(selectedEntityId());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const entity = board.entities.find((candidate) => candidate.id === entityId);
  const selectEntity = (nextEntityId: string) => {
    window.location.hash = nextEntityId;
    setEntityId(nextEntityId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const showOverview = () => {
    history.pushState(null, '', '/data-review/');
    setEntityId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return entity
    ? <Detail entity={entity} onBack={showOverview} />
    : <Overview onSelect={selectEntity} />;
}
