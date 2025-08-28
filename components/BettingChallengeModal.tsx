import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Target, Clock, Users, Coins, ExternalLink, Calendar, 
  Trophy, Info, User, Youtube, Instagram, Twitter, Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChallengeSingle } from '../config/rpg-system';

interface BettingChallengeModalProps {
  challenge: ChallengeSingle;
  isOpen: boolean;
  onClose: () => void;
  onBetYes: (id: string, amount: number) => void;
  onBetNo: (id: string, amount: number) => void;
  userProgress: any;
}

export function BettingChallengeModal({ 
  challenge, 
  isOpen, 
  onClose, 
  onBetYes, 
  onBetNo,
  userProgress
}: BettingChallengeModalProps) {
  
  const [selectedPosition, setSelectedPosition] = useState<'yes' | 'no' | null>(null);
  const [betAmount, setBetAmount] = useState(1);

  if (!challenge) return null;

  // Determine minimum bet amount and increment based on challenge
  const getMinBetAmount = () => {
    // Different challenges may have different minimum amounts
    const minAmounts = [2, 5, 10];
    return minAmounts[Math.floor(Math.random() * minAmounts.length)];
  };

  const minBet = getMinBetAmount();
  const increment = minBet;
  const maxBet = 100;

  // Initialize bet amount to minimum
  React.useEffect(() => {
    setBetAmount(minBet);
  }, [minBet]);

  const formatTimeLeft = (endTime: Date) => {
    const placeholderTimes = [
      '2h 15m',
      '5h 30m',
      '1d 3h',
      '8h 45m',
      '12h 20m',
      '1d 7h'
    ];
    const randomIndex = Math.floor(Math.random() * placeholderTimes.length);
    return placeholderTimes[randomIndex];
  };

  const handleBet = () => {
    if (selectedPosition) {
      if (selectedPosition === 'yes') {
        onBetYes(challenge.id, betAmount);
      } else {
        onBetNo(challenge.id, betAmount);
      }
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-800/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-600/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-slate-600/30">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Place Your Bet</h2>
                  <p className="text-slate-300">Challenge Details & Betting Options</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Challenge Details */}
                <div className="space-y-6">
                  {/* Challenge Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{challenge.description}</p>
                  </div>

                  {/* Creator Profile & Challenge Goal (Merged) */}
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {challenge.creator.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{challenge.creator.name}</div>
                        <div className="text-sm text-slate-400">Level {challenge.creator.level}</div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-600/30">
                      <h4 className="font-medium text-white mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-cyan-400" />
                        Challenge Goal
                      </h4>
                      <p className="text-slate-300 text-sm">{challenge.challenge.goal}</p>
                    </div>
                  </div>

                  {/* Challenge Submission Box */}
                  <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      Challenge Submission
                    </h4>
                    <p className="text-slate-300 text-sm mb-3">
                      I will stream live on YouTube and TikTok at{' '}
                      <span className="text-blue-300 font-medium">
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at 8:00 PM EST
                      </span>
                    </p>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="https://youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                        <span className="text-sm">YouTube</span>
                      </a>
                      <a 
                        href="https://tiktok.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.35 3.17-5.35 3.21-1.43.07-2.83-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                        <span className="text-sm">TikTok</span>
                      </a>
                    </div>
                  </div>

                  {/* Rules Box */}
                  <div className="p-4 bg-amber-500/20 border border-amber-400/30 rounded-xl">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-amber-400" />
                      How It Works
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      After the live challenge ends, our platform will verify the challenge results within 24 hours. 
                      Winners will receive their coins automatically, distributed proportionally based on their bet amounts. 
                      The prize pool is shared among all winning bets according to the odds and bet sizes.
                    </p>
                  </div>

                  {/* Challenge Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-2xl font-bold text-cyan-400">{challenge.participants}</span>
                      </div>
                      <div className="text-xs text-slate-400">Participants</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-2xl font-bold text-yellow-400">{challenge.betting.totalPool}</span>
                      </div>
                      <div className="text-xs text-slate-400">Total Pool</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Betting Interface */}
                <div className="space-y-6">
                  {/* Time Left - Yellow and Shorter */}
                  <div className="p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-yellow-300">
                        {formatTimeLeft(challenge.betting.endTime)} left to place your bet!
                      </span>
                    </div>
                  </div>

                  {/* Betting Options - Same Row */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white text-center">Choose Your Position</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Yes Option */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPosition('yes')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPosition === 'yes'
                            ? 'bg-green-500/20 border-green-400 text-green-300'
                            : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:border-green-400/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-black mb-1">YES</div>
                          <div className="text-lg font-bold text-green-400">{challenge.betting.yesOdds}x</div>
                        </div>
                      </motion.button>

                      {/* No Option */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPosition('no')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPosition === 'no'
                            ? 'bg-red-500/20 border-red-400 text-red-300'
                            : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:border-red-400/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-black mb-1">NO</div>
                          <div className="text-lg font-bold text-red-400">{challenge.betting.noOdds}x</div>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Bet Amount */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white">Bet Amount</label>
                    <Slider
                      value={[betAmount]}
                      onValueChange={(value) => setBetAmount(value[0])}
                      max={maxBet}
                      min={minBet}
                      step={increment}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Min: ${minBet}</span>
                      <span>Max: ${maxBet}</span>
                      <span>Selected: ${betAmount}</span>
                    </div>
                  </div>

                  {/* Place Bet Button - Platform Colors */}
                  <Button
                    onClick={handleBet}
                    disabled={!selectedPosition}
                    className={`w-full py-3 text-lg font-bold rounded-xl ${
                      selectedPosition
                        ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 hover:from-cyan-500 hover:via-purple-600 hover:to-pink-500'
                        : 'bg-slate-600 cursor-not-allowed'
                    } text-white shadow-lg disabled:opacity-50 transition-all duration-200`}
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Place Bet
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
