import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  X, ChevronRight, ChevronLeft, Sparkles,
  Target, Home, Trophy, User, Brain, Plus,
  Play, Star, Coins, Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetElement: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  arrow: 'up' | 'down' | 'left' | 'right';
  highlight?: boolean;
}

interface OnboardingGuideProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
  isMobile: boolean;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '🎮 Welcome to Challengr!',
    description: 'Your epic RPG learning adventure begins here! Let\'s explore this amazing platform together.',
    targetElement: '.onboarding-welcome',
    position: 'bottom',
    arrow: 'down'
  },
  {
    id: 'sidebar',
    title: '🧭 Navigation Hub',
    description: 'Use this sidebar to navigate between different areas: Home for community posts, Arena for challenges, Career for your RPG progress!',
    targetElement: '.onboarding-sidebar',
    position: 'right',
    arrow: 'right',
    highlight: true
  },
  {
    id: 'home',
    title: '🏠 Community Home',
    description: 'Your feed shows epic challenges, inspiring content, and achievements from the community. Like, comment, and join the fun!',
    targetElement: '.onboarding-home',
    position: 'left',
    arrow: 'left'
  },
  {
    id: 'arena',
    title: '⚔️ Challenge Arena',
    description: 'Swipe through challenges like Tinder! Swipe right to accept, left to pass. Find your perfect learning challenge!',
    targetElement: '.onboarding-arena',
    position: 'left',
    arrow: 'left'
  },
  {
    id: 'profile',
    title: '👤 Your RPG Character',
    description: 'Customize your epic character, view your stats, and track your legendary progress across all professions!',
    targetElement: '.onboarding-profile',
    position: 'bottom',
    arrow: 'down'
  },
  {
    id: 'ai',
    title: '🤖 AI Challenge Generator',
    description: 'Generate personalized challenges with our smart AI! Perfect for your skill level and learning goals.',
    targetElement: '.onboarding-ai',
    position: 'right',
    arrow: 'right'
  },
  {
    id: 'coins',
    title: '🪙 Your Currency',
    description: 'Earn coins by completing challenges and participating in the community. Use them to join epic battles!',
    targetElement: '.onboarding-coins',
    position: 'bottom',
    arrow: 'down'
  },
  {
    id: 'create',
    title: '✨ Create Content',
    description: 'Share your knowledge by creating challenges and posts. Help others learn while earning rewards!',
    targetElement: '.onboarding-create',
    position: 'top',
    arrow: 'up'
  }
];

export function OnboardingGuide({ isOpen, onComplete, onSkip, isMobile }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSpotlight, setShowSpotlight] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSpotlight(true);
      // Add onboarding classes to target elements
      const step = ONBOARDING_STEPS[currentStep];
      const element = document.querySelector(step.targetElement);
      if (element) {
        element.classList.add('onboarding-highlight');
      }
    }

    return () => {
      // Cleanup highlight classes
      ONBOARDING_STEPS.forEach(step => {
        const element = document.querySelector(step.targetElement);
        if (element) {
          element.classList.remove('onboarding-highlight');
        }
      });
    };
  }, [isOpen, currentStep]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      // Remove highlight from current element
      const currentElement = document.querySelector(ONBOARDING_STEPS[currentStep].targetElement);
      if (currentElement) {
        currentElement.classList.remove('onboarding-highlight');
      }
      
      setCurrentStep(prev => prev + 1);
      
      // Add highlight to next element
      setTimeout(() => {
        const nextElement = document.querySelector(ONBOARDING_STEPS[currentStep + 1].targetElement);
        if (nextElement) {
          nextElement.classList.add('onboarding-highlight');
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // Remove highlight from current element
      const currentElement = document.querySelector(ONBOARDING_STEPS[currentStep].targetElement);
      if (currentElement) {
        currentElement.classList.remove('onboarding-highlight');
      }
      
      setCurrentStep(prev => prev - 1);
      
      // Add highlight to previous element
      setTimeout(() => {
        const prevElement = document.querySelector(ONBOARDING_STEPS[currentStep - 1].targetElement);
        if (prevElement) {
          prevElement.classList.add('onboarding-highlight');
          prevElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleComplete = () => {
    setShowSpotlight(false);
    onComplete();
  };

  const handleSkip = () => {
    setShowSpotlight(false);
    onSkip();
  };

  const getArrowIcon = (arrow: string) => {
    switch (arrow) {
      case 'up': return <ArrowUp className="w-6 h-6" />;
      case 'down': return <ArrowDown className="w-6 h-6" />;
      case 'left': return <ArrowLeft className="w-6 h-6" />;
      case 'right': return <ArrowRight className="w-6 h-6" />;
      default: return <ArrowDown className="w-6 h-6" />;
    }
  };

  const getTooltipPosition = (position: string) => {
    switch (position) {
      case 'top': return 'bottom-full mb-4';
      case 'bottom': return 'top-full mt-4';
      case 'left': return 'right-full mr-4';
      case 'right': return 'left-full ml-4';
      default: return 'top-full mt-4';
    }
  };

  if (!isOpen) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {showSpotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-[101] pointer-events-auto"
            style={{
              top: isMobile ? '50%' : '20%',
              left: isMobile ? '50%' : '50%',
              transform: isMobile ? 'translate(-50%, -50%)' : 'translate(-50%, 0)'
            }}
          >
            <Card className="max-w-sm mx-4 p-6 bg-card border-2 border-theme-turquoise shadow-2xl glow-turquoise">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-gradient-to-r from-theme-turquoise to-theme-yellow rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                  <Badge className="bg-theme-turquoise text-theme-black text-xs">
                    Step {currentStep + 1} of {ONBOARDING_STEPS.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <motion.div
                  className="h-2 bg-gradient-to-r from-theme-turquoise to-theme-yellow rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow Indicator */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ 
                      y: step.arrow === 'up' ? [-5, 5, -5] : 
                         step.arrow === 'down' ? [5, -5, 5] : 0,
                      x: step.arrow === 'left' ? [-5, 5, -5] : 
                         step.arrow === 'right' ? [5, -5, 5] : 0
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-theme-turquoise"
                  >
                    {getArrowIcon(step.arrow)}
                  </motion.div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="border-theme-turquoise text-theme-turquoise hover:bg-theme-turquoise/10"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSkip}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Skip Tour
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      size="sm"
                      className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                    >
                      {currentStep === ONBOARDING_STEPS.length - 1 ? (
                        <>
                          Complete
                          <Star className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for highlighting elements */}
      <style jsx global>{`
        .onboarding-highlight {
          position: relative;
          z-index: 99 !important;
          border-radius: 12px;
          animation: onboarding-pulse 2s ease-in-out infinite;
        }
        
        .onboarding-highlight::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: linear-gradient(45deg, #40e0d0, #ffd700, #40e0d0);
          border-radius: 16px;
          z-index: -1;
          animation: onboarding-rotate 3s linear infinite;
        }
        
        @keyframes onboarding-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(64, 224, 208, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 40px rgba(64, 224, 208, 0.3);
          }
        }
        
        @keyframes onboarding-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}