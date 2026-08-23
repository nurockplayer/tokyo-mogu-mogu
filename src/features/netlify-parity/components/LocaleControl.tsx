import type { Locale } from '../../../i18n';

interface LocaleControlProps {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
}

const localeLabels: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  'zh-TW': '繁體中文',
};

export function LocaleControl({ locale, label, onChange }: LocaleControlProps) {
  return (
    <label className="locale-control">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(event) => onChange(event.target.value as Locale)}
      >
        {(Object.keys(localeLabels) as Locale[]).map((value) => (
          <option key={value} value={value}>
            {localeLabels[value]}
          </option>
        ))}
      </select>
    </label>
  );
}
