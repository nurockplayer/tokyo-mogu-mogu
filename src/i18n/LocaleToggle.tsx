/**
 * LocaleToggle — switch between Japanese, English, and Traditional Chinese UI.
 *
 * Content on the data records is selected by `useI18n().locale`; this control
 * flips that locale for the whole app. Mounted in My as a durable preference.
 */
import { useI18n, type Locale } from './index';

const OPTIONS: { code: Locale; label: string }[] = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh-TW', label: '繁體中文' },
];

export function LocaleToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="tmm-locale-toggle" role="group" aria-label={t('myLanguageTitle')}>
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className="tmm-locale-toggle__btn"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
