/**
 * S7 Support Panel (Issue #46, #177) — reusable support/contribution block.
 *
 * Renders the six support actions (買う / 訪れる / 予約する / 寄付する / 共有する /
 * 保存する) through the shared journey-aware content boundary. The active
 * route is the context key: the frozen Okutama × Wasabi journey keeps its
 * approved pilot actions, while Ome/Sawai and unknown future journeys receive
 * the conservative generic fallback from `support-actions.ts`.
 *
 * Reusable: S4 embeds the panel after the story support beat; the standalone
 * `/support` page passes the pilot route explicitly. No caller without a known
 * journey silently inherits the pilot's Wasabi copy or Okutama destination.
 *
 * Locale: action titles/meanings resolve in ja / en / zh-TW via the
 * `actionTitle` / `actionMeaning` helpers, so zh-TW never falls back to English.
 *
 * State: the `save` action toggles the local saved-route contract
 * (`tmm:savedRoutes`, see `saved-routes.ts`). No network, no fake success —
 * actions without a verified destination render as 準備中 / coming soon.
 */
import { useState } from 'react';
import { SupportAction, Tag } from '../ui';
import { useI18n } from '../i18n';
import {
  actionMeaning,
  actionTitle,
  supportActionsForJourney,
} from './support-actions';
import { isRouteSaved, saveRoute, unsaveRoute } from './saved-routes';
import './SupportPanel.css';

export function SupportPanel({ routeId }: { routeId?: string }) {
  const { locale, t } = useI18n();
  const actions = supportActionsForJourney(routeId);
  // Absent routeId means the caller has no journey yet: the save action stays
  // disabled and never attaches a default (pilot) route to this panel.
  const [saved, setSaved] = useState<boolean>(() => (routeId ? isRouteSaved(routeId) : false));

  const toggleSave = () => {
    if (!routeId) return;
    if (saved) {
      unsaveRoute(routeId);
      setSaved(false);
    } else {
      saveRoute(routeId);
      setSaved(true);
    }
  };

  return (
    <section className="s7-panel">
      <header className="s7-panel__framing">
        <p className="s7-panel__kicker">{t('s7Kicker')}</p>
        <h2 className="s7-panel__title">{t('s7Framing')}</h2>
        <p className="s7-panel__lead">{t('s7Lead')}</p>
      </header>

      <div className="s7-panel__actions">
        {actions.map((item) => {
          const title = actionTitle(item, locale);
          const meaning = actionMeaning(item, locale);
          return (
            <SupportAction
              key={item.id}
              icon={item.icon}
              title={title}
              description={meaning}
              disabled={item.kind === 'disabled'}
              href={item.kind === 'external' ? item.externalUrl ?? undefined : undefined}
            >
              {item.kind === 'disabled' ? (
                <Tag tone="warning">{t('s7ComingSoon')}</Tag>
              ) : item.kind === 'save' ? (
                routeId ? (
                  <button
                    type="button"
                    onClick={toggleSave}
                    className={`tmm-btn tmm-btn--sm ${
                      saved ? 'tmm-btn--primary' : 'tmm-btn--secondary'
                    }`}
                    aria-pressed={saved}
                  >
                    {saved ? t('s7SaveRemove') : t('s7SaveToRoute')}
                  </button>
                ) : (
                  <Tag tone="warning">{t('s7ComingSoon')}</Tag>
                )
              ) : (
                t('s7VisitMore')
              )}
            </SupportAction>
          );
        })}
      </div>

      <p className="s7-panel__note">
        <Tag tone="info">{t('s7Note')}</Tag>
        {saved ? <span className="s7-panel__saved">{t('s7SavedStatus')}</span> : null}
      </p>
    </section>
  );
}
