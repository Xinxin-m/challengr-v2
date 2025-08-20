import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, Menu, Wallet, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MultiWalletConnect } from './MultiWalletConnect';

interface MobileHeaderProps {
  onShowProfile: () => void;
  onShowNotifications: () => void;
  onToggleSidebar: () => void;
  notificationCount: number;
  isWalletConnected: boolean;
  onWalletConnect: (wallet: string, address: string) => void;
}

export function MobileHeader({
  onShowProfile,
  onShowNotifications,
  onToggleSidebar,
  notificationCount,
  isWalletConnected,
  onWalletConnect
}: MobileHeaderProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 z-40">
        <div className="flex items-center justify-between p-4">
          {/* Left Side - Menu & Logo */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={onToggleSidebar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center"
            >
              <Menu size={20} className="text-gray-600 dark:text-gray-300" />
            </motion.button>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  boxShadow: [
                    '0 0 15px rgba(168,85,247,0.3)', 
                    '0 0 25px rgba(236,72,153,0.5)', 
                    '0 0 15px rgba(168,85,247,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-lg">🎯</span>
              </motion.div>
              <div>
                <h1 className="text-lg text-gray-900 dark:text-white tracking-tight">EduChain</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Learn • Earn • Connect</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Wallet Connection */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant={isWalletConnected ? "default" : "outline"}
                size="sm"
                onClick={() => setShowWalletModal(true)}
                className={`rounded-2xl px-3 py-2 ${
                  isWalletConnected 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg' 
                    : 'border-2 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {isWalletConnected ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                      <span className="text-sm">Connected</span>
                    </>
                  ) : (
                    <>
                      <Wallet size={16} />
                      <span className="text-sm">Connect</span>
                    </>
                  )}
                </div>
              </Button>
            </motion.div>

            {/* Notifications */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowNotifications}
                className="relative w-10 h-10 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm p-0"
              >
                <Bell size={18} className="text-gray-600 dark:text-gray-300" />
                {notificationCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg"
                  >
                    {notificationCount}
                  </motion.div>
                )}
              </Button>
            </motion.div>

            {/* Profile */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowProfile}
                className="relative w-10 h-10 rounded-2xl p-0 overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white shadow-sm"
                  />
                </div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* User Level Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg"
              >
                👑
              </motion.div>
              <span className="text-gray-600 dark:text-gray-300">Level 12</span>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full px-2 py-0.5">
                Educator
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-500"
                >
                  🪙
                </motion.span>
                <span className="text-yellow-600 dark:text-yellow-400 text-sm">1,234</span>
              </div>
              <div className="flex items-center space-x-1">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-purple-500"
                >
                  💎
                </motion.span>
                <span className="text-purple-600 dark:text-purple-400 text-sm">567</span>
              </div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="mt-2">
            <div className="w-full h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>75% to Level 13</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center space-x-1"
              >
                <Sparkles size={10} />
                <span>+127 today</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Wallet Connection Modal */}
      <MultiWalletConnect
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={onWalletConnect}
        isConnected={isWalletConnected}
      />
    </>
  );
}