import { useI18n } from '../i18n';

export function MapPage() {
  const { t } = useI18n();
  return <section className="page"><p>{t('navMap')} (placeholder)</p></section>;
}
