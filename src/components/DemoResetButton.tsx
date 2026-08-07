/**
 * Demo reset control (Issues #7 / #9).
 *
 * Clears all locally persisted collection data so a demo can be replayed.
 * Mounted in the app header; uses the store's reset() which also clears
 * localStorage.
 */
import { useState } from 'react';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';

export function DemoResetButton() {
  const { t } = useI18n();
  const { reset } = useCollection();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    reset();
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
