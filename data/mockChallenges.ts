import { Challenge, ChallengeSingle, ChallengeDouble } from '../config/rpg-system';

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'fake-professor-challenge',
    title: 'Fake Professor Challenge',
    description: 'Deliver a hilarious, fake 1-minute lecture on an absurd topic in a classroom before the real professor arrives. Impersonate a professor and give the most ridiculous lecture ever!',
    type: 'solo',
    difficulty: 'intermediate',
    entryCost: 5,
    rewards: { 
      xp: 8, 
      coins: 15, 
      tokens: 5, 
      equipment: [], 
      achievements: ['prank-master'] 
    },
    timeLimit: 60,
    maxParticipants: 100,
    participants: 45,
    status: 'open',
    createdAt: new Date('2025-01-15'),
    category: 'prank',
    tags: ['prank', 'comedy', 'acting', 'campus', 'student'],
    location: {
      type: 'physical',
      details: 'Campus lecture halls'
    },
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop&crop=center',
    creators: ['ComedyMaster', 'PrankGuru']
  },
  {
    id: 'epic-study-spot',
    title: 'Epic Study Spot',
    description: 'Study in an unusual campus location for an hour and share a fast-motion video of your focus. Find the most creative study spot and show off your focus skills!',
    type: 'solo',
    difficulty: 'beginner',
    entryCost: 0,
    rewards: { 
      xp: 5, 
      coins: 8, 
      tokens: 2, 
      equipment: [], 
      achievements: ['focus-master'] 
    },
    timeLimit: 60,
    maxParticipants: 200,
    participants: 89,
    status: 'open',
    createdAt: new Date('2025-01-16'),
    category: 'study',
    tags: ['study', 'focus', 'campus', 'productivity', 'lifestyle'],
    location: {
      type: 'physical',
      details: 'Campus locations'
    },
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&crop=center',
    creators: ['StudyHacker', 'FocusExpert', 'ProductivityPro']
  },
  {
    id: 'mystery-snack-swap',
    title: 'Mystery Snack Swap',
    description: 'Swap random dorm snacks with friends and film your reaction to eating the surprise item. Trade snacks blindly and capture the hilarious reactions!',
    type: 'multiplayer',
    difficulty: 'beginner',
    entryCost: 3,
    rewards: { 
      xp: 4, 
      coins: 6, 
      tokens: 1, 
      equipment: [], 
      achievements: ['food-adventurer'] 
    },
    timeLimit: 30,
    maxParticipants: 150,
    participants: 67,
    status: 'open',
    createdAt: new Date('2025-01-17'),
    category: 'food',
    tags: ['food', 'reaction', 'dorm', 'funny', 'social'],
    location: {
      type: 'physical',
      details: 'Dorm rooms'
    },
    creators: ['FoodieExplorer'],
    thumbnail: undefined
  },
  {
    id: 'dropout-prank-call',
    title: 'Dropout Prank Call',
    description: 'Prank your parents by telling them you\'ve dropped out of college for a wild reason, and record their reaction. Give your parents the shock of their lives with a fake dropout announcement!',
    type: 'solo',
    difficulty: 'advanced',
    entryCost: 8,
    rewards: { 
      xp: 12, 
      coins: 20, 
      tokens: 8, 
      equipment: [], 
      achievements: ['prank-legend'] 
    },
    timeLimit: 5,
    maxParticipants: 50,
    participants: 34,
    status: 'open',
    createdAt: new Date('2025-01-18'),
    category: 'prank',
    tags: ['prank', 'parents', 'reaction', 'comedy', 'social'],
    location: {
      type: 'online',
      details: 'Phone calls'
    }
  },
  {
    id: '4-week-fitness-frenzy',
    title: '4-Week Fitness Frenzy',
    description: 'Commit to working out 5 days a week for 4 weeks and document your gym sessions with daily photos. Transform your body with 4 weeks of consistent workouts!',
    type: 'solo',
    difficulty: 'expert',
    entryCost: 15,
    rewards: { 
      xp: 18, 
      coins: 30, 
      tokens: 15, 
      equipment: [], 
      achievements: ['fitness-warrior'] 
    },
    timeLimit: 2880, // 4 weeks in minutes
    maxParticipants: 200,
    participants: 123,
    status: 'open',
    createdAt: new Date('2025-01-19'),
    category: 'fitness',
    tags: ['fitness', 'workout', 'consistency', 'transformation', 'health'],
    location: {
      type: 'physical',
      details: 'Gyms and fitness centers'
    }
  },
  {
    id: '14-day-abs',
    title: '14-Day Abs',
    description: 'Work toward visible abs in 14 days and compete with friends to show the most progress. Get shredded abs in just 2 weeks!',
    type: 'multiplayer',
    difficulty: 'advanced',
    entryCost: 12,
    rewards: { 
      xp: 15, 
      coins: 25, 
      tokens: 12, 
      equipment: [], 
      achievements: ['abs-champion'] 
    },
    timeLimit: 20160, // 14 days in minutes
    maxParticipants: 150,
    participants: 78,
    status: 'open',
    createdAt: new Date('2025-01-20'),
    category: 'fitness',
    tags: ['abs', 'fitness', 'transformation', 'competition', 'health'],
    location: {
      type: 'hybrid',
      details: 'Home or gym'
    }
  },
  {
    id: 'day-in-a-song',
    title: 'Day-in-a-Song',
    description: 'Live a day with one song as your dramatic background music and create a cinematic video montage. Make your life a movie with epic background music!',
    type: 'solo',
    difficulty: 'intermediate',
    entryCost: 7,
    rewards: { 
      xp: 10, 
      coins: 15, 
      tokens: 7, 
      equipment: [], 
      achievements: ['cinematic-creator'] 
    },
    timeLimit: 1440, // 24 hours in minutes
    maxParticipants: 100,
    participants: 56,
    status: 'open',
    createdAt: new Date('2025-01-21'),
    category: 'music',
    tags: ['music', 'video', 'cinematic', 'creativity', 'art'],
    location: {
      type: 'online',
      details: 'Video editing platform'
    }
  },
  {
    id: 'dorm-room-chef-showdown',
    title: 'Dorm Room Chef Showdown',
    description: 'Cook a "gourmet" dish using only dorm ingredients and film a dramatic cooking show. Turn ramen into a 5-star meal with dorm cooking skills!',
    type: 'solo',
    difficulty: 'intermediate',
    entryCost: 5,
    rewards: { 
      xp: 8, 
      coins: 12, 
      tokens: 5, 
      equipment: [], 
      achievements: ['dorm-chef'] 
    },
    timeLimit: 120,
    maxParticipants: 150,
    participants: 89,
    status: 'open',
    createdAt: new Date('2025-01-22'),
    category: 'cooking',
    tags: ['cooking', 'dorm', 'creativity', 'food', 'art'],
    location: {
      type: 'physical',
      details: 'Dorm kitchens'
    }
  },
  {
    id: 'textbook-art-challenge',
    title: 'Textbook Art Challenge',
    description: 'Transform a textbook page into a work of art and share your masterpiece. Turn boring textbooks into beautiful works of art!',
    type: 'solo',
    difficulty: 'beginner',
    entryCost: 0,
    rewards: { 
      xp: 6, 
      coins: 8, 
      tokens: 2, 
      equipment: [], 
      achievements: ['textbook-artist'] 
    },
    timeLimit: 30,
    maxParticipants: 300,
    participants: 145,
    status: 'open',
    createdAt: new Date('2025-01-23'),
    category: 'art',
    tags: ['art', 'textbook', 'creativity', 'doodling', 'education'],
    location: {
      type: 'physical',
      details: 'Study areas'
    }
  },
  {
    id: 'midnight-campus-run',
    title: 'Midnight Campus Run',
    description: 'Run a lap around campus at midnight and live-stream or record the adventure. Experience campus like never before with a midnight adventure run!',
    type: 'solo',
    difficulty: 'intermediate',
    entryCost: 10,
    rewards: { 
      xp: 12, 
      coins: 18, 
      tokens: 10, 
      equipment: [], 
      achievements: ['night-runner'] 
    },
    timeLimit: 60,
    maxParticipants: 100,
    participants: 67,
    status: 'open',
    createdAt: new Date('2025-01-24'),
    category: 'running',
    tags: ['running', 'campus', 'adventure', 'night', 'fitness'],
    location: {
      type: 'physical',
      details: 'Campus perimeter'
    }
  },
  {
    id: 'meme-creation-marathon',
    title: 'Meme Creation Marathon',
    description: 'Turn your college life into viral memes that capture the quirks, struggles, and inside jokes of campus life. Become the next viral meme creator of your campus!',
    type: 'multiplayer',
    difficulty: 'beginner',
    entryCost: 3,
    rewards: { 
      xp: 7, 
      coins: 10, 
      tokens: 3, 
      equipment: [], 
      achievements: ['meme-lord'] 
    },
    timeLimit: 43200, // 30 days in minutes
    maxParticipants: 500,
    participants: 234,
    status: 'open',
    createdAt: new Date('2025-01-25'),
    category: 'meme',
    tags: ['meme', 'viral', 'college', 'comedy', 'social-media'],
    location: {
      type: 'online',
      details: 'Social media platforms'
    }
  },
  {
    id: 'urgent-coding-challenge',
    title: 'Urgent Coding Challenge',
    description: 'Build a simple web app in just 30 minutes! Race against time to create something amazing.',
    type: 'solo',
    difficulty: 'intermediate',
    entryCost: 10,
    rewards: { 
      xp: 15, 
      coins: 25, 
      tokens: 8, 
      equipment: [], 
      achievements: ['speed-coder'] 
    },
    timeLimit: 30, // Very short time - will trigger wiggling
    maxParticipants: 50,
    participants: 23,
    status: 'open',
    createdAt: new Date('2025-01-29'),
    category: 'coding',
    tags: ['coding', 'speed', 'web-development', 'urgent'],
    location: {
      type: 'online',
      details: 'Online coding environment'
    },
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'quick-fitness-blast',
    title: 'Quick Fitness Blast',
    description: 'Complete a 15-minute high-intensity workout and share your results. Perfect for busy schedules!',
    type: 'solo',
    difficulty: 'beginner',
    entryCost: 0,
    rewards: { 
      xp: 8, 
      coins: 12, 
      tokens: 3, 
      equipment: [], 
      achievements: ['quick-fit'] 
    },
    timeLimit: 15, // Very short time - will trigger wiggling
    maxParticipants: 200,
    participants: 156,
    status: 'open',
    createdAt: new Date('2025-01-30'),
    category: 'fitness',
    tags: ['fitness', 'quick', 'workout', 'health'],
    location: {
      type: 'physical',
      details: 'Any location'
    },
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: 'flash-art-challenge',
    title: 'Flash Art Challenge',
    description: 'Create a masterpiece in just 20 minutes! Use any medium and show off your artistic skills.',
    type: 'solo',
    difficulty: 'intermediate',
    entryCost: 5,
    rewards: { 
      xp: 12, 
      coins: 18, 
      tokens: 5, 
      equipment: [], 
      achievements: ['flash-artist'] 
    },
    timeLimit: 20, // Very short time - will trigger wiggling
    maxParticipants: 100,
    participants: 67,
    status: 'open',
    createdAt: new Date('2025-01-31'),
    category: 'art',
    tags: ['art', 'creative', 'speed', 'drawing'],
    location: {
      type: 'hybrid',
      details: 'Any location with art supplies'
    },
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center'
  }
];

// Sample Single Person Betting Challenges
export const MOCK_SINGLE_CHALLENGES: ChallengeSingle[] = [
  {
    id: 'mukbang-seafood-noodles',
    title: 'Can I eat 5kg of seafood noodles in 1 hour?',
    description: 'Epic mukbang challenge! I will attempt to devour 5kg of spicy seafood noodles within 60 minutes. Will I succeed or fail? Place your bets!',
    type: 'single',
    category: 'food',
    creator: {
      id: 'creator-1',
      name: 'FoodMaster Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      level: 15
    },
    challenge: {
      goal: 'Eat 5kg of seafood noodles in 1 hour',
      timeLimit: 60,
      verificationMethod: 'live-stream',
      requirements: ['Must eat all noodles', 'No vomiting allowed', 'Live stream required']
    },
    betting: {
      yesOdds: 2.5,
      noOdds: 1.3,
      totalPool: 2500,
      yesBets: 1200,
      noBets: 1300,
      minBet: 5,
      maxBet: 100,
      endTime: new Date('2025-02-15T20:00:00Z')
    },
    participants: 450,
    status: 'active',
    createdAt: new Date('2025-01-20'),
    tags: ['mukbang', 'food', 'extreme', 'live-stream'],
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop'
  },
  {
    id: 'marathon-ultra-run',
    title: 'Can I run 100km in under 8 hours?',
    description: 'Ultra-marathon challenge! I will attempt to run 100 kilometers in under 8 hours. This is my biggest running challenge yet!',
    type: 'single',
    category: 'fitness',
    creator: {
      id: 'creator-2',
      name: 'RunnerPro Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      level: 22
    },
    challenge: {
      goal: 'Run 100km in under 8 hours',
      timeLimit: 480,
      verificationMethod: 'gps-tracking',
      requirements: ['GPS tracking required', 'No shortcuts', 'Complete route verification']
    },
    betting: {
      yesOdds: 3.2,
      noOdds: 1.2,
      totalPool: 1800,
      yesBets: 600,
      noBets: 1200,
      minBet: 3,
      maxBet: 50,
      endTime: new Date('2025-02-20T14:00:00Z')
    },
    participants: 320,
    status: 'active',
    createdAt: new Date('2025-01-22'),
    tags: ['running', 'ultra-marathon', 'fitness', 'endurance'],
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: 'coding-24-hour-hackathon',
    title: 'Can I build a complete app in 24 hours?',
    description: '24-hour coding challenge! I will attempt to build a fully functional mobile app from scratch in just 24 hours. No sleep, pure coding!',
    type: 'single',
    category: 'coding',
    creator: {
      id: 'creator-3',
      name: 'CodeWizard Mike',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      level: 18
    },
    challenge: {
      goal: 'Build a complete mobile app in 24 hours',
      timeLimit: 1440,
      verificationMethod: 'live-stream',
      requirements: ['Live coding stream', 'Working app demo', 'No pre-written code']
    },
    betting: {
      yesOdds: 1.8,
      noOdds: 1.6,
      totalPool: 3200,
      yesBets: 1800,
      noBets: 1400,
      minBet: 2,
      maxBet: 200,
      endTime: new Date('2025-02-25T10:00:00Z')
    },
    participants: 680,
    status: 'active',
    createdAt: new Date('2025-01-25'),
    tags: ['coding', 'hackathon', '24-hour', 'mobile-app'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
  }
];

// Sample Double Person Battle Challenges
export const MOCK_DOUBLE_CHALLENGES: ChallengeDouble[] = [
  {
    id: 'mukbang-battle-20-bowls',
    title: 'Mukbang Battle: First to finish 20 bowls of noodles',
    description: 'Epic mukbang battle! Two food champions will compete to see who can finish 20 bowls of spicy noodles first. Who will be the ultimate eating champion?',
    type: 'double',
    category: 'food',
    participants: {
      blue: {
        id: 'blue-1',
        name: 'HungryHero Ben',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        level: 16,
        description: 'Reigning mukbang champion with 15 wins',
        odds: 1.8,
        totalBets: 145
      },
      red: {
        id: 'red-1',
        name: 'FoodFighter Lisa',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        level: 14,
        description: 'Rising star with incredible eating speed',
        odds: 2.1,
        totalBets: 132
      }
    },
    challenge: {
      goal: 'First to finish 20 bowls of spicy noodles',
      timeLimit: 120,
      verificationMethod: 'live-stream',
      requirements: ['Live stream required', 'No vomiting', 'Complete all bowls'],
      rules: ['Must eat one bowl at a time', 'No outside help', 'Referee decision is final']
    },
    betting: {
      totalPool: 277,
      minBet: 5,
      maxBet: 150,
      endTime: new Date('2025-02-18T19:00:00Z'),
      isLive: false
    },
    totalParticipants: 145,
    status: 'upcoming',
    createdAt: new Date('2025-01-23'),
    tags: ['mukbang', 'battle', 'food', 'competition'],
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    eventTime: new Date('2025-02-18T20:00:00Z')
  },
  {
    id: 'badminton-championship',
    title: 'Badminton Championship: Best of 5 matches',
    description: 'Elite badminton showdown! Two professional players will battle it out in a best-of-5 match series. Who will claim the championship title?',
    type: 'double',
    category: 'sports',
    participants: {
      blue: {
        id: 'blue-2',
        name: 'SmashKing David',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        level: 25,
        description: 'Former national champion with powerful smashes',
        odds: 1.5,
        totalBets: 89
      },
      red: {
        id: 'red-2',
        name: 'SpeedDemon Emma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        level: 23,
        description: 'Lightning-fast player with incredible reflexes',
        odds: 2.4,
        totalBets: 76
      }
    },
    challenge: {
      goal: 'Best of 5 badminton matches',
      timeLimit: 180,
      verificationMethod: 'referee',
      requirements: ['Official referee', 'Standard badminton rules', 'Best of 5 format'],
      rules: ['21 points per game', '2-point lead required', 'Best of 5 matches']
    },
    betting: {
      totalPool: 165,
      minBet: 10,
      maxBet: 300,
      endTime: new Date('2025-02-22T15:00:00Z'),
      isLive: false
    },
    totalParticipants: 89,
    status: 'upcoming',
    createdAt: new Date('2025-01-26'),
    tags: ['badminton', 'sports', 'championship', 'competition'],
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    eventTime: new Date('2025-02-22T16:00:00Z')
  },
  {
    id: 'chess-master-battle',
    title: 'Chess Master Battle: 10-game series',
    description: 'Grandmaster chess battle! Two chess masters will face off in a 10-game series. Who will prove to be the superior strategist?',
    type: 'double',
    category: 'games',
    participants: {
      blue: {
        id: 'blue-3',
        name: 'Grandmaster Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        level: 30,
        description: 'International Grandmaster with 2800+ rating',
        odds: 1.3,
        totalBets: 156
      },
      red: {
        id: 'red-3',
        name: 'TacticalGenius Maria',
        avatar: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&crop=face',
        level: 28,
        description: 'Creative player known for unexpected tactics',
        odds: 3.2,
        totalBets: 134
      }
    },
    challenge: {
      goal: '10-game chess series',
      timeLimit: 300,
      verificationMethod: 'ai-judge',
      requirements: ['Official chess clock', 'AI move verification', '10 games total'],
      rules: ['Standard FIDE rules', '30 minutes per player', 'Best score wins']
    },
    betting: {
      totalPool: 290,
      minBet: 15,
      maxBet: 500,
      endTime: new Date('2025-02-28T12:00:00Z'),
      isLive: false
    },
    totalParticipants: 156,
    status: 'upcoming',
    createdAt: new Date('2025-01-28'),
    tags: ['chess', 'strategy', 'grandmaster', 'intellectual'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    eventTime: new Date('2025-02-28T13:00:00Z')
  }
];