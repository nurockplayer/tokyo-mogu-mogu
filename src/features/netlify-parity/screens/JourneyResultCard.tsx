/* eslint-disable react-refresh/only-export-components -- #333 reads this exact runtime presentation record. */
import type { Locale } from '../../../i18n';
import { referenceAssets, type JourneyPresentation, type ReferenceCopy } from '../content';

interface ResultLocation {
  area: string;
  station: string;
  travelMinutes: number;
}

export const resultLocation: Record<string, Record<Locale, ResultLocation>> = {
  'demo-okutama-wasabi': {
    ja: { area: '奥多摩地区 (東京西部)', station: '東京駅', travelMinutes: 120 },
    en: { area: 'Okutama area (Western Tokyo)', station: 'Tokyo Station', travelMinutes: 120 },
    'zh-TW': { area: '奧多摩地區（東京西部）', station: '東京站', travelMinutes: 120 },
  },
  'demo-okutama-yamame': {
    ja: { area: '奥多摩地区 (東京西部)', station: '新宿駅', travelMinutes: 90 },
    en: { area: 'Okutama area (Western Tokyo)', station: 'Shinjuku Station', travelMinutes: 90 },
    'zh-TW': { area: '奧多摩地區（東京西部）', station: '新宿站', travelMinutes: 90 },
  },
};

function accessLabel(locale: Locale, travelMinutes: number): string {
  if (locale === 'en') return `About ${travelMinutes} min by train`;
  if (locale === 'zh-TW') return `搭乘電車約 ${travelMinutes} 分鐘`;
  return `から電車で\u3000約${travelMinutes}分`;
}

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
          <em>{location.station}</em> {accessLabel(locale, location.travelMinutes)}
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
