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

const badgeFixtures = [
  {
    name: '地元グルメ入門',
    description: '地元の料理を\n食べてみよう',
    artwork: earnedBadge,
    earned: true,
    isNew: true,
  },
  {
    name: 'おにぎり好き',
    description: 'おにぎりを\n食べた',
    artwork: yamameBadge,
    earned: true,
  },
  {
    name: '和スイーツ通',
    description: '和スイーツを\n食べた',
    artwork: edoTokyoVegetablesBadge,
    earned: true,
  },
  {
    name: '地産地消サポーター',
    description: '地元の食材を\n味わった',
    artwork: earnedBadge,
    earned: true,
  },
  {
    name: 'おみやげコレクター',
    description: 'お土産を\n購入した',
    artwork: yamameBadge,
    earned: true,
  },
  {
    name: '食文化を学ぶ人',
    description: '食の歴史や文化を\n学んだ',
    artwork: edoTokyoVegetablesBadge,
    earned: true,
  },
  {
    name: '海の幸マスター',
    description: '海の幸を\n食べた',
    artwork: lockedBadge,
    earned: false,
  },
  {
    name: '料理体験チャレンジャー',
    description: '料理体験に\n参加した',
    artwork: lockedBadge,
    earned: false,
  },
  {
    name: '発酵食品ラバー',
    description: '発酵食品を\n体験した',
    artwork: lockedBadge,
    earned: false,
  },
] as const;

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

export function BadgeGridPreviewScreen({
  active,
  onBack,
  onNavigate,
}: BadgeGridPreviewScreenProps) {
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

        <section className="badge-grid-preview__summary" aria-label="バッジ獲得状況">
          <div className="badge-grid-preview__count">
            <span>獲得数</span>
            <p><strong>12</strong><small>/ 24</small></p>
          </div>
          <div className="badge-grid-preview__next">
            <p>次のバッジまであと <strong>2</strong> 個！</p>
            <span className="badge-grid-preview__track" aria-hidden="true"><i /></span>
          </div>
          <span className="badge-grid-preview__flag"><ProgressFlag /></span>
        </section>

        <div className="badge-grid-preview__filters" aria-label="カテゴリ表示見本">
          {categories.map((category, index) => (
            <span className={index === 0 ? 'is-selected' : undefined} key={category}>
              {category}
            </span>
          ))}
        </div>

        <ul className="badge-grid-preview__grid">
          {badgeFixtures.map((badge) => (
            <li
              className={`badge-grid-preview__card${badge.earned ? '' : ' badge-grid-preview__card--locked'}`}
              key={badge.name}
            >
              {'isNew' in badge && badge.isNew ? (
                <span className="badge-grid-preview__new">NEW</span>
              ) : null}
              {!badge.earned ? <span className="badge-grid-preview__lock"><LockIcon /></span> : null}
              <img src={badge.artwork} alt="" aria-hidden="true" />
              <strong>{badge.name}</strong>
              <p>{badge.description}</p>
            </li>
          ))}
        </ul>

        <div className="badge-grid-preview__cta" aria-disabled="true">
          <span className="badge-grid-preview__cta-flag"><ProgressFlag /></span>
          <p><strong>次のバッジまであと 2 個！</strong><small>いろいろな食体験をして、コレクションを増やそう！</small></p>
          <span className="badge-grid-preview__chevron" aria-hidden="true" />
        </div>
      </div>

      <BottomNavigation
        active="my"
        copy={previewCopy.nav}
        onNavigate={onNavigate}
        variant="issue-296-my"
      />
    </section>
  );
}
