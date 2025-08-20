import React from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, Plus, Users, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: 'home' | 'betting' | 'challenges' | 'map' | 'membership' | 'profile' | 'earn';
  onViewChange: (view: 'home' | 'betting' | 'challenges' | 'map' | 'membership' | 'profile' | 'earn') => void;
  onCreatePost: () => void;
  onCreateChallenge: () => void;
}

export function MobileBottomNav({ currentView, onViewChange, onCreatePost, onCreateChallenge }: MobileBottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', view: 'home' as const, emoji: '🏠' },
    { id: 'betting', icon: Trophy, label: 'Betting', view: 'betting' as const, emoji: '🎲' },
    { id: 'create', icon: Plus, label: 'Create', view: null, emoji: '✨', isCreate: true },
    { id: 'map', icon: Users, label: 'Earth', view: 'map' as const, emoji: '🌍' },
    { id: 'challenges', icon: User, label: 'Challenges', view: 'challenges' as const, emoji: '🎯' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 z-50 shadow-lg">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          const isCreate = item.isCreate;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                if (isCreate) {
                  onCreatePost();
                } else if (item.view) {
                  onViewChange(item.view);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                isCreate
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 shadow-purple-500/25'
                  : isActive
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
              } ${isCreate ? 'w-14 h-14' : 'w-12 h-12'}`}
            >
              {isCreate ? (
                <motion.div
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-2xl"
                >
                  {item.emoji}
                </motion.div>
              ) : (
                <div className="text-xl">{item.emoji}</div>
              )}
              
              {/* Active indicator */}
              {isActive && !isCreate && (
                <motion.div
                  layoutId="mobile-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full"
                />
              )}
              
              {/* Floating plus effect for create button */}
              {isCreate && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168,85,247,0.4)',
                      '0 0 30px rgba(236,72,153,0.6)',
                      '0 0 25px rgba(6,182,212,0.4)',
                      '0 0 20px rgba(168,85,247,0.4)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Bottom safe area */}
      <div className="h-safe-area-inset-bottom bg-card/90 dark:bg-card/95"></div>
    </div>
  );
}