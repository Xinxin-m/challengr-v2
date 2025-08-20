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

export type ThemeType = keyof typeof AAA_THEMES;