/**
 * S8 My Route (Issue #47).
 *
 * Accountless saved-route list. Reads the shared `tmm:savedRoutes` local
 * persistence contract (owned by #45/#46) and renders each saved model route
 * with a summary card that navigates back to S5. Shows an empty state with a
 * diagnosis CTA when nothing is saved yet.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, Card } from '../ui';
import { useI18n, type Locale } from '../i18n';
import { routeNameKey } from '../i18n/data-content';
import { getRouteById, type ModelRoute } from '../data';
import { loadSavedRoutes, unsaveRoute, type SavedRouteEntry } from '../lib/saved-routes';
import './MyRoutePage.css';

interface SavedEntry {
  entry: SavedRouteEntry;
  route: ModelRoute;
}

/** Build the display list: resolve routes, drop stale ids, newest first. */
export function buildEntries(saved: SavedRouteEntry[]): SavedEntry[] {
  return saved
    .map((entry) => ({ entry, route: getRouteById(entry.routeId) }))
    .filter((x): x is SavedEntry => Boolean(x.route))
    .sort((a, b) => b.entry.savedAt.localeCompare(a.entry.savedAt));
}

/** Total duration label for a route's default variant (editorial minutes). */
export function durationLabel(route: ModelRoute, locale: Locale): string {
  const total = route.variants[route.defaultDuration].totalMinutes;
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return locale === 'ja' ? `${h}時間${m}分` : `${h}h ${m}m`;
}

export function MyRoutePage() {
  const { locale, t } = useI18n();
  const [saved, setSaved] = useState<SavedRouteEntry[]>(() => loadSavedRoutes());

  // Re-read on window focus so a save made on S5/S7 in the same tab appears
  // without a reload.
  useEffect(() => {
    const read = () => setSaved(loadSavedRoutes());
    window.addEventListener('focus', read);
    return () => window.removeEventListener('focus', read);
  }, []);

  const entries = buildEntries(saved);

  if (entries.length === 0) {
    return (
      <div className="tmm-page">
        <h1 className="page-title">{t('s8PageTitle')}</h1>
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
      </div>
    );
  }

  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('s8PageTitle')}</h1>
      <p className="page-sub">{t('s8PageSub')}</p>
      <div className="tmm-stack s8-list">
        {entries.map(({ entry, route }) => {
          return (
            <Card key={entry.routeId} button className="s8-card">
              <div className="s8-card__body">
                <div className="s8-card__title">{t(routeNameKey(route.id))}</div>
                <div className="s8-card__meta">
                  <span>
                    {t('s8Duration')}: {durationLabel(route, locale)}
                  </span>
                  <span>{t('s8Area')}: {t('s8AreaOkutama')}</span>
                </div>
                <div className="s8-card__actions">
                  <Link to="/route" className="tmm-btn tmm-btn--sm tmm-btn--secondary">
                    {t('s8OpenRoute')}
                  </Link>
                  <button
                    type="button"
                    className="tmm-btn tmm-btn--sm tmm-btn--secondary s8-unsave"
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
          );
        })}
      </div>
    </div>
  );
}
