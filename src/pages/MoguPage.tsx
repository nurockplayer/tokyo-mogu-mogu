/**
 * MOGU Recent recommendation history (Issue #94).
 *
 * System-managed recent results — the last up-to-5 automatically recorded
 * recommendation outcomes. Distinct from My Saved Routes: the user does not
 * press Save to appear here, and MOGU is not a favorites collection. Each card
 * reopens the same Result → Story → Route → Spot experience that produced it,
 * and back navigation from reopened content returns to MOGU (not a fresh
 * diagnosis).
 *
 * Browse-only use never writes here; only a successfully generated Result
 * (ResultPage → recordMoguRecent) does.
 *
 * The Result page decides whether a mount counts as a NEW recommendation
 * (records into Recent) or a REOPEN (reads Recent, does not re-record): MOGU
 * cards link to `/explore/result?from=mogu`, and ResultPage treats that marker
 * as a reopen so a historical result's timestamp is not refreshed by browsing
 * history again.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmptyState, Card, Tag } from '../ui';
import { useI18n, type LocaleKey } from '../i18n';
import { loadMoguRecent, type MoguRecentEntry } from '../lib/mogu-recent';
import { saveExplorationAnswers } from './s0s3/exploration-session';
import { type MatchTagKey } from '../lib/exploration';
import './MoguPage.css';

/** Match-tag key → i18n label key (kept in sync with ResultPage). */
const TAG_LABEL_KEY: Record<MatchTagKey, LocaleKey> = {
  'grate-fresh': 's3TagGrateFresh',
  'stream-fresh': 's3TagStreamFresh',
  'meet-maker': 's3TagMeetMaker',
  'buy-gift': 's3TagBuyGift',
  'make-craft': 's3TagMakeCraft',
  'nature-valley': 's3TagNature',
  'tradition-edo': 's3TagTradition',
  'daily-life': 's3TagDaily',
  'half-day': 's3TagHalfDay',
  'full-day': 's3TagFullDay',
};

/** Exported for unit tests: pure href builder for the reopen link. */
export function reopenHref(entry: MoguRecentEntry): string {
  return `/explore/result?from=mogu&resultId=${encodeURIComponent(entry.resultId)}`;
}

/**
 * Restores a MOGU entry's Exploration answers into the shared current-trip
 * session. Called at click time (handleReopen), never during render, so that
 * merely browsing MOGU cannot overwrite an in-progress trip.
 */
export function restoreReopenSession(entry: MoguRecentEntry): void {
  saveExplorationAnswers(entry.exploration);
}

/** Compact display for an ISO 8601 timestamp (MM/DD HH:mm, local). */
function formatRecommendedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getMonth() + 1}/${date.getDate()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function MoguPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<MoguRecentEntry[]>(() => loadMoguRecent());

  // Re-read on window focus so a Result generated in the same tab appears
  // without a reload (same pattern as MyRoutePage).
  useEffect(() => {
    const read = () => setEntries(loadMoguRecent());
    window.addEventListener('focus', read);
    return () => window.removeEventListener('focus', read);
  }, []);

  // Reopen only happens on an explicit tap: restore the stored Exploration
  // answers into the shared session at click time, then navigate. Restoring at
  // render time (inside reopenHref) would overwrite the user's in-progress
  // current-trip session just by browsing MOGU — a data-integrity regression.
  const handleReopen = (entry: MoguRecentEntry) => {
    restoreReopenSession(entry);
    navigate(reopenHref(entry));
  };

  if (entries.length === 0) {
    return (
      <div className="tmm-page">
        <h1 className="page-title">{t('moguPageTitle')}</h1>
        <p className="page-sub">{t('moguPageBody')}</p>
        <EmptyState
          icon="🍽️"
          title={t('moguEmptyTitle')}
          description={t('moguEmptyDesc')}
          action={
            <Link to="/" className="tmm-btn tmm-btn--primary">
              {t('moguEmptyCta')}
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('moguPageTitle')}</h1>
      <p className="page-sub">{t('moguPageBody')}</p>
      <p className="mogu-recent-note">{t('moguRecentNote')}</p>

      <ul className="mogu-list">
        {entries.map((entry) => (
          <li key={`${entry.resultId}-${entry.createdAt}`}>
            <Card button className="mogu-card">
              <div className="mogu-card__body">
                <div className="mogu-card__title">{t(entry.titleKey as LocaleKey)}</div>
                <div className="mogu-card__meta">
                  <span className="mogu-card__time">
                    🕐 {formatRecommendedAt(entry.createdAt)}
                  </span>
                </div>
                {entry.summary.length > 0 ? (
                  <div className="mogu-card__tags">
                    {entry.summary.map((key) =>
                      key in TAG_LABEL_KEY ? (
                        <Tag key={key} tone="info">
                          {t(TAG_LABEL_KEY[key as MatchTagKey])}
                        </Tag>
                      ) : null,
                    )}
                  </div>
                ) : null}
                <div className="mogu-card__actions">
                  <button
                    type="button"
                    className="tmm-btn tmm-btn--sm tmm-btn--secondary"
                    onClick={() => handleReopen(entry)}
                  >
                    {t('moguReopenCta')}
                  </button>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
