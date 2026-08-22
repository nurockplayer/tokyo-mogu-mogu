import { useEffect, useReducer, useRef } from 'react';
import type { FoodProfile } from '../../../lib/food-profile';
import { saveFoodProfile } from '../../../lib/food-profile-storage';
import { saveNickname } from '../../../lib/nickname';
import {
  createFoodProfileState,
  foodProfileReducer,
  foodProfileToDurableProfile,
} from './foodProfileMachine';

interface UseFoodProfileConversationOptions {
  onProfileSaved?: (name: string, profile: FoodProfile) => void;
}

export function useFoodProfileConversation({
  onProfileSaved,
}: UseFoodProfileConversationOptions = {}) {
  const [state, dispatch] = useReducer(foodProfileReducer, undefined, createFoodProfileState);
  const savedRef = useRef(false);

  useEffect(() => {
    if (!state.pending) return;
    const { delayMs, event } = state.pending;
    const timer = window.setTimeout(() => dispatch(event), delayMs);
    return () => window.clearTimeout(timer);
  }, [state.pending]);

  useEffect(() => {
    if (state.phase !== 'summary' || savedRef.current) return;
    const profile = foodProfileToDurableProfile(state);
    saveFoodProfile(profile);
    saveNickname(state.name);
    savedRef.current = true;
    onProfileSaved?.(state.name, profile);
  }, [onProfileSaved, state]);

  return { state, dispatch };
}
