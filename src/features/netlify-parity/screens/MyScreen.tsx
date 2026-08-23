import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import badgeArtwork from '../../../assets/figma-296/food-badge.png';
import cameraIcon from '../../../assets/figma-296/camera.svg';
import helpIcon from '../../../assets/figma-296/help.svg';
import languageIcon from '../../../assets/figma-296/language.svg';
import avatarArtwork from '../../../assets/figma-296/my-avatar.svg';
import routesArtwork from '../../../assets/figma-296/saved-routes.png';
import settingsIcon from '../../../assets/figma-296/settings.svg';
import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { Issue296Header } from '../components/Issue296Header';
import type { ReferenceCopy } from '../content';

interface MyLabels {
  defaultNickname: string;
  editProfile: string;
  savedRoutes: string;
  savedRoutesDescription: string;
  badges: string;
  badgesDescription: string;
  language: string;
  otherSettings: string;
  help: string;
  logout: string;
  languageDialog: string;
  close: string;
}

const myLabels: Record<Locale, MyLabels> = {
  ja: {
    defaultNickname: 'ナナミ', editProfile: 'プロフィール編集', savedRoutes: 'マイルート',
    savedRoutesDescription: '保存したルートを\n確認できます', badges: '食のバッジ', badgesDescription: '食体験で集めた\nバッジをチェック',
    language: '言語設定', otherSettings: 'その他の設定', help: 'ヘルプ・お問合せ',
    logout: 'ログアウト', languageDialog: '言語を選択', close: '閉じる',
  },
  en: {
    defaultNickname: 'Nanami', editProfile: 'Edit profile', savedRoutes: 'Saved journeys',
    savedRoutesDescription: 'Revisit your saved\nfood journeys', badges: 'Food badges',
    badgesDescription: 'Collect memories from\nyour food journeys', language: 'Language',
    otherSettings: 'Other settings', help: 'Help & contact', logout: 'Log out',
    languageDialog: 'Choose a language', close: 'Close',
  },
  'zh-TW': {
    defaultNickname: 'Nanami', editProfile: '編輯個人資料', savedRoutes: '已儲存的行程',
    savedRoutesDescription: '再次瀏覽已儲存的\n美食旅程', badges: '美食徽章',
    badgesDescription: '收藏美食旅程的\n回憶', language: '語言設定', otherSettings: '其他設定',
    help: '幫助與聯絡我們', logout: '登出', languageDialog: '選擇語言', close: '關閉',
  },
};

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
];

export interface MyScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  nickname: string;
  onEditProfile: () => void;
  onChangeLocale: (locale: Locale) => void;
  onNavigate: (path: string) => void;
  onNotify: (message: string) => void;
}

export function MyScreen({
  active,
  copy,
  locale,
  nickname,
  onEditProfile,
  onChangeLocale,
  onNavigate,
  onNotify,
}: MyScreenProps) {
  const labels = myLabels[locale];
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageEntryRef = useRef<HTMLButtonElement>(null);
  const languageDialogRef = useRef<HTMLElement>(null);
  const languageWasOpenRef = useRef(false);

  useEffect(() => {
    if (languageOpen) {
      const selectedLanguage = languageDialogRef.current?.querySelector<HTMLButtonElement>(
        'button[aria-pressed="true"]',
      );
      selectedLanguage?.focus();
      languageWasOpenRef.current = true;
      return;
    }

    if (languageWasOpenRef.current) {
      languageEntryRef.current?.focus();
      languageWasOpenRef.current = false;
    }
  }, [languageOpen]);

  const closeLanguageDialog = () => setLanguageOpen(false);
  const handleLanguageDialogKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLanguageDialog();
      return;
    }

    if (event.key !== 'Tab') return;

    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
    );
    const firstButton = buttons.at(0);
    const lastButton = buttons.at(-1);
    if (!firstButton || !lastButton) return;

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault();
      lastButton.focus();
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault();
      firstButton.focus();
    }
  };
  const notifyUnavailable = () => {
    onNotify(locale === 'ja' ? '準備中です' : locale === 'zh-TW' ? '功能準備中' : 'Coming soon');
  };

  return (
    <section
      className={`reference-screen issue-296-screen issue-296-my${active ? ' on' : ''}`}
      data-screen="my"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <Issue296Header title={copy.my.title} />
      <div className="issue-296-my-scroll scroll">
        <div className="issue-296-my-canvas">
          <button className="issue-296-profile-edit" type="button" onClick={onEditProfile}>
            {labels.editProfile}
          </button>

          <div className="issue-296-avatar" aria-hidden="true">
            <img className="issue-296-avatar-art" src={avatarArtwork} alt="" />
            <img className="issue-296-camera" src={cameraIcon} alt="" />
          </div>
          <p className="issue-296-nickname">{nickname || labels.defaultNickname}</p>

          <div className="issue-296-action-grid">
            <button
              className="issue-296-action-card issue-296-route-card"
              type="button"
              aria-label={labels.savedRoutes}
              onClick={() => onNavigate('/my-route')}
            >
              <img src={routesArtwork} alt="" />
              <strong>{labels.savedRoutes}</strong>
              <span>{labels.savedRoutesDescription}</span>
            </button>
            <button className="issue-296-action-card" type="button" onClick={() => onNavigate('/badges')}>
              <img src={badgeArtwork} alt="" />
              <strong>{labels.badges}</strong>
              <span>{labels.badgesDescription}</span>
            </button>
          </div>

          <div className="issue-296-menu">
            <button ref={languageEntryRef} type="button" onClick={() => setLanguageOpen(true)}>
              <img src={languageIcon} alt="" /><span>{labels.language}</span><i aria-hidden="true" />
            </button>
            <button type="button" onClick={notifyUnavailable}>
              <img src={settingsIcon} alt="" /><span>{labels.otherSettings}</span><i aria-hidden="true" />
            </button>
            <button type="button" onClick={notifyUnavailable}>
              <img src={helpIcon} alt="" /><span>{labels.help}</span><i aria-hidden="true" />
            </button>
          </div>

          <button className="issue-296-logout" type="button" onClick={notifyUnavailable}>
            {labels.logout}
          </button>
        </div>
      </div>
      <BottomNavigation active="my" copy={copy.nav} onNavigate={onNavigate} variant="issue-296-my" />

      {languageOpen ? (
        <div className="issue-296-language-backdrop" role="presentation" onMouseDown={closeLanguageDialog}>
          <section
            ref={languageDialogRef}
            className="issue-296-language-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="issue-296-language-title"
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={handleLanguageDialogKeyDown}
          >
            <h2 id="issue-296-language-title">{labels.languageDialog}</h2>
            {localeOptions.map((option) => (
              <button
                className={option.value === locale ? 'selected' : undefined}
                type="button"
                key={option.value}
                onClick={() => {
                  onChangeLocale(option.value);
                  closeLanguageDialog();
                }}
                aria-pressed={option.value === locale}
              >
                {option.label}
              </button>
            ))}
            <button className="issue-296-language-close" type="button" onClick={closeLanguageDialog}>
              {labels.close}
            </button>
          </section>
        </div>
      ) : null}
    </section>
  );
}
