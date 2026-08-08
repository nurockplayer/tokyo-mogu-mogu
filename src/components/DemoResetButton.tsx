/**
 * Demo reset control (Issues #7 / #9, #66).
 *
 * Clears all locally persisted demo state so a demo can be replayed cleanly:
 * collection state (localStorage), saved routes (localStorage), and the S1–S3
 * diagnosis answers (sessionStorage). Mounted in the app header.
 */
import { useState } from 'react';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';
import { clearSavedRoutes } from '../lib/saved-routes';
import { clearDiagnosisAnswers } from '../pages/s0s3/session';

export function DemoResetButton() {
  const { t } = useI18n();
  const { reset } = useCollection();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    // Reset collection + saved-route + diagnosis state so a demo can be
    // replayed cleanly.
    reset();
    clearSavedRoutes();
    clearDiagnosisAnswers();
    setConfirming(false);
  };

  return (
    <button
      type="button"
      className={`demo-reset ${confirming ? 'confirming' : ''}`}
      onClick={handleClick}
      onBlur={() => setConfirming(false)}
      aria-label={t('resetDemo')}
    >
      {confirming ? t('resetConfirm') : t('resetDemo')}
    </button>
  );
}
