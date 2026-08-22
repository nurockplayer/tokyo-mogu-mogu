/** Visual option ids selected in the current per-trip finder session. */
export interface VisualAnswers {
  tastes: string[];
  experiences: string[];
  departure: string | null;
  travel: string | null;
  themes: string[];
  duration: string | null;
}

type SingleSelection =
  | { key: 'experiences'; id: string }
  | { key: 'departure' | 'travel' | 'duration'; id: string };

/**
 * Apply a single-choice finder answer without coupling selection to navigation.
 * Guided first use advances immediately; normal/repeat use stays on the step so
 * the selected state can be reviewed before Next is pressed.
 */
export function applySingleSelection(
  state: { step: number; visual: VisualAnswers },
  selection: SingleSelection,
  tutorialActive: boolean,
): { step: number; visual: VisualAnswers } {
  const nextVisual = selection.key === 'experiences'
    ? { ...state.visual, experiences: [selection.id] }
    : { ...state.visual, [selection.key]: selection.id };

  return {
    step: tutorialActive ? state.step + 1 : state.step,
    visual: nextVisual,
  };
}
