import React from 'react';
import { motion } from 'motion/react';
import { User, Star, Trophy, MapPin, Crown } from 'lucide-react';
import { Badge } from './ui/badge';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    level: number;
    title?: string;
    location?: string;
    followers: number;
    following: number;
    achievements: number;
    isOnline?: boolean;
    lastSeen?: string;
  };
  onClick?: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick }) => {
  const handleClick = () => {
    onClick?.(user.id);
  };

  return (
    <motion.div
      className="w-96 h-48 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl overflow-hidden shadow-2xl cursor-pointer relative group"
      onClick={handleClick}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        borderColor: 'rgba(34, 211, 238, 0.6)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Content */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              {/* Online Status */}
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{user.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border-cyan-400/30">
                  <Trophy className="w-3 h-3 mr-1" />
                  Lv.{user.level}
                </Badge>
                {user.title && (
                  <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                    {user.title}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Follow
          </motion.button>
        </div>

        {/* Location and Stats */}
        <div className="flex-1 space-y-3">
          {user.location && (
            <div className="flex items-center space-x-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{user.location}</span>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-white font-bold">{user.followers.toLocaleString()}</div>
                <div className="text-white/60 text-xs">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">{user.following.toLocaleString()}</div>
                <div className="text-white/60 text-xs">Following</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">{user.achievements}</div>
                <div className="text-white/60 text-xs">Achievements</div>
              </div>
            </div>
          </div>

          {/* Last Seen */}
          {user.lastSeen && !user.isOnline && (
            <div className="text-white/40 text-xs">
              Last seen {user.lastSeen}
            </div>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
};
