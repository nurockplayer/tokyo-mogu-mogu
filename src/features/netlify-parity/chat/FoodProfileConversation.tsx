import { Fragment, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { FoodProfile } from '../../../lib/food-profile';
import type { Locale } from '../../../i18n';
import { referenceAssets, type ReferenceCopy } from '../content';
import {
  FOOD_PROFILE_QUESTIONS,
  selectedRestrictionValues,
  type ConversationEntry,
  type FoodProfileConversationState,
  type FoodProfileQuestionKey,
} from './foodProfileMachine';
import { useFoodProfileConversation } from './useFoodProfileConversation';

interface FoodProfileConversationProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  mode?: 'onboarding' | 'edit';
  initialName?: string;
  onProfileSaved?: (name: string, profile: FoodProfile) => void;
  onRecommend: () => void;
  onSkipProfile: () => void;
  onBrowse: () => void;
  onFinishEdit?: () => void;
}

const QUESTION_OPTION_KEYS = {
  allergy: ['egg', 'dairy', 'wheat', 'crustacean', 'nuts', 'fish', 'none'],
  diet: ['vegetarian', 'vegan', 'pescatarian', 'none'],
  religion: ['pork', 'beef', 'halal', 'alcohol', 'none'],
  dislike: ['raw', 'spicy', 'fermented', 'bitter', 'shellfish', 'none'],
} as const;

const editCopy: Record<Locale, { intro: string; returnToMy: string }> = {
  ja: {
    intro: 'Food Profileを編集しましょう！<br>あらためて選び直してください。',
    returnToMy: 'マイページへ戻る',
  },
  en: {
    intro: 'Let’s update your Food Profile!<br>Please make your selections again.',
    returnToMy: 'Return to My page',
  },
  'zh-TW': {
    intro: '一起更新你的飲食檔案吧！<br>請重新選擇。',
    returnToMy: '返回我的頁面',
  },
};

function BreakText({ value }: { value: string }) {
  const parts = value.split('<br>');
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 ? <br /> : null}
          {part}
        </span>
      ))}
    </>
  );
}

function BotRow({ children }: { children: ReactNode }) {
  return (
    <div className="crow">
      <div className="avatar" aria-hidden="true">
        <img src={referenceAssets.logoFull} alt="" />
      </div>
      <div className="bubble">{children}</div>
    </div>
  );
}

function UserRow({ children }: { children: ReactNode }) {
  return (
    <div className="crow user">
      <div className="bubble">{children}</div>
    </div>
  );
}

function optionLabel(copy: ReferenceCopy, questionKey: FoodProfileQuestionKey, value: string) {
  if (value.startsWith('custom:')) return value.slice('custom:'.length);
  const normalized = value === 'none-allergy' ? 'none' : value;
  const options = copy.profile.questions[questionKey].options as Record<string, string>;
  return options[normalized] ?? value;
}

function plainAnswerLabel(label: string) {
  return label.replace(/^[^\wぁ-んァ-ヶ一-龯]+\s*/u, '');
}

function answerReply(
  locale: Locale,
  copy: ReferenceCopy,
  questionKey: FoodProfileQuestionKey,
  values: readonly string[],
) {
  const labels = values.map((value) => plainAnswerLabel(optionLabel(copy, questionKey, value)));
  const none = copy.profile.questions[questionKey].none;
  if (labels.length === 1 && labels[0] === none) return labels[0];
  if (locale === 'ja') return `${labels.join('と')}です`;
  if (locale === 'zh-TW') return labels.join('、');
  return labels.join(' and ');
}

function profileSummaryLines(
  locale: Locale,
  copy: ReferenceCopy,
  state: FoodProfileConversationState,
) {
  const lines: string[] = [];
  const labels = (key: FoodProfileQuestionKey) =>
    selectedRestrictionValues(state, key).map((value) => optionLabel(copy, key, value));
  const hasAnswer = (key: FoodProfileQuestionKey) =>
    selectedRestrictionValues(state, key).length > 0;

  if (locale === 'ja') {
    if (hasAnswer('allergy')) lines.push(`・${labels('allergy').join('と')}アレルギー`);
    if (hasAnswer('diet')) lines.push(`・${labels('diet').join('、')}`);
    if (hasAnswer('religion')) lines.push(`・${labels('religion').join('　')}を避ける`);
    if (hasAnswer('dislike')) lines.push(`・${labels('dislike').join('、')}が苦手`);
  } else {
    (['allergy', 'diet', 'religion', 'dislike'] as const).forEach((key) => {
      if (hasAnswer(key)) lines.push(`• ${labels(key).join(locale === 'zh-TW' ? '、' : ', ')}`);
    });
  }

  return lines.length > 0 ? lines : [copy.profile.noRestrictions];
}

interface QuestionBubbleProps {
  copy: ReferenceCopy;
  entry: ConversationEntry;
  state: FoodProfileConversationState;
  onToggle: (value: string) => void;
  onToggleOther: () => void;
  onAddOther: (value: string) => void;
  onSubmit: () => void;
}

function QuestionBubble({
  copy,
  entry,
  state,
  onToggle,
  onToggleOther,
  onAddOther,
  onSubmit,
}: QuestionBubbleProps) {
  const [otherValue, setOtherValue] = useState('');
  const otherInputRef = useRef<HTMLInputElement>(null);
  const questionIndex = entry.questionIndex ?? 0;
  const question = FOOD_PROFILE_QUESTIONS[questionIndex];
  const questionCopy = copy.profile.questions[question.key];
  const frozen = Boolean(entry.frozen);
  const isCurrent = state.questionIndex === questionIndex && state.phase === 'question' && !frozen;
  const selected = frozen ? [...(entry.values ?? [])] : state.answers[question.key];
  const customValues = state.customAnswers[question.key].map((value) => `custom:${value}`);
  const deviated = selected.some((value) => !question.recommendedValues.includes(value));
  const recommendedLeft = question.recommendedValues.filter((value) => !selected.includes(value));
  const shouldGlowSend = isCurrent && selected.length > 0 && (deviated || recommendedLeft.length === 0);

  useEffect(() => {
    if (isCurrent && state.otherInputOpen) otherInputRef.current?.focus();
  }, [isCurrent, state.otherInputOpen]);

  const addOther = (event: FormEvent) => {
    event.preventDefault();
    if (!otherValue.trim()) {
      otherInputRef.current?.focus();
      return;
    }
    onAddOther(otherValue);
    setOtherValue('');
  };

  return (
    <div
      className="crow"
      data-question-index={questionIndex}
      data-frozen={frozen}
    >
      <div className="avatar" aria-hidden="true">
        <img src={referenceAssets.logoFull} alt="" />
      </div>
      <div className="bubble">
        {questionCopy.prompt}
        <div className="chips">
          {QUESTION_OPTION_KEYS[question.key].map((optionKey, optionIndex) => {
            const value = question.optionValues[optionIndex];
            const isSelected = selected.includes(value);
            const shouldGlow =
              isCurrent &&
              !deviated &&
              recommendedLeft.includes(value);
            return (
              <button
                className={`chip${isSelected ? ' sel' : ''}${shouldGlow ? ' glow' : ''}`}
                key={value}
                onClick={() => onToggle(value)}
                type="button"
                disabled={!isCurrent}
                aria-pressed={isSelected}
              >
                {(questionCopy.options as Record<string, string>)[optionKey]}
              </button>
            );
          })}
          {customValues.map((value) => (
            <button
              className={`chip${selected.includes(value) ? ' sel' : ''}`}
              key={value}
              onClick={() => onToggle(value)}
              type="button"
              disabled={!isCurrent}
              aria-pressed={selected.includes(value)}
            >
              {optionLabel(copy, question.key, value)}
            </button>
          ))}
          {question.allowOther ? (
            <button
              className="chip"
              onClick={onToggleOther}
              type="button"
              disabled={!isCurrent}
            >
              {(questionCopy.options as Record<string, string>).other}
            </button>
          ) : null}
        </div>
        {isCurrent && state.otherInputOpen ? (
          <form className="other-row" onSubmit={addOther}>
            <input
              ref={otherInputRef}
              value={otherValue}
              onChange={(event) => setOtherValue(event.target.value)}
              placeholder={copy.profile.otherPlaceholder}
            />
            <button type="submit">{copy.profile.add}</button>
          </form>
        ) : null}
        {isCurrent ? (
          <button
            className={`send${shouldGlowSend ? ' glow' : ''}`}
            onClick={onSubmit}
            type="button"
          >
            {copy.actions.send}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function FoodProfileConversation({
  active,
  copy,
  locale,
  mode = 'onboarding',
  initialName = '',
  onProfileSaved,
  onRecommend,
  onSkipProfile,
  onBrowse,
  onFinishEdit,
}: FoodProfileConversationProps) {
  const { state, dispatch } = useFoodProfileConversation({ active, mode, initialName, onProfileSaved });
  const [nameValue, setNameValue] = useState('');
  const [nameInvalid, setNameInvalid] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const summaryLines = useMemo(
    () => profileSummaryLines(locale, copy, state),
    [copy, locale, state],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [state.entries.length, state.otherInputOpen]);

  useEffect(() => {
    if (state.phase === 'name') nameInputRef.current?.focus();
  }, [state.phase]);

  const submitName = (event: FormEvent) => {
    event.preventDefault();
    if (!nameValue.trim()) {
      setNameInvalid(true);
      nameInputRef.current?.focus();
      return;
    }
    setNameInvalid(false);
    dispatch({ type: 'SUBMIT_NAME', name: nameValue });
  };

  let unnamedUserEntry = 0;

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="food-profile"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <div className="ghead">
        <span aria-hidden="true" style={{ opacity: 0.001 }}>.</span>
      </div>
      <div className="chat-body" ref={scrollRef} aria-live="polite">
        {state.entries.map((entry) => {
          if (entry.kind === 'edit-intro') {
            return (
              <BotRow key={entry.id}>
                <BreakText value={editCopy[locale].intro} />
              </BotRow>
            );
          }
          if (entry.kind === 'welcome') {
            return (
              <BotRow key={entry.id}>
                <BreakText value={copy.profile.welcomeBody} />
              </BotRow>
            );
          }
          if (entry.kind === 'user' && entry.questionIndex === undefined) {
            const isBeginReply = unnamedUserEntry === 0;
            unnamedUserEntry += 1;
            return (
              <UserRow key={entry.id}>
                {isBeginReply
                  ? copy.profile.beginReply
                  : `${copy.profile.nameReply.prefix}${state.name}${copy.profile.nameReply.suffix}`}
              </UserRow>
            );
          }
          if (entry.kind === 'name-prompt') {
            return (
              <BotRow key={entry.id}>{copy.profile.namePrompt}</BotRow>
            );
          }
          if (entry.kind === 'greeting') {
            return (
              <BotRow key={entry.id}>
                <BreakText value={copy.profile.greetingTemplate.replace('{name}', state.name)} />
              </BotRow>
            );
          }
          if (entry.kind === 'question') {
            return (
              <QuestionBubble
                key={entry.id}
                copy={copy}
                entry={entry}
                state={state}
                onToggle={(value) => dispatch({ type: 'TOGGLE_OPTION', value })}
                onToggleOther={() => dispatch({ type: 'TOGGLE_OTHER' })}
                onAddOther={(value) => dispatch({ type: 'ADD_OTHER', value })}
                onSubmit={() => dispatch({ type: 'SUBMIT_QUESTION' })}
              />
            );
          }
          if (entry.kind === 'user' && entry.questionIndex !== undefined && entry.values) {
            const question = FOOD_PROFILE_QUESTIONS[entry.questionIndex];
            return (
              <UserRow key={entry.id}>
                {answerReply(locale, copy, question.key, entry.values)}
              </UserRow>
            );
          }
          if (entry.kind === 'summary') {
            return (
              <BotRow key={entry.id}>
                {copy.profile.summaryThanks}
                <br />
                {locale === 'ja'
                  ? `あなたの食のプロフィールを${state.isEditing ? copy.profile.summaryUpdated : copy.profile.summaryRegistered}しました。`
                  : state.isEditing
                    ? copy.profile.summaryUpdated
                    : copy.profile.summaryRegistered}
                <div className="profile-box">
                  {copy.profile.summaryTitle}
                  <br />
                  <br />
                  {summaryLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                  <br />
                  {copy.profile.summaryDisclaimer}
                </div>
              </BotRow>
            );
          }
          if (entry.kind === 'final-choice') {
            if (state.isEditing) {
              return (
                <div className="choice-card" key={entry.id}>
                  <button className="btn orange" onClick={onFinishEdit} type="button">
                    {editCopy[locale].returnToMy}
                  </button>
                </div>
              );
            }
            return (
              <Fragment key={entry.id}>
                <BotRow>{copy.profile.finalPrompt}</BotRow>
                <div className="choice-card">
                  <button className="btn orange glow" onClick={onRecommend} type="button">
                    {copy.actions.recommendJourney}
                  </button>
                  <button className="btn outline" onClick={onBrowse} type="button">
                    {copy.actions.selfBrowse}
                  </button>
                </div>
              </Fragment>
            );
          }
          return null;
        })}

        {state.phase === 'start' ? (
          <div className="choice-card">
            <button className="btn orange glow" onClick={() => dispatch({ type: 'BEGIN' })} type="button">
              {copy.actions.beginProfile}
            </button>
            <button className="btn outline" onClick={onSkipProfile} type="button">
              {copy.actions.skipProfile}
            </button>
          </div>
        ) : null}

        {state.phase === 'name' ? (
          <form className="name-input" onSubmit={submitName}>
            <input
              ref={nameInputRef}
              value={nameValue}
              onChange={(event) => {
                setNameValue(event.target.value);
                setNameInvalid(false);
              }}
              placeholder={copy.profile.nicknamePlaceholder}
              aria-invalid={nameInvalid}
              aria-label={copy.profile.nicknamePlaceholder}
              title={nameInvalid ? copy.profile.nameError : undefined}
              style={nameInvalid ? { borderColor: '#F05B5B' } : undefined}
            />
            <button className="glow" type="submit">{copy.actions.submitName}</button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
