import { useEffect, useState } from 'react';
import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { referenceAssets, type ReferenceCopy, type SpotPresentation } from '../content';
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
  guide?: { title: LocalizedText; body: LocalizedText; action: LocalizedText };
  caution: LocalizedText[];
}

const local = (ja: string, en: string, zhTW: string): LocalizedText => ({ ja, en, 'zh-TW': zhTW });

const referenceSpotDetails: Partial<Record<string, ReferenceSpotDetail>> = {
  'okutama-tourism-office': {
    tags: [
      { color: '#8FAE5C', label: local('観光案内', 'Visitor information', '觀光案內') },
      { color: '#F0A24C', label: local('参考情報', 'Reference information', '參考資訊') },
      { color: '#5D9BEF', label: local('確認中', 'Confirmation pending', '確認中') },
    ],
    description: local(
      '奥多摩町観光案内所として掲載している参考情報です。所在地・電話番号を含む内容は現在確認中です。',
      'Reference information for the Okutama Town Tourist Information Center. The listed details are still being confirmed.',
      '此處為奧多摩町觀光服務處的參考資訊，包含地址與電話號碼在內的刊載內容仍在確認中。',
    ),
    information: [
      {
        icon: 'information',
        label: local('施設', 'Place', '設施'),
        value: local(
          '奥多摩町観光案内所',
          'Okutama Town Tourist Information Center',
          '奧多摩町觀光服務處',
        ),
      },
      {
        icon: 'information',
        label: local('所在地', 'Address', '地址'),
        value: local(
          '東京都西多摩郡奥多摩町氷川210',
          '210 Hikawa, Okutama, Nishitama, Tokyo',
          '東京都西多摩郡奧多摩町冰川 210',
        ),
      },
      {
        icon: 'information',
        label: local('電話', 'Phone', '電話'),
        value: local('0428-83-2152', '0428-83-2152', '0428-83-2152'),
      },
      {
        icon: 'information',
        label: local('確認状況', 'Verification status', '確認狀態'),
        value: local(
          '施設名・所在地・電話番号を含む掲載内容は現在確認中です。訪問前に奥多摩観光協会の公式情報をご確認ください。',
          'The listed place name, address, and phone number are still being confirmed. Check the Okutama Tourism Association’s official information before visiting.',
          '刊載的設施名稱、地址與電話號碼仍在確認中。造訪前請以奧多摩觀光協會的官方資訊為準。',
        ),
      },
    ],
    guide: {
      title: local('公式情報', 'Official information', '官方資訊'),
      body: local(
        '掲載内容は現在確認中です。訪問前に奥多摩観光協会の公式情報をご確認ください。',
        'This listing is still being confirmed. Check current details with the Okutama Tourism Association’s official information before visiting.',
        '此刊載內容仍在確認中。造訪前請以奧多摩觀光協會的官方資訊確認最新內容。',
      ),
      action: local('公式情報を確認する', 'Check official information', '查看官方資訊'),
    },
    caution: [
      local(
        '・営業時間・サービス内容・アクセスは、訪問前に奥多摩観光協会の公式情報をご確認ください。',
        '• Confirm hours, services, and access with the Okutama Tourism Association’s official information before visiting.',
        '・營業時間、服務內容與交通方式，請於造訪前以奧多摩觀光協會的官方資訊為準。',
      ),
    ],
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
  onOpenGuide?: (spot: SpotPresentation) => void;
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
  onOpenGuide,
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
      }
    : localized.guide;
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

        {guide ? (
          <section className="guide-box">
            <h2>{guide.title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{guide.body}</p>
            <button className="book" onClick={() => onOpenGuide?.(spot)} type="button">
              {guide.action}
            </button>
          </section>
        ) : null}

        <aside className="caution">
          <h3>{cautionHeading[locale]}</h3>
          <ul>
            {cautions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
      <BottomNavigation active="mogu" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
