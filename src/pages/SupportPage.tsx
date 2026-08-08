/**
 * S7 Support demo page (Issue #46).
 *
 * Standalone verification route (`/support`) that renders the reusable
 * SupportPanel so the S7 experience can be reviewed at 375px. S4 embeds the
 * panel (or `SUPPORT_ACTIONS`) directly; this page is kept as a nav-reachable
 * recap/deep-dive of the full S7 framing (the 「応援」 tab, Issue #66).
 */
import { SupportPanel } from '../components/SupportPanel';
import { useI18n } from '../i18n';

export function SupportPage() {
  const { t } = useI18n();
  return (
    <div className="tmm-page">
      <h1 className="s7-page-title">{t('s7PageTitle')}</h1>
      <p className="s7-page-sub">{t('s7PageSub')}</p>
      <SupportPanel />
    </div>
  );
}
