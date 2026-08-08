/**
 * Stylized spot "photo" placeholder (Issue #45, S5/S6).
 *
 * The MVP has no real venue photography yet (Issue #10 fieldwork will collect
 * it), so spots render a tinted placeholder with a type mark and the local
 * name — the same pattern as `FoodCultureImage` for food cultures. Place type
 * drives the tint; nothing here is claimed as a real photograph.
 */
import type { PlaceType } from '../data/model';

const TYPE_MARK: Record<PlaceType, string> = {
  shop: '店',
  restaurant: '食',
  farm: '田',
  brewery: '醸',
  'info-center': '案',
  other: '📍',
};

const TYPE_TINT: Record<PlaceType, string> = {
  shop: 'linear-gradient(150deg, #b9762e, #8f5d12)',
  restaurant: 'linear-gradient(150deg, #a03a22, #c44a2c)',
  farm: 'linear-gradient(150deg, #6b8f4e, #2f6f4f)',
  brewery: 'linear-gradient(150deg, #5d4a7a, #8a6fae)',
  'info-center': 'linear-gradient(150deg, #2d5f86, #5aa7c4)',
  other: 'linear-gradient(150deg, #6f4a2c, #a8794a)',
};

export function PlaceVisual({
  nameJa,
  type,
  alt,
}: {
  nameJa: string;
  type: PlaceType;
  alt?: string;
}) {
  return (
    <div
      className="pv-visual"
      role="img"
      aria-label={alt ?? nameJa}
      style={{ background: TYPE_TINT[type] ?? TYPE_TINT.other }}
    >
      <span className="pv-visual__mark" aria-hidden="true">
        {TYPE_MARK[type] ?? TYPE_MARK.other}
      </span>
      <span className="pv-visual__name">{nameJa}</span>
    </div>
  );
}
