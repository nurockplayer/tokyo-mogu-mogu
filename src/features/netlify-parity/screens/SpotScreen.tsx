import { useEffect, useState } from 'react';
import type { Locale } from '../../../i18n';
import { strings } from '../../../i18n/resources';
import { getPlaceById, getSpotDetail } from '../../../data';
import { resolveSpotOfficialLink } from '../../../data/spot-official-link';
import { resolveJourneyVisitorSource } from '../../../data/journey-admission';
import type { JourneyRecord } from '../../../data/journey-record';
import type { FoodProfile } from '../../../lib/food-profile';
import { factRetrievalNote, retrievalNote } from '../journey-publication';
import { BottomNavigation } from '../components/BottomNavigation';
import { PresentationMedia } from '../components/PresentationMedia';
import { referenceAssets, type ReferenceCopy, type SpotPresentation } from '../content';
import { buildSpotPhrase } from '../spot-phrase';
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

const visitorGuide: Record<Locale, { title: string; guidance: string; unavailable: string; action: string }> = {
  ja: { title: '公式の訪問案内', guidance: '訪問前に最新のアクセス情報をご確認ください。', unavailable: '現在利用できる公式の訪問案内リンクはありません。訪問前に施設の最新情報をご確認ください。', action: '公式の訪問案内を開く' },
  en: { title: 'Official visitor information', guidance: 'Check current access information before visiting.', unavailable: 'An official visitor information link is currently unavailable. Check with the venue before visiting.', action: 'Open official visitor information' },
  'zh-TW': { title: '官方參訪資訊', guidance: '造訪前請確認最新交通資訊。', unavailable: '目前沒有可用的官方參訪資訊連結。造訪前請向景點確認最新資訊。', action: '開啟官方參訪資訊' },
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
  record?: JourneyRecord;
  foodProfile: FoodProfile | null;
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
  record,
  foodProfile,
  saved = false,
  onBack,
  onOpenGuide,
  onToggleSaved,
  onNavigate,
}: SpotScreenProps) {
  const photos = [spot.imageAssetId, ...spot.thumbnailAssetIds].filter(
    (assetId): assetId is NonNullable<typeof assetId> => assetId !== undefined,
  );
  const [photoIndex, setPhotoIndex] = useState(0);
  const localized = spot.copy[locale];
  const referenceDetail = referenceSpotDetails[spot.id];
  const visitorSource = record && resolveJourneyVisitorSource(record, spot.id);
  const officialLink = !record && resolveSpotOfficialLink(getPlaceById(spot.id) ?? spot.id, getSpotDetail(spot.id));
  const factNote = record && factRetrievalNote(record, locale, `spots.${spot.id}`);
  const visitorNote = visitorSource && retrievalNote(locale, [visitorSource]);
  const visitor = visitorGuide[locale];
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
          <PresentationMedia
            alt={localized.name}
            assetId={photos[photoIndex]}
            locale={locale}
          />
        </div>
        {photos.length > 1 ? (
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
        ) : null}
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
          {factNote ? <div className="info-row"><span className="ic"><InformationIcon /></span><span>{factNote}</span></div> : null}
        </section>

        {record ? (
          <section className="guide-box">
            <h2>{visitor.title}</h2>
            <p>{visitorSource ? visitor.guidance : visitor.unavailable}</p>
            {visitorNote ? <p>{visitorNote}</p> : null}
            {visitorSource ? (
              <a className="book" href={visitorSource.url} target="_blank" rel="noopener noreferrer">
                {visitor.action}
              </a>
            ) : null}
          </section>
        ) : guide ? (
          <section className="guide-box">
            <h2>{guide.title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{guide.body}</p>
            {officialLink ? (
              <a className="book" href={officialLink.url} target="_blank" rel="noopener noreferrer">
                {guide.action}
              </a>
            ) : (
              <button className="book" onClick={() => onOpenGuide?.(spot)} type="button">
                {guide.action}
              </button>
            )}
          </section>
        ) : null}

        <details className="spot-phrase" key={spot.id}>
          <summary>{strings[locale].spotPhraseOpen}</summary>
          <p>{buildSpotPhrase(foodProfile, locale)}</p>
          <p><strong>{strings[locale].spotPhraseShow}</strong></p>
          <p lang="ja">{buildSpotPhrase(foodProfile, 'staff')}</p>
        </details>

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
