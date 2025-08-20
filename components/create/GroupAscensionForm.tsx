import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Target, Gavel, Calendar, Clock, Coins, Crown, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-purple-300">Group Ascension Configuration</h3>
          <p className="text-purple-200/70 text-sm">Unite with fellow cultivators for a shared quest</p>
        </div>
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
          placeholder="Describe the detailed requirements for completing this group challenge... (e.g., All participants must complete their assigned tasks, Team must achieve a combined score of 1000 points, etc.)"
          value={formData.completionCriteria}
          onChange={(e) => setFormData({ ...formData, completionCriteria: e.target.value })}
          className="bg-slate-800/50 border-purple-400/30 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
          rows={4}
        />
        <p className="text-slate-400 text-sm">
          Clearly define what the group must accomplish together to complete the challenge successfully.
        </p>
      </div>

      {/* Judging Criteria */}
      <div className="space-y-4">
        <label className="block text-purple-300 font-semibold">
          <Gavel className="w-4 h-4 inline mr-2" />
          Judging Criteria
        </label>
        <div className="space-y-3">
          {judgingOptions.map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                formData.judgingCriteria === option.id
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-slate-800/30 border-purple-400/20 hover:bg-purple-500/10'
              }`}
              onClick={() => setFormData({ ...formData, judgingCriteria: option.id })}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.judgingCriteria === option.id
                    ? 'border-purple-400 bg-purple-400'
                    : 'border-purple-400/50'
                }`}>
                  {formData.judgingCriteria === option.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{option.label}</div>
                  <div className="text-slate-400 text-sm">{option.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-slate-400 text-sm">
          Choose how completion of your group challenge will be determined and judged.
        </p>
      </div>

      {/* Duration Settings */}
      <div className="space-y-4">
        <label className="block text-purple-300 font-semibold">
          <Calendar className="w-4 h-4 inline mr-2" />
          Challenge Duration
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Time */}
          <div className="space-y-2">
            <label className="block text-purple-300/80 text-sm">Start Time</label>
            <Input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="bg-slate-800/50 border-purple-400/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="block text-purple-300/80 text-sm">End Time</label>
            <Input
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="bg-slate-800/50 border-purple-400/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
        </div>

        {/* Time Allowed */}
        <div className="p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
          <label className="block text-purple-300/80 text-sm mb-3">Time Allowed Per Participant</label>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-purple-300/60 text-xs">Days</label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[formData.timeAllowed.days]}
                  onValueChange={(value) => updateTimeAllowed('days', value[0])}
                  max={30}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-purple-300 font-bold text-sm w-8">{formData.timeAllowed.days}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-purple-300/60 text-xs">Hours</label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[formData.timeAllowed.hours]}
                  onValueChange={(value) => updateTimeAllowed('hours', value[0])}
                  max={23}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-purple-300 font-bold text-sm w-8">{formData.timeAllowed.hours}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-purple-300/60 text-xs">Minutes</label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[formData.timeAllowed.minutes]}
                  onValueChange={(value) => updateTimeAllowed('minutes', value[0])}
                  max={59}
                  min={0}
                  step={5}
                  className="flex-1"
                />
                <span className="text-purple-300 font-bold text-sm w-8">{formData.timeAllowed.minutes}</span>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-2">
            Set the time limit for each participant to complete their part of the challenge.
          </p>
        </div>
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
              <label className="block text-purple-300/80 text-sm mb-2">Coins Required to Join</label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.entryFee]}
                  onValueChange={(value) => setFormData({ ...formData, entryFee: value[0] })}
                  max={1000}
                  min={0}
                  step={10}
                  className="flex-1"
                />
                <div className="w-20 text-center">
                  <span className="text-purple-300 font-bold">{formData.entryFee}</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Set an entry fee for participants. Higher fees can attract more serious participants and increase the reward pool.
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
          <h4 className="text-purple-300 font-semibold mb-3">Group Quest Preview</h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-white"><span className="text-purple-300">Max Participants:</span> {formData.participantLimit}</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-white"><span className="text-purple-300">Entry Fee:</span> {formData.entryFee} coins</p>
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-white"><span className="text-purple-300">Judging:</span> {judgingOptions.find(o => o.id === formData.judgingCriteria)?.label}</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-white"><span className="text-purple-300">Time Limit:</span> {formData.timeAllowed.days}d {formData.timeAllowed.hours}h {formData.timeAllowed.minutes}m</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30">
              <p className="text-purple-200"><span className="text-purple-300">Completion:</span> {formData.completionCriteria}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Collaboration Info */}
      <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/30">
        <div className="flex items-center space-x-2 mb-2">
          <Crown className="w-5 h-5 text-cyan-400" />
          <h4 className="text-cyan-300 font-semibold">Collaboration Benefits</h4>
        </div>
        <p className="text-cyan-200/80 text-sm">
          Group challenges offer shared rewards, collective wisdom, and the power of teamwork. 
          Success depends on everyone's contribution and cooperation!
        </p>
      </div>
    </motion.div>
  );
};
