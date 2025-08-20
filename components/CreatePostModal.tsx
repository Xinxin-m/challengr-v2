import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, MapPin, Tag, DollarSign, Clock, Users, Trophy, Camera, Video, Mic, Sparkles, Globe, Lock, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Avatar } from './ui/avatar';

interface ModernCreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
  userLevel?: number;
}

export function ModernCreatePostModal({ isOpen, onClose, onSubmit, userLevel = 12 }: ModernCreatePostModalProps) {
  const [postType, setPostType] = useState<'content' | 'challenge'>('content');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const canCreateChallenges = userLevel >= 5;

  const handleSubmit = () => {
    const postData = {
      postType,
      title,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      location,
      price: postType === 'challenge' ? parseFloat(price) || 0 : undefined,
      duration: postType === 'challenge' ? duration : undefined,
      difficulty: postType === 'challenge' ? difficulty : undefined,
      category,
      isPublic,
      attachments
    };
    
    onSubmit(postData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setTags('');
    setLocation('');
    setPrice('');
    setDuration('');
    setDifficulty('');
    setCategory('');
    setIsPublic(true);
    setAttachments([]);
    setStep(1);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isFormValid = title && description && (postType === 'content' || (difficulty && duration && category));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl">
            {/* Header */}
            <CardHeader className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border-b border-border/50">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-cyan-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 border-2 border-purple-300 dark:border-purple-600">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Create New {postType === 'challenge' ? 'Challenge' : 'Post'}
                      </span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Share your knowledge with the community</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="hover:bg-red-500/10 hover:text-red-500 rounded-full w-10 h-10 p-0"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Post Type Toggle */}
              <div className="relative mt-6">
                <div className="grid grid-cols-2 gap-1 p-1 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <Button
                    variant={postType === 'content' ? 'default' : 'ghost'}
                    onClick={() => setPostType('content')}
                    className={`relative h-12 transition-all duration-300 ${
                      postType === 'content' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                        : 'hover:bg-white/20 dark:hover:bg-gray-700/20'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">📝</span>
                      <span className="font-medium">Content Post</span>
                    </div>
                  </Button>
                  <Button
                    variant={postType === 'challenge' ? 'default' : 'ghost'}
                    onClick={() => setPostType('challenge')}
                    disabled={!canCreateChallenges}
                    className={`relative h-12 transition-all duration-300 ${
                      postType === 'challenge' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                        : 'hover:bg-white/20 dark:hover:bg-gray-700/20'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🎯</span>
                      <span className="font-medium">Challenge</span>
                      {!canCreateChallenges && (
                        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-300">
                          Level 5+
                        </Badge>
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={postType === 'challenge' ? "Create an engaging challenge title..." : "What's on your mind?"}
                        className="h-12 text-lg bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={postType === 'challenge' 
                          ? "Describe what participants will learn, the skills they'll gain, and what makes this challenge special..." 
                          : "Share your thoughts, experiences, insights, or knowledge with the community..."
                        }
                        rows={6}
                        className="text-base bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Challenge-specific fields */}
                  <AnimatePresence>
                    {postType === 'challenge' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50"
                      >
                        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 flex items-center">
                          <Trophy className="w-5 h-5 mr-2" />
                          Challenge Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty Level *</Label>
                            <Select value={difficulty} onValueChange={setDifficulty}>
                              <SelectTrigger className="h-10 bg-white/50 dark:bg-gray-800/50">
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>Beginner</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="intermediate">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span>Intermediate</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="advanced">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span>Advanced</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="expert">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span>Expert</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="duration" className="text-sm font-medium">Duration *</Label>
                            <Input
                              id="duration"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              placeholder="e.g., 2 hours, 1 week, 30 days"
                              className="h-10 bg-white/50 dark:bg-gray-800/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-medium">Price (USD)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0 for free"
                                className="h-10 pl-10 bg-white/50 dark:bg-gray-800/50"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                            <Select value={category} onValueChange={setCategory}>
                              <SelectTrigger className="h-10 bg-white/50 dark:bg-gray-800/50">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="coding">💻 Coding & Development</SelectItem>
                                <SelectItem value="design">🎨 Design & Creative</SelectItem>
                                <SelectItem value="fitness">💪 Health & Fitness</SelectItem>
                                <SelectItem value="creativity">✨ Arts & Creativity</SelectItem>
                                <SelectItem value="learning">📚 Education & Learning</SelectItem>
                                <SelectItem value="business">💼 Business & Finance</SelectItem>
                                <SelectItem value="technology">🔧 Technology & Tools</SelectItem>
                                <SelectItem value="lifestyle">🌱 Lifestyle & Wellness</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Additional Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="education, web3, blockchain, react (comma separated)"
                          className="h-10 pl-10 bg-white/50 dark:bg-gray-800/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Online, San Francisco, or anywhere"
                          className="h-10 pl-10 bg-white/50 dark:bg-gray-800/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Media Attachments */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Media & Attachments</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="h-16 flex items-center justify-start space-x-3 hover:bg-accent/50 border-dashed">
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <div className="text-left">
                          <div className="text-sm font-medium">Upload Files</div>
                          <div className="text-xs text-muted-foreground">Images, videos, documents</div>
                        </div>
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="h-14 flex-col hover:bg-blue-50 dark:hover:bg-blue-950">
                          <Camera className="w-4 h-4 mb-1" />
                          <span className="text-xs">Photo</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-14 flex-col hover:bg-purple-50 dark:hover:bg-purple-950">
                          <Video className="w-4 h-4 mb-1" />
                          <span className="text-xs">Video</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-14 flex-col hover:bg-green-50 dark:hover:bg-green-950">
                          <Mic className="w-4 h-4 mb-1" />
                          <span className="text-xs">Audio</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="p-4 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-full">
                          {isPublic ? <Globe className="w-4 h-4 text-blue-600" /> : <Lock className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div>
                          <Label htmlFor="privacy" className="text-sm font-medium">Visibility</Label>
                          <p className="text-xs text-muted-foreground">
                            {isPublic ? 'Public - Anyone can see' : 'Private - Followers only'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="privacy"
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                      />
                    </div>
                  </div>

                  {/* Reward Preview for Challenges */}
                  {postType === 'challenge' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50"
                    >
                      <h4 className="font-semibold mb-3 flex items-center text-sm">
                        <Trophy className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                        Reward System
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Creator Earnings</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">
                            {price ? `$${price} + 🪙` : '🪙 Tokens Only'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Completion Reward</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            🪙 50-200 Gold
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Experience Points</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            ⭐ 100-500 XP
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-border/50 mt-8">
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-semibold shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>{postType === 'challenge' ? 'Create Challenge' : 'Share Post'}</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}