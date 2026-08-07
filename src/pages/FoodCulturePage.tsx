import { useParams } from 'react-router-dom';
import { useI18n } from '../i18n';

export function FoodCulturePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  return <section className="page"><p>{t('navPokedex')} detail: {id} (placeholder)</p></section>;
}
