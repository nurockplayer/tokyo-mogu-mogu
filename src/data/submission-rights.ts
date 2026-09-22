import assetPaths from './submission-asset-paths.json';

/** Compliance metadata is independent of venue facts and factual verification. */
export type SubmissionAssetOrigin =
  | 'team_created' | 'fieldwork' | 'figma_team' | 'licensed'
  | 'ai_generated' | 'third_party' | 'unknown';
export type SubmissionAssetScope =
  | 'project_demo' | 'hackathon_submission' | 'public_web' | 'commercial';
export type AiMaterialDeclaration =
  | 'not_applicable' | 'not_declared' | 'declared_no_ai'
  | 'declared_with_source_rights' | 'source_rights_unknown';

export interface SubmissionAssetRightsInput {
  /** Stable repository path, not an emitted URL. Never loads the asset. */
  path: string;
  origin: SubmissionAssetOrigin;
  intendedScopes: readonly SubmissionAssetScope[];
  /** Granted scopes must be supported by permissionBasis and sourceUrl. */
  allowedScopes: readonly SubmissionAssetScope[];
  creatorOrOwner: string | null;
  permissionBasis: string | null;
  attributionRequirement: string | null;
  attributionStatus: 'unknown' | 'not_required' | 'fulfilled' | 'missing';
  aiMaterialDeclaration: AiMaterialDeclaration;
  sourceUrl: string | null;
  reviewedAt: string;
  blockReason?: string;
  note: string;
}

// Generated paths only: importing this inventory never bundles media. The test
// compares it with the filesystem; update with pnpm submission:inventory.
export const DISCOVERED_SUBMISSION_ASSET_PATHS: readonly string[] = assetPaths;

function inputForPath(path: string): SubmissionAssetRightsInput {
  const base: SubmissionAssetRightsInput = {
    path,
    origin: 'unknown',
    intendedScopes: ['project_demo', 'hackathon_submission', 'public_web'],
    allowedScopes: [],
    creatorOrOwner: null,
    permissionBasis: null,
    attributionRequirement: null,
    attributionStatus: 'unknown',
    aiMaterialDeclaration: 'not_declared',
    sourceUrl: null,
    reviewedAt: '2026-09-22',
    note: '権利者・利用許諾・帰属表示・AI素材の申告を確認するまで提出・公開には使用できません。',
  };
  if (path.startsWith('src/assets/netlify-parity/')) {
    return {
      ...base,
      sourceUrl: 'src/assets/netlify-parity/README.md',
      blockReason: '参照用素材の記録には権利者・公開再利用許諾がありません。許諾を記録するか、提出・公開用素材から除外してください。',
    };
  }
  if (path.startsWith('src/assets/fieldwork/')) {
    return {
      ...base,
      origin: 'fieldwork',
      sourceUrl: 'src/assets/fieldwork/okutama/README.md',
      note: 'プロジェクト内デモの経緯は記録済み。撮影者の提出・公開許諾は未登録です。Driveへのアクセス権を公開ライセンスとして扱いません。',
    };
  }
  if (/^src\/assets\/figma(?:-\d+)?\//.test(path)) {
    return {
      ...base,
      origin: 'figma_team',
      note: 'Figmaのノード・書き出し履歴は権利許諾ではありません。制作者・元素材・AI利用・提出公開範囲を確認してください。',
    };
  }
  if (path.startsWith('docs/')) {
    return {
      ...base,
      note: 'レビュー証拠・設計資料です。画面内の素材を含む提出・公開許諾は未確認。証拠としての保管と提出での再利用を区別してください。',
    };
  }
  return base;
}

/** No grants inferred from file location, Figma access, or website availability. */
export const SUBMISSION_ASSET_RIGHTS_INPUTS: readonly SubmissionAssetRightsInput[] =
  DISCOVERED_SUBMISSION_ASSET_PATHS.map(inputForPath);

export const SUBMISSION_RULES = {
  checkedAt: '2026-09-22',
  sources: [
    { label: '公式募集要項', url: 'https://odhackathon.metro.tokyo.lg.jp/recruitment/' },
    { label: '公式参加者ガイドブック', url: 'https://odh-tokyo2026.code4japan.org/' },
  ],
  summary: [
    'オープンデータと民間データを利用できます。提出項目④の代表オープンデータは最大10件。公開された公式・事業者サイトというだけではオープンデータになりません。',
    '引用元を示し、利用条件を確認してください。記事・有料記事の画面転載は避けます。',
    '公式ガイドは地図のロゴ・帰属表示を隠さないキャプチャを認めています。本リポジトリはより慎重に、地図サービスの画像を保存せず参照URLを記録します。',
    '素材は利用条件に従い、写真は本人・チーム撮影または許諾のあるものを使用します。BGMは権利範囲が複雑なためガイドは使用を勧めていません。',
    '提出項目⑦でAI利用・ライセンスを確認します。AI生成・合成も元素材の条件に従い、元素材の権利が不明なら使用できません。',
    '必要な権利処理は応募者の責任です。この一覧は確認を支援するもので、許諾や会場情報の正しさを保証するものではありません。',
  ],
} as const;

/** External artifacts have not entered this repository's review boundary. */
export const FINAL_PRESENTATION_REVIEW: readonly {
  id: string; label: string; status: 'ready' | 'needs_confirmation' | 'blocked'; note: string;
}[] = [
  { id: 'slides', label: '最終発表スライド・PDF', status: 'needs_confirmation', note: '最終提出ファイル・素材一覧・帰属表示が未登録です。' },
  { id: 'video', label: 'デモ動画・音声', status: 'needs_confirmation', note: '最終動画・BGM・音声・画面内素材・AI申告が未登録です。' },
] as const;
