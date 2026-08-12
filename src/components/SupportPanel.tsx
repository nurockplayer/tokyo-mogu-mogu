/**
 * S7 Support Panel (Issue #46) — reusable support/contribution block.
 *
 * Renders the six support actions (買う / 訪れる / 予約する / 寄付する / 共有する /
 * 保存する) with the cultural-succession meaning copy for each, framed by the
 * "興味を、力に変える。" narrative. Each card reuses the shared `SupportAction`
 * primitive from `src/ui`.
 *
 * Reusable: S4 embeds the panel right after the "味わうことが、継承になる" story
 * beat so the reader sees the concrete ways to act (Issue #68); the standalone
 * `/support` page (SupportPage) shows the same block with its page framing.
 * The deterministic action list lives in `support-actions.ts`; the saved-route
 * persistence lives in `saved-routes.ts`.
 *
 * Locale: action titles/meanings resolve in ja / en / zh-TW via the
 * `actionTitle` / `actionMeaning` helpers (Issue #68), so zh-TW never falls
 * back to English.
 *
 * State: the `save` action toggles the local saved-route contract
 * (`tmm:savedRoutes`, see `saved-routes.ts`) owned by this issue. No network,
 * no fake success — actions without a confirmed destination render as a
 * clearly-marked 準備中 / coming-soon state.
 */
import { useState } from 'react';
import { SupportAction, Tag } from '../ui';
import { useI18n } from '../i18n';
import { SUPPORT_ACTIONS, actionMeaning, actionTitle } from './support-actions';
import { isRouteSaved, saveRoute, unsaveRoute } from './saved-routes';
import './SupportPanel.css';

export function SupportPanel({ routeId }: { routeId?: string }) {
  const { locale, t } = useI18n();
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
        {SUPPORT_ACTIONS.map((item) => {
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
