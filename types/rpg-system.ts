// Core RPG System Types
export type ProfessionTier = 'apprentice' | 'journeyman' | 'expert' | 'grandmaster' | 'ascended';

export interface RPGClass {
  id: string;
  name: string;
  displayName: string;
  category: 'academic' | 'creative' | 'technical' | 'business' | 'health' | 'trades' | 'arts' | 'social';
  icon: string;
  description: string;
  lore: string; // Background story for immersion
  baseStats: ClassStats;
  unlockRequirements: UnlockRequirement[];
  tierProgression: TierData[];
  masteryRewards: MasteryReward[];
  uniqueAbilities: string[];
  colorTheme: {
    primary: string;
    secondary: string;
    gradient: string;
    glow: string;
  };
}

export interface ClassStats {
  intelligence: number;
  creativity: number;
  technical: number;
  social: number;
  physical: number;
  business: number;
}

export interface TierData {
  tier: ProfessionTier;
  level: number;
  title: string;
  description: string;
  requiredXP: number;
  requiredChallenges: number;
  requiredAchievements: string[];
  unlockQuests: Quest[];
  rewards: TierRewards;
  abilities: string[];
  statusEffects: StatusEffect[];
  ascensionTrials?: AscensionTrial[]; // For grandmaster -> ascended
}

export interface TierRewards {
  coins: number;
  tokens: number;
  equipment: Equipment[];
  titles: string[];
  badges: string[];
  skillPoints: number;
  unlockClasses: string[];
  specialAbilities: string[];
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'tool' | 'costume' | 'mount';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'celestial';
  classRestriction?: string;
  tierRequirement: number;
  stats: EquipmentStats;
  abilities: string[];
  setBonus?: SetBonus;
  isNFT: boolean;
  marketValue: number;
  appearance: {
    image: string;
    model3D?: string;
    animation?: string;
  };
  enchantments: Enchantment[];
  socket: Socket[];
}

export interface EquipmentStats {
  xpBoost: number;
  coinBoost: number;
  skillBonus: number;
  prestige: number;
  intelligence: number;
  creativity: number;
  technical: number;
  social: number;
  criticalChance: number;
  luckyDropChance: number;
}

export interface UserRPGProgress {
  userId: string;
  currentClass: string;
  currentTier: ProfessionTier;
  level: number;
  totalXP: number;
  currentTierXP: number;
  stats: ClassStats;
  unlockedClasses: string[];
  masteredClasses: MasteredClass[];
  equippedGear: EquippedGear;
  inventory: Equipment[];
  achievements: Achievement[];
  quests: Quest[];
  titles: string[];
  currentTitle: string;
  guilds: string[];
  reputation: Reputation[];
  ascensionLevel: number; // For post-grandmaster progression
  divinePoints: number; // Special currency for ascended
  cosmetics: Cosmetic[];
  mounts: Mount[];
  pets: Pet[];
  dailyCoins: number; // Daily challenge currency
}

export interface MasteredClass {
  classId: string;
  masteryLevel: number;
  dateAchieved: Date;
  specialBonuses: string[];
}

export interface EquippedGear {
  [key: string]: Equipment | string | undefined;
  helmet?: Equipment | string;
  armor?: Equipment | string;
  weapon?: Equipment | string;
  accessory?: Equipment | string;
  boots?: Equipment | string;
  tool?: Equipment | string;
  costume?: Equipment | string;
  mount?: Equipment | string;
  pet?: Equipment | string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'side' | 'daily' | 'weekly' | 'legendary' | 'ascension';
  difficulty: 'trivial' | 'easy' | 'normal' | 'hard' | 'extreme' | 'nightmare';
  requirements: QuestRequirement[];
  objectives: QuestObjective[];
  rewards: QuestRewards;
  timeLimit?: number;
  isRepeatable: boolean;
  status: 'available' | 'active' | 'completed' | 'failed' | 'locked';
  progress: number;
}

export interface AscensionTrial {
  id: string;
  name: string;
  description: string;
  type: 'solo' | 'team' | 'guild' | 'global';
  requirements: string[];
  challenges: Challenge[];
  rewards: AscensionReward[];
  difficulty: 'mortal' | 'immortal' | 'divine' | 'transcendent';
  timeWindow?: {
    start: Date;
    end: Date;
  };
}

export interface ChallengrAI {
  generateChallenge(params: ChallengeGenerationParams): Promise<GeneratedChallenge>;
  adaptDifficulty(userProgress: UserRPGProgress, baseChallenge: Challenge): Challenge;
  createQuestChain(classId: string, tier: ProfessionTier): Quest[];
  generateAscensionTrial(classId: string): AscensionTrial;
  evolveChallenge(challengeId: string, userFeedback: UserFeedback): Challenge;
}

export interface ChallengeGenerationParams {
  classId: string;
  tier: ProfessionTier;
  userLevel: number;
  preferredType: 'knowledge' | 'skill' | 'creative' | 'practical' | 'mixed';
  realWorldIntegration: boolean;
  difficultyPreference: 'easy' | 'medium' | 'hard' | 'adaptive';
  timeConstraint?: number;
  collaborativeMode: boolean;
  aiJudging: boolean;
  customCriteria?: string;
}

export interface GeneratedChallenge {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  successCriteria: SuccessCriteria;
  estimatedDuration: number;
  difficulty: string;
  entryFee: number;
  rewards: ChallengeRewards;
  realWorldComponent?: RealWorldComponent;
  aiJudging: AIJudgingConfig;
  variations: ChallengeVariation[];
  adaptabilityLevel: number;
}

export interface SuccessCriteria {
  type: 'submission' | 'performance' | 'completion' | 'competitive';
  metrics: SuccessMetric[];
  passingThreshold: number;
  bonusThresholds: number[];
}

export interface SuccessMetric {
  name: string;
  weight: number;
  measurementType: 'score' | 'time' | 'accuracy' | 'creativity' | 'complexity';
  minValue: number;
  maxValue: number;
}

export interface AIJudgingConfig {
  enabled: boolean;
  judgingCriteria: {
    technical: number;
    creativity: number;
    presentation: number;
    innovation: number;
    practicality: number;
  };
  submissionTypes: ('text' | 'image' | 'video' | 'code' | 'audio' | 'document')[];
  humanReviewRequired: boolean;
  confidenceThreshold: number;
}

export interface RealWorldComponent {
  type: 'location' | 'activity' | 'social' | 'creation' | 'research';
  description: string;
  verificationMethod: 'photo' | 'video' | 'location' | 'social-proof' | 'submission';
  geoRequirement?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  timeWindow?: {
    start: Date;
    end: Date;
  };
  collaborators?: number;
}

// Class Progression Paths (360 careers)
export const CLASS_CATEGORIES = {
  ACADEMIC: [
    'mathematics', 'physics', 'chemistry', 'biology', 'literature', 'history',
    'philosophy', 'psychology', 'sociology', 'anthropology', 'archaeology',
    'linguistics', 'economics', 'political-science', 'geography', 'astronomy'
  ],
  CREATIVE: [
    'graphic-design', 'fashion-design', 'interior-design', 'architecture',
    'photography', 'videography', 'music-composition', 'music-performance',
    'creative-writing', 'poetry', 'painting', 'sculpture', 'digital-art',
    'animation', 'game-design', 'film-making'
  ],
  TECHNICAL: [
    'software-engineering', 'web-development', 'mobile-development',
    'ai-engineering', 'data-science', 'cybersecurity', 'devops',
    'blockchain-development', 'robotics', 'electronics', 'mechanical-engineering',
    'civil-engineering', 'aerospace-engineering', 'biomedical-engineering'
  ],
  BUSINESS: [
    'entrepreneurship', 'marketing', 'sales', 'finance', 'accounting',
    'project-management', 'consulting', 'real-estate', 'investment',
    'e-commerce', 'logistics', 'human-resources', 'operations', 'strategy'
  ],
  HEALTH: [
    'medicine', 'nursing', 'dentistry', 'pharmacy', 'physical-therapy',
    'nutrition', 'fitness-training', 'mental-health', 'public-health',
    'veterinary', 'medical-research', 'sports-medicine'
  ],
  TRADES: [
    'carpentry', 'plumbing', 'electrical', 'masonry', 'welding',
    'automotive', 'hvac', 'roofing', 'landscaping', 'culinary-arts',
    'baking', 'bartending', 'cosmetology', 'tailoring'
  ],
  ARTS: [
    'theater', 'dance', 'music', 'opera', 'comedy', 'magic',
    'circus-arts', 'martial-arts', 'yoga', 'meditation'
  ],
  SOCIAL: [
    'teaching', 'social-work', 'law', 'journalism', 'broadcasting',
    'public-speaking', 'translation', 'diplomacy', 'community-organizing',
    'event-planning', 'tourism', 'hospitality'
  ]
} as const;

export type ClassCategory = keyof typeof CLASS_CATEGORIES;
export type ClassId = typeof CLASS_CATEGORIES[ClassCategory][number];

// Additional interfaces referenced in UserRPGProgress
export interface Achievement {
  id: string;
  name: string;
  description?: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  dateEarned?: Date;
  progress?: number;
  requirements?: string[];
}

export interface Reputation {
  organization: string;
  level: number;
  points: number;
}

export interface Cosmetic {
  id: string;
  name: string;
  type: 'skin' | 'effect' | 'animation' | 'emote';
  rarity: string;
  isEquipped: boolean;
}

export interface Mount {
  id: string;
  name: string;
  type: string;
  speed: number;
  abilities: string[];
  isActive: boolean;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  level: number;
  abilities: string[];
  loyalty: number;
  isActive: boolean;
}

export interface SetBonus {
  id: string;
  name: string;
  pieces: number;
  bonuses: EquipmentStats;
}

export interface Enchantment {
  id: string;
  name: string;
  level: number;
  effect: string;
  stats: Partial<EquipmentStats>;
}

export interface Socket {
  type: 'gem' | 'rune' | 'crystal';
  gem?: string;
  bonus?: Partial<EquipmentStats>;
}

export interface UnlockRequirement {
  type: 'level' | 'achievement' | 'quest' | 'class' | 'tier';
  value: string | number;
  description: string;
}

export interface MasteryReward {
  tier: ProfessionTier;
  rewards: TierRewards;
}

export interface StatusEffect {
  id: string;
  name: string;
  description: string;
  duration: number;
  effect: Partial<ClassStats>;
}

export interface QuestRequirement {
  type: 'level' | 'class' | 'item' | 'achievement';
  value: string | number;
}

export interface QuestObjective {
  id: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

export interface QuestRewards {
  xp: number;
  coins: number;
  tokens: number;
  items: Equipment[];
  titles: string[];
}

export interface AscensionReward {
  divinePoints: number;
  cosmetics: Cosmetic[];
  titles: string[];
  abilities: string[];
}

export interface UserFeedback {
  difficulty: number;
  enjoyment: number;
  relevance: number;
  comments: string;
}

export interface ChallengeVariation {
  id: string;
  title: string;
  description: string;
  difficultyModifier: number;
  rewards: ChallengeRewards;
}

export interface ChallengeRewards {
  xp: number;
  coins: number;
  tokens: number;
  equipment: Equipment[];
  achievements: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'legendary';
  type: 'solo' | 'multiplayer' | 'tournament' | 'raid';
  entryCost: number;
  rewards: ChallengeRewards;
  timeLimit: number;
  maxParticipants: number;
  participants: number;
  status: 'open' | 'full' | 'active' | 'completed' | 'closed';
  createdAt: Date;
  category: string;
  tags: string[];
  requirements?: string[];
  location?: {
    type: 'online' | 'physical' | 'hybrid';
    details?: string;
  };
}

// New betting challenge types
export interface ChallengeSingle {
  id: string;
  title: string;
  description: string;
  type: 'single';
  category: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    level: number;
  };
  challenge: {
    goal: string;
    timeLimit: number; // in minutes
    verificationMethod: 'photo' | 'video' | 'live-stream' | 'ai-judge' | 'gps-tracking';
    requirements: string[];
  };
  betting: {
    yesOdds: number; // e.g., 1.5 means bet $1, win $1.50
    noOdds: number;
    totalPool: number;
    yesBets: number;
    noBets: number;
    minBet: number;
    maxBet: number;
    endTime: Date;
  };
  participants: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  tags: string[];
  thumbnail?: string;
}

export interface ChallengeDouble {
  id: string;
  title: string;
  description: string;
  type: 'double';
  category: string;
  participants: {
    blue: {
      id: string;
      name: string;
      avatar: string;
      level: number;
      description: string;
      odds: number;
      totalBets: number;
    };
    red: {
      id: string;
      name: string;
      avatar: string;
      level: number;
      description: string;
      odds: number;
      totalBets: number;
    };
  };
  challenge: {
    goal: string;
    timeLimit: number; // in minutes
    verificationMethod: 'live-stream' | 'referee' | 'ai-judge' | 'community-vote';
    requirements: string[];
    rules: string[];
  };
  betting: {
    totalPool: number;
    minBet: number;
    maxBet: number;
    endTime: Date;
    isLive: boolean;
  };
  totalParticipants: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  tags: string[];
  thumbnail?: string;
  eventTime?: Date;
}