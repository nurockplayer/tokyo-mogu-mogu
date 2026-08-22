import { useEffect, useMemo, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import type { FoodProfile } from '../../lib/food-profile';
import { loadFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { recordMoguRecent } from '../../lib/mogu-recent';
import { loadSavedRoutes, saveRoute } from '../../lib/saved-routes';
import { saveExplorationAnswers } from '../../pages/s0s3/exploration-session';
import { FoodProfileConversation } from './chat/FoodProfileConversation';
import { LocaleControl } from './components/LocaleControl';
import { demoJourneys, demoSpots, referenceCopy, type JourneyPresentation, type SpotPresentation } from './content';
import { ExplorationFlow } from './exploration/ExplorationFlow';
import {
  createExplorationState,
  explorationReducer,
  toExplorationAnswers,
  type NetlifyExplorationAnswers,
} from './exploration/explorationMachine';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MoguScreen } from './screens/MoguScreen';
import { MyScreen } from './screens/MyScreen';
import { ResultScreen } from './screens/ResultScreen';
import { RouteScreen } from './screens/RouteScreen';
import { SplashScreen } from './screens/SplashScreen';
import { SpotScreen } from './screens/SpotScreen';
import { StoryScreen } from './screens/StoryScreen';
import { journeyToMoguRecent } from './screens/presentation';

function journeyForStoryPath(pathname: string): JourneyPresentation | undefined {
  if (!pathname.startsWith('/story/')) return undefined;
  const storyId = decodeURIComponent(pathname.slice('/story/'.length));
  return demoJourneys.find((journey) => journey.storyId === storyId);
}

function spotForPath(pathname: string): SpotPresentation | undefined {
  if (!pathname.startsWith('/spot/')) return undefined;
  return demoSpots[decodeURIComponent(pathname.slice('/spot/'.length))];
}

function profileSummary(profile: FoodProfile | null, locale: 'ja' | 'en' | 'zh-TW'): string[] {
  if (!profile) return [];
  if (profile.hasNoRestrictions) {
    return [locale === 'ja' ? '特別な制限はありません' : locale === 'zh-TW' ? '沒有特別限制' : 'No particular restrictions'];
  }
  const labels = {
    ja: { allergy: 'アレルギーあり', 'vegetarian-vegan': '食事スタイルあり', religious: '避けるものあり', dislike: '苦手なものあり' },
    en: { allergy: 'Allergies recorded', 'vegetarian-vegan': 'Diet style recorded', religious: 'Religious restrictions recorded', dislike: 'Dislikes recorded' },
    'zh-TW': { allergy: '已記錄過敏原', 'vegetarian-vegan': '已記錄飲食型態', religious: '已記錄宗教飲食限制', dislike: '已記錄不喜歡的食物' },
  } as const;
  const lines: string[] = profile.dietary.map((item) => labels[locale][item]);
  if (profile.dietaryOther) lines.push(profile.dietaryOther);
  return lines;
}

export function ReferenceApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale } = useI18n();
  const copy = referenceCopy(locale);
  const [nickname, setNickname] = useState(() => loadNickname() ?? '');
  const [foodProfile, setFoodProfile] = useState<FoodProfile | null>(() => loadFoodProfile());
  const [exploration, dispatchExploration] = useReducer(
    explorationReducer,
    undefined,
    createExplorationState,
  );
  const [currentJourney, setCurrentJourney] = useState<JourneyPresentation>(() => demoJourneys[0]);
  const [storyBack, setStoryBack] = useState('/explore/result');
  const [routeBack, setRouteBack] = useState('/story/wasabi-okutama');
  const [spotBack, setSpotBack] = useState('/route');
  const [savedRouteIds, setSavedRouteIds] = useState(() => loadSavedRoutes().map((entry) => entry.routeId));
  const [toast, setToast] = useState('');
  const pathJourney = journeyForStoryPath(location.pathname);
  const currentSpot = spotForPath(location.pathname) ?? demoSpots['okutama-tourism-office'];
  const shownJourney = pathJourney ?? currentJourney;
  const savedJourneys = useMemo(
    () => demoJourneys.filter((journey) => savedRouteIds.includes(journey.routeId)),
    [savedRouteIds],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (pathJourney && pathJourney.id !== currentJourney.id) setCurrentJourney(pathJourney);
  }, [currentJourney.id, pathJourney]);

  useEffect(() => {
    const activeScroll = document.querySelector<HTMLElement>('.reference-screen[data-screen-active="true"] .scroll');
    if (activeScroll) activeScroll.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 1_800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openJourney = (journey: JourneyPresentation) => {
    setCurrentJourney(journey);
    setStoryBack(location.pathname);
    navigate(`/story/${journey.storyId}`);
  };

  const openSpot = (spot: SpotPresentation) => {
    setSpotBack(location.pathname);
    navigate(`/spot/${spot.id}`);
  };

  const completeExploration = (answers: NetlifyExplorationAnswers) => {
    const establishedAnswers = toExplorationAnswers(answers);
    saveExplorationAnswers(establishedAnswers);
    recordMoguRecent(
      journeyToMoguRecent(
        demoJourneys[0],
        establishedAnswers,
        Boolean(foodProfile && !foodProfile.hasNoRestrictions),
      ),
    );
    setCurrentJourney(demoJourneys[0]);
    navigate('/explore/result');
  };

  const persistCurrentRoute = () => {
    const next = saveRoute(currentJourney.routeId);
    setSavedRouteIds(next.map((entry) => entry.routeId));
    setToast(locale === 'ja' ? 'マイルートに保存しました！' : locale === 'zh-TW' ? '已儲存到我的路線！' : 'Saved to My Routes!');
  };

  const shareCurrentRoute = async () => {
    const localized = currentJourney.copy[locale];
    const shareData = {
      title: 'TOKYO MOGU MOGU',
      text: `「${localized.title}」 ${copy.app.tagline}`,
      url: window.location.origin,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setToast(locale === 'ja' ? 'リンクをコピーしました！' : locale === 'zh-TW' ? '已複製連結！' : 'Link copied!');
      }
    } catch {
      // Native share cancellation is intentionally silent, matching the reference.
    }
  };

  const pathname = location.pathname;
  const isSplash = pathname === '/';
  const isProfile = pathname === '/food-profile' || pathname === '/food-profile/edit';
  const isHome = pathname === '/home';
  const isExplore = pathname === '/explore';
  const isResult = pathname === '/explore/result';
  const isStory = pathname === '/story' || pathname.startsWith('/story/');
  const isRoute = pathname === '/route';
  const isSpot = pathname.startsWith('/spot/');
  const isMogu = pathname === '/mogu' || pathname === '/discover';
  const isFavorites = pathname === '/my-route';
  const isMy = pathname === '/my';

  return (
    <main className="reference-app">
      <div className="reference-phone">
        <SplashScreen
          active={isSplash}
          copy={copy}
          onStart={() => navigate(nickname || loadNickname() ? '/home' : '/food-profile')}
        />
        <FoodProfileConversation
          active={isProfile}
          copy={copy}
          locale={locale}
          onProfileSaved={(name, profile) => {
            setNickname(name);
            setFoodProfile(profile);
          }}
          onRecommend={() => navigate('/home')}
          onSkipProfile={() => navigate('/home')}
          onBrowse={() => navigate('/mogu')}
        />
        <HomeScreen
          active={isHome}
          copy={copy}
          locale={locale}
          nickname={nickname}
          onNavigate={navigate}
          onStartExploration={() => {
            dispatchExploration({ type: 'OPEN' });
            navigate('/explore');
          }}
        />
        <ExplorationFlow
          active={isExplore}
          copy={copy}
          locale={locale}
          state={exploration}
          dispatch={dispatchExploration}
          onBackFromFirst={() => navigate(-1)}
          onComplete={completeExploration}
        />
        <ResultScreen
          active={isResult}
          copy={copy}
          locale={locale}
          onBack={() => navigate('/explore')}
          onRepeatSearch={() => {
            dispatchExploration({ type: 'OPEN' });
            navigate('/explore');
          }}
          onOpenJourney={openJourney}
          onNavigate={navigate}
        />
        <StoryScreen
          active={isStory}
          copy={copy}
          locale={locale}
          journey={shownJourney}
          onBack={() => navigate(storyBack)}
          onCreateRoute={(journey) => {
            setCurrentJourney(journey);
            setRouteBack(`/story/${journey.storyId}`);
            navigate('/route');
          }}
          onOpenSpot={openSpot}
        />
        <RouteScreen
          active={isRoute}
          copy={copy}
          locale={locale}
          journey={currentJourney}
          saved={savedRouteIds.includes(currentJourney.routeId)}
          onBack={() => navigate(routeBack)}
          onShare={() => void shareCurrentRoute()}
          onRegenerate={() => setToast(locale === 'ja' ? 'ルートを再生成しました！' : locale === 'zh-TW' ? '已重新建立路線！' : 'Route regenerated!')}
          onOpenSpot={openSpot}
          onSaveRoute={persistCurrentRoute}
          onViewSavedRoutes={() => {
            persistCurrentRoute();
            navigate('/my-route');
          }}
          onNavigate={navigate}
        />
        <SpotScreen
          active={isSpot}
          copy={copy}
          locale={locale}
          spot={currentSpot}
          onBack={() => navigate(spotBack)}
          onOpenGuide={() => setToast(locale === 'ja' ? '外部サイトへ（プロトタイプ）' : locale === 'zh-TW' ? '前往外部網站（原型）' : 'External site (prototype)')}
          onNavigate={navigate}
        />
        <MoguScreen
          active={isMogu}
          copy={copy}
          locale={locale}
          onOpenJourney={openJourney}
          onNavigate={navigate}
        />
        <FavoritesScreen
          active={isFavorites}
          copy={copy}
          locale={locale}
          savedJourneys={savedJourneys}
          onOpenJourney={openJourney}
          onNavigate={navigate}
        />
        <MyScreen
          active={isMy}
          copy={copy}
          locale={locale}
          nickname={nickname}
          profileSummary={profileSummary(foodProfile, locale)}
          savedJourneys={savedJourneys}
          onEditProfile={() => window.location.assign('/food-profile')}
          onOpenSavedJourney={(journey) => {
            setCurrentJourney(journey);
            setRouteBack('/my');
            navigate('/route');
          }}
          onNavigate={navigate}
        />

        {!isSplash ? (
          <LocaleControl locale={locale} label={copy.app.localeLabel} onChange={setLocale} />
        ) : null}
        {toast ? <div className="reference-toast" role="status">{toast}</div> : null}
      </div>
    </main>
  );
}
