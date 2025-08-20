import React from 'react';
import { motion } from 'motion/react';
import { Target, Plus, X, Shield, Sparkles, Save } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

interface SoloQuestFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const SoloQuestForm: React.FC<SoloQuestFormProps> = ({
  formData,
  setFormData
}) => {
  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, '']
    });
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_: any, i: number) => i !== index);
    setFormData({
      ...formData,
      milestones: newMilestones
    });
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = value;
    setFormData({
      ...formData,
      milestones: newMilestones
    });
  };

  const isGoalValid = formData.goal.trim().startsWith('I will');

  const handleSaveDraft = () => {
    const draft = {
      ...formData,
      timestamp: new Date(),
      type: 'solo-quest'
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
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Draft</span>
        </motion.button>
      </div>

      {/* Header - Moved to top */}
      <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-400/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-300">Solo Quest Configuration</h3>
            <p className="text-emerald-200/70 text-sm">Forge your personal path to greatness</p>
          </div>
        </div>
      </div>

      {/* Quest Lore */}
      <div className="space-y-3">
        <label className="block text-emerald-300 font-semibold">
          <Sparkles className="w-4 h-4 inline mr-2" />
          Quest Lore
        </label>
        <Textarea
          placeholder="Inscribe your quest's lore... Share the tale of your challenge, its purpose, and what awaits those who dare to accept it."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-slate-800/50 border-emerald-400/30 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
          rows={3}
        />
        <p className="text-slate-400 text-sm">
          Describe your quest's story and purpose. This will be visible to others who discover your challenge.
        </p>
      </div>

      {/* Goal Field */}
      <div className="space-y-3">
        <label className="block text-emerald-300 font-semibold">
          <Target className="w-4 h-4 inline mr-2" />
          Your Sacred Vow
        </label>
        <div className="relative">
          <Textarea
            placeholder="I will... (Begin your quest with these sacred words. What will you accomplish on this journey?)"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className={`bg-slate-800/50 border-2 text-white placeholder:text-slate-400 focus:ring-2 transition-all duration-200 ${
              formData.goal && !isGoalValid
                ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20'
                : 'border-emerald-400/30 focus:border-emerald-400 focus:ring-emerald-400/20'
            }`}
            rows={3}
          />
          {formData.goal && !isGoalValid && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-red-400 text-sm flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Your vow must begin with "I will..."</span>
            </motion.div>
          )}
          {isGoalValid && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-emerald-400 text-sm flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Your vow has been accepted by the ancient spirits</span>
            </motion.div>
          )}
        </div>
        <p className="text-slate-400 text-sm">
          Begin your quest with "I will..." to invoke the ancient magic of commitment and determination.
        </p>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-emerald-300 font-semibold">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Waypoints of Progress
          </label>
          <motion.button
            onClick={addMilestone}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg border border-emerald-400/30 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Waypoint</span>
          </motion.button>
        </div>
        
        <div className="space-y-3">
          {formData.milestones.map((milestone: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <Input
                  placeholder={`Waypoint ${index + 1}: Describe this step of your journey...`}
                  value={milestone}
                  onChange={(e) => updateMilestone(index, e.target.value)}
                  className="bg-slate-800/50 border-emerald-400/30 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                />
              </div>
              {formData.milestones.length > 1 && (
                <motion.button
                  onClick={() => removeMilestone(index)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0 w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
        
        <p className="text-slate-400 text-sm">
          Break your quest into smaller waypoints to track your progress and maintain motivation throughout your journey.
        </p>
      </div>

      {/* Quest Preview */}
      {isGoalValid && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-400/30"
        >
          <h4 className="text-emerald-300 font-semibold mb-2">Quest Preview</h4>
          <div className="space-y-2 text-sm">
            <p className="text-white"><span className="text-emerald-300">Vow:</span> {formData.goal}</p>
            {formData.milestones.filter((m: string) => m.trim()).length > 0 && (
              <div>
                <p className="text-emerald-300">Waypoints:</p>
                <ul className="list-disc list-inside text-white space-y-1 ml-4">
                  {formData.milestones.filter((m: string) => m.trim()).map((milestone: string, index: number) => (
                    <li key={index}>{milestone}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
