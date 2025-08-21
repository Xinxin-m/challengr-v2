import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  Heart, X, Star, TrendingUp, Clock, Users, Zap, 
  ChevronUp, ChevronDown, RotateCcw, Info, Trophy,
  Flame, Target, DollarSign, ArrowUp, ArrowDown, Sparkles,
  MessageSquare, Share2, BookOpen, Gamepad2, Search, Filter,
  Coins
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { MasonryGrid } from './ui/masonry-grid';
import { BettingArenaCard } from './BettingArenaCard';
import { BettingArenaCardModal } from './BettingArenaCardModal';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

interface BettingCardData {
  id: string;
  title: string;
  description: string;
  category: 'crypto' | 'sports' | 'education' | 'tech' | 'entertainment' | 'science' | 'finance';
  odds: {
    yes: number;
    no: number;
  };
  pool: number;
  participants: number;
  timeLeft: string;
  endDate: Date;
  startDate?: Date;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  minBet: number;
  maxBet: number;
  tags: string[];
  creator: {
    name: string;
    avatar: string;
    level: number;
    verified: boolean;
  };
  trending: boolean;
  aiGenerated: boolean;
  onChain: boolean;
  image?: string;
  votes: {
    yes: number;
    no: number;
  };
  discussionCount: number;
  shareCount: number;
  type: 'solo' | 'dual';
  status: 'live' | 'upcoming';
  player1?: {
    name: string;
    avatar: string;
    level: number;
  };
  player2?: {
    name: string;
    avatar: string;
    level: number;
  };
  externalLinks?: Array<{
    platform: string;
    url: string;
    label: string;
  }>;
  liveStream?: {
    announcement: string;
    startTime: Date;
  };
  totalBetAmount?: number;
  participantsList?: Array<{
    name: string;
    avatar: string;
    level: number;
    betAmount: number;
  }>;
}

interface BettingArenaProps {
  userTokens: {
    goldCoins: number;
    bettingCredits: number;
    winStreak: number;
  };
  onTokenEarn: (amount: number, type: 'gold' | 'betting') => void;
  onBettingWin: () => void;
  winStreak: number;
  membershipTier: 'free' | 'basic' | 'premium' | 'ultimate';
}

export function BettingArena({
  userTokens,
  onTokenEarn,
  onBettingWin,
  winStreak,
  membershipTier
}: BettingArenaProps) {
  // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL - NO CONDITIONAL HOOKS
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<'yes' | 'no' | null>(null);
  const [selectedCard, setSelectedCard] = useState<BettingCardData | null>(null);
  const [cardStack, setCardStack] = useState<BettingCardData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'solo' | 'dual'>('dual');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Motion hooks - these MUST be called consistently in every render
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.5, 1, 0.5, 0]);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const leftOpacity = useTransform(x, [0, -150], [0, 1]);
  const rightOpacity = useTransform(x, [0, 150], [0, 1]);

  // Enhanced mock betting data with more variety and dual battles
  const mockBettingCards: BettingCardData[] = [
    {
      id: '1',
      title: 'Bitcoin vs Ethereum: Which will reach $100K first?',
      description: 'A head-to-head battle between the two crypto giants. Bitcoin aims for $100K while Ethereum targets $10K. Which will achieve their milestone first in 2024?',
      category: 'crypto',
      odds: { yes: 2.4, no: 1.6 },
      pool: 15420,
      participants: 342,
      timeLeft: '15d 4h 23m',
      endDate: new Date('2024-12-31'),
      difficulty: 'medium',
      minBet: 1,
      maxBet: 100,
      tags: ['bitcoin', 'ethereum', 'battle', 'price-prediction'],
      creator: {
        name: 'CryptoAnalyst_Pro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        level: 15,
        verified: true
      },
      trending: true,
      aiGenerated: false,
      onChain: true,
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop',
      votes: { yes: 234, no: 108 },
      discussionCount: 45,
      shareCount: 23,
      type: 'dual',
      status: 'live',
      player1: {
        name: 'Bitcoin',
        avatar: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=80&h=80&fit=crop',
        level: 25
      },
      player2: {
        name: 'Ethereum',
        avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=80&fit=crop',
        level: 22
      },
      externalLinks: [
        {
          platform: 'youtube',
          url: 'https://youtube.com/watch?v=crypto-battle',
          label: 'Live Stream'
        }
      ],
      liveStream: {
        announcement: 'The event will be streamed live starting at 8 PM EST on Crypto Central channel',
        startTime: new Date('2024-12-31T20:00:00')
      },
      startDate: new Date('2024-12-31T18:00:00'),
      totalBetAmount: 15420,
      participantsList: [
        {
          name: 'CryptoWhale',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
          level: 18,
          betAmount: 500
        },
        {
          name: 'DeFiTrader',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
          level: 15,
          betAmount: 300
        }
      ]
    },
    {
      id: '7',
      title: 'Mukbang Battle: HungryHero Ben vs FoodFighter Lisa',
      description: 'Epic eating showdown! Two food champions compete to see who can finish 20 bowls of spicy noodles first. The ultimate mukbang battle!',
      category: 'entertainment',
      odds: { yes: 1.8, no: 2.1 },
      pool: 8900,
      participants: 234,
      timeLeft: '2h 15m',
      endDate: new Date('2024-03-20'),
      difficulty: 'medium',
      minBet: 2,
      maxBet: 50,
      tags: ['mukbang', 'food', 'battle', 'live-stream'],
      creator: {
        name: 'FoodBattles_Official',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face',
        level: 18,
        verified: true
      },
      trending: true,
      aiGenerated: false,
      onChain: false,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      votes: { yes: 145, no: 89 },
      discussionCount: 67,
      shareCount: 34,
      type: 'dual',
      status: 'live'
    },
    {
      id: '8',
      title: 'Code Speed Battle: React vs Vue Development',
      description: 'Two senior developers race to build the same e-commerce app - one using React, one using Vue. Who will finish first with the best quality?',
      category: 'tech',
      odds: { yes: 2.2, no: 1.7 },
      pool: 12450,
      participants: 456,
      timeLeft: '6h 30m',
      endDate: new Date('2024-03-21'),
      difficulty: 'expert',
      minBet: 3,
      maxBet: 75,
      tags: ['coding', 'react', 'vue', 'development', 'battle'],
      creator: {
        name: 'DevBattles_Arena',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        level: 22,
        verified: true
      },
      trending: false,
      aiGenerated: false,
      onChain: true,
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
      votes: { yes: 287, no: 169 },
      discussionCount: 89,
      shareCount: 45,
      type: 'dual',
      status: 'live'
    },
    {
      id: '9',
      title: 'Gaming Championship: CS2 Pro vs Valorant Pro',
      description: 'Cross-game showdown! A CS2 professional plays Valorant against a Valorant pro playing CS2. Who adapts better to the other game?',
      category: 'entertainment',
      odds: { yes: 1.9, no: 1.9 },
      pool: 18670,
      participants: 678,
      timeLeft: '1d 8h 45m',
      endDate: new Date('2024-03-22'),
      difficulty: 'hard',
      minBet: 2,
      maxBet: 100,
      tags: ['gaming', 'esports', 'cs2', 'valorant', 'pro-players'],
      creator: {
        name: 'ESports_Central',
        avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop&crop=face',
        level: 19,
        verified: true
      },
      trending: true,
      aiGenerated: false,
      onChain: true,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      votes: { yes: 340, no: 338 },
      discussionCount: 123,
      shareCount: 78,
      type: 'dual',
      status: 'live'
    },
    {
      id: '2',
      title: 'AI vs Human: Who will solve the Riemann Hypothesis?',
      description: 'The ultimate mathematical showdown. Will an AI system crack one of mathematics\' greatest unsolved problems, or will a human mathematician prevail first?',
      category: 'science',
      odds: { yes: 3.2, no: 1.3 },
      pool: 8750,
      participants: 156,
      timeLeft: '45d 12h 15m',
      endDate: new Date('2024-12-31'),
      difficulty: 'hard',
      minBet: 2,
      maxBet: 50,
      tags: ['AI', 'mathematics', 'battle', 'breakthrough'],
      creator: {
        name: 'MathWhiz',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        level: 12,
        verified: false
      },
      trending: false,
      aiGenerated: true,
      onChain: false,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      votes: { yes: 89, no: 67 },
      discussionCount: 32,
      shareCount: 18,
      type: 'dual',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Web3 Education adoption will surpass 1M users',
      description: 'Will decentralized education platforms collectively reach 1 million active monthly users by the end of 2024?',
      category: 'education',
      odds: { yes: 1.8, no: 2.1 },
      pool: 12340,
      participants: 287,
      timeLeft: '30d 8h 45m',
      endDate: new Date('2024-12-31'),
      difficulty: 'easy',
      minBet: 1,
      maxBet: 75,
      tags: ['web3', 'education', 'adoption', 'defi'],
      creator: {
        name: 'EduChain_Official',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60ad193?w=80&h=80&fit=crop&crop=face',
        level: 20,
        verified: true
      },
      trending: true,
      aiGenerated: false,
      onChain: true,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
      votes: { yes: 178, no: 109 },
      discussionCount: 56,
      shareCount: 34,
      type: 'solo',
      status: 'live'
    },
    {
      id: '4',
      title: 'Ethereum vs Solana: Battle for DeFi Dominance',
      description: 'Which blockchain will have the highest Total Value Locked (TVL) in DeFi protocols by Q2 2024? The battle of scalability vs decentralization!',
      category: 'crypto',
      odds: { yes: 2.1, no: 1.7 },
      pool: 22150,
      participants: 445,
      timeLeft: '2d 16h 30m',
      endDate: new Date('2024-03-31'),
      difficulty: 'expert',
      minBet: 5,
      maxBet: 200,
      tags: ['ethereum', 'solana', 'defi', 'battle', 'tvl'],
      creator: {
        name: 'DeFiWhale',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
        level: 18,
        verified: true
      },
      trending: true,
      aiGenerated: false,
      onChain: true,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      votes: { yes: 312, no: 133 },
      discussionCount: 78,
      shareCount: 45,
      type: 'dual',
      status: 'live'
    },
    {
      id: '5',
      title: 'New programming language will top GitHub by 2025',
      description: 'Will a programming language created after 2020 become one of the top 10 most used languages on GitHub by 2025?',
      category: 'tech',
      odds: { yes: 4.5, no: 1.2 },
      pool: 6780,
      participants: 123,
      timeLeft: '180d 5h 12m',
      endDate: new Date('2025-01-01'),
      difficulty: 'hard',
      minBet: 1,
      maxBet: 30,
      tags: ['programming', 'github', 'languages', 'development'],
      creator: {
        name: 'CodeMaster_AI',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face',
        level: 14,
        verified: false
      },
      trending: false,
      aiGenerated: true,
      onChain: false,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      votes: { yes: 67, no: 56 },
      discussionCount: 21,
      shareCount: 12,
      type: 'solo',
      status: 'upcoming'
    },
    {
      id: '6',
      title: 'Tesla vs Rivian: Electric Truck Market Share Battle',
      description: 'Which company will dominate the electric truck market by 2025? Tesla\'s Cybertruck vs Rivian\'s R1T - the battle for supremacy!',
      category: 'tech',
      odds: { yes: 1.9, no: 2.0 },
      pool: 18900,
      participants: 567,
      timeLeft: '90d 3h 45m',
      endDate: new Date('2025-06-30'),
      difficulty: 'medium',
      minBet: 2,
      maxBet: 150,
      tags: ['tesla', 'rivian', 'electric-vehicles', 'battle', 'market-share'],
      creator: {
        name: 'AutoAnalyst_Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        level: 16,
        verified: true
      },
      trending: true,
      aiGenerated: false,
      onChain: true,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      votes: { yes: 423, no: 144 },
      discussionCount: 89,
      shareCount: 67,
      type: 'dual',
      status: 'live'
    }
  ];

  // Effects - called after all hooks are defined
  useEffect(() => {
    setCardStack(mockBettingCards);
  }, []);

  // Get current card after state is defined
  const currentCard = cardStack.length > 0 ? cardStack[currentCardIndex] : null;

  // Helper functions
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'crypto': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'tech': return 'from-blue-400 via-purple-500 to-pink-500';
      case 'education': return 'from-green-400 via-teal-500 to-cyan-500';
      case 'sports': return 'from-red-400 via-pink-500 to-purple-500';
      case 'science': return 'from-indigo-400 via-blue-500 to-teal-500';
      case 'finance': return 'from-emerald-400 via-green-500 to-yellow-500';
      default: return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return { icon: '🟢', color: 'text-green-600 dark:text-green-400' };
      case 'medium': return { icon: '🟡', color: 'text-yellow-600 dark:text-yellow-400' };
      case 'hard': return { icon: '🟠', color: 'text-orange-600 dark:text-orange-400' };
      case 'expert': return { icon: '🔴', color: 'text-red-600 dark:text-red-400' };
      default: return { icon: '⚪', color: 'text-gray-600 dark:text-gray-400' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crypto': return '₿';
      case 'tech': return '🔬';
      case 'education': return '📚';
      case 'sports': return '⚽';
      case 'science': return '🧪';
      case 'finance': return '💰';
      default: return '📊';
    }
  };

  const handleCardSwipe = (direction: 'left' | 'right', card: BettingCardData) => {
    if (direction === 'right') {
      // Interested - show betting modal
      setSelectedCard(card);
      setSelectedPosition('yes');
      setShowBetModal(true);
    } else if (direction === 'left') {
      // Not interested - move to next card
      nextCard();
    }
  };

  const nextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % cardStack.length);
    // Reset card position
    x.set(0);
    y.set(0);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 120;
    const velocity = info.velocity.x;
    
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0 || velocity > 500) {
        // Swipe right - interested
        x.set(400);
        setTimeout(() => {
          if (currentCard) {
            handleCardSwipe('right', currentCard);
          }
          nextCard();
        }, 200);
      } else {
        // Swipe left - not interested
        x.set(-400);
        setTimeout(() => {
          if (currentCard) {
            handleCardSwipe('left', currentCard);
          }
        }, 200);
      }
    } else {
      // Snap back to center
      x.set(0);
      y.set(0);
    }
  };

  const handleBet = () => {
    if (!selectedCard || !selectedPosition || userTokens.bettingCredits < betAmount) return;

    // Simulate betting logic with realistic probabilities
    const winProbability = selectedPosition === 'yes' ? 
      selectedCard.votes.yes / (selectedCard.votes.yes + selectedCard.votes.no) : 
      selectedCard.votes.no / (selectedCard.votes.yes + selectedCard.votes.no);
    
    const isWin = Math.random() < winProbability;
    
    if (isWin) {
      const winAmount = Math.floor(betAmount * selectedCard.odds[selectedPosition]);
      onTokenEarn(winAmount, 'gold');
      onBettingWin();
    }

    // Deduct betting credits
    onTokenEarn(-betAmount, 'betting');
    
    setShowBetModal(false);
    setSelectedCard(null);
    setSelectedPosition(null);
    setBetAmount(1);
  };

  // Filter functions
  const toggleType = (type: 'solo' | 'dual') => {
    setSelectedType(type);
  };

  const toggleStatus = (status: string) => {
    if (status === 'all') {
      setSelectedStatuses(['all']);
    } else {
      setSelectedStatuses(prev => {
        if (prev.includes('all')) {
          return prev.filter(s => s !== 'all').concat(status);
        } else if (prev.includes(status)) {
          const newStatuses = prev.filter(s => s !== status);
          return newStatuses.length === 0 ? ['all'] : newStatuses;
        } else {
          return prev.concat(status);
        }
      });
    }
  };

  // Filter cards based on selected type, category, and statuses
  const filteredCards = cardStack.filter(card => {
    const typeMatch = selectedType === card.type;
    const categoryMatch = selectedCategory === 'all' || selectedCategory === card.category;
    const statusMatch = selectedStatuses.includes('all') || selectedStatuses.includes(card.status);
    return typeMatch && categoryMatch && statusMatch;
  });

  // Early return AFTER all hooks are called
  if (!currentCard) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-900 via-green-800 to-blue-700">
        <div className="text-center max-w-md">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl mb-8"
          >
            🎲
          </motion.div>
          <h2 className="text-3xl mb-4 text-gray-800">
            All caught up!
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            You've reviewed all available betting opportunities. Check back soon for new predictions to explore.
          </p>
          <Button
            onClick={() => setCurrentCardIndex(0)}
            className="bg-white/30 backdrop-blur-sm text-gray-800 rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300/50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  const difficultyInfo = getDifficultyIcon(currentCard.difficulty);

  return (
    <div className="h-full bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 overflow-hidden">
      {/* Enhanced Header with Title Box */}
      <div className="relative p-6">
        <div className="max-w-6xl mx-auto">
          {/* Title Box similar to ChallengeArena */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-2 md:px-4"
          >
            <div className="relative bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-600/10" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <Trophy className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-4xl font-black text-white mb-2">Betting Arena</h1>
                    <p className="text-white/70 text-lg">Place your bets and win big</p>
                  </div>
                </div>
                
                {/* Stats in ChallengeArena style - no boxes */}
                <div className="flex items-center space-x-6 text-white/60">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{cardStack.reduce((sum, c) => sum + c.participants, 0).toLocaleString()} Players</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>{cardStack.length} Active Bets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>{cardStack.reduce((sum, c) => sum + c.pool, 0).toLocaleString()} Total Pool</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span>{userTokens.bettingCredits} Your Coins</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 px-2 md:px-4"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search with integrated filters - Header style */}
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 z-10" />
                    <input
                      type="text"
                      placeholder="Search betting challenges..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-20 py-2 w-full bg-slate-800/60 border border-cyan-400/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 transition-all duration-300 text-white placeholder-white/70 backdrop-blur-sm"
                    />
                    
                    {/* Category Dropdown inside search box */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <motion.button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 text-cyan-400 hover:text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-2">
                            {getCategoryIcon(selectedCategory)}
                          </span>
                          {selectedCategory === 'all' ? 'All' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </motion.button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-4 shadow-2xl z-50">
                        <DropdownMenuItem 
                          onClick={() => setSelectedCategory('all')}
                          className="hover:bg-slate-700 focus:bg-slate-700"
                        >
                          🌟 All Categories
                        </DropdownMenuItem>
                        {['crypto', 'tech', 'education', 'sports', 'science', 'finance', 'entertainment'].map((category) => (
                          <DropdownMenuItem 
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="hover:bg-slate-700 focus:bg-slate-700"
                          >
                            <span className="mr-2">{getCategoryIcon(category)}</span>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Type Toggle - Solo/Dual as toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedType === 'solo' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType('solo')}
                  className={`flex items-center space-x-1 ${
                    selectedType === 'solo'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg' 
                      : 'bg-slate-600/60 text-blue-200 border-blue-400/50 hover:bg-slate-600/80 hover:border-blue-300'
                  }`}
                >
                  <span>Solo</span>
                </Button>
                <Button
                  variant={selectedType === 'dual' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType('dual')}
                  className={`flex items-center space-x-1 ${
                    selectedType === 'dual'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg' 
                      : 'bg-slate-600/60 text-blue-200 border-blue-400/50 hover:bg-slate-600/80 hover:border-blue-300'
                  }`}
                >
                  <span>Dual</span>
                </Button>
              </div>

              {/* Status Filter - Live/Upcoming */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Status' },
                  { id: 'live', label: 'Live' },
                  { id: 'upcoming', label: 'Upcoming' }
                ].map((status) => (
                  <Button
                    key={status.id}
                    variant={selectedStatuses.includes(status.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleStatus(status.id)}
                    className={`flex items-center space-x-1 ${
                      selectedStatuses.includes(status.id) 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg' 
                        : 'bg-slate-600/60 text-blue-200 border-blue-400/50 hover:bg-slate-600/80 hover:border-blue-300'
                    }`}
                  >
                    <span className="capitalize">{status.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area with Masonry Grid */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <MasonryGrid minColumnWidth={300} gap={16} className="mb-8">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <BettingArenaCard
                  key={card.id}
                  card={card}
                  onBetClick={(card, position) => {
                    setSelectedCard(card);
                    setSelectedPosition(position);
                    setShowBetModal(true);
                  }}
                  onCardClick={(card) => {
                    setSelectedCard(card);
                    setShowCardModal(true);
                  }}
                  userTokens={userTokens}
                />
              </motion.div>
            ))}
          </MasonryGrid>
        </div>
      </div>

      {/* Enhanced Betting Modal */}
      <AnimatePresence>
        {showBetModal && selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setShowBetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-600/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cross Button */}
              <button
                onClick={() => setShowBetModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Place Your Bet
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedCard.title}
                </p>
              </div>

              <div className="space-y-6">
                {/* Position Selection */}
                <div>
                  <label className="block text-slate-200 mb-3 text-lg">
                    Your Position
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPosition('yes')}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedPosition === 'yes'
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-slate-600 hover:border-green-400 bg-slate-700/50'
                      }`}
                    >
                      <div className="text-2xl mb-1 text-green-400">
                        {selectedCard.odds.yes}x
                      </div>
                      <div className="text-sm text-green-400">YES</div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPosition('no')}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedPosition === 'no'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-slate-600 hover:border-red-400 bg-slate-700/50'
                      }`}
                    >
                      <div className="text-2xl mb-1 text-red-400">
                        {selectedCard.odds.no}x
                      </div>
                      <div className="text-sm text-red-400">NO</div>
                    </motion.button>
                  </div>
                </div>

                {/* Bet Amount */}
                <div>
                  <label className="block text-slate-200 mb-3 text-lg">
                    Bet Amount
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={[betAmount]}
                      onValueChange={(value: number[]) => setBetAmount(value[0])}
                      max={Math.min(userTokens.bettingCredits, selectedCard.maxBet)}
                      min={selectedCard.minBet}
                      step={selectedCard.minBet}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{selectedCard.minBet} min</span>
                      <span className="text-lg text-white">{betAmount} credits</span>
                      <span>{Math.min(userTokens.bettingCredits, selectedCard.maxBet)} max</span>
                    </div>
                  </div>
                </div>

                {/* Potential Winnings */}
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-2xl p-6 border border-slate-500/50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-300">Potential Win:</span>
                    <span className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {selectedPosition ? Math.floor(betAmount * selectedCard.odds[selectedPosition]) : 0} 🪙
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Your Credits:</span>
                    <span className="text-cyan-400">{userTokens.bettingCredits}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowBetModal(false)}
                    className="flex-1 rounded-2xl py-3 border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBet}
                    disabled={!selectedPosition || userTokens.bettingCredits < betAmount}
                    className={`flex-1 rounded-2xl py-3 text-white ${
                      selectedPosition === 'yes' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                        : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Place Bet
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Detail Modal */}
      <BettingArenaCardModal
        card={selectedCard}
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onBetClick={(card, position) => {
          setSelectedCard(card);
          setSelectedPosition(position);
          setShowCardModal(false);
          setShowBetModal(true);
        }}
        userTokens={userTokens}
      />
    </div>
  );
}
