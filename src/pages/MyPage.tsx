/**
 * My page (Issue #81).
 *
 * The user-managed permanent content area: Saved Routes, Food Profile, and the
 * Badges entry. Distinct persistence semantics per section — a saved route is
 * an explicit user action, the Food Profile is a durable setting, MOGU Recent
 * (#94) is automatic history, and Badge state is separate Stretch work (#38/#39).
 *
 * Saved Routes reuse the S5/S8 persistence contract (`tmm:savedRoutes`) and the
 * same display-list helpers as the legacy My Route screen; the page title here
 * is the new IA label (not the superseded standalone "My Route" nav concept).
 * Each saved route reopens the Route and can continue to Story / Spot.
 *
 * Badges remains a Stretch entry point: the section is reachable but clearly
 * marks that earning/persistence is not part of the core MVP. My must ship
 * cleanly without it.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, EmptyState } from '../ui';
import { useI18n, type LocaleKey } from '../i18n';
import { routeNameKey } from '../i18n/data-content';
import { loadSavedRoutes, unsaveRoute, type SavedRouteEntry } from '../lib/saved-routes';
import { loadFoodProfile } from '../lib/food-profile-storage';
import type { DietaryRestriction } from '../lib/food-profile';
import { buildEntries, durationLabel } from './MyRoutePage';
import './MyPage.css';

/** Dietary restriction → i18n label key (kept in sync with FoodProfilePage). */
const DIETARY_LABEL_KEY: Record<DietaryRestriction, LocaleKey> = {
  allergy: 'fpAllergy',
  'vegetarian-vegan': 'fpVegan',
  religious: 'fpReligious',
  dislike: 'fpDislike',
};

export function MyPage() {
  const { locale, t } = useI18n();
  const [saved, setSaved] = useState<SavedRouteEntry[]>(() => loadSavedRoutes());

  // Re-read on window focus so a save made on Route/Spot in the same tab
  // appears without a reload (same pattern as MyRoutePage).
  useEffect(() => {
    const read = () => setSaved(loadSavedRoutes());
    window.addEventListener('focus', read);
    return () => window.removeEventListener('focus', read);
  }, []);

  const entries = buildEntries(saved);

  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('myPageTitle')}</h1>
      <p className="page-sub">{t('myPageBody')}</p>

      {/* Saved Routes (explicit user saves) */}
      <section className="tmm-section" aria-label={t('mySavedRoutesTitle')}>
        <h2 className="my-section-title">{t('mySavedRoutesTitle')}</h2>
        {entries.length === 0 ? (
          <EmptyState
            icon="🗺️"
            title={t('s8EmptyTitle')}
            description={t('s8EmptyBody')}
            action={
              <Link to="/" className="tmm-btn tmm-btn--primary">
                {t('s8EmptyCta')}
              </Link>
            }
          />
        ) : (
          <ul className="my-routes">
            {entries.map(({ entry, route }) => (
              <li key={entry.routeId}>
                <Card button className="my-route-card">
                  <div className="my-route-card__body">
                    <div className="my-route-card__title">{t(routeNameKey(route.id))}</div>
                    <div className="my-route-card__meta">
                      <span>
                        {t('s8Duration')}: {durationLabel(route, locale)}
                      </span>
                      <span>{t('s8Area')}: {t('s8AreaOkutama')}</span>
                    </div>
                    <div className="my-route-card__actions">
                      <Link
                        to={`/route?from=my`}
                        className="tmm-btn tmm-btn--sm tmm-btn--secondary"
                      >
                        {t('s8OpenRoute')}
                      </Link>
                      <button
                        type="button"
                        className="tmm-btn tmm-btn--sm tmm-btn--secondary my-unsave"
                        onClick={() => {
                          unsaveRoute(entry.routeId);
                          setSaved(loadSavedRoutes());
                        }}
                      >
                        {t('s8Remove')}
                      </button>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Food Profile (durable user setting) */}
      <section className="tmm-section" aria-label={t('fpTitle')}>
        <Card className="my-card">
          <div className="my-card__body">
            <div className="my-card__title">{t('fpTitle')}</div>
            <p className="page-sub">{t('fpSub')}</p>
            <FoodProfileSummary />
            <div className="my-card__actions">
              <Link to="/food-profile" className="tmm-btn tmm-btn--sm tmm-btn--secondary">
                {t('fpEditCta')}
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Badges — Stretch entry only (#38/#39); core MVP ships without it */}
      <section className="tmm-section" aria-label={t('badgesTitle')}>
        <Card className="my-card">
          <div className="my-card__body">
            <div className="my-card__title">{t('badgesTitle')}</div>
            <p className="my-card__desc">{t('badgesBody')}</p>
            <div className="my-card__actions">
              <span className="tmm-tag tmm-tag--info">{t('badgesStretch')}</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

/** Compact summary of the durable Food Profile (or "not set yet"). */
function FoodProfileSummary() {
  const { t } = useI18n();
  const profile = loadFoodProfile();
  if (!profile) {
    return <p className="my-card__desc">{t('myFoodProfileNone')}</p>;
  }
  if (profile.hasNoRestrictions) {
    return <p className="my-card__desc">{t('fpNoRestrictions')}</p>;
  }
  const items: string[] = profile.dietary.map(
    (value: DietaryRestriction) => t(DIETARY_LABEL_KEY[value]),
  );
  if (profile.dietaryOther.trim().length > 0) {
    items.push(profile.dietaryOther);
  }
  if (items.length === 0) {
    return <p className="my-card__desc">{t('myFoodProfileNone')}</p>;
  }
  return (
    <ul className="my-profile-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="my-profile-list__item">
          {item}
        </li>
      ))}
    </ul>
  );
}
