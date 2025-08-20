import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sword, Users, Coins, Target, MessageSquare, Sparkles, Search, Save } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';

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

  const handleSaveDraft = () => {
    const draft = {
      ...formData,
      timestamp: new Date(),
      type: 'dual-clash'
    };
    const drafts = JSON.parse(localStorage.getItem('challenge-drafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('challenge-drafts', JSON.stringify(drafts));
    // Show success feedback
    alert('Draft saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Save Button at Top */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveDraft}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Draft</span>
        </motion.button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-400/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Sword className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-300">Dual Clash Configuration</h3>
            <p className="text-red-200/70 text-sm">Prepare for an epic battle of skill and determination</p>
          </div>
        </div>
      </div>

      {/* Quest Lore */}
      <div className="space-y-3">
        <label className="block text-red-300 font-semibold">
          <Sparkles className="w-4 h-4 inline mr-2" />
          Quest Lore
        </label>
        <Textarea
          placeholder="Inscribe your quest's lore... Share the tale of your challenge, its purpose, and what awaits those who dare to accept it."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-slate-800/50 border-red-400/30 text-white placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/20"
          rows={3}
        />
        <p className="text-slate-400 text-sm">
          Describe your quest's story and purpose. This will be visible to others who discover your challenge.
        </p>
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
                  <motion.button
                    key={user.id}
                    whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                    onClick={() => selectUser(user)}
                    className="w-full p-3 flex items-center space-x-3 hover:bg-red-500/20 transition-colors border-b border-red-400/10 last:border-b-0"
                  >
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1 text-left">
                      <div className="text-red-300 font-medium">{user.name}</div>
                      <div className="text-slate-400 text-sm">Level {user.level}</div>
                    </div>
                    <div className="text-red-400 text-sm">Select</div>
                  </motion.button>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400">
                  No users found matching "{searchQuery}"
                </div>
              )}
            </motion.div>
          )}
        </div>
        <p className="text-slate-400 text-sm">
          Challenge a fellow cultivator to a duel. The community will place their bets on the outcome.
        </p>
      </div>

      {/* Wager Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-red-300 font-semibold">
            <Coins className="w-4 h-4 inline mr-2" />
            Minimum Wager
          </label>
          <div className="text-red-300 font-bold text-lg">
            {formData.minWager} coins
          </div>
        </div>
        
        <div className="px-4">
          <Slider
            value={[formData.minWager]}
            onValueChange={(value) => setFormData({ ...formData, minWager: value[0] })}
            max={1000}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between text-xs text-slate-400">
          <span>1 coin</span>
          <span>1000 coins</span>
        </div>
        
        <p className="text-slate-400 text-sm">
          Set the minimum wager for this duel. Higher wagers attract more attention and bigger rewards.
        </p>
      </div>

      {/* Victory Condition */}
      <div className="space-y-3">
        <label className="block text-red-300 font-semibold">
          <Target className="w-4 h-4 inline mr-2" />
          Victory Condition
        </label>
        <Textarea
          placeholder="Define what determines the winner... (e.g., 'First to complete 100 push-ups', 'Highest score in the coding challenge', 'Best time in the obstacle course')"
          value={formData.victoryCondition}
          onChange={(e) => setFormData({ ...formData, victoryCondition: e.target.value })}
          className="bg-slate-800/50 border-red-400/30 text-white placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/20"
          rows={3}
        />
        <p className="text-slate-400 text-sm">
          Clearly define what determines the winner. This will be used to judge the outcome of your duel.
        </p>
      </div>

      {/* Challenge Message */}
      <div className="space-y-3">
        <label className="block text-red-300 font-semibold">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Challenge Message
        </label>
        <Textarea
          placeholder="Send a message to your opponent... (e.g., 'Dare you face me in the arena?', 'Let's see who's the better coder!', 'Time to prove who's the strongest!')"
          value={formData.challengeMessage}
          onChange={(e) => setFormData({ ...formData, challengeMessage: e.target.value })}
          className="bg-slate-800/50 border-red-400/30 text-white placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/20"
          rows={2}
        />
        <p className="text-slate-400 text-sm">
          Send a taunt or challenge message to your opponent. Make it epic!
        </p>
      </div>

      {/* Duel Preview */}
      {formData.opponent && formData.victoryCondition && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-400/30"
        >
          <h4 className="text-red-300 font-semibold mb-2">Duel Preview</h4>
          <div className="space-y-2 text-sm">
            <p className="text-white">
              <span className="text-red-300">Opponent:</span> {formData.opponent}
            </p>
            <p className="text-white">
              <span className="text-red-300">Wager:</span> {formData.minWager} coins
            </p>
            <p className="text-white">
              <span className="text-red-300">Victory Condition:</span> {formData.victoryCondition}
            </p>
            <p className="text-white">
              <span className="text-red-300">Message:</span> {formData.challengeMessage}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
