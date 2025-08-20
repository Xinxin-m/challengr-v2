import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, Eye, Trophy, 
  ThumbsUp, Clock, User, MapPin, Bookmark
} from 'lucide-react';
import { Badge } from './ui/badge';
import { PostModal } from './PostModal';

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
  onSave?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onClick, 
  onUpvote, 
  onSave 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.upvotes);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onUpvote?.(post.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
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
    <>
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
      {/* Challenge Submission Badge removed from post card */}

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
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(post.createdAt)}</span>
              {post.author.location && (
                <>
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

        {/* Tags removed for Following tiles */}

        {/* Engagement Stats and Actions */}
        <div className="flex items-center justify-between">
          {/* Stats: views, comments, likes (removed shares) */}
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{likeCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons: like and save only */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleUpvote}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isSaved 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
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

    {/* Post Modal */}
    <PostModal
      post={post}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onUpvote={onUpvote}
      onSave={onSave}
      isLiked={isLiked}
      isSaved={isSaved}
      likeCount={likeCount}
      onLikeChange={setIsLiked}
      onSaveChange={setIsSaved}
    />
  </>
  );
};
