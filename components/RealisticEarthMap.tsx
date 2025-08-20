import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Compass, MapPin, Users, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockChallenges } from '../data/mockData';

interface RealisticEarthMapProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
}

export function RealisticEarthMap({ selectedChallenge, onChallengeSelect, searchQuery, filters }: RealisticEarthMapProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: -10, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [animatingChallenges, setAnimatingChallenges] = useState<Set<string>>(new Set());
  const earthRef = useRef<HTMLDivElement>(null);

  const filteredChallenges = mockChallenges.filter(challenge => {
    // Safe string operations with null checks
    const title = challenge?.title || '';
    const description = challenge?.description || '';
    const searchLower = searchQuery?.toLowerCase() || '';
    
    const matchesSearch = title.toLowerCase().includes(searchLower) ||
                         description.toLowerCase().includes(searchLower);
    const matchesDifficulty = filters?.difficulty === 'all' || challenge?.difficulty === filters?.difficulty;
    const matchesCategory = filters?.category === 'all' || challenge?.category === filters?.category;
    const matchesPriceRange = filters?.priceRange === 'all' || 
      (filters?.priceRange === 'free' && (challenge?.price || 0) === 0) ||
      (filters?.priceRange === 'low' && (challenge?.price || 0) > 0 && (challenge?.price || 0) <= 25) ||
      (filters?.priceRange === 'medium' && (challenge?.price || 0) > 25 && (challenge?.price || 0) <= 100) ||
      (filters?.priceRange === 'high' && (challenge?.price || 0) > 100);
    
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
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.3)),
      y: prev.y + deltaX * 0.5
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleChallengeClick = (challengeId: string) => {
    // PS4 Monopoly building bounce animation
    setAnimatingChallenges(prev => new Set([...prev, challengeId]));
    setTimeout(() => {
      setAnimatingChallenges(prev => {
        const newSet = new Set(prev);
        newSet.delete(challengeId);
        return newSet;
      });
    }, 800);
    
    onChallengeSelect(challengeId);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onChallengeSelect(null);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.3)),
        y: prev.y + deltaX * 0.5
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, dragStart]);

  const resetView = () => {
    setZoom(1);
    setRotation({ x: -10, y: 20 });
  };

  return (
    <div 
      className="h-screen relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      onClick={handleBackgroundClick}
    >
      {/* Realistic Star Field */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${0.5 + Math.random() * 1.5}px`,
              height: `${0.5 + Math.random() * 1.5}px`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Earth Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
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
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Earth Sphere with realistic texture */}
          <div className="w-96 h-96 rounded-full relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.5)] dark:shadow-[0_0_80px_rgba(147,197,253,0.3)]">
            {/* Base Earth texture with land masses */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800">
              {/* North America */}
              <div className="absolute top-16 left-12 w-32 h-24 bg-green-600 dark:bg-green-700 rounded-full opacity-90 transform rotate-12" 
                   style={{ clipPath: 'polygon(20% 0%, 80% 10%, 100% 50%, 85% 100%, 15% 90%, 0% 40%)' }}></div>
              
              {/* South America */}
              <div className="absolute top-40 left-20 w-16 h-32 bg-green-500 dark:bg-green-600 rounded-full opacity-85 transform rotate-6"
                   style={{ clipPath: 'polygon(30% 0%, 100% 20%, 80% 100%, 0% 90%)' }}></div>
              
              {/* Europe */}
              <div className="absolute top-12 left-48 w-20 h-16 bg-green-700 dark:bg-green-800 rounded-full opacity-90 transform -rotate-3"
                   style={{ clipPath: 'polygon(0% 20%, 100% 0%, 90% 80%, 10% 100%)' }}></div>
              
              {/* Africa */}
              <div className="absolute top-24 left-48 w-24 h-40 bg-green-600 dark:bg-green-700 rounded-full opacity-85 transform rotate-3"
                   style={{ clipPath: 'polygon(40% 0%, 100% 30%, 80% 100%, 20% 90%, 0% 40%)' }}></div>
              
              {/* Asia */}
              <div className="absolute top-8 right-16 w-40 h-28 bg-green-500 dark:bg-green-600 rounded-full opacity-90 transform rotate-12"
                   style={{ clipPath: 'polygon(0% 30%, 70% 0%, 100% 40%, 90% 100%, 10% 90%)' }}></div>
              
              {/* Australia */}
              <div className="absolute bottom-20 right-20 w-20 h-16 bg-green-600 dark:bg-green-700 rounded-full opacity-80 transform -rotate-12"
                   style={{ clipPath: 'polygon(20% 40%, 100% 20%, 80% 100%, 0% 80%)' }}></div>

              {/* Mountain ranges */}
              <div className="absolute top-20 left-16 w-24 h-4 bg-green-800 dark:bg-green-900 rounded-full opacity-60 transform rotate-45"></div>
              <div className="absolute top-32 right-32 w-32 h-6 bg-green-800 dark:bg-green-900 rounded-full opacity-70 transform -rotate-30"></div>
              
              {/* Desert regions */}
              <div className="absolute top-28 left-52 w-16 h-12 bg-yellow-600 dark:bg-yellow-700 rounded-full opacity-60 transform rotate-15"></div>
              <div className="absolute bottom-32 left-24 w-20 h-14 bg-yellow-500 dark:bg-yellow-600 rounded-full opacity-50 transform -rotate-20"></div>
            </div>

            {/* Dynamic Cloud Layer */}
            <motion.div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white dark:bg-white/80 rounded-full opacity-40"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    width: `${20 + Math.random() * 30}px`,
                    height: `${10 + Math.random() * 15}px`,
                  }}
                  animate={{
                    x: [0, 30, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </motion.div>

            {/* Atmosphere Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-200/30 to-transparent blur-sm"></div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-300/20 to-transparent blur-md"></div>
          </div>

          {/* Challenge Pins with PS4 Monopoly style buildings */}
          {filteredChallenges.map((challenge, index) => {
            const angle = (index / filteredChallenges.length) * 360;
            const radius = 220;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            const z = Math.sin(angle * Math.PI / 90) * 30; // Add depth variation
            
            const isAnimating = animatingChallenges.has(challenge.id);
            
            return (
              <motion.div
                key={challenge.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChallengeClick(challenge.id);
                }}
                whileHover={{ scale: 1.1 }}
                animate={isAnimating ? {
                  scale: [1, 1.3, 1.1, 1.4, 1],
                  rotateY: [0, 15, -15, 0],
                  y: [0, -20, -5, -25, 0]
                } : {
                  y: [0, -8, 0],
                  rotateY: [0, 360]
                }}
                transition={isAnimating ? {
                  duration: 0.8,
                  ease: "easeOut"
                } : {
                  y: { duration: 3, repeat: Infinity, delay: index * 0.2 },
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              >
                {/* Building Shadow */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-black/30 dark:bg-black/50 rounded-full blur-sm"></div>
                
                {/* Main Building Structure */}
                <div className={`relative w-16 h-20 rounded-t-lg border-2 border-white dark:border-gray-200 shadow-2xl ${
                  challenge.difficulty === 'beginner' ? 'bg-gradient-to-t from-green-500 to-green-300 dark:from-green-600 dark:to-green-400' :
                  challenge.difficulty === 'intermediate' ? 'bg-gradient-to-t from-yellow-500 to-yellow-300 dark:from-yellow-600 dark:to-yellow-400' :
                  challenge.difficulty === 'advanced' ? 'bg-gradient-to-t from-red-500 to-red-300 dark:from-red-600 dark:to-red-400' :
                  'bg-gradient-to-t from-purple-500 to-purple-300 dark:from-purple-600 dark:to-purple-400'
                } transform-gpu`}>
                  
                  {/* Building Details */}
                  <div className="absolute inset-2 grid grid-cols-2 gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white/30 dark:bg-white/20 rounded-sm"></div>
                    ))}
                  </div>
                  
                  {/* Roof */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-4 border-transparent border-b-white/80 dark:border-b-gray-200/80"></div>
                  
                  {/* Main Icon */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-100 border-2 border-gray-200 dark:border-gray-300 flex items-center justify-center text-2xl shadow-lg">
                    {challenge.emoji}
                  </div>
                  
                  {/* Participants Badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 rounded-full border-2 border-white dark:border-gray-200 px-2 py-1 min-w-max shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: ['0 0 10px rgba(6,182,212,0.5)', '0 0 20px rgba(59,130,246,0.7)', '0 0 10px rgba(6,182,212,0.5)']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">
                        {challenge.participants > 1000 ? `${Math.floor(challenge.participants / 100) / 10}k` : challenge.participants}
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Pulsing Ring for Active Challenges */}
                  <motion.div
                    className="absolute inset-0 rounded-t-lg border-2 border-cyan-400 dark:border-cyan-300"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 flex flex-col space-y-2 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setZoom(Math.min(zoom * 1.2, 3))}
          className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
        >
          <ZoomIn size={16} className="text-white dark:text-gray-200" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setZoom(Math.max(zoom / 1.2, 0.5))}
          className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
        >
          <ZoomOut size={16} className="text-white dark:text-gray-200" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={resetView}
          className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
        >
          <RotateCcw size={16} className="text-white dark:text-gray-200" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
        >
          <Compass size={16} className="text-white dark:text-gray-200" />
        </Button>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 left-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20 dark:border-white/10 z-20">
        <h3 className="font-bold mb-2 flex items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            🌍
          </motion.div>
          Challenge Earth
        </h3>
        <p className="text-sm opacity-90 mb-2">
          {filteredChallenges.length} challenges worldwide
        </p>
        <p className="text-xs opacity-70">
          Drag to rotate • Scroll to zoom • Click buildings to explore
        </p>
      </div>

      {/* Selected Challenge Modal */}
      <AnimatePresence>
        {selectedChallengeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-30 p-4"
            onClick={handleBackgroundClick}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-card/95 dark:bg-card/95 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{selectedChallengeData.emoji}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedChallengeData.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${
                            selectedChallengeData.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            selectedChallengeData.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            selectedChallengeData.difficulty === 'advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          }`}>
                            {selectedChallengeData.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            <Users className="w-3 h-3 mr-1" />
                            {selectedChallengeData.participants} participants
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onChallengeSelect(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {selectedChallengeData.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedChallengeData.price === 0 ? 'Free' : `$${selectedChallengeData.price}`}
                      </div>
                      <div className="text-sm text-muted-foreground">Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedChallengeData.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">⭐ {selectedChallengeData.rating}</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">📍</div>
                      <div className="text-sm text-muted-foreground">{selectedChallengeData.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Join Challenge
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}