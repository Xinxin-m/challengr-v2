export interface MockUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  level: number;
  title?: string;
  location?: string;
  followers: number;
  following: number;
  achievements: number;
  isOnline?: boolean;
  lastSeen?: string;
  bio?: string;
  interests?: string[];
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user-1',
    name: 'Cosmic Warrior',
    username: 'cosmic_warrior',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    level: 25,
    title: 'Fitness Legend',
    location: 'NYU Campus',
    followers: 1247,
    following: 89,
    achievements: 23,
    isOnline: true,
    bio: 'Pushing limits and breaking boundaries. Always up for a challenge!',
    interests: ['fitness', 'running', 'adventure', 'campus-exploration']
  },
  {
    id: 'user-2',
    name: 'Quantum Student',
    username: 'quantum_student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    level: 12,
    title: 'Study Master',
    location: 'MIT Campus',
    followers: 567,
    following: 234,
    achievements: 8,
    isOnline: false,
    lastSeen: '2h ago',
    bio: 'Learning is a journey, not a destination. Let\'s explore together!',
    interests: ['study', 'productivity', 'academic', 'learning-strategies']
  },
  {
    id: 'user-3',
    name: 'Stellar Creator',
    username: 'stellar_creator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    level: 18,
    title: 'Content Creator',
    location: 'Stanford University',
    followers: 2341,
    following: 156,
    achievements: 15,
    isOnline: true,
    bio: 'Creating content that makes people laugh, think, and connect.',
    interests: ['content-creation', 'memes', 'social-media', 'creativity']
  },
  {
    id: 'user-4',
    name: 'Culinary Master',
    username: 'culinary_master',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    level: 22,
    title: 'Dorm Chef',
    location: 'UC Berkeley',
    followers: 892,
    following: 67,
    achievements: 19,
    isOnline: false,
    lastSeen: '1D ago',
    bio: 'Turning dorm ingredients into gourmet meals. Food is love!',
    interests: ['cooking', 'food', 'dorm-life', 'culinary-arts']
  },
  {
    id: 'user-5',
    name: 'Code Ninja',
    username: 'code_ninja',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    level: 31,
    title: 'Senior Developer',
    location: 'Carnegie Mellon',
    followers: 3456,
    following: 123,
    achievements: 42,
    isOnline: true,
    bio: 'Building the future, one line of code at a time.',
    interests: ['coding', 'web-development', 'react', 'javascript']
  },
  {
    id: 'user-6',
    name: 'Lens Artist',
    username: 'lens_artist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    level: 16,
    title: 'Visual Storyteller',
    location: 'NYU Tisch',
    followers: 1234,
    following: 89,
    achievements: 12,
    isOnline: false,
    lastSeen: '5h ago',
    bio: 'Capturing moments that tell stories. Every photo has a story to share.',
    interests: ['photography', 'art', 'visual-storytelling', 'campus-life']
  },
  {
    id: 'user-7',
    name: 'Zen Student',
    username: 'zen_student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    level: 19,
    title: 'Mindfulness Guide',
    location: 'UCLA',
    followers: 1789,
    following: 234,
    achievements: 18,
    isOnline: true,
    bio: 'Finding peace in chaos. Helping others discover inner calm.',
    interests: ['meditation', 'mindfulness', 'wellness', 'mental-health']
  },
  {
    id: 'user-8',
    name: 'Bookworm',
    username: 'bookworm',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    level: 14,
    title: 'Knowledge Seeker',
    location: 'Harvard University',
    followers: 456,
    following: 78,
    achievements: 9,
    isOnline: false,
    lastSeen: '3D ago',
    bio: 'Lost in the world of books and knowledge. Always learning, always growing.',
    interests: ['reading', 'research', 'academic', 'knowledge']
  },
  {
    id: 'user-9',
    name: 'Adventure Seeker',
    username: 'adventure_seeker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    level: 28,
    title: 'Explorer',
    location: 'UC San Diego',
    followers: 2156,
    following: 145,
    achievements: 31,
    isOnline: true,
    bio: 'Life is an adventure. Let\'s explore the unknown together!',
    interests: ['adventure', 'exploration', 'travel', 'outdoor-activities']
  },
  {
    id: 'user-10',
    name: 'Tech Innovator',
    username: 'tech_innovator',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    level: 35,
    title: 'AI Researcher',
    location: 'Stanford AI Lab',
    followers: 5678,
    following: 89,
    achievements: 67,
    isOnline: true,
    bio: 'Building the future with artificial intelligence. Innovation never stops.',
    interests: ['ai', 'machine-learning', 'research', 'innovation']
  }
];
