import { useEffect, useReducer, useRef } from 'react';
import type { FoodProfile } from '../../../lib/food-profile';
import { saveFoodProfile } from '../../../lib/food-profile-storage';
import { saveNickname } from '../../../lib/nickname';
import {
  createEditFoodProfileState,
  createFoodProfileState,
  foodProfileReducer,
  foodProfileToDurableProfile,
} from './foodProfileMachine';

interface UseFoodProfileConversationOptions {
  active?: boolean;
  mode?: 'onboarding' | 'edit';
  initialName?: string;
  onProfileSaved?: (name: string, profile: FoodProfile) => void;
}

export function useFoodProfileConversation({
  active = true,
  mode = 'onboarding',
  initialName = '',
  onProfileSaved,
}: UseFoodProfileConversationOptions = {}) {
  const [state, dispatch] = useReducer(
    foodProfileReducer,
    undefined,
    () => (mode === 'edit' ? createEditFoodProfileState(initialName) : createFoodProfileState()),
  );
  const savedRef = useRef(false);

  useEffect(() => {
    if (!active || !state.pending) return;
    const { delayMs, event } = state.pending;
    const timer = window.setTimeout(() => dispatch(event), delayMs);
    return () => window.clearTimeout(timer);
  }, [active, state.pending]);

  useEffect(() => {
    const summaryVisible = state.entries.some((entry) => entry.kind === 'summary');
    if (!summaryVisible || savedRef.current) return;
    const profile = foodProfileToDurableProfile(state);
    saveFoodProfile(profile);
    if (state.name) saveNickname(state.name);
    savedRef.current = true;
    onProfileSaved?.(state.name, profile);
  }, [onProfileSaved, state]);

  return { state, dispatch };
}
