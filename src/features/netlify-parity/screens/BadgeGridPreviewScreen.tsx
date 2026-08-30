import { useId, useState } from 'react';
import binderGreen from '../../../assets/figma-296/binder-green.svg';
import binderPage from '../../../assets/figma-296/binder-page.svg';
import binderRing from '../../../assets/figma-296/binder-ring.svg';
import edoTokyoVegetablesBadge from '../../../assets/figma-360/badge-edo-tokyo-vegetables.png';
import yamameBadge from '../../../assets/figma-360/badge-yamame.png';
import earnedBadge from '../../../assets/figma-296/badge-earned.png';
import lockedBadge from '../../../assets/figma-296/food-badge.png';
import mascot from '../../../assets/netlify-parity/logo_face_t.png';
import { BottomNavigation } from '../components/BottomNavigation';
import { Issue296Header } from '../components/Issue296Header';
import { referenceCopy } from '../content';
import '../badge-grid-preview.css';

const previewCopy = referenceCopy('ja');

const categories = ['すべて', '食べる', 'つくる', '買う', '学ぶ', 'その他'] as const;
type BadgeCategory = (typeof categories)[number];

const badgeFixtures = [
  { id: 'local-gourmet', name: '地元グルメ入門', description: '地元の料理を\n食べてみよう', category: '食べる', artwork: earnedBadge, earned: true, isNew: true },
  { id: 'onigiri', name: 'おにぎり好き', description: 'おにぎりを\n食べた', category: '食べる', artwork: yamameBadge, earned: true, isNew: false },
  { id: 'sweets', name: '和スイーツ通', description: '和スイーツを\nつくった', category: 'つくる', artwork: edoTokyoVegetablesBadge, earned: true, isNew: false },
  { id: 'local-ingredients', name: '地産地消サポーター', description: '地元の食材を\n味わった', category: 'その他', artwork: earnedBadge, earned: true, isNew: false },
  { id: 'souvenir', name: 'おみやげコレクター', description: 'お土産を\n購入した', category: '買う', artwork: yamameBadge, earned: true, isNew: false },
  { id: 'food-culture', name: '食文化を学ぶ人', description: '食の歴史や文化を\n学んだ', category: '学ぶ', artwork: edoTokyoVegetablesBadge, earned: true, isNew: false },
  { id: 'seafood', name: '海の幸マスター', description: '海の幸を\n食べた', category: '食べる', artwork: lockedBadge, earned: false, isNew: false },
  { id: 'cooking', name: '料理体験チャレンジャー', description: '料理体験に\n参加した', category: 'つくる', artwork: lockedBadge, earned: false, isNew: false },
  { id: 'fermented-food', name: '発酵食品ラバー', description: '発酵食品を\n体験した', category: 'その他', artwork: lockedBadge, earned: false, isNew: false },
] as const;

type BadgeFixture = (typeof badgeFixtures)[number];
type PreviewPresentation = { kind: 'badge'; badge: BadgeFixture } | { kind: 'progress' } | null;

interface BadgeGridPreviewScreenProps {
  active: boolean;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

function ProgressFlag() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 27V5" />
      <path d="M11 7c5-4 8 4 14 0v11c-6 4-9-4-14 0Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 10V7.6a4.5 4.5 0 0 1 9 0V10" />
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M12 14v3" />
    </svg>
  );
}

interface PreviewDialogProps {
  presentation: Exclude<PreviewPresentation, null>;
  onClose: () => void;
}

function PreviewDialog({ presentation, onClose }: PreviewDialogProps) {
  const titleId = useId();
  const isProgress = presentation.kind === 'progress';
  const badge = isProgress ? null : presentation.badge;
  const title = isProgress ? 'バッジの進みかた' : badge?.name ?? '';

  return (
    <div className="badge-grid-preview__dialog-backdrop">
      <section className="badge-grid-preview__dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <img className="badge-grid-preview__dialog-binder" src={binderGreen} alt="" aria-hidden="true" />
        <img className="badge-grid-preview__dialog-page" src={binderPage} alt="" aria-hidden="true" />
        <img className="badge-grid-preview__dialog-ring" src={binderRing} alt="" aria-hidden="true" />
        <button className="badge-grid-preview__dialog-close" type="button" onClick={onClose} aria-label="閉じる">
          <span aria-hidden="true" />
        </button>

        {isProgress ? (
          <div className="badge-grid-preview__dialog-content badge-grid-preview__dialog-content--progress">
            <span className="badge-grid-preview__dialog-kicker">実験用プレビュー</span>
            <h2 id={titleId}>{title}</h2>
            <p className="badge-grid-preview__dialog-count"><strong>12</strong> / 24</p>
            <p>この画面の進み具合は、表示を試すための固定データです。</p>
            <p>バッジの獲得や記録にはつながりません。</p>
          </div>
        ) : badge?.earned ? (
          <div className="badge-grid-preview__dialog-content">
            <span className="badge-grid-preview__dialog-kicker">実験用プレビュー</span>
            <img className="badge-grid-preview__dialog-artwork" src={badge.artwork} alt="" aria-hidden="true" />
            <h2 id={titleId}>{title}</h2>
            <span className="badge-grid-preview__dialog-status">獲得済み</span>
            <p>{badge.description.replace('\n', ' ')}</p>
            <small>この詳細は表示検証用の固定データです。</small>
          </div>
        ) : (
          <div className="badge-grid-preview__dialog-content">
            <span className="badge-grid-preview__dialog-kicker">実験用プレビュー</span>
            <img className="badge-grid-preview__dialog-artwork badge-grid-preview__dialog-artwork--locked" src={badge?.artwork} alt="" aria-hidden="true" />
            <h2 id={titleId}>{title}</h2>
            <span className="badge-grid-preview__dialog-status badge-grid-preview__dialog-status--locked">未獲得</span>
            <h3>実験用の解除条件</h3>
            <p>{badge?.description.replace('\n', ' ')}という表示を確認するためのサンプルです。</p>
            <small>実際の獲得条件や記録にはつながりません。</small>
          </div>
        )}
      </section>
    </div>
  );
}

export function BadgeGridPreviewScreen({ active, onBack, onNavigate }: BadgeGridPreviewScreenProps) {
  const [category, setCategory] = useState<BadgeCategory>('すべて');
  const [presentation, setPresentation] = useState<PreviewPresentation>(null);
  const visibleBadges = category === 'すべて'
    ? badgeFixtures
    : badgeFixtures.filter((badge) => badge.category === category);

  return (
    <section
      className={`reference-screen issue-296-screen badge-grid-preview${active ? ' on' : ''}`}
      data-screen="badge-grid-preview"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <Issue296Header title="食のバッジ" backLabel="マイページに戻る" onBack={onBack} />
      <svg className="badge-grid-preview__header-mark" viewBox="0 0 42 34" aria-hidden="true">
        <path d="M20 27C17 16 21 7 32 3c1 10-2 18-12 24Z" />
        <path d="M18 29C14 22 9 18 3 18c2 8 7 12 15 11Z" />
        <path d="M17 31c3-8 8-14 16-20M17 30c-2-4-6-7-10-9" />
      </svg>

      <div className="badge-grid-preview__scroll scroll">
        <div className="badge-grid-preview__intro">
          <div>
            <h2>集めたバッジ</h2>
            <p>食の体験を重ねて、バッジを集めよう！<br />あなたの「食の冒険」を記録します。</p>
          </div>
          <img src={mascot} alt="" aria-hidden="true" />
        </div>

        <button className="badge-grid-preview__summary" type="button" aria-haspopup="dialog" aria-label="バッジの進みかた" onClick={() => setPresentation({ kind: 'progress' })}>
          <span className="badge-grid-preview__count">
            <span>獲得数</span>
            <span><strong>12</strong><small>/ 24</small></span>
          </span>
          <span className="badge-grid-preview__next">
            <span>次のバッジまであと <strong>2</strong> 個！</span>
            <span className="badge-grid-preview__track" aria-hidden="true"><i /></span>
          </span>
          <span className="badge-grid-preview__flag"><ProgressFlag /></span>
        </button>

        <div className="badge-grid-preview__filters" aria-label="カテゴリで絞り込む">
          {categories.map((item) => (
            <button className={category === item ? 'is-selected' : undefined} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>
              {item}
            </button>
          ))}
        </div>

        <ul className="badge-grid-preview__grid" aria-live="polite">
          {visibleBadges.map((badge) => (
            <li key={badge.id}>
              <button
                className={`badge-grid-preview__card${badge.earned ? '' : ' badge-grid-preview__card--locked'}`}
                type="button"
                aria-haspopup="dialog"
                aria-label={badge.earned ? badge.name : `${badge.name}（未獲得）`}
                onClick={() => setPresentation({ kind: 'badge', badge })}
              >
                {badge.isNew ? <span className="badge-grid-preview__new">NEW</span> : null}
                {!badge.earned ? <span className="badge-grid-preview__lock"><LockIcon /></span> : null}
                <img src={badge.artwork} alt="" aria-hidden="true" />
                <strong>{badge.name}</strong>
                <span>{badge.description}</span>
              </button>
            </li>
          ))}
        </ul>

        <button className="badge-grid-preview__cta" type="button" aria-haspopup="dialog" onClick={() => setPresentation({ kind: 'progress' })}>
          <span className="badge-grid-preview__cta-flag"><ProgressFlag /></span>
          <span className="badge-grid-preview__cta-copy"><strong>次のバッジまであと 2 個！</strong><small>いろいろな食体験をして、コレクションを増やそう！</small></span>
          <span className="badge-grid-preview__chevron" aria-hidden="true" />
        </button>
      </div>

      <BottomNavigation active="my" copy={previewCopy.nav} onNavigate={onNavigate} variant="issue-296-my" />
      {presentation ? <PreviewDialog presentation={presentation} onClose={() => setPresentation(null)} /> : null}
    </section>
  );
}
