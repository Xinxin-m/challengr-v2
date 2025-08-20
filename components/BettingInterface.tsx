import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  Heart, X, Star, TrendingUp, Clock, Users, Zap, 
  ChevronUp, ChevronDown, RotateCcw, Info, Trophy,
  Flame, Target, DollarSign, ArrowUp, ArrowDown, Sparkles,
  MessageSquare, Share2, BookOpen, Gamepad2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';

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
}

interface BettingInterfaceProps {
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

export function BettingInterface({
  userTokens,
  onTokenEarn,
  onBettingWin,
  winStreak,
  membershipTier
}: BettingInterfaceProps) {
  // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL - NO CONDITIONAL HOOKS
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [showBetModal, setShowBetModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<'yes' | 'no' | null>(null);
  const [selectedCard, setSelectedCard] = useState<BettingCardData | null>(null);
  const [cardStack, setCardStack] = useState<BettingCardData[]>([]);

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

  // Enhanced mock betting data with more variety
  const mockBettingCards: BettingCardData[] = [
    {
      id: '1',
      title: 'Bitcoin will reach $100K by end of 2024',
      description: 'Based on current market trends, institutional adoption, and the upcoming halving event, will Bitcoin break the $100,000 barrier before 2025?',
      category: 'crypto',
      odds: { yes: 2.4, no: 1.6 },
      pool: 15420,
      participants: 342,
      timeLeft: '15d 4h 23m',
      endDate: new Date('2024-12-31'),
      difficulty: 'medium',
      minBet: 1,
      maxBet: 100,
      tags: ['bitcoin', 'price-prediction', 'halving'],
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
      shareCount: 23
    },
    {
      id: '2',
      title: 'AI will achieve AGI breakthrough in 2024',
      description: 'Will any major tech company (OpenAI, Google, Anthropic, etc.) announce achieving Artificial General Intelligence capabilities this year?',
      category: 'tech',
      odds: { yes: 3.2, no: 1.3 },
      pool: 8750,
      participants: 156,
      timeLeft: '45d 12h 15m',
      endDate: new Date('2024-12-31'),
      difficulty: 'hard',
      minBet: 2,
      maxBet: 50,
      tags: ['AI', 'AGI', 'technology', 'breakthrough'],
      creator: {
        name: 'TechOracle',
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
      shareCount: 18
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
      shareCount: 34
    },
    {
      id: '4',
      title: 'Ethereum ETF approval by SEC in Q1 2024',
      description: 'Will the SEC approve a spot Ethereum ETF before March 31st, 2024, following the Bitcoin ETF precedent?',
      category: 'crypto',
      odds: { yes: 2.1, no: 1.7 },
      pool: 22150,
      participants: 445,
      timeLeft: '2d 16h 30m',
      endDate: new Date('2024-03-31'),
      difficulty: 'expert',
      minBet: 5,
      maxBet: 200,
      tags: ['ethereum', 'ETF', 'SEC', 'regulation'],
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
      shareCount: 45
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
      shareCount: 12
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

  // Early return AFTER all hooks are called
  if (!currentCard) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
          <h2 className="text-3xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            All caught up!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            You've reviewed all available betting opportunities. Check back soon for new predictions to explore.
          </p>
          <Button
            onClick={() => setCurrentCardIndex(0)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
    <div className="h-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Enhanced Header */}
      <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <div className="relative p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Stats Display */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl mb-1 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {userTokens.bettingCredits}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Credits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-500 mr-2" />
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {winStreak}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Win Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {userTokens.goldCoins.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Gold Coins</div>
              </div>
            </div>

            {/* Membership Badge */}
            <div className="flex items-center space-x-4">
              <Badge className={`px-4 py-2 rounded-full text-sm ${
                membershipTier === 'free' 
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' 
                  : membershipTier === 'basic'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  : membershipTier === 'premium'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
              }`}>
                {membershipTier === 'free' ? '🆓 Free' : 
                 membershipTier === 'basic' ? '⭐ Basic' :
                 membershipTier === 'premium' ? '👑 Premium' : '💎 Ultimate'}
              </Badge>
              
              {/* Progress Indicator */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentCardIndex + 1} of {cardStack.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card Area */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="relative w-full max-w-lg">
          {/* Background Cards Stack Effect */}
          {cardStack.slice(currentCardIndex + 1, currentCardIndex + 3).map((card, index) => (
            <motion.div
              key={`background-${card.id}-${index}`}
              className="absolute inset-0 w-full"
              initial={{ 
                scale: 0.95 - index * 0.05, 
                y: index * 8,
                opacity: 0.6 - index * 0.2
              }}
              animate={{ 
                scale: 0.95 - index * 0.05, 
                y: index * 8,
                opacity: 0.6 - index * 0.2
              }}
              style={{ zIndex: -index - 1 }}
            >
              <Card className="w-full h-[700px] bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 to-gray-900" />
              </Card>
            </motion.div>
          ))}

          {/* Main Interactive Card */}
          <motion.div
            ref={cardRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ 
              x: springX, 
              y: springY, 
              rotate, 
              opacity,
              cursor: 'grab'
            }}
            whileDrag={{ 
              scale: 1.05,
              cursor: 'grabbing',
              zIndex: 50
            }}
            className="relative z-10 select-none"
          >
            <Card className="w-full h-[700px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Card Image Header */}
              {currentCard.image && (
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(currentCard.category)} opacity-90`}></div>
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Row - Badges */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 rounded-full px-3 py-1">
                          <span className="mr-1">{getCategoryIcon(currentCard.category)}</span>
                          {currentCard.category.toUpperCase()}
                        </Badge>
                        <Badge className={`bg-white/20 backdrop-blur-sm text-white border-white/30 rounded-full px-3 py-1`}>
                          <span className="mr-1">{difficultyInfo.icon}</span>
                          {currentCard.difficulty.toUpperCase()}
                        </Badge>
                        {currentCard.trending && (
                          <Badge className="bg-red-500/80 backdrop-blur-sm text-white border-red-400/50 rounded-full px-3 py-1">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            TRENDING
                          </Badge>
                        )}
                        {currentCard.aiGenerated && (
                          <Badge className="bg-purple-500/80 backdrop-blur-sm text-white border-purple-400/50 rounded-full px-3 py-1">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      
                      {currentCard.onChain && (
                        <Badge className="bg-blue-500/80 backdrop-blur-sm text-white border-blue-400/50 rounded-full px-3 py-1">
                          ⛓️ On-Chain
                        </Badge>
                      )}
                    </div>

                    {/* Bottom Row - Stats */}
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{currentCard.timeLeft}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{currentCard.participants}</span>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        💰 {currentCard.pool.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <CardContent className="p-6 space-y-6 h-[calc(100%-12rem)] overflow-y-auto">
                {/* Title and Description */}
                <div className="space-y-4">
                  <h3 className="text-2xl leading-tight text-gray-900 dark:text-white">
                    {currentCard.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {currentCard.description}
                  </p>
                </div>

                {/* Odds Display */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200/50 dark:border-green-800/50"
                  >
                    <div className="text-3xl mb-2 text-green-600 dark:text-green-400">
                      {currentCard.odds.yes}x
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center mb-2">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      YES
                    </div>
                    <div className="text-xs text-green-600/70 dark:text-green-400/70">
                      {currentCard.votes.yes} votes
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 text-center border border-red-200/50 dark:border-red-800/50"
                  >
                    <div className="text-3xl mb-2 text-red-600 dark:text-red-400">
                      {currentCard.odds.no}x
                    </div>
                    <div className="text-sm text-red-600 dark:text-red-400 flex items-center justify-center mb-2">
                      <ArrowDown className="w-4 h-4 mr-1" />
                      NO
                    </div>
                    <div className="text-xs text-red-600/70 dark:text-red-400/70">
                      {currentCard.votes.no} votes
                    </div>
                  </motion.div>
                </div>

                {/* Creator Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/30">
                  <img
                    src={currentCard.creator.avatar}
                    alt={currentCard.creator.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 dark:text-white">{currentCard.creator.name}</span>
                      {currentCard.creator.verified && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full px-2 py-0.5">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Level {currentCard.creator.level} • Creator
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/30">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">{currentCard.discussionCount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{currentCard.shareCount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">Research</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentCard.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs rounded-full px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Swipe Indicators */}
        <motion.div
          className="absolute left-8 top-1/2 transform -translate-y-1/2"
          style={{ opacity: leftOpacity }}
        >
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <X size={32} className="text-white" />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
          style={{ opacity: rightOpacity }}
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Heart size={32} className="text-white" />
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            x.set(-400);
            setTimeout(() => {
              if (currentCard) {
                handleCardSwipe('left', currentCard);
              }
            }, 200);
          }}
          className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300"
        >
          <X size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Skip/Info action
            nextCard();
          }}
          className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        >
          <Info size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            x.set(400);
            setTimeout(() => {
              if (currentCard) {
                handleCardSwipe('right', currentCard);
              }
            }, 200);
          }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300"
        >
          <Heart size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Super like action
            if (currentCard) {
              setSelectedCard(currentCard);
              setSelectedPosition('yes');
              setBetAmount(Math.min(10, userTokens.bettingCredits));
              setShowBetModal(true);
            }
          }}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        >
          <Star size={16} />
        </motion.button>
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
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 dark:border-gray-700/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Place Your Bet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {selectedCard.title}
                </p>
              </div>

              <div className="space-y-6">
                {/* Position Selection */}
                <div>
                  <label className="block text-gray-900 dark:text-white mb-3 text-lg">
                    Your Position
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPosition('yes')}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedPosition === 'yes'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                      }`}
                    >
                      <div className="text-2xl mb-1 text-green-600 dark:text-green-400">
                        {selectedCard.odds.yes}x
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">YES</div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPosition('no')}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedPosition === 'no'
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                      }`}
                    >
                      <div className="text-2xl mb-1 text-red-600 dark:text-red-400">
                        {selectedCard.odds.no}x
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-400">NO</div>
                    </motion.button>
                  </div>
                </div>

                {/* Bet Amount */}
                <div>
                  <label className="block text-gray-900 dark:text-white mb-3 text-lg">
                    Bet Amount
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={[betAmount]}
                      onValueChange={(value) => setBetAmount(value[0])}
                      max={Math.min(userTokens.bettingCredits, selectedCard.maxBet)}
                      min={selectedCard.minBet}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{selectedCard.minBet} min</span>
                      <span className="text-lg text-gray-900 dark:text-white">{betAmount} credits</span>
                      <span>{Math.min(userTokens.bettingCredits, selectedCard.maxBet)} max</span>
                    </div>
                  </div>
                </div>

                {/* Potential Winnings */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 dark:text-gray-400">Potential Win:</span>
                    <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {selectedPosition ? Math.floor(betAmount * selectedCard.odds[selectedPosition]) : 0} 🪙
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Your Credits:</span>
                    <span className="text-blue-600 dark:text-blue-400">{userTokens.bettingCredits}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowBetModal(false)}
                    className="flex-1 rounded-2xl py-3 border-2"
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
    </div>
  );
}