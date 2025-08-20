import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'icon-only';
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 'md', variant = 'default', animated = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const LogoIcon = () => (
    <motion.div
      className={`${sizeClasses[size]} relative ${className}`}
      animate={animated ? {
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Japanese Wave Design around Letter C */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient from purple below to yellow above like a flame */}
          <linearGradient id="flame-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" /> {/* Purple */}
            <stop offset="50%" stopColor="#ffd700" /> {/* Bright Yellow */}
            <stop offset="100%" stopColor="#ffed4e" /> {/* Bright Yellow Light */}
          </linearGradient>
          
          <linearGradient id="wave-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#40e0d0" /> {/* Turquoise */}
            <stop offset="100%" stopColor="#5ee8d8" /> {/* Turquoise Light */}
          </linearGradient>

          {/* Glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Wave Pattern */}
        <motion.path
          d="M10,50 Q25,20 40,50 T70,50 Q85,20 100,50 L100,80 Q85,60 70,80 T40,80 Q25,60 10,80 Z"
          fill="url(#wave-gradient)"
          filter="url(#glow)"
          animate={animated ? {
            d: [
              "M10,50 Q25,20 40,50 T70,50 Q85,20 100,50 L100,80 Q85,60 70,80 T40,80 Q25,60 10,80 Z",
              "M10,50 Q25,30 40,50 T70,50 Q85,30 100,50 L100,80 Q85,70 70,80 T40,80 Q25,70 10,80 Z",
              "M10,50 Q25,20 40,50 T70,50 Q85,20 100,50 L100,80 Q85,60 70,80 T40,80 Q25,60 10,80 Z"
            ]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Letter C in the center */}
        <motion.path
          d="M70,25 Q45,15 25,35 Q15,50 25,65 Q45,85 70,75"
          stroke="url(#flame-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
          animate={animated ? {
            strokeWidth: [8, 10, 8],
            opacity: [0.9, 1, 0.9]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Inner flame effect */}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="url(#flame-gradient)"
          opacity="0.3"
          animate={animated ? {
            r: [15, 18, 15],
            opacity: [0.3, 0.5, 0.3]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  );

  if (variant === 'icon-only') {
    return <LogoIcon />;
  }

  return (
    <motion.div
      className={`flex items-center space-x-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <LogoIcon />
      
      {variant === 'default' && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.span
            className={`${textSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-black via-theme-yellow to-theme-turquoise dark:from-white dark:via-theme-yellow dark:to-theme-turquoise tracking-tight`}
            animate={animated ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 100%'
            }}
          >
            Challengr
          </motion.span>
          
          {size !== 'sm' && (
            <motion.span
              className="text-xs text-muted-foreground tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Social Platform
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export function LogoLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <Logo size="xl" animated={true} />
        
        <motion.div
          className="mt-8 w-64 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-theme-yellow to-theme-turquoise rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
        
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Loading your challenges...
        </motion.p>
      </motion.div>
    </div>
  );
}