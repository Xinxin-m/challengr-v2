import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Clock, Coins, Star, Bookmark, Share2, 
  Zap, Target, Sparkles, Calendar, TrendingUp, Shield, Sword, Trophy
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { ChallengeDouble } from '../../config/rpg-system';
import { ShareModal } from '../ShareModal';

interface BattleCardProps {
  challenge: ChallengeDouble;
  userProgress: any;
  onBetBlue?: (id: string, amount: number) => void;
  onBetRed?: (id: string, amount: number) => void;
  onSave?: (id: string) => void;
  onCardClick?: (id: string) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export const BattleCard: React.FC<BattleCardProps> = ({
  challenge,
  userProgress,
  onBetBlue,
  onBetRed,
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

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(challenge.id);
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

  // Helper function to format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return `${Math.floor(minutes / 1440)}d`;
  };

  // Override participant display data for specific names
  const originalBlueName = challenge.participants.blue.name;
  const originalRedName = challenge.participants.red.name;

  const blueIsSmashking = /smash\s*king|smashking|smash\s*king\s*david/i.test(originalBlueName);
  const redIsTacticalMaria = /maria|tactical\s*genius\s*maria/i.test(originalRedName);
  const redIsFoodFighterLisa = /food\s*fighter\s*lisa|foodfighter\s*lisa|\blisa\b/i.test(originalRedName);

  // Reliable portrait fallbacks
  const malePortrait = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3';
  const femalePortrait1 = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3';
  const femalePortrait2 = 'https://images.unsplash.com/photo-1520975922284-9bcd53c3db0e?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3';

  const blueName = blueIsSmashking ? 'SmashKing David' : originalBlueName;
  const blueAvatar = blueIsSmashking
    ? malePortrait
    : (challenge.participants.blue.avatar || malePortrait);

  let redName = originalRedName;
  let redAvatar = challenge.participants.red.avatar || femalePortrait1;
  if (redIsTacticalMaria) {
    redName = 'Maria Lopert';
    redAvatar = femalePortrait1;
  } else if (redIsFoodFighterLisa) {
    redName = 'FoodFighter Lisa';
    redAvatar = femalePortrait2;
  }

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
            {/* Category Badge Only */}
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
                onClick={(e) => { e.stopPropagation(); handleSave(); }}
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
          <div className="mb-4">
            <h3 className={`${config.titleSize} font-black text-white mb-2 leading-tight`}>
              {challenge.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {challenge.description}
            </p>
          </div>

          {/* Battle Goal */}
          <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-400/30">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-cyan-400" />
              Battle Goal
            </h4>
            <p className="text-white/80 text-sm">{challenge.challenge.goal}</p>
          </div>

          {/* Battle Stats */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-lg font-bold text-white">
                  {challenge.totalParticipants}
                </span>
              </div>
              <p className="text-xs text-white/60">Participants</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-lg font-bold text-white">
                  {challenge.betting.totalPool}
                </span>
              </div>
              <p className="text-xs text-white/60">Total Pool</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-lg font-bold text-white">
                  {challenge.participants.blue.totalBets + challenge.participants.red.totalBets}
                </span>
              </div>
              <p className="text-xs text-white/60">Total Bets</p>
            </div>
          </div>

          {/* Battle Start and Duration aligned with stats columns */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            {/* Battle Start under Participants (left) */}
            <div className="text-left">
              <div className="flex items-center justify-start space-x-1 mb-1">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-lg font-bold text-white">
                  {challenge.eventTime ? challenge.eventTime.toLocaleDateString() : '-'}
                </span>
              </div>
              {challenge.eventTime && (
                <div className="text-xs text-white/70">{challenge.eventTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
              )}
              <p className="text-xs text-white/60">Battle Start</p>
            </div>
            {/* spacer to keep alignment with Total Pool column */}
            <div />
            {/* Duration under Total Bets (right) */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-lg font-bold text-white">
                  {formatDuration(challenge.challenge.timeLimit)}
                </span>
              </div>
              <p className="text-xs text-white/60">Duration</p>
            </div>
          </div>

          {/* Battle Participants */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* Blue Player */}
            <div className="text-center p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <div className="w-16 h-16 mx-auto mb-2">
                <Avatar className="w-full h-full border-2 border-blue-400">
                  <img
                    src={blueAvatar}
                    alt={blueName}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = malePortrait; }}
                  />
                </Avatar>
              </div>
              <div className="font-bold text-blue-300 text-sm mb-1">{blueName}</div>
              <div className="text-lg font-bold text-blue-400">{challenge.participants.blue.odds}x</div>
            </div>

            {/* Red Player */}
            <div className="text-center p-3 bg-red-500/20 rounded-xl border border-red-400/30">
              <div className="w-16 h-16 mx-auto mb-2">
                <Avatar className="w-full h-full border-2 border-red-400">
                  <img
                    src={redAvatar}
                    alt={redName}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = redIsTacticalMaria ? femalePortrait1 : femalePortrait2; }}
                  />
                </Avatar>
              </div>
              <div className="font-bold text-red-300 text-sm mb-1">{redName}</div>
              <div className="text-lg font-bold text-red-400">{challenge.participants.red.odds}x</div>
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
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        challengeId={challenge.id}
        challengeTitle={challenge.title}
        challengeType="battle"
        challengeData={{
          creatorA: challenge.participants.blue.name,
          creatorB: challenge.participants.red.name,
          goal: challenge.challenge.goal,
          category: challenge.category
        }}
      />
    </motion.div>
  );
};
