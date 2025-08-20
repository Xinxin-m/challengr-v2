import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, History, Target, Users, Sword, Shield, Crown, 
  Calendar, Clock, Coins, Settings, CheckCircle, 
  ArrowRight, ArrowLeft, Sparkles, Zap, Trophy, Save,
  Share2, Linkedin, Twitter, Instagram, MessageCircle, Copy
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { ChallengeTypeSelector } from './ChallengeTypeSelector';
import { SoloQuestForm } from './SoloQuestForm';
import { DualClashForm } from './DualClashForm';
import { GroupAscensionForm } from './GroupAscensionForm';

export type ChallengeType = 'solo' | 'dual' | 'group';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (challengeData: any) => void;
  userProgress?: any;
}

export const CreateChallengeModal: React.FC<CreateChallengeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userProgress = { dailyCoins: 100 }
}) => {
  const [step, setStep] = useState<'type' | 'form' | 'created'>('type');
  const [selectedType, setSelectedType] = useState<ChallengeType | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    isPublic: true,
    // Solo Quest fields
    goal: '',
    milestones: [''],
    // Dual Clash fields
    opponent: '',
    minWager: 10,
    victoryCondition: '',
    challengeMessage: 'Dare you face me in the arena?',
    // Group Ascension fields
    participantLimit: 10,
    completionCriteria: '',
    judgingCriteria: 'leader',
    startTime: '',
    endTime: '',
    timeAllowed: { days: 0, hours: 0, minutes: 0 },
    entryFee: 0
  });

  const handleTypeSelect = (type: ChallengeType) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('type');
      setSelectedType(null);
    }
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields before creating the challenge.');
      return;
    }

    const challengeData = {
      type: selectedType,
      ...formData
    };
    onSubmit(challengeData);
    setStep('created');
  };

  const isFormValid = () => {
    if (!formData.description.trim()) return false;
    
    switch (selectedType) {
      case 'solo':
        return formData.goal.trim().startsWith('I will');
      case 'dual':
        return formData.opponent.trim() && formData.victoryCondition.trim();
      case 'group':
        return formData.completionCriteria.trim() && formData.participantLimit > 1;
      default:
        return false;
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'type':
        return 'Choose your path to glory';
      case 'form':
        switch (selectedType) {
          case 'solo':
            return 'Forge your personal quest';
          case 'dual':
            return 'Prepare for epic battle';
          case 'group':
            return 'Unite with fellow cultivators';
          default:
            return 'Craft your epic quest';
        }
      case 'created':
        return 'Challenge created successfully';
      default:
        return 'Choose your path to glory';
    }
  };

  const handleShare = (platform: string) => {
    const challengeUrl = `${window.location.origin}/challenge/${Date.now()}`;
    const challengeTitle = `${selectedType?.toUpperCase()} Challenge: ${formData.description.slice(0, 50)}...`;
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(challengeUrl)}&title=${encodeURIComponent(challengeTitle)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(challengeTitle)}&url=${encodeURIComponent(challengeUrl)}`,
      instagram: `https://www.instagram.com/?url=${encodeURIComponent(challengeUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(challengeUrl)}&text=${encodeURIComponent(challengeTitle)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(challengeUrl);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const handleClose = () => {
    if (step === 'created') {
      onClose();
      // Reset form
      setStep('type');
      setSelectedType(null);
      setFormData({
        description: '',
        isPublic: true,
        goal: '',
        milestones: [''],
        opponent: '',
        minWager: 10,
        victoryCondition: '',
        challengeMessage: 'Dare you face me in the arena?',
        participantLimit: 10,
        completionCriteria: '',
        judgingCriteria: 'leader',
        startTime: '',
        endTime: '',
        timeAllowed: { days: 0, hours: 0, minutes: 0 },
        entryFee: 0
      });
    } else {
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-br from-slate-900/98 via-indigo-900/95 to-purple-900/98 rounded-3xl border border-cyan-400/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />
          
          {/* Header - More Compact */}
          <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-cyan-400/20 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Crown className="w-5 h-5 text-white" />
                </motion.div>
                <div className="text-center">
                  <h2 className="text-lg font-black text-cyan-300 tracking-tight">
                    {getStepDescription()}
                  </h2>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Save Button - only show when in form step */}
                {step === 'form' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const draft = {
                        ...formData,
                        timestamp: new Date(),
                        type: selectedType + '-challenge'
                      };
                      const drafts = JSON.parse(localStorage.getItem('challenge-drafts') || '[]');
                      drafts.push(draft);
                      localStorage.setItem('challenge-drafts', JSON.stringify(drafts));
                      // Show success feedback
                      alert('Draft saved successfully!');
                    }}
                    className="p-2 rounded-xl text-green-300 hover:text-green-200 transition-all duration-200 border border-green-400/30 bg-green-500/20 hover:bg-green-500/30"
                    title="Save current progress as draft"
                  >
                    <Save className="w-4 h-4" />
                  </motion.button>
                )}
                
                {/* History Button - only show when in form step */}
                {step === 'form' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHistory(!showHistory)}
                    className={`p-2 rounded-xl text-cyan-300 hover:text-cyan-200 transition-all duration-200 border border-cyan-400/30 ${
                      showHistory ? 'bg-cyan-500/20 border-cyan-400/60' : 'bg-slate-700/50 hover:bg-slate-600/50'
                    }`}
                    title="View saved drafts"
                  >
                    <History className="w-4 h-4" />
                  </motion.button>
                )}
                
                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-200 border border-red-400/30 flex items-center justify-center"
                  title="Close challenge creator"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content - Made scrollable */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 'type' ? (
                <motion.div
                  key="type-selector"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
                >
                  <div className="p-6">
                    <ChallengeTypeSelector onTypeSelect={handleTypeSelect} />
                  </div>
                </motion.div>
              ) : step === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
                >
                  <div className="p-6">
                    {/* History Panel */}
                    {showHistory && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-4 bg-slate-800/30 rounded-xl border border-cyan-400/20"
                      >
                        <h3 className="text-lg font-bold text-cyan-300 mb-4">Saved Drafts</h3>
                        <div className="space-y-3">
                          {(() => {
                            const drafts = JSON.parse(localStorage.getItem('challenge-drafts') || '[]');
                            if (drafts.length === 0) {
                              return (
                                <p className="text-slate-400 text-sm">No saved drafts found.</p>
                              );
                            }
                            return drafts.slice(-10).reverse().map((draft: any, index: number) => (
                              <div
                                key={index}
                                className="p-3 bg-slate-700/30 rounded-lg border border-cyan-400/20 hover:bg-slate-700/50 cursor-pointer transition-colors"
                                onClick={() => {
                                  if (draft.type === 'ai-challenge-generator') {
                                    // Handle AI Challenge Generator drafts differently
                                    alert('AI Challenge Generator drafts can be accessed from the AI generator itself.');
                                    return;
                                  }
                                  
                                  if (draft.type === 'solo-quest' || draft.type === 'solo-challenge') {
                                    setSelectedType('solo');
                                  } else if (draft.type === 'dual-clash' || draft.type === 'dual-challenge') {
                                    setSelectedType('dual');
                                  } else if (draft.type === 'group-ascension' || draft.type === 'group-challenge') {
                                    setSelectedType('group');
                                  }
                                  setFormData({ ...formData, ...draft });
                                  setShowHistory(false);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-2 rounded-full ${
                                      draft.type === 'ai-challenge-generator' ? 'bg-purple-400' :
                                      draft.type === 'solo-quest' || draft.type === 'solo-challenge' ? 'bg-emerald-400' :
                                      draft.type === 'dual-clash' || draft.type === 'dual-challenge' ? 'bg-red-400' :
                                      'bg-purple-400'
                                    }`} />
                                    <div>
                                      <div className="text-cyan-300 font-medium">
                                        {draft.type === 'ai-challenge-generator' ? 'AI Chat' :
                                         draft.type === 'solo-quest' || draft.type === 'solo-challenge' ? 'Solo Quest' : 
                                         draft.type === 'dual-clash' || draft.type === 'dual-challenge' ? 'Dual Clash' : 
                                         'Group Ascension'}
                                      </div>
                                      <div className="text-slate-400 text-sm">
                                        {draft.description ? draft.description.slice(0, 50) + (draft.description.length > 50 ? '...' : '') : 'No description'}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-slate-500 text-xs">
                                    {new Date(draft.timestamp).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </motion.div>
                    )}

                    {/* Type-Specific Form */}
                    <AnimatePresence mode="wait">
                      {selectedType === 'solo' && (
                        <SoloQuestForm
                          key="solo"
                          formData={formData}
                          setFormData={setFormData}
                        />
                      )}
                      {selectedType === 'dual' && (
                        <DualClashForm
                          key="dual"
                          formData={formData}
                          setFormData={setFormData}
                        />
                      )}
                      {selectedType === 'group' && (
                        <GroupAscensionForm
                          key="group"
                          formData={formData}
                          setFormData={setFormData}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="created"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex items-center justify-center p-6"
                >
                  <div className="text-center space-y-8 max-w-md">
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 15 }}
                      className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* Success Message */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">
                        Challenge Created Successfully!
                      </h3>
                      <p className="text-cyan-300 text-lg">
                        Your {selectedType === 'solo' ? 'Solo Quest' : selectedType === 'dual' ? 'Dual Clash' : 'Group Ascension'} is ready to begin.
                      </p>
                      <p className="text-slate-400">
                        Share your challenge with the community and start your journey!
                      </p>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Share Your Challenge</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('twitter')}
                          className="flex items-center justify-center space-x-2 p-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>X (Twitter)</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('instagram')}
                          className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          <span>Instagram</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare('telegram')}
                          className="flex items-center justify-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Telegram</span>
                        </motion.button>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer - Only show for form step */}
          {step === 'form' && (
            <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-t border-cyan-400/20 p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 bg-slate-700/50 hover:bg-slate-600/50 text-cyan-300 hover:text-cyan-200 border border-cyan-400/30"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </motion.button>

                <motion.button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  whileHover={{ scale: isFormValid() ? 1.05 : 1 }}
                  whileTap={{ scale: isFormValid() ? 0.95 : 1 }}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-bold transition-all duration-200 ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Create Challenge</span>
                  <Sparkles className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
