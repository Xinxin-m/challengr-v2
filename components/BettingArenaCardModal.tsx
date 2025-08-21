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

interface BettingArenaCardModalProps {
  card: any;
  isOpen: boolean;
  onClose: () => void;
  onBetClick: (card: any, position: 'yes' | 'no') => void;
  userTokens: {
    bettingCredits: number;
  };
}

export function BettingArenaCardModal({ 
  card, 
  isOpen, 
  onClose, 
  onBetClick, 
  userTokens 
}: BettingArenaCardModalProps) {
  const [betAmount, setBetAmount] = useState(card?.minBet || 1);
  const [selectedPosition, setSelectedPosition] = useState<'yes' | 'no' | null>(null);

  if (!card) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
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

  const handleBet = () => {
    if (selectedPosition) {
      onBetClick(card, selectedPosition);
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Challenge Info */}
                <div className="space-y-6">
                  {/* Challenge Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{card.description}</p>
                  </div>

                  {/* External Links */}
                  {card.externalLinks && card.externalLinks.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <ExternalLink className="w-5 h-5 text-cyan-400" />
                        <span>External Links</span>
                      </h4>
                      <div className="space-y-2">
                        {card.externalLinks.map((link: any, index: number) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors text-cyan-300 hover:text-cyan-200"
                          >
                            {getPlatformIcon(link.platform)}
                            <span className="text-sm">{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Live Stream Announcement */}
                  {card.liveStream && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-300 font-semibold">Live Stream</span>
                      </div>
                      <p className="text-white text-sm">
                        {card.liveStream.announcement}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-purple-300 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Starting at {formatDateTime(card.liveStream.startTime)}</span>
                      </div>
                    </div>
                  )}

                  {/* Challenge Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">
                        {card.pool.toLocaleString()}
                      </div>
                      <div className="text-slate-300 text-sm">Total Pool</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {card.participants}
                      </div>
                      <div className="text-slate-300 text-sm">Participants</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Betting & Participants */}
                <div className="space-y-6">
                  {/* Tabs */}
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                      <TabsTrigger value="info" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
                        <Info className="w-4 h-4 mr-2" />
                        Info
                      </TabsTrigger>
                      <TabsTrigger value="participants" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                        <Users className="w-4 h-4 mr-2" />
                        Participants
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="space-y-4 mt-4">
                      <div className="bg-slate-700/30 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Start Time:</span>
                          <span className="text-white font-medium">
                            {formatDateTime(card.startDate || card.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">End Time:</span>
                          <span className="text-white font-medium">
                            {formatDateTime(card.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Time Remaining:</span>
                          <span className="text-yellow-300 font-medium">{card.timeLeft}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Min Bet:</span>
                          <span className="text-white font-medium">{card.minBet} credits</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Max Bet:</span>
                          <span className="text-white font-medium">{card.maxBet} credits</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl p-4 border border-slate-500/50">
                        <h4 className="text-white font-semibold mb-2">How it works:</h4>
                        <ul className="text-slate-300 text-sm space-y-1">
                          <li>• You will get your results after the live streaming ends</li>
                          <li>• Winners share the prize pool proportionally</li>
                          <li>• You will be notified of the outcome</li>
                          <li>• Betting closes when the event starts</li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="participants" className="mt-4">
                      <div className="bg-slate-700/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold">Total Participants: {card.participants}</span>
                          <span className="text-cyan-400 font-semibold">
                            {card.totalBetAmount?.toLocaleString() || '0'} coins bet
                          </span>
                        </div>
                        
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                          {card.participantsList?.slice(0, 10).map((participant: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={participant.avatar}
                                  alt={participant.name}
                                  className="w-8 h-8 rounded-full border-2 border-slate-500/50"
                                />
                                <div>
                                  <div className="text-white font-medium text-sm">{participant.name}</div>
                                  <div className="text-slate-300 text-xs">Level {participant.level}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-cyan-400 font-semibold">{participant.betAmount} coins</div>
                                <div className="text-slate-400 text-xs">Bet placed</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {card.participants > 10 && (
                          <div className="text-center text-slate-400 text-sm mt-3">
                            +{card.participants - 10} more participants
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Betting Section */}
                  <div className="bg-slate-700/30 rounded-xl p-4 space-y-4">
                    <h4 className="text-white font-semibold text-lg">Place Your Bet</h4>
                    
                    {/* Position Selection */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPosition('yes')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedPosition === 'yes'
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-slate-600 hover:border-green-400 bg-slate-700/50'
                        }`}
                      >
                        <div className="text-xl mb-1 text-green-400 font-bold">
                          {card.odds.yes}x
                        </div>
                        <div className="text-sm text-green-400">YES</div>
                        <div className="text-xs text-green-300 mt-1">
                          {card.votes.yes} votes
                        </div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPosition('no')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedPosition === 'no'
                            ? 'border-red-500 bg-red-500/20'
                            : 'border-slate-600 hover:border-red-400 bg-slate-700/50'
                        }`}
                      >
                        <div className="text-xl mb-1 text-red-400 font-bold">
                          {card.odds.no}x
                        </div>
                        <div className="text-sm text-red-400">NO</div>
                        <div className="text-xs text-red-300 mt-1">
                          {card.votes.no} votes
                        </div>
                      </motion.button>
                    </div>

                    {/* Bet Amount Slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Bet Amount:</span>
                        <span className="text-white font-medium">{betAmount} credits</span>
                      </div>
                      <Slider
                        value={[betAmount]}
                        onValueChange={(value: number[]) => setBetAmount(value[0])}
                        max={Math.min(userTokens.bettingCredits, card.maxBet)}
                        min={card.minBet}
                        step={card.minBet}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Min: {card.minBet}</span>
                        <span>Max: {Math.min(userTokens.bettingCredits, card.maxBet)}</span>
                      </div>
                    </div>

                    {/* Potential Winnings */}
                    <div className="bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded-xl p-4 border border-slate-500/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300">Potential Win:</span>
                        <span className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold">
                          {selectedPosition ? Math.floor(betAmount * card.odds[selectedPosition]) : 0} 🪙
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Your Credits:</span>
                        <span className="text-cyan-400 font-medium">{userTokens.bettingCredits}</span>
                      </div>
                    </div>

                    {/* Place Bet Button */}
                    <Button
                      onClick={handleBet}
                      disabled={!selectedPosition || userTokens.bettingCredits < betAmount}
                      className={`w-full py-3 text-white rounded-xl font-semibold ${
                        selectedPosition === 'yes' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                          : selectedPosition === 'no'
                          ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                          : 'bg-slate-600 cursor-not-allowed'
                      } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300`}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Place Bet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
