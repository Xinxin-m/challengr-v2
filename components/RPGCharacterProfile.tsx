import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Crown, Star, Trophy, Zap, Target, Shield, Sword,
  Gem, Flame, Heart, Settings, Edit, Camera, Palette,
  Save, RotateCcw, Sparkles, Award, Medal, Globe,
  Users, MessageCircle, Share2, Bookmark, X, ChevronDown,
  ChevronUp, Lock, CheckCircle, ArrowUp, ArrowDown,
  Coins, Brain, Map, Calendar, Clock, TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { CharacterAppearance, Membership } from '../config/social-system';
import { UserRPGProgress } from '../config/rpg-system';
import { getProfessionById } from '../data/professions';

interface RPGCharacterProfileProps {
  userProgress: UserRPGProgress;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<UserRPGProgress>) => void;
  membershipType?: string;
}

const RACE_OPTIONS = [
  { id: 'human', name: 'Human', icon: '👤', description: 'Versatile and ambitious' },
  { id: 'elf', name: 'Elf', icon: '🧝', description: 'Wise and creative' },
  { id: 'dwarf', name: 'Dwarf', icon: '🧙', description: 'Strong and determined' },
  { id: 'orc', name: 'Orc', icon: '👹', description: 'Powerful and fierce' },
  { id: 'robot', name: 'Cyborg', icon: '🤖', description: 'Logical and efficient' },
  { id: 'alien', name: 'Mystic', icon: '👽', description: 'Mysterious and otherworldly' }
];

const HAIR_STYLES = [
  'Short & Neat', 'Long & Flowing', 'Spiky', 'Curly', 'Braided', 'Mohawk',
  'Ponytail', 'Bald', 'Afro', 'Buzz Cut', 'Waves', 'Dreadlocks'
];

const HAIR_COLORS = [
  '#8B4513', '#FFD700', '#000000', '#654321', '#FF4500', '#800080',
  '#00CED1', '#32CD32', '#FF69B4', '#C0C0C0', '#FFFFFF', '#FF0000'
];

const OUTFIT_OPTIONS = [
  { id: 'casual', name: 'Casual Explorer', icon: '👕' },
  { id: 'professional', name: 'Professional Scholar', icon: '👔' },
  { id: 'warrior', name: 'Battle Ready', icon: '⚔️' },
  { id: 'mage', name: 'Mystic Robes', icon: '🔮' },
  { id: 'tech', name: 'Tech Suit', icon: '🦾' },
  { id: 'royal', name: 'Royal Garb', icon: '👑' }
];

const MEMBERSHIP_TIERS: Membership[] = [
  {
    type: 'free',
    displayName: 'Apprentice',
    price: 0,
    features: ['Basic challenges', '5 AI generations/day', 'Community access'],
    benefits: {
      dailyCoins: 100,
      aiGenerations: 5,
      prioritySupport: false,
      exclusiveChallenges: false,
      customization: false,
      advancedAnalytics: false
    },
    color: 'from-gray-500 to-gray-600',
    icon: '🆓'
  },
  {
    type: 'bronze',
    displayName: 'Journeyman',
    price: 5.99,
    features: ['All basic features', '15 AI generations/day', 'Priority matchmaking', 'Basic customization'],
    benefits: {
      dailyCoins: 200,
      aiGenerations: 15,
      prioritySupport: false,
      exclusiveChallenges: true,
      customization: true,
      advancedAnalytics: false
    },
    color: 'from-yellow-600 to-yellow-700',
    icon: '🥉'
  },
  {
    type: 'silver',
    displayName: 'Expert',
    price: 25.99,
    features: ['All bronze features', '50 AI generations/day', 'Priority support', 'Advanced customization', 'Analytics'],
    benefits: {
      dailyCoins: 500,
      aiGenerations: 50,
      prioritySupport: true,
      exclusiveChallenges: true,
      customization: true,
      advancedAnalytics: true
    },
    color: 'from-gray-300 to-gray-400',
    icon: '🥈'
  },
  {
    type: 'gold',
    displayName: 'Grandmaster',
    price: 39.99,
    features: ['All silver features', 'Unlimited AI generations', 'VIP support', 'Exclusive content', 'Custom challenges'],
    benefits: {
      dailyCoins: 1000,
      aiGenerations: -1, // unlimited
      prioritySupport: true,
      exclusiveChallenges: true,
      customization: true,
      advancedAnalytics: true
    },
    color: 'from-yellow-400 to-yellow-500',
    icon: '🥇'
  }
];

export function RPGCharacterProfile({
  userProgress,
  isOpen,
  onClose,
  onSave,
  membershipType = 'free'
}: RPGCharacterProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('character');
  const [characterData, setCharacterData] = useState<CharacterAppearance>({
    race: 'human',
    gender: 'non-binary',
    skinTone: '#F4A460',
    hairStyle: 'Short & Neat',
    hairColor: '#8B4513',
    eyeColor: '#8B4513',
    outfit: 'casual',
    accessories: [],
    background: 'forest',
    pose: 'confident'
  });

  const currentProfession = getProfessionById(userProgress.currentClass || 'mathematics');
  const currentMembership = MEMBERSHIP_TIERS.find(m => m.type === membershipType) || MEMBERSHIP_TIERS[0];

  const handleSave = () => {
    onSave({
      // Using a custom key; parent can merge as needed
      // @ts-expect-error allow appearance passthrough for parent handler
      appearance: characterData
    });
    setEditMode(false);
  };

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'apprentice': return 'Apprentice';
      case 'journeyman': return 'Journeyman';
      case 'expert': return 'Expert';
      case 'grandmaster': return 'Grand Master';
      case 'ascended': return 'Ascended One';
      default: return 'Apprentice';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-theme-black via-theme-gray-dark to-theme-black p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-theme-turquoise to-theme-yellow rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {RACE_OPTIONS.find(r => r.id === characterData.race)?.icon || '👤'}
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  {userProgress.currentTitle || 'Brave Challenger'}
                  <Crown className="w-6 h-6 ml-2 text-theme-yellow" />
                </h2>
                <p className="text-white/80">
                  Level {userProgress.level} {getTierDisplayName(userProgress.currentTier || 'apprentice')} • {currentProfession?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!editMode ? (
                <Button
                  onClick={() => setEditMode(true)}
                  className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Character
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditMode(false)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/30">
              <TabsTrigger value="character" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Character
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Stats & Skills
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="membership" className="data-[state=active]:bg-theme-yellow data-[state=active]:text-theme-black">
                Membership
              </TabsTrigger>
            </TabsList>

            {/* Character Customization Tab */}
            <TabsContent value="character" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Character Preview */}
                <Card className="p-6 bg-gradient-to-br from-muted/20 to-accent/10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-theme-turquoise" />
                    Character Preview
                  </h3>
                  
                  <div className="relative">
                    {/* Character Display */}
                    <div className="w-full h-80 bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-800 dark:to-green-800 rounded-2xl flex items-end justify-center overflow-hidden">
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-8xl mb-4"
                      >
                        {RACE_OPTIONS.find(r => r.id === characterData.race)?.icon || '👤'}
                      </motion.div>
                    </div>
                    
                    {/* Character Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{userProgress.currentTitle || 'Brave Challenger'}</h4>
                          <p className="text-xs text-white/80">
                            {RACE_OPTIONS.find(r => r.id === characterData.race)?.name} • {characterData.outfit}
                          </p>
                        </div>
                        <Badge className={`bg-gradient-to-r ${currentMembership.color} text-white`}>
                          {currentMembership.icon} {currentMembership.displayName}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Customization Options */}
                <div className="space-y-6">
                  {editMode ? (
                    <>
                      {/* Race Selection */}
                      <Card className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-theme-yellow" />
                          Race
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {RACE_OPTIONS.map(race => (
                            <motion.button
                              key={race.id}
                              onClick={() => setCharacterData(prev => ({ ...prev, race: race.id as any }))}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-3 rounded-xl border-2 transition-all text-center ${
                                characterData.race === race.id 
                                  ? 'border-theme-turquoise bg-theme-turquoise/20' 
                                  : 'border-border hover:border-theme-turquoise/50'
                              }`}
                            >
                              <div className="text-2xl mb-1">{race.icon}</div>
                              <div className="text-xs font-medium">{race.name}</div>
                            </motion.button>
                          ))}
                        </div>
                      </Card>

                      {/* Hair Style */}
                      <Card className="p-4">
                        <h4 className="font-semibold mb-3">Hair Style</h4>
                        <Select 
                          value={characterData.hairStyle} 
                          onValueChange={(value: string) => setCharacterData(prev => ({ ...prev, hairStyle: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HAIR_STYLES.map(style => (
                              <SelectItem key={style} value={style}>{style}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Card>

                      {/* Hair Color */}
                      <Card className="p-4">
                        <h4 className="font-semibold mb-3">Hair Color</h4>
                        <div className="grid grid-cols-6 gap-2">
                          {HAIR_COLORS.map(color => (
                            <motion.button
                              key={color}
                              onClick={() => setCharacterData(prev => ({ ...prev, hairColor: color }))}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`w-8 h-8 rounded-full border-2 ${
                                characterData.hairColor === color 
                                  ? 'border-theme-turquoise ring-2 ring-theme-turquoise/50' 
                                  : 'border-border'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </Card>

                      {/* Outfit */}
                      <Card className="p-4">
                        <h4 className="font-semibold mb-3">Outfit</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {OUTFIT_OPTIONS.map(outfit => (
                            <motion.button
                              key={outfit.id}
                              onClick={() => setCharacterData(prev => ({ ...prev, outfit: outfit.id }))}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-3 rounded-xl border-2 transition-all text-left ${
                                characterData.outfit === outfit.id 
                                  ? 'border-theme-turquoise bg-theme-turquoise/20' 
                                  : 'border-border hover:border-theme-turquoise/50'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-xl">{outfit.icon}</span>
                                <span className="text-sm font-medium">{outfit.name}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </Card>
                    </>
                  ) : (
                    // Display mode
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Character Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Race</span>
                          <span>{RACE_OPTIONS.find(r => r.id === characterData.race)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hair</span>
                          <span>{characterData.hairStyle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Outfit</span>
                          <span>{OUTFIT_OPTIONS.find(o => o.id === characterData.outfit)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Title</span>
                          <span>{userProgress.currentTitle || 'Brave Challenger'}</span>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-theme-turquoise" />
                    Core Attributes
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(userProgress.stats || {}).map(([stat, value]) => (
                      <div key={stat}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="capitalize text-sm font-medium">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-sm font-bold text-theme-yellow">{value}/100</span>
                        </div>
                         <Progress value={Number(value)} className="h-3" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-theme-yellow" />
                    Progress Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Level</span>
                      <span className="font-bold text-theme-turquoise">{userProgress.level || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total XP</span>
                      <span className="font-bold text-purple-500">{(userProgress.totalXP || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Coins</span>
                      <span className="font-bold text-theme-yellow">{userProgress.dailyCoins || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unlocked Classes</span>
                      <span className="font-bold text-green-500">{(userProgress.unlockedClasses || []).length}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="text-center py-12">
                <Medal className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Achievement Gallery</h3>
                <p className="text-muted-foreground">
                  Your earned badges and titles will appear here as you progress!
                </p>
              </div>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership" className="space-y-6">
              <div className="space-y-4">
                {MEMBERSHIP_TIERS.map((membership, index) => (
                  <motion.div
                    key={membership.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-6 border-2 transition-all ${
                      membershipType === membership.type
                        ? `border-transparent bg-gradient-to-r ${membership.color} text-white`
                        : 'border-border hover:border-theme-turquoise/50'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{membership.icon}</div>
                          <div>
                            <h3 className="text-lg font-bold">{membership.displayName}</h3>
                            <p className={`text-sm ${membershipType === membership.type ? 'text-white/80' : 'text-muted-foreground'}`}>
                              {membership.price === 0 ? 'Free' : `$${membership.price}/month`}
                            </p>
                          </div>
                        </div>
                        
                        {membershipType === membership.type ? (
                          <Badge className="bg-white/20 text-white">Current</Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                          >
                            {membership.price === 0 ? 'Current' : 'Upgrade'}
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {membership.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle className={`w-4 h-4 ${membershipType === membership.type ? 'text-white' : 'text-green-500'}`} />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}