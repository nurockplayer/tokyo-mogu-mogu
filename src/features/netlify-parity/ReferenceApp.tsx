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
import { demoJourneys, demoSpots, referenceCopy, type JourneyPresentation, type SpotPresentation } from './content';
import { ExplorationFlow } from './exploration/ExplorationFlow';
import {
  createExplorationState,
  explorationReducer,
  toExplorationAnswers,
  type NetlifyExplorationAnswers,
} from './exploration/explorationMachine';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { BadgesScreen } from './screens/BadgesScreen';
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

function journeyForSearch(search: string): JourneyPresentation | undefined {
  const params = new URLSearchParams(search);
  const candidateId = params.get('candidateId');
  const routeId = params.get('routeId');
  const resultId = params.get('resultId');

  return demoJourneys.find(
    (journey) =>
      journey.id === candidateId ||
      journey.routeId === routeId ||
      journey.foodCultureId === resultId ||
      journey.storyId === resultId,
  );
}

function spotForPath(pathname: string): SpotPresentation | undefined {
  if (!pathname.startsWith('/spot/')) return undefined;
  return demoSpots[decodeURIComponent(pathname.slice('/spot/'.length))];
}

interface ReferenceFavorites {
  journeyIds: string[];
  spotIds: string[];
}

const REFERENCE_FAVORITES_KEY = 'tmm:figmaFavorites:v1';

function loadReferenceFavorites(): ReferenceFavorites {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(REFERENCE_FAVORITES_KEY) ?? '{}');
    if (!value || typeof value !== 'object') return { journeyIds: [], spotIds: [] };
    const record = value as Record<string, unknown>;
    return {
      journeyIds: Array.isArray(record.journeyIds)
        ? record.journeyIds.filter((id): id is string => typeof id === 'string')
        : [],
      spotIds: Array.isArray(record.spotIds)
        ? record.spotIds.filter((id): id is string => typeof id === 'string')
        : [],
    };
  } catch {
    return { journeyIds: [], spotIds: [] };
  }
}

function saveReferenceFavorites(value: ReferenceFavorites) {
  try {
    localStorage.setItem(REFERENCE_FAVORITES_KEY, JSON.stringify(value));
  } catch {
    // Accountless demo persistence can safely degrade when storage is unavailable.
  }
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
  const [editSessionId, setEditSessionId] = useState(0);
  const [storyBack, setStoryBack] = useState('/explore/result');
  const [routeBack, setRouteBack] = useState('/story/wasabi-okutama');
  const [spotBack, setSpotBack] = useState('/route');
  const [savedRouteIds, setSavedRouteIds] = useState(() => loadSavedRoutes().map((entry) => entry.routeId));
  const [favorites, setFavorites] = useState<ReferenceFavorites>(loadReferenceFavorites);
  const [toast, setToast] = useState('');
  const pathJourney = journeyForStoryPath(location.pathname);
  const queryJourney = journeyForSearch(location.search);
  const currentSpot = spotForPath(location.pathname) ?? demoSpots['okutama-tourism-office'];
  const shownJourney = pathJourney ?? currentJourney;
  const routeJourney = queryJourney ?? currentJourney;
  const savedJourneys = useMemo(
    () => demoJourneys.filter(
      (journey) => savedRouteIds.includes(journey.routeId) || favorites.journeyIds.includes(journey.id),
    ),
    [favorites.journeyIds, savedRouteIds],
  );
  const savedSpots = useMemo(
    () => Object.values(demoSpots).filter((spot) => favorites.spotIds.includes(spot.id)),
    [favorites.spotIds],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const locationJourney = pathJourney ?? queryJourney;
    if (locationJourney && locationJourney.id !== currentJourney.id) {
      setCurrentJourney(locationJourney);
    }
  }, [currentJourney.id, pathJourney, queryJourney]);

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
    setSpotBack(`${location.pathname}${location.search}`);
    const routeIdentity = location.pathname === '/route'
      ? location.search || `?candidateId=${encodeURIComponent(routeJourney.id)}`
      : '';
    navigate(`/spot/${spot.id}${routeIdentity}`);
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
    const next = saveRoute(routeJourney.routeId);
    setSavedRouteIds(next.map((entry) => entry.routeId));
    setToast(locale === 'ja' ? 'マイルートに保存しました！' : locale === 'zh-TW' ? '已儲存到我的路線！' : 'Saved to My Routes!');
  };

  const toggleJourneyFavorite = (journey: JourneyPresentation) => {
    const removing = favorites.journeyIds.includes(journey.id);
    const next = {
      ...favorites,
      journeyIds: removing
        ? favorites.journeyIds.filter((id) => id !== journey.id)
        : [...favorites.journeyIds, journey.id],
    };
    setFavorites(next);
    saveReferenceFavorites(next);
    setToast(removing
      ? locale === 'ja' ? 'お気に入りから削除しました' : locale === 'zh-TW' ? '已從收藏移除' : 'Removed from favorites'
      : locale === 'ja' ? 'お気に入りに保存しました！' : locale === 'zh-TW' ? '已儲存至收藏！' : 'Saved to favorites!');
  };

  const toggleSpotFavorite = (spot: SpotPresentation) => {
    const removing = favorites.spotIds.includes(spot.id);
    const next = {
      ...favorites,
      spotIds: removing
        ? favorites.spotIds.filter((id) => id !== spot.id)
        : [...favorites.spotIds, spot.id],
    };
    setFavorites(next);
    saveReferenceFavorites(next);
    setToast(removing
      ? locale === 'ja' ? 'スポットをお気に入りから削除しました' : locale === 'zh-TW' ? '已從收藏移除景點' : 'Spot removed from favorites'
      : locale === 'ja' ? 'スポットをお気に入りに保存しました！' : locale === 'zh-TW' ? '已將景點儲存至收藏！' : 'Spot saved to favorites!');
  };

  const shareCurrentRoute = async () => {
    const localized = routeJourney.copy[locale];
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
  const isProfileOnboarding = pathname === '/food-profile';
  const isProfileEdit = pathname === '/food-profile/edit';
  const isHome = pathname === '/home';
  const isExplore = pathname === '/explore';
  const isResult = pathname === '/explore/result';
  const isStory = pathname === '/story' || pathname.startsWith('/story/');
  const isRoute = pathname === '/route';
  const isSpot = pathname.startsWith('/spot/');
  const isMogu = pathname === '/mogu' || pathname === '/discover';
  const isFavorites = pathname === '/my-route';
  const isMy = pathname === '/my';
  const isBadges = pathname === '/badges';

  return (
    <main className="reference-app" data-locale={locale} data-pathname={pathname}>
      <div className="reference-phone">
        <SplashScreen
          active={isSplash}
          copy={copy}
          onStart={() => navigate(nickname || loadNickname() ? '/home' : '/food-profile')}
        />
        <FoodProfileConversation
          active={isProfileOnboarding}
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
        <FoodProfileConversation
          active={isProfileEdit}
          copy={copy}
          initialName={nickname}
          key={`profile-edit-${nickname}-${editSessionId}`}
          locale={locale}
          mode="edit"
          onProfileSaved={(name, profile) => {
            if (name) setNickname(name);
            setFoodProfile(profile);
          }}
          onRecommend={() => navigate('/home')}
          onSkipProfile={() => navigate('/my')}
          onBrowse={() => navigate('/mogu')}
          onFinishEdit={() => navigate('/my')}
        />
        <HomeScreen
          active={isHome}
          copy={copy}
          locale={locale}
          nickname={nickname}
          favoriteJourneyIds={favorites.journeyIds}
          onNavigate={navigate}
          onOpenJourney={openJourney}
          onToggleFavorite={toggleJourneyFavorite}
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
            navigate(`/route?candidateId=${encodeURIComponent(journey.id)}`);
          }}
          onOpenSpot={openSpot}
        />
        <RouteScreen
          active={isRoute}
          copy={copy}
          locale={locale}
          journey={routeJourney}
          saved={savedRouteIds.includes(routeJourney.routeId)}
          onBack={() => {
            const from = new URLSearchParams(location.search).get('from');
            navigate(from === 'my' ? '/my' : queryJourney ? `/story/${queryJourney.storyId}` : routeBack);
          }}
          onShare={() => void shareCurrentRoute()}
          onRegenerate={() => setToast(locale === 'ja' ? 'ルートを再生成しました！' : locale === 'zh-TW' ? '已重新建立路線！' : 'Route regenerated!')}
          onOpenSpot={openSpot}
          onSaveRoute={persistCurrentRoute}
          onViewSavedRoutes={() => {
            persistCurrentRoute();
            navigate('/my-route');
          }}
        />
        <SpotScreen
          active={isSpot}
          copy={copy}
          locale={locale}
          spot={currentSpot}
          saved={favorites.spotIds.includes(currentSpot.id)}
          onBack={() => navigate(queryJourney ? `/route${location.search}` : spotBack)}
          onOpenGuide={() => setToast(locale === 'ja' ? '外部サイトへ（プロトタイプ）' : locale === 'zh-TW' ? '前往外部網站（原型）' : 'External site (prototype)')}
          onToggleSaved={toggleSpotFavorite}
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
          savedSpots={savedSpots}
          onOpenJourney={openJourney}
          onOpenSpot={openSpot}
          onNavigate={navigate}
        />
        <MyScreen
          active={isMy}
          copy={copy}
          locale={locale}
          nickname={nickname}
          onEditProfile={() => {
            setEditSessionId((sessionId) => sessionId + 1);
            navigate('/food-profile/edit');
          }}
          onChangeLocale={setLocale}
          onNavigate={navigate}
          onNotify={setToast}
        />
        <BadgesScreen active={isBadges} locale={locale} onBack={() => navigate('/my')} />

        {toast ? <div className="reference-toast" role="status">{toast}</div> : null}
      </div>
    </main>
  );
}
