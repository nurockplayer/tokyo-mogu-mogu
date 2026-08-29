import { useState } from 'react';
import countStamp from '../../../assets/figma-296/badge-count-stamp.svg';
import earnedBadge from '../../../assets/figma-296/badge-earned.png';
import emptyBadge from '../../../assets/figma-296/badge-empty.png';
import nextButton from '../../../assets/figma-296/badge-next.svg';
import previousButton from '../../../assets/figma-296/badge-prev.svg';
import storeCard from '../../../assets/figma-296/badge-store-card.png';
import binderGreen from '../../../assets/figma-296/binder-green.svg';
import binderPage from '../../../assets/figma-296/binder-page.svg';
import binderRing from '../../../assets/figma-296/binder-ring.svg';
import binderShadow from '../../../assets/figma-296/binder-shadow.svg';
import edoTokyoVegetablesBadge from '../../../assets/figma-360/badge-edo-tokyo-vegetables.png';
import yamameBadge from '../../../assets/figma-360/badge-yamame.png';
import type { Locale } from '../../../i18n';
import { Issue296Header } from '../components/Issue296Header';

const badgeLabels: Record<Locale, {
  title: string;
  back: string;
  intro: string;
  countLabel: string;
  acquired: string;
  emptyTitle: string;
  emptyBodyBefore: string;
  emptyBodyAccent: string;
  emptyBodyAfter: string;
  previous: string;
  next: string;
  earnedAlt: string;
  yamameAlt: string;
  edoTokyoVegetablesAlt: string;
  unearned: string;
  storeAlt: string;
}> = {
  ja: {
    title: '食のバッジ', back: 'マイページに戻る', intro: '東京の食文化を巡って、\n旅の印を集めよう。',
    countLabel: '獲得した食バッジ', acquired: '2026/08/23 獲得', emptyTitle: 'まだバッジがありません',
    emptyBodyBefore: '地域の食文化を体験したら、対象店舗・スポットに\nある', emptyBodyAccent: 'QRコード',
    emptyBodyAfter: 'を読み取ってバッジを集めよう！',
    previous: '前のバッジ', next: '次のバッジ', earnedAlt: '奥多摩わさびの獲得済みバッジ',
    yamameAlt: '奥多摩やまめの未獲得バッジ', edoTokyoVegetablesAlt: '江戸東京野菜の未獲得バッジ',
    unearned: '未獲得',
    storeAlt: '獲得店舗のサンプルカード',
  },
  en: {
    title: 'Food Badges', back: 'Back to My', intro: 'Explore Tokyo food culture\nand collect marks of your journey.',
    countLabel: 'Badges earned', acquired: 'Earned 2026/08/23', emptyTitle: 'No badge here yet',
    emptyBodyBefore: 'Scan the ', emptyBodyAccent: 'QR code', emptyBodyAfter: ' at the shop\nto earn a badge.',
    previous: 'Previous badge', next: 'Next badge', earnedAlt: 'Earned Okutama wasabi badge',
    yamameAlt: 'Unearned Okutama yamame badge', edoTokyoVegetablesAlt: 'Unearned Edo-Tokyo vegetables badge',
    unearned: 'Not earned',
    storeAlt: 'Sample earned-location card',
  },
  'zh-TW': {
    title: '美食徽章', back: '返回我的頁面', intro: '走訪東京飲食文化，\n收集旅途的印記吧。',
    countLabel: '已獲得徽章', acquired: '2026/08/23 獲得', emptyTitle: '這一頁還沒有徽章',
    emptyBodyBefore: '掃描店內的', emptyBodyAccent: 'QR Code', emptyBodyAfter: '，\n即可獲得徽章。',
    previous: '上一枚徽章', next: '下一枚徽章', earnedAlt: '已獲得的奧多摩山葵徽章',
    yamameAlt: '尚未獲得的奧多摩山女魚徽章', edoTokyoVegetablesAlt: '尚未獲得的江戶東京蔬菜徽章',
    unearned: '尚未獲得',
    storeAlt: '獲得地點範例卡片',
  },
};

const badgePages = [
  { kind: 'wasabi', status: 'earned', artwork: earnedBadge },
  { kind: 'yamame', status: 'unearned', artwork: yamameBadge },
  { kind: 'edo-tokyo-vegetables', status: 'unearned', artwork: edoTokyoVegetablesBadge },
  { kind: 'empty', status: 'empty' },
] as const;

const ringPositions = [60.277, 105.967, 151.657, 197.347, 243.037, 288.727, 334.417, 380.107, 425.795];

interface BadgesScreenProps {
  active: boolean;
  locale: Locale;
  onBack: () => void;
}

export function BadgesScreen({ active, locale, onBack }: BadgesScreenProps) {
  const [page, setPage] = useState(1);
  const labels = badgeLabels[locale];
  const currentBadge = badgePages[page - 1];

  const previewAlt = currentBadge.kind === 'yamame'
    ? labels.yamameAlt
    : labels.edoTokyoVegetablesAlt;

  return (
    <section
      className={`reference-screen issue-296-screen issue-296-badges${active ? ' on' : ''}`}
      data-screen="badges"
      data-screen-active={active}
      data-badge-page={page}
      data-badge-kind={currentBadge.kind}
      data-badge-status={currentBadge.status}
      aria-hidden={!active}
    >
      <div className="issue-360-badge-preload" aria-hidden="true">
        <img src={yamameBadge} alt="" />
        <img src={edoTokyoVegetablesBadge} alt="" />
        <img src={emptyBadge} alt="" />
      </div>
      <Issue296Header title={labels.title} backLabel={labels.back} onBack={onBack} />
      <div className="issue-296-badge-body scroll">
        <p className="issue-296-badge-intro">{labels.intro}</p>
        <div className="issue-296-badge-count" aria-label={`1 ${labels.countLabel}`}>
          <img src={countStamp} alt="" />
          <p><strong>1</strong><span>{locale === 'ja' ? '枚' : ''}</span></p>
          <small>{labels.countLabel}</small>
        </div>

        <div className="issue-296-binder">
          <img className="issue-296-binder-green" src={binderGreen} alt="" />
          <img className="issue-296-binder-shadow" src={binderShadow} alt="" />
          <img className="issue-296-binder-page" src={binderPage} alt="" />
          {ringPositions.map((top) => (
            <img
              className="issue-296-binder-ring"
              src={binderRing}
              alt=""
              style={{ top: `${(top / 564) * 100}%` }}
              key={top}
            />
          ))}

          {page === 1 ? (
            <>
              <img
                className="issue-296-earned-stamp"
                src={earnedBadge}
                alt={labels.earnedAlt}
                data-badge-design="wasabi"
              />
              <p className="issue-296-earned-date">{labels.acquired}</p>
              <img className="issue-296-store-card" src={storeCard} alt={labels.storeAlt} />
            </>
          ) : currentBadge.status === 'unearned' ? (
            <>
              <img
                className="issue-360-preview-stamp"
                src={currentBadge.artwork}
                alt={previewAlt}
                data-badge-design={currentBadge.kind}
              />
              <p className="issue-360-preview-status">{labels.unearned}</p>
            </>
          ) : (
            <>
              <img className="issue-296-empty-stamp" src={emptyBadge} alt="" aria-hidden="true" />
              <div className="issue-296-empty-copy">
                <strong>{labels.emptyTitle}</strong>
                <p>{labels.emptyBodyBefore}<em>{labels.emptyBodyAccent}</em>{labels.emptyBodyAfter}</p>
              </div>
            </>
          )}

          <button
            className="issue-296-badge-previous"
            type="button"
            aria-label={labels.previous}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            <img src={previousButton} alt="" />
          </button>
          <output className="issue-296-page-indicator" aria-live="polite">{page}/100</output>
          <button
            className="issue-296-badge-next"
            type="button"
            aria-label={labels.next}
            onClick={() => setPage((current) => Math.min(badgePages.length, current + 1))}
          >
            <img src={nextButton} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}
