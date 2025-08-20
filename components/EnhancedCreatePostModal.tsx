import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image, MapPin, Tag, DollarSign, Clock, Users, Trophy, Camera, Video, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface EnhancedCreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
  userLevel?: number;
}

export function EnhancedCreatePostModal({ isOpen, onClose, onSubmit, userLevel = 12 }: EnhancedCreatePostModalProps) {
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

  const canCreateChallenges = userLevel >= 5; // Only level 5+ users can create challenges

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
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-card/95 dark:bg-card/95 backdrop-blur-sm border shadow-2xl">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-2xl"
                  >
                    ✨
                  </motion.div>
                  <span>Create New Post</span>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="hover:bg-destructive/10 hover:text-destructive rounded-full w-8 h-8 p-0"
                >
                  <X size={18} />
                </Button>
              </div>

              {/* Post Type Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg mt-4">
                <Button
                  variant={postType === 'content' ? 'default' : 'ghost'}
                  onClick={() => setPostType('content')}
                  className="relative"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📝</span>
                    <span>Content</span>
                  </div>
                </Button>
                <Button
                  variant={postType === 'challenge' ? 'default' : 'ghost'}
                  onClick={() => setPostType('challenge')}
                  disabled={!canCreateChallenges}
                  className="relative"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🎯</span>
                    <span>Challenge</span>
                    {!canCreateChallenges && (
                      <Badge variant="outline" className="text-xs">
                        Level 5+
                      </Badge>
                    )}
                  </div>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={postType === 'challenge' ? "Enter challenge title..." : "What's on your mind?"}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={postType === 'challenge' 
                      ? "Describe what participants will learn and accomplish..." 
                      : "Share your thoughts, experiences, or knowledge..."
                    }
                    rows={4}
                    className="mt-2"
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
                    className="space-y-4 border-t pt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty *</Label>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                          <SelectTrigger className="mt-2">
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

                      <div>
                        <Label htmlFor="duration" className="text-sm font-medium">Duration *</Label>
                        <Input
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          placeholder="e.g., 2 hours, 1 week"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-sm font-medium">Price (USD)</Label>
                        <div className="relative mt-2">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0 for free"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coding">💻 Coding</SelectItem>
                            <SelectItem value="design">🎨 Design</SelectItem>
                            <SelectItem value="fitness">💪 Fitness</SelectItem>
                            <SelectItem value="creativity">✨ Creativity</SelectItem>
                            <SelectItem value="learning">📚 Learning</SelectItem>
                            <SelectItem value="business">💼 Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Common fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
                  <div className="relative mt-2">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="education, web3, blockchain (comma separated)"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Online or physical location"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Media Attachments */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Attachments</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" size="sm" className="h-20 flex-col hover:bg-accent/50">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs">Photo</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-20 flex-col hover:bg-accent/50">
                    <Video className="w-6 h-6 mb-1" />
                    <span className="text-xs">Video</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-20 flex-col hover:bg-accent/50">
                    <Mic className="w-6 h-6 mb-1" />
                    <span className="text-xs">Audio</span>
                  </Button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {isPublic ? '🌍' : '🔒'}
                  </div>
                  <div>
                    <Label htmlFor="privacy" className="text-sm font-medium">Public Post</Label>
                    <p className="text-xs text-muted-foreground">
                      {isPublic ? 'Anyone can see this post' : 'Only your followers can see this'}
                    </p>
                  </div>
                </div>
                <Switch
                  id="privacy"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>

              {/* Reward Preview for Challenges */}
              {postType === 'challenge' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
                >
                  <h4 className="font-bold mb-2 flex items-center text-sm">
                    <Trophy className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Reward Structure
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Creator Earnings</div>
                      <div className="font-bold text-purple-600 dark:text-purple-400">
                        {price ? `$${price} + Tokens` : 'Token Rewards Only'}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Completion Reward</div>
                      <div className="font-bold text-green-600 dark:text-green-400">
                        🪙 50-200 Gold Coins
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-border/50">
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!title || !description || (postType === 'challenge' && (!difficulty || !duration || !category))}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {postType === 'challenge' ? 'Create Challenge' : 'Share Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}