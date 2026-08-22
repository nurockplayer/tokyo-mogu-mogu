import type { Locale } from '../../../i18n';
import { referenceAssets, type JourneyPresentation, type ReferenceCopy } from '../content';

const resultLocation: Record<string, Record<Locale, { area: string; station: string; access: string }>> = {
  'demo-okutama-wasabi': {
    ja: { area: '奥多摩地区 (東京西部)', station: '東京駅', access: 'から電車で　約120分' },
    en: { area: 'Okutama area (Western Tokyo)', station: 'Tokyo Station', access: 'About 120 min by train' },
    'zh-TW': { area: '奧多摩地區（東京西部）', station: '東京站', access: '搭乘電車約 120 分鐘' },
  },
  'demo-okutama-yamame': {
    ja: { area: '奥多摩地区 (東京西部)', station: '新宿駅', access: 'から電車で　約90分' },
    en: { area: 'Okutama area (Western Tokyo)', station: 'Shinjuku Station', access: 'About 90 min by train' },
    'zh-TW': { area: '奧多摩地區（東京西部）', station: '新宿站', access: '搭乘電車約 90 分鐘' },
  },
};

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
