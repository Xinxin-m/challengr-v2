import React from 'react';
import { FiltersPanel } from './FilterSidebar';

interface ChallengeMapProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
}

export function ChallengeMap({ selectedChallenge, onChallengeSelect, searchQuery, filters }: ChallengeMapProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block col-span-1">
        <FiltersPanel
          filters={filters}
          onFiltersChange={() => {}}
        />
      </div>
      <div className="col-span-4 lg:col-span-3">
        {/* Map Content Placeholder */}
        <div className="h-96 bg-muted rounded-xl"></div>
      </div>
    </div>
  );
}