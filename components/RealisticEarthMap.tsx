import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Compass } from 'lucide-react';
import { Button } from './ui/button';

interface RealisticEarthMapProps {
  selectedChallenge: string | null;
  onChallengeSelect: (id: string | null) => void;
  searchQuery: string;
  filters: any;
}

export function RealisticEarthMap({ selectedChallenge, onChallengeSelect, searchQuery, filters }: RealisticEarthMapProps) {
  const [zoom, setZoom] = useState(1);

  const resetView = () => {
    setZoom(1);
  };

  return (
    <div 
      className="h-screen relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Star Field Background */}
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

      {/* 2D Map Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Simple 2D Map Elements */}
          <div className="absolute inset-0 opacity-20">
            {/* Grid pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
            
            {/* Abstract land masses */}
            <div className="absolute top-20 left-20 w-64 h-48 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-3xl transform rotate-12"></div>
            <div className="absolute top-40 right-32 w-80 h-64 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-3xl transform -rotate-6"></div>
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-56 bg-gradient-to-br from-purple-400/30 to-purple-600/30 rounded-3xl transform rotate-3"></div>
            
            {/* Floating islands */}
            <div className="absolute top-1/4 right-1/4 w-32 h-24 bg-gradient-to-br from-cyan-400/40 to-cyan-600/40 rounded-2xl transform rotate-45"></div>
            <div className="absolute bottom-1/3 left-1/3 w-24 h-32 bg-gradient-to-br from-pink-400/40 to-pink-600/40 rounded-2xl transform -rotate-12"></div>
          </div>
        </div>
      </div>

      {/* Controls - Top Right Corner */}
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

      {/* Info Panel - Top Left Corner */}
      <div className="absolute top-6 left-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20 dark:border-white/10 z-20">
        <h3 className="font-bold mb-2 flex items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            🗺️
          </motion.div>
          Cosmic Atlas
        </h3>
        <p className="text-sm opacity-90 mb-2">
          Explore the cosmic realm
        </p>
        <p className="text-xs opacity-70">
          Use controls to navigate the map
        </p>
      </div>
    </div>
  );
}