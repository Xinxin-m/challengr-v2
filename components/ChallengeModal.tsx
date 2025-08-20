import { useState, useRef, useEffect } from "react";
import { X, Calendar, MapPin, Users, Coins, Trophy, ChevronDown, ChevronUp, Link, Heart, Bookmark, ThumbsUp, ThumbsDown, MessageSquare, Send, FileText, Zap, Crown, Check, Star, Play, Target } from "lucide-react";
import { Challenge } from "../config/rpg-system";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Textarea } from "./ui/textarea";

interface ChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onJoin?: (challengeId: string) => void;
  onBet?: (challengeId: string, amount: number) => void;
  thumbnail?: string;
}

// Mock participant data structure
interface ChallengeParticipant {
  id: string;
  name: string;
  picture?: string;
  level: number;
  bet: number;
  upvotes: number;
  downvotes: number;
  joinedDate: string;
  badges?: {
    hasGoldCrown?: boolean;
    isVerified?: boolean;
  };
}

// Mock comment data for discussion
interface ChallengeComment {
  id: string;
  userId: string;
  content: string;
  createdDate: string;
  likes: number;
  user: {
    id: string;
    name: string;
    picture?: string;
  };
}

export function ChallengeModal({ challenge, isOpen, onClose, onJoin, onBet, thumbnail }: ChallengeModalProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'participants' | 'discussion'>('description');
  const [newComment, setNewComment] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<ChallengeParticipant | null>(null);
  const [betAmount, setBetAmount] = useState(challenge.entryCost);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    const challengeUrl = `${window.location.origin}/challenge/${challenge.id}`;
    try {
      await navigator.clipboard.writeText(challengeUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (selectedParticipant) {
          setSelectedParticipant(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, selectedParticipant]);

  if (!isOpen) return null;

  const daysLeft = Math.ceil((new Date().getTime() + 7 * 24 * 60 * 60 * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 24)); // Mock 7 days left

  // Generate mock participant data
  const challengeParticipants: ChallengeParticipant[] = Array.from({ length: Math.min(challenge.participants, 10) }, (_, index) => ({
    id: `participant-${index}`,
    name: `Player ${index + 1}`,
    picture: `https://images.unsplash.com/photo-${1500000000000 + index}?w=48&h=48&fit=crop&crop=face`,
    level: Math.floor(Math.random() * 50) + 1,
    bet: challenge.entryCost + Math.floor(Math.random() * 50),
    upvotes: Math.floor(Math.random() * 21),
    downvotes: Math.floor(Math.random() * 5),
    joinedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    badges: {
      hasGoldCrown: Math.random() > 0.8,
      isVerified: Math.random() > 0.6
    }
  }));

  // Generate mock comments
  const challengeComments: ChallengeComment[] = [
    {
      id: 'comment1',
      userId: 'user2',
      content: 'This challenge looks amazing! I\'m definitely joining. When does it start exactly?',
      createdDate: '2024-12-19',
      likes: 8,
      user: { id: 'user2', name: 'Alex Chen', picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: 'comment2',
      userId: 'user3',
      content: 'Has anyone done something like this before? Looking for tips on how to prepare.',
      createdDate: '2024-12-18',
      likes: 5,
      user: { id: 'user3', name: 'Sarah Lopez', picture: 'https://images.unsplash.com/photo-1494790108755-2616b98a7e4c?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: 'comment3',
      userId: 'user4',
      content: 'The reward system sounds fair! Love that it\'s based on performance.',
      createdDate: '2024-12-18',
      likes: 12,
      user: { id: 'user4', name: 'Mike Johnson', picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
    }
  ];

  const handleJoinChallenge = () => {
    onJoin?.(challenge.id);
    alert(`Joining challenge: ${challenge.title}`);
    onClose();
  };

  const handlePlaceBet = () => {
    onBet?.(challenge.id, betAmount);
    alert(`Placing bet of ${betAmount} coins on: ${challenge.title}`);
    onClose();
  };

  const handleParticipantClick = (participant: ChallengeParticipant) => {
    setSelectedParticipant(participant);
  };

  const handleCloseParticipantModal = () => {
    setSelectedParticipant(null);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const getTotalPrizePool = () => {
    return challengeParticipants.reduce((total, participant) => total + participant.bet, 0);
  };

  const getRewardText = () => {
    const prizePool = getTotalPrizePool();
    const first = Math.floor(prizePool * 0.625); // 5/8 of the pool
    const second = Math.floor(prizePool * 0.25); // 2/8 of the pool
    const third = Math.floor(prizePool * 0.125); // 1/8 of the pool
    
    return `Prize Pool: ${prizePool} coins. Top 3 winners split: 1st: ${first}, 2nd: ${second}, 3rd: ${third} coins`;
  };

  // Profile Modal for selected participant
  if (selectedParticipant) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200/80 via-purple-200/80 to-blue-200/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-8 lg:p-12 xl:p-16">
        <div className="bg-white/90 backdrop-blur-xl border border-pink-300/50 shadow-2xl shadow-pink-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header Section */}
          <div className="relative p-6 pl-8 bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-blue-100/50 rounded-t-2xl">
            <button
              onClick={handleCloseParticipantModal}
              className="absolute top-4 right-4 p-2 bg-pink-300/50 rounded-full text-pink-700 hover:bg-pink-400/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-start space-x-6">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={selectedParticipant.picture || '/api/placeholder/100/100'}
                  alt={selectedParticipant.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                
                {/* Gold Crown for gold members */}
                {selectedParticipant.badges?.hasGoldCrown && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 rounded-full p-1 border-2 border-white">
                    <Crown className="h-4 w-4 text-yellow-900" />
                  </div>
                )}
                
                {/* Verified badge */}
                {selectedParticipant.badges?.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-700">{selectedParticipant.name}</h2>
                  <Badge variant="outline" className="bg-pink-100/50 border-pink-200/50 text-pink-700 rounded-full px-3 py-1">
                    Level {selectedParticipant.level}
                  </Badge>
                </div>
                
                <div className="space-y-1 mb-4">
                  <div className="text-sm text-gray-600">@{selectedParticipant.name.toLowerCase().replace(' ', '')}</div>
                  <div className="text-sm text-gray-500">Challenge participant since {selectedParticipant.joinedDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50 rounded-b-2xl">
            <p className="text-gray-700 leading-relaxed">
              This participant has joined the challenge and placed a bet of {selectedParticipant.bet} coins.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-200/80 via-purple-200/80 to-blue-200/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-8 lg:p-12 xl:p-16" onClick={onClose}>
      <div ref={modalRef} className="bg-white/90 backdrop-blur-xl border border-pink-300/50 shadow-2xl shadow-pink-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative">
          <img 
            src={thumbnail || '/api/placeholder/600/300'} 
            alt={challenge.title}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />
          
          {/* Bookmark button - bottom right of thumbnail */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSave}
                  className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <Bookmark className={`h-4 w-4 transition-all duration-300 ${isSaved ? 'fill-current text-yellow-400' : ''}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSaved ? 'Saved!' : 'Save challenge'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Title and basic info */}
          <div className="absolute bottom-3 left-3 right-16 text-white">
            <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">{challenge.title}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-green-400" />
                <span>{daysLeft} days left</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-blue-400" />
                <span>{challenge.participants} participants</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center space-x-1 hover:text-blue-300 transition-colors"
                    >
                      <Link className="h-4 w-4" />
                      <span className="text-xs">Share</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{linkCopied ? 'Link copied!' : 'Copy link'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50 rounded-b-2xl">
          {/* Challenge Details Grid - Icons with colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-700 text-sm font-medium">
                  {challenge.location?.details || challenge.location?.type || 'Online'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-400" />
                <div className="text-gray-700 text-sm">
                  <div>Duration: {Math.floor(challenge.timeLimit / 60)} hours</div>
                  <div className="text-xs text-gray-500">Time limit to complete</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-700 text-sm font-medium">{challenge.entryCost} coins entry</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-gray-700 text-sm font-medium">{challenge.rewards.xp} XP reward</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-pink-100/50 border-pink-200/50 text-pink-700 rounded-full px-3 py-1">
              {challenge.category.replace('-', ' ')}
            </Badge>
            {challenge.tags && challenge.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-purple-100/50 border-purple-200/50 text-purple-700 rounded-full px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Section Toggle */}
          <div className="flex justify-center">
            <div className="flex space-x-1 p-1 bg-gradient-to-r from-pink-100/50 via-purple-100/50 to-blue-100/50 rounded-lg border border-pink-200/30">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'description' 
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Description</span>
              </button>
              <button
                onClick={() => setActiveTab('participants')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'participants' 
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Participants ({challengeParticipants.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'discussion' 
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Discussion ({challengeComments.length})</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{challenge.description}</p>
                </div>

                {/* Challenge Type and Difficulty */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-sm flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Challenge Type:</span>
                  </h4>
                  <p className="text-gray-500 text-sm pl-6">
                    {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)} • {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)} Difficulty
                  </p>
                </div>

                {/* Reward system */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-sm flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Reward System:</span>
                  </h4>
                  <div className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-lg p-4 border border-pink-200/30">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {getRewardText()}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Winners are determined by performance evaluation and community voting
                    </p>
                  </div>
                </div>

                {/* Entry requirements */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-sm flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Entry Requirements:</span>
                  </h4>
                  <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg p-4 border border-blue-200/30">
                    <p className="text-gray-600 text-sm">
                      Entry Fee: <span className="font-semibold text-yellow-600">{challenge.entryCost} coins</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      Max Participants: {challenge.maxParticipants}
                    </p>
                    {challenge.requirements && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Additional Requirements:</p>
                        <ul className="text-xs text-gray-500 ml-4 list-disc">
                          {challenge.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'participants' && (
              <div className="space-y-4">
                {challengeParticipants.map((participant) => (
                  <Card key={participant.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleParticipantClick(participant)}>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={participant.picture || '/api/placeholder/48/48'}
                          alt={participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {participant.badges?.hasGoldCrown && (
                          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-white">
                            <Crown className="h-3 w-3 text-yellow-900" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-700">{participant.name}</h5>
                            <p className="text-xs text-gray-500">Level {participant.level}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-xs">
                              <div className="flex items-center space-x-1 text-green-500">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{participant.upvotes}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-red-500">
                                <ThumbsDown className="h-3 w-3" />
                                <span>{participant.downvotes}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Bet: <span className="text-yellow-600 font-medium">{participant.bet}</span> coins
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-4">
                {/* Comment Input */}
                <Card className="p-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src="/api/placeholder/40/40"
                      alt="You"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-3">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this challenge..."
                        className="min-h-[80px] resize-none border-pink-200/50 bg-white/70 text-gray-700 placeholder-gray-500"
                      />
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          onClick={handleCommentSubmit}
                          disabled={!newComment.trim()}
                          className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Comments List */}
                <div className="space-y-3">
                  {challengeComments.map((comment) => (
                    <Card key={comment.id} className="p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={comment.user.picture || '/api/placeholder/32/32'}
                          alt={comment.user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-700 text-sm">{comment.user.name}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.createdDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{comment.content}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-pink-500 transition-colors">
                              <Heart className="h-3 w-3" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="text-xs text-gray-500 hover:text-pink-500 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bet Amount Selector */}
          <div className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-lg p-4 border border-pink-200/30">
            <h4 className="font-semibold text-gray-700 text-sm mb-3 flex items-center space-x-2">
              <Coins className="h-4 w-4" />
              <span>Place Your Bet:</span>
            </h4>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  min={challenge.entryCost}
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-pink-200/50 rounded-lg bg-white/70 text-gray-700 placeholder-gray-500"
                  placeholder="Enter bet amount"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: {challenge.entryCost} coins
                </p>
              </div>
              <Button
                onClick={handlePlaceBet}
                disabled={betAmount < challenge.entryCost}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg"
              >
                <Target className="h-4 w-4 mr-2" />
                Place Bet
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              size="lg"
              className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg"
              onClick={handleJoinChallenge}
            >
              <Play className="h-4 w-4 mr-2" />
              <span>Join Challenge</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
