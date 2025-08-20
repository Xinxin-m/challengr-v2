// Career and Profession System Types
export interface Profession {
  id: string;
  name: string;
  category: 'academic' | 'creative' | 'technical' | 'business' | 'health' | 'trades' | 'sports' | 'arts';
  icon: string;
  description: string;
  color: string;
  gradient: string;
}

export interface CareerTier {
  id: string;
  name: string;
  level: number;
  requiredXP: number;
  requiredChallenges: number;
  rewards: {
    coins: number;
    tokens: number;
    equipment?: EquipmentItem[];
    skills?: string[];
    badges?: string[];
  };
  unlocks?: string[]; // IDs of next tier professions
}

export interface CareerPath {
  professionId: string;
  tiers: CareerTier[];
  totalTiers: number;
  masteryTitle: string; // e.g., "Number Theory Sage"
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'tool' | 'costume' | 'accessory' | 'badge';
  professionId: string;
  tier: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats: {
    xpBoost?: number;
    coinBoost?: number;
    skillBonus?: number;
    prestige?: number;
  };
  isNFT: boolean;
  marketValue?: number;
  description: string;
  image: string;
}

export interface UserProgress {
  userId: string;
  currentProfession: string;
  currentTier: number;
  totalXP: number;
  currentTierXP: number;
  completedChallenges: number;
  equippedItems: EquipmentItem[];
  unlockedProfessions: string[];
  masteredProfessions: string[];
  achievements: Achievement[];
  dailyCoins: number;
  lifetimeEarnings: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'progression' | 'challenge' | 'social' | 'special';
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  reward: {
    coins: number;
    tokens: number;
    equipment?: EquipmentItem;
    title?: string;
  };
  unlockedAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  professionId: string;
  tierRequirement: number;
  type: 'solo' | 'multiplayer' | 'tournament' | 'daily' | 'special';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  duration: number; // in minutes
  entryCost: number; // in coins
  rewards: {
    xp: number;
    coins: number;
    tokens?: number;
    equipment?: EquipmentItem[];
  };
  participants: number;
  maxParticipants?: number;
  status: 'open' | 'in-progress' | 'completed' | 'archived';
  createdBy: string;
  createdAt: Date;
  startTime?: Date;
  endTime?: Date;
  image: string;
  tags: string[];
  realWorldConnection?: {
    type: 'location' | 'activity' | 'skill-proof';
    description: string;
    verificationMethod: 'photo' | 'video' | 'ai-judge' | 'peer-review';
  };
}

export interface Arena {
  id: string;
  name: string;
  type: 'solo-arena' | 'multiplayer-lobby' | 'tournament-bracket' | 'ranked-match';
  professionId: string;
  challengeId: string;
  participants: ArenaParticipant[];
  maxParticipants: number;
  status: 'waiting' | 'active' | 'completed';
  entryFee: number;
  prizePool: {
    coins: number;
    tokens: number;
    equipment: EquipmentItem[];
  };
  startTime: Date;
  duration: number;
  leaderboard?: ArenaResult[];
}

export interface ArenaParticipant {
  userId: string;
  username: string;
  avatar: string;
  currentProfession: string;
  currentTier: number;
  powerLevel: number;
  equippedItems: EquipmentItem[];
  joinedAt: Date;
}

export interface ArenaResult {
  userId: string;
  username: string;
  score: number;
  rank: number;
  timeCompleted: number;
  reward: {
    coins: number;
    tokens: number;
    xp: number;
    equipment?: EquipmentItem;
  };
}

// AI Referee System
export interface AIJudgeRequest {
  challengeId: string;
  participants: {
    userId: string;
    submission: {
      type: 'photo' | 'video' | 'text' | 'code';
      content: string;
      timestamp: Date;
    };
  }[];
  judgingCriteria: {
    accuracy: number;
    creativity: number;
    technique: number;
    completion: number;
  };
}

export interface AIJudgeResult {
  requestId: string;
  results: {
    userId: string;
    scores: {
      accuracy: number;
      creativity: number;
      technique: number;
      completion: number;
      overall: number;
    };
    feedback: string;
    rank: number;
  }[];
  winnerUserId: string;
  confidence: number;
  reviewRequired: boolean;
}

// World Map Integration
export interface MapNode {
  id: string;
  coordinates: { lat: number; lng: number };
  type: 'solo-arena' | 'multiplayer-hub' | 'tournament-ground' | 'guild-hall' | 'marketplace';
  professionId?: string;
  activeArenas: Arena[];
  playerCount: number;
  difficultyLevel: number;
  rewards: {
    dailyBonus: number;
    rareDropChance: number;
  };
  realWorldLocation?: {
    city: string;
    landmark: string;
    culturalSignificance: string;
  };
}

export interface Guild {
  id: string;
  name: string;
  professionId: string;
  memberCount: number;
  level: number;
  description: string;
  requirements: {
    minTier: number;
    applicationRequired: boolean;
  };
  benefits: {
    xpBonus: number;
    coinBonus: number;
    exclusiveChallenges: boolean;
    guildEquipment: EquipmentItem[];
  };
  leaderboard: {
    userId: string;
    username: string;
    contribution: number;
    rank: number;
  }[];
}