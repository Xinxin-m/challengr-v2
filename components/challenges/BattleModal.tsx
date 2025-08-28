import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Target, Clock, Users, Coins, ExternalLink, Calendar, 
  Trophy, Info, User, Youtube, Instagram, Twitter, Globe, ChevronDown, ChevronUp, Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Avatar } from '../ui/avatar';
import { ChallengeDouble } from '../../config/rpg-system';
import { CURRENT_USER } from '../../data/currentUser';
import { useNotifications } from '../../contexts/NotificationContext';

interface BattleModalProps {
  challenge: ChallengeDouble;
  isOpen: boolean;
  onClose: () => void;
  onBetBlue: (id: string, amount: number) => void;
  onBetRed: (id: string, amount: number) => void;
  userProgress: any;
}

// Mock participant betting data
const mockParticipants = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    amount: 25,
    timeAgo: '1 min ago'
  },
  {
    id: '2',
    name: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    amount: 15,
    timeAgo: '3 min ago'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    amount: 50,
    timeAgo: '5 min ago'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    amount: 30,
    timeAgo: '8 min ago'
  },
  {
    id: '5',
    name: 'David Lee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    amount: 20,
    timeAgo: '12 min ago'
  },
  {
    id: '6',
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=50&h=50&fit=crop&crop=face',
    amount: 40,
    timeAgo: '15 min ago'
  }
];

export function BattleModal({ 
  challenge, 
  isOpen, 
  onClose, 
  onBetBlue, 
  onBetRed,
  userProgress
}: BattleModalProps) {
  
  const [selectedPosition, setSelectedPosition] = useState<'blue' | 'red' | null>(null);
  const [betAmount, setBetAmount] = useState(5);
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);
  const [currentUserCoins, setCurrentUserCoins] = useState(CURRENT_USER.coins);
  
  const { addNotification } = useNotifications();

  if (!challenge) return null;

  const minBet = challenge.betting.minBet;
  const maxBet = challenge.betting.maxBet;
  const increment = minBet;

  // Initialize bet amount to minimum
  React.useEffect(() => {
    setBetAmount(minBet);
  }, [minBet]);

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d${hours}h${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleBet = () => {
    if (selectedPosition && !betPlaced) {
      if (selectedPosition === 'blue') {
        onBetBlue(challenge.id, betAmount);
      } else {
        onBetRed(challenge.id, betAmount);
      }
      
      // Update user's coin balance
      setCurrentUserCoins(prev => prev - betAmount);
      setBetPlaced(true);
      
      // Add notification
      addNotification({
        type: 'success',
        title: 'Bet Placed Successfully!',
        message: `You've placed ${betAmount} coins on the ${selectedPosition} team. Good luck!`
      });
      
      // Don't close modal immediately, let user see the confirmation
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const displayedParticipants = showAllParticipants ? mockParticipants : mockParticipants.slice(0, 3);

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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Place Your Bet</h2>
                  <p className="text-slate-300">Choose your champion & Place Your Bet</p>
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

                  {/* Battle Goal */}
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                    <h4 className="font-medium text-white mb-2 flex items-center">
                      <Trophy className="w-4 h-4 mr-2 text-cyan-400" />
                      Battle Goal
                    </h4>
                    <p className="text-slate-300 text-sm">{challenge.challenge.goal}</p>
                  </div>

                  {/* Event Details Box */}
                  <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      Event Details
                    </h4>
                    <p className="text-slate-300 text-sm mb-3">
                      We will both stream this battle live on our respective platforms at{' '}
                      <span className="text-blue-300 font-medium">
                        {challenge.eventTime?.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {challenge.eventTime?.toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </span>
                    </p>
                    
                    {/* Blue Player Social Media */}
                    <div className="mb-3 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="text-blue-300 text-sm font-medium">{challenge.participants.blue.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <a 
                          href="https://youtube.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Youtube className="w-4 h-4" />
                          <span className="text-xs">@{challenge.participants.blue.name.replace(/\s+/g, '')}</span>
                        </a>
                        <a 
                          href="https://tiktok.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.35 3.17-5.35 3.21-1.43.07-2.83-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                          </svg>
                          <span className="text-xs">@{challenge.participants.blue.name.replace(/\s+/g, '')}</span>
                        </a>
                      </div>
                    </div>

                    {/* Red Player Social Media */}
                    <div className="p-3 bg-red-500/10 rounded-lg border border-red-400/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                        <span className="text-red-300 text-sm font-medium">{challenge.participants.red.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <a 
                          href="https://twitch.tv" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                          </svg>
                          <span className="text-xs">@{challenge.participants.red.name.replace(/\s+/g, '')}</span>
                        </a>
                        <a 
                          href="https://instagram.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-pink-400 hover:text-pink-300 transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          <span className="text-xs">@{challenge.participants.red.name.replace(/\s+/g, '')}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Rules Box */}
                  <div className="p-4 bg-amber-500/20 border border-amber-400/30 rounded-xl">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-amber-400" />
                      How It Works
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      After the live battle ends, our platform will verify the results within 24 hours. 
                      Winners will receive their coins automatically, distributed proportionally based on their bet amounts. 
                      The prize pool is shared among all winning bets according to the odds and bet sizes.
                    </p>
                  </div>

                  {/* Challenge Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-2xl font-bold text-cyan-400">{challenge.totalParticipants}</span>
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

                {/* Right Column - Betting Interface & Participants */}
                <div className="space-y-6">
                  {/* Betting Options */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white text-center">Choose Your Champion</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Blue Option */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPosition('blue')}
                        disabled={betPlaced}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPosition === 'blue'
                            ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                            : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:border-blue-400/50'
                        } ${betPlaced ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {challenge.participants.blue.name.charAt(0)}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-lg">{challenge.participants.blue.name}</div>
                            <div className="text-2xl font-black text-blue-400">{challenge.participants.blue.odds}x</div>
                            <div className="text-xs text-blue-300">{challenge.participants.blue.odds === 1.5 ? '1.5x' : '2x'}</div>
                          </div>
                        </div>
                      </motion.button>

                      {/* Red Option */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPosition('red')}
                        disabled={betPlaced}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPosition === 'red'
                            ? 'bg-red-500/20 border-red-400 text-red-300'
                            : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:border-red-400/50'
                        } ${betPlaced ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                            {challenge.participants.red.name.charAt(0)}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-lg">{challenge.participants.red.name}</div>
                            <div className="text-2xl font-black text-red-400">{challenge.participants.red.odds}x</div>
                            <div className="text-xs text-red-300">{challenge.participants.red.odds === 1.5 ? '1.5x' : '2x'}</div>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Bet Amount */}
                  {selectedPosition && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white">Bet Amount</label>
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <Coins className="w-3 h-3 text-yellow-400" />
                          <span>{currentUserCoins} available</span>
                        </div>
                      </div>
                      <Slider
                        value={[betAmount]}
                        onValueChange={(value: number[]) => setBetAmount(value[0])}
                        max={Math.min(maxBet, currentUserCoins)}
                        min={minBet}
                        step={increment}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>Min: ${minBet}</span>
                        <span>Selected: ${betAmount}</span>
                        <span>Max: ${Math.min(maxBet, currentUserCoins)}</span>
                      </div>
                    </div>
                  )}

                  {/* Place Bet Button */}
                  {selectedPosition && (
                    <Button
                      onClick={handleBet}
                      disabled={betAmount > currentUserCoins || betPlaced}
                      className={`w-full py-3 text-lg font-bold rounded-xl ${
                        betPlaced
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : betAmount <= currentUserCoins
                            ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 hover:from-blue-500 hover:via-purple-600 hover:to-red-500'
                            : 'bg-slate-600 cursor-not-allowed'
                      } text-white shadow-lg disabled:opacity-50 transition-all duration-200`}
                    >
                      {betPlaced ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Bet Placed
                        </>
                      ) : (
                        <>
                          <Target className="w-5 h-5 mr-2" />
                          Place Bet
                        </>
                      )}
                    </Button>
                  )}

                  {/* Time Left - Moved below place bet button with reduced padding */}
                  <div className="p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-yellow-300">
                        {formatTimeLeft(challenge.betting.endTime)} left to place your bet!
                      </span>
                    </div>
                  </div>

                  {/* Participants List - Moved below place bet button */}
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                    <h4 className="font-medium text-white mb-4 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-cyan-400" />
                      Recent Bets
                    </h4>
                    
                    <div className="space-y-3">
                      {displayedParticipants.map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-3 p-2 bg-slate-600/20 rounded-lg">
                          <Avatar className="w-8 h-8">
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{participant.name}</div>
                            <div className="text-xs text-slate-400">${participant.amount}</div>
                          </div>
                          <div className="text-xs text-slate-500">{participant.timeAgo}</div>
                        </div>
                      ))}
                    </div>

                    {mockParticipants.length > 3 && (
                      <button
                        onClick={() => setShowAllParticipants(!showAllParticipants)}
                        className="w-full mt-3 p-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center justify-center space-x-1"
                      >
                        {showAllParticipants ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            <span>Show Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            <span>Show More ({mockParticipants.length - 3} more)</span>
                          </>
                        )}
                      </button>
                    )}
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
