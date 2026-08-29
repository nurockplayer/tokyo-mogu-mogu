import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../../i18n';
import {
  currentSpots,
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';
import {
  chapterPoint,
  storyLocation,
  storySpotGroups,
  type StorySpotReference,
} from '../factual-presentation';
import { PresentationMedia } from '../components/PresentationMedia';
import { BackIcon, PinIcon, TrainIcon } from './screenIcons';

const routeActionLabel: Record<Locale, string> = {
  ja: 'この食文化の観光ルートを作成する',
  en: 'Create a sightseeing route for this food culture',
  'zh-TW': '建立這項飲食文化的觀光路線',
};

const loadingLabel: Record<Locale, [string, string]> = {
  ja: ['あなたにぴったりの', '観光ルートを生成中！'],
  en: ['Creating a sightseeing route', 'just for you!'],
  'zh-TW': ['正在建立最適合你的', '觀光路線！'],
};

function StorySpotCard({
  active,
  locale,
  reference,
  spot,
  onOpenSpot,
}: {
  active: boolean;
  locale: Locale;
  reference: StorySpotReference;
  spot: SpotPresentation;
  onOpenSpot: (spot: SpotPresentation) => void;
}) {
  const localized = spot.copy[locale];
  const open = () => onOpenSpot(spot);

  return (
    <article
      className="spot-card"
      data-spot-id={spot.id}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={active ? 0 : -1}
    >
      <div className="ph">
        <PresentationMedia assetId={reference.imageAssetId} locale={locale} />
        <span className="badge" style={{ background: reference.badgeColor }}>
          {reference.badge[locale]}
        </span>
      </div>
      <b>{localized.name}</b>
      <p>{reference.description?.[locale] ?? localized.lead}</p>
      {reference.note ? <div className="note">{reference.note[locale]}</div> : null}
    </article>
  );
}

export interface StoryScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  journey: JourneyPresentation;
  guideMode?: boolean;
  onBack: () => void;
  onCreateRoute: (journey: JourneyPresentation) => void;
  onOpenSpot: (spot: SpotPresentation) => void;
}

export function StoryScreen({
  active,
  copy,
  locale,
  journey,
  guideMode = true,
  onBack,
  onCreateRoute,
  onOpenSpot,
}: StoryScreenProps) {
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const localized = journey.copy[locale];
  const localizedLocation = storyLocation[journey.id];
  const groups = storySpotGroups[journey.id];
  if (!localizedLocation || !groups) {
    throw new Error(`Missing Story presentation for journey: ${journey.id}`);
  }
  const location = localizedLocation[locale];
  const point = chapterPoint[journey.id]?.[locale];

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (active || timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setLoading(false);
  }, [active]);

  const startRouteGeneration = () => {
    if (loading) return;
    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setLoading(false);
      onCreateRoute(journey);
    }, 2_200);
  };

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="story"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <button className="fab-back" onClick={onBack} type="button" aria-label={copy.actions.back}>
        <BackIcon />
      </button>
      <div className="scroll">
        <div className="story-hero">
          <PresentationMedia assetId={journey.heroAssetId} locale={locale} />
        </div>
        <div className="story-tx">
          <h1>{localized.title}</h1>
          <h2>{localized.subtitle}</h2>
          {localized.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="loc-box">
            <PinIcon /> {location.region}
            <br />
            <TrainIcon /> {location.station}
          </div>
        </div>

        <section className="story-sec">
          <h2>{localized.storyTitle}</h2>
          <div className="hscroll">
            {journey.chapters[locale].map((chapter, index) => (
              <article className="page-card" key={`${chapter.number}-${chapter.title}`}>
                <h3>
                  <em>{chapter.number}</em>
                  {chapter.title}
                </h3>
                <p>{chapter.body}</p>
                {index === 0 && point ? (
                  <div className="mogu-point">
                    <div className="pt">
                      <img src={referenceAssets.logoFace} alt="" /> MOGUMOGU{' '}
                      <em>{copy.story.pointLabel.replace(/^MOGUMOGU\s*/i, '')}</em>
                    </div>
                    <b>{point.title}</b>
                    <p>{point.body}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="story-sec">
          <h2>{copy.story.nearbyTitle}</h2>
          <div className="hscroll">
            {groups.nearby.map((reference) => {
              const spot = currentSpots[reference.spotId];
              return spot ? (
                <StorySpotCard
                  active={active}
                  key={reference.referenceId}
                  locale={locale}
                  onOpenSpot={onOpenSpot}
                  reference={reference}
                  spot={spot}
                />
              ) : null;
            })}
          </div>
        </section>

        <section className="story-sec">
          <h2>{copy.story.natureTitle}</h2>
          <div className="hscroll">
            {groups.nature.map((reference) => {
              const spot = currentSpots[reference.spotId];
              return spot ? (
                <StorySpotCard
                  active={active}
                  key={reference.referenceId}
                  locale={locale}
                  onOpenSpot={onOpenSpot}
                  reference={reference}
                  spot={spot}
                />
              ) : null;
            })}
          </div>
        </section>

        <div className="story-cta-wrap">
          <button
            className={`story-cta${guideMode ? ' glow' : ''}`}
            disabled={loading}
            onClick={startRouteGeneration}
            type="button"
          >
            {routeActionLabel[locale]}
          </button>
        </div>
      </div>

      <div
        className={`reference-loading${loading ? ' on' : ''}`}
        data-loading={loading}
        data-route-loading
        aria-hidden={!loading}
        aria-live="polite"
      >
        <div className="face">
          <img src={referenceAssets.logoFace} alt="" />
        </div>
        <div className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <p>
          {loadingLabel[locale][0]}
          <br />
          {loadingLabel[locale][1]}
        </p>
      </div>
    </section>
  );
}
