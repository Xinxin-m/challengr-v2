import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Compass, MapPin, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { ChallengeCard } from './ChallengeCard';
import { mockChallenges } from '../data/mockData';

interface EarthMapProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
}

export function EarthMap({ selectedChallenge, onChallengeSelect, searchQuery, filters }: EarthMapProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const earthRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const resetView = () => {
    setZoom(1);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Earth Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          ref={earthRef}
          className="relative cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          animate={{
            rotateY: rotation.y + 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Earth Sphere */}
          <div className="w-96 h-96 rounded-full relative overflow-hidden shadow-2xl">
            {/* Earth Texture - Using gradient to simulate continents */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-green-400 to-blue-500">
              {/* Continents - simplified shapes */}
              <div className="absolute top-20 left-16 w-24 h-16 bg-green-600 rounded-full opacity-80 transform rotate-12"></div>
              <div className="absolute top-32 left-32 w-20 h-12 bg-green-700 rounded-full opacity-70 transform -rotate-6"></div>
              <div className="absolute top-16 right-20 w-28 h-20 bg-green-500 rounded-full opacity-75 transform rotate-45"></div>
              <div className="absolute bottom-24 left-20 w-32 h-18 bg-green-600 rounded-full opacity-85 transform -rotate-12"></div>
              <div className="absolute bottom-16 right-16 w-16 h-24 bg-green-700 rounded-full opacity-70 transform rotate-30"></div>
              
              {/* Clouds */}
              <motion.div 
                className="absolute top-12 left-24 w-16 h-8 bg-white rounded-full opacity-40"
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-40 right-32 w-20 h-10 bg-white rounded-full opacity-35"
                animate={{ x: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-32 left-40 w-18 h-9 bg-white rounded-full opacity-30"
                animate={{ x: [0, 25, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>

            {/* Atmosphere Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-200 to-transparent opacity-30 blur-sm"></div>
          </div>

          {/* Challenge Pins on Earth */}
          {filteredChallenges.map((challenge, index) => {
            const angle = (index / filteredChallenges.length) * 360;
            const radius = 200;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
              <motion.div
                key={challenge.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 50px)`
                }}
                onClick={() => onChallengeSelect(challenge.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 360]
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, delay: index * 0.2 },
                  rotateY: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              >
                {/* Pin Shadow */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-black/20 rounded-full blur-sm"></div>
                
                {/* Main Pin */}
                <div className={`w-12 h-12 rounded-full border-3 border-white shadow-xl flex items-center justify-center relative ${
                  challenge.difficulty === 'beginner' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  challenge.difficulty === 'intermediate' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  challenge.difficulty === 'advanced' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                  'bg-gradient-to-br from-purple-400 to-purple-600'
                }`}>
                  <span className="text-lg">{challenge.emoji}</span>
                  
                  {/* Living Animation Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                  
                  {/* Participant count badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-white">
                    {Math.floor(challenge.participants / 10)}
                  </div>
                </div>
                
                {/* Pin Tail */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setZoom(Math.min(zoom * 1.2, 3))}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
        >
          <ZoomIn size={16} className="text-white" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setZoom(Math.max(zoom / 1.2, 0.5))}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
        >
          <ZoomOut size={16} className="text-white" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={resetView}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
        >
          <RotateCcw size={16} className="text-white" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
        >
          <Compass size={16} className="text-white" />
        </Button>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20">
        <h3 className="font-bold mb-2 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          Challenge Earth
        </h3>
        <p className="text-sm opacity-90 mb-2">
          🌍 {filteredChallenges.length} challenges worldwide
        </p>
        <p className="text-xs opacity-70">
          Drag to rotate • Scroll to zoom
        </p>
      </div>

      {/* Selected Challenge Card */}
      {selectedChallengeData && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="absolute bottom-6 left-6 right-6 max-w-2xl mx-auto"
        >
          <ChallengeCard
            challenge={selectedChallengeData}
            onClose={() => onChallengeSelect(null)}
            isExpanded={true}
          />
        </motion.div>
      )}
    </div>
  );
}