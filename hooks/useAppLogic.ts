import { useState, useEffect } from 'react';
import { UserRPGProgress, GeneratedChallenge, Challenge } from '../config/rpg-system';
import { ThemeType } from '../styles/themes';
import { MOCK_CHALLENGES } from '../data/mockChallenges';
import { DEFAULT_USER_PROGRESS } from '../data/defaultUserProgress';

export function useAppLogic() {
  // Core application state
  const [currentView, setCurrentView] = useState('home');
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('mystic');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Game state
  const [gameMode, setGameMode] = useState<'solo' | 'multiplayer' | 'tournament'>('solo');
  const [showXPEffect, setShowXPEffect] = useState(false);
  const [showCoinEffect, setShowCoinEffect] = useState(false);
  const [showLevelUpEffect, setShowLevelUpEffect] = useState(false);
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  
  // Modal states
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showGameSettings, setShowGameSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // User state
  const [userProgress, setUserProgress] = useState<UserRPGProgress>(DEFAULT_USER_PROGRESS);
  const [membershipType, setMembershipType] = useState<'free' | 'premium' | 'legendary' | 'divine'>('premium');
  const [walletConnected, setWalletConnected] = useState(false);
  const [generationsRemaining, setGenerationsRemaining] = useState(25);
  const [arenaChallenges, setArenaChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);

  // Check for first-time users
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('challengr-onboarding-completed');
    if (!hasSeenOnboarding) {
      setIsFirstTime(true);
      setTimeout(() => setShowOnboarding(true), 2000);
    } else {
      setIsFirstTime(false);
    }
  }, []);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(false);
        setShowMobileSidebar(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme switching based on game mode
  useEffect(() => {
    switch (gameMode) {
      case 'tournament':
        setCurrentTheme('combat');
        break;
      case 'multiplayer':
        setCurrentTheme('zen');
        break;
      case 'solo':
        setCurrentTheme('mystic');
        break;
      default:
        setCurrentTheme('mystic');
    }
  }, [gameMode]);

  return {
    // State
    currentView,
    currentTheme,
    isMobile,
    sidebarCollapsed,
    showMobileSidebar,
    gameMode,
    showXPEffect,
    showCoinEffect,
    showLevelUpEffect,
    showOnboarding,
    isFirstTime,
    showProfile,
    showCreateChallenge,
    showCreatePost,
    showAI,
    showGameSettings,
    showNotifications,
    showWallet,
    searchQuery,
    showFilters,
    userProgress,
    membershipType,
    walletConnected,
    generationsRemaining,
    arenaChallenges,
    
    // Setters
    setCurrentView,
    setCurrentTheme,
    setIsMobile,
    setSidebarCollapsed,
    setShowMobileSidebar,
    setGameMode,
    setShowXPEffect,
    setShowCoinEffect,
    setShowLevelUpEffect,
    setShowOnboarding,
    setIsFirstTime,
    setShowProfile,
    setShowCreateChallenge,
    setShowCreatePost,
    setShowAI,
    setShowGameSettings,
    setShowNotifications,
    setShowWallet,
    setSearchQuery,
    setShowFilters,
    setUserProgress,
    setMembershipType,
    setWalletConnected,
    setGenerationsRemaining,
    setArenaChallenges,
  };
}