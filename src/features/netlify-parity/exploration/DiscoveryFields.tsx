import type { Locale } from '../../../i18n';
import type { DiscoveryFilters, DiscoveryOptions } from '../discovery';

const copy = {
  ja: {
    preferences: '食旅の希望（任意）', area: '滞在エリア', arrival: '到着駅・停留所',
    minutes: '現地で使える時間', cultures: '気になる食文化', alcohol: 'お酒がテーマの食旅',
    any: '指定なし', add: '食文化を選ぶ', include: '含める', exclude: '除く',
    limit: (minutes: number) => `${minutes}分以内`,
    estimated: (minutes: number) => `現地で約${minutes}分（編集目安）`,
  },
  en: {
    preferences: 'Journey preferences (optional)', area: 'Area you’re in or visiting', arrival: 'Arrival station or stop',
    minutes: 'Time on site', cultures: 'Food culture interests', alcohol: 'Alcohol-themed journeys',
    any: 'No preference', add: 'Choose a food culture', include: 'Include', exclude: 'Exclude',
    limit: (minutes: number) => `Up to ${minutes} min`,
    estimated: (minutes: number) => `About ${minutes} min on site (editorial estimate)`,
  },
  'zh-TW': {
    preferences: '美食之旅偏好（選填）', area: '所在或預計造訪的地區', arrival: '抵達車站或站點',
    minutes: '可停留時間', cultures: '感興趣的飲食文化', alcohol: '以酒為主題的旅程',
    any: '不限', add: '選擇飲食文化', include: '包含', exclude: '排除',
    limit: (minutes: number) => `${minutes} 分鐘內`,
    estimated: (minutes: number) => `現地約 ${minutes} 分鐘（編輯估計）`,
  },
};

export const discoveryFields = ['area', 'arrival', 'minutes', 'cultures', 'alcohol'] as const;
type Field = typeof discoveryFields[number];

const timeOptions = [15, 30, 60, 90, 120, 180, 240, 480];

export function describeFilters(locale: Locale, options: DiscoveryOptions, filters: DiscoveryFilters, minutes?: number) {
  const labels = copy[locale];
  return [
    filters.area && `${labels.area} · ${options.areas.get(filters.area)?.[locale] ?? filters.area}`,
    filters.arrival && `${labels.arrival} · ${options.arrivals.get(filters.arrival)?.[locale] ?? filters.arrival}`,
    filters.minutes !== null && `${labels.minutes} · ${labels.limit(filters.minutes)}${minutes === undefined ? '' : ` / ${labels.estimated(minutes)}`}`,
    filters.cultures.length > 0 && `${labels.cultures} · ${filters.cultures.map((id) => options.cultures.get(id)?.[locale] ?? id).join(' / ')}`,
    filters.alcohol === 'exclude' && `${labels.alcohol} · ${labels.exclude}`,
  ].filter(Boolean).join('　/　');
}

interface DiscoveryFieldsProps {
  locale: Locale;
  options: DiscoveryOptions;
  value: DiscoveryFilters;
  onChange: (filters: DiscoveryFilters) => void;
  field?: Field;
}

export function DiscoveryFields({ locale, options, value, onChange, field }: DiscoveryFieldsProps) {
  const labels = copy[locale];
  const localized = (items: DiscoveryOptions[keyof DiscoveryOptions]) =>
    [...items].map(([id, names]) => [id, names[locale]] as const);

  const renderField = (key: Field) => {
    const choices = {
      area: () => localized(options.areas),
      arrival: () => localized(options.arrivals),
      minutes: () => timeOptions.map((minutes) => [String(minutes), labels.limit(minutes)] as const),
      cultures: () => localized(options.cultures).filter(([id]) => !value.cultures.includes(id)),
      alcohol: () => [['include', labels.include], ['exclude', labels.exclude]] as const,
    }[key]();

    return (
      <div key={key}>
        <label>
          {field ? <span className="wiz-q">{labels[key]}</span> : labels[key]}
          <select className="opt" value={key === 'cultures' ? '' : value[key] ?? ''} onChange={(event) => {
            const selected = event.target.value;
            if (key === 'cultures') {
              if (selected) onChange({ ...value, cultures: [...value.cultures, selected] });
            } else if (key === 'minutes') {
              onChange({ ...value, minutes: selected ? Number(selected) : null });
            } else if (key === 'alcohol') {
              onChange({ ...value, alcohol: selected as DiscoveryFilters['alcohol'] });
            } else {
              onChange({ ...value, [key]: selected });
            }
          }}>
            <option value="">{key === 'cultures' ? labels.add : labels.any}</option>
            {choices.map(([id, text]) => <option key={id} value={id}>{text}</option>)}
          </select>
        </label>
        {key === 'cultures' && value.cultures.length > 0 ? (
          <div className="chips">
            {value.cultures.map((id) => (
              <button className="chip sel" key={id} type="button" onClick={() =>
                onChange({ ...value, cultures: value.cultures.filter((culture) => culture !== id) })
              }>
                {options.cultures.get(id)?.[locale] ?? id} ×
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return field ? renderField(field) : (
    <div>
      <h2>{labels.preferences}</h2>
      {discoveryFields.map(renderField)}
    </div>
  );
}
