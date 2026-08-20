import { useI18n } from '../../i18n';
import { TUTORIAL_GUIDE_ID } from './tutorial-controls';

/** Visible, localized explanation for the single-target demo interaction. */
export function TutorialGuide() {
  const { t } = useI18n();
  return (
    <aside
      id={TUTORIAL_GUIDE_ID}
      className="tmm-tutorial-guide"
      data-testid="tutorial-guide"
      role="note"
    >
      <strong className="tmm-tutorial-guide__label">{t('tutorialModeLabel')}</strong>
      <span>{t('tutorialModeHint')}</span>
    </aside>
  );
}
