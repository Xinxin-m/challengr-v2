import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { AAA_ChallengeCard } from './challenges/AAA_ChallengeCard';
import { mockChallenges } from '../data/mockData';

interface StellarChallengeCloudProps {
  challenges: any[];
  onSelect?: (id: string) => void;
  userProgress?: any;
  onChallengeAccept?: (id: string) => void;
  onChallengeSave?: (id: string) => void;
  onChallengeInfo?: (id: string) => void;
}

interface HomeChallengeCloudProps {
  onChallengeSelect: (id: string | null) => void;
  userProgress?: any;
  onChallengeAccept?: (id: string) => void;
  onChallengeSave?: (id: string) => void;
  onChallengeInfo?: (id: string) => void;
}

// Utility: map popularity -> size scale
function popularityToScale(popularity?: number) {
  const p = Math.max(0, Math.min(popularity ?? 0.3, 1));
  return 0.7 + p * 0.9; // 0.7x to 1.6x
}

// Utility: choose variant based on popularity
function pickVariant(ch: any): 'default' | 'compact' | 'featured' {
  const p = ch.popularity ?? 0.3;
  if (p > 0.7) return 'featured';
  if (p < 0.4) return 'compact';
  return 'default';
}

// Generate pseudo-random but stable position ring for each item (gravity to center look)
function radialLayout(
  items: any[],
  width: number,
  height: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radiusBase = Math.min(width, height) * 0.12; // inner cluster radius
  const radiusJitter = Math.min(width, height) * 0.35; // spread

  return items.map((item, idx) => {
    // deterministic seed from id
    const seed = Array.from(item.id).reduce((acc, c) => acc + c.charCodeAt(0), 0) + idx * 97;
    const rand = (n: number) => {
      const x = Math.sin(seed + n) * 43758.5453;
      return x - Math.floor(x);
    };

    // angle clusters toward center with some randomness
    const angle = rand(1) * Math.PI * 2;
    const gravPull = 0.35 + (item.popularity ?? 0.3) * 0.4; // more popular closer to center
    const r = radiusBase * gravPull + rand(2) * radiusJitter * (1 - gravPull);

    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    const rotate = (rand(3) - 0.5) * 18; // slight tilt

    return { x, y, rotate };
  });
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

export const StellarChallengeCloud: React.FC<StellarChallengeCloudProps> = ({
  challenges,
  onSelect,
  userProgress = { dailyCoins: 100 },
  onChallengeAccept,
  onChallengeSave,
  onChallengeInfo,
}) => {
  // canvas size
  const width = 1200;
  const height = 900;

  // enrich challenges with popularity if missing
  const items = useMemo(() => {
    const maxParticipants = Math.max(
      1,
      ...challenges.map((c) => c.participants ?? 0)
    );
    return challenges.map((c) => ({
      ...c,
      popularity:
        typeof c.popularity === 'number'
          ? c.popularity
          : (c.participants ?? 0) / maxParticipants,
    }));
  }, [challenges]);

  const positions = useMemo(() => radialLayout(items, width, height), [items]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative"
        style={{ width, height }}
      >
        {items.map((ch, i) => {
          const pos = positions[i];
          const scale = popularityToScale(ch.popularity);
          const variant = pickVariant(ch);

          return (
            <motion.div
              key={ch.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0.8, x: pos.x, y: pos.y, rotate: pos.rotate }}
              animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y, rotate: pos.rotate }}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: i * 0.03 }}
              style={{ transformOrigin: 'center center' }}
            >
              <AAA_ChallengeCard
                challenge={ch}
                userProgress={userProgress}
                onAccept={onChallengeAccept}
                onSave={onChallengeSave}
                onViewDetails={onChallengeInfo}
                onCardClick={onSelect}
                variant={variant}
                showParticles={true}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

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


