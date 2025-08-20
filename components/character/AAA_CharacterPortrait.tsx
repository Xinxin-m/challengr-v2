import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown, Shield, Sword, Sparkles, Star, Gem,
  Zap, Target, Award, Medal, Trophy, Users,
  Eye, Heart, Brain, Flame, Wind, Mountain
} from 'lucide-react';
import { UserRPGProgress } from '../../config/rpg-system';
import { ParticleSystem, LevelUpEffect, AchievementEffect } from '../effects/ParticleSystem';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface AAA_CharacterPortraitProps {
  userProgress: UserRPGProgress;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showStats?: boolean;
  showEquipment?: boolean;
  showParticles?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'combat' | 'legendary' | 'minimal';
  onEquipmentClick?: (slot: string) => void;
  onCharacterClick?: () => void;
}

// Character Races with Detailed Appearance
const CHARACTER_RACES = {
  human: {
    name: 'Human',
    emoji: '👤',
    description: 'Versatile and ambitious',
    traits: ['Adaptable', 'Leadership', 'Balanced'],
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: '#f59e0b',
  },
  elf: {
    name: 'Mystic Elf',
    emoji: '🧝',
    description: 'Wise and magical',
    traits: ['Wisdom', 'Magic Affinity', 'Longevity'],
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: '#10b981',
  },
  dwarf: {
    name: 'Mountain Dwarf',
    emoji: '🧙',
    description: 'Strong and determined',
    traits: ['Strength', 'Craftsmanship', 'Endurance'],
    bgGradient: 'from-stone-500/20 to-slate-500/20',
    accentColor: '#64748b',
  },
  orc: {
    name: 'Warrior Orc',
    emoji: '👹',
    description: 'Fierce and powerful',
    traits: ['Combat Prowess', 'Intimidation', 'Berserker'],
    bgGradient: 'from-red-500/20 to-crimson-500/20',
    accentColor: '#dc2626',
  },
  cyborg: {
    name: 'Tech Cyborg',
    emoji: '🤖',
    description: 'Logical and efficient',
    traits: ['Technology', 'Logic', 'Enhancement'],
    bgGradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: '#0891b2',
  },
  mystic: {
    name: 'Cosmic Mystic',
    emoji: '👽',
    description: 'Otherworldly and mysterious',
    traits: ['Psychic Powers', 'Cosmic Knowledge', 'Transcendence'],
    bgGradient: 'from-purple-500/20 to-violet-500/20',
    accentColor: '#8b5cf6',
  },
};

// Equipment Slots with 3D-like rendering
const EQUIPMENT_SLOTS = {
  helmet: { name: 'Helmet', icon: Crown, position: { top: '10%', left: '50%' } },
  armor: { name: 'Armor', icon: Shield, position: { top: '35%', left: '50%' } },
  weapon: { name: 'Weapon', icon: Sword, position: { top: '40%', left: '20%' } },
  accessory: { name: 'Accessory', icon: Gem, position: { top: '60%', left: '80%' } },
  boots: { name: 'Boots', icon: Mountain, position: { top: '80%', left: '50%' } },
};

// Tier progression with visual effects
const TIER_PROGRESSION = {
  apprentice: {
    name: 'Apprentice',
    color: '#6b7280',
    glow: 'none',
    particles: false,
    border: 'border-gray-400',
  },
  journeyman: {
    name: 'Journeyman',
    color: '#059669',
    glow: '0 0 10px rgba(5, 150, 105, 0.3)',
    particles: false,
    border: 'border-emerald-400',
  },
  expert: {
    name: 'Expert',
    color: '#2563eb',
    glow: '0 0 15px rgba(37, 99, 235, 0.4)',
    particles: true,
    border: 'border-blue-400',
  },
  grandmaster: {
    name: 'Grand Master',
    color: '#7c3aed',
    glow: '0 0 20px rgba(124, 58, 237, 0.5)',
    particles: true,
    border: 'border-purple-400',
  },
  ascended: {
    name: 'Ascended One',
    color: '#ffd700',
    glow: '0 0 30px rgba(255, 215, 0, 0.8)',
    particles: true,
    border: 'border-yellow-400',
  },
};

// Stat icons mapping
const STAT_ICONS = {
  intelligence: Brain,
  creativity: Sparkles,
  technical: Zap,
  social: Users,
  physical: Mountain,
  business: Target,
};

export function AAA_CharacterPortrait({
  userProgress,
  size = 'md',
  showStats = true,
  showEquipment = true,
  showParticles = true,
  interactive = true,
  variant = 'default',
  onEquipmentClick,
  onCharacterClick,
}: AAA_CharacterPortraitProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [showLevelUpEffect, setShowLevelUpEffect] = useState(false);
  const [showAchievementEffect, setShowAchievementEffect] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Size configurations
  const sizeConfig = {
    sm: { 
      container: 'w-24 h-24', 
      avatar: 'text-4xl',
      badge: 'text-xs',
      stats: false,
      equipment: false,
    },
    md: { 
      container: 'w-32 h-32', 
      avatar: 'text-5xl',
      badge: 'text-xs',
      stats: false,
      equipment: false,
    },
    lg: { 
      container: 'w-48 h-48', 
      avatar: 'text-7xl',
      badge: 'text-sm',
      stats: true,
      equipment: true,
    },
    xl: { 
      container: 'w-64 h-64', 
      avatar: 'text-8xl',
      badge: 'text-base',
      stats: true,
      equipment: true,
    },
    hero: { 
      container: 'w-96 h-96', 
      avatar: 'text-9xl',
      badge: 'text-lg',
      stats: true,
      equipment: true,
    },
  };

  const config = sizeConfig[size];
  const currentRace = CHARACTER_RACES.human; // Default, should be from userProgress
  const currentTier = TIER_PROGRESSION[userProgress.currentTier || 'apprentice'];

  // Trigger effects on level changes
  useEffect(() => {
    if (userProgress.level > 1) {
      setShowLevelUpEffect(true);
      setTimeout(() => setShowLevelUpEffect(false), 3000);
    }
  }, [userProgress.level]);

  // Calculate overall progress
  const calculateProgress = () => {
    const maxXPForTier = 5000; // This should come from tier config
    return Math.min((userProgress.currentTierXP / maxXPForTier) * 100, 100);
  };

  const renderStats = () => {
    if (!showStats || !config.stats) return null;

    return (
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="grid grid-cols-3 gap-2 text-xs">
            {Object.entries(userProgress.stats || {}).map(([stat, value]) => {
              const IconComponent = STAT_ICONS[stat as keyof typeof STAT_ICONS];
              return (
                <div key={stat} className="flex flex-col items-center space-y-1">
                  <IconComponent className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/70 capitalize">{stat.slice(0, 3)}</span>
                  <span className="text-cyan-400 font-bold">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderEquipment = () => {
    if (!showEquipment || !config.equipment) return null;

    return (
      <>
        {Object.entries(EQUIPMENT_SLOTS).map(([slotKey, slot]) => {
          const IconComponent = slot.icon;
          const isEquipped = userProgress.equippedGear?.[slotKey];
          const isHovered = hoveredSlot === slotKey;

          return (
            <motion.div
              key={slotKey}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={slot.position}
              onMouseEnter={() => setHoveredSlot(slotKey)}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => onEquipmentClick?.(slotKey)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`
                  relative w-8 h-8 rounded-full border-2 backdrop-blur-xl
                  cursor-pointer transition-all duration-300
                  ${isEquipped 
                    ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400' 
                    : 'bg-black/50 border-white/30 hover:border-cyan-400'
                  }
                `}
                style={{
                  boxShadow: isHovered ? '0 0 20px rgba(0, 212, 255, 0.5)' : 'none'
                }}
              >
                <IconComponent 
                  className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                    isEquipped ? 'text-yellow-400' : 'text-white/70'
                  }`}
                />
                
                {isEquipped && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white/50" />
                )}
              </div>

              {/* Equipment tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                  >
                    <div className="bg-black/90 backdrop-blur-xl rounded-lg px-3 py-2 border border-cyan-400/30 whitespace-nowrap">
                      <span className="text-cyan-400 text-sm font-medium">{slot.name}</span>
                      {isEquipped && (
                        <div className="text-green-400 text-xs">Equipped</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </>
    );
  };

  return (
    <motion.div 
      ref={portraitRef}
      className={`relative ${config.container} mx-auto`}
      onClick={interactive ? onCharacterClick : undefined}
      whileHover={interactive ? { scale: 1.05 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
    >
      {/* Main Portrait Container */}
      <div
        className={`
          relative w-full h-full rounded-3xl overflow-hidden
          bg-gradient-to-br ${currentRace.bgGradient}
          backdrop-blur-xl ${currentTier.border}
          border-2 cursor-pointer group
          transition-all duration-500
        `}
        style={{
          boxShadow: currentTier.glow || 'none',
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-repeat opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Character Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`${config.avatar} select-none`}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {currentRace.emoji}
          </motion.div>
        </div>

        {/* Level Badge */}
        <div className="absolute -top-2 -right-2 z-10">
          <motion.div
            className={`
              bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full
              border-2 border-white/30 backdrop-blur-xl
              px-3 py-1 min-w-[3rem] text-center
            `}
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(0, 212, 255, 0.3)',
                '0 0 20px rgba(0, 212, 255, 0.6)',
                '0 0 10px rgba(0, 212, 255, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className={`text-white font-bold ${config.badge}`}>
              {userProgress.level}
            </span>
          </motion.div>
        </div>

        {/* Tier Badge */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <Badge 
            className={`
              ${config.badge} px-3 py-1 font-semibold
              bg-gradient-to-r from-black/80 to-gray-900/80
              border backdrop-blur-xl text-white
            `}
            style={{ 
              borderColor: currentTier.color,
              boxShadow: currentTier.glow || 'none'
            }}
          >
            {currentTier.name}
          </Badge>
        </div>

        {/* XP Progress Bar */}
        {size !== 'sm' && size !== 'md' && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/50 rounded-full p-1 backdrop-blur-xl">
              <Progress 
                value={calculateProgress()} 
                className="h-2"
                style={{
                  background: `linear-gradient(90deg, ${currentTier.color}, ${currentRace.accentColor})`
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>{userProgress.currentTierXP.toLocaleString()} XP</span>
              <span>{userProgress.totalXP.toLocaleString()} Total</span>
            </div>
          </div>
        )}

        {/* Equipment Slots */}
        {renderEquipment()}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div 
            className="w-full h-full rounded-3xl"
            style={{
              boxShadow: `inset 0 0 30px rgba(0, 212, 255, 0.2)`
            }}
          />
        </div>
      </div>

      {/* Stats Panel */}
      {renderStats()}

      {/* Particle Effects */}
      {showParticles && showLevelUpEffect && (
        <LevelUpEffect 
          trigger={showLevelUpEffect} 
          position={{ x: 150, y: 150 }}
        />
      )}

      {showParticles && showAchievementEffect && (
        <AchievementEffect 
          trigger={showAchievementEffect} 
          position={{ x: 150, y: 150 }}
        />
      )}

      {/* Tier Progression Particles */}
      {showParticles && currentTier.particles && (
        <ParticleSystem
          config={{
            count: 5,
            lifetime: 4000,
            size: { min: 1, max: 3 },
            speed: { min: 10, max: 30 },
            color: [currentTier.color],
            opacity: { start: 0.6, end: 0 },
            shape: 'circle',
            gravity: -0.1,
            wind: 0.05,
            emission: 'continuous',
            blendMode: 'screen',
          }}
          trigger={true}
          intensity="low"
          className="pointer-events-none"
        />
      )}
    </motion.div>
  );
}

// Preset character portrait components
export const MiniCharacterPortrait: React.FC<{ userProgress: UserRPGProgress }> = ({ userProgress }) => (
  <AAA_CharacterPortrait 
    userProgress={userProgress} 
    size="sm" 
    showStats={false} 
    showEquipment={false}
    interactive={false}
    variant="minimal"
  />
);

export const StandardCharacterPortrait: React.FC<{ 
  userProgress: UserRPGProgress; 
  onCharacterClick?: () => void;
}> = ({ userProgress, onCharacterClick }) => (
  <AAA_CharacterPortrait 
    userProgress={userProgress} 
    size="lg" 
    onCharacterClick={onCharacterClick}
  />
);

export const HeroCharacterPortrait: React.FC<{ 
  userProgress: UserRPGProgress; 
  onEquipmentClick?: (slot: string) => void;
  onCharacterClick?: () => void;
}> = ({ userProgress, onEquipmentClick, onCharacterClick }) => (
  <AAA_CharacterPortrait 
    userProgress={userProgress} 
    size="hero" 
    variant="legendary"
    onEquipmentClick={onEquipmentClick}
    onCharacterClick={onCharacterClick}
  />
);