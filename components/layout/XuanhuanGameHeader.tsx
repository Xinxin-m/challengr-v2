import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, Filter, Gem, Zap, Crown, Settings, Menu, ChevronDown, Bell, Wallet, Coins
} from 'lucide-react';
import { Button } from '../ui/button';
import { AAA_CharacterPortrait, MiniCharacterPortrait } from '../character/AAA_CharacterPortrait';

interface XuanhuanGameHeaderProps {
  isMobile: boolean;
  sidebarCollapsed: boolean;
  userProgress: any;
  currentView: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  setShowGameSettings: (show: boolean) => void;
  onToggleSidebar: () => void;
  onOpenNotifications: () => void;
  onOpenWallet: () => void;
  walletConnected: boolean;
}

const RUNE_BACKGROUND = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz4KPHBhdGggZD0ibTEwIDIwaDIwbS0xMC0xMHYyMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4K";

const CultivationBackground: React.FC = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/98 via-indigo-900/95 to-purple-900/98 backdrop-blur-3xl border-b border-cyan-400/30 shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/8 via-purple-600/5 to-amber-500/8" />
    <div className="absolute inset-0 opacity-5">
      <div className={`w-full h-full bg-[url('${RUNE_BACKGROUND}')] bg-repeat`} />
    </div>
  </div>
);



const CompactStats: React.FC<{ userProgress: any }> = ({ userProgress }) => (
  <div className="flex items-center space-x-4">
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-orange-500/20 px-3 py-2 rounded-2xl border border-amber-400/50 shadow-xl backdrop-blur-sm group"
    >
      <Coins className="w-5 h-5 text-amber-400 group-hover:animate-spin" />
      <span className="text-sm font-bold text-amber-400">{userProgress.dailyCoins?.toLocaleString() || '2,500'}</span>
    </motion.div>
    
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 via-cyan-400/20 to-blue-500/20 px-3 py-2 rounded-2xl border border-cyan-400/50 shadow-xl backdrop-blur-sm group"
    >
      <Zap className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
      <span className="text-sm font-bold text-cyan-400">{userProgress.totalXP?.toLocaleString() || '12,500'}</span>
    </motion.div>
  </div>
);

const SearchWithFilters: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}> = ({ searchQuery, setSearchQuery, showFilters, setShowFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const challengeTypes = ['quiz', 'puzzle', 'meme', 'creativity', 'battle'];
  const categories = ['fitness', 'learning', 'social', 'creative', 'business', 'health'];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300" />
      <div className="relative flex items-center">
        <Eye className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 z-10" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for adventures..."
          className="pl-12 pr-20 py-2 w-96 bg-slate-800/60 border border-cyan-400/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 transition-all duration-300 text-white placeholder-white/70 backdrop-blur-sm"
        />
        
        {/* Filters dropdown button */}
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 text-cyan-400 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-4 h-4" />
        </motion.button>

        {/* Filters dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-4 shadow-2xl z-50"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-cyan-400 mb-2">Challenge Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {challengeTypes.map((type) => (
                      <button
                        key={type}
                        className="px-3 py-1 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all duration-200 capitalize"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-purple-400 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="px-3 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all duration-200 capitalize"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const XuanhuanGameHeader: React.FC<XuanhuanGameHeaderProps> = ({
  isMobile,
  sidebarCollapsed,
  userProgress,
  currentView,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  setShowGameSettings,
  onToggleSidebar,
  onOpenNotifications,
  onOpenWallet,
  walletConnected
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past 50px - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (isMobile) {
    return (
      <motion.div 
        initial={{ y: -64 }}
        animate={{ y: isVisible ? 0 : -64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 h-16"
      >
        <CultivationBackground />
        
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {/* Mobile content will be handled separately */}
          </div>
          
          <div className="flex items-center space-x-3">
            <CompactStats userProgress={userProgress} />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenNotifications}
              className="p-3 rounded-2xl bg-slate-800/50 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGameSettings(true)}
              className="p-3 rounded-2xl bg-slate-800/50 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop Header - now pushed by sidebar, no logo
  return (
    <motion.div 
      initial={{ y: -64 }}
      animate={{ y: isVisible ? 0 : -64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 z-30 h-16 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'left-16 right-0' : 'left-80 right-0'
      }`}
    >
      <CultivationBackground />
      
      <div className="relative h-full flex items-center justify-between px-8">
        {/* Left side - Search */}
        <div className="flex items-center space-x-6">
          {(currentView === 'arena' || currentView === 'map' || currentView === 'home') && (
            <SearchWithFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          )}
        </div>

        {/* Right side - Stats and Actions */}
        <div className="flex items-center space-x-6">
          <CompactStats userProgress={userProgress} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenWallet}
            className={`p-3 rounded-2xl border transition-all duration-300 ${
              walletConnected 
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/30' 
                : 'bg-slate-800/50 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20'
            }`}
          >
            <Wallet className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenNotifications}
            className="p-3 rounded-2xl bg-slate-800/50 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
          >
            <Bell className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGameSettings(true)}
            className="p-3 rounded-2xl bg-slate-800/50 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};