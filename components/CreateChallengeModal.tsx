import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, MapPin, Calendar, DollarSign, Target, Users, Clock, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Progress } from './ui/progress';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (challengeData: any) => void;
  userLevel: number;
}

export function CreateChallengeModal({ isOpen, onClose, onSubmit, userLevel }: CreateChallengeModalProps) {
  const [step, setStep] = useState<'basic' | 'details' | 'rewards' | 'preview'>('basic');
  const [challengeData, setChallengeData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    estimatedTime: '',
    maxParticipants: '',
    location: '',
    startDate: '',
    endDate: '',
    goldReward: '',
    platformReward: '',
    requirements: '',
    resources: '',
    coverImage: null as File | null
  });

  const categories = [
    { id: 'coding', label: 'Coding & Programming', emoji: '💻', color: 'from-blue-500 to-purple-500' },
    { id: 'design', label: 'Design & Creativity', emoji: '🎨', color: 'from-pink-500 to-orange-500' },
    { id: 'fitness', label: 'Health & Fitness', emoji: '💪', color: 'from-green-500 to-teal-500' },
    { id: 'science', label: 'Science & Research', emoji: '🔬', color: 'from-cyan-500 to-blue-500' },
    { id: 'business', label: 'Business & Finance', emoji: '💼', color: 'from-gray-500 to-gray-700' },
    { id: 'language', label: 'Language Learning', emoji: '🗣️', color: 'from-red-500 to-pink-500' }
  ];

  const difficulties = [
    { id: 'beginner', label: 'Beginner', description: 'Perfect for newcomers', color: 'from-green-400 to-green-500' },
    { id: 'intermediate', label: 'Intermediate', description: 'Some experience needed', color: 'from-yellow-400 to-orange-500' },
    { id: 'advanced', label: 'Advanced', description: 'For experienced learners', color: 'from-red-400 to-red-500' },
    { id: 'expert', label: 'Expert', description: 'Master level challenge', color: 'from-purple-500 to-pink-500' }
  ];

  const handleNext = () => {
    if (step === 'basic') setStep('details');
    else if (step === 'details') setStep('rewards');
    else if (step === 'rewards') setStep('preview');
  };

  const handleBack = () => {
    if (step === 'details') setStep('basic');
    else if (step === 'rewards') setStep('details');
    else if (step === 'preview') setStep('rewards');
  };

  const handleSubmit = () => {
    onSubmit(challengeData);
    onClose();
  };

  const getStepProgress = () => {
    switch (step) {
      case 'basic': return 25;
      case 'details': return 50;
      case 'rewards': return 75;
      case 'preview': return 100;
      default: return 0;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 dark:from-green-400/20 dark:via-blue-400/20 dark:to-purple-400/20 p-6 border-b border-white/10 dark:border-gray-700/30">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-colors"
            >
              <X size={16} className="text-gray-600 dark:text-gray-300" />
            </motion.button>

            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center"
              >
                <span className="text-white text-2xl">✨</span>
              </motion.div>
              <div>
                <h2 className="text-2xl text-gray-900 dark:text-white tracking-tight">Create Challenge</h2>
                <p className="text-gray-600 dark:text-gray-300">Design an educational experience for the community</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Step {
                  step === 'basic' ? '1' : step === 'details' ? '2' : step === 'rewards' ? '3' : '4'
                } of 4</span>
                <span className="text-blue-600 dark:text-blue-400">{getStepProgress()}% complete</span>
              </div>
              <div className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${getStepProgress()}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
            <AnimatePresence mode="wait">
              {step === 'basic' && (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg text-gray-900 dark:text-white mb-4">Basic Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-900 dark:text-white mb-2">Challenge Title</label>
                        <Input
                          value={challengeData.title}
                          onChange={(e) => setChallengeData({ ...challengeData, title: e.target.value })}
                          placeholder="Enter a compelling challenge title"
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12 text-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-900 dark:text-white mb-2">Description</label>
                        <Textarea
                          value={challengeData.description}
                          onChange={(e) => setChallengeData({ ...challengeData, description: e.target.value })}
                          placeholder="Describe what participants will learn and accomplish"
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl min-h-24"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-900 dark:text-white mb-3">Category</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {categories.map((category) => (
                            <motion.div
                              key={category.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant={challengeData.category === category.id ? 'default' : 'outline'}
                                onClick={() => setChallengeData({ ...challengeData, category: category.id })}
                                className={`w-full h-auto p-4 rounded-xl ${
                                  challengeData.category === category.id
                                    ? `bg-gradient-to-r ${category.color} text-white`
                                    : 'border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/30'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="text-2xl mb-1">{category.emoji}</div>
                                  <div className="text-sm">{category.label}</div>
                                </div>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-900 dark:text-white mb-3">Difficulty Level</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {difficulties.map((difficulty) => (
                            <motion.div
                              key={difficulty.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant={challengeData.difficulty === difficulty.id ? 'default' : 'outline'}
                                onClick={() => setChallengeData({ ...challengeData, difficulty: difficulty.id })}
                                className={`w-full h-auto p-3 rounded-xl ${
                                  challengeData.difficulty === difficulty.id
                                    ? `bg-gradient-to-r ${difficulty.color} text-white`
                                    : 'border-2 border-gray-200/50 dark:border-gray-700/50'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="font-medium">{difficulty.label}</div>
                                  <div className="text-xs opacity-75">{difficulty.description}</div>
                                </div>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg text-gray-900 dark:text-white mb-4">Challenge Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-900 dark:text-white mb-2">Estimated Time</label>
                        <Input
                          value={challengeData.estimatedTime}
                          onChange={(e) => setChallengeData({ ...challengeData, estimatedTime: e.target.value })}
                          placeholder="e.g., 2 hours, 1 week"
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-900 dark:text-white mb-2">Max Participants</label>
                        <Input
                          type="number"
                          value={challengeData.maxParticipants}
                          onChange={(e) => setChallengeData({ ...challengeData, maxParticipants: e.target.value })}
                          placeholder="e.g., 100"
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-900 dark:text-white mb-2">Start Date</label>
                        <Input
                          type="datetime-local"
                          value={challengeData.startDate}
                          onChange={(e) => setChallengeData({ ...challengeData, startDate: e.target.value })}
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-900 dark:text-white mb-2">End Date</label>
                        <Input
                          type="datetime-local"
                          value={challengeData.endDate}
                          onChange={(e) => setChallengeData({ ...challengeData, endDate: e.target.value })}
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-900 dark:text-white mb-2">Location (Optional)</label>
                      <Input
                        value={challengeData.location}
                        onChange={(e) => setChallengeData({ ...challengeData, location: e.target.value })}
                        placeholder="Physical location or 'Online'"
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-900 dark:text-white mb-2">Requirements</label>
                      <Textarea
                        value={challengeData.requirements}
                        onChange={(e) => setChallengeData({ ...challengeData, requirements: e.target.value })}
                        placeholder="List any prerequisites or required materials"
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl min-h-20"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-900 dark:text-white mb-2">Resources & Materials</label>
                      <Textarea
                        value={challengeData.resources}
                        onChange={(e) => setChallengeData({ ...challengeData, resources: e.target.value })}
                        placeholder="Provide links, documents, or resources participants need"
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl min-h-20"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'rewards' && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg text-gray-900 dark:text-white mb-4">Rewards & Incentives</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200/50 dark:border-yellow-800/30 rounded-2xl">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="text-3xl"
                            >
                              🪙
                            </motion.div>
                            <div>
                              <h4 className="text-yellow-800 dark:text-yellow-200">Gold Coins (ZXM-C)</h4>
                              <p className="text-sm text-yellow-600 dark:text-yellow-400">24-hour expiry tokens</p>
                            </div>
                          </div>
                          <Input
                            type="number"
                            value={challengeData.goldReward}
                            onChange={(e) => setChallengeData({ ...challengeData, goldReward: e.target.value })}
                            placeholder="e.g., 100"
                            className="bg-white/70 dark:bg-yellow-900/30 border-yellow-300/50 dark:border-yellow-700/50 rounded-xl"
                          />
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200/50 dark:border-purple-800/30 rounded-2xl">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-3xl"
                            >
                              💎
                            </motion.div>
                            <div>
                              <h4 className="text-purple-800 dark:text-purple-200">Platform Tokens (ZXM)</h4>
                              <p className="text-sm text-purple-600 dark:text-purple-400">Permanent rewards</p>
                            </div>
                          </div>
                          <Input
                            type="number"
                            value={challengeData.platformReward}
                            onChange={(e) => setChallengeData({ ...challengeData, platformReward: e.target.value })}
                            placeholder="e.g., 50"
                            className="bg-white/70 dark:bg-purple-900/30 border-purple-300/50 dark:border-purple-700/50 rounded-xl"
                          />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6">
                      <h4 className="text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Reward Guidelines
                      </h4>
                      <ul className="text-blue-700 dark:text-blue-300 space-y-2 text-sm">
                        <li>• Beginner challenges: 50-150 gold coins, 10-30 platform tokens</li>
                        <li>• Intermediate challenges: 150-300 gold coins, 30-60 platform tokens</li>
                        <li>• Advanced challenges: 300-500 gold coins, 60-100 platform tokens</li>
                        <li>• Expert challenges: 500+ gold coins, 100+ platform tokens</li>
                        <li>• Additional rewards for completion speed and quality</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg text-gray-900 dark:text-white mb-4">Challenge Preview</h3>
                    
                    <Card className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl text-gray-900 dark:text-white mb-2">{challengeData.title || 'Challenge Title'}</h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{challengeData.description || 'Challenge description will appear here.'}</p>
                            
                            <div className="flex items-center space-x-4 text-sm">
                              {challengeData.category && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                                  {categories.find(c => c.id === challengeData.category)?.label}
                                </Badge>
                              )}
                              {challengeData.difficulty && (
                                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full">
                                  {challengeData.difficulty}
                                </Badge>
                              )}
                              {challengeData.estimatedTime && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <Clock size={14} className="mr-1" />
                                  {challengeData.estimatedTime}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="space-y-2">
                              {challengeData.goldReward && (
                                <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                                  <span className="text-lg mr-1">🪙</span>
                                  <span>{challengeData.goldReward}</span>
                                </div>
                              )}
                              {challengeData.platformReward && (
                                <div className="flex items-center text-purple-600 dark:text-purple-400">
                                  <span className="text-lg mr-1">💎</span>
                                  <span>{challengeData.platformReward}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {challengeData.maxParticipants && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Users size={16} className="mr-2" />
                              <span>Max {challengeData.maxParticipants}</span>
                            </div>
                          )}
                          {challengeData.startDate && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Calendar size={16} className="mr-2" />
                              <span>{new Date(challengeData.startDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {challengeData.location && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <MapPin size={16} className="mr-2" />
                              <span>{challengeData.location}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6">
                      <div className="flex items-center text-green-800 dark:text-green-200 mb-2">
                        <Check className="w-5 h-5 mr-2" />
                        <span>Ready to Launch</span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        Your challenge looks great! Once published, participants can discover and join your educational experience.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-sm border-t border-white/10 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <div>
                {step !== 'basic' && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>
              
              <div>
                {step !== 'preview' ? (
                  <Button
                    onClick={handleNext}
                    disabled={!challengeData.title || !challengeData.category}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-6"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-6"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Publish Challenge
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}