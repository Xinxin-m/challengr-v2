import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Compass, MapPin, Trophy, Users, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { ChallengeCard } from './ChallengeCard';
import { mockChallenges } from '../data/mockData';

interface EarthMapProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
}

// Challenge hub data with real-world coordinates
const challengeHubs = [
  {
    id: 'hub-sf',
    name: 'San Francisco Hub',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    userCount: 2847,
    activeChallenges: 23,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'hub-nyc',
    name: 'New York Hub',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    userCount: 2156,
    activeChallenges: 18,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'hub-la',
    name: 'Los Angeles Hub',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    userCount: 1893,
    activeChallenges: 15,
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'hub-london',
    name: 'London Hub',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    userCount: 1654,
    activeChallenges: 12,
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'hub-tokyo',
    name: 'Tokyo Hub',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    userCount: 1423,
    activeChallenges: 10,
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'hub-berlin',
    name: 'Berlin Hub',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    userCount: 1234,
    activeChallenges: 8,
    color: 'from-yellow-400 to-amber-500'
  },
  {
    id: 'hub-sydney',
    name: 'Sydney Hub',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    userCount: 987,
    activeChallenges: 6,
    color: 'from-indigo-400 to-blue-500'
  }
];

// User's current position (mock data)
const userPosition = {
  coordinates: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  name: 'Your Location'
};

// Convert lat/lng to 3D sphere coordinates
function latLngToSphere(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return { x, y, z };
}

export function EarthMap({ selectedChallenge, onChallengeSelect, searchQuery, filters }: EarthMapProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  const [showUserTooltip, setShowUserTooltip] = useState(false);
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

  const earthRadius = 192; // Half of w-96

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

          {/* Challenge Hubs */}
          {challengeHubs.map((hub, index) => {
            const spherePos = latLngToSphere(hub.coordinates.lat, hub.coordinates.lng, earthRadius);
            const size = Math.min(8 + (hub.userCount / 500), 16); // Size based on user count
            
            return (
              <motion.div
                key={hub.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%) translate3d(${spherePos.x}px, ${spherePos.y}px, ${spherePos.z}px)`
                }}
                onMouseEnter={() => setHoveredHub(hub.id)}
                onMouseLeave={() => setHoveredHub(null)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, delay: index * 0.4 },
                  scale: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                }}
              >
                {/* Hub Shadow */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black/30 rounded-full blur-sm"></div>
                
                {/* Main Hub Dot */}
                <div 
                  className={`rounded-full bg-gradient-to-br ${hub.color} border-2 border-white shadow-xl flex items-center justify-center relative`}
                  style={{ width: `${size}px`, height: `${size}px` }}
                >
                  <Users className="w-3 h-3 text-white" />
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                  
                  {/* User count badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs text-gray-800 border border-gray-300 font-bold">
                    {Math.floor(hub.userCount / 1000)}
                  </div>
                </div>
                
                {/* Hub Tooltip */}
                {hoveredHub === hub.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-30"
                  >
                    <div className="font-bold">{hub.name}</div>
                    <div>{hub.userCount.toLocaleString()} users</div>
                    <div>{hub.activeChallenges} active challenges</div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* User Position Flag */}
          <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
            style={{
              left: `50%`,
              top: `50%`,
              transform: `translate(-50%, -50%) translate3d(${latLngToSphere(userPosition.coordinates.lat, userPosition.coordinates.lng, earthRadius).x}px, ${latLngToSphere(userPosition.coordinates.lat, userPosition.coordinates.lng, earthRadius).y}px, ${latLngToSphere(userPosition.coordinates.lat, userPosition.coordinates.lng, earthRadius).z}px)`
            }}
            onMouseEnter={() => setShowUserTooltip(true)}
            onMouseLeave={() => setShowUserTooltip(false)}
            whileHover={{ scale: 1.2 }}
            animate={{
              y: [0, -8, 0],
              rotateY: [0, 360]
            }}
            transition={{
              y: { duration: 2, repeat: Infinity },
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Flag Shadow */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-black/30 rounded-full blur-sm"></div>
            
            {/* Flag */}
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center relative">
              <Flag className="w-4 h-4 text-white" />
              
              {/* Flag Pole */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-white"></div>
              
              {/* Glowing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-300"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              />
            </div>
            
            {/* User Tooltip */}
            {showUserTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-40 font-bold"
              >
                You're here! 🎯
              </motion.div>
            )}
          </motion.div>

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
          Cosmic Atlas
        </h3>
        <p className="text-sm opacity-90 mb-2">
          🌍 {challengeHubs.length} challenge hubs worldwide
        </p>
        <p className="text-sm opacity-90 mb-2">
          👥 {challengeHubs.reduce((sum, hub) => sum + hub.userCount, 0).toLocaleString()} total users
        </p>
        <p className="text-xs opacity-70">
          Drag to rotate • Scroll to zoom • Hover hubs for details
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