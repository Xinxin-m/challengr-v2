import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import {
  Play, Users, Clock, Coins, Zap, Trophy, Star,
  Sword, Shield, Target, Flame, Crown, Gem,
  Calendar, MapPin, Eye, Heart, Share2, Bookmark,
  ChevronRight, Award, Medal, Sparkles
} from 'lucide-react';
import { Challenge, UserRPGProgress } from '../../types/rpg-system';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { ParticleSystem, CombatEffect, MagicEffect, LegendaryEffect } from '../effects/ParticleSystem';

interface CinematicChallengeCardProps {
  challenge: Challenge;
  userProgress: UserRPGProgress;
  onAccept?: (challengeId: string) => void;
  onReject?: (challengeId: string) => void;
  onSave?: (challengeId: string) => void;
  onShare?: (challengeId: string) => void;
  onViewDetails?: (challengeId: string) => void;
  variant?: 'default' | 'compact' | 'hero' | 'featured';
  showParticles?: boolean;
  className?: string;
}

// Difficulty configurations with visual themes
const DIFFICULTY_CONFIG = {
  beginner: {
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-green-500/20',
    border: 'border-emerald-400/50',
    glow: '0 0 15px rgba(16, 185, 129, 0.3)',
    icon: Target,
    label: 'Beginner',
    particles: 'peaceful',
  },
  intermediate: {
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-400/50',
    glow: '0 0 20px rgba(59, 130, 246, 0.4)',
    icon: Sword,
    label: 'Intermediate',
    particles: 'magic',
  },
  advanced: {
    color: '#8b5cf6',
    gradient: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-400/50',
    glow: '0 0 25px rgba(139, 92, 246, 0.5)',
    icon: Crown,
    label: 'Advanced',
    particles: 'combat',
  },
  expert: {
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-400/50',
    glow: '0 0 30px rgba(245, 158, 11, 0.6)',
    icon: Flame,
    label: 'Expert',
    particles: 'legendary',
  },
  legendary: {
    color: '#ffd700',
    gradient: 'from-yellow-500/30 to-gold-500/30',
    border: 'border-yellow-400/70',
    glow: '0 0 40px rgba(255, 215, 0, 0.8)',
    icon: Star,
    label: 'LEGENDARY',
    particles: 'legendary',
  },
};

// Challenge type configurations
const TYPE_CONFIG = {
  solo: { icon: Target, label: 'Solo Quest', color: '#06b6d4' },
  multiplayer: { icon: Users, label: 'Multiplayer', color: '#8b5cf6' },
  tournament: { icon: Trophy, label: 'Tournament', color: '#f59e0b' },
  raid: { icon: Sword, label: 'Raid Battle', color: '#ef4444' },
  guild: { icon: Shield, label: 'Guild Quest', color: '#10b981' },
};

export function CinematicChallengeCard({
  challenge,
  userProgress,
  onAccept,
  onReject,
  onSave,
  onShare,
  onViewDetails,
  variant = 'default',
  showParticles = true,
  className = '',
}: CinematicChallengeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAcceptEffect, setShowAcceptEffect] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const difficultyConfig = DIFFICULTY_CONFIG[challenge.difficulty as keyof typeof DIFFICULTY_CONFIG] || DIFFICULTY_CONFIG.intermediate;
  const typeConfig = TYPE_CONFIG[challenge.type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.solo;

  // Handle mouse move for 3D effect
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Calculate participation percentage
  const participationPercentage = (challenge.participants / challenge.maxParticipants) * 100;

  // Check if user can afford the challenge
  const canAfford = userProgress.dailyCoins >= challenge.entryCost;

  // Handle accept challenge
  const handleAccept = () => {
    if (!canAfford) return;
    
    setShowAcceptEffect(true);
    onAccept?.(challenge.id);
    
    setTimeout(() => setShowAcceptEffect(false), 2000);
  };

  // Format time remaining
  const formatTimeRemaining = () => {
    const now = new Date();
    const start = new Date(challenge.startTime);
    const diff = start.getTime() - now.getTime();
    
    if (diff <= 0) return 'Starting now';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Variant-specific configurations
  const variantConfig = {
    default: { width: 'w-96', height: 'h-auto', padding: 'p-6' },
    compact: { width: 'w-80', height: 'h-auto', padding: 'p-4' },
    hero: { width: 'w-full max-w-2xl', height: 'h-auto', padding: 'p-8' },
    featured: { width: 'w-full max-w-4xl', height: 'h-auto', padding: 'p-10' },
  };

  const config = variantConfig[variant];

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative ${config.width} ${config.height} mx-auto
        cursor-pointer select-none group
        ${className}
      `}
      style={{
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 3D Card Container */}
      <motion.div
        className={`
          relative w-full h-full rounded-3xl overflow-hidden
          bg-gradient-to-br ${difficultyConfig.gradient}
          backdrop-blur-xl ${difficultyConfig.border}
          border-2 transition-all duration-500
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? difficultyConfig.glow : 'none',
        }}
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-full object-cover"
            style={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/60" />
        </div>

        {/* Content Container */}
        <div className={`relative ${config.padding} h-full flex flex-col justify-between z-10`}>
          {/* Header Section */}
          <div className="space-y-4">
            {/* Challenge Type & Difficulty */}
            <div className="flex items-center justify-between">
              <Badge 
                className={`
                  px-3 py-1 bg-black/60 backdrop-blur-xl
                  border border-white/20 text-white font-semibold
                `}
              >
                <typeConfig.icon className="w-4 h-4 mr-2" />
                {typeConfig.label}
              </Badge>

              <Badge 
                className="px-3 py-1 font-bold text-black border-2"
                style={{ 
                  backgroundColor: difficultyConfig.color,
                  borderColor: difficultyConfig.color,
                  boxShadow: `0 0 15px ${difficultyConfig.color}40`,
                }}
              >
                <difficultyConfig.icon className="w-4 h-4 mr-2" />
                {difficultyConfig.label}
              </Badge>
            </div>

            {/* Title & Description */}
            <div>
              <motion.h3 
                className="text-2xl font-bold text-white mb-3 leading-tight"
                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {challenge.title}
              </motion.h3>
              
              <p className="text-white/80 leading-relaxed text-sm line-clamp-3">
                {challenge.description}
              </p>
            </div>

            {/* Challenge Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Participants */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/70 text-xs font-medium">Players</span>
                </div>
                <div className="text-cyan-400 font-bold">
                  {challenge.participants.toLocaleString()}
                </div>
                <Progress 
                  value={participationPercentage} 
                  className="h-1 mt-2 bg-white/20"
                />
              </div>

              {/* Duration */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-white/70 text-xs font-medium">Duration</span>
                </div>
                <div className="text-amber-400 font-bold">
                  {challenge.duration}min
                </div>
              </div>

              {/* Entry Cost */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/70 text-xs font-medium">Entry</span>
                </div>
                <div className={`font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                  {challenge.entryCost.toLocaleString()}
                </div>
              </div>

              {/* Rewards */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span className="text-white/70 text-xs font-medium">XP</span>
                </div>
                <div className="text-purple-400 font-bold">
                  +{challenge.rewards.xp.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 bg-white/10 backdrop-blur-xl rounded-full text-white/80 text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4 mt-6">
            {/* Time and Location */}
            <div className="flex items-center justify-between text-white/70 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Starts {formatTimeRemaining()}</span>
              </div>
              {challenge.realWorldConnection && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Real World</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleAccept}
                disabled={!canAfford}
                className={`
                  flex-1 h-12 font-semibold text-lg transition-all duration-300
                  ${canAfford 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white' 
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }
                  rounded-xl border border-white/20
                `}
                style={{
                  boxShadow: canAfford && isHovered ? '0 0 25px rgba(0, 212, 255, 0.5)' : 'none',
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                {canAfford ? 'Accept Challenge' : 'Insufficient Coins'}
              </Button>

              {/* Secondary Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsBookmarked(!isBookmarked);
                    onSave?.(challenge.id);
                  }}
                  className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-white/10"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-yellow-400 fill-current' : 'text-white/70'}`} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShare?.(challenge.id)}
                  className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-white/10"
                >
                  <Share2 className="w-5 h-5 text-white/70" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails?.(challenge.id)}
                  className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-white/10"
                >
                  <Eye className="w-5 h-5 text-white/70" />
                </Button>
              </div>
            </div>

            {/* Creator Attribution */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {challenge.createdBy.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white/70 text-sm">Created by {challenge.createdBy}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-white/70 text-sm">
                <Heart className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <AnimatePresence>
          {isHovered && (
            <>
              {/* Glow Orbs */}
              <motion.div
                className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-30"
                style={{ backgroundColor: difficultyConfig.color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div
                className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-20"
                style={{ backgroundColor: typeConfig.color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Particle Effects */}
        {showParticles && isHovered && (
          <ParticleSystem
            config={{
              count: 10,
              lifetime: 3000,
              size: { min: 1, max: 4 },
              speed: { min: 20, max: 60 },
              color: [difficultyConfig.color],
              opacity: { start: 0.8, end: 0 },
              shape: 'circle',
              gravity: -0.05,
              wind: 0.02,
              emission: 'continuous',
              blendMode: 'screen',
            }}
            trigger={isHovered}
            intensity="low"
            className="pointer-events-none"
          />
        )}

        {/* Accept Effect */}
        {showAcceptEffect && (
          <LegendaryEffect 
            trigger={showAcceptEffect}
            position={{ x: 200, y: 150 }}
          />
        )}

        {/* Status Indicators */}
        {challenge.status === 'full' && (
          <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-xl rounded-full px-3 py-1 border border-red-400/50">
            <span className="text-white text-sm font-semibold">FULL</span>
          </div>
        )}

        {challenge.difficulty === 'legendary' && (
          <motion.div
            className="absolute -top-2 -right-2 w-12 h-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-full h-full text-yellow-400 filter drop-shadow-lg" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Preset challenge card variants
export const CompactChallengeCard: React.FC<{
  challenge: Challenge;
  userProgress: UserRPGProgress;
  onAccept?: (id: string) => void;
}> = ({ challenge, userProgress, onAccept }) => (
  <CinematicChallengeCard
    challenge={challenge}
    userProgress={userProgress}
    onAccept={onAccept}
    variant="compact"
    showParticles={false}
  />
);

export const HeroChallengeCard: React.FC<{
  challenge: Challenge;
  userProgress: UserRPGProgress;
  onAccept?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}> = ({ challenge, userProgress, onAccept, onViewDetails }) => (
  <CinematicChallengeCard
    challenge={challenge}
    userProgress={userProgress}
    onAccept={onAccept}
    onViewDetails={onViewDetails}
    variant="hero"
    showParticles={true}
  />
);

export const FeaturedChallengeCard: React.FC<{
  challenge: Challenge;
  userProgress: UserRPGProgress;
  onAccept?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onShare?: (id: string) => void;
}> = ({ challenge, userProgress, onAccept, onViewDetails, onShare }) => (
  <CinematicChallengeCard
    challenge={challenge}
    userProgress={userProgress}
    onAccept={onAccept}
    onViewDetails={onViewDetails}
    onShare={onShare}
    variant="featured"
    showParticles={true}
  />
);