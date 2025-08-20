import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Star, Zap, Shield, Diamond, Gem, Sparkles } from 'lucide-react';

interface MembershipBadgeProps {
  membershipType?: 'free' | 'premium' | 'legendary' | 'divine';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const MembershipBadge: React.FC<MembershipBadgeProps> = ({
  membershipType = 'free',
  size = 'md',
  showLabel = true,
  interactive = true,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const membershipConfig = {
    free: {
      icon: Star,
      label: 'Free',
      color: 'from-gray-500 to-gray-600',
      glow: 'shadow-gray-500/20',
      border: 'border-gray-400/30',
      textColor: 'text-gray-400',
      description: 'Basic access to challenges'
    },
    premium: {
      icon: Crown,
      label: 'Premium',
      color: 'from-yellow-500 to-orange-600',
      glow: 'shadow-yellow-500/50',
      border: 'border-yellow-400/50',
      textColor: 'text-yellow-400',
      description: 'Unlimited challenges & AI help'
    },
    legendary: {
      icon: Diamond,
      label: 'Legendary',
      color: 'from-purple-500 to-pink-600',
      glow: 'shadow-purple-500/60',
      border: 'border-purple-400/50',
      textColor: 'text-purple-400',
      description: 'Exclusive tournaments & rewards'
    },
    divine: {
      icon: Gem,
      label: 'Divine',
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      glow: 'shadow-cyan-500/70',
      border: 'border-cyan-400/50',
      textColor: 'text-cyan-400',
      description: 'Ultimate gaming experience'
    }
  };

  // Ensure we have a valid membershipType and fallback to 'free' if invalid
  const validMembershipType = membershipConfig[membershipType] ? membershipType : 'free';
  const config = membershipConfig[validMembershipType];
  const Icon = config.icon;

  const sizeConfig = {
    xs: {
      container: 'h-6 px-2',
      icon: 'w-2.5 h-2.5',
      text: 'text-xs',
      gap: 'space-x-1'
    },
    sm: {
      container: 'h-7 px-2.5',
      icon: 'w-3 h-3',
      text: 'text-xs',
      gap: 'space-x-1.5'
    },
    md: {
      container: 'h-8 px-3',
      icon: 'w-4 h-4',
      text: 'text-sm',
      gap: 'space-x-2'
    },
    lg: {
      container: 'h-10 px-4',
      icon: 'w-5 h-5',
      text: 'text-base',
      gap: 'space-x-2'
    }
  };

  const sizes = sizeConfig[size];

  const handleClick = () => {
    if (interactive && onClick) {
      console.log('🎖️ Membership badge clicked:', membershipType);
      onClick();
    }
  };

  const badgeContent = (
    <>
      {/* Background Glow */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-2xl blur-lg ${config.glow}`}
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main Badge */}
      <div className={`
        relative bg-gradient-to-r ${config.color} rounded-2xl 
        border-2 ${config.border} backdrop-blur-sm overflow-hidden 
        ${sizes.container} shadow-2xl
      `}>
        {/* Shine Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className={`relative z-10 flex items-center ${sizes.gap} h-full`}>
          <motion.div
            animate={isHovered ? {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`${sizes.icon} text-white drop-shadow-lg`} />
          </motion.div>
          
          {showLabel && (
            <span className={`font-black text-white ${sizes.text} tracking-wide drop-shadow-md`}>
              {config.label}
            </span>
          )}
        </div>
        
        {/* Special Effects for Higher Tiers */}
        {(membershipType === 'legendary' || membershipType === 'divine') && (
          <>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-2xl blur-sm"
              animate={{ 
                rotate: [0, 360] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            {/* Floating sparkles for divine tier */}
            {membershipType === 'divine' && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/80 rounded-full"
                    animate={{
                      x: [0, Math.cos(i * 90) * 20, 0],
                      y: [0, Math.sin(i * 90) * 20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {interactive && isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50"
          >
            <div className="bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-2xl border border-white/20 rounded-xl px-3 py-2 text-center shadow-2xl">
              <div className={`font-bold ${sizes.text} text-white mb-1`}>{config.label} Member</div>
              <div className="text-white/70 text-xs whitespace-nowrap">{config.description}</div>
              {interactive && (
                <div className="text-cyan-400 text-xs mt-1 font-medium">Click to upgrade</div>
              )}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900/95 border-r border-b border-white/20 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (!interactive) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {badgeContent}
      </div>
    );
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05,
        rotate: membershipType === 'divine' ? [0, -2, 2, 0] : 0
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {badgeContent}
      
      {/* Click ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: [1, 1.5], 
          opacity: [0.3, 0] 
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle, ${config.textColor.replace('text-', '')} 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
};