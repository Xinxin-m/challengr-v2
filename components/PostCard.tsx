import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, MessageCircle, Share2, Eye, Trophy, 
  ThumbsUp, Clock, User, MapPin, Bookmark
} from 'lucide-react';
import { Badge } from './ui/badge';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    upvotes: number;
    comments: number;
    shares: number;
    views: number;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      username: string;
      avatar?: string;
      level: number;
      location?: string;
    };
    isChallengeSubmission?: boolean;
    challengeName?: string;
    challengeCategory?: string;
    tags?: string[];
  };
  onClick?: (id: string) => void;
  onUpvote?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onSave?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onClick, 
  onUpvote, 
  onComment, 
  onShare, 
  onSave 
}) => {
  const handleClick = () => {
    onClick?.(post.id);
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpvote?.(post.id);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(post.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(post.id);
  };

  // Format time ago
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}D ago`;
    } else {
      return `${Math.floor(diffInDays / 7)}w ago`;
    }
  };

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group ${
        post.isChallengeSubmission 
          ? 'border-yellow-400/60 shadow-yellow-500/20' 
          : 'border-cyan-400/30'
      }`}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.01,
        y: -2,
        borderColor: post.isChallengeSubmission 
          ? 'rgba(250, 204, 21, 0.8)' 
          : 'rgba(34, 211, 238, 0.6)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Challenge Submission Badge */}
      {post.isChallengeSubmission && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-0 shadow-lg">
            <Trophy className="w-3 h-3 mr-1" />
            SUBMISSION
          </Badge>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Header - Author Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-semibold">{post.author.name}</h4>
              <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border-cyan-400/30 text-xs">
                Lv.{post.author.level}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(post.createdAt)}</span>
              {post.author.location && (
                <>
                  <span>•</span>
                  <MapPin className="w-3 h-3" />
                  <span>{post.author.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Challenge Info (if submission) */}
        {post.isChallengeSubmission && post.challengeName && (
          <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-amber-600/10 border border-yellow-400/30 rounded-xl">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Trophy className="w-4 h-4" />
              <span className="font-medium">Challenge Submission</span>
            </div>
            <div className="text-white font-semibold mt-1">{post.challengeName}</div>
            {post.challengeCategory && (
              <Badge variant="outline" className="mt-2 text-yellow-400 border-yellow-400/30">
                {post.challengeCategory}
              </Badge>
            )}
          </div>
        )}

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="mb-4 relative">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            {/* Overlay for challenge submissions */}
            {post.isChallengeSubmission && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-xl" />
            )}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 4).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-cyan-400 border-cyan-400/30 text-xs"
              >
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 4 && (
              <Badge variant="outline" className="text-white/60 border-white/20 text-xs">
                +{post.tags.length - 4} more
              </Badge>
            )}
          </div>
        )}

        {/* Engagement Stats and Actions */}
        <div className="flex items-center justify-between">
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.upvotes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>{post.shares.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleUpvote}
              className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleComment}
              className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className="p-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <Bookmark className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          post.isChallengeSubmission 
            ? 'bg-gradient-to-r from-yellow-500/5 to-amber-600/5' 
            : 'bg-gradient-to-r from-cyan-500/5 to-purple-600/5'
        }`}
      />
    </motion.div>
  );
};
