import { useEffect, useState } from 'react';
import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { PresentationFactsBlock } from '../components/PresentationFactsBlock';
import {
  referenceAssets,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';
import { BackIcon, BookmarkIcon, ClockIcon, InformationIcon, TrainIcon } from './screenIcons';

const tagColors = ['#8FAE5C', '#F0A24C', '#5D9BEF', '#F2879B', '#5E7239'];

interface LocalizedText {
  ja: string;
  en: string;
  'zh-TW': string;
}

interface ReferenceSpotDetail {
  tags: Array<{ color: string; label: LocalizedText }>;
  description: LocalizedText;
  information: Array<{ icon: 'clock' | 'train' | 'information'; label: LocalizedText; value: LocalizedText }>;
  guide?: { title: LocalizedText; body: LocalizedText; action: LocalizedText; href: string };
  caution: LocalizedText[];
}

const local = (ja: string, en: string, zhTW: string): LocalizedText => ({ ja, en, 'zh-TW': zhTW });

const referenceSpotDetails: Partial<Record<string, ReferenceSpotDetail>> = {
  'okutama-tourism-office': {
    tags: [
      { color: '#8FAE5C', label: local('観光案内', 'Visitor information', '觀光案內') },
    ],
    description: local(
      '奥多摩の観光情報を確認できる案内所です。',
      'A visitor-information center for checking current Okutama travel details.',
      '可確認奧多摩最新旅遊資訊的觀光案內所。',
    ),
    information: [
      { icon: 'clock', label: local('営業時間', 'Hours', '營業時間'), value: local('8:30–17:00（年末年始を除く）', '8:30–17:00 (closed over New Year)', '8:30–17:00（年末年始休息）') },
      { icon: 'information', label: local('住所', 'Address', '地址'), value: local('東京都西多摩郡奥多摩町氷川210', '210 Hikawa, Okutama, Nishitama, Tokyo', '東京都西多摩郡奧多摩町冰川 210') },
      { icon: 'information', label: local('電話', 'Phone', '電話'), value: local('0428-83-2152', '0428-83-2152', '0428-83-2152') },
      { icon: 'train', label: local('アクセス', 'Access', '交通'), value: local('奥多摩駅から徒歩 約1分', 'About 1 minute on foot from Okutama Station', '從奧多摩站步行約 1 分鐘') },
    ],
    guide: {
      title: local('ガイド・体験の最新情報', 'Current guide and experience information', '最新導覽與體驗資訊'),
      body: local(
        '現在のガイド・体験・予約方法は、奥多摩観光案内所へお問い合わせください。',
        'Ask the visitor center about current guide, experience, and booking options.',
        '請向觀光案內所洽詢最新導覽、體驗與預約方式。',
      ),
      action: local('公式情報を確認する　＞', 'Check official information  ›', '確認官方資訊　›'),
      href: 'https://www.okutama.gr.jp/site/about/',
    },
    caution: [],
  },
};

const cautionHeading: Record<Locale, string> = {
  ja: 'ご注意',
  en: 'Please note',
  'zh-TW': '注意事項',
};

function SpotInformationIcon({ icon }: { icon: ReferenceSpotDetail['information'][number]['icon'] }) {
  if (icon === 'clock') return <ClockIcon />;
  if (icon === 'train') return <TrainIcon />;
  return <InformationIcon />;
}

export interface SpotScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  spot: SpotPresentation;
  saved?: boolean;
  onBack: () => void;
  onToggleSaved?: (spot: SpotPresentation) => void;
  onNavigate: (path: string) => void;
}

export function SpotScreen({
  active,
  copy,
  locale,
  spot,
  saved = false,
  onBack,
  onToggleSaved,
  onNavigate,
}: SpotScreenProps) {
  const photos = [spot.imageAssetId, ...spot.thumbnailAssetIds];
  const [photoIndex, setPhotoIndex] = useState(0);
  const localized = spot.copy[locale];
  const referenceDetail = referenceSpotDetails[spot.id];
  const displayTags = referenceDetail?.tags.map((tag) => ({ color: tag.color, label: tag.label[locale] }))
    ?? localized.tags.map((label, index) => ({ color: tagColors[index % tagColors.length], label }));
  const information = referenceDetail?.information.map((row) => ({
    icon: row.icon,
    label: row.label[locale],
    value: row.value[locale],
  })) ?? localized.practicalInfo.map((row) => ({ icon: 'information' as const, ...row }));
  const guide = referenceDetail?.guide
    ? {
        title: referenceDetail.guide.title[locale],
        body: referenceDetail.guide.body[locale],
        action: referenceDetail.guide.action[locale],
        href: referenceDetail.guide.href,
      }
    : localized.guide ? { ...localized.guide, href: undefined } : undefined;
  const cautions = referenceDetail?.caution.map((item) => item[locale]) ?? localized.caution;

  useEffect(() => setPhotoIndex(0), [spot.id]);

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="spot"
      data-screen-active={active}
      data-spot-id={spot.id}
      aria-hidden={!active}
    >
      <button className="fab-back" onClick={onBack} type="button" aria-label={copy.actions.back}>
        <BackIcon />
      </button>
      <div className="scroll">
        <div className="spot-hero">
          <button
            className={`bkm${saved ? ' saved' : ''}`}
            onClick={() => onToggleSaved?.(spot)}
            type="button"
            aria-label={saved
              ? locale === 'ja' ? 'お気に入りから削除' : locale === 'zh-TW' ? '從收藏移除' : 'Remove from favorites'
              : locale === 'ja' ? 'お気に入りに保存' : locale === 'zh-TW' ? '儲存至收藏' : 'Save to favorites'}
            aria-pressed={saved}
          >
            <BookmarkIcon />
          </button>
          <img src={referenceAssets[photos[photoIndex] ?? spot.imageAssetId]} alt={localized.name} />
        </div>
        <div className="thumbs" aria-label={`${localized.name} photos`}>
          {photos.map((assetId, index) => (
            <img
              className={photoIndex === index ? 'active' : undefined}
              key={`${assetId}-${index}`}
              onClick={() => setPhotoIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setPhotoIndex(index);
                }
              }}
              src={referenceAssets[assetId]}
              alt=""
              role="button"
              tabIndex={active ? 0 : -1}
              aria-label={`${index + 1}/${photos.length}`}
              aria-pressed={photoIndex === index}
            />
          ))}
        </div>
        <div className="spot-main">
          <h1>{localized.name}</h1>
          <div className="lead">{localized.lead}</div>
          <div className="spot-tags">
            {displayTags.map((tag) => (
              <span key={tag.label} style={{ background: tag.color }}>
                {tag.label}
              </span>
            ))}
          </div>
          <div className="desc" style={{ whiteSpace: 'pre-line' }}>
            {referenceDetail?.description[locale] ?? localized.description}
          </div>
        </div>

        {information.length > 0 ? (
          <section className="info-sec">
            <h2>{copy.spot.practicalInfo}</h2>
            {information.map((row) => (
              <div className="info-row" key={`${row.label}-${row.value}`}>
                <span className="ic">
                  <SpotInformationIcon icon={row.icon} />
                </span>
                <span className="k">{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </section>
        ) : null}

        {guide ? (
          <section className="guide-box">
            <h2>{guide.title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{guide.body}</p>
            {guide.href ? (
              <a className="book" href={guide.href} rel="noopener noreferrer" target="_blank">
                {guide.action}
              </a>
            ) : null}
          </section>
        ) : null}

        <PresentationFactsBlock facts={spot.facts} locale={locale} />

        {cautions.length > 0 ? (
          <aside className="caution">
            <h3>{cautionHeading[locale]}</h3>
            <ul>
              {cautions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
      <BottomNavigation active="mogu" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
