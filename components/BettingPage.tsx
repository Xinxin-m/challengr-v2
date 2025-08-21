import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BettingCard } from './BettingCard';
import { BettingModal } from './BettingModal';
import { mockBettingChallenges, BettingChallenge } from '../data/bettingData';
import { Filter, Search, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { PAGE_BACKGROUNDS } from '../styles/themes';

interface BettingPageProps {
  userCoins: number;
  onPlaceBet: (challengeId: string, side: 'yes' | 'no', amount: number) => void;
}

export function BettingPage({ userCoins, onPlaceBet }: BettingPageProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<BettingChallenge | null>(null);
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = ['all', 'food', 'coding', 'fitness', 'art', 'gaming'];
  const difficulties = ['all', 'easy', 'medium', 'hard', 'expert'];

  const filteredChallenges = mockBettingChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleBettingCardClick = (challenge: BettingChallenge) => {
    setSelectedChallenge(challenge);
    setShowBettingModal(true);
  };

  const handlePlaceBet = (challengeId: string, side: 'yes' | 'no', amount: number) => {
    onPlaceBet(challengeId, side, amount);
    setShowBettingModal(false);
    setSelectedChallenge(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍔';
      case 'coding': return '💻';
      case 'fitness': return '💪';
      case 'art': return '🎨';
      case 'gaming': return '🎮';
      default: return '🎯';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${PAGE_BACKGROUNDS.betting}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Betting Arena
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Place bets on exciting challenges and win coins
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Bets</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {mockBettingChallenges.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Participants</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {mockBettingChallenges.reduce((sum, c) => sum + c.participants.length, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🪙</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Pool</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {mockBettingChallenges.reduce((sum, c) => sum + c.totalPool, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🪙</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your Coins</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {userCoins.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search betting challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center space-x-1"
                  >
                    <span>{getCategoryIcon(category)}</span>
                    <span className="capitalize">{category}</span>
                  </Button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="capitalize"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Betting Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BettingCard
                challenge={challenge}
                onClick={() => handleBettingCardClick(challenge)}
                userCoins={userCoins}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No betting challenges found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>

      {/* Betting Modal */}
      <BettingModal
        challenge={selectedChallenge}
        isOpen={showBettingModal}
        onClose={() => {
          setShowBettingModal(false);
          setSelectedChallenge(null);
        }}
        onPlaceBet={handlePlaceBet}
        userCoins={userCoins}
      />
    </div>
  );
}
