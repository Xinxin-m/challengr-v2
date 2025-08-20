import React from 'react';
import { Map, List } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-full p-1 border-2 border-purple-200">
      <div className="flex">
        <button
          onClick={() => onViewChange('map')}
          className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all ${
            currentView === 'map'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'text-purple-600 hover:bg-purple-100'
          }`}
        >
          <Map size={18} />
          <span>Map</span>
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all ${
            currentView === 'list'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'text-purple-600 hover:bg-purple-100'
          }`}
        >
          <List size={18} />
          <span>List</span>
        </button>
      </div>
    </div>
  );
}