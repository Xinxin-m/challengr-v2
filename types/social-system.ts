// Social Media and Community System Types
export interface CommunityPost {
  id: string;
  type: 'challenge' | 'content' | 'achievement' | 'story' | 'tip' | 'question';
  author: RPGUser;
  title: string;
  content: string;
  media?: PostMedia[];
  tags: string[];
  profession?: string;
  difficulty?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
  };
  rewards?: {
    xp: number;
    coins: number;
    tokens?: number;
  };
  challengeData?: {
    participants: number;
    timeLimit: number;
    requirements: string[];
    joinable: boolean;
  };
  createdAt: Date;
  isPinned?: boolean;
  isVerified?: boolean;
  location?: {
    name: string;
    coordinates?: { lat: number; lng: number };
  };
}

export interface PostMedia {
  id: string;
  type: 'image' | 'video' | 'gif' | 'audio';
  url: string;
  thumbnail?: string;
  alt?: string;
  duration?: number; // for video/audio
}

export interface RPGUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  profession: string;
  tier: string;
  level: number;
  isVerified: boolean;
  badges: string[];
  title?: string;
  guild?: string;
  stats: {
    followers: number;
    following: number;
    totalXP: number;
    achievements: number;
  };
  appearance?: CharacterAppearance;
}

export interface CharacterAppearance {
  race: 'human' | 'elf' | 'dwarf' | 'orc' | 'robot' | 'alien';
  gender: 'male' | 'female' | 'non-binary';
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  outfit: string;
  accessories: string[];
  background: string;
  pose: string;
}

export interface Membership {
  type: 'free' | 'bronze' | 'silver' | 'gold';
  displayName: string;
  price: number;
  features: string[];
  benefits: {
    dailyCoins: number;
    aiGenerations: number;
    prioritySupport: boolean;
    exclusiveChallenges: boolean;
    customization: boolean;
    advancedAnalytics: boolean;
  };
  color: string;
  icon: string;
}

export interface Comment {
  id: string;
  author: RPGUser;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
  isVerified?: boolean;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  profession: string;
  memberCount: number;
  level: number;
  badge: string;
  color: string;
  leader: RPGUser;
  benefits: string[];
}