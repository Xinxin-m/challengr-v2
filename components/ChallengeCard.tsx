import React from 'react';
import { motion } from 'motion/react';
import { X, Star, Users, Clock, Coins, MapPin, Trophy, Bookmark, Share2, ExternalLink, Calendar, Zap, Target, Sparkles, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
import { Challenge } from '../config/rpg-system';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick?: () => void;
  onClose?: () => void;
  isExpanded?: boolean;
  thumbnail?: string;
}

export function ChallengeCard({ challenge, onClick, onClose, isExpanded = false, thumbnail }: ChallengeCardProps) {
  // Helper function to format time left
  const formatTimeLeft = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}H`;
    return `${Math.floor(minutes / 1440)}D`;
  };

  // Unified border styling for all challenge cards
  const unifiedBorder = 'border border-border';

  if (isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card/95 dark:bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-2xl overflow-hidden"
      >
        <div className="relative">
                  <img
          src={thumbnail || '/api/placeholder/400/300'}
          alt={challenge.title}
          className="w-full h-64 object-cover"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center space-x-1">
            {/* Type Badge */}
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 text-xs px-2 py-0.5">
              <Target className="w-2.5 h-2.5 mr-0.5" />
              {challenge.type}
            </Badge>
            {/* Category Badge */}
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs px-2 py-0.5">
              <Sparkles className="w-2.5 h-2.5 mr-0.5" />
              {challenge.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {challenge.entryCost === 0 ? 'Free' : `${challenge.entryCost} coins`}
            </Badge>
            <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
            </Button>
            {onClose && (
              <Button variant="secondary" size="sm" onClick={onClose} className="bg-white/20 backdrop-blur-sm">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-1 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">{challenge.participants} participants</span>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatTimeLeft(challenge.timeLimit)} left</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{challenge.location?.details || challenge.location?.type || 'Online'}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
              <p className="text-muted-foreground mb-4">{challenge.description}</p>
            </div>
          </div>

          {/* Progress and Rewards */}
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                Completion Rewards
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Gold Coins</div>
                  <div className="font-bold text-yellow-600 dark:text-yellow-400">+50-200 🪙</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Experience</div>
                  <div className="font-bold text-blue-600 dark:text-blue-400">+100-500 XP</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Challenge Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {Math.floor(challenge.participants * 0.78)} participants completed
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Display */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm">{challenge.entryCost === 0 ? 'Free' : challenge.entryCost}</span>
              </div>
              <div className="flex items-center space-x-1 bg-cyan-500/20 px-2 py-1 rounded-lg">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-sm">{challenge.rewards.xp}</span>
              </div>
              {challenge.rewards.equipment && challenge.rewards.equipment.length > 0 && (
                <div className="flex items-center space-x-1 bg-purple-500/20 px-2 py-1 rounded-lg">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-bold text-sm">Epic Gear</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{challenge.category}</Badge>
            {challenge.tags?.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="outline">#{tag}</Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button variant="outline" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-64"
    >
      <div className="relative">
        <img
          src={thumbnail || '/api/placeholder/400/300'}
          alt={challenge.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center space-x-1">
          {/* Type Badge */}
          <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 text-xs px-2 py-0.5">
            <Target className="w-2.5 h-2.5 mr-0.5" />
            {challenge.type}
          </Badge>
          {/* Category Badge */}
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs px-2 py-0.5">
            <Sparkles className="w-2.5 h-2.5 mr-0.5" />
            {challenge.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {challenge.entryCost === 0 ? 'Free' : `${challenge.entryCost} coins`}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center space-x-1 mb-1">
            <Users className="w-3 h-3 text-blue-400" />
            <span className="text-sm font-medium">{challenge.participants}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span className="text-sm">{formatTimeLeft(challenge.timeLimit)} left</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold mb-2 line-clamp-1">{challenge.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{challenge.description}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatTimeLeft(challenge.timeLimit)} left</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-20">{challenge.location?.details || challenge.location?.type || 'Online'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
                alt="Creator"
                className="w-full h-full object-cover"
              />
            </Avatar>
            <span className="text-sm text-muted-foreground">John Doe</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Coins className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">{challenge.rewards.coins}</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-600 dark:text-cyan-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">{challenge.rewards.xp}</span>
            </div>
          </div>
        </div>


      </div>
    </motion.div>
  );
}