import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Coins, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CARD_BACKGROUNDS } from '../styles/themes';
import { Slider } from './ui/slider';

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
    image?: string;
    status?: 'live' | 'upcoming';
  };
  onClick: () => void;
  userCoins: number;
}

export function BettingCard({ challenge, onClick, userCoins }: BettingCardProps) {
  const [betAmount, setBetAmount] = useState(challenge.minBet);

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

  // Calculate slider step based on min bet
  const sliderStep = challenge.minBet;
  const maxSliderValue = Math.floor(challenge.maxBet / sliderStep) * sliderStep;

  return (
    <motion.div
      onClick={onClick}
      className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${CARD_BACKGROUNDS.betting}`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail with Title Overlay */}
      <div className="relative h-48 overflow-hidden">
        {challenge.image ? (
          <img
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
        )}
        
        {/* Tags on top */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Badge variant="outline" className="text-xs border-emerald-400/50 text-emerald-200 bg-emerald-900/50">
            {challenge.category}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`${
              isBettingClosed ? 'bg-red-900/50 text-red-200 border-red-400/50' : 'bg-emerald-900/50 text-emerald-200 border-emerald-400/50'
            }`}
          >
            {isBettingClosed ? 'Closed' : (challenge.status || 'Live')}
          </Badge>
        </div>

        {/* Title at bottom with gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h3 className="text-lg font-bold text-white line-clamp-2">
            {challenge.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Creator Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={challenge.creator.avatar} />
            <AvatarFallback>
              {challenge.creator.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">
              {challenge.creator.name}
            </p>
            <p className="text-xs text-emerald-200">
              Challenge Creator
            </p>
          </div>
        </div>

        {/* Stats directly below creator (no horizontal line) */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-lg font-bold text-white">
                {challenge.participants.length}
              </span>
            </div>
            <p className="text-xs text-emerald-200">Participants</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-lg font-bold text-white">
                {challenge.totalPool.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-emerald-200">Total Pool</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-lg font-bold text-white">
                {challenge.yesBets + challenge.noBets}
              </span>
            </div>
            <p className="text-xs text-emerald-200">Total Votes</p>
          </div>
        </div>

        {/* Time Remaining in Yellow Box */}
        <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">Time Remaining</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-200 border-yellow-400/50 font-bold">
              {formatTimeLeft()}
            </Badge>
          </div>
        </div>

        {/* Betting Odds - Clickable */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center hover:bg-green-500/30 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span className="text-sm font-semibold text-green-300">YES</span>
              <Badge variant="secondary" className="bg-green-900/50 text-green-200 border-green-400/50">
                {yesOdds}x
              </Badge>
            </div>
            <p className="text-xs text-green-200">
              {challenge.yesBets} votes
            </p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-center hover:bg-red-500/30 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span className="text-sm font-semibold text-red-300">NO</span>
              <Badge variant="secondary" className="bg-red-900/50 text-red-200 border-red-400/50">
                {noOdds}x
              </Badge>
            </div>
            <p className="text-xs text-red-200">
              {challenge.noBets} votes
            </p>
          </motion.button>
        </div>

        {/* Bet Amount Slider */}
        {!isBettingClosed && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-200">Bet Amount:</span>
              <span className="text-white font-medium">{betAmount} coins</span>
            </div>
            <Slider
              value={[betAmount]}
              onValueChange={(value: number[]) => setBetAmount(value[0])}
              max={maxSliderValue}
              min={challenge.minBet}
              step={sliderStep}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span>Min: {challenge.minBet}</span>
              <span>Max: {challenge.maxBet}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            isBettingClosed
              ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-400/30'
              : userCoins < challenge.minBet
              ? 'bg-red-500/20 text-red-400 cursor-not-allowed border border-red-400/30'
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl border border-emerald-400/50'
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
