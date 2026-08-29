import type { Locale } from '../../../i18n';
import { type JourneyPresentation, type ReferenceCopy } from '../content';
import { PresentationMedia } from '../components/PresentationMedia';
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
  const localizedLocation = resultLocation[journey.id];
  if (!localizedLocation) throw new Error(`Missing Result location for journey: ${journey.id}`);
  const location = localizedLocation[locale];
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
        <PresentationMedia assetId={journey.imageAssetId} locale={locale} />
        {showMatch && journey.matchPercent !== undefined ? (
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
          {journey.sourceStatus === 'needs_confirmation' ? (
            <span data-verification-status="needs_confirmation">
              {copy.mogu.confirmationPending}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
