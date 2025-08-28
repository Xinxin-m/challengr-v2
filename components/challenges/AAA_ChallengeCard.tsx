import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Users, Clock, Coins, Trophy, Star, Bookmark, Share2, 
  Zap, Target, Sparkles, Calendar, Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShareModal } from '../ShareModal';

// Image mapping for different challenge categories
const categoryImages = {
  fitness: '/src/assets/fitness.jpg',
  coding: '/src/assets/coding.jpg',
  meditation: '/src/assets/meditation.jpg',
  cooking: '/src/assets/cooking prep.jpg',
  drawing: '/src/assets/drawing.jpg',
  photography: '/src/assets/travel photography.jpg',
  startup: '/src/assets/startup.jpg',
  journaling: '/src/assets/bullet journal.jpg',
  dance: '/src/assets/challenge-dance.jpg',
  iq: '/src/assets/challenge-iq.jpg',
  default: '/src/assets/hero-banner.jpg'
};

interface AAA_ChallengeCardProps {
  challenge: any;
  userProgress: any;
  onAccept?: (id: string) => void;
  onSave?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onCardClick?: (id: string) => void;
  variant?: 'default' | 'featured' | 'compact' | 'hero';
  showParticles?: boolean;
  uniformSize?: boolean; // New prop for uniform sizing
  showThumbnail?: boolean; // New prop for showing thumbnail image
}

export const AAA_ChallengeCard: React.FC<AAA_ChallengeCardProps> = ({
  challenge,
  userProgress = { dailyCoins: 100 },
  onAccept,
  onSave,
  onViewDetails,
  onCardClick,
  variant = 'default',
  showParticles = true,
  uniformSize = true, // Default to uniform sizing
  showThumbnail = true // Default to showing thumbnail image
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Unified styling across all challenge cards
  const unifiedBorder = 'border border-white/10';

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
    rewards: challenge?.rewards || { xp: 100, equipment: [] },
    thumbnail: challenge?.thumbnail,
    creators: challenge?.creators || ['Anonymous User']
  };

  // Get relevant image for the challenge category
  const getCategoryImage = () => {
    const category = safeChallenge.category.toLowerCase();
    return categoryImages[category as keyof typeof categoryImages] || categoryImages.default;
  };

  // Check if image should be displayed and is valid
  const hasValidImage = showThumbnail && (safeChallenge.thumbnail || getCategoryImage()) && !imageError;

  // Variant Configurations - dynamic sizing based on image presence and uniformSize prop
  const variantConfig = {
    compact: {
      container: uniformSize ? 'w-full max-w-80 h-80' : hasValidImage ? 'w-full max-w-80 min-h-80' : 'w-full max-w-80',
      padding: 'p-3',
      titleSize: 'text-base',
      imageHeight: 'h-20'
    },
    default: {
      container: uniformSize ? 'w-full max-w-88 h-96' : hasValidImage ? 'w-full max-w-88 min-h-96' : 'w-full max-w-88',
      padding: 'p-4',
      titleSize: 'text-lg',
      imageHeight: 'h-28'
    },
    featured: {
      container: uniformSize ? 'w-full max-w-92 h-104' : hasValidImage ? 'w-full max-w-92 min-h-104' : 'w-full max-w-92',
      padding: 'p-6',
      titleSize: 'text-xl',
      imageHeight: 'h-32'
    },
    hero: {
      container: uniformSize ? 'w-full max-w-96 h-112' : hasValidImage ? 'w-full max-w-96 min-h-112' : 'w-full max-w-96',
      padding: 'p-8',
      titleSize: 'text-2xl',
      imageHeight: 'h-40'
    }
  };

  const config = variantConfig[variant];
  
  // Handle image load events
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
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

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    onSave?.(safeChallenge.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareModal(true);
  };

  // Helper function to format time left
  const formatTimeLeft = (minutes: number) => {
    if (!minutes || minutes <= 0) return '0min';
    if (minutes < 60) return `${Math.floor(minutes)}min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}H`;
    return `${Math.floor(minutes / 1440)}D`;
  };

  return (
    <>
      <motion.div
        className={`relative ${config.container} cursor-pointer`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => onCardClick?.(safeChallenge.id)}
        whileHover={{ 
          scale: variant === 'compact' ? 1.015 : 1.02,
          y: -6
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Background Glow */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-2xl shadow-cyan-500/40 opacity-0"
          animate={{ opacity: isHovered ? 0.4 : 0.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Card */}
        <div className={`relative h-full bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-3xl overflow-hidden shadow-2xl`}>
          
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
            
            {/* Header Section - Token/XP/Category Buttons and Action Buttons */}
            <div className="flex items-center justify-between mb-3">
              {/* Token, XP, and Category Buttons */}
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-400/30"
                >
                  <Coins className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-xs">{safeChallenge.entryCost === 0 ? 'Free' : safeChallenge.entryCost}</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 bg-cyan-500/20 px-2 py-1 rounded-lg border border-cyan-400/30"
                >
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400 font-bold text-xs">{safeChallenge.rewards.xp}</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 bg-purple-500/20 px-2 py-1 rounded-lg border border-purple-400/30"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400 font-bold text-xs capitalize">{safeChallenge.category}</span>
                </motion.div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onClick={handleSave}
                  className={`p-2 rounded-xl transition-all duration-200 bg-slate-700/80 backdrop-blur-sm border border-slate-600/70 shadow-lg ${
                    isSaved 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'text-slate-200 hover:text-white hover:bg-slate-600/80'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  onClick={handleShare}
                  className="p-2 bg-slate-700/80 backdrop-blur-sm border border-slate-600/70 rounded-xl text-slate-200 hover:text-white hover:bg-slate-600/80 transition-all duration-200 shadow-lg"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Thumbnail Image */}
            {hasValidImage && (
              <div className="relative w-full h-48 overflow-hidden rounded-lg mb-3">
                <img
                  src={safeChallenge.thumbnail || getCategoryImage()}
                  alt={safeChallenge.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}
            
            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 mb-2 px-1">
              {safeChallenge.title}
            </h3>
            
            {/* Description */}
            <div className="flex-1 mb-3 px-1">
              <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                {safeChallenge.description}
              </p>
            </div>

            {/* Challenge Creators - Single row layout */}
            <div className="mb-3 px-1">
              {safeChallenge.creators.length === 1 ? (
                // Single creator with profile image and name
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {safeChallenge.creators[0].charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white/80 text-sm font-medium">{safeChallenge.creators[0]}</span>
                </div>
              ) : (
                // Multiple creators - show profile images on same row with one name and overflow indicator
                <div className="flex items-center space-x-1">
                  {safeChallenge.creators.slice(0, 3).map((creator: string, index: number) => (
                    <div key={index} className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center border-2 border-slate-800">
                      <span className="text-white text-xs font-bold">
                        {creator.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {safeChallenge.creators.length > 3 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center border-2 border-slate-800">
                        <span className="text-white text-xs font-bold">+{safeChallenge.creators.length - 3}</span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">{safeChallenge.creators[0]}</span>
                      <span className="text-white/60 text-xs">• • •</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-2 text-sm px-1">
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
              
              {/* Star Rating - moved closer to share button */}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80 font-medium">4.8</span>
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

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        challengeId={safeChallenge.id}
        challengeTitle={safeChallenge.title}
        challengeType="aaa"
        challengeData={{
          action: safeChallenge.description.split(' ').slice(0, 5).join(' ').toLowerCase() + '...',
          category: safeChallenge.category
        }}
      />
    </>
  );
};