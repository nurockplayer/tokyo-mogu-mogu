import { FINAL_PRESENTATION_REVIEW, SUBMISSION_RULES } from '../data/submission-rights';
import type { SubmissionAssetScope } from '../data/submission-rights';
import type { HumanDataReviewSource } from '../lib/human-data-review-board';
import { buildSubmissionAssetRightsInventory, summarizeSubmissionAssetRights } from '../lib/submission-rights';

const inventory = buildSubmissionAssetRightsInventory();
const summary = summarizeSubmissionAssetRights(inventory);
const statusLabels = { ready: '根拠登録済み', needs_confirmation: '権利確認待ち', blocked: '提出・公開利用を停止' } as const;
const scopeLabels: Record<SubmissionAssetScope, string> = {
  project_demo: 'プロジェクト内デモ', hackathon_submission: '大会提出', public_web: '一般公開', commercial: '商用',
};
const aiLabels = {
  not_applicable: '対象外（根拠記録済み）', not_declared: '未申告', declared_no_ai: 'AI利用なしと申告済み',
  declared_with_source_rights: 'AI利用・元素材の権利を申告済み', source_rights_unknown: '元素材の権利不明・使用不可',
};
const originLabels = {
  team_created: 'チーム制作', fieldwork: '現地撮影', figma_team: 'チームFigma', licensed: '許諾素材',
  ai_generated: 'AI生成', third_party: '第三者素材', unknown: '未確認',
};
const attributionLabels = { unknown: '要否未確認', not_required: '不要（根拠記録済み）', fulfilled: '表示済み', missing: '必要な表示が未実施' };
const groups = [
  { label: '参照用素材', prefix: 'src/assets/netlify-parity/' },
  { label: '現地写真', prefix: 'src/assets/fieldwork/' },
  { label: 'Figma素材', prefix: 'src/assets/figma' },
  { label: '画面証拠・設計・発表資料', prefix: 'docs/' },
  { label: 'その他の素材', prefix: '' },
];
const assetGroups = groups.map((group, index) => ({
  ...group,
  assets: inventory.filter((asset) => asset.path.startsWith(group.prefix)
    && !groups.slice(0, index).some((earlier) => asset.path.startsWith(earlier.prefix))),
})).filter((group) => group.assets.length > 0);

function recordLink(path: string): string {
  return path.startsWith('https://') ? path : `https://github.com/nurockplayer/tokyo-mogu-mogu/blob/main/${path}`;
}

export function SubmissionRightsPanel({ sources }: { sources: readonly HumanDataReviewSource[] }) {
  const uniqueSources = [...new Map(sources.map((source) => [
    `${source.sourceType}:${source.url}:${source.license}`, source,
  ])).values()];
  const openData = uniqueSources.filter((source) => source.sourceType === 'open_data');
  const missingLicense = uniqueSources.filter((source) => !source.license);
  return (
    <section className="drb-compliance drb-panel" aria-labelledby="rights-heading">
      <div className="drb-panel__heading"><h2 id="rights-heading">大会ルール・提出権利チェック</h2></div>
      <p className="drb-panel__note">大会提出のための確認です。店舗情報の事実確認とは別に管理します。公式ルール確認日：{SUBMISSION_RULES.checkedAt}</p>
      <div className="drb-references">
        {SUBMISSION_RULES.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}
      </div>
      <details className="drb-rights-details">
        <summary>大会ルールを確認する</summary>
        <ul>{SUBMISSION_RULES.summary.map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </details>
      <p className="drb-rights-warning" role="note">
        <strong>現在の素材一式は提出・公開の承認が完了していません。</strong>
        {' '}素材 {summary.total}件：根拠登録済み {summary.statusCounts.ready}件、権利確認待ち {summary.statusCounts.needs_confirmation}件、利用停止 {summary.statusCounts.blocked}件。
        未確認の素材を含む画面録画・スクリーンショットも提出できません。権利者の許諾を記録するか、対象素材を除外・置換して再確認してください。
      </p>
      <details className="drb-rights-details">
        <summary>出典の利用条件：オープンデータ {openData.length}件・利用条件未登録 {missingLicense.length}件</summary>
        <p>種別は既存の出典記録に従います。公開URLからオープンデータとは推定しません。以下は候補の一覧で、提出する代表10件の選定・帰属表示は別途必要です。</p>
        <ul>{openData.map((source) => <li key={`${source.url}:${source.license}`}>
          <a href={source.url} target="_blank" rel="noreferrer">{source.name}</a> — {source.license ?? '利用条件未登録・要確認'}
        </li>)}</ul>
        <p>公式Web・事業者・地図提供元などの利用条件と画像省略理由は、各確認対象の「出典・確認状況」に表示します。</p>
      </details>
      <details className="drb-rights-details">
        <summary>素材ごとの許諾・AI申告を見る（{summary.total}件）</summary>
        {assetGroups.map((group) => <details key={group.label} className="drb-rights-details">
          <summary>{group.label}（{group.assets.length}件）</summary>
          <ul className="drb-asset-list">{group.assets.map((asset) => <li key={asset.path}>
            <details>
              <summary><span>{statusLabels[asset.status]}</span> <code>{asset.path}</code></summary>
              <dl>
                <dt>素材の由来</dt><dd>{originLabels[asset.origin]}</dd>
                <dt>制作者・権利者</dt><dd>{asset.creatorOrOwner ?? '未登録'}</dd>
                <dt>許諾・ライセンス根拠</dt><dd>{asset.permissionBasis ?? '未登録'}</dd>
                <dt>利用予定</dt><dd>{asset.intendedScopes.map((scope) => scopeLabels[scope]).join('・')}</dd>
                <dt>許諾済み範囲</dt><dd>{asset.allowedScopes.map((scope) => scopeLabels[scope]).join('・') || '登録なし'}</dd>
                <dt>帰属表示</dt><dd>{attributionLabels[asset.attributionStatus]}{asset.attributionRequirement && `：${asset.attributionRequirement}`}</dd>
                <dt>AI・元素材の申告</dt><dd>{aiLabels[asset.aiMaterialDeclaration]}</dd>
                <dt>棚卸し日</dt><dd>{asset.reviewedAt}</dd>
              </dl>
              <p>{asset.blockReason ?? asset.note}</p>
              {asset.sourceUrl && <a href={recordLink(asset.sourceUrl)} target="_blank" rel="noreferrer">根拠・経緯の記録 ↗</a>}
            </details>
          </li>)}</ul>
        </details>)}
      </details>
      <details className="drb-rights-details">
        <summary>最終発表・動画：権利確認待ち</summary>
        <ul>{FINAL_PRESENTATION_REVIEW.map((artifact) => <li key={artifact.id}><strong>{artifact.label}</strong> — {artifact.note}</li>)}</ul>
        <p>提出・公開用パッケージは権利チェックに通るまで作成できません。通常の動作確認ビルドや事実確認済みの表示は、素材の再利用許諾を意味しません。</p>
      </details>
    </section>
  );
}
