import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Target, Gavel, Calendar, Clock, Coins, Crown, Sparkles, Save } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

interface GroupAscensionFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const judgingOptions = [
  { id: 'leader', label: 'Leader Decides', description: 'The challenge creator makes the final judgment' },
  { id: 'consensus', label: 'Group Consensus', description: 'All participants vote on completion' },
  { id: 'ai', label: 'AI Judge', description: 'Artificial intelligence evaluates completion' }
];

export const GroupAscensionForm: React.FC<GroupAscensionFormProps> = ({
  formData,
  setFormData
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateTimeAllowed = (field: 'days' | 'hours' | 'minutes', value: number) => {
    setFormData({
      ...formData,
      timeAllowed: {
        ...formData.timeAllowed,
        [field]: value
      }
    });
  };

  const handleSaveDraft = () => {
    const draft = {
      ...formData,
      timestamp: new Date(),
      type: 'group-ascension'
    };
    const drafts = JSON.parse(localStorage.getItem('challenge-drafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('challenge-drafts', JSON.stringify(drafts));
    // Show success feedback
    alert('Draft saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Save Button at Top */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveDraft}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Draft</span>
        </motion.button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-300">Group Ascension Configuration</h3>
            <p className="text-purple-200/70 text-sm">Unite with fellow cultivators for a shared quest</p>
          </div>
        </div>
      </div>

      {/* Quest Lore */}
      <div className="space-y-3">
        <label className="block text-purple-300 font-semibold">
          <Sparkles className="w-4 h-4 inline mr-2" />
          Quest Lore
        </label>
        <Textarea
          placeholder="Inscribe your quest's lore... Share the tale of your challenge, its purpose, and what awaits those who dare to accept it."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-slate-800/50 border-purple-400/30 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
          rows={3}
        />
        <p className="text-slate-400 text-sm">
          Describe your quest's story and purpose. This will be visible to others who discover your challenge.
        </p>
      </div>

      {/* Participant Limit */}
      <div className="space-y-4">
        <label className="block text-purple-300 font-semibold">
          <Users className="w-4 h-4 inline mr-2" />
          Participant Limit
        </label>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
          <div className="space-y-4">
            <div>
              <label className="block text-purple-300/80 text-sm mb-2">Maximum Cultivators (2-50)</label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.participantLimit]}
                  onValueChange={(value) => setFormData({ ...formData, participantLimit: value[0] })}
                  max={50}
                  min={2}
                  step={1}
                  className="flex-1"
                />
                <div className="w-16 text-center">
                  <span className="text-purple-300 font-bold">{formData.participantLimit}</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Set the maximum number of cultivators who can join your group quest. More participants mean greater challenges and rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Completion Criteria */}
      <div className="space-y-3">
        <label className="block text-purple-300 font-semibold">
          <Target className="w-4 h-4 inline mr-2" />
          Completion Criteria
        </label>
        <Textarea
          placeholder="Define what the group must accomplish together... (e.g., 'All members must complete a 30-day fitness challenge', 'Build a collaborative project with 1000+ lines of code', 'Organize a community event with 50+ attendees')"
          value={formData.completionCriteria}
          onChange={(e) => setFormData({ ...formData, completionCriteria: e.target.value })}
          className="bg-slate-800/50 border-purple-400/30 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
          rows={3}
        />
        <p className="text-slate-400 text-sm">
          Define the collective goal that all participants must work towards together.
        </p>
      </div>

      {/* Judging Criteria */}
      <div className="space-y-4">
        <label className="block text-purple-300 font-semibold">
          <Gavel className="w-4 h-4 inline mr-2" />
          Judging Method
        </label>
        <div className="grid grid-cols-1 gap-3">
          {judgingOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, judgingCriteria: option.id })}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.judgingCriteria === option.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-purple-400/30 bg-slate-800/30 hover:border-purple-400/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-purple-300 font-semibold">{option.label}</h4>
                {formData.judgingCriteria === option.id && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <p className="text-slate-400 text-sm">{option.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Settings */}
      <div className="space-y-4">
        <label className="block text-purple-300 font-semibold">
          <Clock className="w-4 h-4 inline mr-2" />
          Time Allowed
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-purple-300/80 text-sm mb-2">Days</label>
            <Input
              type="number"
              min="0"
              max="365"
              value={formData.timeAllowed.days}
              onChange={(e) => updateTimeAllowed('days', parseInt(e.target.value) || 0)}
              className="bg-slate-800/50 border-purple-400/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
          <div>
            <label className="block text-purple-300/80 text-sm mb-2">Hours</label>
            <Input
              type="number"
              min="0"
              max="23"
              value={formData.timeAllowed.hours}
              onChange={(e) => updateTimeAllowed('hours', parseInt(e.target.value) || 0)}
              className="bg-slate-800/50 border-purple-400/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
          <div>
            <label className="block text-purple-300/80 text-sm mb-2">Minutes</label>
            <Input
              type="number"
              min="0"
              max="59"
              value={formData.timeAllowed.minutes}
              onChange={(e) => updateTimeAllowed('minutes', parseInt(e.target.value) || 0)}
              className="bg-slate-800/50 border-purple-400/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Set the time limit for completing the group challenge. All participants must finish within this timeframe.
        </p>
      </div>

      {/* Entry Fee */}
      <div className="space-y-4">
        <label className="block text-purple-300 font-semibold">
          <Coins className="w-4 h-4 inline mr-2" />
          Entry Fee
        </label>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
          <div className="space-y-4">
            <div>
              <label className="block text-purple-300/80 text-sm mb-2">Coins Required (0-1000)</label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.entryFee]}
                  onValueChange={(value) => setFormData({ ...formData, entryFee: value[0] })}
                  max={1000}
                  min={0}
                  step={10}
                  className="flex-1"
                />
                <div className="w-16 text-center">
                  <span className="text-purple-300 font-bold">{formData.entryFee}</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Set an entry fee to join the challenge. Higher fees can attract more serious participants and create larger reward pools.
            </p>
          </div>
        </div>
      </div>

      {/* Group Preview */}
      {formData.completionCriteria && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-400/30"
        >
          <h4 className="text-purple-300 font-semibold mb-2">Group Quest Preview</h4>
          <div className="space-y-2 text-sm">
            <p className="text-white">
              <span className="text-purple-300">Participants:</span> Up to {formData.participantLimit} cultivators
            </p>
            <p className="text-white">
              <span className="text-purple-300">Goal:</span> {formData.completionCriteria}
            </p>
            <p className="text-white">
              <span className="text-purple-300">Time Limit:</span> {formData.timeAllowed.days}d {formData.timeAllowed.hours}h {formData.timeAllowed.minutes}m
            </p>
            <p className="text-white">
              <span className="text-purple-300">Entry Fee:</span> {formData.entryFee} coins
            </p>
            <p className="text-white">
              <span className="text-purple-300">Judging:</span> {judgingOptions.find(opt => opt.id === formData.judgingCriteria)?.label}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
