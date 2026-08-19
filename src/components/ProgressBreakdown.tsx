/**
 * ProgressBreakdown — per-area and per-category collection progress (Issue #8).
 *
 * Renders two compact progress lists driven by the pure functions in
 * src/lib/progression.ts. Mounted on the Pokédex page.
 */
import { useMemo } from 'react';
import { foodCultures } from '../data';
import type { RegionId } from '../data';
import { getAreaCompletion, getCategoryCompletion } from '../lib/progression';
import { useCollection } from '../store/collection';
import { useI18n, type LocaleKey } from '../i18n';
import './ProgressBreakdown.css';

const AREA_LABEL_KEY: Partial<Record<RegionId, LocaleKey>> = {
  okutama: 'areaOkutama',
  ome: 'areaOme',
  hachioji: 'areaHachioji',
  fussa: 'areaFussa',
  hamura: 'areaHamura',
  akiruno: 'areaAkiruno',
  hinode: 'areaHinode',
};

const CATEGORY_LABEL_KEY: Record<string, LocaleKey> = {
  produce: 'categoryProduce',
  seafood: 'categorySeafood',
  sweets: 'categorySweets',
  'processed-food': 'categoryProcessedFood',
  craft: 'categoryCraft',
};

function Row({ label, collected, total }: { label: string; collected: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((collected / total) * 100);
  return (
    <div className="pb-row">
      <span className="pb-label">{label}</span>
      <span className="pb-track">
        <span className="pb-fill" style={{ width: `${percent}%` }} />
      </span>
      <span className="pb-count">
        {collected}/{total}
      </span>
    </div>
  );
}

function areaLabel(area: RegionId, t: (key: LocaleKey) => string): string {
  const key = AREA_LABEL_KEY[area];
  return key ? t(key) : area;
}

export function ProgressBreakdown() {
  const { t } = useI18n();
  const { isCollected } = useCollection();

  const collectedIds = useMemo(
    () => foodCultures.filter((fc) => isCollected(fc.id)).map((fc) => fc.id),
    [isCollected],
  );

  const areas = useMemo(() => getAreaCompletion(collectedIds, foodCultures), [collectedIds]);
  const categories = useMemo(
    () => getCategoryCompletion(collectedIds, foodCultures),
    [collectedIds],
  );

  return (
    <div className="pb">
      <section className="pb-section">
        <h2>{t('areaProgress')}</h2>
        {areas.map((a) => (
          <Row
            key={a.area}
            label={areaLabel(a.area, t)}
            collected={a.collected}
            total={a.total}
          />
        ))}
      </section>
      <section className="pb-section">
        <h2>{t('categoryProgress')}</h2>
        {categories.map((c) => (
          <Row
            key={c.category}
            label={t(CATEGORY_LABEL_KEY[c.category])}
            collected={c.collected}
            total={c.total}
          />
        ))}
      </section>
    </div>
  );
}
