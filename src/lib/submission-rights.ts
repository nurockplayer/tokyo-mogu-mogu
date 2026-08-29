import type { DataSource } from '../data/model';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';

export type SubmissionRightsStatus = 'ready' | 'needs_confirmation' | 'blocked';

export const SUBMISSION_RIGHTS_STATUS_LABELS_JA: Readonly<Record<SubmissionRightsStatus, string>> = {
  ready: '提出利用の根拠あり',
  needs_confirmation: '権利根拠の確認待ち',
  blocked: '現状のまま提出利用しない',
};

export interface CompetitionRule {
  id: string;
  label: string;
  summary: string;
  authority: 'recruitment' | 'guidebook' | 'both';
}

export const COMPETITION_RULES_AUTHORITY = {
  checkedAt: '2026-08-30',
  sources: [
    {
      id: 'recruitment',
      label: '都知事杯オープンデータ・ハッカソン2026 募集要項',
      url: 'https://odhackathon.metro.tokyo.lg.jp/recruitment/',
    },
    {
      id: 'guidebook',
      label: '都知事杯オープンデータ・ハッカソン2026 参加者ガイドブック',
      url: 'https://odh-tokyo2026.code4japan.org/',
    },
  ],
  versionNote:
    '提出項目⑦（生成AI利用の明記・ライセンス確認）は更新版の参加者ガイドブックを authority とします。募集要項ページは旧①〜⑥表記のため、差分を混同しません。',
  disclaimer:
    '大会・提出時の権利確認を支援するレビュー情報です。法的助言や利用許諾の推定ではありません。',
  rules: [
    {
      id: 'data-types',
      label: 'Open Data と民間・公式Webを分ける',
      summary:
        '民間データ等の利用は可能です。ただしWebで公表されているだけの情報をOpen Dataと呼ばず、明示されたライセンスを確認します。',
      authority: 'both',
    },
    {
      id: 'representative-open-data',
      label: '提出④は代表的なOpen Data（最大10件）',
      summary:
        '提出欄には実際に利用・利用予定の代表的なOpen Dataだけを記載します。公式サイトや事業者ページは別のデータ種別として扱います。',
      authority: 'both',
    },
    {
      id: 'rights-disclosure',
      label: '提出⑦で生成AI利用とライセンスを確認',
      summary:
        '生成AI利用の明記、ライセンス確認、留意事項・個人情報取扱いへの同意を提出前に完了します。',
      authority: 'guidebook',
    },
    {
      id: 'citations-and-captures',
      label: '引用・Webキャプチャは出典と利用条件を確認',
      summary:
        '著作物を引用するときは出典を記載します。Webサイトのキャプチャはサイト規約に従い、有料記事を含む記事キャプチャは避けます。',
      authority: 'guidebook',
    },
    {
      id: 'maps-and-photos',
      label: '地図の帰属表示と写真の許可を守る',
      summary:
        'Google Maps等のキャプチャはロゴ・帰属表示を隠さず改変しません。本リポジトリはより厳しい「原則キャプチャしない」方針を維持します。写真は本人・チーム撮影またはチームメンバーの許可を記録します。',
      authority: 'guidebook',
    },
    {
      id: 'usable-materials',
      label: '商用利用可能な素材を条件どおり使う',
      summary:
        '著作権フリーまたは商用利用可能な素材を選び、各素材の利用条件・点数制限・帰属表示に従います。許可範囲が分かりにくいBGMは避けます。',
      authority: 'guidebook',
    },
    {
      id: 'ai-source-material',
      label: 'AI生成・合成素材は元素材の権利まで確認',
      summary:
        '生成・合成に使った元素材の条件内でのみ利用します。元素材の権利が不明な場合は提出物に使用しません。',
      authority: 'guidebook',
    },
    {
      id: 'applicant-responsibility',
      label: '必要な権利処理は応募者の責任',
      summary:
        '必要な許諾・権利処理は応募者が判断して行います。主催者は知的財産トラブルの責任を負わないため、不明な権利は不明のまま可視化して提出可否をfail closedにします。',
      authority: 'both',
    },
  ] as const satisfies readonly CompetitionRule[],
} as const;

export type ProjectAssetOrigin =
  | 'team_created'
  | 'fieldwork'
  | 'figma_team'
  | 'licensed'
  | 'ai_generated'
  | 'third_party'
  | 'unknown';

export type ProjectAssetUse =
  | 'current_runtime'
  | 'project_demo'
  | 'demo_recording'
  | 'submission_capture'
  | 'review_evidence'
  | 'historical_evidence';

export type ProjectAssetAllowedScope =
  | 'project_demo'
  | 'hackathon_submission'
  | 'public_web'
  | 'commercial';

export type ProjectAssetAiUse = 'none' | 'generated' | 'composited' | 'unknown';

export interface ProjectAssetRightsGroup {
  id: string;
  label: string;
  paths: readonly string[];
  origin: ProjectAssetOrigin;
  currentUse: readonly ProjectAssetUse[];
  creatorOrOwner?: string;
  source?: string;
  permissionBasis?: string;
  attribution: string;
  allowedScopes: readonly ProjectAssetAllowedScope[];
  aiUse: ProjectAssetAiUse;
  sourceMaterialRights: 'documented' | 'not_applicable' | 'unknown';
  reviewStatus: SubmissionRightsStatus;
  note: string;
  supportingLinks: readonly string[];
}

const NETLIFY_PARITY_PATHS = [
  'akabeko_new.jpg',
  'akabeko_yamame.jpg',
  'akabeko_yamame2.jpg',
  'annaijo.jpg',
  'apple-touch-icon.png',
  'crop_yamame_clean.png',
  'daidokoro_new.jpg',
  'daidokoro2.jpg',
  'eki.jpg',
  'experience_new.jpg',
  'exploration-background.png',
  'favicon.png',
  'figma-route-map.png',
  'gelato.jpg',
  'hanamaru.png',
  'hashi.jpg',
  'home_hero.jpg',
  'ill_fork.png',
  'ill_kau.png',
  'ill_manabu.png',
  'ill_sanchi.png',
  'ill_shokunin.png',
  'ill_taberu.png',
  'ill_tsukuru.png',
  'kawa_new.jpg',
  'kawa.jpg',
  'keikoku.jpg',
  'logo_face_t.png',
  'logo_full_t.png',
  'map.jpg',
  'og.png',
  'oku-hikawa-shrine.png',
  'okutama-tourism-office-exterior.png',
  'okutama-tourism-office-route.png',
  'port_cafe.jpg',
  'port.jpg',
  'port2.jpg',
  'shokudo_new.jpg',
  'wasabi_photo.jpg',
  'wasapy.jpg',
  'welcome_cta.png',
  'yamashiroya_goods.jpg',
  'yamashiroya_new.jpg',
  'yamashiroya_sign.jpg',
].map((file) => `src/assets/netlify-parity/${file}`);

const FIGMA_CORE_PATHS = [
  'avatar.svg',
  'exp-buy.png',
  'exp-eat.png',
  'exp-learn.png',
  'exp-make.png',
  'exp-meet.png',
  'exp-visit.png',
  'landing-bg.png',
  'mascot.svg',
  'result-card-yamame.png',
  'result-hero-wasabi.png',
  'story-hero.png',
].map((file) => `src/assets/figma/${file}`);

const FIGMA_296_PATHS = [
  'back.svg',
  'background.png',
  'badge-count-stamp.svg',
  'badge-earned.png',
  'badge-empty.png',
  'badge-next.svg',
  'badge-prev.svg',
  'badge-store-card.png',
  'binder-green.svg',
  'binder-page.svg',
  'binder-ring.svg',
  'binder-shadow.svg',
  'camera.svg',
  'food-badge.png',
  'help.svg',
  'language.svg',
  'my-avatar.svg',
  'nav-discover.svg',
  'nav-favorites.svg',
  'nav-mogu.svg',
  'nav-my.svg',
  'saved-routes.png',
  'settings.svg',
  'status-bar.svg',
].map((file) => `src/assets/figma-296/${file}`);

const FIGMA_360_PATHS = [
  'badge-edo-tokyo-vegetables.png',
  'badge-yamame.png',
].map((file) => `src/assets/figma-360/${file}`);

const FIELDWORK_PATHS = [
  'office',
  'office-stamps',
  'office-wasapi',
  'okutama-bridge',
  'okutama-valley',
].flatMap((subject) => [640, 960, 1440]
  .map((width) => `src/assets/fieldwork/okutama/${subject}-${width}.webp`));

const DATA_REVIEW_EVIDENCE_PATHS = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence
  .map((evidence) => evidence.path)
  .sort();

export const PROJECT_ASSET_RIGHTS_MANIFEST: readonly ProjectAssetRightsGroup[] = [
  {
    id: 'netlify-parity',
    label: '現在のProduct用 Netlify reference bundle',
    paths: NETLIFY_PARITY_PATHS,
    origin: 'unknown',
    currentUse: ['current_runtime', 'project_demo', 'demo_recording', 'submission_capture'],
    source: 'https://mogu-mogu-5525da.netlify.app/',
    permissionBasis: 'プロジェクトデモの参照再現のみ。公開再利用ライセンスは主張していません。',
    attribution: '元の制作者・権利者と必要な帰属表示は未登録です。',
    allowedScopes: [],
    aiUse: 'unknown',
    sourceMaterialRights: 'unknown',
    reviewStatus: 'blocked',
    note:
      '44ファイルが現在のリポジトリ・実行時入力です。許可済み範囲はリポジトリ証拠から確認できません。大会提出・公開デモから除外し、チーム/権利者許可を記録するか、対象素材を置換してから利用します。',
    supportingLinks: ['src/assets/netlify-parity/README.md', 'https://github.com/nurockplayer/tokyo-mogu-mogu/issues/370'],
  },
  {
    id: 'fieldwork-okutama',
    label: '奥多摩フィールドワーク写真（5被写体・15派生）',
    paths: FIELDWORK_PATHS,
    origin: 'fieldwork',
    currentUse: ['current_runtime', 'project_demo', 'demo_recording', 'submission_capture'],
    source: 'https://drive.google.com/drive/folders/1p4seRQO1FgJ_KIym38skBnHLcsQUfp8a',
    permissionBasis: 'Issues #258/#270 は選定派生画像のプロジェクトデモ利用だけを承認しています。',
    attribution: '撮影者・著作権者と必要なクレジットは未登録です。',
    allowedScopes: ['project_demo'],
    aiUse: 'none',
    sourceMaterialRights: 'not_applicable',
    reviewStatus: 'needs_confirmation',
    note:
      '識別可能な人物を含まずEXIF/GPSも除去済みですが、大会提出・公開プレゼンテーションへの明示許可が必要です。',
    supportingLinks: [
      'src/assets/fieldwork/okutama/README.md',
      'https://github.com/nurockplayer/tokyo-mogu-mogu/issues/258',
      'https://github.com/nurockplayer/tokyo-mogu-mogu/issues/270',
    ],
  },
  {
    id: 'figma-core',
    label: 'Figma core exports',
    paths: FIGMA_CORE_PATHS,
    origin: 'figma_team',
    currentUse: ['current_runtime', 'project_demo', 'demo_recording', 'submission_capture'],
    source: 'KiKi Figma file',
    attribution: '制作者・権利者、許可、帰属表示、AI/元素材の申告は未登録です。',
    allowedScopes: [],
    aiUse: 'unknown',
    sourceMaterialRights: 'unknown',
    reviewStatus: 'needs_confirmation',
    note:
      'リポジトリ/Figma上の存在はエンジニアリング上の来歴にすぎず、提出・公開再利用の権利根拠にはなりません。',
    supportingLinks: ['src/assets/figma/'],
  },
  {
    id: 'figma-296',
    label: 'Figma #296 UI exports',
    paths: FIGMA_296_PATHS,
    origin: 'figma_team',
    currentUse: ['current_runtime', 'project_demo', 'demo_recording', 'submission_capture'],
    source: 'KiKi Figma Issue #296 nodes',
    attribution: '制作者・権利者、許可、帰属表示、AI/元素材の申告は未登録です。',
    allowedScopes: [],
    aiUse: 'unknown',
    sourceMaterialRights: 'unknown',
    reviewStatus: 'needs_confirmation',
    note:
      '正確なnode/export来歴は記録済みですが、その来歴は権利許諾ではありません。',
    supportingLinks: ['src/assets/figma-296/README.md', 'docs/evidence/issue-296/figma-source.md'],
  },
  {
    id: 'figma-360',
    label: 'Figma #360 badge exports',
    paths: FIGMA_360_PATHS,
    origin: 'figma_team',
    currentUse: ['current_runtime', 'project_demo', 'demo_recording', 'submission_capture'],
    source: 'KiKi Figma Issue #360 nodes',
    attribution: '制作者・権利者、許可、帰属表示、AI/元素材の申告は未登録です。',
    allowedScopes: [],
    aiUse: 'unknown',
    sourceMaterialRights: 'unknown',
    reviewStatus: 'needs_confirmation',
    note:
      '正確なcrop/node来歴は記録済みですが、その来歴は権利許諾ではありません。',
    supportingLinks: ['src/assets/figma-360/README.md', 'docs/evidence/issue-360/figma-source.md'],
  },
  {
    id: 'data-review-evidence',
    label: 'Data Review Board アプリ表示証拠',
    paths: DATA_REVIEW_EVIDENCE_PATHS,
    origin: 'team_created',
    currentUse: ['review_evidence', 'submission_capture'],
    creatorOrOwner: 'TOKYO MOGU MOGU repository capture workflow',
    permissionBasis: 'リポジトリのレビュー証拠のみ。写り込む実行時素材の権利状態を継承し、未解決です。',
    attribution: '各キャプチャ内に表示されるすべての視覚素材に依存します。',
    allowedScopes: ['project_demo'],
    aiUse: 'composited',
    sourceMaterialRights: 'unknown',
    reviewStatus: 'needs_confirmation',
    note:
      'アプリ表示キャプチャであり、出典サイトのキャプチャや権利許諾ではありません。実行時素材の確認後、最終選定画像を再確認します。',
    supportingLinks: ['src/data/data-verification-evidence-manifest.ts', 'docs/data-evidence/'],
  },
  {
    id: 'final-submission-media',
    label: '最終スライド・動画・提出スクリーンキャプチャ',
    paths: [],
    origin: 'unknown',
    currentUse: ['submission_capture'],
    attribution: '最終クレジット・帰属表示は未作成です。',
    allowedScopes: [],
    aiUse: 'unknown',
    sourceMaterialRights: 'unknown',
    reviewStatus: 'needs_confirmation',
    note:
      'No final PDF/deck/video package is committed. Clear every selected visual, declaration, citation, map attribution, and BGM decision before submission.',
    supportingLinks: ['docs/hackathon/submission-checklist.md'],
  },
];

interface SourceRightsInput {
  sourceType?: DataSource['sourceType'];
  license?: string;
  url?: string;
}

const OPEN_LICENSE = /\b(?:CC0|CC BY|ODbL|Open Data Commons|Public Domain)\b/i;
const UNREVIEWED_CC_VARIANT = /\bCC BY-[A-Z-]+\b/i;

/** Rights/reuse status only. This never changes factual verification. */
export function sourceSubmissionRightsStatus(source: SourceRightsInput): SubmissionRightsStatus {
  if (
    source.license
    && !UNREVIEWED_CC_VARIANT.test(source.license)
    && OPEN_LICENSE.test(source.license)
  ) return 'ready';
  return 'needs_confirmation';
}

/** Apply the official AI/source-material fail-closed rule to an asset review row. */
export function assessProjectAssetRights(
  item: ProjectAssetRightsGroup,
): SubmissionRightsStatus {
  if (
    (item.aiUse === 'generated' || item.aiUse === 'composited')
    && item.sourceMaterialRights === 'unknown'
  ) {
    return 'blocked';
  }
  if (
    item.reviewStatus === 'ready'
    && (!item.creatorOrOwner
      || !item.permissionBasis
      || !item.allowedScopes.includes('hackathon_submission'))
  ) {
    return 'needs_confirmation';
  }
  return item.reviewStatus;
}

export interface ProjectAssetRightsSummary {
  groupCounts: Readonly<Record<SubmissionRightsStatus, number>>;
  fileCounts: Readonly<Record<SubmissionRightsStatus, number>>;
  submissionReady: boolean;
  blockingGroupIds: readonly string[];
}

export function buildProjectAssetRightsSummary(
  manifest: readonly ProjectAssetRightsGroup[],
): ProjectAssetRightsSummary {
  const groupCounts: Record<SubmissionRightsStatus, number> = {
    ready: 0,
    needs_confirmation: 0,
    blocked: 0,
  };
  const fileCounts: Record<SubmissionRightsStatus, number> = {
    ready: 0,
    needs_confirmation: 0,
    blocked: 0,
  };
  const blockingGroupIds: string[] = [];

  for (const item of [...manifest].sort((left, right) => left.id.localeCompare(right.id))) {
    const status = assessProjectAssetRights(item);
    groupCounts[status] += 1;
    fileCounts[status] += item.paths.length;
    if (status !== 'ready') blockingGroupIds.push(item.id);
  }

  return {
    groupCounts,
    fileCounts,
    submissionReady: blockingGroupIds.length === 0,
    blockingGroupIds,
  };
}

export interface SubmissionReadinessSource {
  name: string;
  sourceType?: DataSource['sourceType'];
  license?: string;
  rightsStatus: SubmissionRightsStatus;
  coordinateProvider: boolean;
  evidenceState: 'captured' | 'omitted' | 'not_recorded';
}

export interface SubmissionReadinessCheck {
  id: string;
  label: string;
  status: SubmissionRightsStatus;
  summary: string;
}

export function buildSubmissionReadinessChecks(
  sources: readonly SubmissionReadinessSource[],
  assets: readonly ProjectAssetRightsGroup[] = PROJECT_ASSET_RIGHTS_MANIFEST,
): readonly SubmissionReadinessCheck[] {
  const uniqueSources = [...new Map(
    sources.map((source) => [
      `${source.coordinateProvider ? 'coordinates' : 'content'}\u0000${source.name}\u0000${source.license ?? ''}`,
      source,
    ]),
  ).values()].sort((left, right) => left.name.localeCompare(right.name));
  const openData = uniqueSources.filter((source) => source.sourceType === 'open_data');
  const privateOrOfficial = uniqueSources.filter((source) =>
    source.sourceType === 'official_web' || source.sourceType === 'business');
  const unsafeCapturedSources = uniqueSources.filter((source) =>
    source.rightsStatus !== 'ready' && source.evidenceState === 'captured');
  const mapProviders = uniqueSources.filter((source) => source.coordinateProvider);
  const unsafeMapCaptures = mapProviders.filter((source) =>
    /Google Maps/i.test(source.name) && source.evidenceState === 'captured');
  const currentRuntimeAssets = assets.filter((item) => item.currentUse.includes('current_runtime'));
  const currentRuntimeStatuses = currentRuntimeAssets.map(assessProjectAssetRights);
  const runtimeStatus: SubmissionRightsStatus = currentRuntimeStatuses.includes('blocked')
    ? 'blocked'
    : currentRuntimeStatuses.includes('needs_confirmation')
      ? 'needs_confirmation'
      : 'ready';
  const unknownAiAssets = currentRuntimeAssets.filter((item) =>
    item.aiUse === 'unknown'
    || ((item.aiUse === 'generated' || item.aiUse === 'composited')
      && item.sourceMaterialRights === 'unknown'));
  const finalMedia = assets.find((item) => item.id === 'final-submission-media');

  return [
    {
      id: 'representative-open-data',
      label: '代表Open Dataのライセンス',
      status: openData.length > 0 && openData.every((source) => source.rightsStatus === 'ready')
        ? 'ready'
        : 'needs_confirmation',
      summary: openData.length > 0
        ? `${openData.length}件のOpen Data出典を明示ライセンス付きで識別しています。`
        : '代表Open Dataの明示ライセンスを確認できません。',
    },
    {
      id: 'source-classification',
      label: '公式Web・事業者情報との区別',
      status: 'ready',
      summary: `${privateOrOfficial.length}件の公式Web・事業者/地図提供元をOpen Dataとは別種別で保持しています。公開URLだけを根拠にOpen Dataへ昇格しません。`,
    },
    {
      id: 'source-captures',
      label: '権利不明な出典キャプチャ',
      status: unsafeCapturedSources.length === 0 ? 'ready' : 'blocked',
      summary: unsafeCapturedSources.length === 0
        ? '権利制約のある出典はリンクと省略理由だけを保持し、ソース画像を再収録していません。'
        : `権利根拠が未確認の出典キャプチャが${unsafeCapturedSources.length}件あります。`,
    },
    {
      id: 'runtime-assets',
      label: '現在のProduct画像',
      status: runtimeStatus,
      summary: runtimeStatus === 'ready'
        ? '現在のProduct画像は提出利用の根拠が記録されています。'
        : 'Netlify/Figma/fieldwork画像の提出・公開利用根拠が未完了です。Netlify reference bundleは現状のまま提出利用しません。',
    },
    {
      id: 'map-providers',
      label: '地図提供元・帰属表示',
      status: unsafeMapCaptures.length === 0 ? 'ready' : 'blocked',
      summary: unsafeMapCaptures.length === 0
        ? '座標提供元を内容出典と分離し、Google Maps画像は保存せず、OpenStreetMapはODbL provenanceと実行時帰属表示を維持します。'
        : 'Google Mapsキャプチャに必要な帰属表示・利用条件を満たしていません。',
    },
    {
      id: 'ai-materials',
      label: 'AI生成・合成素材の申告',
      status: unknownAiAssets.length === 0 ? 'ready' : 'blocked',
      summary: unknownAiAssets.length === 0
        ? 'AI利用と元素材の権利根拠が記録されています。'
        : `${unknownAiAssets.length}グループでAI利用または元素材の権利申告が未登録です。確認できるまで提出利用しません。`,
    },
    {
      id: 'final-media',
      label: '最終スライド・動画・スクリーンキャプチャ',
      status: finalMedia ? assessProjectAssetRights(finalMedia) : 'needs_confirmation',
      summary: '最終提出パッケージは未登録です。選定後に引用、帰属表示、写真、AI、地図、BGMを再確認します。',
    },
    {
      id: 'tourism-directory-snapshot',
      label: 'All Rights Reserved 観光ディレクトリ',
      status: 'ready',
      summary:
        '19行のsnapshotは権利制約付きLedger provenance入力としてのみ保持し、Open Dataや提出メディアには使いません。削除はsource identityを変えるため本Issueでは行わず、現在値は第一当事者リンクを優先します。',
    },
  ];
}
