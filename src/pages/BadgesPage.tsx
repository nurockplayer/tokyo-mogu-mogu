/**
 * My → Badges collection (Issue #39, Stretch).
 *
 * Badge is a My-owned, Stretch-only retention/discovery layer, not a top-level
 * nav item. The collection shows the earned/unearned state for the first-pilot
 * fixture (東京わさび, demo-earned) and future locked slots that never imply a
 * second region is implemented.
 *
 * Demo-earned honesty: the exact earning condition is an open product decision
 * (#38). For the Hackathon this screen shows a clearly-labeled deterministic
 * demo state — 東京わさび appears earned for demo purposes and the UI says so.
 * It never claims real visit/purchase verification, and physical reward
 * messaging stays prototype-only.
 *
 * Badge state is persisted separately from MOGU Recent and Saved Routes.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, type LocaleKey } from '../i18n';
import { Tag } from '../ui';
import { loadBadgeState, type BadgeRecord } from '../lib/badges';
import './BadgesPage.css';

/** A badge slot: the first-pilot fixture plus future dummy slots. */
interface BadgeSlot {
  id: string;
  /** i18n key for the display name. */
  nameKey: LocaleKey;
  /** i18n key for the description. */
  descKey: LocaleKey;
  /** Icon glyph shown in the slot (placeholder rule; no approved asset yet). */
  icon: string;
  /** The durable food culture / region id this badge represents. */
  cultureId: string;
  /** Whether this slot represents a real implemented first-pilot fixture. */
  isFirstPilot: boolean;
}

const BADGE_SLOTS: BadgeSlot[] = [
  {
    id: 'badge-wasabi-okutama',
    nameKey: 'dataWasabiName',
    descKey: 'badgeWasabiDesc',
    icon: '🥢',
    cultureId: 'wasabi-okutama',
    isFirstPilot: true,
  },
  {
    id: 'badge-yamame-okutama',
    nameKey: 'dataYamameName',
    descKey: 'badgeFutureDesc',
    icon: '🐟',
    cultureId: 'yamame-okutama',
    isFirstPilot: false,
  },
  {
    id: 'badge-okutama-soba',
    nameKey: 'dataOkutamaSobaName',
    descKey: 'badgeFutureDesc',
    icon: '🍜',
    cultureId: 'okutama-soba',
    isFirstPilot: false,
  },
  {
    id: 'badge-okutama-konnyaku',
    nameKey: 'dataOkutamaKonnyakuName',
    descKey: 'badgeFutureDesc',
    icon: '🫕',
    cultureId: 'okutama-konnyaku',
    isFirstPilot: false,
  },
  {
    id: 'badge-next-region',
    nameKey: 'badgeNextRegionName',
    descKey: 'badgeNextRegionDesc',
    icon: '🔒',
    cultureId: 'next-region',
    isFirstPilot: false,
  },
];

export function BadgesPage() {
  const { t } = useI18n();
  const [records, setRecords] = useState<BadgeRecord[]>(() => loadBadgeState());

  useEffect(() => {
    setRecords(loadBadgeState());
  }, []);

  const statusFor = (id: string): BadgeRecord | undefined => records.find((r) => r.id === id);
  const earnedCount = records.filter((r) => r.status === 'earned').length;
  const totalCount = BADGE_SLOTS.length;

  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('badgesTitle')}</h1>
      <p className="page-sub">{t('badgesBody')}</p>

      <p className="badge-demo-note">{t('badgeDemoNote')}</p>

      {/* Progress summary */}
      <p className="badge-progress" aria-label={t('badgeProgressLabel')}>
        {t('badgeProgress')}: {earnedCount} / {totalCount}
      </p>

      <ul className="badge-grid">
        {BADGE_SLOTS.map((slot) => {
          const record = statusFor(slot.id);
          const earned = record?.status === 'earned';
          return (
            <li key={slot.id}>
              <div
                className={`badge-slot${earned ? ' badge-slot--earned' : ' badge-slot--locked'}`}
              >
                <div className="badge-slot__icon" aria-hidden="true">
                  {slot.icon}
                </div>
                <div className="badge-slot__name">{t(slot.nameKey)}</div>
                <p className="badge-slot__desc">{t(slot.descKey)}</p>
                <div className="badge-slot__status">
                  {slot.isFirstPilot ? (
                    earned ? (
                      <Tag tone="success">✓ {t('badgeEarned')}</Tag>
                    ) : (
                      <Tag tone="info">{t('badgeUnearned')}</Tag>
                    )
                  ) : (
                    <Tag tone="warning">🔒 {t('badgeFutureTag')}</Tag>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Optional next-region discovery CTA — no second production journey invented */}
      <div className="badge-next">
        <Link to="/discover" className="tmm-btn tmm-btn--secondary tmm-btn--block">
          {t('badgeNextCta')}
        </Link>
      </div>

      <Link to="/my" className="badge-back">
        ← {t('back')}
      </Link>
    </div>
  );
}
