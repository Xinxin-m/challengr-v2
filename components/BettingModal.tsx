import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Users, Coins, Check, X as XIcon, TrendingUp, Calendar, Timer } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface BettingParticipant {
  id: string;
  name: string;
  avatar: string;
  betAmount: number;
  joinedAt: Date;
}

interface BettingChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  startTime: Date;
  endTime: Date;
  participants: BettingParticipant[];
  totalPool: number;
  yesBets: number;
  noBets: number;
  minBet: number;
  maxBet: number;
  creator: {
    name: string;
    avatar: string;
  };
}

interface BettingModalProps {
  challenge: BettingChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaceBet: (challengeId: string, side: 'yes' | 'no', amount: number) => void;
  userCoins: number;
}

export function BettingModal({ 
  challenge, 
  isOpen, 
  onClose, 
  onPlaceBet, 
  userCoins 
}: BettingModalProps) {
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no' | null>(null);
  const [betAmount, setBetAmount] = useState(1);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Calculate time remaining
  useEffect(() => {
    if (!challenge) return;

    const updateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(challenge.endTime);
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Betting closed');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}D ${hours}H left`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}H ${minutes}M left`);
      } else {
        setTimeLeft(`${minutes}M left`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [challenge]);

  const handlePlaceBet = () => {
    if (!challenge || !selectedSide) return;
    onPlaceBet(challenge.id, selectedSide, betAmount);
    onClose();
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  if (!challenge) return null;

  const isBettingClosed = new Date() > new Date(challenge.endTime);
  const yesOdds = challenge.totalPool > 0 ? (challenge.totalPool / (challenge.yesBets + 1)).toFixed(2) : '1.00';
  const noOdds = challenge.totalPool > 0 ? (challenge.totalPool / (challenge.noBets + 1)).toFixed(2) : '1.00';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Betting Challenge</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Place your bet and win coins</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Challenge Details */}
              <div className="p-6 space-y-6">
                {/* Title and Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Challenge Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Start: {formatDateTime(challenge.startTime)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      End: {formatDateTime(challenge.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {challenge.participants.length} participants
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {challenge.totalPool.toLocaleString()} coins pool
                    </span>
                  </div>
                </div>

                {/* Time Remaining */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-orange-700 dark:text-orange-300">
                        Time Remaining
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      {timeLeft}
                    </Badge>
                  </div>
                </div>

                {/* Betting Options */}
                {!isBettingClosed && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Place Your Bet</h4>
                    
                    {/* Betting Sides */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        onClick={() => setSelectedSide('yes')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedSide === 'yes'
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Check className="w-5 h-5 text-green-500" />
                            <span className="font-semibold text-green-700 dark:text-green-300">YES</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {yesOdds}x
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {challenge.yesBets} bets placed
                        </p>
                      </motion.button>

                      <motion.button
                        onClick={() => setSelectedSide('no')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedSide === 'no'
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <XIcon className="w-5 h-5 text-red-500" />
                            <span className="font-semibold text-red-700 dark:text-red-300">NO</span>
                          </div>
                          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            {noOdds}x
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {challenge.noBets} bets placed
                        </p>
                      </motion.button>
                    </div>

                    {/* Bet Amount */}
                    {selectedSide && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Bet Amount
                          </span>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {userCoins} available
                            </span>
                          </div>
                        </div>
                        
                        <Slider
                          value={[betAmount]}
                          onValueChange={(value) => setBetAmount(value[0])}
                          min={challenge.minBet}
                          max={Math.min(challenge.maxBet, userCoins)}
                          step={1}
                          className="w-full"
                        />
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Min: {challenge.minBet} coins</span>
                          <span className="font-medium">{betAmount} coins</span>
                          <span className="text-gray-500">Max: {Math.min(challenge.maxBet, userCoins)} coins</span>
                        </div>

                        {/* Potential Win */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Potential Win
                            </span>
                            <div className="flex items-center space-x-1">
                              <Coins className="w-4 h-4 text-yellow-500" />
                              <span className="font-bold text-lg text-gray-900 dark:text-white">
                                {selectedSide === 'yes' 
                                  ? (betAmount * parseFloat(yesOdds)).toFixed(0)
                                  : (betAmount * parseFloat(noOdds)).toFixed(0)
                                } coins
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Participants List */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Participants ({challenge.participants.length})
                  </h4>
                  
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {challenge.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback>
                              {participant.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {participant.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Joined {participant.joinedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {participant.betAmount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            {!isBettingClosed && selectedSide && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={handlePlaceBet}
                  disabled={betAmount > userCoins}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Place Bet ({betAmount} coins)
                </Button>
                {betAmount > userCoins && (
                  <p className="text-sm text-red-500 mt-2 text-center">
                    Insufficient coins
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
