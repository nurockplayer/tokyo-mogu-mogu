import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { loadFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { loadSavedRoutes, saveRoute } from '../../lib/saved-routes';
import { FoodProfileConversation } from './chat/FoodProfileConversation';
import { BottomNavigation } from './components/BottomNavigation';
import {
  currentJourneys,
  currentSpots,
  referenceCopy,
  resultJourneys,
  type JourneyPresentation,
  type SpotPresentation,
} from './content';
import { ExplorationFlow } from './exploration/ExplorationFlow';
import {
  discoveryJourney,
  discoveryOptions,
  emptyDiscoveryFilters,
  loadDiscoveryFilters,
  saveDiscoveryFilters,
  type DiscoveryFilters,
} from './discovery';
import { DiscoveryFields } from './exploration/DiscoveryFields';
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
import type { CurrentJourneyLocationResolution } from './journey-location';
import { journeyRecord, publishedJourneys } from './journey-publication';

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

export function ReferenceApp({ journeyLocation, unavailableJourney = false }: {
  journeyLocation: CurrentJourneyLocationResolution;
  unavailableJourney?: boolean;
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { locale, setLocale, t } = useI18n();
  const copy = referenceCopy(locale);
  const [nickname, setNickname] = useState(() => loadNickname() ?? '');
  const [foodProfile, setFoodProfile] = useState(loadFoodProfile);
  const [preferences, setPreferences] = useState(loadDiscoveryFilters);
  const [tripFilters, setTripFilters] = useState<DiscoveryFilters | null>(null);
  const [explorationStep, setExplorationStep] = useState(0);
  const catalog = useMemo(() =>
    ['/food-profile', '/food-profile/edit', '/explore', '/explore/result'].includes(pathname)
      ? publishedJourneys().map((journey) => discoveryJourney(journey, journeyRecord(journey.id)!))
      : [],
    [pathname],
  );
  const options = useMemo(() => discoveryOptions(catalog), [catalog]);
  const filters = tripFilters ?? preferences;
  const [currentJourney, setCurrentJourney] = useState<JourneyPresentation>(() => resultJourneys[0]);
  const [editSessionId, setEditSessionId] = useState(0);
  const [storyBack, setStoryBack] = useState('/explore/result');
  const [routeBack, setRouteBack] = useState('/story/wasabi-okutama');
  const [spotBack, setSpotBack] = useState('/route');
  const [savedRouteIds, setSavedRouteIds] = useState(() => loadSavedRoutes().map((entry) => entry.routeId));
  const [favorites, setFavorites] = useState<ReferenceFavorites>(loadReferenceFavorites);
  const [toast, setToast] = useState('');
  const locationJourney = journeyLocation.status === 'resolved'
    ? journeyLocation.journey
    : undefined;
  const { hasJourneyQuery, fromMy } = journeyLocation;
  // Inactive screens stay mounted for the current transition model; this value
  // is never used to resolve a valid /spot/:id path.
  const currentSpot = journeyLocation.spot ?? currentSpots['okutama-tourism-office'];
  const shownJourney = locationJourney ?? currentJourney;
  const routeJourney = locationJourney ?? currentJourney;
  const publicationRecord = locationJourney && journeyRecord(locationJourney.id);
  const savedJourneys = useMemo(
    () => currentJourneys.filter(
      (journey) => savedRouteIds.includes(journey.routeId) || favorites.journeyIds.includes(journey.id),
    ),
    [favorites.journeyIds, savedRouteIds],
  );
  const savedSpots = useMemo(
    () => Object.values(currentSpots).filter((spot) => favorites.spotIds.includes(spot.id)),
    [favorites.spotIds],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (locationJourney && locationJourney.id !== currentJourney.id) {
      setCurrentJourney(locationJourney);
    }
  }, [currentJourney.id, locationJourney]);

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

  const updatePreferences = (value: DiscoveryFilters) => {
    setPreferences(value);
    saveDiscoveryFilters(value);
  };

  const openExploration = () => {
    setExplorationStep(0);
    navigate('/explore');
  };

  const persistCurrentRoute = () => {
    const next = saveRoute(routeJourney.routeId);
    setSavedRouteIds(next.map((entry) => entry.routeId));
    setToast(locale === 'ja' ? 'マイルートに保存しました！' : locale === 'zh-TW' ? '已儲存到我的路線！' : 'Saved to My Routes!');
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

  const isSplash = pathname === '/';
  const isProfileOnboarding = pathname === '/food-profile';
  const isProfileEdit = pathname === '/food-profile/edit';
  const isHome = pathname === '/home';
  const isExplore = pathname === '/explore';
  const isResult = !unavailableJourney && pathname === '/explore/result';
  const isStory = !unavailableJourney && (pathname === '/story' || pathname.startsWith('/story/'));
  const isRoute = !unavailableJourney && pathname === '/route';
  const isSpot = !unavailableJourney && pathname.startsWith('/spot/');
  const isMogu = pathname === '/mogu' || pathname === '/discover';
  const isFavorites = pathname === '/my-route';
  const isMy = pathname === '/my';
  const isBadges = pathname === '/badges';
  const profilePreferences = (
    <DiscoveryFields locale={locale} options={options} value={preferences} onChange={updatePreferences} />
  );

  return (
    <main className="reference-app" data-locale={locale} data-pathname={pathname}>
      <div className="reference-phone">
        <SplashScreen
          active={isSplash}
          copy={copy}
          onStart={() => navigate('/food-profile')}
        />
        <FoodProfileConversation
          active={isProfileOnboarding}
          copy={copy}
          locale={locale}
          preferences={isProfileOnboarding ? profilePreferences : null}
          onProfileSaved={(name, profile) => {
            setNickname(name);
            setFoodProfile(profile);
          }}
          onRecommend={() => navigate('/home')}
          onSkipProfile={() => navigate('/mogu')}
          onBrowse={() => navigate('/mogu')}
        />
        <FoodProfileConversation
          active={isProfileEdit}
          copy={copy}
          initialName={nickname}
          key={`profile-edit-${nickname}-${editSessionId}`}
          locale={locale}
          mode="edit"
          preferences={isProfileEdit ? profilePreferences : null}
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
          onNavigate={navigate}
          onStartExploration={() => {
            setTripFilters(null);
            openExploration();
          }}
        />
        <ExplorationFlow
          active={isExplore}
          copy={copy}
          locale={locale}
          options={options}
          filters={filters}
          step={explorationStep}
          onChange={setTripFilters}
          onStep={setExplorationStep}
          onBackFromFirst={() => navigate(-1)}
          onComplete={() => navigate('/explore/result')}
        />
        <ResultScreen
          active={isResult}
          copy={copy}
          locale={locale}
          catalog={catalog}
          options={options}
          filters={filters}
          foodProfile={foodProfile}
          onRepeatSearch={openExploration}
          onClear={() => setTripFilters(emptyDiscoveryFilters)}
          onBrowse={() => navigate('/mogu')}
          onOpenJourney={openJourney}
        />
        <StoryScreen
          active={isStory}
          copy={copy}
          locale={locale}
          journey={shownJourney}
          record={publicationRecord}
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
          record={publicationRecord}
          key={routeJourney.id}
          saved={savedRouteIds.includes(routeJourney.routeId)}
          onBack={() => {
            navigate(
              fromMy
                ? '/my'
                : hasJourneyQuery && locationJourney
                  ? `/story/${locationJourney.storyId}`
                  : routeBack,
            );
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
          record={publicationRecord}
          saved={favorites.spotIds.includes(currentSpot.id)}
          onBack={() => navigate(
            hasJourneyQuery && locationJourney
              ? `/route${location.search}`
              : spotBack === '/route' && locationJourney
                ? `/route?candidateId=${encodeURIComponent(locationJourney.id)}`
                : spotBack,
          )}
          onOpenGuide={() => setToast(locale === 'ja' ? 'このスポットの公式最新情報リンクは現在用意されていません。' : locale === 'zh-TW' ? '目前尚未提供此景點的官方最新資訊連結。' : 'An official current-information link is not available for this spot yet.')}
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

        {unavailableJourney ? (
          <section className="reference-screen on" data-screen="journey-unavailable" data-screen-active="true">
            <header className="ghead">
              <button className="back" onClick={() => navigate('/mogu')} type="button" aria-label={copy.actions.back}>‹</button>
              <span>{copy.mogu.title}</span>
            </header>
            <div className="scroll simple-body">
              <div className="guide-box">
                <h1>{t('journeyUnavailableTitle')}</h1>
                <p>{t('journeyUnavailableBody')}</p>
                <Link to="/mogu" className="book">{t('journeyUnavailableBack')}</Link>
              </div>
            </div>
            <BottomNavigation active="mogu" copy={copy.nav} onNavigate={navigate} />
          </section>
        ) : null}

        {toast ? <div className="reference-toast" role="status">{toast}</div> : null}
      </div>
    </main>
  );
}
