import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sword, Users, Trophy, Zap, Target, Shield } from 'lucide-react';

interface GameModeSelectorProps {
  gameMode: 'solo' | 'multiplayer' | 'tournament';
  setGameMode: (mode: 'solo' | 'multiplayer' | 'tournament') => void;
  size?: 'sm' | 'md' | 'lg';
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  gameMode,
  setGameMode,
  size = 'md'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const modes = [
    {
      id: 'solo' as const,
      label: 'Solo Quest',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      description: 'Personal challenges & skill building',
      glow: 'shadow-blue-500/40'
    },
    {
      id: 'multiplayer' as const,
      label: 'Party Mode',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: 'Team up with other players',
      glow: 'shadow-green-500/40'
    },
    {
      id: 'tournament' as const,
      label: 'Arena',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      description: 'Competitive tournaments',
      glow: 'shadow-purple-500/40'
    }
  ];

  const sizeConfig = {
    sm: {
      container: 'h-10',
      button: 'px-3 py-2 text-xs',
      icon: 'w-3 h-3',
      text: 'text-xs'
    },
    md: {
      container: 'h-14',
      button: 'px-4 py-3 text-sm',
      icon: 'w-4 h-4',
      text: 'text-sm'
    },
    lg: {
      container: 'h-16',
      button: 'px-6 py-4 text-base',
      icon: 'w-5 h-5',
      text: 'text-base'
    }
  };

  const sizes = sizeConfig[size];

  const handleModeChange = (newMode: 'solo' | 'multiplayer' | 'tournament') => {
    console.log('🎮 Changing game mode from', gameMode, 'to', newMode);
    setGameMode(newMode);
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced Background Glow */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-slate-600/30 via-purple-600/20 to-slate-600/30 rounded-3xl blur-2xl"
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main Container */}
      <div className={`
        relative bg-gradient-to-r from-slate-800/60 via-slate-700/60 to-slate-800/60 
        backdrop-blur-xl border-2 border-white/20 rounded-2xl p-1.5 
        ${sizes.container} flex items-center shadow-2xl
      `}>
        {/* Floating particles for active mode */}
        <AnimatePresence>
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: '100%',
                    opacity: 0 
                  }}
                  animate={{
                    y: '-20px',
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {modes.map((mode) => {
          const isActive = gameMode === mode.id;
          const Icon = mode.icon;
          
          return (
            <motion.button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`
                relative flex items-center space-x-2 rounded-xl transition-all duration-300 
                font-bold tracking-wide ${sizes.button} flex-1 justify-center
                ${isActive
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90'
                }
              `}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ 
                scale: 0.95,
                y: 0
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Active Background with enhanced effects */}
              <AnimatePresence>
                {isActive && (
                  <>
                    <motion.div
                      layoutId="activeGameMode"
                      className={`
                        absolute inset-0 bg-gradient-to-r ${mode.color} 
                        rounded-xl ${mode.glow} border border-white/30
                      `}
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    {/* Pulsing border effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl border-2 border-white/50`}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
              
              {/* Content */}
              <div className="relative z-10 flex items-center space-x-2">
                <motion.div
                  animate={isActive ? { 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ 
                    duration: 0.6,
                    repeat: isActive ? Infinity : 0,
                    repeatDelay: 2
                  }}
                >
                  <Icon className={`${sizes.icon} ${isActive ? 'text-white' : 'text-white/70'}`} />
                </motion.div>
                <span className={`font-bold tracking-wide ${sizes.text}`}>
                  {mode.label}
                </span>
              </div>
              
              {/* Hover Effect for inactive items */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200"
                />
              )}
              
              {/* Active Mode Indicator Dots */}
              {isActive && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-white/60 rounded-full"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Mode Description Tooltip */}
      <AnimatePresence>
        {gameMode && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
          >
            <div className="bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl px-4 py-3 text-sm text-white/90 whitespace-nowrap shadow-2xl">
              <div className="font-semibold mb-1">{modes.find(m => m.id === gameMode)?.label}</div>
              <div className="text-white/70 text-xs">{modes.find(m => m.id === gameMode)?.description}</div>
              {/* Tooltip arrow */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900/95 border-l border-t border-white/20 rotate-45 rounded-tl-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};