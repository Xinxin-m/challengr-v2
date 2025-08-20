import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Plus, Info, Star, Clock, Users, MapPin,
  ChevronLeft, ChevronRight, Search, Filter, Zap,
  TrendingUp, Award, Gift, Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Challenge, User } from '../types/platform';

interface NetflixHomePageProps {
  onChallengeSelect: (challengeId: string) => void;
  onJoinChallenge: (challengeId: string) => void;
  onSaveChallenge: (challengeId: string) => void;
  userTokens: {
    goldCoins: number;
    platformTokens: number;
    bettingCredits: number;
  };
  onTokenEarn: (amount: number, type: 'gold' | 'platform') => void;
  membershipTier: 'free' | 'basic' | 'premium' | 'ultimate';
}

// Mock data for demonstration
const featuredChallenges: Challenge[] = [
  {
    id: '1',
    creators: ['user1'],
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=450&fit=crop',
    name: '30-Day Fitness Transform',
    description: 'Join thousands in a comprehensive fitness journey that will transform your body and mind. Complete daily workouts, track your progress, and win amazing prizes. This challenge includes personalized workout plans, nutrition guidance, and community support.',
    oneLineDescription: 'Transform your body in 30 days with our community!',
    location: { type: 'online' },
    participationCriteria: { type: 'public' },
    category: 'health-lifestyle',
    tags: ['fitness', 'health', 'transformation'],
    dateCreated: '2024-01-15',
    startDate: '2024-02-01',
    endDate: '2024-03-02',
    entryFee: 25,
    participants: ['user1', 'user2', 'user3'],
    completedBy: [],
    consensus: { type: 'daily-checkin' },
    rewards: { coins: 500, exp: 100 },
    completionCriteria: 'Complete 25 out of 30 daily workouts',
    upvotes: 1247,
    isHighlighted: true,
    trending: true,
    featured: true,
    difficultyLevel: 'intermediate'
  },
  {
    id: '2',
    creators: ['user2'],
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=450&fit=crop',
    name: 'Code Your First App',
    description: 'Learn programming from scratch and build your first mobile app in just 14 days. Perfect for beginners with no coding experience. Includes step-by-step tutorials, live coding sessions, and one-on-one mentorship.',
    oneLineDescription: 'Build your first app in 14 days - no experience needed!',
    location: { type: 'online' },
    participationCriteria: { type: 'public' },
    category: 'coding',
    tags: ['programming', 'mobile-app', 'beginner'],
    dateCreated: '2024-01-20',
    startDate: '2024-02-05',
    endDate: '2024-02-19',
    entryFee: 15,
    participants: ['user3', 'user4'],
    completedBy: [],
    consensus: { type: 'ai-determined' },
    rewards: { coins: 300, exp: 75 },
    completionCriteria: 'Submit a working mobile app',
    upvotes: 892,
    isHighlighted: true,
    trending: false,
    featured: true,
    difficultyLevel: 'beginner'
  },
  {
    id: '3',
    creators: ['user3'],
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    name: 'World Photography Quest',
    description: 'Capture the beauty of different cultures and landscapes around the world. Submit one photo per week for 8 weeks, each representing a different theme. Professional photographers will judge submissions.',
    oneLineDescription: 'Capture the world through your lens!',
    location: { type: 'online' },
    participationCriteria: { type: 'public' },
    category: 'art',
    tags: ['photography', 'travel', 'art'],
    dateCreated: '2024-01-10',
    startDate: '2024-01-25',
    endDate: '2024-03-21',
    entryFee: 20,
    participants: ['user1', 'user5'],
    completedBy: [],
    consensus: { type: 'judge-determined', judges: ['judge1', 'judge2'] },
    rewards: { coins: 750, exp: 150 },
    completionCriteria: 'Submit 6 out of 8 themed photos',
    upvotes: 654,
    isHighlighted: true,
    trending: true,
    featured: true,
    difficultyLevel: 'intermediate'
  }
];

const challengeCategories = [
  { id: 'all', name: 'All Categories', icon: '🎯', color: 'from-theme-yellow to-theme-turquoise' },
  { id: 'health-lifestyle', name: 'Health & Lifestyle', icon: '💪', color: 'from-green-500 to-emerald-500' },
  { id: 'coding', name: 'Programming', icon: '💻', color: 'from-blue-500 to-indigo-500' },
  { id: 'art', name: 'Art & Creative', icon: '🎨', color: 'from-purple-500 to-pink-500' },
  { id: 'education', name: 'Education', icon: '📚', color: 'from-orange-500 to-red-500' },
  { id: 'games', name: 'Games & Fun', icon: '🎮', color: 'from-cyan-500 to-blue-500' },
  { id: 'reading', name: 'Reading', icon: '📖', color: 'from-amber-500 to-yellow-500' }
];

const mockChallengesByCategory = {
  trending: [
    { ...featuredChallenges[0], id: 't1' },
    { ...featuredChallenges[1], id: 't2' },
    { ...featuredChallenges[2], id: 't3' },
    { ...featuredChallenges[0], id: 't4', name: 'Daily Meditation Challenge' },
    { ...featuredChallenges[1], id: 't5', name: 'Learn Spanish in 21 Days' }
  ],
  new: [
    { ...featuredChallenges[2], id: 'n1', name: 'Sustainable Living Challenge' },
    { ...featuredChallenges[0], id: 'n2', name: 'Master Chef Home Edition' },
    { ...featuredChallenges[1], id: 'n3', name: 'Digital Detox Weekend' },
    { ...featuredChallenges[2], id: 'n4', name: 'Plant-Based Recipe Quest' }
  ],
  free: [
    { ...featuredChallenges[0], id: 'f1', entryFee: 0, name: 'Morning Routine Builder' },
    { ...featuredChallenges[1], id: 'f2', entryFee: 0, name: 'Gratitude Journal' },
    { ...featuredChallenges[2], id: 'f3', entryFee: 0, name: 'Random Acts of Kindness' },
    { ...featuredChallenges[0], id: 'f4', entryFee: 0, name: 'Hydration Challenge' }
  ],
  contests: [
    { ...featuredChallenges[1], id: 'c1', name: 'Design Battle Royale', rewards: { coins: 1000, exp: 200 } },
    { ...featuredChallenges[2], id: 'c2', name: 'Startup Pitch Contest', rewards: { coins: 2000, exp: 300 } },
    { ...featuredChallenges[0], id: 'c3', name: 'Innovation Hackathon', rewards: { coins: 1500, exp: 250 } }
  ]
};

export function NetflixHomePage({
  onChallengeSelect,
  onJoinChallenge,
  onSaveChallenge,
  userTokens,
  onTokenEarn,
  membershipTier
}: NetflixHomePageProps) {
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [hoveredChallenge, setHoveredChallenge] = useState<string | null>(null);

  // Auto-rotate featured challenges
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured(prev => (prev + 1) % featuredChallenges.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevFeatured = () => {
    setCurrentFeatured(prev => 
      prev === 0 ? featuredChallenges.length - 1 : prev - 1
    );
  };

  const handleNextFeatured = () => {
    setCurrentFeatured(prev => (prev + 1) % featuredChallenges.length);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-orange-500 to-red-500';
      case 'expert': return 'from-red-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatParticipantCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const ChallengeCard = ({ challenge, variant = 'default' }: { challenge: Challenge; variant?: 'default' | 'compact' }) => (
    <motion.div
      className={`relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border group cursor-pointer ${
        variant === 'compact' ? 'min-w-[280px]' : 'min-w-[320px]'
      }`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHoveredChallenge(challenge.id)}
      onHoverEnd={() => setHoveredChallenge(null)}
      onClick={() => onChallengeSelect(challenge.id)}
    >
      {/* Thumbnail */}
      <div className={`relative ${variant === 'compact' ? 'h-40' : 'h-48'} overflow-hidden`}>
        <img
          src={challenge.thumbnail}
          alt={challenge.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Entry Fee Badge */}
        <motion.div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
            challenge.entryFee === 0 
              ? 'bg-green-500 text-white' 
              : 'bg-theme-yellow text-theme-black'
          }`}
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {challenge.entryFee === 0 ? 'FREE' : `${challenge.entryFee} 🪙`}
        </motion.div>

        {/* Trending Badge */}
        {challenge.trending && (
          <motion.div
            className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center space-x-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp size={12} />
            <span>TRENDING</span>
          </motion.div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className={`text-white font-semibold mb-1 ${
            variant === 'compact' ? 'text-sm' : 'text-base'
          }`}>
            {challenge.name}
          </h3>
          <p className={`text-gray-200 text-xs mb-2 line-clamp-2`}>
            {challenge.oneLineDescription}
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Users size={12} />
                <span>{formatParticipantCount(challenge.participants.length)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{Math.ceil((new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star size={12} className="text-yellow-400" />
              <span>{(challenge.upvotes / 100).toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Hover Actions */}
        <AnimatePresence>
          {hoveredChallenge === challenge.id && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-3"
            >
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onJoinChallenge(challenge.id);
                }}
                className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
              >
                <Play size={14} className="mr-1" />
                Join
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveChallenge(challenge.id);
                }}
                className="border-white text-white hover:bg-white hover:text-black"
              >
                <Plus size={14} className="mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onChallengeSelect(challenge.id);
                }}
                className="text-white hover:bg-white/20"
              >
                <Info size={14} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Difficulty Indicator */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getDifficultyColor(challenge.difficultyLevel)}`} />
    </motion.div>
  );

  const ChallengeRow = ({ title, challenges, icon }: { title: string; challenges: Challenge[]; icon: React.ReactNode }) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-theme-yellow to-theme-turquoise rounded-xl text-theme-black">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View All →
        </Button>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} variant="compact" />
        ))}
      </div>
    </div>
  );

  const currentChallenge = featuredChallenges[currentFeatured];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Netflix Style Rolling Window */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeatured}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={currentChallenge.thumbnail}
              alt={currentChallenge.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <motion.div
                key={`content-${currentFeatured}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Category & Trending Badge */}
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className="bg-theme-yellow text-theme-black">
                    {currentChallenge.category.replace('-', ' ').toUpperCase()}
                  </Badge>
                  {currentChallenge.trending && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <TrendingUp size={12} className="mr-1" />
                      TRENDING
                    </Badge>
                  )}
                  <Badge className={`bg-gradient-to-r ${getDifficultyColor(currentChallenge.difficultyLevel)} text-white`}>
                    {currentChallenge.difficultyLevel.toUpperCase()}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
                  {currentChallenge.name}
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                  {currentChallenge.description}
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-6 mb-8 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Users size={20} />
                    <span>{formatParticipantCount(currentChallenge.participants.length)} participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={20} />
                    <span>{Math.ceil((new Date(currentChallenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award size={20} />
                    <span>{currentChallenge.rewards.coins} coins reward</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={20} />
                    <span>{currentChallenge.location.type === 'online' ? 'Online' : currentChallenge.location.city}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <Button
                    size="lg"
                    onClick={() => onJoinChallenge(currentChallenge.id)}
                    className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright font-semibold px-8 py-3 text-lg"
                  >
                    <Play size={20} className="mr-2" />
                    Join Challenge
                    {currentChallenge.entryFee > 0 && (
                      <span className="ml-2 px-2 py-1 bg-theme-black/20 rounded text-sm">
                        {currentChallenge.entryFee} 🪙
                      </span>
                    )}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onChallengeSelect(currentChallenge.id)}
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
                  >
                    <Info size={20} className="mr-2" />
                    More Info
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => onSaveChallenge(currentChallenge.id)}
                    className="text-white hover:bg-white/20 px-8 py-3 text-lg"
                  >
                    <Plus size={20} className="mr-2" />
                    Save for Later
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevFeatured}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextFeatured}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredChallenges.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeatured(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentFeatured ? 'bg-theme-yellow scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/95 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search challenges, topics, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base rounded-2xl border-border focus:ring-2 focus:ring-theme-turquoise focus:border-transparent"
              />
            </div>

            {/* Category Selector */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64 rounded-2xl border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {challengeCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Selector */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48 rounded-2xl border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Button */}
            <Button variant="outline" className="rounded-2xl px-6 border-border hover:bg-muted">
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Challenge Rows */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ChallengeRow
            title="Trending Now"
            challenges={mockChallengesByCategory.trending}
            icon={<TrendingUp size={20} />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ChallengeRow
            title="New Challenges"
            challenges={mockChallengesByCategory.new}
            icon={<Zap size={20} />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ChallengeRow
            title="Free to Join"
            challenges={mockChallengesByCategory.free}
            icon={<Gift size={20} />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChallengeRow
            title="Contests & Competitions"
            challenges={mockChallengesByCategory.contests}
            icon={<Award size={20} />}
          />
        </motion.div>

        {/* Blog Posts Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-theme-turquoise/10 to-theme-yellow/10 rounded-3xl p-8 border border-theme-turquoise/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-theme-turquoise to-theme-yellow rounded-xl text-theme-black">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Blog Post Highlights</h2>
              </div>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All Posts →
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "The Science Behind Challenge Success",
                  excerpt: "Discover the psychological principles that make challenges so effective for personal growth...",
                  author: "Dr. Sarah Chen",
                  readTime: "5 min read",
                  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop"
                },
                {
                  title: "Building Healthy Habits That Stick",
                  excerpt: "Learn proven strategies for creating lasting positive changes in your daily routine...",
                  author: "Marcus Johnson",
                  readTime: "3 min read",
                  image: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&h=250&fit=crop"
                },
                {
                  title: "Community Impact of Global Challenges",
                  excerpt: "How online challenges are creating real-world positive change in communities worldwide...",
                  author: "Elena Rodriguez",
                  readTime: "7 min read",
                  image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop"
                }
              ].map((post, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}