import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown, Star, Trophy, Zap, Target, Users, Calendar,
  TrendingUp, Award, Sparkles, Shield, Gem, Book,
  ChevronRight, ChevronDown, Lock, CheckCircle, Play,
  Gift, Coins, ArrowUp, RotateCcw, Info, User, Settings,
  Plus, Minus, Search, Filter, X, Flame, Heart, Sword,
  Wand2, Brain, Rocket, Timer, Map, Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { UserRPGProgress, EquipmentItem, ProfessionTier } from '../config/rpg-system';
import { getProfessionById, PROFESSIONS } from '../data/professions';

interface CareerProgressInterfaceProps {
  userProgress: UserRPGProgress;
  onJobChange: (newProfessionId: string) => void;
  onEquipItem: (item: EquipmentItem) => void;
  onUnequipItem: (itemId: string) => void;
  onClaimReward: (tierId: string) => void;
  availableCoins: number;
}

// Mission data for user onboarding and progression
const ONBOARDING_MISSIONS = [
  {
    id: 'first-challenge',
    name: 'First Steps',
    description: 'Complete your very first challenge',
    type: 'onboarding',
    level: 1,
    requiredXP: 0,
    progress: 100,
    maxProgress: 100,
    rewards: {
      coins: 5,
      xp: 10,
      badges: ['Newcomer']
    },
    status: 'completed',
    isLocked: false
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Make 10 connections with other users',
    type: 'social',
    level: 1,
    requiredXP: 10,
    progress: 100,
    maxProgress: 100,
    rewards: {
      coins: 5,
      xp: 10,
      badges: ['Social']
    },
    status: 'completed',
    isLocked: false
  },
  {
    id: 'creative-mind',
    name: 'Creative Mind',
    description: 'Create 5 challenges',
    type: 'creation',
    level: 2,
    requiredXP: 25,
    progress: 60,
    maxProgress: 100,
    rewards: {
      coins: 10,
      xp: 15,
      badges: ['Creator']
    },
    status: 'active',
    isLocked: false
  },
  {
    id: 'rising-influencer',
    name: 'Rising Influencer',
    description: 'Reach 1000 followers',
    type: 'social',
    level: 3,
    requiredXP: 50,
    progress: 25,
    maxProgress: 100,
    rewards: {
      coins: 15,
      xp: 20,
      badges: ['Influencer']
    },
    status: 'active',
    isLocked: false
  },
  {
    id: 'mathematics-master',
    name: 'Mathematics Master',
    description: 'Complete 20 advanced mathematics challenges',
    type: 'academic',
    level: 4,
    requiredXP: 100,
    progress: 0,
    maxProgress: 100,
    rewards: {
      coins: 20,
      xp: 25,
      badges: ['Math Expert']
    },
    status: 'locked',
    isLocked: true
  },
  {
    id: 'community-helper',
    name: 'Community Helper',
    description: 'Help 50 users with their challenges',
    type: 'social',
    level: 4,
    requiredXP: 100,
    progress: 0,
    maxProgress: 100,
    rewards: {
      coins: 20,
      xp: 25,
      badges: ['Helper']
    },
    status: 'locked',
    isLocked: true
  },
  {
    id: 'innovation-leader',
    name: 'Innovation Leader',
    description: 'Create 25 unique challenge types',
    type: 'creation',
    level: 5,
    requiredXP: 200,
    progress: 0,
    maxProgress: 100,
    rewards: {
      coins: 25,
      xp: 30,
      badges: ['Innovator']
    },
    status: 'locked',
    isLocked: true
  },
  {
    id: 'global-connector',
    name: 'Global Connector',
    description: 'Connect with users from 10 different countries',
    type: 'social',
    level: 5,
    requiredXP: 200,
    progress: 0,
    maxProgress: 100,
    rewards: {
      coins: 25,
      xp: 30,
      badges: ['Global']
    },
    status: 'locked',
    isLocked: true
  }
];

// Mock achievements for demonstration
const MOCK_ACHIEVEMENTS = [
  {
    id: 'first-challenge',
    title: 'First Steps',
    description: 'Complete your first challenge',
    type: 'progression',
    rarity: 'bronze',
    reward: { coins: 100, tokens: 5 },
    unlockedAt: new Date()
  },
  {
    id: 'problem-solver',
    title: 'Problem Solver',
    description: 'Solve 50 challenges successfully',
    type: 'challenge',
    rarity: 'gold',
    reward: { coins: 500, tokens: 25 },
    unlockedAt: new Date()
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete 10 challenges in record time',
    type: 'special',
    rarity: 'epic',
    reward: { coins: 1000, tokens: 50 },
    unlockedAt: new Date()
  }
];

export function CareerProgressInterface({
  userProgress,
  onJobChange,
  onEquipItem,
  onUnequipItem,
  onClaimReward,
  availableCoins
}: CareerProgressInterfaceProps) {
  const [showJobChangeModal, setShowJobChangeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');

  // Safe data access with fallbacks
  const currentProfession = getProfessionById(userProgress.currentClass || 'mathematics');
  const userAchievements = userProgress.achievements || MOCK_ACHIEVEMENTS;
  const userEquippedItems = userProgress.equippedGear || {};
  const userInventory = userProgress.inventory || [];
  const userTitles = userProgress.titles || [];
  const userStats = userProgress.stats || {
    intelligence: 50,
    creativity: 50,
    technical: 50,
    social: 50,
    physical: 50,
    business: 50
  };
  
  // Calculate mission progress statistics
  const completedMissions = ONBOARDING_MISSIONS.filter(m => m.status === 'completed');
  const activeMissions = ONBOARDING_MISSIONS.filter(m => m.status === 'active');
  const lockedMissions = ONBOARDING_MISSIONS.filter(m => m.status === 'locked');
  
  // Calculate overall progress percentage (should match sidebar: 2 completed out of 8 total = 25%)
  const totalMissions = ONBOARDING_MISSIONS.length;
  const overallProgressPercentage = (completedMissions.length / totalMissions) * 100;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'from-yellow-600 to-yellow-700';
      case 'silver': return 'from-gray-400 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-500';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const canJobChange = (professionId: string) => {
    if (professionId === userProgress.currentClass) return false;
    const unlockedClasses = userProgress.unlockedClasses || [];
    return unlockedClasses.includes(professionId);
  };

  const getJobChangeCost = (professionId: string) => {
    const baseCost = 100;
    const tierMultiplier = Math.max(1, userProgress.level || 1);
    return baseCost * tierMultiplier;
  };

  const handleJobChange = (newProfessionId: string) => {
    const cost = getJobChangeCost(newProfessionId);
    if (availableCoins >= cost && canJobChange(newProfessionId)) {
      onJobChange(newProfessionId);
      setShowJobChangeModal(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-orange-700 p-4 text-white">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Path of Ascension</h1>
            <p className="text-white/80">Complete missions to progress and unlock new opportunities</p>
          </motion.div>

          {/* Current Status Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg overflow-hidden">
                    <img 
                      src="/images/古风女孩头像.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Xxxin</h2>
                    <p className="text-white">{userProgress.currentTitle || 'Legendary Challenger'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setShowJobChangeModal(true)}
                    className="bg-theme-yellow text-white hover:bg-theme-yellow-bright"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Job Change
                  </Button>
                </div>
              </div>

              {/* Mission Progress Overview */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Overall Mission Progress</span>
                  <span className="text-sm font-medium text-white">
                    {Math.round(overallProgressPercentage)}%
                  </span>
                </div>
                <Progress value={overallProgressPercentage} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">{completedMissions.length}</div>
                    <div className="text-xs text-white/70">Completed</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{activeMissions.length}</div>
                    <div className="text-xs text-white/70">Active</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{lockedMissions.length}</div>
                    <div className="text-xs text-white/70">Locked</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/10 text-white">
              <TabsTrigger value="progress" className="text-white data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Missions
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-white data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Stats & Skills
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="equipment" className="text-white data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Equipment
              </TabsTrigger>
            </TabsList>

            {/* Missions Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {ONBOARDING_MISSIONS.map((mission, index) => {
                  const getMissionIcon = (status: string, type: string) => {
                    if (status === 'completed') return <CheckCircle className="w-6 h-6" />;
                    if (status === 'locked') return <Lock className="w-6 h-6" />;
                    
                    // Active missions get type-specific icons
                    switch (type) {
                      case 'onboarding': return <Target className="w-6 h-6" />;
                      case 'social': return <Users className="w-6 h-6" />;
                      case 'creation': return <Sparkles className="w-6 h-6" />;
                      case 'academic': return <Brain className="w-6 h-6" />;
                      default: return <Play className="w-6 h-6" />;
                    }
                  };

                  const getMissionColor = (status: string) => {
                    switch (status) {
                      case 'completed': return 'bg-emerald-400/10 border-emerald-300/20';
                      case 'active': return 'bg-yellow-400/10 border-yellow-300/20';
                      case 'locked': return 'bg-gray-400/10 border-gray-300/20';
                      default: return 'bg-white/5 border-white/10';
                    }
                  };

                  const getIconBgColor = (status: string) => {
                    switch (status) {
                      case 'completed': return 'bg-green-500 text-white';
                      case 'active': return 'bg-theme-yellow text-white';
                      case 'locked': return 'bg-gray-500 text-white';
                      default: return 'bg-white/20 text-white';
                    }
                  };

                  return (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`p-6 transition-all duration-300 backdrop-blur-sm ${getMissionColor(mission.status)} ${
                        mission.isLocked ? 'opacity-60' : 'hover:scale-105'
                      }`}>
                        <div className="flex items-start space-x-4">
                          {/* Mission Icon */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBgColor(mission.status)}`}>
                            {getMissionIcon(mission.status, mission.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-white truncate">
                                  {mission.name}
                                </h3>
                                <p className="text-sm text-white/70 mb-3">
                                  {mission.description}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20 ml-2">
                                Level {mission.level}
                              </Badge>
                            </div>

                            {/* Progress Bar - Only show for active missions */}
                            {mission.status === 'active' && (
                              <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs text-white/70">Progress</span>
                                  <span className="text-xs font-medium text-white">
                                    {mission.progress}%
                                  </span>
                                </div>
                                <Progress value={mission.progress} className="h-2" />
                              </div>
                            )}

                            {/* Rewards */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                                  <Coins className="w-3 h-3 mr-1 text-white" />
                                  {mission.rewards.coins}
                                </Badge>
                                <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                                  <Zap className="w-3 h-3 mr-1 text-white" />
                                  {mission.rewards.xp} XP
                                </Badge>
                              </div>
                              
                              {mission.status === 'completed' && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  Completed ✓
                                </Badge>
                              )}
                              {mission.status === 'locked' && (
                                <Badge className="bg-gray-500 text-white text-xs">
                                  <Lock className="w-3 h-3 mr-1" />
                                  Locked
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white/10 border-white/10 text-white">
                  <h3 className="text-lg font-semibold mb-4">Core Stats</h3>
                  <div className="space-y-4">
                    {Object.entries(userStats).map(([stat, value]) => (
                      <div key={stat}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="capitalize text-sm text-white">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-sm font-medium text-white">{value}/100</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 border-white/10 text-white">
                  <h3 className="text-lg font-semibold mb-4">Progress Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white">Current Level</span>
                      <span className="font-medium text-white">{userProgress.level || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Total XP</span>
                      <span className="font-medium text-white">{(userProgress.totalXP || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Current Title</span>
                      <span className="font-medium text-white">{userProgress.currentTitle || 'Explorer'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Unlocked Classes</span>
                      <span className="font-medium text-white">{(userProgress.unlockedClasses || []).length}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`p-4 border-2 bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">🏆</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{achievement.title}</h4>
                          <p className="text-sm text-white/80 mb-2">{achievement.description}</p>
                          <Badge className="bg-white/20 text-white text-xs">
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-6">
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-white/70 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Equipment System</h3>
                <p className="text-white/80">
                  Equipment management coming soon. Earn powerful NFT gear through challenges!
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Job Change Modal */}
          <AnimatePresence>
            {showJobChangeModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white/10 text-white rounded-3xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto border border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Choose New Career Path</h3>
                    <Button variant="ghost" onClick={() => setShowJobChangeModal(false)} className="text-white hover:bg-white/10">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROFESSIONS.map(profession => {
                      const canChange = canJobChange(profession.id);
                      const cost = getJobChangeCost(profession.id);
                      const isCurrentProfession = profession.id === userProgress.currentClass;

                      return (
                        <motion.div
                          key={profession.id}
                          whileHover={{ scale: canChange ? 1.02 : 1 }}
                          whileTap={{ scale: canChange ? 0.98 : 1 }}
                          onClick={() => canChange && handleJobChange(profession.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                            isCurrentProfession 
                              ? 'border-theme-yellow bg-theme-yellow/20 text-white' 
                              : canChange 
                                ? 'border-white/20 hover:border-white/40 bg-white/10 text-white'
                                : 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed text-white/70'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`${profession.colorTheme?.gradient || 'bg-gradient-to-r from-gray-500 to-gray-600'} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                              {profession.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{profession.name}</h4>
                              <p className="text-xs text-white capitalize">{profession.category}</p>
                            </div>
                          </div>
                          <p className="text-sm text-white/80 mb-3">{profession.description}</p>
                          <div className="flex items-center justify-between">
                            {isCurrentProfession ? (
                              <Badge className="bg-theme-yellow text-white">Current</Badge>
                            ) : canChange ? (
                              <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                                <Coins className="w-3 h-3 mr-1" />
                                {cost} coins
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                                <Lock className="w-3 h-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                            {canChange && !isCurrentProfession && (
                              <Button size="sm" className="bg-theme-turquoise text-white hover:bg-theme-turquoise-light">
                                Change Career
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
}