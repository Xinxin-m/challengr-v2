import React, { useState } from 'react';
import { ChallengeCard } from './ChallengeCard';
import { mockChallenges } from '../data/mockData';

interface MapViewProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
}

export function MapView({ selectedChallenge, onChallengeSelect, searchQuery, filters }: MapViewProps) {
  const [mapCenter] = useState({ x: 50, y: 50 });
  
  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filters.difficulty === 'all' || challenge.difficulty === filters.difficulty;
    const matchesCategory = filters.category === 'all' || challenge.category === filters.category;
    const matchesPriceRange = filters.priceRange === 'all' || 
      (filters.priceRange === 'free' && challenge.price === 0) ||
      (filters.priceRange === 'low' && challenge.price > 0 && challenge.price <= 25) ||
      (filters.priceRange === 'medium' && challenge.price > 25 && challenge.price <= 100) ||
      (filters.priceRange === 'high' && challenge.price > 100);
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesPriceRange;
  });

  const selectedChallengeData = selectedChallenge 
    ? filteredChallenges.find(c => c.id === selectedChallenge)
    : null;

  return (
    <div className="relative h-full bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 overflow-hidden">
      {/* Cartoon Map Background */}
      <div className="absolute inset-0">
        {/* Mountains */}
        <div className="absolute bottom-20 left-10 w-32 h-24 bg-gradient-to-t from-green-400 to-green-600 rounded-t-full opacity-70"></div>
        <div className="absolute bottom-16 left-24 w-40 h-32 bg-gradient-to-t from-green-500 to-green-700 rounded-t-full opacity-60"></div>
        <div className="absolute bottom-12 right-20 w-28 h-20 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-full opacity-50"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-20 w-16 h-8 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-8 left-24 w-12 h-6 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-16 right-32 w-20 h-10 bg-white rounded-full opacity-75"></div>
        <div className="absolute top-20 right-28 w-14 h-7 bg-white rounded-full opacity-60"></div>
        
        {/* Roads */}
        <div className="absolute top-1/3 left-0 w-full h-4 bg-gray-300 opacity-40 transform rotate-12"></div>
        <div className="absolute top-2/3 left-0 w-full h-4 bg-gray-300 opacity-40 transform -rotate-6"></div>
      </div>

      {/* Challenge Pins */}
      {filteredChallenges.map((challenge) => (
        <div
          key={challenge.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
            selectedChallenge === challenge.id ? 'scale-125 z-20' : 'z-10'
          }`}
          style={{
            left: `${challenge.mapPosition.x}%`,
            top: `${challenge.mapPosition.y}%`
          }}
          onClick={() => onChallengeSelect(challenge.id)}
        >
          {/* Pin Shadow */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
          
          {/* Main Pin */}
          <div className={`w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl ${
            challenge.difficulty === 'beginner' ? 'bg-gradient-to-br from-green-400 to-green-600' :
            challenge.difficulty === 'intermediate' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
            challenge.difficulty === 'advanced' ? 'bg-gradient-to-br from-red-400 to-red-600' :
            'bg-gradient-to-br from-purple-400 to-purple-600'
          }`}>
            {challenge.emoji}
          </div>
          
          {/* Pin Tail */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white"></div>
        </div>
      ))}

      {/* Selected Challenge Card */}
      {selectedChallengeData && (
        <div className="absolute bottom-6 left-6 right-6 z-30">
          <ChallengeCard
            challenge={selectedChallengeData}
            onClose={() => onChallengeSelect(null)}
            isExpanded={true}
          />
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
          <span className="text-2xl">➕</span>
        </button>
        <button className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
          <span className="text-2xl">➖</span>
        </button>
        <button className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
          <span className="text-xl">🧭</span>
        </button>
      </div>
    </div>
  );
}