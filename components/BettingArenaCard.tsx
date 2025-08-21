import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Coins, TrendingUp, X, Target, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';

interface BettingArenaCardProps {
  card: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    odds: {
      yes: number;
      no: number;
    };
    pool: number;
    participants: number;
    timeLeft: string;
    endDate: Date;
    minBet: number;
    maxBet: number;
    creator: {
      name: string;
      avatar: string;
      level: number;
      verified: boolean;
    };
    status: 'live' | 'upcoming';
    image?: string;
    votes: {
      yes: number;
      no: number;
    };
    type: 'solo' | 'dual';
    player1?: {
      name: string;
      avatar: string;
      level: number;
    };
    player2?: {
      name: string;
      avatar: string;
      level: number;
    };
  };
  onBetClick: (card: any, position: 'yes' | 'no') => void;
  onCardClick: (card: any) => void;
  userTokens: {
    bettingCredits: number;
  };
}

export function BettingArenaCard({ card, onBetClick, onCardClick, userTokens }: BettingArenaCardProps) {
  const [betAmount, setBetAmount] = useState(card.minBet);

  // Calculate slider step based on min bet
  const sliderStep = card.minBet;
  const maxSliderValue = Math.floor(card.maxBet / sliderStep) * sliderStep;

  return (
    <motion.div
      className="w-full bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCardClick(card)}
    >
      {/* Thumbnail with Title Overlay */}
      <div className="relative h-48 overflow-hidden">
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-500 to-slate-600" />
        )}
        
        {/* Tags on top - more visible with less transparency and bigger font */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Badge className="bg-slate-700/80 text-slate-200 border-slate-600/70 text-sm font-medium">
            {card.category}
          </Badge>
          <Badge className={`${
            card.status === 'live' 
              ? 'bg-emerald-900/80 text-emerald-200 border-emerald-400/70' 
              : 'bg-yellow-900/80 text-yellow-200 border-yellow-400/70'
          } text-sm font-medium`}>
            {card.status === 'live' ? 'Live' : 'Upcoming'}
          </Badge>
        </div>

        {/* Enhanced shadow degradation at bottom for title - increased height */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
        
        {/* Title at bottom with better visibility */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white line-clamp-2">
            {card.title}
          </h3>
        </div>
      </div>

      {/* Description below thumbnail */}
      <div className="px-6 pt-4 pb-2">
        <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-4">
        {/* Creator Info */}
        <div className="flex items-center space-x-3">
          <img
            src={card.creator.avatar}
            alt={card.creator.name}
            className="w-8 h-8 rounded-full border-2 border-slate-500/50"
          />
          <div>
            <p className="text-sm font-medium text-white">
              {card.creator.name}
            </p>
            <p className="text-xs text-slate-300">
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
                {card.participants}
              </span>
            </div>
            <p className="text-xs text-slate-300">Participants</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-lg font-bold text-white">
                {card.pool.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-slate-300">Total Pool</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-lg font-bold text-white">
                {card.votes.yes + card.votes.no}
              </span>
            </div>
            <p className="text-xs text-slate-300">Total Votes</p>
          </div>
        </div>

        {/* Time Remaining in Yellow Box - Fixed display */}
        <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">Time Remaining:</span>
            </div>
            <span className="text-lg font-bold text-yellow-200">
              {card.timeLeft}
            </span>
          </div>
        </div>

        {/* Betting Options - Different for Solo vs Dual */}
        {card.type === 'dual' && card.player1 && card.player2 ? (
          // Dual Battle - Show both players
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onBetClick(card, 'yes');
              }}
              className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center hover:bg-green-500/30 transition-colors"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img
                  src={card.player1.avatar}
                  alt={card.player1.name}
                  className="w-8 h-8 rounded-full border-2 border-green-400/50"
                />
                <div className="text-left">
                  <div className="text-sm font-semibold text-green-300">{card.player1.name}</div>
                  <div className="text-xs text-green-200">Level {card.player1.level}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-green-300">BET ON</span>
                <Badge className="bg-green-900/50 text-green-200 border-green-400/50">
                  {card.odds.yes}x
                </Badge>
              </div>
              <p className="text-xs text-green-200">
                {card.votes.yes} votes
              </p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onBetClick(card, 'no');
              }}
              className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-center hover:bg-red-500/30 transition-colors"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img
                  src={card.player2.avatar}
                  alt={card.player2.name}
                  className="w-8 h-8 rounded-full border-2 border-red-400/50"
                />
                <div className="text-left">
                  <div className="text-sm font-semibold text-red-300">{card.player2.name}</div>
                  <div className="text-xs text-red-200">Level {card.player2.level}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-red-300">BET ON</span>
                <Badge className="bg-red-900/50 text-red-200 border-red-400/50">
                  {card.odds.no}x
                </Badge>
              </div>
              <p className="text-xs text-red-200">
                {card.votes.no} votes
              </p>
            </motion.button>
          </div>
        ) : (
          // Solo Challenge - Show Yes/No
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onBetClick(card, 'yes');
              }}
              className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center hover:bg-green-500/30 transition-colors"
            >
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-green-300">YES</span>
                <Badge className="bg-green-900/50 text-green-200 border-green-400/50">
                  {card.odds.yes}x
                </Badge>
              </div>
              <p className="text-xs text-green-200">
                {card.votes.yes} votes
              </p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onBetClick(card, 'no');
              }}
              className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-center hover:bg-red-500/30 transition-colors"
            >
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-red-300">NO</span>
                <Badge className="bg-red-900/50 text-red-200 border-red-400/50">
                  {card.odds.no}x
                </Badge>
              </div>
              <p className="text-xs text-red-200">
                {card.votes.no} votes
              </p>
            </motion.button>
          </div>
        )}

        {/* Bet Amount Slider - Thinner with darker background and blue/purple gradient */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Bet Amount:</span>
            <span className="text-white font-medium">{betAmount} credits</span>
          </div>
          <div className="bg-slate-900/80 rounded-lg p-2">
            <Slider
              value={[betAmount]}
              onValueChange={(value: number[]) => setBetAmount(value[0])}
              max={maxSliderValue}
              min={card.minBet}
              step={sliderStep}
              className="w-full"
              style={{
                '--slider-track-height': '4px',
                '--slider-track-bg': 'rgb(51 65 85 / 0.8)',
                '--slider-track-border-radius': '2px',
                '--slider-thumb-size': '16px',
                '--slider-thumb-bg': 'linear-gradient(135deg, rgb(6 182 212), rgb(147 51 234))',
                '--slider-thumb-border': '2px solid rgb(6 182 212)',
                '--slider-thumb-border-radius': '50%',
                '--slider-thumb-shadow': '0 4px 8px rgba(6, 182, 212, 0.3)',
                '--slider-progress-bg': 'linear-gradient(135deg, rgb(6 182 212), rgb(147 51 234))',
              } as React.CSSProperties}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Min: {card.minBet}</span>
            <span>Max: {card.maxBet}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
