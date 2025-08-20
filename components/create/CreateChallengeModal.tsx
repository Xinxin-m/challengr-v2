import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, History, Target, Users, Sword, Shield, Crown, 
  Calendar, Clock, Coins, Settings, CheckCircle, 
  ArrowRight, ArrowLeft, Sparkles, Zap, Trophy
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
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [selectedType, setSelectedType] = useState<ChallengeType | null>(null);
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
    const challengeData = {
      type: selectedType,
      ...formData
    };
    onSubmit(challengeData);
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
          className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-br from-slate-900/98 via-indigo-900/95 to-purple-900/98 rounded-3xl border border-cyan-400/40 backdrop-blur-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-cyan-400/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Crown className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Forge Your Challenge
                  </h2>
                  <p className="text-cyan-300/80 text-sm">
                    {step === 'type' ? 'Choose your path to glory' : 'Craft your epic quest'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* History Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-cyan-300 hover:text-cyan-200 transition-all duration-200 border border-cyan-400/30"
                >
                  <History className="w-5 h-5" />
                </motion.button>
                
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-200 border border-red-400/30 flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full overflow-y-auto">
            <AnimatePresence mode="wait">
              {step === 'type' ? (
                <motion.div
                  key="type-selector"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <ChallengeTypeSelector onTypeSelect={handleTypeSelect} />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {/* Shared Fields */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-cyan-300 font-semibold mb-2">
                        Quest Lore
                      </label>
                      <Textarea
                        placeholder="Inscribe your quest's lore... Share the tale of your challenge, its purpose, and what awaits those who dare to accept it."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-slate-800/50 border-cyan-400/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-cyan-400/20">
                      <div>
                        <label className="text-cyan-300 font-semibold">Public Quest</label>
                        <p className="text-slate-400 text-sm">Allow others to discover and join your challenge</p>
                      </div>
                      <Switch
                        checked={formData.isPublic}
                        onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
                        className="data-[state=checked]:bg-cyan-500"
                      />
                    </div>
                  </div>

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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-t border-cyan-400/20 p-6">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  step === 'form'
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 text-cyan-300 hover:text-cyan-200 border border-cyan-400/30'
                    : 'invisible'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </motion.button>

              <motion.button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                whileHover={{ scale: isFormValid() ? 1.05 : 1 }}
                whileTap={{ scale: isFormValid() ? 0.95 : 1 }}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all duration-200 ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Forge Challenge</span>
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
