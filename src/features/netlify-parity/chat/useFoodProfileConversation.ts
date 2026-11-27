import { useEffect, useReducer, useRef } from 'react';
import type { FoodProfile } from '../../../lib/food-profile';
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
  onProfileCompleted?: (name: string, profile: FoodProfile) => void;
}

export function useFoodProfileConversation({
  active = true,
  mode = 'onboarding',
  initialName = '',
  onProfileCompleted,
}: UseFoodProfileConversationOptions = {}) {
  const [state, dispatch] = useReducer(
    foodProfileReducer,
    undefined,
    () => (mode === 'edit' ? createEditFoodProfileState(initialName) : createFoodProfileState()),
  );
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active || !state.pending) return;
    const { delayMs, event } = state.pending;
    const timer = window.setTimeout(() => dispatch(event), delayMs);
    return () => window.clearTimeout(timer);
  }, [active, state.pending]);

  useEffect(() => {
    const summaryVisible = state.entries.some((entry) => entry.kind === 'summary');
    if (!summaryVisible || completedRef.current) return;
    completedRef.current = true;
    onProfileCompleted?.(state.name, foodProfileToDurableProfile(state));
  }, [onProfileCompleted, state]);

  return { state, dispatch };
}
