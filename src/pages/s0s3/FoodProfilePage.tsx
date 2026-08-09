/**
 * Food Profile page (Issue #78 reframe of S1).
 *
 * The stable, accountless, locally persisted record of the user's dietary
 * restrictions — asked on first use (before the first Exploration) and editable
 * later from My → Food Profile (#81). It is NOT part of the per-trip
 * Exploration answers.
 *
 * Routes:
 *   /food-profile      → first-use setup when no profile exists, else summary
 *   /food-profile/edit → edit an existing profile (mode="edit")
 *
 * The form is intentionally the same component for first-use setup and edit so
 * the schema and trust copy stay identical. Input is recommendation-only, never
 * a safety guarantee (product contract "Safety Boundary").
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Button, Chip } from '../../ui';
import {
  createDefaultFoodProfile,
  type DietaryRestriction,
  type FoodProfile,
} from '../../lib/food-profile';
import { loadFoodProfile, saveFoodProfile } from '../../lib/food-profile-storage';
import './onboarding.css';

interface Choice {
  value: DietaryRestriction;
  label: string;
}

function isSelected(values: DietaryRestriction[], value: DietaryRestriction): boolean {
  return values.includes(value);
}

function toggleValue(values: DietaryRestriction[], value: DietaryRestriction): DietaryRestriction[] {
  return isSelected(values, value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

/** Build the next profile draft from the current one + a field change. */
function draft(profile: FoodProfile, patch: Partial<FoodProfile>): FoodProfile {
  return { ...profile, ...patch };
}

/**
 * Whether the page should render first-use setup, edit mode, or the summary.
 * Derived directly from the persisted-profile presence and the route `mode`
 * (Issue #78 P1 fix) — never from duplicated local state.
 */
export function foodProfileView(mode: 'view' | 'edit', hasExisting: boolean) {
  if (!hasExisting) return 'setup';
  return mode === 'edit' ? 'edit' : 'summary';
}

export function FoodProfilePage({ mode = 'view' }: { mode?: 'view' | 'edit' }) {
  const { t } = useI18n();
  const navigate = useNavigate();

  // `existing` is re-read whenever the route/mode changes so navigating
  // between /food-profile and /food-profile/edit always reflects the latest
  // persisted profile (Issue #78 P1 fix). Edit mode is derived directly from
  // the `mode` prop, never duplicated in local state.
  const [existing, setExisting] = useState<FoodProfile | null>(() => loadFoodProfile());
  const [draftState, setDraftState] = useState<FoodProfile>(
    () => existing ?? createDefaultFoodProfile(),
  );

  const editing = mode === 'edit';

  useEffect(() => {
    // Route navigation (view ⇄ edit) can reuse the same component instance, so
    // the `mode` prop changes without remounting. Re-read storage so the
    // summary/edit draft always reflect the current persisted profile.
    setExisting(loadFoodProfile());
  }, [mode]);

  const choices: Choice[] = [
    { value: 'allergy', label: t('fpAllergy') },
    { value: 'vegetarian-vegan', label: t('fpVegan') },
    { value: 'religious', label: t('fpReligious') },
    { value: 'dislike', label: t('fpDislike') },
  ];

  function setDietary(value: DietaryRestriction) {
    setDraftState(
      draft(draftState, {
        dietary: toggleValue(draftState.dietary, value),
        hasNoRestrictions: false,
      }),
    );
  }

  function setNoRestrictions() {
    setDraftState(
      draft(draftState, { hasNoRestrictions: true, dietary: [], dietaryOther: '' }),
    );
  }

  function setDietaryOther(value: string) {
    const trimmed = value.trim();
    setDraftState(
      draft(draftState, {
        dietaryOther: value,
        hasNoRestrictions: trimmed.length === 0 && draftState.dietary.length === 0,
      }),
    );
  }

  function handleSave() {
    const profile = draft(draftState, { savedAt: new Date().toISOString() });
    saveFoodProfile(profile);
    // Keep the summary fresh with the just-saved profile so returning to the
    // summary route never renders a stale profile (Issue #78 P1 fix).
    setExisting(profile);
    // First-use setup → continue straight into the current Exploration; edit →
    // return to the profile summary.
    navigate(existing ? '/food-profile' : '/explore');
  }

  function handleCancel() {
    if (editing) {
      // Cancel from edit mode: discard the draft and return to the summary,
      // re-reading the persisted profile (which is unchanged by cancel).
      setExisting(loadFoodProfile());
      setDraftState(loadFoodProfile() ?? createDefaultFoodProfile());
      navigate('/food-profile');
    } else {
      navigate('/');
    }
  }

  // Single source of truth for which view renders (Issue #78 P1 fix): derived
  // from the route `mode` + persisted-profile presence, never duplicated state.
  const view = foodProfileView(mode, existing !== null);

  // First-use setup: no profile exists yet.
  if (view === 'setup') {
    return (
      <div className="tmm-page">
        <h1 className="page-title">{t('fpSetupTitle')}</h1>
        <p className="page-sub">{t('fpSetupSub')}</p>

        <div className="tmm-wizard__options">
          {choices.map((choice) => (
            <Chip
              key={choice.value}
              selected={isSelected(draftState.dietary, choice.value)}
              onClick={() => setDietary(choice.value)}
            >
              {choice.label}
            </Chip>
          ))}
        </div>

        <div className="tmm-wizard__options">
          <Chip selected={draftState.hasNoRestrictions} onClick={setNoRestrictions}>
            {t('fpNoRestrictions')}
          </Chip>
        </div>

        <label htmlFor="fp-other" className="tmm-wizard__hint">
          {t('fpOtherLabel')}
        </label>
        <input
          id="fp-other"
          className="tmm-wizard__text"
          type="text"
          value={draftState.dietaryOther}
          onChange={(e) => setDietaryOther(e.target.value)}
          placeholder={t('fpOtherPlaceholder')}
          disabled={draftState.hasNoRestrictions}
        />

        <p className="tmm-wizard__trust">{t('fpTrust')}</p>

        <div className="tmm-wizard__actions">
          <Button variant="primary" className="tmm-btn--block" onClick={handleSave}>
            {t('fpSave')}
          </Button>
        </div>
      </div>
    );
  }

  // Edit mode (My → Food Profile → edit).
  if (view === 'edit') {
    return (
      <div className="tmm-page">
        <h1 className="page-title">{t('fpEditTitle')}</h1>
        <p className="page-sub">{t('fpEditSub')}</p>

        <div className="tmm-wizard__options">
          {choices.map((choice) => (
            <Chip
              key={choice.value}
              selected={isSelected(draftState.dietary, choice.value)}
              onClick={() => setDietary(choice.value)}
            >
              {choice.label}
            </Chip>
          ))}
        </div>

        <div className="tmm-wizard__options">
          <Chip selected={draftState.hasNoRestrictions} onClick={setNoRestrictions}>
            {t('fpNoRestrictions')}
          </Chip>
        </div>

        <label htmlFor="fp-other" className="tmm-wizard__hint">
          {t('fpOtherLabel')}
        </label>
        <input
          id="fp-other"
          className="tmm-wizard__text"
          type="text"
          value={draftState.dietaryOther}
          onChange={(e) => setDietaryOther(e.target.value)}
          placeholder={t('fpOtherPlaceholder')}
          disabled={draftState.hasNoRestrictions}
        />

        <p className="tmm-wizard__trust">{t('fpTrust')}</p>

        <div className="tmm-wizard__actions">
          <Button variant="primary" className="tmm-btn--block" onClick={handleSave}>
            {t('fpSave')}
          </Button>
          <Button variant="secondary" className="tmm-btn--block" onClick={handleCancel}>
            {t('back')}
          </Button>
        </div>
      </div>
    );
  }

  // Display mode: show the current durable profile with an edit entry.
  // `view === 'summary'` only when a profile exists; the guard satisfies TS.
  if (!existing) {
    return null;
  }
  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('fpTitle')}</h1>
      <p className="page-sub">{t('fpSub')}</p>

      <div className="tmm-profile-summary">
        {existing.hasNoRestrictions ? (
          <p className="tmm-profile-summary__line">{t('fpNoRestrictions')}</p>
        ) : (
          <ul className="tmm-profile-summary__list">
            {existing.dietary.map((value) => (
              <li key={value} className="tmm-profile-summary__item">
                {choices.find((c) => c.value === value)?.label ?? value}
              </li>
            ))}
            {existing.dietaryOther.trim().length > 0 ? (
              <li className="tmm-profile-summary__item">{existing.dietaryOther}</li>
            ) : null}
          </ul>
        )}
      </div>

      <div className="tmm-result__actions">
        <Link to="/food-profile/edit" className="tmm-btn tmm-btn--secondary tmm-btn--block">
          {t('fpEditCta')}
        </Link>
        <Link to="/explore" className="tmm-btn tmm-btn--primary tmm-btn--block">
          {t('fpStartExplorationCta')}
        </Link>
      </div>
    </div>
  );
}
