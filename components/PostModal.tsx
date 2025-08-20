import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ThumbsUp, MessageCircle, Bookmark, Clock, User, MapPin, Trophy, Eye
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
}

interface PostModalProps {
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
  isOpen: boolean;
  onClose: () => void;
  onUpvote?: (id: string) => void;
  onSave?: (id: string) => void;
  isLiked?: boolean;
  isSaved?: boolean;
  likeCount?: number;
  onLikeChange?: (liked: boolean) => void;
  onSaveChange?: (saved: boolean) => void;
}

export const PostModal: React.FC<PostModalProps> = ({
  post,
  isOpen,
  onClose,
  onUpvote,
  onSave,
  isLiked: externalIsLiked = false,
  isSaved: externalIsSaved = false,
  likeCount: externalLikeCount,
  onLikeChange,
  onSaveChange
}) => {
  const [newComment, setNewComment] = useState('');
  
  // Use external state if provided, otherwise use internal state
  const isLiked = externalIsLiked;
  const isSaved = externalIsSaved;
  const likeCount = externalLikeCount || post.upvotes;

  // Mock comments data
  const comments: Comment[] = [
    {
      id: '1',
      author: { name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      content: 'Amazing work! This is exactly what I needed to see today. Keep pushing! 💪',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12
    },
    {
      id: '2',
      author: { name: 'Sarah Kim' },
      content: 'The dedication is inspiring. How long did this take you?',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8
    },
    {
      id: '3',
      author: { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
      content: 'This challenge looks intense! I might try it next week.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 15
    }
  ];

  const handleLike = () => {
    const newLikedState = !isLiked;
    onLikeChange?.(newLikedState);
    onUpvote?.(post.id);
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    onSaveChange?.(newSavedState);
    onSave?.(post.id);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Here you would typically send the comment to your backend
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex h-full">
              {/* Left Side - Post Content */}
              <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1">
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
                          {post.challengeCategory && (
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                              {post.challengeCategory}
                            </Badge>
                          )}
                        </div>
                        <div className="text-white font-semibold mt-1">{post.challengeName}</div>
                      </div>
                    )}

                    {/* Title and Description */}
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-white/70 text-base leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    {/* Thumbnail */}
                    {post.thumbnail && (
                      <div className="mb-4 relative">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title}
                          className="w-full h-64 object-cover rounded-xl shadow-lg"
                        />
                        {post.isChallengeSubmission && (
                          <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-xl" />
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
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

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLike}
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
                </ScrollArea>
              </div>

              {/* Right Side - Comments */}
              <div className="w-80 border-l border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Comments ({comments.length})</h3>
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {comment.author.avatar ? (
                            <img 
                              src={comment.author.avatar} 
                              alt={comment.author.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-white font-medium text-sm">{comment.author.name}</span>
                            <span className="text-white/40 text-xs">{formatTimeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-white/70 text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-white/40">
                            <button className="flex items-center space-x-1 hover:text-white/60">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="hover:text-white/60">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Comment Input */}
                <div className="p-4 border-t border-white/10">
                  <form onSubmit={handleSubmitComment} className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newComment.trim()}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Post
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
