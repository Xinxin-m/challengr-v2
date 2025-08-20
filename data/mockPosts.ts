export interface MockPost {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  upvotes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    level: number;
    location?: string;
  };
  isChallengeSubmission?: boolean;
  challengeName?: string;
  challengeCategory?: string;
  tags?: string[];
}

export const MOCK_POSTS: MockPost[] = [
  {
    id: 'post-1',
    title: 'Crushed the Midnight Campus Run!',
    description: 'Just completed the most epic midnight run around campus. The energy was incredible and I discovered so many hidden spots I never knew existed. Definitely going to make this a regular thing! The campus looks completely different at night - like a whole new world.',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    upvotes: 147,
    comments: 23,
    shares: 8,
    views: 892,
    createdAt: new Date(Date.now() - 199 * 24 * 60 * 60 * 1000), // 199 days ago
    author: {
      id: 'user-1',
      name: 'Cosmic Warrior',
      username: 'cosmic_warrior',
      level: 25,
      location: 'NYU Campus'
    },
    isChallengeSubmission: true,
    challengeName: 'Midnight Campus Run',
    challengeCategory: 'fitness',
    tags: ['fitness', 'campus', 'night', 'running', 'adventure']
  },
  {
    id: 'post-2',
    title: 'Tips for Acing Your Study Sessions',
    description: 'After trying the Epic Study Spot challenge, I discovered some amazing productivity hacks that have completely transformed my study game. Here are my top 5 tips: 1) Find your perfect study environment, 2) Use the Pomodoro technique, 3) Take regular breaks, 4) Stay hydrated, 5) Reward yourself for milestones.',
    upvotes: 89,
    comments: 15,
    shares: 12,
    views: 456,
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 200 days ago
    author: {
      id: 'user-2',
      name: 'Quantum Student',
      username: 'quantum_student',
      level: 12,
      location: 'MIT Campus'
    },
    tags: ['study', 'productivity', 'tips', 'academic', 'learning']
  },
  {
    id: 'post-3',
    title: 'Meme Creation Marathon Results',
    description: 'Spent the last week creating viral campus memes and the response has been incredible! Here are some of my favorites that really captured the college experience. The challenge pushed me to think creatively and I learned so much about what makes content shareable.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    upvotes: 234,
    comments: 45,
    shares: 67,
    views: 1200,
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 200 days ago
    author: {
      id: 'user-3',
      name: 'Stellar Creator',
      username: 'stellar_creator',
      level: 18,
      location: 'Stanford University'
    },
    isChallengeSubmission: true,
    challengeName: 'Meme Creation Marathon',
    challengeCategory: 'creativity',
    tags: ['meme', 'creativity', 'viral', 'social-media', 'college']
  },
  {
    id: 'post-4',
    title: 'My Journey to Becoming a Dorm Room Chef',
    description: 'Started with just ramen and now I\'m cooking gourmet meals in my tiny dorm kitchen! The Dorm Room Chef Showdown challenge taught me that creativity and resourcefulness can turn any ingredients into something amazing. Here\'s my signature ramen upgrade recipe.',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    upvotes: 156,
    comments: 32,
    shares: 28,
    views: 789,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    author: {
      id: 'user-4',
      name: 'Culinary Master',
      username: 'culinary_master',
      level: 22,
      location: 'UC Berkeley'
    },
    isChallengeSubmission: true,
    challengeName: 'Dorm Room Chef Showdown',
    challengeCategory: 'cooking',
    tags: ['cooking', 'dorm', 'recipe', 'food', 'creativity']
  },
  {
    id: 'post-5',
    title: 'How I Built My First React App in 48 Hours',
    description: 'The React Todo App challenge was intense but incredibly rewarding! I went from knowing nothing about React to having a fully functional app with state management, local storage, and a beautiful UI. Here\'s what I learned and how you can do it too.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    upvotes: 203,
    comments: 41,
    shares: 35,
    views: 945,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    author: {
      id: 'user-5',
      name: 'Code Ninja',
      username: 'code_ninja',
      level: 31,
      location: 'Carnegie Mellon'
    },
    isChallengeSubmission: true,
    challengeName: 'Build a React Todo App',
    challengeCategory: 'coding',
    tags: ['react', 'coding', 'web-development', 'javascript', 'tutorial']
  },
  {
    id: 'post-6',
    title: 'The Ultimate Guide to Campus Photography',
    description: 'After completing the Photography Masterclass challenge, I\'ve been exploring campus with a new perspective. Here are my favorite spots and the best times to capture them. The golden hour on campus is absolutely magical!',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    upvotes: 178,
    comments: 29,
    shares: 42,
    views: 678,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    author: {
      id: 'user-6',
      name: 'Lens Artist',
      username: 'lens_artist',
      level: 16,
      location: 'NYU Tisch'
    },
    isChallengeSubmission: true,
    challengeName: 'Photography Masterclass',
    challengeCategory: 'creativity',
    tags: ['photography', 'campus', 'art', 'creativity', 'tips']
  },
  {
    id: 'post-7',
    title: 'Why Meditation Changed My College Experience',
    description: 'The 21-day meditation challenge completely transformed how I handle stress and deadlines. I went from being constantly overwhelmed to feeling centered and focused. Here\'s my daily routine and the science behind why it works.',
    upvotes: 267,
    comments: 38,
    shares: 89,
    views: 1345,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    author: {
      id: 'user-7',
      name: 'Zen Student',
      username: 'zen_student',
      level: 19,
      location: 'UCLA'
    },
    isChallengeSubmission: true,
    challengeName: 'Meditation & Mindfulness',
    challengeCategory: 'learning',
    tags: ['meditation', 'mindfulness', 'wellness', 'stress-relief', 'college-life']
  },
  {
    id: 'post-8',
    title: 'The Hidden Gems of My University Library',
    description: 'Spent the afternoon exploring the depths of our library and found some incredible resources I never knew existed. From rare books to digital archives, there\'s so much more than just textbooks here. Here\'s my guide to making the most of your campus library.',
    upvotes: 134,
    comments: 21,
    shares: 15,
    views: 567,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    author: {
      id: 'user-8',
      name: 'Bookworm',
      username: 'bookworm',
      level: 14,
      location: 'Harvard University'
    },
    tags: ['library', 'research', 'academic', 'resources', 'campus-life']
  }
];