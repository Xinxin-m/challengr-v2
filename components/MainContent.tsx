import React from 'react';
import { HomeChallengeCloud } from './HomeChallengeCloud';
import { ChallengeList } from './ChallengeList';
import { EarthMap } from './EarthMap';
import { ProfileView } from './ProfileView';
import { SearchHeader } from './SearchHeader';

interface MainContentProps {
  currentView: 'home' | 'challenges' | 'map' | 'profile';
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  userTokens: {
    goldCoins: number;
    platformTokens: number;
  };
}

export function MainContent({
  currentView,
  selectedChallenge,
  onChallengeSelect,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  userTokens
}: MainContentProps) {
  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      {/* Search Header - only show for challenges and map views */}
      {(currentView === 'challenges' || currentView === 'map') && (
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}

      {/* Content based on current view */}
      {currentView === 'home' && (
        <HomeChallengeCloud
          onChallengeSelect={onChallengeSelect}
        />
      )}

      {currentView === 'challenges' && (
        <ChallengeList
          selectedChallenge={selectedChallenge}
          onChallengeSelect={onChallengeSelect}
          searchQuery={searchQuery}
          filters={filters}
          userTokens={userTokens}
        />
      )}

      {currentView === 'map' && (
        <EarthMap
          selectedChallenge={selectedChallenge}
          onChallengeSelect={onChallengeSelect}
          searchQuery={searchQuery}
          filters={filters}
        />
      )}

      {currentView === 'profile' && (
        <ProfileView />
      )}
    </div>
  );
}