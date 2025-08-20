import { UserRPGProgress } from '../types/rpg-system';

export const DEFAULT_USER_PROGRESS: UserRPGProgress = {
  userId: 'user123',
  currentClass: 'mathematics',
  currentTier: 'journeyman',
  level: 15,
  totalXP: 12500,
  currentTierXP: 2500,
  stats: {
    intelligence: 85,
    creativity: 60,
    technical: 70,
    social: 45,
    physical: 55,
    business: 40
  },
  unlockedClasses: ['mathematics', 'programming', 'physics'],
  masteredClasses: [],
  equippedGear: {
    helmet: 'wisdom-crown',
    armor: 'scholar-robes',
    weapon: 'code-blade',
  },
  inventory: [],
  achievements: [
    { id: 'first-challenge', name: 'First Steps', rarity: 'common' },
    { id: 'math-master', name: 'Math Master', rarity: 'epic' },
  ],
  quests: [],
  titles: ['Problem Solver', 'Code Warrior'],
  currentTitle: 'Legendary Challenger',
  guilds: [],
  reputation: [],
  ascensionLevel: 0,
  divinePoints: 0,
  cosmetics: [],
  mounts: [],
  pets: [],
  dailyCoins: 2500
};