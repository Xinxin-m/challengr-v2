import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Clock, Coins, Star, Bookmark, Share2, 
  Zap, Target, Sparkles, Calendar, TrendingUp, Shield, Sword, Trophy
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { ChallengeDouble } from '../../types/rpg-system';

interface BattleCardProps {
  challenge: ChallengeDouble;
  userProgress: any;
  onBetBlue?: (id: string, amount: number) => void;
  onBetRed?: (id: string, amount: number) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  onCardClick?: (id: string) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export const BattleCard: React.FC<BattleCardProps> = ({
  challenge,
  userProgress,
  onBetBlue,
  onBetRed,
  onSave,
  onShare,
  onCardClick,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [betAmount, setBetAmount] = useState(10);

  // Variant configurations
  const variantConfig = {
    compact: {
      container: 'w-80 h-96',
      padding: 'p-4',
      titleSize: 'text-lg',
      imageHeight: 'h-32'
    },
    default: {
      container: 'w-96 h-[540px]',
      padding: 'p-5',
      titleSize: 'text-xl',
      imageHeight: 'h-40'
    },
    featured: {
      container: 'w-full h-[640px]',
      padding: 'p-8',
      titleSize: 'text-2xl',
      imageHeight: 'h-48'
    }
  };

  const config = variantConfig[variant];
  const canAfford = userProgress.dailyCoins >= betAmount;

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(challenge.id);
  };

  const handleBetBlue = () => {
    if (canAfford) {
      onBetBlue?.(challenge.id, betAmount);
    }
  };

  const handleBetRed = () => {
    if (canAfford) {
      onBetRed?.(challenge.id, betAmount);
    }
  };

  // Helper function to format time left
  const formatTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}H`;
    return `${Math.floor(minutes / 1440)}D`;
  };

  return (
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
            {/* Type & Category Badges */}
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-cyan-500/20 px-3 py-1.5 rounded-xl border border-cyan-400/30 shadow-lg"
              >
                <Target className="w-4 h-4 text-cyan-300" />
                <span className="text-sm font-bold text-cyan-300 capitalize">{challenge.type}</span>
              </motion.div>
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
                onClick={() => onShare?.(challenge.id)}
                className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Title and Description */}
          <div className="mb-4">
            <h3 className={`${config.titleSize} font-black text-white mb-2 leading-tight`}>
              {challenge.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {challenge.description}
            </p>
          </div>

          {/* Challenge Goal */}
          <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-400/30">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-cyan-400" />
              Battle Goal
            </h4>
            <p className="text-white/80 text-sm">{challenge.challenge.goal}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{challenge.challenge.timeLimit}min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{challenge.totalParticipants} betting</span>
              </div>
            </div>
          </div>

          {/* Battle Participants */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* Blue Player */}
            <div className="text-center p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <div className="w-16 h-16 mx-auto mb-2">
                <Avatar className="w-full h-full border-2 border-blue-400">
                  <img
                    src={challenge.participants.blue.avatar}
                    alt={challenge.participants.blue.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              </div>
              <div className="font-bold text-blue-300 text-sm mb-1">{challenge.participants.blue.name}</div>
              <div className="text-xs text-blue-200 mb-2">Level {challenge.participants.blue.level}</div>
              <div className="text-lg font-bold text-blue-400">{challenge.participants.blue.odds}x</div>
              <div className="text-xs text-blue-300">Odds</div>
              <div className="text-xs text-white/60 mt-1">${challenge.participants.blue.totalBets}</div>
            </div>

            {/* Red Player */}
            <div className="text-center p-3 bg-red-500/20 rounded-xl border border-red-400/30">
              <div className="w-16 h-16 mx-auto mb-2">
                <Avatar className="w-full h-full border-2 border-red-400">
                  <img
                    src={challenge.participants.red.avatar}
                    alt={challenge.participants.red.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              </div>
              <div className="font-bold text-red-300 text-sm mb-1">{challenge.participants.red.name}</div>
              <div className="text-xs text-red-200 mb-2">Level {challenge.participants.red.level}</div>
              <div className="text-lg font-bold text-red-400">{challenge.participants.red.odds}x</div>
              <div className="text-xs text-red-300">Odds</div>
              <div className="text-xs text-white/60 mt-1">${challenge.participants.red.totalBets}</div>
            </div>
          </div>

          {/* VS Badge */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-full text-white font-bold text-lg shadow-lg">
              VS
            </div>
          </div>

          {/* Betting Controls */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-xs text-white/60">Bet Amount:</label>
              <input
                type="range"
                min={challenge.betting.minBet}
                max={challenge.betting.maxBet}
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-white font-medium">${betAmount}</span>
            </div>
          </div>

          {/* Betting Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleBetBlue}
              disabled={!canAfford}
              className="flex-1 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold border-0 shadow-lg"
            >
              <Shield className="w-4 h-4 mr-2" />
              Bet Blue (${challenge.participants.blue.odds}x)
            </Button>
            <Button
              onClick={handleBetRed}
              disabled={!canAfford}
              className="flex-1 h-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold border-0 shadow-lg"
            >
              <Sword className="w-4 h-4 mr-2" />
              Bet Red (${challenge.participants.red.odds}x)
            </Button>
          </div>

          {/* Time Left */}
          <div className="mt-3 text-center">
            <div className="text-xs text-white/60">
              <Clock className="w-3 h-3 inline mr-1" />
              Betting ends in {formatTimeLeft(challenge.betting.endTime)}
            </div>
            {challenge.eventTime && (
              <div className="text-xs text-white/60 mt-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                Battle starts {challenge.eventTime.toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Insufficient Funds Warning */}
          {!canAfford && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-red-500/20 border border-red-400/30 rounded-xl"
            >
              <p className="text-red-400 text-sm text-center">
                <Coins className="w-4 h-4 inline mr-1" />
                Insufficient coins. Need ${betAmount} to place bet!
              </p>
            </motion.div>
          )}
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
  );
};
