import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Clock, Coins, Star, Bookmark, Share2, 
  Zap, Target, Sparkles, Calendar, TrendingUp, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { ChallengeSingle } from '../../config/rpg-system';
import { ShareModal } from '../ShareModal';

interface BettingCardProps {
  challenge: ChallengeSingle;
  userProgress: any;
  onBetYes?: (id: string, amount: number) => void;
  onBetNo?: (id: string, amount: number) => void;
  onSave?: (id: string) => void;
  onCardClick?: (id: string) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export const BettingCard: React.FC<BettingCardProps> = ({
  challenge,
  userProgress,
  onBetYes,
  onBetNo,
  onSave,
  onCardClick,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Variant configurations
  const variantConfig = {
    compact: {
      container: 'w-80 h-96',
      padding: 'p-4',
      titleSize: 'text-lg',
      imageHeight: 'h-32'
    },
    default: {
      container: 'w-96 h-[520px]',
      padding: 'p-5',
      titleSize: 'text-xl',
      imageHeight: 'h-40'
    },
    featured: {
      container: 'w-full h-[600px]',
      padding: 'p-8',
      titleSize: 'text-2xl',
      imageHeight: 'h-48'
    }
  };

  const config = variantConfig[variant];

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(challenge.id);
  };

  // Helper function to format time left
  const formatTimeLeft = (endTime: Date) => {
    // Using placeholder times instead of calculating real time
    const placeholderTimes = [
      '2h 15m',
      '5h 30m',
      '1d 3h',
      '8h 45m',
      '12h 20m',
      '1d 7h'
    ];
    const randomIndex = Math.floor(Math.random() * placeholderTimes.length);
    return placeholderTimes[randomIndex];
  };

  // Generate random realistic numbers for betting stats
  const generateBettingStats = () => {
    // Generate random total bets between 10 and 300
    const totalBets = Math.floor(Math.random() * 291) + 10; // 10 to 300
    
    // Generate random participants that's equal to or slightly more than total bets
    const participants = Math.floor(Math.random() * 50) + totalBets; // totalBets to totalBets + 50
    
    // Ensure total pool is significantly larger than total bets
    const totalPool = Math.floor(Math.random() * 5000) + totalBets * 10; // At least 10x total bets
    
    return { totalBets, participants, totalPool };
  };

  const bettingStats = generateBettingStats();

  return (
    <>
    <motion.div
      className={`relative ${config.container} cursor-pointer`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onCardClick?.(challenge.id)}
      whileHover={{ 
        scale: variant === 'compact' ? 1.02 : 1.03,
        y: -8
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-2xl shadow-cyan-500/40 opacity-0"
        animate={{ opacity: isHovered ? 0.6 : 0.2 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Card */}
      <div className="relative h-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.3 : 0.1
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content Container */}
        <div className={`relative h-full flex flex-col ${config.padding}`}>
          
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-purple-500/20 px-3 py-1.5 rounded-xl border border-purple-400/30 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-bold text-purple-300 capitalize">{challenge.category}</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isSaved 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); setIsShareOpen(true); }}
                className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Title and Description */}
          <div className="flex-1 mb-4">
            <h3 className={`${config.titleSize} font-black text-white mb-2 leading-tight`}>
              {challenge.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {challenge.description}
            </p>
          </div>

                      {/* Challenge Goal with Creator Profile */}
            <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-400/30">
              {/* Creator Info */}
              <div className="flex items-center space-x-3 mb-3 p-2 bg-white/5 rounded-lg">
                <Avatar className="w-8 h-8 border-2 border-cyan-400/50">
                  <img
                    src={challenge.creator?.avatar || '/images/avatar-ai-creator.jpg'}
                    alt={challenge.creator?.name || 'Creator'}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-white text-sm">{challenge.creator?.name || 'Alex Chen'}</div>
                  <div className="text-xs text-white/60">Level {challenge.creator?.level || 15} • Creator</div>
                </div>
              </div>
              
              {/* Challenge Goal */}
              <div>
                <h4 className="font-medium text-white mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-cyan-400" />
                  Challenge Goal
                </h4>
                <p className="text-white/80 text-sm">{challenge.challenge?.goal || 'Complete the challenge successfully'}</p>
              </div>
            </div>

          {/* Challenge Stats */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-lg font-bold text-white">
                  {bettingStats.participants}
                </span>
              </div>
              <p className="text-xs text-white/60">Participants</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-lg font-bold text-white">
                  {bettingStats.totalPool}
                </span>
              </div>
              <p className="text-xs text-white/60">Total Pool</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-lg font-bold text-white">
                  {bettingStats.totalBets}
                </span>
              </div>
              <p className="text-xs text-white/60">Total Bets</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-4 p-2 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">
                {formatTimeLeft(challenge.betting?.endTime || new Date())} left to place your bet!
              </span>
            </div>
          </div>

          {/* Betting Buttons */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-500/20 rounded-xl border border-green-400/30">
              <div className="text-2xl font-black text-green-400 mb-1">YES</div>
              <div className="text-lg font-bold text-green-300">{challenge.betting?.yesOdds || 1.5}x</div>
            </div>
            <div className="text-center p-3 bg-red-500/20 rounded-xl border border-red-400/30">
              <div className="text-2xl font-black text-red-400 mb-1">NO</div>
              <div className="text-lg font-bold text-red-300">{challenge.betting?.noOdds || 2.0}x</div>
            </div>
          </div>

        </div>

        {/* Subtle animated glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)',
              'radial-gradient(circle at 60% 40%, rgba(139,92,246,0.08) 0%, transparent 70%)',
              'radial-gradient(circle at 40% 60%, rgba(0,212,255,0.07) 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>

    {/* Share Modal */}
    <ShareModal
      isOpen={isShareOpen}
      onClose={() => setIsShareOpen(false)}
      challengeId={challenge.id}
      challengeTitle={challenge.title}
      challengeType="betting"
      challengeData={{
        category: challenge.category,
        creator: challenge.creator.name,
        action: challenge.challenge.goal
      }}
    />
  </>
  );
};
