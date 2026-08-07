import { Link } from 'react-router-dom';
import type { FoodCulture } from '../data/model';
import { useI18n, type LocaleKey } from '../i18n';
import { FoodCultureImage } from './FoodCultureImage';
import './FoodCultureCard.css';

const CATEGORY_T_KEY: Record<FoodCulture['category'], LocaleKey> = {
  produce: 'catProduce',
  seafood: 'catSeafood',
  sweets: 'catSweets',
  'processed-food': 'catProcessedFood',
  craft: 'catCraft',
};

export function FoodCultureCard({
  foodCulture,
  collected,
}: {
  foodCulture: FoodCulture;
  collected: boolean;
}) {
  const { t, locale } = useI18n();
  const name = locale === 'ja' ? foodCulture.nameJa : foodCulture.nameEn;
  const description = locale === 'ja' ? foodCulture.descriptionJa : foodCulture.descriptionEn;
  const hint = locale === 'ja' ? foodCulture.hintJa : foodCulture.hintEn;

  return (
    <Link
      to={`/food-cultures/${foodCulture.id}`}
      className={`fc-card ${collected ? 'unlocked' : 'locked'}`}
      aria-label={name}
    >
      <div className="fc-card-media">
        <FoodCultureImage
          image={foodCulture.image}
          nameJa={foodCulture.nameJa}
          category={foodCulture.category}
          alt={name}
        />
        <span className="badge">{t(CATEGORY_T_KEY[foodCulture.category])}</span>
        {collected && <span className="get-seal">{t('unlocked')}</span>}
      </div>
      <div className="fc-card-body">
        <h3 className="fc-card-name">{name}</h3>
        {collected ? (
          <p className="fc-card-desc">{description}</p>
        ) : (
          <p className="fc-card-hint">
            <span className="fc-card-hint-label">{t('hintPrefix')}: </span>
            {hint}
          </p>
        )}
      </div>
    </Link>
  );
}
