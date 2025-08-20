// AAA Game Design System - Foundation Tokens
export const DesignTokens = {
  // Color Psychology System - Emotion-Driven Palettes
  colors: {
    // Primary Brand Colors - Mystical & Heroic
    brand: {
      primary: '#00d4ff', // Mystical Cyan - Wisdom & Power
      secondary: '#ffd700', // Legendary Gold - Achievement & Valor
      tertiary: '#8b5cf6', // Royal Purple - Mastery & Magic
      accent: '#00ff88', // Emerald Green - Growth & Success
      danger: '#ff4757', // Crimson Red - Alert & Combat
      warning: '#ffa502', // Amber Orange - Caution & Energy
    },
    
    // Semantic Color System
    semantic: {
      success: '#2ed573',
      error: '#ff4757',
      warning: '#ffa502',
      info: '#3742fa',
      neutral: '#747d8c',
    },
    
    // RPG Rarity System
    rarity: {
      common: '#9ca3af', // Gray
      uncommon: '#22c55e', // Green
      rare: '#3b82f6', // Blue
      epic: '#a855f7', // Purple
      legendary: '#f59e0b', // Orange
      mythic: '#ef4444', // Red
      divine: '#ffd700', // Gold with special effects
    },
    
    // Atmospheric Mood System
    atmosphere: {
      dawn: '#ffeaa7',
      day: '#74b9ff',
      dusk: '#fd79a8',
      night: '#2d3436',
      mystic: '#6c5ce7',
      combat: '#e17055',
      peaceful: '#00b894',
      legendary: '#fdcb6e',
    },
    
    // UI Component Colors
    surface: {
      primary: '#0a0e17', // Deep Space Blue
      secondary: '#1a1f2e', // Charcoal
      tertiary: '#2a3441', // Steel Blue
      glass: 'rgba(255, 255, 255, 0.1)',
      glassDark: 'rgba(0, 0, 0, 0.2)',
    },
    
    // Text Color System
    text: {
      primary: '#ffffff',
      secondary: '#a0aec0',
      muted: '#718096',
      inverse: '#1a202c',
      accent: '#00d4ff',
      legendary: '#ffd700',
    }
  },
  
  // Advanced Typography System
  typography: {
    fontFamilies: {
      primary: '"Exo 2", "SF Pro Display", system-ui, sans-serif', // Futuristic
      secondary: '"Orbitron", "SF Pro Text", system-ui, sans-serif', // Tech/Gaming
      accent: '"Cinzel", "Times New Roman", serif', // Fantasy/Medieval
      mono: '"JetBrains Mono", "SF Mono", monospace', // Code/Stats
    },
    
    // Hierarchical Font Sizes
    fontSizes: {
      // Display Sizes - For Heroes & Titles
      display: {
        xl: '4.5rem', // 72px - Epic Titles
        lg: '3.75rem', // 60px - Major Headers
        md: '3rem', // 48px - Section Headers
        sm: '2.25rem', // 36px - Card Titles
      },
      
      // Body Text Sizes
      body: {
        xl: '1.25rem', // 20px - Large Body
        lg: '1.125rem', // 18px - Default Body
        md: '1rem', // 16px - Standard Text
        sm: '0.875rem', // 14px - Small Text
        xs: '0.75rem', // 12px - Captions
      },
      
      // UI Component Sizes
      ui: {
        button: '0.875rem', // 14px
        input: '1rem', // 16px
        label: '0.875rem', // 14px
        caption: '0.75rem', // 12px
      }
    },
    
    // Font Weights
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    // Line Heights
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    
    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },
  
  // Spacing System - 8px Base Grid
  spacing: {
    0: '0px',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    32: '8rem', // 128px
    40: '10rem', // 160px
    48: '12rem', // 192px
    56: '14rem', // 224px
    64: '16rem', // 256px
  },
  
  // Border Radius System
  radii: {
    none: '0px',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    full: '9999px',
  },
  
  // Elevation System - Z-Index & Shadows
  elevation: {
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      
      // Gaming-specific shadows
      glow: '0 0 20px rgba(0, 212, 255, 0.5)',
      glowGold: '0 0 20px rgba(255, 215, 0, 0.5)',
      glowPurple: '0 0 20px rgba(139, 92, 246, 0.5)',
      combat: '0 0 30px rgba(255, 71, 87, 0.6)',
      legendary: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.4)',
    },
    
    zIndex: {
      hide: -1,
      auto: 'auto',
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      tooltip: 1700,
      notification: 1800,
    }
  },
  
  // Animation System
  animations: {
    // Timing Functions
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      
      // Gaming-specific easing
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      heroic: 'cubic-bezier(0.23, 1, 0.32, 1)',
      combat: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    },
    
    // Duration Scale
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms',
      
      // Cinematic durations
      cinematic: '2000ms',
      epic: '3000ms',
      legendary: '5000ms',
    },
    
    // Delay Scale
    delay: {
      none: '0ms',
      short: '100ms',
      medium: '200ms',
      long: '400ms',
      
      // Staggered animations
      stagger1: '50ms',
      stagger2: '100ms',
      stagger3: '150ms',
      stagger4: '200ms',
    }
  },
  
  // Breakpoints for Responsive Design
  breakpoints: {
    mobile: '320px',
    mobileLg: '425px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px',
    desktopLg: '1920px',
    ultrawide: '2560px',
  },
  
  // Component-specific tokens
  components: {
    button: {
      heights: {
        sm: '2rem', // 32px
        md: '2.5rem', // 40px
        lg: '3rem', // 48px
        xl: '3.5rem', // 56px
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
        xl: '1.25rem 2.5rem',
      }
    },
    
    input: {
      heights: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      }
    },
    
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      }
    }
  }
} as const;

// Theme Variants for Different Game Modes
export const ThemeVariants = {
  default: 'mystical-tech',
  combat: 'combat-mode',
  peaceful: 'zen-mode',
  legendary: 'legendary-mode',
  seasonal: {
    spring: 'nature-awakening',
    summer: 'radiant-power',
    autumn: 'harvest-wisdom',
    winter: 'ice-mastery',
  }
} as const;

// Export utility functions
export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = DesignTokens.colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};

export const getSpacing = (size: keyof typeof DesignTokens.spacing) => {
  return DesignTokens.spacing[size];
};

export const getAnimation = (
  duration: keyof typeof DesignTokens.animations.duration,
  easing: keyof typeof DesignTokens.animations.easing = 'easeInOut'
) => {
  return `${DesignTokens.animations.duration[duration]} ${DesignTokens.animations.easing[easing]}`;
};