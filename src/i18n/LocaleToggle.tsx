/**
 * LocaleToggle — switch between Japanese, English, and Traditional Chinese UI.
 *
 * Content on the data records is selected by `useI18n().locale`; this control
 * flips that locale for the whole app. Mounted in the app header.
 */
import { useI18n, type Locale } from './index';

const OPTIONS: { code: Locale; label: string }[] = [
  { code: 'ja', label: 'JA' },
  { code: 'en', label: 'EN' },
  { code: 'zh-TW', label: '繁中' },
];

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="locale-toggle" role="group" aria-label="Language">
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={locale === code ? 'active' : ''}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
