import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Coins, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface BettingCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    startTime: Date;
    endTime: Date;
    participants: Array<{
      id: string;
      name: string;
      avatar: string;
      betAmount: number;
    }>;
    totalPool: number;
    yesBets: number;
    noBets: number;
    minBet: number;
    maxBet: number;
    creator: {
      name: string;
      avatar: string;
    };
  };
  onClick: () => void;
  userCoins: number;
}

export function BettingCard({ challenge, onClick, userCoins }: BettingCardProps) {
  const formatTimeLeft = () => {
    const now = new Date();
    const endTime = new Date(challenge.endTime);
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Betting closed';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}D ${hours}H left`;
    } else if (hours > 0) {
      return `${hours}H ${minutes}M left`;
    } else {
      return `${minutes}M left`;
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const isBettingClosed = new Date() > new Date(challenge.endTime);
  const yesOdds = challenge.totalPool > 0 ? (challenge.totalPool / (challenge.yesBets + 1)).toFixed(2) : '1.00';
  const noOdds = challenge.totalPool > 0 ? (challenge.totalPool / (challenge.noBets + 1)).toFixed(2) : '1.00';

  return (
    <motion.div
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {challenge.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {challenge.description}
            </p>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <Badge 
              variant="secondary" 
              className={`${
                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                challenge.difficulty === 'hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}
            >
              {challenge.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {challenge.category}
            </Badge>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={challenge.creator.avatar} />
            <AvatarFallback>
              {challenge.creator.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {challenge.creator.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Challenge Creator
            </p>
          </div>
        </div>
      </div>

      {/* Time and Stats */}
      <div className="p-6 space-y-4">
        {/* Time Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Start</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDateTime(challenge.startTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">End</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDateTime(challenge.endTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Time Remaining */}
        <div className={`rounded-xl p-3 ${
          isBettingClosed 
            ? 'bg-red-50 dark:bg-red-900/20' 
            : 'bg-orange-50 dark:bg-orange-900/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${
                isBettingClosed ? 'text-red-500' : 'text-orange-500'
              }`} />
              <span className={`text-sm font-medium ${
                isBettingClosed ? 'text-red-700 dark:text-red-300' : 'text-orange-700 dark:text-orange-300'
              }`}>
                {isBettingClosed ? 'Betting Closed' : 'Time Remaining'}
              </span>
            </div>
            <Badge variant="secondary" className={`${
              isBettingClosed 
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
            }`}>
              {formatTimeLeft()}
            </Badge>
          </div>
        </div>

        {/* Betting Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {challenge.participants.length}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Participants</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {challenge.totalPool.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Pool</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {challenge.yesBets + challenge.noBets}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Bets</p>
          </div>
        </div>

        {/* Betting Odds */}
        {!isBettingClosed && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">YES</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {yesOdds}x
                </Badge>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                {challenge.yesBets} bets
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-red-700 dark:text-red-300">NO</span>
                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {noOdds}x
                </Badge>
              </div>
              <p className="text-xs text-red-600 dark:text-red-400">
                {challenge.noBets} bets
              </p>
            </div>
          </div>
        )}

        {/* Bet Limits */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Min bet: <span className="font-medium">{challenge.minBet} coins</span>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Max bet: <span className="font-medium">{challenge.maxBet} coins</span>
          </span>
        </div>

        {/* Action Button */}
        <motion.button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            isBettingClosed
              ? 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed'
              : userCoins < challenge.minBet
              ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
          }`}
          disabled={isBettingClosed || userCoins < challenge.minBet}
          whileHover={!isBettingClosed && userCoins >= challenge.minBet ? { scale: 1.02 } : {}}
          whileTap={!isBettingClosed && userCoins >= challenge.minBet ? { scale: 0.98 } : {}}
        >
          {isBettingClosed ? (
            'Betting Closed'
          ) : userCoins < challenge.minBet ? (
            `Need ${challenge.minBet - userCoins} more coins`
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Coins className="w-4 h-4" />
              <span>Place Your Bet</span>
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
