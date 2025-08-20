import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sword, Users, Coins, Target, MessageSquare, Sparkles, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';

interface DualClashFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

// Mock user suggestions (in real app, this would be an API call)
const mockUsers = [
  { id: '1', name: 'DragonSlayer', level: 15, avatar: '🐉' },
  { id: '2', name: 'ShadowWalker', level: 12, avatar: '👤' },
  { id: '3', name: 'CrystalMage', level: 18, avatar: '🔮' },
  { id: '4', name: 'IronFist', level: 10, avatar: '👊' },
  { id: '5', name: 'SwiftArrow', level: 14, avatar: '🏹' },
];

export const DualClashForm: React.FC<DualClashFormProps> = ({
  formData,
  setFormData
}) => {
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectUser = (user: any) => {
    setFormData({ ...formData, opponent: user.name });
    setShowUserSuggestions(false);
    setSearchQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 bg-red-500/10 rounded-xl border border-red-400/30">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Sword className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-300">Dual Clash Configuration</h3>
          <p className="text-red-200/70 text-sm">Prepare for an epic battle of skill and determination</p>
        </div>
      </div>

      {/* Opponent Selection */}
      <div className="space-y-3">
        <label className="block text-red-300 font-semibold">
          <Users className="w-4 h-4 inline mr-2" />
          Choose Your Opponent
        </label>
        <div className="relative">
          <Input
            placeholder="Search for a worthy opponent... (e.g., @DragonSlayer)"
            value={formData.opponent}
            onChange={(e) => {
              setFormData({ ...formData, opponent: e.target.value });
              setSearchQuery(e.target.value);
              setShowUserSuggestions(true);
            }}
            onFocus={() => setShowUserSuggestions(true)}
            className="bg-slate-800/50 border-red-400/30 text-white placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/20"
          />
          
          {/* User Suggestions */}
          {showUserSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-red-400/30 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto"
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    onClick={() => selectUser(user)}
                    className="flex items-center space-x-3 p-3 hover:bg-red-500/10 cursor-pointer border-b border-red-400/10 last:border-b-0"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-red-300/70 text-sm">Level {user.level}</div>
                    </div>
                    <div className="text-red-400">
                      <Sword className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400">
                  No opponents found matching "{searchQuery}"
                </div>
              )}
            </motion.div>
          )}
        </div>
        <p className="text-slate-400 text-sm">
          Select a worthy opponent for your epic duel. The community will place their bets on the outcome.
        </p>
      </div>

      {/* Betting Rules */}
      <div className="space-y-4">
        <label className="block text-red-300 font-semibold">
          <Coins className="w-4 h-4 inline mr-2" />
          Betting Rules
        </label>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-red-400/20">
          <div className="space-y-4">
            <div>
              <label className="block text-red-300/80 text-sm mb-2">Minimum Wager (Coins)</label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.minWager]}
                  onValueChange={(value) => setFormData({ ...formData, minWager: value[0] })}
                  max={100}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <div className="w-16 text-center">
                  <span className="text-red-300 font-bold">{formData.minWager}</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Set the minimum amount that spectators must wager to bet on the winner of your duel.
            </p>
          </div>
        </div>
      </div>

      {/* Victory Condition */}
      <div className="space-y-3">
        <label className="block text-red-300 font-semibold">
          <Target className="w-4 h-4 inline mr-2" />
          Victory Condition
        </label>
        <Textarea
          placeholder="Define the conditions for victory... (e.g., First to complete the goal wins, Best time wins, Highest score wins)"
          value={formData.victoryCondition}
          onChange={(e) => setFormData({ ...formData, victoryCondition: e.target.value })}
          className="bg-slate-800/50 border-red-400/30 text-white placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/20"
          rows={3}
        />
        <p className="text-slate-400 text-sm">
          Clearly define what determines the winner of your epic clash. This will guide both competitors and bettors.
        </p>
      </div>

      {/* Challenge Message */}
      <div className="space-y-3">
        <label className="block text-red-300 font-semibold">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Challenge Message
        </label>
        <Textarea
          placeholder="Send a message to your opponent... (e.g., Dare you face me in the arena? Let's see who truly deserves the title of champion!)"
          value={formData.challengeMessage}
          onChange={(e) => setFormData({ ...formData, challengeMessage: e.target.value })}
          className="bg-slate-800/50 border-red-400/30 text-white placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/20"
          rows={2}
        />
        <p className="text-slate-400 text-sm">
          Send a taunt or challenge message to your opponent. Make it epic and memorable!
        </p>
      </div>

      {/* Clash Preview */}
      {formData.opponent && formData.victoryCondition && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-400/30"
        >
          <h4 className="text-red-300 font-semibold mb-3">Clash Preview</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white">You</span>
              <div className="flex items-center space-x-2">
                <span className="text-red-300">VS</span>
                <span className="text-white">{formData.opponent}</span>
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-white"><span className="text-red-300">Victory Condition:</span> {formData.victoryCondition}</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-white"><span className="text-red-300">Minimum Wager:</span> {formData.minWager} coins</p>
            </div>
            {formData.challengeMessage && (
              <div className="p-3 bg-red-500/20 rounded-lg border border-red-400/30">
                <p className="text-red-200 italic">"{formData.challengeMessage}"</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Betting Info */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-400/30">
        <div className="flex items-center space-x-2 mb-2">
          <Coins className="w-5 h-5 text-amber-400" />
          <h4 className="text-amber-300 font-semibold">Betting System</h4>
        </div>
        <p className="text-amber-200/80 text-sm">
          Once your challenge is created, the community can place bets on who they think will win. 
          The winner takes a portion of the betting pool as additional rewards!
        </p>
      </div>
    </motion.div>
  );
};
