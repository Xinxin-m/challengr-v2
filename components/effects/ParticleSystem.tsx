import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

// Particle System Configuration
interface ParticleConfig {
  count: number;
  lifetime: number;
  size: { min: number; max: number };
  speed: { min: number; max: number };
  color: string[];
  opacity: { start: number; end: number };
  shape: 'circle' | 'star' | 'diamond' | 'spark' | 'magic';
  gravity: number;
  wind: number;
  emission: 'burst' | 'continuous' | 'trail';
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
}

interface ParticleSystemProps {
  config: Partial<ParticleConfig>;
  trigger?: boolean;
  position?: { x: number; y: number };
  className?: string;
  intensity?: 'low' | 'medium' | 'high' | 'epic';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  shape: string;
}

// Predefined particle configurations for different effects
export const ParticlePresets: Record<string, ParticleConfig> = {
  xpGain: {
    count: 15,
    lifetime: 2000,
    size: { min: 3, max: 8 },
    speed: { min: 50, max: 150 },
    color: ['#00d4ff', '#74b9ff', '#0984e3'],
    opacity: { start: 1, end: 0 },
    shape: 'spark',
    gravity: -0.3,
    wind: 0.1,
    emission: 'burst',
    blendMode: 'screen',
  },
  
  coinCollect: {
    count: 20,
    lifetime: 1500,
    size: { min: 4, max: 12 },
    speed: { min: 80, max: 200 },
    color: ['#ffd700', '#ffed4e', '#f39c12'],
    opacity: { start: 1, end: 0 },
    shape: 'circle',
    gravity: 0.2,
    wind: -0.05,
    emission: 'burst',
    blendMode: 'screen',
  },
  
  levelUp: {
    count: 50,
    lifetime: 3000,
    size: { min: 2, max: 15 },
    speed: { min: 100, max: 300 },
    color: ['#ffd700', '#00d4ff', '#8b5cf6', '#00ff88'],
    opacity: { start: 1, end: 0 },
    shape: 'star',
    gravity: -0.1,
    wind: 0,
    emission: 'burst',
    blendMode: 'screen',
  },
  
  achievement: {
    count: 30,
    lifetime: 4000,
    size: { min: 5, max: 20 },
    speed: { min: 50, max: 150 },
    color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
    opacity: { start: 1, end: 0 },
    shape: 'magic',
    gravity: -0.2,
    wind: 0.1,
    emission: 'continuous',
    blendMode: 'screen',
  },
  
  combat: {
    count: 25,
    lifetime: 1200,
    size: { min: 3, max: 10 },
    speed: { min: 120, max: 250 },
    color: ['#ff4757', '#ff6348', '#ff9ff3'],
    opacity: { start: 1, end: 0 },
    shape: 'spark',
    gravity: 0.1,
    wind: 0.2,
    emission: 'trail',
    blendMode: 'screen',
  },
  
  magic: {
    count: 40,
    lifetime: 3500,
    size: { min: 2, max: 12 },
    speed: { min: 30, max: 100 },
    color: ['#8b5cf6', '#a855f7', '#c084fc', '#e879f9'],
    opacity: { start: 0.8, end: 0 },
    shape: 'magic',
    gravity: -0.5,
    wind: 0.3,
    emission: 'continuous',
    blendMode: 'screen',
  },
  
  legendary: {
    count: 100,
    lifetime: 5000,
    size: { min: 1, max: 25 },
    speed: { min: 50, max: 400 },
    color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'],
    opacity: { start: 1, end: 0 },
    shape: 'star',
    gravity: -0.3,
    wind: 0.2,
    emission: 'burst',
    blendMode: 'screen',
  },
};

export function ParticleSystem({
  config,
  trigger = true,
  position = { x: 0, y: 0 },
  className = '',
  intensity = 'medium'
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);

  // Merge default config with provided config
  const defaultConfig: ParticleConfig = {
    count: 20,
    lifetime: 2000,
    size: { min: 2, max: 8 },
    speed: { min: 50, max: 150 },
    color: ['#00d4ff'],
    opacity: { start: 1, end: 0 },
    shape: 'circle',
    gravity: 0,
    wind: 0,
    emission: 'burst',
    blendMode: 'normal',
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Intensity multipliers
  const intensityMultipliers = {
    low: 0.5,
    medium: 1,
    high: 1.5,
    epic: 2.5,
  };

  const multiplier = intensityMultipliers[intensity];
  finalConfig.count = Math.floor(finalConfig.count * multiplier);

  // Utility functions
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  
  const randomColor = () => {
    const colors = finalConfig.color;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Create a new particle
  const createParticle = (x: number, y: number): Particle => {
    const angle = random(0, Math.PI * 2);
    const speed = random(finalConfig.speed.min, finalConfig.speed.max);
    
    return {
      id: Math.random(),
      x,
      y,
      vx: Math.cos(angle) * speed * 0.01,
      vy: Math.sin(angle) * speed * 0.01,
      size: random(finalConfig.size.min, finalConfig.size.max),
      color: randomColor(),
      opacity: finalConfig.opacity.start,
      life: finalConfig.lifetime,
      maxLife: finalConfig.lifetime,
      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(-0.1, 0.1),
      shape: finalConfig.shape,
    };
  };

  // Draw particle shapes
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);

    switch (particle.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'star':
        drawStar(ctx, 0, 0, 5, particle.size, particle.size * 0.5);
        ctx.fill();
        break;

      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(particle.size, 0);
        ctx.lineTo(0, particle.size);
        ctx.lineTo(-particle.size, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case 'spark':
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(particle.size * 0.3, -particle.size * 0.3);
        ctx.lineTo(particle.size, 0);
        ctx.lineTo(particle.size * 0.3, particle.size * 0.3);
        ctx.lineTo(0, particle.size);
        ctx.lineTo(-particle.size * 0.3, particle.size * 0.3);
        ctx.lineTo(-particle.size, 0);
        ctx.lineTo(-particle.size * 0.3, -particle.size * 0.3);
        ctx.closePath();
        ctx.fill();
        break;

      case 'magic':
        // Draw a magical swirl
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * 0.2;
        ctx.beginPath();
        for (let i = 0; i < Math.PI * 4; i += 0.1) {
          const radius = (particle.size * i) / (Math.PI * 4);
          const x = Math.cos(i) * radius;
          const y = Math.sin(i) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        break;
    }

    ctx.restore();
  };

  // Draw star shape
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      const x = cx + Math.cos(rot) * outerRadius;
      const y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      const x2 = cx + Math.cos(rot) * innerRadius;
      const y2 = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x2, y2);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  // Update particle physics
  const updateParticle = (particle: Particle, deltaTime: number) => {
    // Update position
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;

    // Apply forces
    particle.vy += finalConfig.gravity * deltaTime * 0.1;
    particle.vx += finalConfig.wind * deltaTime * 0.1;

    // Update rotation
    particle.rotation += particle.rotationSpeed * deltaTime * 0.1;

    // Update life and opacity
    particle.life -= deltaTime;
    const lifeRatio = particle.life / particle.maxLife;
    particle.opacity = finalConfig.opacity.start * lifeRatio + finalConfig.opacity.end * (1 - lifeRatio);

    return particle.life > 0;
  };

  // Animation loop
  const animate = (currentTime: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set blend mode
    ctx.globalCompositeOperation = finalConfig.blendMode as GlobalCompositeOperation;

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const isAlive = updateParticle(particle, deltaTime);
      if (isAlive) {
        drawParticle(ctx, particle);
      }
      return isAlive;
    });

    // Continue animation if particles exist or emission is continuous
    if (particlesRef.current.length > 0 || (finalConfig.emission === 'continuous' && isActive)) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsActive(false);
    }
  };

  // Emit particles
  const emitParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const centerX = position.x || canvas.width / 2;
    const centerY = position.y || canvas.height / 2;

    for (let i = 0; i < finalConfig.count; i++) {
      const particle = createParticle(centerX, centerY);
      particlesRef.current.push(particle);
    }
  };

  // Start particle system
  const start = () => {
    if (isActive) return;
    
    setIsActive(true);
    emitParticles();
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle trigger changes
  useEffect(() => {
    if (trigger) {
      start();
    }
  }, [trigger]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

// Preset particle effects as React components
export const XPGainEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.xpGain} trigger={trigger} position={position} intensity="medium" />
);

export const CoinCollectEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.coinCollect} trigger={trigger} position={position} intensity="high" />
);

export const LevelUpEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.levelUp} trigger={trigger} position={position} intensity="epic" />
);

export const AchievementEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.achievement} trigger={trigger} position={position} intensity="high" />
);

export const CombatEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.combat} trigger={trigger} position={position} intensity="high" />
);

export const MagicEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.magic} trigger={trigger} position={position} intensity="medium" />
);

export const LegendaryEffect: React.FC<{ trigger: boolean; position?: { x: number; y: number } }> = ({ trigger, position }) => (
  <ParticleSystem config={ParticlePresets.legendary} trigger={trigger} position={position} intensity="epic" />
);