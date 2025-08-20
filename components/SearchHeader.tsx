import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { FiltersPanel } from './FilterSidebar';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export function SearchHeader({ searchQuery, onSearchChange, filters, onFiltersChange }: SearchHeaderProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="sticky top-16 lg:top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search challenges, users, or hashtags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 bg-input-background border-border"
            />
          </div>

          {/* Filter Button for Mobile */}
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FiltersPanel
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Filter Button for Desktop */}
          <Button variant="outline" size="sm" className="hidden lg:flex">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
}