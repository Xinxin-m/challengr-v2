import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AAA_ChallengeCard } from './challenges/AAA_ChallengeCard';
import { BettingCard } from './challenges/BettingCard';
import { BattleCard } from './challenges/BattleCard';
import { ProfileCard } from './ProfileCard';
import { PostCard } from './PostCard';
import { ChallengeModal } from './ChallengeModal';
import { MOCK_CHALLENGES, MOCK_SINGLE_CHALLENGES, MOCK_DOUBLE_CHALLENGES } from '../data/mockChallenges';
import { MOCK_POSTS } from '../data/mockPosts';
import { MOCK_USERS } from '../data/mockUsers';
import { 
  Flame, Sparkles, Gift, Navigation, Users, 
  ChevronLeft, ChevronRight, Trophy, Zap, Target, Shield, Sword
} from 'lucide-react';
import { Button } from './ui/button';

interface StellarHubProps {
  userProgress: any;
  onChallengeAccept: (id: string) => void;
  onChallengeSave: (id: string) => void;
  onChallengeInfo: (id: string) => void;
}

export const StellarHub: React.FC<StellarHubProps> = ({
  userProgress,
  onChallengeAccept,
  onChallengeSave,
  onChallengeInfo
}) => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  const [userScrollIndex, setUserScrollIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    trending: false,
    new: false,
    free: false,
    betting: false,
    battle: false,
    nearby: false
  });
  
  // Modal state management
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  // Filter challenges by category for different sections
  const allTrendingChallenges = useMemo(() => 
    MOCK_CHALLENGES.filter(c => c.participants > 100), 
    []
  );
  const trendingChallenges = useMemo(() => 
    expandedSections.trending ? allTrendingChallenges : allTrendingChallenges.slice(0, 4), 
    [expandedSections.trending, allTrendingChallenges]
  );

  const allNewChallenges = useMemo(() => 
    MOCK_CHALLENGES.filter(c => 
      new Date().getTime() - c.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
    ), 
    []
  );
  const newChallenges = useMemo(() => 
    expandedSections.new ? allNewChallenges : allNewChallenges.slice(0, 4), 
    [expandedSections.new, allNewChallenges]
  );

  const allFreeChallenges = useMemo(() => 
    MOCK_CHALLENGES.filter(c => c.entryCost === 0), 
    []
  );
  const freeChallenges = useMemo(() => 
    expandedSections.free ? allFreeChallenges : allFreeChallenges.slice(0, 4), 
    [expandedSections.free, allFreeChallenges]
  );

  const allBettingChallenges = useMemo(() => 
    MOCK_SINGLE_CHALLENGES.filter(c => c.status === 'active'), 
    []
  );
  const bettingChallenges = useMemo(() => 
    expandedSections.betting ? allBettingChallenges : allBettingChallenges.slice(0, 4), 
    [expandedSections.betting, allBettingChallenges]
  );

  const allBattleChallenges = useMemo(() => 
    MOCK_DOUBLE_CHALLENGES.filter(c => c.status === 'upcoming' || c.status === 'active'), 
    []
  );
  const battleChallenges = useMemo(() => 
    expandedSections.battle ? allBattleChallenges : allBattleChallenges.slice(0, 4), 
    [expandedSections.battle, allBattleChallenges]
  );

  const allNearbyChallenges = useMemo(() => 
    MOCK_CHALLENGES.filter(c => c.location?.type === 'physical'), 
    []
  );
  const nearbyChallenges = useMemo(() => 
    expandedSections.nearby ? allNearbyChallenges : allNearbyChallenges.slice(0, 4), 
    [expandedSections.nearby, allNearbyChallenges]
  );

  const recommendedUsers = useMemo(() => 
    MOCK_USERS.slice(0, 6), 
    []
  );

  const followingPosts = useMemo(() => 
    MOCK_POSTS.slice(0, 8), 
    []
  );

  const handleUserScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setUserScrollIndex(prev => Math.max(0, prev - 1));
    } else {
      setUserScrollIndex(prev => Math.min(Math.ceil(recommendedUsers.length / 3) - 1, prev + 1));
    }
  };

  const handleBetYes = (id: string, amount: number) => {
    console.log('Bet Yes placed:', id, amount);
    // TODO: Implement betting logic
  };

  const handleBetNo = (id: string, amount: number) => {
    console.log('Bet No placed:', id, amount);
    // TODO: Implement betting logic
  };

  const handleBetBlue = (id: string, amount: number) => {
    console.log('Bet Blue placed:', id, amount);
    // TODO: Implement betting logic
  };

  const handleBetRed = (id: string, amount: number) => {
    console.log('Bet Red placed:', id, amount);
    // TODO: Implement betting logic
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Modal handlers
  const handleChallengeClick = (challengeId: string) => {
    const challenge = MOCK_CHALLENGES.find(c => c.id === challengeId) || 
                     MOCK_SINGLE_CHALLENGES.find(c => c.id === challengeId) ||
                     MOCK_DOUBLE_CHALLENGES.find(c => c.id === challengeId);
    if (challenge) {
      setSelectedChallenge(challenge);
    }
  };

  const handleCloseModal = () => {
    setSelectedChallenge(null);
  };

  const handleJoinChallenge = (challengeId: string) => {
    onChallengeAccept?.(challengeId);
    setSelectedChallenge(null);
  };

  const renderForYouPanel = () => (
    <div className="space-y-6">
      {/* Trending Section */}
      <section>
        <motion.div 
          className="flex items-center space-x-3 mb-6 cursor-pointer select-none group"
          onClick={() => toggleSection('trending')}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/40 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Flame className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
            Trending
          </h2>
        </motion.div>
        <div className="relative">
          {/* Cards displayed directly on background - no scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {trendingChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <AAA_ChallengeCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onAccept={onChallengeAccept}
                    onSave={onChallengeSave}
                    onViewDetails={onChallengeInfo}
                    onCardClick={handleChallengeClick}
                    variant="default"
                    showParticles={true}
                    uniformSize={false}
                    showThumbnail={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* New Section */}
      <section>
        <motion.div 
          className="flex items-center space-x-3 mb-6 cursor-pointer select-none group"
          onClick={() => toggleSection('new')}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Sparkles className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            New
          </h2>
        </motion.div>
        <div className="relative">
          {/* Cards displayed directly on background - no scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {newChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <AAA_ChallengeCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onAccept={onChallengeAccept}
                    onSave={onChallengeSave}
                    onViewDetails={onChallengeInfo}
                    onCardClick={handleChallengeClick}
                    variant="default"
                    showParticles={true}
                    uniformSize={false}
                    showThumbnail={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Free Section */}
      <section>
        <motion.div 
          className="flex items-center space-x-3 mb-6 cursor-pointer select-none group"
          onClick={() => toggleSection('free')}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/40 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Gift className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
            Free
          </h2>
        </motion.div>
        <div className="relative">
          {/* Cards displayed directly on background - no scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {freeChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <AAA_ChallengeCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onAccept={onChallengeAccept}
                    onSave={onChallengeSave}
                    onViewDetails={onChallengeInfo}
                    onCardClick={handleChallengeClick}
                    variant="default"
                    showParticles={true}
                    uniformSize={false}
                    showThumbnail={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Betting Section */}
      <section>
        <motion.div 
          className="flex items-center space-x-3 mb-6 cursor-pointer select-none group"
          onClick={() => toggleSection('betting')}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/40 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Target className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
            Betting
          </h2>
        </motion.div>
        <div className="relative">
          {/* Cards displayed directly on background - no scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {bettingChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <BettingCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onBetYes={handleBetYes}
                    onBetNo={handleBetNo}
                    onSave={onChallengeSave}
                    onShare={(id) => console.log('Share:', id)}
                    onCardClick={handleChallengeClick}
                    variant="default"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Battle Section */}
      <section>
        <motion.div 
          className="flex items-center space-x-3 mb-6 cursor-pointer select-none group"
          onClick={() => toggleSection('battle')}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/40 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Sword className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
            Battles
          </h2>
        </motion.div>
        <div className="relative">
          {/* Cards displayed directly on background - no scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {battleChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <BattleCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onBetBlue={handleBetBlue}
                    onBetRed={handleBetRed}
                    onSave={onChallengeSave}
                    onShare={(id) => console.log('Share:', id)}
                    onCardClick={handleChallengeClick}
                    variant="default"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Nearby Section */}
      <section>
        <motion.div 
          className="flex items-center space-x-3 mb-6 cursor-pointer select-none group"
          onClick={() => toggleSection('nearby')}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Navigation className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
            Nearby
          </h2>
        </motion.div>
        <div className="relative">
          {/* Cards displayed directly on background - no scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {nearbyChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <AAA_ChallengeCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onAccept={onChallengeAccept}
                    onSave={onChallengeSave}
                    onViewDetails={onChallengeInfo}
                    onCardClick={handleChallengeClick}
                    variant="default"
                    showParticles={true}
                    uniformSize={false}
                    showThumbnail={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Challengers You Might Know Section */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Challengers You Might Know</h2>
        </div>
        
        <div className="relative">
          {/* Scroll Controls */}
          {userScrollIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleUserScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}
          
          {userScrollIndex < Math.ceil(recommendedUsers.length / 3) - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleUserScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}

          {/* Users Grid */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-3 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${userScrollIndex * (3 * 384 + 2 * 24)}px)`
              }}
            >
              {recommendedUsers.map((user) => (
                <div key={user.id} className="flex-shrink-0">
                  <ProfileCard
                    user={user}
                    onClick={(id) => console.log('Profile clicked:', id)}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderFollowingPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Following</h2>
      </div>

      {/* Masonry Grid of Posts */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 space-y-6">
        {followingPosts.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-6">
            <PostCard
              post={post}
              onClick={(id) => console.log('Post clicked:', id)}
              onUpvote={(id) => console.log('Upvote:', id)}
              onSave={(id) => console.log('Save:', id)}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-12">
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-4 text-lg font-bold bg-slate-800/50 border-2 border-pink-400/30 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 rounded-2xl transition-all duration-300"
        >
          <Zap className="w-5 h-5 mr-2" />
          Load More Updates
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Container with responsive padding matching ChallengeArena */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
          <div className="relative bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-4 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-600/5" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Trophy className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-black text-white mb-2">Stellar Hub</h1>
                <p className="text-white/70 text-lg">Your Personal Command Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>11 Live Adventures</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Active Challenges: {MOCK_CHALLENGES.length}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

        {/* Toggle Tabs - Centered with consistent height */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center mb-6 sm:mb-8 px-2"
        >
        <div className="flex items-center space-x-1 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
          <motion.button
            onClick={() => setActiveTab('forYou')}
            className={`flex items-center justify-center px-6 py-3 h-12 rounded-xl transition-all duration-200 text-sm font-medium ${
              activeTab === 'forYou'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span>For You</span>
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTab('following')}
            className={`flex items-center justify-center px-6 py-3 h-12 rounded-xl transition-all duration-200 text-sm font-medium ${
              activeTab === 'following'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span>Following</span>
          </motion.button>
        </div>
      </motion.div>

        {/* Content Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'forYou' ? renderForYouPanel() : renderFollowingPanel()}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* Challenge Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          isOpen={true}
          onClose={handleCloseModal}
          onJoin={handleJoinChallenge}
          onBet={(challengeId, amount) => {
            console.log('Bet placed:', challengeId, amount);
            handleCloseModal();
          }}
          thumbnail={selectedChallenge.thumbnail}
        />
      )}
    </div>
  );
};
