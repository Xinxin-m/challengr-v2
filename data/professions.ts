import { RPGClass, ClassCategory } from '../types/rpg-system';

// Core profession definitions with proper RPG class structure
export const PROFESSIONS: RPGClass[] = [
  // Academic Classes
  {
    id: 'mathematics',
    name: 'Mathematics',
    displayName: 'Mathematician',
    category: 'academic',
    icon: '🔢',
    description: 'Master the language of the universe through numbers and logic',
    lore: 'Ancient scholars who unlock the mysteries of reality through mathematical precision.',
    baseStats: {
      intelligence: 90,
      creativity: 70,
      technical: 85,
      social: 40,
      physical: 30,
      business: 50
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Mathematical Intuition', 'Pattern Recognition', 'Logical Reasoning'],
    colorTheme: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      gradient: 'from-blue-500 to-purple-600',
      glow: 'rgba(59, 130, 246, 0.3)'
    }
  },
  {
    id: 'physics',
    name: 'Physics',
    displayName: 'Physicist',
    category: 'academic',
    icon: '⚛️',
    description: 'Understand the fundamental laws that govern reality',
    lore: 'Seekers of truth who peer into the very fabric of existence.',
    baseStats: {
      intelligence: 95,
      creativity: 75,
      technical: 90,
      social: 35,
      physical: 40,
      business: 45
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Force Manipulation', 'Energy Analysis', 'Quantum Understanding'],
    colorTheme: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.3)'
    }
  },
  {
    id: 'literature',
    name: 'Literature',
    displayName: 'Scholar of Words',
    category: 'academic',
    icon: '📚',
    description: 'Explore the depths of human expression through written word',
    lore: 'Keepers of stories and wisdom, weaving tales that shape minds.',
    baseStats: {
      intelligence: 85,
      creativity: 95,
      technical: 60,
      social: 80,
      physical: 25,
      business: 55
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Narrative Mastery', 'Cultural Insight', 'Persuasive Writing'],
    colorTheme: {
      primary: '#f59e0b',
      secondary: '#d97706',
      gradient: 'from-amber-500 to-orange-600',
      glow: 'rgba(245, 158, 11, 0.3)'
    }
  },

  // Creative Classes
  {
    id: 'culinary',
    name: 'Culinary Arts',
    displayName: 'Master Chef',
    category: 'creative',
    icon: '👨‍🍳',
    description: 'Transform ingredients into culinary masterpieces',
    lore: 'Alchemists of flavor who transmute simple ingredients into pure joy.',
    baseStats: {
      intelligence: 70,
      creativity: 95,
      technical: 80,
      social: 75,
      physical: 70,
      business: 65
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Flavor Harmony', 'Presentation Mastery', 'Culinary Innovation'],
    colorTheme: {
      primary: '#ef4444',
      secondary: '#dc2626',
      gradient: 'from-red-500 to-pink-600',
      glow: 'rgba(239, 68, 68, 0.3)'
    }
  },
  {
    id: 'photography',
    name: 'Photography',
    displayName: 'Visual Storyteller',
    category: 'creative',
    icon: '📸',
    description: 'Capture moments and emotions through the lens',
    lore: 'Time weavers who freeze moments of beauty for eternity.',
    baseStats: {
      intelligence: 75,
      creativity: 90,
      technical: 85,
      social: 70,
      physical: 60,
      business: 70
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Moment Capture', 'Light Mastery', 'Compositional Genius'],
    colorTheme: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      gradient: 'from-indigo-500 to-purple-600',
      glow: 'rgba(139, 92, 246, 0.3)'
    }
  },
  {
    id: 'music',
    name: 'Music',
    displayName: 'Harmony Master',
    category: 'creative',
    icon: '🎵',
    description: 'Create harmony and rhythm that moves the soul',
    lore: 'Sound shamans who channel the universal rhythm into earthly melodies.',
    baseStats: {
      intelligence: 80,
      creativity: 100,
      technical: 75,
      social: 85,
      physical: 50,
      business: 60
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Perfect Pitch', 'Rhythm Control', 'Emotional Resonance'],
    colorTheme: {
      primary: '#ec4899',
      secondary: '#db2777',
      gradient: 'from-pink-500 to-rose-600',
      glow: 'rgba(236, 72, 153, 0.3)'
    }
  },

  // Technical Classes
  {
    id: 'programming',
    name: 'Programming',
    displayName: 'Code Architect',
    category: 'technical',
    icon: '💻',
    description: 'Build the digital future with code and algorithms',
    lore: 'Digital wizards who speak in the language of machines and bend reality through code.',
    baseStats: {
      intelligence: 95,
      creativity: 80,
      technical: 100,
      social: 50,
      physical: 30,
      business: 70
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Algorithm Mastery', 'System Architecture', 'Digital Creation'],
    colorTheme: {
      primary: '#10b981',
      secondary: '#059669',
      gradient: 'from-green-500 to-emerald-600',
      glow: 'rgba(16, 185, 129, 0.3)'
    }
  },
  {
    id: 'engineering',
    name: 'Engineering',
    displayName: 'System Engineer',
    category: 'technical',
    icon: '⚙️',
    description: 'Design and build solutions that shape the world',
    lore: 'Builders of tomorrow who forge the infrastructure of civilization.',
    baseStats: {
      intelligence: 90,
      creativity: 75,
      technical: 95,
      social: 60,
      physical: 70,
      business: 75
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['System Design', 'Problem Solving', 'Innovation'],
    colorTheme: {
      primary: '#64748b',
      secondary: '#475569',
      gradient: 'from-slate-500 to-gray-600',
      glow: 'rgba(100, 116, 139, 0.3)'
    }
  },

  // Business Classes
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    displayName: 'Business Visionary',
    category: 'business',
    icon: '🚀',
    description: 'Create value and innovation in the marketplace',
    lore: 'Visionaries who see opportunities where others see obstacles.',
    baseStats: {
      intelligence: 85,
      creativity: 90,
      technical: 70,
      social: 95,
      physical: 60,
      business: 100
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Market Vision', 'Risk Assessment', 'Value Creation'],
    colorTheme: {
      primary: '#f97316',
      secondary: '#ea580c',
      gradient: 'from-orange-500 to-red-600',
      glow: 'rgba(249, 115, 22, 0.3)'
    }
  },
  {
    id: 'finance',
    name: 'Finance',
    displayName: 'Wealth Strategist',
    category: 'business',
    icon: '💰',
    description: 'Navigate the world of money, investments, and economics',
    lore: 'Masters of the flow of wealth who understand the pulse of markets.',
    baseStats: {
      intelligence: 90,
      creativity: 60,
      technical: 80,
      social: 75,
      physical: 40,
      business: 95
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Market Analysis', 'Risk Management', 'Financial Strategy'],
    colorTheme: {
      primary: '#059669',
      secondary: '#047857',
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'rgba(5, 150, 105, 0.3)'
    }
  },

  // Health Classes
  {
    id: 'medicine',
    name: 'Medicine',
    displayName: 'Healer',
    category: 'health',
    icon: '⚕️',
    description: 'Heal and care for human health and wellbeing',
    lore: 'Guardians of life who mend both body and spirit.',
    baseStats: {
      intelligence: 95,
      creativity: 70,
      technical: 85,
      social: 90,
      physical: 60,
      business: 65
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Diagnostic Insight', 'Healing Touch', 'Life Preservation'],
    colorTheme: {
      primary: '#0891b2',
      secondary: '#0e7490',
      gradient: 'from-teal-500 to-cyan-600',
      glow: 'rgba(8, 145, 178, 0.3)'
    }
  },
  {
    id: 'fitness',
    name: 'Fitness Training',
    displayName: 'Strength Coach',
    category: 'health',
    icon: '💪',
    description: 'Guide others to physical strength and wellness',
    lore: 'Champions of the body who forge strength and endurance.',
    baseStats: {
      intelligence: 70,
      creativity: 75,
      technical: 70,
      social: 85,
      physical: 100,
      business: 60
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Physical Mastery', 'Motivation', 'Body Optimization'],
    colorTheme: {
      primary: '#65a30d',
      secondary: '#4d7c0f',
      gradient: 'from-lime-500 to-green-600',
      glow: 'rgba(101, 163, 13, 0.3)'
    }
  },

  // Trades Classes
  {
    id: 'carpentry',
    name: 'Carpentry',
    displayName: 'Master Carpenter',
    category: 'trades',
    icon: '🔨',
    description: 'Craft beautiful and functional structures from wood',
    lore: 'Artisans who breathe life into timber and create lasting beauty.',
    baseStats: {
      intelligence: 75,
      creativity: 85,
      technical: 90,
      social: 65,
      physical: 95,
      business: 70
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Precision Crafting', 'Material Mastery', 'Structural Vision'],
    colorTheme: {
      primary: '#ca8a04',
      secondary: '#a16207',
      gradient: 'from-yellow-600 to-amber-700',
      glow: 'rgba(202, 138, 4, 0.3)'
    }
  },
  {
    id: 'electrician',
    name: 'Electrical Work',
    displayName: 'Power Master',
    category: 'trades',
    icon: '⚡',
    description: 'Master the flow of electrical power and systems',
    lore: 'Conductors of lightning who channel the power of storms.',
    baseStats: {
      intelligence: 85,
      creativity: 70,
      technical: 95,
      social: 60,
      physical: 80,
      business: 65
    },
    unlockRequirements: [],
    tierProgression: [],
    masteryRewards: [],
    uniqueAbilities: ['Electrical Mastery', 'Power Flow Control', 'System Integration'],
    colorTheme: {
      primary: '#facc15',
      secondary: '#eab308',
      gradient: 'from-yellow-400 to-orange-500',
      glow: 'rgba(250, 204, 21, 0.3)'
    }
  }
];

// Helper functions
export const getProfessionById = (id: string): RPGClass | undefined => {
  return PROFESSIONS.find(p => p.id === id);
};

export const getProfessionsByCategory = (category: ClassCategory): RPGClass[] => {
  return PROFESSIONS.filter(p => p.category === category);
};

export const getUnlockedProfessions = (unlockedIds: string[]): RPGClass[] => {
  return PROFESSIONS.filter(p => unlockedIds.includes(p.id));
};

// Export for compatibility with existing code
export const CAREER_PATHS = {};
export const getCareerPath = (professionId: string) => {
  return null; // Placeholder for compatibility
};