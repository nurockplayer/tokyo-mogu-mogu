import type { Locale } from '../../../i18n';
import { referenceAssets, type JourneyPresentation, type ReferenceCopy } from '../content';
import { resultLocation } from '../factual-presentation';

interface JourneyResultCardProps {
  active: boolean;
  copy: ReferenceCopy;
  journey: JourneyPresentation;
  locale: Locale;
  showMatch?: boolean;
  onOpen: (journey: JourneyPresentation) => void;
}

export function JourneyResultCard({
  active,
  copy,
  journey,
  locale,
  showMatch = true,
  onOpen,
}: JourneyResultCardProps) {
  const localized = journey.copy[locale];
  const location = (resultLocation[journey.id] ?? resultLocation['demo-okutama-wasabi'])[locale];
  const open = () => onOpen(journey);

  return (
    <article
      className="res-card"
      data-journey-id={journey.id}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={active ? 0 : -1}
      aria-label={`${copy.actions.openStory}: ${localized.title}`}
    >
      <div className="ph">
        <img src={referenceAssets[journey.imageAssetId]} alt="" />
        {showMatch ? (
          <div className="match" aria-label={`${copy.result.matchLabel} ${journey.matchPercent}%`}>
            <b>
              {journey.matchPercent}
              <small>%</small>
            </b>
            <span>{copy.result.matchLabel}</span>
          </div>
        ) : null}
      </div>
      <div className="tx">
        <div className="area">{location.area}</div>
        <div className="acc">
          <em>{location.station}</em> {location.access}
        </div>
        <h3>{localized.title}</h3>
        <h4>{localized.subtitle}</h4>
        <p>{localized.description}</p>
        <div className="tags">
          {localized.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
