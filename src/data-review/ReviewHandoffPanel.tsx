import { useEffect, useMemo, useState } from 'react';
import { CONFIRMATION_REVIEW_PROGRESS } from '../data/confirmation-review-metadata';
import {
  currentReviewFieldSnapshots,
  serializeProductReviewHandoff,
  serializeStakeholderConfirmationHandoff,
  summarizeEntityConfirmationProgress,
  type ProductReviewOutcome,
  type ReviewFieldSnapshot,
  type StakeholderConfirmationOutcome,
} from '../lib/data-review-handoff';
import {
  emptyReviewHandoffDraft,
  isDirtyReviewHandoffDraft,
  type ProductReviewDraft,
  type ReviewHandoffDraft,
  type StakeholderConfirmationDraft,
} from '../lib/data-review-handoff-drafts';
import { dataReviewStatusLabelJa, type HumanDataReviewEntity } from '../lib/human-data-review-board';
import { stakeholderConfirmationApplicationGuidanceJa } from '../lib/stakeholder-review-packet';

const OUTCOME_LABELS: Readonly<Record<StakeholderConfirmationOutcome, string>> = {
  confirmed: '正しい',
  correction_required: '修正あり（提案として記録）',
  unknown: 'わからない',
  not_applicable: '対象外',
};

const SOURCE_RELATIONSHIP_LABELS: Readonly<Record<string, string>> = {
  primary: '主な記載',
  source_statement: '出典の記載',
};

const SOURCE_ORIGIN_LABELS: Readonly<Record<string, string>> = {
  source: '出典側',
  editorial: '編集上の記録',
  demo: 'デモ記録',
};

const SOURCE_TYPE_LABELS: Readonly<Record<string, string>> = {
  open_data: 'オープンデータ',
  fieldwork: '現地調査',
  official_web: '公式Web',
  business: '事業者情報',
  manual: '手動記録',
  demo: 'デモ',
};

function fieldStatusLabel(field: ReviewFieldSnapshot): string {
  return dataReviewStatusLabelJa(field.status, field.sources.some((source) => source.retrievedAt !== undefined));
}

function copyText(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText) return Promise.reject(new Error('クリップボードを利用できません。'));
  return navigator.clipboard.writeText(text);
}

export function ReviewHandoffPanel({
  entity,
  allEntities,
  draft,
  onDraftChange,
}: {
  entity: HumanDataReviewEntity;
  allEntities: readonly HumanDataReviewEntity[];
  draft?: ReviewHandoffDraft;
  onDraftChange: (draft: ReviewHandoffDraft) => void;
}) {
  const currentDraft = draft ?? emptyReviewHandoffDraft();
  const fields = useMemo(() => currentReviewFieldSnapshots(entity), [entity]);
  const allFields = useMemo(
    () => allEntities.flatMap((currentEntity) => currentReviewFieldSnapshots(currentEntity)),
    [allEntities],
  );
  const fieldLabels = new Map([
    ...entity.facts.map((fact) => [fact.fieldKey, fact.label] as const),
    ...entity.unknowns.map((field) => [field.fieldKey, field.label] as const),
  ]);
  const [productCopyMessage, setProductCopyMessage] = useState('');
  const [stakeholderCopyMessage, setStakeholderCopyMessage] = useState('');
  const [progress, setProgress] = useState<{ total: number; answered: number; confirmed: number; stale: number }>();
  const [fingerprintError, setFingerprintError] = useState('');

  useEffect(() => {
    let active = true;
    summarizeEntityConfirmationProgress(entity, CONFIRMATION_REVIEW_PROGRESS, allFields)
      .then((value) => { if (active) { setProgress(value); setFingerprintError(''); } })
      .catch(() => { if (active) { setProgress(undefined); setFingerprintError('確認進捗を検証できないため、保存済み進捗を表示できません。'); } });
    return () => { active = false; };
  }, [allFields, entity]);

  useEffect(() => {
    setProductCopyMessage('');
    setStakeholderCopyMessage('');
  }, [entity.id]);

  const updateProduct = (product: ProductReviewDraft) => { setProductCopyMessage(''); onDraftChange({ ...currentDraft, product }); };
  const updateStakeholder = (stakeholder: StakeholderConfirmationDraft) => { setStakeholderCopyMessage(''); onDraftChange({ ...currentDraft, stakeholder }); };
  const copyProduct = async () => {
    const item = currentDraft.product.decisionId === '__entity__'
      ? undefined
      : entity.reviewContext.decisionItems.find((candidate) => candidate.id === currentDraft.product.decisionId);
    if ((!item && currentDraft.product.decisionId !== '__entity__') || !currentDraft.product.outcome) { setProductCopyMessage('判断対象と結果を選択してください。'); return; }
    try {
      const text = serializeProductReviewHandoff({
        entity, item, reviewedAt: currentDraft.product.reviewedAt,
        outcome: currentDraft.product.outcome, note: currentDraft.product.note,
      });
      await copyText(text);
      setProductCopyMessage('Productレビュー結果をコピーしました。事実確認の記録ではありません。');
    } catch (error) {
      setProductCopyMessage(error instanceof Error ? `コピーできませんでした: ${error.message}` : 'コピーできませんでした。');
    }
  };
  const copyStakeholder = async () => {
    if (!currentDraft.stakeholder.method) { setStakeholderCopyMessage('確認方法を選択してください。'); return; }
    try {
      const text = await serializeStakeholderConfirmationHandoff({
        entity,
        reviewedAt: currentDraft.stakeholder.reviewedAt,
        method: currentDraft.stakeholder.method,
        authorityReference: currentDraft.stakeholder.authorityReference,
        results: currentDraft.stakeholder.results,
      });
      await copyText(text);
      setStakeholderCopyMessage('事実確認 handoff をコピーしました。確認結果はまだ canonical data に反映されていません。');
    } catch (error) {
      setStakeholderCopyMessage(error instanceof Error ? `コピーできませんでした: ${error.message}` : 'コピーできませんでした。');
    }
  };

  return (
    <section className="drb-panel drb-handoff" aria-labelledby="handoff-heading">
      <div className="drb-panel__heading"><span>07</span><h2 id="handoff-heading">確認結果を引き継ぐ</h2></div>
      <p className="drb-panel__note">
        Productの解釈レビューと、関係者への事実確認は別の記録です。入力はこのページを開いている間だけ保持し、canonical data は変更しません。
      </p>
      <div className="drb-handoff__progress" aria-live="polite">
        <strong>関係者確認の進捗</strong>
        {progress
          ? <span>回答済み {progress.answered} / {progress.total}項目 · 「正しい」{progress.confirmed}項目{progress.stale ? ` · 古い記録 ${progress.stale}件は集計外` : ''}</span>
          : <span>{fingerprintError || '進捗を確認しています…'}</span>}
        <small>Boardの進捗は source 全体の確認や verified を意味しません。</small>
      </div>

      <div className="drb-handoff__grid">
        <section aria-labelledby="product-review-heading">
          <h3 id="product-review-heading">チーム / Product レビュー</h3>
          <p>表示や解釈が適切かを判断します。事実の確認状態や source の値は変わりません。</p>
          <label>
            判断対象
            <select
              value={currentDraft.product.decisionId}
              onChange={(event) => updateProduct({ ...currentDraft.product, decisionId: event.target.value })}
            >
              <option value="">選択してください</option>
              <option value="__entity__">この entity 全体の Product 表示・解釈</option>
              {entity.reviewContext.decisionItems.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>
            判断日
            <input type="date" value={currentDraft.product.reviewedAt} onChange={(event) => updateProduct({ ...currentDraft.product, reviewedAt: event.target.value })} />
          </label>
          <label>
            結果
            <select
              value={currentDraft.product.outcome}
              onChange={(event) => updateProduct({ ...currentDraft.product, outcome: event.target.value as ProductReviewOutcome | '' })}
            >
              <option value="">選択してください</option>
              <option value="accepted">問題なし</option>
              <option value="correction_required">修正が必要</option>
              <option value="deferred">判断保留</option>
            </select>
          </label>
          <label>
            Productレビューのメモ（任意）
            <textarea value={currentDraft.product.note} maxLength={1000} onChange={(event) => updateProduct({ ...currentDraft.product, note: event.target.value })} />
          </label>
          <button type="button" onClick={copyProduct}>Productレビュー結果をコピー</button>
          <p className="drb-handoff__feedback" role="status" aria-live="polite">{productCopyMessage}</p>
          <small>この receipt は Product review 専用で、関係者の事実確認・confirmedAt・verification status を更新しません。</small>
        </section>

        <section aria-labelledby="stakeholder-confirmation-heading">
          <h3 id="stakeholder-confirmation-heading">関係者への事実確認</h3>
          <p>出典の記載と確認日を見て、項目ごとに結果を選びます。矛盾する出典は両方を残します。</p>
          <div className="drb-handoff__context">
            <label>確認日<input type="date" value={currentDraft.stakeholder.reviewedAt} onChange={(event) => updateStakeholder({ ...currentDraft.stakeholder, reviewedAt: event.target.value })} /></label>
            <label>確認方法
              <select value={currentDraft.stakeholder.method} onChange={(event) => updateStakeholder({ ...currentDraft.stakeholder, method: event.target.value as StakeholderConfirmationDraft['method'] })}>
                <option value="">選択してください</option>
                <option value="in_person">対面</option><option value="phone">電話</option>
                <option value="direct_message">DM</option><option value="email">メール</option><option value="other">その他</option>
              </select>
            </label>
            <label>所属・役割 / 記録参照（任意、個人連絡先は入力しない）
              <input maxLength={160} value={currentDraft.stakeholder.authorityReference} onChange={(event) => updateStakeholder({ ...currentDraft.stakeholder, authorityReference: event.target.value })} />
            </label>
          </div>
          <div className="drb-handoff__fields">
            {fields.map((field) => {
              const result = currentDraft.stakeholder.results[field.fieldKey];
              const conflict = field.status === 'conflict';
              const currentUnknown = field.status === 'unknown';
              return (
                <article key={field.fieldKey} className="drb-handoff-field">
                  <h4>{fieldLabels.get(field.fieldKey) ?? field.fieldKey}</h4>
                  <code>{entity.type}/{entity.id}/{field.fieldKey}</code>
                  <p>状態: {fieldStatusLabel(field)} · claim IDs: {field.claimIds.join(', ') || 'なし'}</p>
                  {!currentUnknown && (field.finding === 'presentation_mismatch' ? (
                    <dl className="drb-handoff-field__comparison">
                      <div><dt>現在の表示</dt><dd>{field.displayedValue ?? '記録なし'}</dd></div>
                      <div><dt>比較対象の表示</dt><dd>{field.comparedPresentationValue ?? '記録なし'}</dd></div>
                    </dl>
                  ) : field.finding === 'mismatch'
                    || (field.canonicalValue !== undefined && field.displayedValue !== undefined && field.canonicalValue !== field.displayedValue) ? (
                      <dl className="drb-handoff-field__comparison">
                        <div><dt>正本</dt><dd>{field.canonicalValue ?? '記録なし'}</dd></div>
                        <div><dt>現在の表示</dt><dd>{field.displayedValue ?? '記録なし'}</dd></div>
                      </dl>
                    ) : (
                      <p>現在の表示: {field.displayedValue ?? field.canonicalValue ?? '記録なし'}</p>
                    ))}
                  {field.sources.map((source) => (
                    <div className="drb-handoff-field__source" key={source.claimId}>
                      <strong>{source.displayName}</strong><span>{source.value ?? '出典側の値なし'}</span>
                      <small>{SOURCE_ORIGIN_LABELS[source.origin] ?? source.origin} · {SOURCE_TYPE_LABELS[source.sourceType ?? ''] ?? 'source種別未登録'} · {SOURCE_RELATIONSHIP_LABELS[source.relationship] ?? source.relationship} · {source.role === 'content' ? '内容の根拠' : source.role === 'address' ? '住所の根拠' : '位置情報の根拠'} · {source.url ?? 'URL 未登録'} · 利用条件 {source.license ?? '未登録'} · 出典確認 {source.retrievedAt ?? '未登録'} · 出典更新 {source.sourceUpdatedAt ?? '未登録'} · 人による確認 {source.confirmedAt ?? '未確認'} · {dataReviewStatusLabelJa(source.status, source.retrievedAt !== undefined)}</small>
                    </div>
                  ))}
                  <label>この項目の結果
                    <select
                      value={result?.outcome ?? ''}
                      onChange={(event) => {
                        const value = event.target.value as StakeholderConfirmationOutcome | '';
                        const results = { ...currentDraft.stakeholder.results };
                        if (value) results[field.fieldKey] = { outcome: value as StakeholderConfirmationOutcome };
                        else delete results[field.fieldKey];
                        updateStakeholder({ ...currentDraft.stakeholder, results });
                      }}
                    >
                      <option value="">未選択</option>
                      {!currentUnknown && !conflict && <option value="confirmed">{OUTCOME_LABELS.confirmed}</option>}
                      <option value="correction_required">{OUTCOME_LABELS.correction_required}</option>
                      <option value="unknown">{OUTCOME_LABELS.unknown}</option>
                      <option value="not_applicable">{OUTCOME_LABELS.not_applicable}</option>
                    </select>
                  </label>
                  {result?.outcome === 'correction_required' && (
                    <label>修正案（提案として handoff に含めます。正本ではありません）
                      <textarea maxLength={500} value={result.proposedValue ?? ''} onChange={(event) => updateStakeholder({
                        ...currentDraft.stakeholder,
                        results: { ...currentDraft.stakeholder.results, [field.fieldKey]: { ...result, proposedValue: event.target.value } },
                      })} />
                    </label>
                  )}
                </article>
              );
            })}
          </div>
          <button type="button" onClick={copyStakeholder}>事実確認 handoff をコピー</button>
          <p className="drb-handoff__feedback" role="status" aria-live="polite">{stakeholderCopyMessage}</p>
          <small>根拠未登録・矛盾ありの項目では「正しい」を選べません。修正案を入力しても、正本の更新までは未解決のままです。</small>
        </section>
      </div>

      <div className="drb-handoff__application">
        <h3>確認後の canonical 反映手順</h3>
        <pre>{stakeholderConfirmationApplicationGuidanceJa({ entityId: entity.id }).replace(/^## 反映手順\n\n/, '')}</pre>
      </div>
      {isDirtyReviewHandoffDraft(currentDraft) && <small className="drb-handoff__temporary">入力はこのタブのメモリに一時保持されています。ページを閉じると失われます。</small>}
    </section>
  );
}
