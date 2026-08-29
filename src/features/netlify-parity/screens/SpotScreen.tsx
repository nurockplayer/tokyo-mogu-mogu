import { useEffect, useState } from 'react';
import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { referenceAssets, type ReferenceCopy, type SpotPresentation } from '../content';
import {
  referenceSpotDetails,
  type ReferenceSpotDetail,
} from '../factual-presentation';
import { BackIcon, BookmarkIcon, ClockIcon, InformationIcon, TrainIcon } from './screenIcons';

const tagColors = ['#8FAE5C', '#F0A24C', '#5D9BEF', '#F2879B', '#5E7239'];

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
        url: referenceDetail.guide.url,
      }
    : localized.guide ? { ...localized.guide, url: undefined } : undefined;
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
            {guide.url ? (
              <a className="book" href={guide.url} target="_blank" rel="noreferrer">
                {guide.action}
              </a>
            ) : (
              <button className="book" onClick={() => onOpenGuide?.(spot)} type="button">
                {guide.action}
              </button>
            )}
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
