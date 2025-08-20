import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Sparkles } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { Sidebar } from './components/Sidebar';
import { XuanhuanGameHeader } from './components/layout/XuanhuanGameHeader';
import { XuanhuanMobileNavigation } from './components/layout/XuanhuanMobileNavigation';
import { RPGCharacterProfile } from './components/RPGCharacterProfile';
import { OnboardingGuide } from './components/OnboardingGuide';
import { ParticleSystem, XPGainEffect, CoinCollectEffect, LevelUpEffect } from './components/effects/ParticleSystem';
import { ChallengrAI } from './components/ChallengrAI';
import { ChallengeArena } from './components/app/ChallengeArena';
import { CreateChallengeModal } from './components/create/CreateChallengeModal';
import { ModernCreatePostModal } from './components/CreatePostModal';
import { useAppLogic } from './hooks/useAppLogic';
import { useAppHandlers } from './hooks/useAppHandlers';
import { AAA_THEMES } from './styles/themes';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const appState = useAppLogic();
  const handlers = useAppHandlers({
    userProgress: appState.userProgress,
    arenaChallenges: appState.arenaChallenges,
    setUserProgress: appState.setUserProgress,
    setArenaChallenges: appState.setArenaChallenges,
    setShowCoinEffect: appState.setShowCoinEffect,
    setShowXPEffect: appState.setShowXPEffect,
    setShowLevelUpEffect: appState.setShowLevelUpEffect,
    setGameMode: appState.setGameMode,
    setShowOnboarding: appState.setShowOnboarding,
    setIsFirstTime: appState.setIsFirstTime,
  });

  const activeTheme = AAA_THEMES[appState.currentTheme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${activeTheme.background} text-foreground overflow-hidden relative`}>
      {/* 增强修真粒子背景 */}
      <ParticleSystem
        config={{
          count: 30,
          lifetime: 12000,
          size: { min: 1, max: 6 },
          speed: { min: 2, max: 12 },
          color: [activeTheme.accent, activeTheme.secondary, '#ffd70080', '#ff6b3580'],
          opacity: { start: 0.6, end: 0 },
          shape: 'circle',
          gravity: -0.02,
          wind: 0.008,
          emission: 'continuous',
          blendMode: 'screen',
        }}
        trigger={true}
        intensity="medium"
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* 桌面端修真侧边栏 */}
      {!appState.isMobile && (
        <motion.div 
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          className="onboarding-sidebar relative z-50"
        >
          <Sidebar
            currentView={appState.currentView}
            onViewChange={(view) => {
              console.log('🌟 修真界域切换:', view);
              appState.setCurrentView(view);
            }}
            userProgress={appState.userProgress}
            onCreateChallenge={() => appState.setShowCreateChallenge(true)}
            onCreatePost={() => appState.setShowCreatePost(true)}
            onOpenProfile={() => appState.setShowProfile(true)}
            onOpenNotifications={() => console.log('📜 修真传音符箓')}
            onOpenAI={() => appState.setShowAI(true)}
            onOpenWallet={() => console.log('💎 储物戒指')}
            isCollapsed={appState.sidebarCollapsed}
            onToggleCollapse={() => {
              console.log('🔄 侧边栏收缩状态切换:', !appState.sidebarCollapsed);
              appState.setSidebarCollapsed(!appState.sidebarCollapsed);
            }}
            notificationCount={0}
            walletConnected={appState.walletConnected}
            generationsRemaining={appState.generationsRemaining}
          />
        </motion.div>
      )}

      {/* 修真学院头部 - positioned after sidebar to be pushed by it */}
      <XuanhuanGameHeader
        isMobile={appState.isMobile}
        sidebarCollapsed={appState.sidebarCollapsed}
        userProgress={appState.userProgress}
        currentView={appState.currentView}
        searchQuery={appState.searchQuery}
        setSearchQuery={appState.setSearchQuery}
        showFilters={appState.showFilters}
        setShowFilters={appState.setShowFilters}
        setShowGameSettings={appState.setShowGameSettings}
        onToggleSidebar={() => {
          console.log('🔄 侧边栏收缩状态切换:', !appState.sidebarCollapsed);
          appState.setSidebarCollapsed(!appState.sidebarCollapsed);
        }}
        onOpenNotifications={() => console.log('📜 修真传音符箓')}
        onOpenWallet={() => console.log('💎 储物戒指')}
        walletConnected={appState.walletConnected}
      />

      {/* 主内容区域 - removed container box, simplified layout */}
      <div className={`transition-all duration-300 ease-out ${
        !appState.isMobile ? (appState.sidebarCollapsed ? 'ml-16' : 'ml-80') : ''
      } ${!appState.isMobile ? 'pt-16' : 'pt-16'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={appState.currentView}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <ChallengeArena
              currentView={appState.currentView}
              activeTheme={activeTheme}
              userProgress={appState.userProgress}
              arenaChallenges={appState.arenaChallenges}
              onCreatePost={() => appState.setShowCreatePost(true)}
              onCreateChallenge={() => appState.setShowCreateChallenge(true)}
              onChallengeAccept={handlers.handleChallengeAccept}
              onChallengeSave={handlers.handleChallengeSave}
              onChallengeInfo={handlers.handleChallengeInfo}
                          onTokenEarn={handlers.handleTokenEarn}
            onJobChange={handlers.handleJobChange}
            onPlaceBet={handlers.handlePlaceBet}
            />
          </motion.div>
        </AnimatePresence>
        {appState.isMobile && <div className="h-24"></div>}
      </div>

      {/* 修真移动端导航 */}
      {appState.isMobile && (
        <XuanhuanMobileNavigation
          currentView={appState.currentView}
          setCurrentView={appState.setCurrentView}
          setShowCreateChallenge={appState.setShowCreateChallenge}
        />
      )}

      {/* 增强全局修真效果 */}
      <AnimatePresence>
        {appState.showXPEffect && (
          <XPGainEffect 
            trigger={appState.showXPEffect} 
            position={{ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300 }}
          />
        )}

        {appState.showCoinEffect && (
          <CoinCollectEffect 
            trigger={appState.showCoinEffect} 
            position={{ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300 }}
          />
        )}

        {appState.showLevelUpEffect && (
          <LevelUpEffect 
            trigger={appState.showLevelUpEffect} 
            position={{ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300 }}
          />
        )}
      </AnimatePresence>

      {/* 修真模态系统 */}
      <AnimatePresence>
        {/* 修真引导 */}
        {appState.showOnboarding && (
          <OnboardingGuide
            isOpen={appState.showOnboarding}
            onComplete={handlers.handleOnboardingComplete}
            onSkip={handlers.handleOnboardingSkip}
            isMobile={appState.isMobile}
          />
        )}

        {/* 修真者档案 */}
        {appState.showProfile && (
          <RPGCharacterProfile
            userProgress={appState.userProgress}
            isOpen={appState.showProfile}
            onClose={() => appState.setShowProfile(false)}
            onSave={(updates) => {
              appState.setUserProgress(prev => ({ ...prev, ...updates }));
              console.log('Profile updated');
            }}
            membershipType={appState.membershipType}
          />
        )}

        {/* 天机算卦 */}
        {appState.showAI && (
          <div className="onboarding-ai">
            <ChallengrAI
              userProgress={appState.userProgress}
              onChallengeGenerated={handlers.handleChallengeGenerated}
              onChallengeStart={handlers.handleChallengeStart}
              generationsRemaining={appState.generationsRemaining}
              onGenerationUsed={() => appState.setGenerationsRemaining(prev => Math.max(0, prev - 1))}
              isOpen={appState.showAI}
              onClose={() => appState.setShowAI(false)}
            />
          </div>
        )}

        {/* Create Challenge Modal */}
        <CreateChallengeModal
          isOpen={appState.showCreateChallenge}
          onClose={() => appState.setShowCreateChallenge(false)}
          onSubmit={(challengeData) => {
            console.log('Challenge created:', challengeData);
            appState.setShowCreateChallenge(false);
          }}
          userProgress={appState.userProgress}
        />

        {/* Create Post Modal */}
        {appState.showCreatePost && (
          <ModernCreatePostModal
            isOpen={appState.showCreatePost}
            onClose={() => appState.setShowCreatePost(false)}
            onSubmit={(postData) => {
              console.log('Post created:', postData);
              appState.setShowCreatePost(false);
            }}
            userLevel={appState.userProgress.level}
          />
        )}

        {/* 修真欢迎模态 */}
        {appState.isFirstTime && !appState.showOnboarding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            className="fixed top-24 right-8 z-40 max-w-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 rounded-3xl blur-2xl" />
            
            <div className="relative bg-gradient-to-br from-slate-900/98 via-indigo-900/95 to-slate-900/98 border border-cyan-400/40 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center space-x-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-14 h-14 bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                  <Sparkles className="w-7 h-7 text-white relative z-10" />
                </motion.div>
                <div>
                  <h4 className="text-xl font-black text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    欢迎，修真者！
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-xs text-cyan-400 font-medium">系统就绪</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 mb-6 leading-relaxed">
                您的修真之路即将开始！准备好探索这个最先进的修真学院平台了吗？
              </p>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => appState.setShowOnboarding(true)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 text-white py-3 rounded-2xl font-black shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                  <span className="relative z-10">开始修真</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => appState.setIsFirstTime(false)}
                  className="px-6 py-3 border-2 border-cyan-400/60 text-cyan-400 rounded-2xl font-bold hover:bg-cyan-500/10 transition-all duration-300"
                >
                  稍后
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}