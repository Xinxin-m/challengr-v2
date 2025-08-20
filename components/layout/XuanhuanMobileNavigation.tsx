import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Sword, Map, Trophy, Plus, BadgeDollarSign } from 'lucide-react';

interface XuanhuanMobileNavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  setShowCreateChallenge: (show: boolean) => void;
}

const RUNE_BACKGROUND = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz4KPHBhdGggZD0ibTEwIDIwaDIwbS0xMC0xMHYyMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4K";

const navItems = [
  { view: 'home', icon: Home, label: 'Home', color: 'from-blue-500 to-cyan-500' },
  { view: 'arena', icon: Sword, label: 'Arena', color: 'from-red-500 to-orange-500' },
  { view: 'betting', icon: BadgeDollarSign, label: 'Betting', color: 'from-green-500 to-emerald-500' },
  { view: 'map', icon: Map, label: 'Map', color: 'from-teal-500 to-cyan-500' },
  { view: 'career', icon: Trophy, label: 'Milestones', color: 'from-purple-500 to-pink-500' }
];

const CultivationMobileBackground: React.FC = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/98 via-indigo-900/95 to-purple-900/98 backdrop-blur-3xl border-t border-cyan-400/30 shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/8 via-purple-600/5 to-amber-500/8" />
    <div className="absolute inset-0 opacity-5">
      <div className={`w-full h-full bg-[url('${RUNE_BACKGROUND}')] bg-repeat`} />
    </div>
  </div>
);

const NavigationButton: React.FC<{
  item: typeof navItems[0];
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  const { icon: Icon, label, color } = item;
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-500 relative overflow-hidden ${
        isActive 
          ? `bg-gradient-to-r ${color} shadow-2xl` 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <div className={`relative ${isActive ? 'text-white' : ''}`}>
        <Icon className="w-6 h-6" />
        {isActive && (
          <motion.div
            layoutId="activeMobileTab"
            className="absolute inset-0 bg-white/20 rounded-lg blur-sm"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>
      <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-white/70'}`}>
        {label}
      </span>
    </motion.button>
  );
};

const CreateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 shadow-2xl text-white relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
    <div className="relative z-10">
      <Plus className="w-6 h-6" />
    </div>
    <span className="text-xs font-bold relative z-10">Create</span>
  </motion.button>
);

export const XuanhuanMobileNavigation: React.FC<XuanhuanMobileNavigationProps> = ({
  currentView,
  setCurrentView,
  setShowCreateChallenge
}) => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 safe-area-inset-bottom"
    >
      <CultivationMobileBackground />
      
      <div className="relative flex items-center justify-around py-4 px-4">
        {navItems.slice(0, 2).map((item) => {
          const isActive = currentView === item.view;
          return (
            <NavigationButton
              key={item.view}
              item={item}
              isActive={isActive}
              onClick={() => {
                console.log('Mobile nav:', item.view);
                setCurrentView(item.view);
              }}
            />
          );
        })}
        
        <CreateButton onClick={() => setShowCreateChallenge(true)} />
        
        {navItems.slice(2).map((item) => {
          const isActive = currentView === item.view;
          return (
            <NavigationButton
              key={item.view}
              item={item}
              isActive={isActive}
              onClick={() => {
                console.log('Mobile nav:', item.view);
                setCurrentView(item.view);
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};