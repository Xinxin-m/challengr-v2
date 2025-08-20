import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, Clock, Users, MapPin, Zap, Crown, Flame, 
  Snowflake, Waves, Mountain, Wind, Eye, Gem, Sword, Shield,
  Trophy, Target, Sparkles, ChevronRight, BookOpen, Scroll
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface XuanhuanChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    realm: 'taiyi' | 'asgard' | 'olympus' | 'kemet' | 'aztlan';
    element: string;
    difficulty: 'mortal' | 'apprentice' | 'practitioner' | 'adept' | 'master' | 'grandmaster' | 'sage' | 'immortal';
    reward: number;
    participants: number;
    timeLimit: string;
    location: string;
    tags: string[];
    xpReward: number;
    spiritStones: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine';
    challengeType: 'solo' | 'team' | 'tournament' | 'guild';
    cultivationMethod: string;
    ancientText?: string;
    artifacts?: string[];
  };
  onAccept: (challengeId: string) => void;
  onSave: (challengeId: string) => void;
  onInfo: (challengeId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
}

// Realm configuration
const REALM_CONFIG = {
  taiyi: {
    name: 'Taiyi Immortal Realm',
    englishName: 'Taiyi Immortal Realm',
    color: 'from-red-600 via-orange-500 to-yellow-500',
    accent: 'text-orange-400',
    bgPattern: '🏮',
    culture: 'Eastern Fantasy'
  },
  asgard: {
    name: 'Asgard',
    englishName: 'Asgard Divine Realm', 
    color: 'from-blue-600 via-indigo-500 to-purple-600',
    accent: 'text-blue-400',
    bgPattern: '⚡',
    culture: 'Norse Mythology'
  },
  olympus: {
    name: 'Mount Olympus',
    englishName: 'Mount Olympus',
    color: 'from-white via-gold-400 to-blue-500',
    accent: 'text-yellow-400',
    bgPattern: '🏛️',
    culture: 'Greek Mythology'
  },
  kemet: {
    name: 'Kemet',
    englishName: 'Kemet Divine Domain',
    color: 'from-amber-600 via-orange-500 to-red-600',
    accent: 'text-amber-400',
    bgPattern: '🔱',
    culture: 'Ancient Egypt'
  },
  aztlan: {
    name: 'Aztlan',
    englishName: 'Aztlan Sacred Realm',
    color: 'from-green-600 via-emerald-500 to-teal-500',
    accent: 'text-emerald-400',
    bgPattern: '🌿',
    culture: 'Indigenous Americas'
  }
};

// Tier configuration
const TIER_CONFIG = {
  mortal: { name: 'Mortal', color: 'text-gray-400', glow: 'shadow-gray-500/20' },
  apprentice: { name: 'Apprentice', color: 'text-green-400', glow: 'shadow-green-500/30' },
  practitioner: { name: 'Practitioner', color: 'text-blue-400', glow: 'shadow-blue-500/40' },
  adept: { name: 'Foundation', color: 'text-purple-400', glow: 'shadow-purple-500/50' },
  master: { name: 'Golden Core', color: 'text-yellow-400', glow: 'shadow-yellow-500/60' },
  grandmaster: { name: 'Nascent Soul', color: 'text-orange-400', glow: 'shadow-orange-500/70' },
  sage: { name: 'Soul Formation', color: 'text-red-400', glow: 'shadow-red-500/80' },
  immortal: { name: 'Immortal', color: 'text-cyan-400', glow: 'shadow-cyan-500/90' }
};

// Rarity configuration
const RARITY_CONFIG = {
  common: { name: 'Common', color: 'text-gray-400', glow: 'shadow-gray-500/20', border: 'border-gray-400/30' },
  uncommon: { name: 'Uncommon', color: 'text-green-400', glow: 'shadow-green-500/30', border: 'border-green-400/40' },
  rare: { name: 'Rare', color: 'text-blue-400', glow: 'shadow-blue-500/40', border: 'border-blue-400/50' },
  epic: { name: 'Epic', color: 'text-purple-400', glow: 'shadow-purple-500/50', border: 'border-purple-400/60' },
  legendary: { name: 'Legendary', color: 'text-yellow-400', glow: 'shadow-yellow-500/60', border: 'border-yellow-400/70' },
  mythic: { name: 'Mythic', color: 'text-red-400', glow: 'shadow-red-500/70', border: 'border-red-400/80' },
  divine: { name: 'Divine', color: 'text-cyan-400', glow: 'shadow-cyan-500/90', border: 'border-cyan-400/90' }
};

export const XuanhuanChallengeCard: React.FC<XuanhuanChallengeCardProps> = ({
  challenge,
  onAccept,
  onSave,
  onInfo,
  size = 'md',
  showActions = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const realmConfig = REALM_CONFIG[challenge.realm];
  const tierConfig = TIER_CONFIG[challenge.difficulty];
  const rarityConfig = RARITY_CONFIG[challenge.rarity];

  const sizeConfig = {
    sm: 'w-72 h-96',
    md: 'w-80 h-[28rem]',
    lg: 'w-96 h-[32rem]'
  };

  return (
    <motion.div
      className={`${sizeConfig[size]} relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* 修真光环背景 */}
      <motion.div
        className={`absolute -inset-2 bg-gradient-to-br ${realmConfig.color} rounded-3xl blur-2xl ${rarityConfig.glow}`}
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* 主卡片容器 */}
      <div className={`relative h-full bg-gradient-to-br from-slate-900/95 via-indigo-900/90 to-slate-900/95 backdrop-blur-xl rounded-3xl border-2 ${rarityConfig.border} overflow-hidden shadow-2xl`}>
        
        {/* 修真符文背景纹理 */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz4KPHBhdGggZD0ibTEwIDIwaDIwbS0xMC0xMHYyMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4K')] bg-repeat" />
        </div>

        {/* 界域标识和稀有度 */}
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${realmConfig.color} flex items-center justify-center text-2xl shadow-xl`}>
                {realmConfig.bgPattern}
              </div>
              <div>
                <div className="font-black text-white text-sm">{realmConfig.name}</div>
                <div className={`text-xs ${realmConfig.accent} opacity-80`}>{realmConfig.culture}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-1">
              <Badge className={`${rarityConfig.color} bg-black/30 border-current/50 font-bold`}>
                {rarityConfig.name}
              </Badge>
              <Badge className={`${tierConfig.color} bg-black/30 border-current/50 text-xs`}>
                {tierConfig.name}
              </Badge>
            </div>
          </div>

          {/* 挑战标题 */}
          <motion.h3 
            className="text-xl font-black text-white mb-3 leading-tight"
            animate={{ 
              textShadow: isHovered 
                ? `0 0 20px ${rarityConfig.color.replace('text-', '')}`
                : "0 0 0px transparent"
            }}
          >
            {challenge.title}
          </motion.h3>

          {/* Cultivation Method */}
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">{challenge.cultivationMethod}</span>
          </div>

          {/* 挑战描述 */}
          <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
            {challenge.description}
          </p>

          {/* Ancient Text */}
          {challenge.ancientText && (
            <div className="bg-black/20 rounded-xl p-3 mb-4 border border-amber-400/20">
              <div className="flex items-center space-x-2 mb-2">
                <Scroll className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-xs font-bold">Ancient Wisdom</span>
              </div>
              <p className="text-amber-300/90 text-xs italic leading-relaxed">
                "{challenge.ancientText}"
              </p>
            </div>
          )}

          {/* Challenge Info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-black/20 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-xs font-bold">Time</span>
              </div>
              <div className="text-white text-sm font-medium">{challenge.timeLimit}</div>
            </div>

            <div className="bg-black/20 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-xs font-bold">Participants</span>
              </div>
              <div className="text-white text-sm font-medium">{challenge.participants}</div>
            </div>

            <div className="bg-black/20 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-xs font-bold">Location</span>
              </div>
              <div className="text-white text-sm font-medium truncate">{challenge.location}</div>
            </div>

            <div className="bg-black/20 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-xs font-bold">Type</span>
              </div>
              <div className="text-white text-sm font-medium">{
                challenge.challengeType === 'solo' ? 'Solo' :
                challenge.challengeType === 'team' ? 'Team' :
                challenge.challengeType === 'tournament' ? 'Tournament' : 'Guild'
              }</div>
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl p-4 mb-4 border border-amber-400/30">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">Rewards</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Gem className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-bold text-lg">{challenge.spiritStones}</span>
                </div>
                <div className="text-white/70 text-xs">Spirit Stones</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-bold text-lg">{challenge.xpReward}</span>
                </div>
                <div className="text-white/70 text-xs">XP</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Crown className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-bold text-lg">{challenge.reward}</span>
                </div>
                <div className="text-white/70 text-xs">Prestige</div>
              </div>
            </div>
          </div>

          {/* 神器奖励 */}
          {challenge.artifacts && challenge.artifacts.length > 0 && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-3 mb-4 border border-purple-400/30">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-xs">神器传承</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {challenge.artifacts.slice(0, 3).map((artifact, index) => (
                  <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-400/40 text-xs">
                    {artifact}
                  </Badge>
                ))}
                {challenge.artifacts.length > 3 && (
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/40 text-xs">
                    +{challenge.artifacts.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* 标签系统 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {challenge.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} className="bg-white/10 text-white/80 border-white/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

          {/* Actions */}
        {showActions && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex space-x-3">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => onAccept(challenge.id)}
                  className={`w-full bg-gradient-to-r ${realmConfig.color} text-white font-black py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Sword className="w-4 h-4" />
                      <span>Accept</span>
                  </span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => onSave(challenge.id)}
                  className="p-3 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <Star className="w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => onInfo(challenge.id)}
                  className="p-3 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <Eye className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        )}

        {/* 高稀有度粒子效果 */}
        {(challenge.rarity === 'legendary' || challenge.rarity === 'mythic' || challenge.rarity === 'divine') && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${rarityConfig.color.replace('text-', 'bg-')} rounded-full`}
                animate={{
                  x: [
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%'
                  ],
                  y: [
                    Math.random() * 100 + '%', 
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%'
                  ],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        )}

        {/* 边框光效 */}
        <motion.div
          className={`absolute inset-0 rounded-3xl border-2 ${rarityConfig.border}`}
          animate={isHovered ? {
            borderColor: [
              rarityConfig.border.replace('border-', '').replace('/40', ''),
              rarityConfig.border.replace('border-', '').replace('/40', '/80'),
              rarityConfig.border.replace('border-', '').replace('/40', '')
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

          {/* Hover Info */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-slate-900/95 to-indigo-900/95 backdrop-blur-xl rounded-2xl p-4 border border-cyan-400/30 shadow-2xl whitespace-nowrap">
              <div className="text-white font-bold text-sm mb-1">{realmConfig.englishName}</div>
                  <div className="text-white/70 text-xs">Element: {challenge.element}</div>
              {/* 箭头 */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};