// User Types
export interface User {
  id: string;
  name: string;
  profilePicture?: string;
  location?: string;
  languages?: string[]; // Language codes for flag display
  level: number;
  membershipStatus: 'free' | 'verified' | 'gold' | 'platinum' | 'diamond';
  tokens: number; // Crypto asset
  credits: number; // Platform currency
  coins: number; // Convertible to tokens
  exp: number; // Experience points
  expToNext: number; // EXP needed for next level
  bio?: string;
  tags: string[]; // Job tags: photographer, youtuber, blogger, artist, student, sports coach
  challengesCreated: number;
  challengesParticipated: number;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
  wallets?: {
    metamask?: string;
    binance?: string;
    okx?: string;
    uniswap?: string;
    coinbase?: string;
  };
  joinedDate: string;
  lastActive: string;
}

// Challenge Types
export interface Challenge {
  id: string;
  creators: string[]; // User IDs
  thumbnail: string; // Image or video URL
  name: string;
  description: string;
  oneLineDescription: string;
  location: {
    type: 'online' | 'offline';
    city?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  participationCriteria: {
    type: 'public' | 'private' | 'level-restricted' | 'membership-restricted';
    minLevel?: number;
    requiredMembership?: string;
    inviteOnly?: boolean;
  };
  category: 'viral-tiktok' | 'dumb-challenges' | 'iq-challenges' | 'games' | 'health-lifestyle' | 'reading' | 'art' | 'sports' | 'coding' | 'cooking' | 'travel' | 'education';
  tags: string[];
  dateCreated: string;
  startDate: string;
  endDate: string;
  entryFee: number; // In credits
  participants: string[]; // User IDs
  completedBy: string[]; // User IDs
  consensus: {
    type: 'most-votes' | 'ai-determined' | 'daily-checkin' | 'judge-determined' | 'percentage-vote';
    requiredPercentage?: number;
    judges?: string[]; // User IDs
  };
  rewards: {
    coins: number;
    tokens?: number;
    exp: number;
    badges?: string[];
  };
  completionCriteria: string;
  upvotes: number;
  downvotes?: number;
  isHighlighted: boolean; // For rolling window display
  trending: boolean;
  featured: boolean;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  analytics?: {
    views: number;
    shares: number;
    saves: number;
    mentions: number;
  };
}

// Post Types
export interface Post {
  id: string;
  authorId: string;
  type: 'image' | 'video' | 'text' | 'mixed';
  content: {
    text?: string;
    images?: string[];
    videos?: string[];
    markdown?: string;
  };
  topic: string;
  tags: string[];
  location?: {
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  privacy: 'public' | 'friends' | 'private';
  dateCreated: string;
  lastModified?: string;
  interactions: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  isHighlighted: boolean;
  isPinned: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'challenge-invite' | 'system' | 'dm' | 'achievement' | 'reminder' | 'social';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  relatedId?: string; // Challenge ID, User ID, etc.
  metadata?: {
    challengeId?: string;
    userId?: string;
    achievementId?: string;
  };
}

// Subscription Types
export interface Subscription {
  id: string;
  type: 'monthly' | 'yearly' | 'lifetime';
  tier: 'basic' | 'premium' | 'ultimate';
  price: number;
  features: string[];
  tokensIncluded: number;
  creditsIncluded: number;
  prioritySupport: boolean;
  adFree: boolean;
  exclusiveContent: boolean;
}

// Analytics Types
export interface ChallengeAnalytics {
  challengeId: string;
  totalViews: number;
  uniqueParticipants: number;
  completionRate: number;
  averageRating: number;
  shareCount: number;
  mentionCount: number;
  coinsGenerated: number;
  engagementRate: number;
  demographics: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
    membershipTiers: Record<string, number>;
  };
  timeSeriesData: {
    date: string;
    views: number;
    participants: number;
  }[];
}

// Platform Settings
export interface PlatformSettings {
  tokenConversionRate: {
    coinsPerToken: number;
    tokenToUSDRate: number;
  };
  levelRequirements: {
    level: number;
    expRequired: number;
    benefits: string[];
  }[];
  categories: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
  }[];
  membershipBenefits: Record<string, {
    features: string[];
    discounts: number;
    priorityAccess: boolean;
    exclusiveContent: boolean;
  }>;
}

// Filter Types
export interface FilterOptions {
  categories: string[];
  difficulties: string[];
  locations: string[];
  priceRanges: {
    min: number;
    max: number;
    label: string;
  }[];
  membershipLevels: string[];
  dateRanges: {
    value: string;
    label: string;
  }[];
}

// Search and Browse Types
export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  difficulty?: string;
  priceRange?: [number, number];
  dateRange?: [string, string];
  onlineOnly?: boolean;
  membershipLevel?: string;
  tags?: string[];
  sortBy?: 'trending' | 'newest' | 'popular' | 'ending-soon' | 'price-low' | 'price-high';
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters?: SearchFilters;
  totalCount: number;
}

// Theme Types
export interface ThemeColors {
  primary: string; // Black
  secondary: string; // Bright Yellow
  accent: string; // Green Turquoise
  background: string;
  foreground: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
}

// Component Prop Types
export interface ChallengeCardProps {
  challenge: Challenge;
  user?: User;
  onSelect?: (challengeId: string) => void;
  onSave?: (challengeId: string) => void;
  onShare?: (challengeId: string) => void;
  onJoin?: (challengeId: string) => void;
  variant?: 'default' | 'compact' | 'featured' | 'detail';
  showAnalytics?: boolean;
}

export interface UserCardProps {
  user: User;
  currentUser?: User;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  variant?: 'default' | 'compact' | 'detailed';
  showStats?: boolean;
}

// Map Types
export interface MapLocation {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  country: string;
  challengeCount: number;
  hotspotLevel: 'low' | 'medium' | 'high' | 'extreme';
  challenges: Challenge[];
  posts: Post[];
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  metric: 'tokens' | 'challenges-completed' | 'challenges-created' | 'community-impact';
  change: number; // Position change from last week
  badge?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  type: 'challenge' | 'social' | 'earning' | 'learning';
  requirement: number;
  progress: number;
  completed: boolean;
  reward: {
    tokens?: number;
    credits?: number;
    coins?: number;
    badge?: string;
    title?: string;
  };
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}