import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AAA_ChallengeCard } from '../challenges/AAA_ChallengeCard';
import { HomeChallengeCloud } from '../StellarChallengeCloud';
import { StellarHub } from '../StellarHub';
import { CareerProgressInterface } from '../PathOfAscension';
import { RealisticEarthMap } from '../RealisticEarthMap';
import { ChallengeModal } from '../ChallengeModal';
import { BettingPage } from '../BettingPage';
import { BettingArena } from '../BettingArena';
import { MasonryGrid } from '../ui/masonry-grid';
import { 
  Sword, Map, Trophy, Home, Filter, Search, Grid, List, 
  TrendingUp, Clock, Users, Star, Zap, Target, Crown, Coins
} from 'lucide-react';
import { Button } from '../ui/button';

interface ChallengeArenaProps {
  currentView: string;
  activeTheme: any;
  userProgress: any;
  arenaChallenges: any[];
  onCreatePost: () => void;
  onCreateChallenge: () => void;
  onChallengeAccept: (id: string) => void;
  onChallengeSave: (id: string) => void;
  onChallengeInfo: (id: string) => void;
  onTokenEarn: (amount: number, type?: 'xp' | 'coins' | 'tokens') => void;
  onJobChange: (job: string) => void;
  onPlaceBet: (challengeId: string, side: 'yes' | 'no', amount: number) => void;
}

export const ChallengeArena: React.FC<ChallengeArenaProps> = ({
  currentView,
  activeTheme,
  userProgress,
  arenaChallenges,
  onCreatePost,
  onCreateChallenge,
  onChallengeAccept,
  onChallengeSave,
  onChallengeInfo,
  onTokenEarn,
  onJobChange,
  onPlaceBet
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'difficulty' | 'rewards'>('trending');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  
  // Challenge modal state
  const [modalChallenge, setModalChallenge] = useState<any>(null);
  
  // Map view state
  const [selectedMapChallenge, setSelectedMapChallenge] = useState<string | null>(null);
  const [mapSearchQuery, setMapSearchQuery] = useState<string>('');
  const [mapFilters, setMapFilters] = useState({ 
    difficulty: 'all', 
    category: 'all', 
    priceRange: 'all' 
  });

  // Challenge modal handlers
  const handleChallengeInfo = (challengeId: string) => {
    const challenge = arenaChallenges.find(c => c.id === challengeId);
    if (challenge) {
      setModalChallenge(challenge);
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    console.log('Joining challenge:', challengeId);
    onChallengeAccept?.(challengeId);
    setModalChallenge(null);
  };

  const handlePlaceBet = (challengeId: string, amount: number) => {
    console.log('Placing bet:', challengeId, amount);
    setModalChallenge(null);
  };

  // Filter and Sort Challenges
  const filteredChallenges = useMemo(() => {
    let filtered = [...arenaChallenges];

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(challenge => challenge.difficulty === filterDifficulty);
    }

    // Sort challenges
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => b.participants - a.participants);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'difficulty':
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4, legendary: 5 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'rewards':
        filtered.sort((a, b) => b.rewards.xp - a.rewards.xp);
        break;
    }

    return filtered;
  }, [arenaChallenges, filterDifficulty, sortBy]);

  // Render Arena View with AAA Challenge Cards
  const renderArenaView = () => (
    <div className="h-full bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 overflow-hidden">
      {/* Enhanced Header with Title Box */}
      <div className="relative p-6">
        <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-600/5" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Sword className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-black text-white mb-2">Epic Arena</h1>
                <p className="text-white/70 text-lg">Battle your way to legendary status</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{arenaChallenges.reduce((sum, c) => sum + c.participants, 0).toLocaleString()} Active Warriors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>{arenaChallenges.length} Epic Challenges</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>Your Rank: #{Math.floor(Math.random() * 1000) + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          {/* Sort Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1 overflow-x-auto">
            {[
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'recent', label: 'Recent', icon: Clock },
              { id: 'difficulty', label: 'Difficulty', icon: Target },
              { id: 'rewards', label: 'Rewards', icon: Star }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setSortBy(id as any)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  sortBy === id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'beginner', label: 'Beginner' },
              { id: 'intermediate', label: 'Intermediate' },
              { id: 'advanced', label: 'Advanced' },
              { id: 'expert', label: 'Expert' },
              { id: 'legendary', label: 'Legendary' }
            ].map(({ id, label }) => (
              <motion.button
                key={id}
                onClick={() => setFilterDifficulty(id)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  filterDifficulty === id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
          <motion.button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Grid className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

        </div>
      </div>

      {/* Main Content Area with Masonry Grid */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {viewMode === 'grid' ? (
            <MasonryGrid minColumnWidth={280} gap={16} className="mb-8">
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <AAA_ChallengeCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onAccept={onChallengeAccept}
                    onSave={onChallengeSave}
                    onViewDetails={handleChallengeInfo}
                    onCardClick={handleChallengeInfo}
                    variant="default"
                    showParticles={true}
                    uniformSize={false}
                    showThumbnail={true}
                  />
                </motion.div>
              ))}
            </MasonryGrid>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <AAA_ChallengeCard
                    challenge={challenge}
                    userProgress={userProgress}
                    onAccept={onChallengeAccept}
                    onSave={onChallengeSave}
                    onViewDetails={handleChallengeInfo}
                    onCardClick={handleChallengeInfo}
                    variant="featured"
                    showParticles={true}
                    uniformSize={true}
                    showThumbnail={true}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Challenge Modal */}
      {modalChallenge && (
        <ChallengeModal
          challenge={modalChallenge}
          isOpen={true}
          onClose={() => setModalChallenge(null)}
          onJoin={handleJoinChallenge}
          onBet={handlePlaceBet}
          thumbnail="/api/placeholder/600/300"
        />
      )}
    </div>
  );

  // Render different views based on currentView
  switch (currentView) {
    case 'home':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <StellarHub
            userProgress={userProgress}
            onChallengeAccept={onChallengeAccept}
            onChallengeSave={onChallengeSave}
            onChallengeInfo={onChallengeInfo}
          />
        </motion.div>
      );

    case 'arena':
      return renderArenaView();

    case 'map':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <RealisticEarthMap
            selectedChallenge={selectedMapChallenge}
            onChallengeSelect={(id) => {
              setSelectedMapChallenge(id);
              if (id) onChallengeInfo(id);
            }}
            searchQuery={mapSearchQuery}
            filters={mapFilters}
          />
        </motion.div>
      );

    case 'career':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CareerProgressInterface
            userProgress={userProgress}
            onJobChange={onJobChange}
            onTokenEarn={onTokenEarn}
          />
        </motion.div>
      );

    case 'betting':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BettingArena
            userTokens={{
              goldCoins: userProgress.coins || 0,
              bettingCredits: userProgress.bettingCredits || 100,
              winStreak: userProgress.winStreak || 0
            }}
            onTokenEarn={onTokenEarn}
            onBettingWin={() => {
              // Handle betting win logic
              console.log('Betting win!');
            }}
            winStreak={userProgress.winStreak || 0}
            membershipTier={userProgress.membershipTier || 'free'}
          />
        </motion.div>
      );

    case 'leaderboard':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-page-gradient"
        >
          <div className="container mx-auto page-x pt-2 pb-8 space-y-6 px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 px-2 md:px-4"
            >
              <div className="relative bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-fuchsia-600/5 to-purple-500/5" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-gradient-to-r from-amber-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Trophy className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h1 className="text-4xl font-black text-white mb-2">Tower of Legends</h1>
                      <p className="text-white/70 text-lg">Climb the ranks and become legendary</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-white/60">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>1,247 Active Warriors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-yellow-400" />
                      <span>Your Rank: #42</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-amber-400" />
                      <span>Season 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-4"
            >
              {/* Top 3 Leaders */}
              {[1, 2, 3].map((rank) => (
                <motion.div
                  key={rank}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: rank * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/60 via-indigo-800/40 to-purple-800/60 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' :
                      rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                      'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                    }`}>
                      {rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">Legendary Warrior {rank}</h3>
                      <p className="text-white/60 text-sm">Level {20 - rank * 2}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-yellow-400">{(10000 - rank * 1000).toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center px-2 md:px-4"
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-bold bg-slate-800/50 border-2 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 rounded-2xl transition-all duration-300"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Full Leaderboard
              </Button>
            </motion.div>
          </div>
        </motion.div>
      );

    default:
      return (
        <div className="flex items-center justify-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      );
  }
};