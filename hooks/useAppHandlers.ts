import { Challenge, GeneratedChallenge, UserRPGProgress } from '../config/rpg-system';

interface UseAppHandlersProps {
  userProgress: UserRPGProgress;
  arenaChallenges: Challenge[];
  setUserProgress: (updater: (prev: UserRPGProgress) => UserRPGProgress) => void;
  setArenaChallenges: (updater: (prev: Challenge[]) => Challenge[]) => void;
  setShowCoinEffect: (show: boolean) => void;
  setShowXPEffect: (show: boolean) => void;
  setShowLevelUpEffect: (show: boolean) => void;
  setGameMode: (mode: 'solo' | 'multiplayer' | 'tournament') => void;
  setShowOnboarding: (show: boolean) => void;
  setIsFirstTime: (first: boolean) => void;
}

export function useAppHandlers({
  userProgress,
  arenaChallenges,
  setUserProgress,
  setArenaChallenges,
  setShowCoinEffect,
  setShowXPEffect,
  setShowLevelUpEffect,
  setGameMode,
  setShowOnboarding,
  setIsFirstTime,
}: UseAppHandlersProps) {
  
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('challengr-onboarding-completed', 'true');
    setIsFirstTime(false);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('challengr-onboarding-completed', 'true');
    setIsFirstTime(false);
  };

  const handleChallengeAccept = (challengeId: string) => {
    const challenge = arenaChallenges.find(c => c.id === challengeId);
    if (challenge && userProgress.dailyCoins >= challenge.entryCost) {
      setUserProgress(prev => ({
        ...prev,
        dailyCoins: prev.dailyCoins - challenge.entryCost
      }));
      
      setShowCoinEffect(true);
      setTimeout(() => setShowCoinEffect(false), 2000);
      
      if (challenge.difficulty === 'expert' || challenge.difficulty === 'legendary') {
        setGameMode('tournament');
      }
      
      console.log(`⚡ Joined epic challenge: ${challenge.title}`);
    }
  };

  const handleChallengeReject = (challengeId: string) => {
    console.log(`Rejected challenge: ${challengeId}`);
  };

  const handleChallengeSave = (challengeId: string) => {
    console.log(`Bookmarked challenge: ${challengeId}`);
  };

  const handleChallengeInfo = (challengeId: string) => {
    console.log(`Viewing challenge details: ${challengeId}`);
  };

  const handleUndo = () => {
    console.log('Undoing last action');
  };

  const handleTokenEarn = (amount: number, type: 'xp' | 'coins' | 'tokens' = 'coins') => {
    if (type === 'xp') {
      setUserProgress(prev => ({
        ...prev,
        totalXP: prev.totalXP + amount,
        currentTierXP: prev.currentTierXP + amount
      }));
      setShowXPEffect(true);
      setTimeout(() => setShowXPEffect(false), 2000);
      
      if (amount >= 1000) {
        setShowLevelUpEffect(true);
        setTimeout(() => setShowLevelUpEffect(false), 4000);
      }
    } else if (type === 'coins') {
      setUserProgress(prev => ({
        ...prev,
        dailyCoins: prev.dailyCoins + amount
      }));
      setShowCoinEffect(true);
      setTimeout(() => setShowCoinEffect(false), 1500);
    }
    console.log(`🎉 Earned ${amount} ${type}!`);
  };

  const handleJobChange = (newClassId: string) => {
    setUserProgress(prev => ({
      ...prev,
      currentClass: newClassId,
      currentTier: 'apprentice',
      currentTierXP: 0
    }));
    
    setShowLevelUpEffect(true);
    setTimeout(() => setShowLevelUpEffect(false), 3000);
    
    console.log(`🌟 Epic class change to: ${newClassId}`);
  };

  const handleChallengeGenerated = (challenge: GeneratedChallenge) => {
    const newChallenge: Challenge = {
      id: challenge.id,
      title: `🤖 AI Generated: ${challenge.title}`,
      description: challenge.description,
      professionId: userProgress.currentClass,
      tierRequirement: challenge.difficulty === 'easy' ? 0 : 
                      challenge.difficulty === 'medium' ? 1 : 
                      challenge.difficulty === 'hard' ? 2 : 1,
      type: 'solo',
      difficulty: challenge.difficulty,
      duration: challenge.estimatedDuration,
      entryCost: challenge.entryFee,
      rewards: challenge.rewards,
      participants: 0,
      maxParticipants: 100,
      status: 'open',
      createdBy: 'challengr-ai-engine',
      createdAt: new Date(),
      startTime: new Date(),
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      tags: [challenge.difficulty, 'ai-generated', 'legendary'],
      realWorldConnection: challenge.realWorldComponent
    };
    
    setArenaChallenges(prev => [newChallenge, ...prev]);
  };

  const handleChallengeStart = (challengeId: string) => {
    console.log(`🚀 Starting legendary challenge: ${challengeId}`);
  };

  const handlePlaceBet = (challengeId: string, side: 'yes' | 'no', amount: number) => {
    if (userProgress.dailyCoins >= amount) {
      setUserProgress(prev => ({
        ...prev,
        dailyCoins: prev.dailyCoins - amount
      }));
      
      setShowCoinEffect(true);
      setTimeout(() => setShowCoinEffect(false), 1500);
      
      console.log(`🎲 Placed bet: ${amount} coins on ${side} for challenge ${challengeId}`);
    } else {
      console.log(`❌ Insufficient coins for bet: ${amount} needed, ${userProgress.dailyCoins} available`);
    }
  };

  return {
    handleOnboardingComplete,
    handleOnboardingSkip,
    handleChallengeAccept,
    handleChallengeReject,
    handleChallengeSave,
    handleChallengeInfo,
    handleUndo,
    handleTokenEarn,
    handleJobChange,
    handleChallengeGenerated,
    handleChallengeStart,
    handlePlaceBet,
  };
}