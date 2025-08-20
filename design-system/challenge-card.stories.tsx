import type { Meta, StoryObj } from '@storybook/react';
import { CinematicChallengeCard } from '../components/challenges/CinematicChallengeCard';
import { DEFAULT_USER_PROGRESS } from '../data/defaultUserProgress';
import { MOCK_CHALLENGES } from '../data/mockChallenges';
import { Challenge } from '../types/rpg-system';

const meta: Meta<typeof CinematicChallengeCard> = {
  title: 'Components/ChallengeCard',
  component: CinematicChallengeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Production-grade challenge card component with AAA gaming aesthetics, full Auto Layout compliance, and comprehensive interaction states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['compact', 'default', 'hero', 'featured'],
      description: 'Card size variant'
    },
    showParticles: {
      control: { type: 'boolean' },
      description: 'Enable particle effects'
    },
    challenge: {
      control: { type: 'object' },
      description: 'Challenge data object'
    },
    userProgress: {
      control: { type: 'object' },
      description: 'User progress data'
    }
  }
};

export default meta;
type Story = StoryObj<typeof CinematicChallengeCard>;

// Base challenge data for stories
const baseChallenge: Challenge = MOCK_CHALLENGES[0];
const userProgress = DEFAULT_USER_PROGRESS;

// Default story
export const Default: Story = {
  args: {
    challenge: baseChallenge,
    userProgress: userProgress,
    variant: 'default',
    showParticles: true,
    onAccept: (id: string) => console.log('Accept challenge:', id),
    onSave: (id: string) => console.log('Save challenge:', id),
    onShare: (id: string) => console.log('Share challenge:', id),
    onViewDetails: (id: string) => console.log('View details:', id)
  }
};

// Compact variant
export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    showParticles: false
  }
};

// Hero variant
export const Hero: Story = {
  args: {
    ...Default.args,
    variant: 'hero'
  },
  parameters: {
    layout: 'padded'
  }
};

// Featured variant
export const Featured: Story = {
  args: {
    ...Default.args,
    variant: 'featured'
  },
  parameters: {
    layout: 'fullscreen'
  }
};

// Difficulty variants
export const BeginnerDifficulty: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      difficulty: 'beginner',
      title: '🌱 Beginner: Basic Math Quiz',
      entryCost: 50,
      rewards: { xp: 100, coins: 150, tokens: 10, equipment: [] }
    }
  }
};

export const IntermediateDifficulty: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      difficulty: 'intermediate',
      title: '📚 Intermediate: Algebra Challenge',
      entryCost: 150,
      rewards: { xp: 300, coins: 450, tokens: 25, equipment: [] }
    }
  }
};

export const AdvancedDifficulty: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      difficulty: 'advanced',
      title: '🔥 Advanced: Calculus Mastery',
      entryCost: 300,
      rewards: { xp: 600, coins: 900, tokens: 50, equipment: ['advanced-calculator'] }
    }
  }
};

export const ExpertDifficulty: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      difficulty: 'expert',
      title: '⚡ Expert: Mathematical Olympiad',
      entryCost: 500,
      rewards: { xp: 1200, coins: 1800, tokens: 100, equipment: ['expert-badge'] }
    }
  }
};

export const LegendaryDifficulty: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      difficulty: 'legendary',
      title: '🌟 LEGENDARY: Mathematics God Mode',
      entryCost: 1000,
      rewards: { xp: 2500, coins: 5000, tokens: 250, equipment: ['legendary-crown'] }
    }
  }
};

// Challenge type variants
export const SoloChallenge: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      type: 'solo',
      title: '🎯 Solo Quest: Personal Best',
      maxParticipants: 1
    }
  }
};

export const MultiplayerChallenge: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      type: 'multiplayer',
      title: '👥 Multiplayer: Team Challenge',
      maxParticipants: 100
    }
  }
};

export const TournamentChallenge: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      type: 'tournament',
      title: '🏆 Tournament: Global Championship',
      maxParticipants: 1000
    }
  }
};

export const RaidChallenge: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      type: 'raid',
      title: '⚔️ Raid: Epic Boss Battle',
      maxParticipants: 50
    }
  }
};

// State variants
export const InsufficientFunds: Story = {
  args: {
    ...Default.args,
    userProgress: {
      ...userProgress,
      dailyCoins: 10
    },
    challenge: {
      ...baseChallenge,
      entryCost: 500
    }
  }
};

export const FullChallenge: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      status: 'full',
      participants: 2000,
      maxParticipants: 2000
    }
  }
};

export const ClosedChallenge: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      status: 'closed'
    }
  }
};

// Loading state
export const LoadingState: Story = {
  args: {
    ...Default.args,
    challenge: {
      ...baseChallenge,
      title: 'Loading...',
      description: 'Challenge data is being loaded...'
    }
  }
};

// Responsive breakpoint stories
export const MobileView: Story = {
  args: {
    ...Compact.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const TabletView: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

export const DesktopView: Story = {
  args: {
    ...Featured.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  }
};

// Accessibility stories
export const HighContrast: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
};

export const KeyboardNavigation: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation with Tab, Enter, and Space keys'
      }
    }
  }
};

// Animation states
export const WithParticles: Story = {
  args: {
    ...LegendaryDifficulty.args,
    showParticles: true
  }
};

export const WithoutParticles: Story = {
  args: {
    ...LegendaryDifficulty.args,
    showParticles: false
  }
};

// Interaction testing
export const InteractionTest: Story = {
  args: {
    ...Default.args,
    onAccept: (id: string) => {
      alert(`Challenge accepted: ${id}`);
    },
    onSave: (id: string) => {
      alert(`Challenge saved: ${id}`);
    },
    onShare: (id: string) => {
      alert(`Challenge shared: ${id}`);
    },
    onViewDetails: (id: string) => {
      alert(`Viewing details: ${id}`);
    }
  }
};

// Grid layout story
export const GridLayout: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(384px, 1fr))', gap: '24px', padding: '24px' }}>
      <CinematicChallengeCard {...BeginnerDifficulty.args!} />
      <CinematicChallengeCard {...IntermediateDifficulty.args!} />
      <CinematicChallengeCard {...AdvancedDifficulty.args!} />
      <CinematicChallengeCard {...ExpertDifficulty.args!} />
      <CinematicChallengeCard {...LegendaryDifficulty.args!} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen'
  }
};