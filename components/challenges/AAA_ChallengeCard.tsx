import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Users, Clock, Coins, Trophy, Star, Bookmark, Share2, 
  Zap, Target, Sparkles, Calendar, Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface AAA_ChallengeCardProps {
  challenge: any;
  userProgress: any;
  onAccept?: (id: string) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onCardClick?: (id: string) => void;
  variant?: 'default' | 'featured' | 'compact' | 'hero';
  showParticles?: boolean;
}

export const AAA_ChallengeCard: React.FC<AAA_ChallengeCardProps> = ({
  challenge,
  userProgress = { dailyCoins: 100 },
  onAccept,
  onSave,
  onShare,
  onViewDetails,
  onCardClick,
  variant = 'default',
  showParticles = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Unified styling across all challenge cards
  const unifiedBorder = 'border border-white/10';

  // Variant Configurations
  const variantConfig = {
    compact: {
      container: 'w-full max-w-76 h-44',
      padding: 'p-3',
      titleSize: 'text-base',
      imageHeight: 'h-20'
    },
    default: {
      container: 'w-full max-w-84 h-60',
      padding: 'p-4',
      titleSize: 'text-lg',
      imageHeight: 'h-28'
    },
    featured: {
      container: 'w-full max-w-88 h-68',
      padding: 'p-6',
      titleSize: 'text-xl',
      imageHeight: 'h-32'
    },
    hero: {
      container: 'w-full max-w-96 h-80',
      padding: 'p-8',
      titleSize: 'text-2xl',
      imageHeight: 'h-40'
    }
  };

  const config = variantConfig[variant];
  
  // Add safety checks for challenge properties
  const safeChallenge = {
    id: challenge?.id || 'unknown',
    title: challenge?.title || 'Untitled Challenge',
    description: challenge?.description || 'No description available',
    type: challenge?.type || 'challenge',
    category: challenge?.category || 'general',
    participants: challenge?.participants || 0,
    timeLimit: challenge?.timeLimit || 60,
    entryCost: challenge?.entryCost || 0,
    rewards: challenge?.rewards || { xp: 100, equipment: [] }
  };
  
  // Early return if challenge is completely invalid
  if (!challenge || typeof challenge !== 'object') {
    return (
      <div className={`${config.container} bg-slate-800/50 rounded-3xl p-4 flex items-center justify-center`}>
        <p className="text-white/60 text-center">Invalid Challenge Data</p>
      </div>
    );
  }
  
  const canAfford = userProgress?.dailyCoins >= safeChallenge.entryCost;

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(safeChallenge.id);
  };

  // Helper function to format time left
  const formatTimeLeft = (minutes: number) => {
    if (!minutes || minutes <= 0) return '0min';
    if (minutes < 60) return `${Math.floor(minutes)}min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}H`;
    return `${Math.floor(minutes / 1440)}D`;
  };

  return (
    <motion.div
      className={`relative ${config.container} cursor-pointer`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onCardClick?.(safeChallenge.id)}
      whileHover={{ 
        scale: variant === 'compact' ? 1.015 : 1.02,
        y: -6
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
      <div className={`relative h-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl ${unifiedBorder} rounded-3xl overflow-hidden shadow-2xl`}>
        
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
            <div className="flex items-center gap-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 bg-cyan-500/20 px-2 py-1 rounded-lg border border-cyan-400/30 shadow-lg"
              >
                <Target className="w-3 h-3 text-cyan-300" />
                <span className="text-xs font-medium text-cyan-300 capitalize">{safeChallenge.type}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 bg-purple-500/20 px-2 py-1 rounded-lg border border-purple-400/30 shadow-lg"
              >
                <Sparkles className="w-3 h-3 text-purple-300" />
                <span className="text-xs font-medium text-purple-300 capitalize">{safeChallenge.category}</span>
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
                onClick={() => onShare?.(safeChallenge.id)}
                className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Challenge Image/Icon - Removed for cleaner design */}
          <div className="h-2"></div>

          {/* Title and Description */}
          <div className="flex-1 mb-4">
            <h3 className={`${config.titleSize} font-black text-white mb-2 leading-tight`}>
              {safeChallenge.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {safeChallenge.description}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-white/60">
                <Users className="w-4 h-4" />
                <span>{(safeChallenge.participants || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-white/60">
                <Calendar className="w-4 h-4" />
                <span>{formatTimeLeft(safeChallenge.timeLimit)} left</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80 font-medium">4.8</span>
              </div>
            </div>
          </div>

          {/* Rewards Display */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm">{safeChallenge.entryCost === 0 ? 'Free' : safeChallenge.entryCost}</span>
              </div>
              <div className="flex items-center space-x-1 bg-cyan-500/20 px-2 py-1 rounded-lg">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-sm">{safeChallenge.rewards.xp}</span>
              </div>
              {safeChallenge.rewards.equipment && safeChallenge.rewards.equipment.length > 0 && (
                <div className="flex items-center space-x-1 bg-purple-500/20 px-2 py-1 rounded-lg">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-bold text-sm">Epic Gear</span>
                </div>
              )}
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

      {/* Hover Glow Particles */}
      <AnimatePresence>
        {isHovered && showParticles && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/80 rounded-full"
                animate={{
                  y: [0, -50, 0],
                  x: [0, Math.cos(i * 45) * 30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  left: `${10 + (i % 4) * 25}%`,
                  top: `${20 + Math.floor(i / 4) * 60}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};