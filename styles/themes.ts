export const AAA_THEMES = {
  mystic: {
    name: 'Mystic Tech',
    background: 'from-slate-900 via-purple-900 to-slate-900',
    accent: '#00d4ff',
    secondary: '#ffd700',
    particle: 'magic',
  },
  combat: {
    name: 'Combat Mode',
    background: 'from-red-900 via-orange-900 to-red-900',
    accent: '#ff4757',
    secondary: '#ffa502',
    particle: 'combat',
  },
  legendary: {
    name: 'Legendary',
    background: 'from-yellow-900 via-gold-900 to-yellow-900',
    accent: '#ffd700',
    secondary: '#ff6b6b',
    particle: 'legendary',
  },
  zen: {
    name: 'Zen Mode',
    background: 'from-emerald-900 via-teal-900 to-emerald-900',
    accent: '#00ff88',
    secondary: '#74b9ff',
    particle: 'peaceful',
  },
} as const;

export const PAGE_BACKGROUNDS = {
  default: 'from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900',
  betting: 'from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950',
  arena: 'from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950',
  home: 'from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950',
  map: 'from-green-50 via-blue-50 to-teal-50 dark:from-green-950 dark:via-blue-950 dark:to-teal-950',
  career: 'from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-950 dark:via-indigo-950 dark:to-blue-950',
  leaderboard: 'from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950',
} as const;

export const CARD_BACKGROUNDS = {
  default: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700',
  betting: 'bg-gradient-to-br from-emerald-900/95 via-teal-900/95 to-cyan-900/95 border-emerald-400/30',
  battle: 'bg-gradient-to-br from-red-900/95 via-orange-900/95 to-yellow-900/95 border-red-400/30',
  challenge: 'bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-cyan-400/30',
} as const;

export type ThemeType = keyof typeof AAA_THEMES;