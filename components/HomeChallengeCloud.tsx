import React, { useMemo } from 'react';
import { StellarChallengeCloud } from './StellarChallengeCloud';
import { mockChallenges } from '../data/mockData';

interface HomeChallengeCloudProps {
  onChallengeSelect: (id: string | null) => void;
  userProgress?: any;
  onChallengeAccept?: (id: string) => void;
  onChallengeSave?: (id: string) => void;
  onChallengeInfo?: (id: string) => void;
}

// Map existing mockChallenges to challenge shape
function mapToChallenge(ch: any): any {
  return {
    id: ch.id,
    title: ch.title,
    description: ch.description,
    difficulty: ch.difficulty,
    participants: ch.participants,
    thumbnail: ch.image, // optional thumbnail support
    type: ch.type || 'challenge',
    category: ch.category || 'general',
    entryCost: ch.entryCost || 0,
    rewards: ch.rewards || { xp: 100 },
    timeLimit: ch.timeLimit || 60,
  };
}

export const HomeChallengeCloud: React.FC<HomeChallengeCloudProps> = ({ 
  onChallengeSelect,
  userProgress,
  onChallengeAccept,
  onChallengeSave,
  onChallengeInfo 
}) => {
  const items = useMemo(() => {
    const mapped = mockChallenges.map(mapToChallenge);
    // Force some items to be image-less to meet the requirement
    return mapped.map((c, i) => (i % 3 === 0 ? { ...c, thumbnail: undefined } : c));
  }, []);
  return (
    <div className="px-4 py-8">
      <StellarChallengeCloud
        challenges={items}
        onSelect={(id) => onChallengeSelect(id)}
        userProgress={userProgress}
        onChallengeAccept={onChallengeAccept}
        onChallengeSave={onChallengeSave}
        onChallengeInfo={onChallengeInfo}
      />
    </div>
  );
};


