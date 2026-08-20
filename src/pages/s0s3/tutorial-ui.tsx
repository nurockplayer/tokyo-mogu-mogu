import type { ButtonHTMLAttributes } from 'react';
import { useI18n } from '../../i18n';

export const TUTORIAL_GUIDE_ID = 'tmm-tutorial-guide';

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

/**
 * Shared attributes for a tutorial decision group.
 *
 * Every visible option remains in the DOM for product comprehension, but only
 * the current target is enabled. Once a target is consumed it becomes inert so
 * the next beat can expose exactly one new action.
 */
export function tutorialControlProps(
  active: boolean,
  target: boolean,
  consumed = false,
): ButtonHTMLAttributes<HTMLButtonElement> {
  if (!active) return {};
  const actionable = target && !consumed;
  return {
    disabled: !actionable,
    'aria-describedby': target ? TUTORIAL_GUIDE_ID : undefined,
    className: actionable ? 'tmm-tutorial-target' : 'tmm-tutorial-choice',
    'data-tutorial-choice': 'true',
    'data-tutorial-target': actionable ? 'true' : undefined,
  } as ButtonHTMLAttributes<HTMLButtonElement>;
}
