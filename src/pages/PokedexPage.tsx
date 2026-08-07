import { useI18n } from '../i18n';

export function PokedexPage() {
  const { t } = useI18n();
  return <section className="page"><p>{t('navPokedex')} (placeholder)</p></section>;
}
