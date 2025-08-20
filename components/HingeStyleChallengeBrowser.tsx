import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'motion/react';
import {
  Heart, X, Bookmark, Clock, Users, Zap, Star, Trophy,
  ArrowLeft, ArrowRight, Info, Play, Coins, Crown,
  Sparkles, Target, Fire, Shield, RotateCcw
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Challenge, UserRPGProgress } from '../types/rpg-system';
import { getProfessionById } from '../data/professions';

interface HingeStyleChallengeBrowserProps {
  challenges: Challenge[];
  userProgress: UserRPGProgress;
  onChallengeAccept: (challengeId: string) => void;
  onChallengeReject: (challengeId: string) => void;
  onChallengeSave: (challengeId: string) => void;
  onChallengeInfo: (challengeId: string) => void;
  onUndo: () => void;
  onTokenEarn: (amount: number, type: 'xp' | 'coins' | 'tokens') => void;
  dailyCoinsRemaining: number;
}

const SWIPE_THRESHOLD = 150;

export function HingeStyleChallengeBrowser({
  challenges,
  userProgress,
  onChallengeAccept,
  onChallengeReject,
  onChallengeSave,
  onChallengeInfo,
  onUndo,
  onTokenEarn,
  dailyCoinsRemaining
}: HingeStyleChallengeBrowserProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUndoAlert, setShowUndoAlert] = useState(false);
  const [undoTimer, setUndoTimer] = useState(5);
  const [lastAction, setLastAction] = useState<'accept' | 'reject' | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const currentChallenge = challenges[currentIndex];
  const profession = currentChallenge ? getProfessionById(currentChallenge.professionId) : null;

  // Auto-hide undo alert
  useEffect(() => {
    if (showUndoAlert && undoTimer > 0) {
      const timer = setTimeout(() => {
        setUndoTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (undoTimer === 0) {
      setShowUndoAlert(false);
      setLastAction(null);
    }
  }, [showUndoAlert, undoTimer]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = SWIPE_THRESHOLD;
    
    if (info.offset.x > swipeThreshold) {
      handleAccept();
    } else if (info.offset.x < -swipeThreshold) {
      handleReject();
    } else {
      x.set(0);
    }
  };

  const handleAccept = () => {
    if (!currentChallenge) return;
    
    if (currentChallenge.entryCost > dailyCoinsRemaining) {
      alert('Insufficient coins to join this challenge!');
      return;
    }

    setLastAction('accept');
    onChallengeAccept(currentChallenge.id);
    showUndoPrompt();
    nextChallenge();
  };

  const handleReject = () => {
    if (!currentChallenge) return;
    
    setLastAction('reject');
    onChallengeReject(currentChallenge.id);
    showUndoPrompt();
    nextChallenge();
  };

  const handleSave = () => {
    if (!currentChallenge) return;
    onChallengeSave(currentChallenge.id);
    onTokenEarn(10, 'coins');
  };

  const nextChallenge = () => {
    x.set(0);
    setCurrentIndex(prev => 
      prev + 1 >= challenges.length ? 0 : prev + 1
    );
  };

  const showUndoPrompt = () => {
    setShowUndoAlert(true);
    setUndoTimer(5);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
    setShowUndoAlert(false);
    setLastAction(null);
    onUndo();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-orange-500 to-red-500';
      case 'expert': return 'from-red-500 to-purple-500';
      case 'master': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'solo': return <Target className="w-4 h-4" />;
      case 'multiplayer': return <Users className="w-4 h-4" />;
      case 'tournament': return <Trophy className="w-4 h-4" />;
      case 'daily': return <Clock className="w-4 h-4" />;
      case 'special': return <Sparkles className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  // Fixed canParticipate function with proper null/undefined checks
  const canParticipate = (challenge: Challenge) => {
    if (!challenge || !userProgress) return false;
    
    const profession = getProfessionById(challenge.professionId);
    
    // Safe tier comparison - convert tier names to numbers for comparison
    const getTierLevel = (tier: string) => {
      switch (tier) {
        case 'apprentice': return 0;
        case 'journeyman': return 1;
        case 'expert': return 2;
        case 'grandmaster': return 3;
        case 'ascended': return 4;
        default: return 0;
      }
    };
    
    const userTierLevel = getTierLevel(userProgress.currentTier);
    const requiredTierLevel = challenge.tierRequirement || 0;
    const hasRequiredTier = userTierLevel >= requiredTierLevel;
    
    const hasCoins = dailyCoinsRemaining >= (challenge.entryCost || 0);
    
    // Safe array check for unlockedClasses
    const unlockedClasses = userProgress.unlockedClasses || [];
    const isUnlocked = unlockedClasses.includes(challenge.professionId) || 
                     challenge.professionId === userProgress.currentClass;
    
    return hasRequiredTier && hasCoins && isUnlocked;
  };

  if (!currentChallenge) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-6"
          >
            🎯
          </motion.div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            No More Challenges!
          </h2>
          <p className="text-muted-foreground mb-6">
            You've explored all available challenges. New ones are added daily!
          </p>
          <Button
            onClick={() => setCurrentIndex(0)}
            className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/10 to-accent/5 relative overflow-hidden">
      {/* Header Stats */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-theme-yellow text-theme-black">
              {currentIndex + 1} / {challenges.length}
            </Badge>
            <Badge variant="outline" className="border-theme-turquoise text-theme-turquoise">
              <Coins className="w-3 h-3 mr-1" />
              {dailyCoinsRemaining} coins left
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Level {userProgress.level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Challenge Card Stack */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-sm h-[600px]">
          {/* Next card preview */}
          {challenges[currentIndex + 1] && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                scale: 0.95,
                rotateY: 10,
                z: -10
              }}
            >
              <Card className="w-full h-full bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                <div className="h-1/2 relative">
                  <img
                    src={challenges[currentIndex + 1].image}
                    alt={challenges[currentIndex + 1].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </Card>
            </motion.div>
          )}

          {/* Current challenge card */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{
              x,
              rotate,
              opacity,
              cursor: 'grab'
            }}
            whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
            className="absolute inset-0 w-full h-full z-10"
          >
            <Card className="w-full h-full bg-card border-border rounded-3xl overflow-hidden shadow-2xl glow-turquoise">
              {/* Challenge Header Image */}
              <div className="h-1/2 relative">
                <img
                  src={currentChallenge.image}
                  alt={currentChallenge.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                
                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex flex-col space-y-2">
                    <Badge className={`bg-gradient-to-r ${getDifficultyColor(currentChallenge.difficulty)} text-white w-fit`}>
                      {currentChallenge.difficulty.toUpperCase()}
                    </Badge>
                    {profession && (
                      <Badge className="bg-black/50 text-white w-fit">
                        {profession.icon} {profession.name}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`${
                      currentChallenge.entryCost === 0 
                        ? 'bg-green-500 text-white' 
                        : 'bg-theme-yellow text-theme-black'
                    }`}>
                      {currentChallenge.entryCost === 0 ? 'FREE' : `${currentChallenge.entryCost} 🪙`}
                    </Badge>
                    
                    <Badge className="bg-blue-500 text-white">
                      {getTypeIcon(currentChallenge.type)}
                      <span className="ml-1">{currentChallenge.type.toUpperCase()}</span>
                    </Badge>
                  </div>
                </div>

                {/* Bottom challenge info overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {currentChallenge.title}
                  </h2>
                  
                  <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{currentChallenge.participants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentChallenge.duration}min</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="h-1/2 p-6 bg-gradient-to-b from-card to-muted/20 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentChallenge.description}
                  </p>

                  {/* Real World Connection */}
                  {currentChallenge.realWorldConnection && (
                    <div className="bg-theme-turquoise/10 rounded-xl p-3 border border-theme-turquoise/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-theme-turquoise" />
                        <span className="text-sm font-medium text-theme-turquoise">
                          Real World Challenge
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {currentChallenge.realWorldConnection.description}
                      </p>
                    </div>
                  )}

                  {/* Rewards */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center">
                      <Trophy className="w-4 h-4 mr-2 text-theme-yellow" />
                      Rewards
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Zap className="w-3 h-3 mr-1 text-theme-turquoise" />
                        +{currentChallenge.rewards.xp} XP
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Coins className="w-3 h-3 mr-1 text-theme-yellow" />
                        +{currentChallenge.rewards.coins} Coins
                      </Badge>
                      {currentChallenge.rewards.tokens && (
                        <Badge variant="outline" className="text-xs">
                          <Star className="w-3 h-3 mr-1 text-purple-500" />
                          +{currentChallenge.rewards.tokens} Tokens
                        </Badge>
                      )}
                      {currentChallenge.rewards.equipment && currentChallenge.rewards.equipment.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1 text-orange-500" />
                          Equipment Drop
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Participation Requirements */}
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Required Tier: {(currentChallenge.tierRequirement || 0) + 1}</span>
                      <span className={canParticipate(currentChallenge) ? 'text-green-500' : 'text-red-500'}>
                        {canParticipate(currentChallenge) ? '✓ Eligible' : '✗ Not Eligible'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-20">
        {/* Reject Button */}
        <motion.button
          onClick={handleReject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-colors"
        >
          <X className="w-6 h-6 text-red-500" />
        </motion.button>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-theme-turquoise hover:border-theme-turquoise-light transition-colors"
        >
          <Bookmark className="w-5 h-5 text-theme-turquoise" />
        </motion.button>

        {/* Info Button */}
        <motion.button
          onClick={() => onChallengeInfo(currentChallenge.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-theme-yellow hover:border-theme-yellow-bright transition-colors"
        >
          <Info className="w-5 h-5 text-theme-yellow" />
        </motion.button>

        {/* Accept Button */}
        <motion.button
          onClick={handleAccept}
          disabled={!canParticipate(currentChallenge)}
          whileHover={{ scale: canParticipate(currentChallenge) ? 1.1 : 1 }}
          whileTap={{ scale: canParticipate(currentChallenge) ? 0.9 : 1 }}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            canParticipate(currentChallenge)
              ? 'bg-gradient-to-r from-theme-yellow to-theme-yellow-bright glow-yellow'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {canParticipate(currentChallenge) ? (
            <Heart className="w-6 h-6 text-theme-black" />
          ) : (
            <X className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Desktop Arrow Buttons */}
      <div className="hidden lg:block">
        <motion.button
          onClick={handleReject}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-red-500" />
        </motion.button>

        <motion.button
          onClick={handleAccept}
          disabled={!canParticipate(currentChallenge)}
          whileHover={{ scale: canParticipate(currentChallenge) ? 1.1 : 1, x: canParticipate(currentChallenge) ? 5 : 0 }}
          whileTap={{ scale: canParticipate(currentChallenge) ? 0.9 : 1 }}
          className={`absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
            canParticipate(currentChallenge)
              ? 'bg-white/10 dark:bg-black/20 hover:bg-theme-yellow/20'
              : 'bg-gray-400/20 cursor-not-allowed'
          }`}
        >
          <ArrowRight className={`w-6 h-6 ${canParticipate(currentChallenge) ? 'text-theme-yellow' : 'text-gray-500'}`} />
        </motion.button>
      </div>

      {/* Undo Notification */}
      <AnimatePresence>
        {showUndoAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-theme-black text-white px-6 py-4 rounded-2xl shadow-xl border border-theme-turquoise/30 z-30"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  {lastAction === 'accept' ? 'Joined' : 'Passed'} challenge
                </span>
                <Button
                  size="sm"
                  onClick={handleUndo}
                  className="bg-theme-turquoise text-theme-black hover:bg-theme-turquoise-light h-8 px-3"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Undo
                </Button>
              </div>
              
              {/* Timer */}
              <div className="w-8 h-8 relative">
                <Progress value={(undoTimer / 5) * 100} className="h-2" />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-theme-turquoise">
                  {undoTimer}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Hints for First-time Users */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: currentIndex === 0 ? 1 : 0 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-white text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          👆 Swipe or use buttons to browse challenges
        </motion.div>
      </motion.div>
    </div>
  );
}