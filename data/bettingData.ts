export interface BettingParticipant {
  id: string;
  name: string;
  avatar: string;
  betAmount: number;
  joinedAt: Date;
}

export interface BettingChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  startTime: Date;
  endTime: Date;
  participants: BettingParticipant[];
  totalPool: number;
  yesBets: number;
  noBets: number;
  minBet: number;
  maxBet: number;
  creator: {
    name: string;
    avatar: string;
  };
}

export const mockBettingChallenges: BettingChallenge[] = [
  {
    id: 'bet-1',
    title: 'Mukbang Challenge: Can Sarah eat 50 hot wings in 30 minutes?',
    description: 'Sarah will attempt to eat 50 spicy hot wings within 30 minutes. She must finish all wings and keep them down for at least 5 minutes after completion to win.',
    category: 'food',
    difficulty: 'hard',
    startTime: new Date('2025-01-09T08:00:00'),
    endTime: new Date('2025-01-09T09:00:00'),
    participants: [
      {
        id: 'p1',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        betAmount: 25,
        joinedAt: new Date('2025-01-08T10:30:00')
      },
      {
        id: 'p2',
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60ad193?w=80&h=80&fit=crop&crop=face',
        betAmount: 15,
        joinedAt: new Date('2025-01-08T11:15:00')
      },
      {
        id: 'p3',
        name: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        betAmount: 30,
        joinedAt: new Date('2025-01-08T12:00:00')
      },
      {
        id: 'p4',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        betAmount: 20,
        joinedAt: new Date('2025-01-08T13:45:00')
      }
    ],
    totalPool: 90,
    yesBets: 3,
    noBets: 1,
    minBet: 5,
    maxBet: 50,
    creator: {
      name: 'FoodMaster',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face'
    }
  },
  {
    id: 'bet-2',
    title: 'Coding Challenge: Will Mike complete the React app in under 2 hours?',
    description: 'Mike has 2 hours to build a complete React todo app with TypeScript, state management, and responsive design. He must deploy it and have it fully functional.',
    category: 'coding',
    difficulty: 'medium',
    startTime: new Date('2025-01-10T14:00:00'),
    endTime: new Date('2025-01-10T16:00:00'),
    participants: [
      {
        id: 'p5',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
        betAmount: 40,
        joinedAt: new Date('2025-01-09T09:20:00')
      },
      {
        id: 'p6',
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
        betAmount: 25,
        joinedAt: new Date('2025-01-09T10:15:00')
      }
    ],
    totalPool: 65,
    yesBets: 1,
    noBets: 1,
    minBet: 10,
    maxBet: 100,
    creator: {
      name: 'CodeWizard',
      avatar: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=80&h=80&fit=crop&crop=face'
    }
  },
  {
    id: 'bet-3',
    title: 'Fitness Challenge: Can Tom run 10km in under 45 minutes?',
    description: 'Tom will attempt to run 10 kilometers in under 45 minutes on a standard running track. The time will be officially recorded and verified.',
    category: 'fitness',
    difficulty: 'expert',
    startTime: new Date('2025-01-11T07:00:00'),
    endTime: new Date('2025-01-11T08:00:00'),
    participants: [
      {
        id: 'p7',
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
        betAmount: 35,
        joinedAt: new Date('2025-01-10T08:30:00')
      },
      {
        id: 'p8',
        name: 'Chris Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        betAmount: 20,
        joinedAt: new Date('2025-01-10T09:45:00')
      },
      {
        id: 'p9',
        name: 'Sophie Brown',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60ad193?w=80&h=80&fit=crop&crop=face',
        betAmount: 15,
        joinedAt: new Date('2025-01-10T11:20:00')
      }
    ],
    totalPool: 70,
    yesBets: 2,
    noBets: 1,
    minBet: 5,
    maxBet: 75,
    creator: {
      name: 'FitnessPro',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=face'
    }
  },
  {
    id: 'bet-4',
    title: 'Art Challenge: Will Anna paint a masterpiece in 3 hours?',
    description: 'Anna has 3 hours to create an original oil painting that will be judged by a panel of art experts. The painting must be at least 24x36 inches.',
    category: 'art',
    difficulty: 'hard',
    startTime: new Date('2025-01-12T10:00:00'),
    endTime: new Date('2025-01-12T13:00:00'),
    participants: [
      {
        id: 'p10',
        name: 'Kevin Lee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
        betAmount: 50,
        joinedAt: new Date('2025-01-11T14:15:00')
      },
      {
        id: 'p11',
        name: 'Amanda White',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
        betAmount: 30,
        joinedAt: new Date('2025-01-11T15:30:00')
      }
    ],
    totalPool: 80,
    yesBets: 1,
    noBets: 1,
    minBet: 15,
    maxBet: 100,
    creator: {
      name: 'ArtMaster',
      avatar: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=80&h=80&fit=crop&crop=face'
    }
  },
  {
    id: 'bet-5',
    title: 'Gaming Challenge: Can Jake beat Dark Souls in under 4 hours?',
    description: 'Jake will attempt to complete Dark Souls (any% speedrun) in under 4 hours. He must follow standard speedrun rules and the run will be streamed live.',
    category: 'gaming',
    difficulty: 'expert',
    startTime: new Date('2025-01-13T18:00:00'),
    endTime: new Date('2025-01-13T22:00:00'),
    participants: [
      {
        id: 'p12',
        name: 'Tyler Durden',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        betAmount: 45,
        joinedAt: new Date('2025-01-12T20:00:00')
      },
      {
        id: 'p13',
        name: 'Nina Patel',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60ad193?w=80&h=80&fit=crop&crop=face',
        betAmount: 25,
        joinedAt: new Date('2025-01-12T21:15:00')
      },
      {
        id: 'p14',
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
        betAmount: 35,
        joinedAt: new Date('2025-01-12T22:30:00')
      }
    ],
    totalPool: 105,
    yesBets: 1,
    noBets: 2,
    minBet: 10,
    maxBet: 100,
    creator: {
      name: 'GameMaster',
      avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=80&h=80&fit=crop&crop=face'
    }
  }
];
