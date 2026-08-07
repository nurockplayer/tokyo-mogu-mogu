/**
 * Demo image placeholder.
 *
 * The MVP has no real photography yet (Issue #10 fieldwork will collect it),
 * so food cultures render a stylized card with a category mark. When real
 * images land, this component is swapped for an <img> without touching callers.
 */
import type { FoodCultureCategory } from '../data/model';

const CATEGORY_MARK: Record<FoodCultureCategory, { ja: string; en: string }> = {
  produce: { ja: '恵', en: '🌿' },
  seafood: { ja: '山女', en: '🐟' },
  sweets: { ja: '甘', en: '🍡' },
  'processed-food': { ja: '味', en: '🍶' },
  craft: { ja: '作', en: '🪚' },
};

const CATEGORY_TINT: Record<FoodCultureCategory, string> = {
  produce: 'linear-gradient(150deg, #6b8f4e, #2f6f4f)',
  seafood: 'linear-gradient(150deg, #5aa7c4, #2d5f86)',
  sweets: 'linear-gradient(150deg, #d9a860, #b9762e)',
  'processed-food': 'linear-gradient(150deg, #8a6fae, #5d4a7a)',
  craft: 'linear-gradient(150deg, #a8794a, #6f4a2c)',
};

export function FoodCultureImage({
  image,
  nameJa,
  category,
  alt,
}: {
  image: string;
  nameJa: string;
  category: FoodCultureCategory;
  alt?: string;
}) {
  const mark = CATEGORY_MARK[category] ?? CATEGORY_MARK.produce;
  return (
    <div
      className="fc-image"
      role="img"
      aria-label={alt ?? nameJa}
      style={{ background: CATEGORY_TINT[category] ?? CATEGORY_TINT.produce }}
      data-image={image}
    >
      <span className="fc-image-mark">{mark.ja}</span>
      <span className="fc-image-name">{nameJa}</span>
    </div>
  );
}
