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
import { UserRPGProgress, EquipmentItem, ProfessionTier } from '../types/rpg-system';
import { getProfessionById, PROFESSIONS } from '../data/professions';

interface CareerProgressInterfaceProps {
  userProgress: UserRPGProgress;
  onJobChange: (newProfessionId: string) => void;
  onEquipItem: (item: EquipmentItem) => void;
  onUnequipItem: (itemId: string) => void;
  onClaimReward: (tierId: string) => void;
  availableCoins: number;
}

// Mock tier data for demonstration
const MOCK_TIERS = [
  {
    id: 'apprentice',
    name: 'Apprentice',
    level: 1,
    requiredXP: 0,
    requiredChallenges: 0,
    rewards: {
      coins: 100,
      tokens: 10,
      equipment: [],
      skills: ['Basic Foundation', 'Problem Solving'],
      badges: ['Beginner']
    },
    completed: true
  },
  {
    id: 'journeyman',
    name: 'Journeyman',
    level: 2,
    requiredXP: 1000,
    requiredChallenges: 25,
    rewards: {
      coins: 500,
      tokens: 50,
      equipment: [],
      skills: ['Intermediate Skills', 'Applied Knowledge'],
      badges: ['Practitioner']
    },
    completed: true
  },
  {
    id: 'expert',
    name: 'Expert',
    level: 3,
    requiredXP: 5000,
    requiredChallenges: 75,
    rewards: {
      coins: 1500,
      tokens: 150,
      equipment: [],
      skills: ['Advanced Techniques', 'Strategic Thinking'],
      badges: ['Expert', 'Mentor']
    },
    completed: false
  },
  {
    id: 'grandmaster',
    name: 'Grand Master',
    level: 4,
    requiredXP: 15000,
    requiredChallenges: 150,
    rewards: {
      coins: 3000,
      tokens: 300,
      equipment: [],
      skills: ['Master-level Expertise', 'Innovation'],
      badges: ['Grand Master', 'Innovator']
    },
    completed: false
  },
  {
    id: 'ascended',
    name: 'Ascended',
    level: 5,
    requiredXP: 50000,
    requiredChallenges: 300,
    rewards: {
      coins: 10000,
      tokens: 1000,
      equipment: [],
      skills: ['Transcendent Mastery', 'Universal Understanding'],
      badges: ['Ascended Master', 'Legend']
    },
    completed: false
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
  const [selectedProfession, setSelectedProfession] = useState(userProgress.currentClass || 'mathematics');
  const [showJobChangeModal, setShowJobChangeModal] = useState(false);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
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
  
  // Calculate current tier progress
  const getCurrentTierIndex = (tier: ProfessionTier) => {
    switch (tier) {
      case 'apprentice': return 0;
      case 'journeyman': return 1;
      case 'expert': return 2;
      case 'grandmaster': return 3;
      case 'ascended': return 4;
      default: return 0;
    }
  };

  const currentTierIndex = getCurrentTierIndex(userProgress.currentTier || 'apprentice');
  const currentTier = MOCK_TIERS[currentTierIndex];
  const nextTier = MOCK_TIERS[currentTierIndex + 1];
  
  const progressPercentage = nextTier 
    ? ((userProgress.currentTierXP || 0) / Math.max((nextTier.requiredXP - (currentTier?.requiredXP || 0)), 1)) * 100
    : 100;

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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-accent/5 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">Career Progression</h1>
            <p className="text-muted-foreground">Master your chosen profession and unlock new career paths</p>
          </motion.div>

          {/* Current Status Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-r from-card via-muted/20 to-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl ${currentProfession?.colorTheme?.gradient || 'bg-gradient-to-r from-gray-500 to-gray-600'} flex items-center justify-center text-3xl shadow-lg`}>
                    {currentProfession?.icon || '🎓'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{currentProfession?.name || 'Unknown Class'}</h2>
                    <p className="text-muted-foreground">{currentTier?.name || 'Apprentice'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setShowJobChangeModal(true)}
                    className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Job Change
                  </Button>
                </div>
              </div>

              {/* Progress to Next Tier */}
              {nextTier && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress to {nextTier.name}</span>
                    <span className="text-sm font-medium text-foreground">
                      {userProgress.currentTierXP || 0} / {nextTier.requiredXP - (currentTier?.requiredXP || 0)} XP
                    </span>
                  </div>
                  
                  <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-theme-turquoise">{(userProgress.totalXP || 0).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total XP</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-theme-yellow">{userProgress.level || 1}</div>
                      <div className="text-xs text-muted-foreground">Level</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-500">{currentTierIndex + 1}</div>
                      <div className="text-xs text-muted-foreground">Current Tier</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
              <TabsTrigger value="progress" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Career Path
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Stats & Skills
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Equipment
              </TabsTrigger>
            </TabsList>

            {/* Career Path Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="space-y-4">
                {MOCK_TIERS.map((tier, index) => {
                  const isCompleted = index <= currentTierIndex;
                  const isCurrent = index === currentTierIndex;
                  const isLocked = index > currentTierIndex;

                  return (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`p-6 transition-all duration-300 ${
                        isCompleted ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30' :
                        isCurrent ? 'bg-gradient-to-r from-theme-yellow/20 to-theme-yellow-bright/20 border-theme-yellow/30' :
                        'bg-card border-border opacity-60'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* Tier Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              isCompleted ? 'bg-green-500 text-white' :
                              isCurrent ? 'bg-theme-yellow text-theme-black' :
                              'bg-gray-300 text-gray-600'
                            }`}>
                              {isCompleted ? <CheckCircle className="w-6 h-6" /> :
                               isCurrent ? <Play className="w-6 h-6" /> :
                               <Lock className="w-6 h-6" />}
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {tier.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>Level {tier.level}</span>
                                <span>•</span>
                                <span>{tier.requiredXP.toLocaleString()} XP</span>
                                <span>•</span>
                                <span>{tier.requiredChallenges} Challenges</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {/* Rewards Preview */}
                            <div className="flex items-center space-x-2 text-sm">
                              <Badge variant="outline" className="text-xs">
                                <Coins className="w-3 h-3 mr-1 text-theme-yellow" />
                                {tier.rewards.coins}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Star className="w-3 h-3 mr-1 text-purple-500" />
                                {tier.rewards.tokens}
                              </Badge>
                            </div>

                            {/* Expand/Collapse */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                            >
                              {expandedTier === tier.id ? 
                                <ChevronDown className="w-4 h-4" /> : 
                                <ChevronRight className="w-4 h-4" />
                              }
                            </Button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedTier === tier.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-6 pt-6 border-t border-border"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Skills */}
                                {tier.rewards.skills && tier.rewards.skills.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-3 flex items-center">
                                      <Book className="w-4 h-4 mr-2 text-blue-500" />
                                      Skills Unlocked
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {tier.rewards.skills.map(skill => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Badges */}
                                {tier.rewards.badges && tier.rewards.badges.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-3 flex items-center">
                                      <Award className="w-4 h-4 mr-2 text-orange-500" />
                                      Badges Earned
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {tier.rewards.badges.map(badge => (
                                        <Badge key={badge} variant="outline" className="text-xs">
                                          🏆 {badge}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Core Stats</h3>
                  <div className="space-y-4">
                    {Object.entries(userStats).map(([stat, value]) => (
                      <div key={stat}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="capitalize text-sm">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-sm font-medium">{value}/100</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Progress Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Level</span>
                      <span className="font-medium">{userProgress.level || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total XP</span>
                      <span className="font-medium">{(userProgress.totalXP || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Title</span>
                      <span className="font-medium">{userProgress.currentTitle || 'Apprentice'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unlocked Classes</span>
                      <span className="font-medium">{(userProgress.unlockedClasses || []).length}</span>
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
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Equipment System</h3>
                <p className="text-muted-foreground">
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
                  className="bg-card rounded-3xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto border border-border"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Choose New Career Path</h3>
                    <Button variant="ghost" onClick={() => setShowJobChangeModal(false)}>
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
                              ? 'border-theme-yellow bg-theme-yellow/20' 
                              : canChange 
                                ? 'border-border hover:border-theme-turquoise/50 bg-card'
                                : 'border-border bg-muted opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-12 h-12 rounded-xl ${profession.colorTheme?.gradient || 'bg-gradient-to-r from-gray-500 to-gray-600'} flex items-center justify-center text-2xl shadow-lg`}>
                              {profession.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{profession.name}</h4>
                              <p className="text-xs text-muted-foreground capitalize">{profession.category}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{profession.description}</p>
                          
                          <div className="flex items-center justify-between">
                            {isCurrentProfession ? (
                              <Badge className="bg-theme-yellow text-theme-black">Current</Badge>
                            ) : canChange ? (
                              <Badge variant="outline" className="text-xs">
                                <Coins className="w-3 h-3 mr-1" />
                                {cost} coins
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                <Lock className="w-3 h-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                            
                            {canChange && !isCurrentProfession && (
                              <Button size="sm" className="bg-theme-turquoise text-theme-black hover:bg-theme-turquoise-light">
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