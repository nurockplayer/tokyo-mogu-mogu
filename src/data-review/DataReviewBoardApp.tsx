import { useEffect, useMemo, useState } from 'react';
import { places } from '../data';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { CURRENT_PRODUCT_FACTUAL_INVENTORY } from '../lib/current-product-factual-inventory';
import type { LedgerVerification } from '../lib/data-verification-ledger';
import { buildRepositoryLedgerClaims } from '../lib/data-verification-ledger';
import {
  buildHumanDataReviewBoard,
  createDataReviewShareSummaryJa,
  DATA_REVIEW_STATUS_LABELS_JA,
  type HumanDataReviewEntity,
  type HumanDataReviewFact,
  type HumanDataReviewSource,
} from '../lib/human-data-review-board';
import { dataReviewEvidenceAssetUrl } from './evidence-assets';

type ReviewFilter = 'all' | 'needs_confirmation' | 'conflict' | 'unknown';

const FILTERS: readonly { id: ReviewFilter; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'needs_confirmation', label: '要確認' },
  { id: 'conflict', label: '矛盾' },
  { id: 'unknown', label: '未確認' },
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
    <div className="drb-fact__traceability">
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
                  {DATA_REVIEW_STATUS_LABELS_JA[source.status]} · {source.retrievedAt ?? '確認日なし'}
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
  );
}

function DecisionLayer({ entity }: { entity: HumanDataReviewEntity }) {
  const context = entity.reviewContext;
  return (
    <section className="drb-panel drb-decision" aria-label="レビュー判断" aria-labelledby="decision-heading">
      <div className="drb-panel__heading drb-decision__heading">
        <span>REVIEW FOCUS</span>
        <h2 id="decision-heading">レビュー判断</h2>
      </div>
      <div className="drb-decision__grid">
        <article>
          <h3>判断ポイント</h3>
          <ul>
            {context.reviewFocus.map((item) => <li key={item.id}>{item.label}</li>)}
          </ul>
        </article>
        <article>
          <h3>Productへの影響</h3>
          <ul>
            {context.productImpacts.map((item) => <li key={item.id}>{item.label}</li>)}
          </ul>
        </article>
        <article>
          <h3>確認対象画面</h3>
          <div className="drb-decision__surfaces">
            {context.affectedSurfaces.length === 0
              ? <p>現在の構造化メタデータに画面の紐づけはありません。</p>
              : context.affectedSurfaces.map((surface) => <span key={surface}>{surface}</span>)}
          </div>
        </article>
        <article>
          <h3>残っている不確実性</h3>
          <ul className="drb-decision__uncertainties">
            {context.uncertainties.length === 0 && <li>判断に関わる未解決項目はありません。</li>}
            {context.uncertainties.map((item) => (
              <li key={`${item.fieldKey}:${item.status}`}>
                <span className={statusClass(item.status)}>{DATA_REVIEW_STATUS_LABELS_JA[item.status]}</span>
                <strong>{item.label}</strong>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <p className="drb-decision__note">
        この判断情報は事実の正本ではなく、現在の構造化データとProduct利用関係から生成したレビュー用の見方です。
      </p>
    </section>
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
          <strong>「出典あり・要確認」</strong>は、出典が現在の内容を支えていても、
          ステークホルダー確認や現地確認が済んだことを意味しません。
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
                  {DATA_REVIEW_STATUS_LABELS_JA[entity.headlineStatus]}
                </span>
                <strong>{entity.name}</strong>
                <span className="drb-entity-card__meta">
                  {ENTITY_TYPE_LABELS_JA[entity.type]} · 最終確認 {entity.latestRetrievedAt ?? '未確認'} · 未解決 {entity.unresolvedCount}件
                </span>
              </span>
              <span className="drb-entity-card__counts">
                <span><b>{entity.needsConfirmationCount}</b> 要確認</span>
                <span><b>{entity.staleCount}</b> 要再確認</span>
                <span><b>{entity.unknownCount}</b> 未確認</span>
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

function SourceCard({ source }: { source: HumanDataReviewSource }) {
  return (
    <article className={source.coordinateProvider ? 'drb-source drb-source--coordinates' : 'drb-source'}>
      <div className="drb-source__topline">
        <span>{source.coordinateProvider ? '位置情報の出典' : '内容の出典'}</span>
        <span className={statusClass(source.status)}>{DATA_REVIEW_STATUS_LABELS_JA[source.status]}</span>
      </div>
      <strong>{source.name}</strong>
      <dl>
        {source.sourceType && <><dt>種別</dt><dd>{SOURCE_TYPE_JA[source.sourceType]}</dd></>}
        <dt>確認日</dt><dd>{source.retrievedAt ?? '未確認'}</dd>
      </dl>
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
            {DATA_REVIEW_STATUS_LABELS_JA[entity.headlineStatus]}
          </span>
        </div>
        <dl className="drb-detail-hero__stats">
          <div><dt>最終確認</dt><dd>{entity.latestRetrievedAt ?? '未確認'}</dd></div>
          <div><dt>未解決</dt><dd>{entity.unresolvedCount}件</dd></div>
          <div><dt>アプリ証拠</dt><dd>{entity.evidence.length}件</dd></div>
        </dl>
      </header>

      <div className="drb-detail-grid">
        <div className="drb-detail-main">
          <DecisionLayer entity={entity} />

          <section className="drb-panel" aria-labelledby="known-heading">
            <div className="drb-panel__heading"><span>01</span><h2 id="known-heading">現在わかっていること</h2></div>
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
                    <span className={statusClass(fact.status)}>{DATA_REVIEW_STATUS_LABELS_JA[fact.status]}</span>
                    <small>{fact.retrievedAt ?? '確認日なし'}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="drb-panel" aria-labelledby="unknown-heading">
            <div className="drb-panel__heading"><span>02</span><h2 id="unknown-heading">まだわからないこと</h2></div>
            <ul className="drb-unknowns">
              {entity.unknowns.length === 0 && <li className="drb-empty">記録された未確認項目はありません。</li>}
              {entity.unknowns.map((field) => (
                <li key={field.fieldKey}><span>?</span><strong>{field.label}</strong><small>構造化された根拠がまだありません</small></li>
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
