import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sword, Users, Sparkles, Target, Trophy } from 'lucide-react';
import { ChallengeType } from './CreateChallengeModal';

interface ChallengeTypeSelectorProps {
  onTypeSelect: (type: ChallengeType) => void;
}

const challengeTypes = [
  {
    id: 'solo' as ChallengeType,
    title: 'Solo Quest',
    subtitle: 'Challenge yourself to achieve a personal goal.',
    icon: Shield,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'border-emerald-400/40',
    hoverGlow: 'hover:shadow-emerald-500/25',
    description: 'Embark on a personal journey of self-improvement and achievement. Set your own goals and track your progress as you ascend to new heights.'
  },
  {
    id: 'dual' as ChallengeType,
    title: 'Dual Clash',
    subtitle: 'Duel another player and let others bet on the winner.',
    icon: Sword,
    gradient: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-500/20 to-pink-600/20',
    borderColor: 'border-red-400/40',
    hoverGlow: 'hover:shadow-red-500/25',
    description: 'Face off against a worthy opponent in an epic battle of skill and determination. Let the community place their bets on who will emerge victorious.'
  },
  {
    id: 'group' as ChallengeType,
    title: 'Group Ascension',
    subtitle: 'Team up with friends or the public for a shared quest.',
    icon: Users,
    gradient: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-500/20 to-indigo-600/20',
    borderColor: 'border-purple-400/40',
    hoverGlow: 'hover:shadow-purple-500/25',
    description: 'Unite with fellow cultivators to tackle grand challenges together. Strength in numbers as you work towards a common goal and share in the glory.'
  }
];

export const ChallengeTypeSelector: React.FC<ChallengeTypeSelectorProps> = ({
  onTypeSelect
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-3xl font-black text-white mb-4">
            Choose Your Path
          </h3>
          <p className="text-cyan-300/80 text-lg max-w-2xl mx-auto">
            Select the type of challenge that calls to your spirit. Each path offers unique rewards and experiences.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challengeTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ 
              scale: 1.02,
              y: -8,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTypeSelect(type.id)}
            className={`relative cursor-pointer group ${type.hoverGlow}`}
          >
            {/* Background Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${type.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
            
            {/* Card */}
            <div className={`relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border ${type.borderColor} rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-opacity-60`}>
              
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <type.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {type.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {type.subtitle}
                  </p>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {type.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {type.id === 'solo' && (
                    <>
                      <div className="flex items-center space-x-2 text-emerald-300 text-sm">
                        <Target className="w-4 h-4" />
                        <span>Personal goal setting</span>
                      </div>
                      <div className="flex items-center space-x-2 text-emerald-300 text-sm">
                        <Trophy className="w-4 h-4" />
                        <span>Self-paced progression</span>
                      </div>
                    </>
                  )}
                  {type.id === 'dual' && (
                    <>
                      <div className="flex items-center space-x-2 text-red-300 text-sm">
                        <Sword className="w-4 h-4" />
                        <span>Head-to-head competition</span>
                      </div>
                      <div className="flex items-center space-x-2 text-red-300 text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Community betting system</span>
                      </div>
                    </>
                  )}
                  {type.id === 'group' && (
                    <>
                      <div className="flex items-center space-x-2 text-purple-300 text-sm">
                        <Users className="w-4 h-4" />
                        <span>Collaborative challenges</span>
                      </div>
                      <div className="flex items-center space-x-2 text-purple-300 text-sm">
                        <Trophy className="w-4 h-4" />
                        <span>Shared rewards</span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-full bg-gradient-to-r ${type.gradient} text-white font-bold py-3 px-4 rounded-xl text-center shadow-lg`}
                >
                  Choose {type.title}
                </motion.div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${type.bgGradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 p-4 bg-slate-800/30 rounded-xl border border-cyan-400/20"
      >
        <p className="text-cyan-300/80 text-sm">
          <Sparkles className="w-4 h-4 inline mr-2" />
          Each challenge type offers unique rewards and experiences. Choose wisely, young cultivator!
        </p>
      </motion.div>
    </div>
  );
};
