import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,
  Play, Users, Clock, Zap, Coins, Star, Trophy, Target,
  MapPin, Calendar, Flame, Crown, Shield, Sparkles,
  ThumbsUp, ThumbsDown, Eye, ArrowUp, Filter, Search,
  Plus, Send, Image, Video, Mic, Smile, AtSign, Hash
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { CommunityPost, RPGUser, UserRPGProgress } from '../config/social-system';
import { getProfessionById } from '../data/professions';

interface CommunityHomeFeedProps {
  userProgress: UserRPGProgress;
  onCreatePost: () => void;
  onCreateChallenge: () => void;
  onJoinChallenge: (challengeId: string) => void;
  onTokenEarn: (amount: number, type: 'xp' | 'coins' | 'tokens') => void;
}

// Mock data for community posts
const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    type: 'challenge',
    author: {
      id: 'user1',
      username: 'math_wizard_alex',
      displayName: 'Alex the Math Wizard',
      avatar: '🧙‍♂️',
      profession: 'mathematics',
      tier: 'expert',
      level: 28,
      isVerified: true,
      badges: ['Problem Solver', 'Speed Demon'],
      title: 'Calculus Master',
      stats: { followers: 1247, following: 89, totalXP: 45000, achievements: 23 }
    },
    title: '30-Minute Calculus Speed Run Challenge! 🏃‍♂️',
    content: 'Think you can solve 50 calculus problems in 30 minutes? I just set a new personal record and want to see who can beat it! Join now for epic rewards! 🎯\n\nRequirements:\n• Journeyman level or higher\n• Scientific calculator allowed\n• Show your work for verification',
    media: [
      {
        id: 'm1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
        alt: 'Calculus equations on blackboard'
      }
    ],
    tags: ['mathematics', 'calculus', 'speed-challenge', 'competition'],
    profession: 'mathematics',
    difficulty: 'intermediate',
    engagement: { likes: 156, comments: 23, shares: 12, bookmarks: 45 },
    rewards: { xp: 500, coins: 750, tokens: 25 },
    challengeData: {
      participants: 89,
      timeLimit: 30,
      requirements: ['Journeyman level', 'Show work', 'Calculator allowed'],
      joinable: true
    },
    createdAt: new Date('2024-01-22T10:30:00'),
    isVerified: true,
    location: { name: 'Math Arena' }
  },
  {
    id: '2',
    type: 'content',
    author: {
      id: 'user2',
      username: 'chef_maria_pro',
      displayName: 'Chef Maria',
      avatar: '👩‍🍳',
      profession: 'culinary',
      tier: 'grandmaster',
      level: 45,
      isVerified: true,
      badges: ['Michelin Star', 'Flavor Master', 'Innovation King'],
      title: 'Culinary Grandmaster',
      stats: { followers: 3521, following: 156, totalXP: 89000, achievements: 67 }
    },
    title: 'Secret to Perfect Pasta Sauce Revealed! 🍝',
    content: 'After 20 years of cooking, I\'m sharing my grandmother\'s secret pasta sauce recipe! This technique will blow your mind and elevate your cooking game instantly.\n\nKey tips:\n1. Always bloom your spices first\n2. Use San Marzano tomatoes\n3. The secret ingredient? A touch of dark chocolate! 🍫\n\nWho\'s going to try this tonight?',
    media: [
      {
        id: 'm2',
        type: 'video',
        url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop',
        alt: 'Perfect pasta with sauce',
        duration: 180
      }
    ],
    tags: ['cooking', 'pasta', 'recipe', 'tips', 'italian'],
    profession: 'culinary',
    engagement: { likes: 342, comments: 67, shares: 89, bookmarks: 156 },
    createdAt: new Date('2024-01-21T18:45:00'),
    isPinned: true,
    isVerified: true
  },
  {
    id: '3',
    type: 'achievement',
    author: {
      id: 'user3',
      username: 'code_ninja_sam',
      displayName: 'Sam the Code Ninja',
      avatar: '🥷',
      profession: 'programming',
      tier: 'expert',
      level: 32,
      isVerified: false,
      badges: ['Open Source Hero', 'Bug Hunter'],
      title: 'Senior Developer',
      stats: { followers: 892, following: 234, totalXP: 52000, achievements: 31 }
    },
    title: 'Just hit 50,000 XP! 🎉 From Zero to Code Hero!',
    content: 'Started this journey 6 months ago as a complete beginner. Today I just crossed 50k XP and got promoted to Expert tier! 🚀\n\nMy learning path:\n• Month 1-2: HTML/CSS basics\n• Month 3-4: JavaScript fundamentals  \n• Month 5-6: React and Node.js\n\nTo everyone just starting - you got this! The key is consistency, not perfection. 💪',
    tags: ['achievement', 'programming', 'motivation', 'learning-journey'],
    profession: 'programming',
    engagement: { likes: 234, comments: 45, shares: 23, bookmarks: 67 },
    rewards: { xp: 0, coins: 100 },
    createdAt: new Date('2024-01-21T14:20:00')
  },
  {
    id: '4',
    type: 'question',
    author: {
      id: 'user4',
      username: 'physics_student_jen',
      displayName: 'Jennifer',
      avatar: '🔬',
      profession: 'physics',
      tier: 'apprentice',
      level: 8,
      isVerified: false,
      badges: ['Curious Mind'],
      title: 'Physics Apprentice',
      stats: { followers: 45, following: 89, totalXP: 1200, achievements: 3 }
    },
    title: 'Help! Quantum mechanics is melting my brain 🧠💥',
    content: 'I\'m struggling with wave-particle duality concept. Can someone explain it in simple terms? I get the math but the conceptual part is confusing me.\n\nSpecific questions:\n• How can something be both a wave and particle?\n• What determines which property we observe?\n• Any good analogies to help visualize this?\n\nAny physics experts willing to help a confused apprentice? 🥺',
    tags: ['physics', 'quantum-mechanics', 'help', 'learning'],
    profession: 'physics',
    engagement: { likes: 67, comments: 34, shares: 8, bookmarks: 23 },
    createdAt: new Date('2024-01-20T09:15:00')
  }
];

export function CommunityHomeFeed({
  userProgress,
  onCreatePost,
  onCreateChallenge,
  onJoinChallenge,
  onTokenEarn
}: CommunityHomeFeedProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_POSTS);
  const [filter, setFilter] = useState<'all' | 'challenges' | 'content' | 'following'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const filteredPosts = posts.filter(post => {
    if (filter === 'challenges' && post.type !== 'challenge') return false;
    if (filter === 'content' && post.type === 'challenge') return false;
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, engagement: { ...post.engagement, likes: post.engagement.likes + 1 } }
        : post
    ));
    onTokenEarn(5, 'coins');
  };

  const handleJoinChallenge = (challengeId: string) => {
    onJoinChallenge(challengeId);
    onTokenEarn(10, 'xp');
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'challenge': return <Target className="w-4 h-4" />;
      case 'content': return <Sparkles className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'question': return <MessageCircle className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'challenge': return 'from-orange-500 to-red-500';
      case 'content': return 'from-blue-500 to-purple-500';
      case 'achievement': return 'from-yellow-500 to-orange-500';
      case 'question': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-accent/5">
      {/* Header with Create Options */}
      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-xl border-b border-border p-4">
        <div className="max-w-4xl mx-auto">
          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, challenges, and more..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-turquoise/50"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              {['all', 'challenges', 'content', 'following'].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterType as any)}
                  className={filter === filterType ? 'bg-theme-yellow text-theme-black' : ''}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Create Panel */}
          <Card className="p-4 bg-gradient-to-r from-card via-muted/20 to-card">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-theme-turquoise to-theme-yellow rounded-full flex items-center justify-center text-xl">
                🎯
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Share your knowledge, create a challenge, or ask a question..."
                  className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none"
                  onClick={() => setShowCreatePanel(true)}
                  readOnly
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={onCreateChallenge}
                  size="sm"
                  className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Challenge
                </Button>
                <Button
                  onClick={onCreatePost}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Feed Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-theme-turquoise to-theme-yellow rounded-full flex items-center justify-center text-xl shadow-lg">
                        {post.author.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-foreground">{post.author.displayName}</h4>
                          {post.author.isVerified && (
                            <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5">
                              <Shield className="w-3 h-3" />
                            </Badge>
                          )}
                          <Badge className={`bg-gradient-to-r ${getPostTypeColor(post.type)} text-white text-xs px-2 py-0.5`}>
                            {getPostTypeIcon(post.type)}
                            <span className="ml-1">{post.type.toUpperCase()}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>@{post.author.username}</span>
                          <span>•</span>
                          <span>Lv.{post.author.level} {post.author.title}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Media */}
                    {post.media && post.media.length > 0 && (
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={post.media[0].url}
                          alt={post.media[0].alt}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Challenge Specific Info */}
                    {post.type === 'challenge' && post.challengeData && (
                      <div className="bg-gradient-to-r from-theme-yellow/20 to-theme-turquoise/20 rounded-xl p-4 border border-theme-yellow/30">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-theme-yellow">{post.challengeData.participants}</div>
                            <div className="text-xs text-muted-foreground">Participants</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-theme-turquoise">{post.challengeData.timeLimit}min</div>
                            <div className="text-xs text-muted-foreground">Time Limit</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-500">+{post.rewards?.xp || 0}</div>
                            <div className="text-xs text-muted-foreground">XP Reward</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-500">+{post.rewards?.coins || 0}</div>
                            <div className="text-xs text-muted-foreground">Coins</div>
                          </div>
                        </div>
                        
                        {post.challengeData.joinable && (
                          <Button
                            onClick={() => handleJoinChallenge(post.id)}
                            className="w-full bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Join Challenge Now!
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-border bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <motion.button
                        onClick={() => handleLike(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.engagement.likes}</span>
                      </motion.button>

                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.engagement.comments}</span>
                      </button>

                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.engagement.shares}</span>
                      </button>
                    </div>

                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-theme-yellow transition-colors">
                      <Bookmark className="w-5 h-5" />
                      <span className="text-sm">{post.engagement.bookmarks}</span>
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Load More Button */}
        <div className="text-center py-8">
          <Button variant="outline" className="rounded-xl">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
}