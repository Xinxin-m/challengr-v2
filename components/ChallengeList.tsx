import React, { useState } from 'react';
import { ChallengeCard } from './ChallengeCard';
import { ChallengeModal } from './ChallengeModal';
import { MOCK_CHALLENGES } from '../data/mockChallenges';

interface ChallengeListProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
  userTokens: {
    goldCoins: number;
    platformTokens: number;
  };
}

export function ChallengeList({ selectedChallenge, onChallengeSelect, searchQuery, filters, userTokens }: ChallengeListProps) {
  const [modalChallenge, setModalChallenge] = useState<typeof MOCK_CHALLENGES[0] | null>(null);

  const filteredChallenges = MOCK_CHALLENGES.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filters.difficulty === 'all' || challenge.difficulty === filters.difficulty;
    const matchesCategory = filters.category === 'all' || challenge.category === filters.category;
    const matchesPriceRange = filters.priceRange === 'all' || 
      (filters.priceRange === 'free' && challenge.entryCost === 0) ||
      (filters.priceRange === 'low' && challenge.entryCost > 0 && challenge.entryCost <= 5) ||
      (filters.priceRange === 'medium' && challenge.entryCost > 5 && challenge.entryCost <= 15) ||
      (filters.priceRange === 'high' && challenge.entryCost > 15);
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesPriceRange;
  });

  const handleChallengeClick = (challenge: typeof MOCK_CHALLENGES[0]) => {
    setModalChallenge(challenge);
  };

  const handleJoinChallenge = (challengeId: string) => {
    console.log('Joining challenge:', challengeId);
    setModalChallenge(null);
  };

  const handlePlaceBet = (challengeId: string, amount: number) => {
    console.log('Placing bet:', challengeId, amount);
    setModalChallenge(null);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2">
            {filteredChallenges.length} Challenges Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover amazing challenges tailored to your interests
          </p>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => handleChallengeClick(challenge)}
              thumbnail="/api/placeholder/400/300"
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters to find more challenges
            </p>
          </div>
        )}
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
}