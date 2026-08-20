/**
 * Demo reset control (Issues #7 / #9, #66, #78).
 *
 * Clears all locally persisted demo state so a demo can be replayed cleanly:
 * collection state (localStorage), saved routes (localStorage), the durable
 * Food Profile (localStorage), the current Exploration answers (sessionStorage),
 * and MOGU Recent (localStorage). Mounted in the app header.
 */
import { useState } from 'react';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';
import { clearSavedRoutes } from '../lib/saved-routes';
import { clearExplorationAnswers } from '../pages/s0s3/exploration-session';
import { clearFoodProfile } from '../lib/food-profile-storage';
import { clearMoguRecent } from '../lib/mogu-recent';
import { clearNickname } from '../lib/nickname';
import { resetGuidedTutorial } from '../pages/s0s3/tutorial-session';

export function DemoResetButton() {
  const { t } = useI18n();
  const { reset } = useCollection();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    // Reset collection + saved-route + Food Profile + current Exploration +
    // MOGU Recent + session nickname state so a demo can be replayed cleanly
    // (first-use flow).
    reset();
    clearSavedRoutes();
    clearExplorationAnswers();
    clearFoodProfile();
    clearMoguRecent();
    clearNickname();
    resetGuidedTutorial();
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
