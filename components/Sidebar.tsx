import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, Sword, Map, Trophy, Plus, Sparkles, Brain, Zap,
  Settings, Bell, Wallet, ChevronLeft, ChevronRight,
  Crown, Star, Target, Users, Coins, Shield, MessageSquare,
  Eye, Compass, Flame, Wind, Mountain, Waves, Sun, Moon,
  BookOpen, Scroll, Gem, Wand2, Swords, BadgeDollarSign
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { MembershipBadge } from './app/MembershipBadge';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userProgress: any;
  onCreateChallenge: () => void;
  onCreatePost: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenAI: () => void;
  onOpenWallet: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  notificationCount: number;
  walletConnected: boolean;
  generationsRemaining: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  userProgress,
  onCreateChallenge,
  onCreatePost,
  onOpenProfile,
  onOpenNotifications,
  onOpenAI,
  onOpenWallet,
  isCollapsed,
  onToggleCollapse,
  notificationCount = 0,
  walletConnected = false,
  generationsRemaining = 25
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const navigationItems = [
    {
      id: 'home',
      label: 'Stellar Hub',
      icon: Home,
      description: 'Your Home',
      color: 'from-indigo-600 via-purple-600 to-cyan-500',
      glow: 'shadow-indigo-500/40',
      action: () => onViewChange('home')
    },
    {
      id: 'arena',
      label: 'Challenge Arena',
      icon: Swords,
      description: 'Origin of Adventures',
      color: 'from-red-600 via-orange-500 to-yellow-500',
      glow: 'shadow-red-500/40',
      action: () => onViewChange('arena')
    },
    {
      id: 'betting',
      label: 'Betting Arena',
      icon: BadgeDollarSign,
      description: 'Place Bets & Win',
      color: 'from-green-600 via-emerald-500 to-teal-500',
      glow: 'shadow-green-500/40',
      action: () => onViewChange('betting')
    },
    {
      id: 'map',
      label: 'Cosmic Atlas',
      icon: Compass,
      description: 'Worldmap',
      color: 'from-teal-600 via-sky-500 to-indigo-500',
      glow: 'shadow-teal-500/40',
      action: () => onViewChange('map')
    },
    {
      id: 'career',
      label: 'Path of Ascension',
      icon: Mountain,
      description: 'Milestones & Missions',
      color: 'from-purple-600 via-indigo-500 to-blue-500',
      glow: 'shadow-purple-500/40',
      action: () => onViewChange('career')
    },
    {
      id: 'leaderboard',
      label: 'Tower of Legends',
      icon: Trophy,
      description: 'Leaderboards',
      color: 'from-amber-500 via-fuchsia-500 to-purple-600',
      glow: 'shadow-amber-500/40',
      action: () => onViewChange('leaderboard')
    }
  ];

  const calculateCultivationProgress = () => {
    const maxXP = 5000;
    return Math.min((userProgress.currentTierXP / maxXP) * 100, 100);
  };

  const renderNavigationItem = (item: any, index: number) => {
    const isActive = currentView === item.id;
    const Icon = item.icon;

    return (
      <motion.div
        key={item.id}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`${isCollapsed ? 'mb-4' : 'mb-2'}`}
      >
        <motion.button
          onClick={() => {
            item.action();
          }}
          className={`
            relative flex items-center space-x-3 transition-all duration-300 ease-in-out text-left group overflow-visible
            ${isCollapsed 
              ? 'w-10 h-10 mx-auto justify-center p-0' 
              : 'w-11/12 mx-auto p-3 rounded-xl'
            }
            ${isActive 
              ? `bg-gradient-to-r ${item.color} ${item.glow} shadow-2xl text-white ${isCollapsed ? 'rounded-full' : 'rounded-xl'}` 
              : 'text-white/70 hover:text-white'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {isActive && (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 ${isCollapsed ? 'rounded-full' : 'rounded-xl'} blur-2xl`}
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            />
          )}

          <div className={`relative z-10 ${isCollapsed ? '' : 'flex-shrink-0'}`}>
            <motion.div
              className="relative"
              animate={isActive ? { 
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ 
                duration: 2,
                repeat: isActive ? Infinity : 0,
                repeatDelay: 3
              }}
            >
              <div
                className={`${isCollapsed ? 'w-10 h-10 rounded-full' : 'w-10 h-10 rounded-xl'} flex items-center justify-center relative overflow-hidden transition-all duration-300
                ${isActive ? 'bg-white/20' : 'bg-white/5'}
              `}
                onMouseEnter={() => setHoveredIcon(item.id)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} transition-all duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />

                {isActive && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        animate={{
                          x: [0, Math.cos(i * 120) * 20, 0],
                          y: [0, Math.sin(i * 120) * 20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        style={{
                          left: '50%',
                          top: '50%'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Collapsed hover tooltip */}
                <AnimatePresence>
                  {isCollapsed && hoveredIcon === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 8 }}
                      exit={{ opacity: 0, x: -4 }}
                      className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap z-50"
                    >
                      <div className="bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 shadow-2xl">
                        <div className="text-sm font-bold text-white leading-none">{item.label}</div>
                        <div className="text-xs text-white/70 leading-tight">{item.description}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="relative z-10 flex-1 min-w-0"
              >
                <div className="flex items-center space-x-2">
                  <div className={`font-bold text-lg whitespace-nowrap transition-all duration-300 ${isActive ? 'text-white' : 'text-white/90'}`} style={{ fontFamily: 'Merienda, cursive', fontWeight: 700 }}>
                    {item.label}
                  </div>
                </div>
                <div className={`text-xs transition-all duration-300 ${isActive ? 'text-white/70' : 'text-white/60'} mt-0.5`}>
                  {item.description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {hoveredItem === item.id && !isActive && (
            <motion.div
              className={`absolute inset-0 bg-white/10 ${isCollapsed ? 'rounded-full' : 'rounded-xl'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.button>
      </motion.div>
    );
  };

  const AcademyLogo: React.FC<{ 
    size: 'sm' | 'lg'; 
    onToggleSidebar: () => void;
    sidebarCollapsed: boolean;
  }> = ({ size, onToggleSidebar, sidebarCollapsed }) => {
    const sizeClass = size === 'sm' ? 'w-12 h-12' : 'w-12 h-12';
    const iconSize = size === 'sm' ? 'w-7 h-7' : 'w-7 h-7';
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
        <motion.button
          onClick={onToggleSidebar}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className={`${sizeClass} bg-gradient-to-br from-cyan-400 via-purple-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden cursor-pointer`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
          <div className="relative z-10">
            {isHovered ? (
              <ChevronRight className={`${iconSize} text-white ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            ) : (
              <Crown className={`${iconSize} text-white`} />
            )}
          </div>
          <div className="absolute inset-0 animate-glow-pulse" />
        </motion.button>
        
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.h1
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-5xl text-white font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
              style={{ fontFamily: 'Qwitcher Grypen, cursive', fontWeight: 700 }}
            >
              Challengr. Fun
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      className={`
        fixed left-0 top-0 bottom-0 z-50 
        ${isCollapsed ? 'w-16' : 'w-80'}
        transition-all duration-300 ease-in-out
      `}
      initial={{ x: -320 }}
      animate={{ x: 0 }}
    >
              <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/98 via-indigo-900/95 to-slate-900/98 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/8 via-purple-600/5 to-amber-500/8" />

          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz4KPHBhdGggZD0ibTEwIDIwaDIwbS0xMC0xMHYyMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4K')] bg-repeat" />
          </div>
        </div>

        <div className={`relative h-full flex flex-col overflow-visible ${isCollapsed ? 'p-0' : 'p-4'}`}>
          {/* Logo/Menu button at top of sidebar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${isCollapsed ? 'mb-4 px-2' : 'mb-6'} flex justify-start items-center`}
          >
            <AcademyLogo size="lg" onToggleSidebar={onToggleCollapse} sidebarCollapsed={isCollapsed} />
          </motion.div>

          {/* Profile section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${isCollapsed ? 'mb-4 px-2' : 'mb-4'}`}
          >
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <motion.button
                    onClick={onOpenProfile}
                    className="w-full bg-gradient-to-br from-slate-800/60 via-indigo-800/40 to-purple-800/60 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-3 text-left transition-all duration-300 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <span className="relative z-10">🧙‍♂️</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-black text-white text-base">
                            {userProgress.currentClass || 'Elemental Mage'}
                          </h3>
                          <Badge className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 border-blue-400/50 text-xs">
                            {userProgress.currentTier || 'Foundation'}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-xs">Lv. {userProgress.level || '15'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/70">Progress</span>
                        <span className="text-cyan-400 font-bold">{Math.round(calculateCultivationProgress())}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={calculateCultivationProgress()} className="h-2 bg-slate-700/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-sm" />
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>{userProgress.currentTierXP?.toLocaleString() || '2,500'} / {(5000).toLocaleString()} XP</span>
                      </div>
                    </div>
                  </motion.button>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-400/40 rounded-lg p-2 text-center">
                      <Coins className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <div className="text-amber-400 font-bold text-xs">2500</div>
                      <div className="text-white/80 text-xs">coins</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-lg p-2 text-center">
                      <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-amber-400 font-bold text-xs">12500</div>
                      <div className="text-white/80 text-xs">XP</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/40 rounded-lg p-2 text-center">
                      <BadgeDollarSign className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-purple-400 font-bold text-xs">7</div>
                      <div className="text-white/80 text-xs">tokens</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation items - more compact spacing */}
          <div className={`flex-1 mb-4 overflow-y-auto overflow-x-hidden ${isCollapsed ? 'px-2' : ''}`}>
            {navigationItems.map((item, index) => renderNavigationItem(item, index))}
          </div>

          {/* Create buttons */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`${isCollapsed ? 'mb-4 px-2' : 'mb-4'}`}
          >
            {isCollapsed ? (
              // Collapsed state - single + button with tooltip
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative">
                  <motion.button
                    onClick={onCreatePost}
                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredIcon('create')}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                    <Plus className="w-5 h-5 relative z-10" />
                  </motion.button>
                  
                  {/* Collapsed hover tooltip */}
                  <AnimatePresence>
                    {hoveredIcon === 'create' && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 8 }}
                        exit={{ opacity: 0, x: -4 }}
                        className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap z-50"
                      >
                        <div className="bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 shadow-2xl">
                          <div className="text-sm font-bold text-white leading-none">Create</div>
                          <div className="text-xs text-white/70 leading-tight">Post or Challenge</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              // Expanded state - two separate buttons
              <div className="flex space-x-2">
                <motion.button
                  onClick={onCreatePost}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 text-white p-3 rounded-xl font-black shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  <Plus className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 text-sm">Post</span>
                </motion.button>
                
                <motion.button
                  onClick={onCreateChallenge}
                  className="flex-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-3 rounded-xl font-black shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  <Plus className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 text-sm">Challenge</span>
                </motion.button>
              </div>
            )}
          </motion.div>
          
          {/* Bottom spacer for collapsed state */}
          {isCollapsed && <div className="h-2" />}
        </div>
      </div>
    </motion.div>
  );
};