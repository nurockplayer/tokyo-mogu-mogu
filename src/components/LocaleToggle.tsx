/**
 * LocaleToggle — switch between Japanese and English UI.
 *
 * Content on the data records is selected by `useI18n().locale`; this control
 * flips that locale for the whole app. Mounted in the app header.
 */
import { useI18n } from '../i18n';

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="locale-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={locale === 'ja' ? 'active' : ''}
        onClick={() => setLocale('ja')}
        aria-pressed={locale === 'ja'}
      >
        JA
      </button>
      <button
        type="button"
        className={locale === 'en' ? 'active' : ''}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
