import { foodCultures } from '../data';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';
import { FoodCultureCard } from '../components/FoodCultureCard';
import { ProgressBreakdown } from '../components/ProgressBreakdown';
import './PokedexPage.css';

export function PokedexPage() {
  const { t } = useI18n();
  const { isCollected } = useCollection();

  const total = foodCultures.length;
  const collectedCount = foodCultures.filter((fc) => isCollected(fc.id)).length;
  const percent = total === 0 ? 0 : Math.round((collectedCount / total) * 100);

  return (
    <section className="page pokedex-page">
      <div className="pokedex-header">
        <h1 className="page-title">{t('navPokedex')}</h1>
        <span className="pokedex-count" aria-label={t('collectedCount')}>
          {collectedCount} / {total}
        </span>
      </div>
      <p className="page-sub">{t('pokedexSub')}</p>

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={collectedCount}
        aria-label={t('collectionProgress')}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <ul className="fc-grid pokedex-grid" aria-label={t('navPokedex')}>
        {foodCultures.map((fc) => (
          <li key={fc.id} className="pokedex-grid-item">
            <FoodCultureCard foodCulture={fc} collected={isCollected(fc.id)} />
          </li>
        ))}
      </ul>

      <ProgressBreakdown />
    </section>
  );
}
