import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Sparkles, Zap, Brain, MessageSquare, Copy, 
  Check, RefreshCw, Download, Share2, Settings,
  ChevronDown, ChevronUp, Lightbulb, Target, Clock,
  ArrowLeft, Save
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    challengeGenerated?: boolean;
    difficulty?: string;
    category?: string;
    estimatedTime?: string;
  };
}

interface GeneratedChallenge {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  estimatedTime: string;
  requirements: string[];
  steps: string[];
  resources: string[];
  rewards: {
    goldCoins: number;
    platformTokens: number;
  };
  tags: string[];
}

interface AIChallengeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onChallengeGenerated: (challenge: GeneratedChallenge) => void;
  userLevel: number;
  membershipTier: 'free' | 'basic' | 'premium' | 'ultimate';
  generationsLeft: number;
  onGenerationUsed: () => void;
  onBackToTypeSelection?: () => void;
}

// Confirmation Dialog Component
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: 'discard' | 'save') => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md min-h-[200px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  ⚠️
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{message}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => onConfirm('save')}
                className="flex-1 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Exit
              </Button>
              <Button
                onClick={() => onConfirm('discard')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Discard & Exit
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export function AIChallengeGenerator({
  isOpen,
  onClose,
  onChallengeGenerated,
  userLevel,
  membershipTier,
  generationsLeft,
  onGenerationUsed,
  onBackToTypeSelection
}: AIChallengeGeneratorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<'logo' | 'close' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined challenge templates
  const challengeTemplates = [
    {
      id: 'coding',
      title: 'Coding Challenge',
      description: 'Create a programming challenge',
      prompt: 'Generate a coding challenge that teaches a specific programming concept',
      emoji: '💻',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'math',
      title: 'Math Problem',
      description: 'Create a mathematical challenge',
      prompt: 'Design a math challenge that combines theory with practical application',
      emoji: '🔢',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'science',
      title: 'Science Experiment',
      description: 'Design a science challenge',
      prompt: 'Create a hands-on science challenge with real-world applications',
      emoji: '🔬',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'creative',
      title: 'Creative Project',
      description: 'Generate a creative challenge',
      prompt: 'Design a creative challenge that encourages artistic expression',
      emoji: '🎨',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'business',
      title: 'Business Case',
      description: 'Create a business challenge',
      prompt: 'Generate a business strategy challenge with real market scenarios',
      emoji: '💼',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'web3',
      title: 'Web3 Challenge',
      description: 'Design a blockchain challenge',
      prompt: 'Create a Web3 challenge that teaches blockchain concepts',
      emoji: '⛓️',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: `Hello! I'm your AI Challenge Generator. I can help you create engaging educational challenges tailored to your interests and skill level.

**What I can do:**
• Generate custom challenges for any subject
• Adapt difficulty to your level (${userLevel})
• Provide step-by-step guidance
• Include resources and reward suggestions

**To get started:**
• Choose a template below or describe what you want to learn
• Be specific about your goals and preferences
• I'll create a comprehensive challenge just for you!

What kind of challenge would you like to create today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userLevel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating || generationsLeft <= 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(async () => {
      const aiResponse = await generateChallengeResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        metadata: aiResponse.metadata
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (aiResponse.challenge) {
        onChallengeGenerated(aiResponse.challenge);
        onGenerationUsed();
      }
      
      setIsGenerating(false);
    }, 2000 + Math.random() * 2000);
  };

  const generateChallengeResponse = async (prompt: string): Promise<{
    content: string;
    metadata?: any;
    challenge?: GeneratedChallenge;
  }> => {
    // Simulate AI challenge generation
    const challenge: GeneratedChallenge = {
      title: `AI-Generated Challenge: ${prompt.slice(0, 30)}...`,
      description: `This challenge was generated based on your request: "${prompt}". It's designed to be engaging, educational, and appropriate for your skill level.`,
      difficulty: userLevel < 5 ? 'beginner' : userLevel < 15 ? 'intermediate' : userLevel < 25 ? 'advanced' : 'expert',
      category: detectCategory(prompt),
      estimatedTime: `${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 4) + 5} hours`,
      requirements: [
        'Basic understanding of the subject',
        'Access to relevant tools/software',
        'Willingness to learn and experiment'
      ],
      steps: [
        'Review the challenge objectives',
        'Gather necessary resources',
        'Complete the main tasks',
        'Submit your solution',
        'Participate in peer review'
      ],
      resources: [
        'Official documentation and tutorials',
        'Community forums and discussion groups',
        'Video walkthroughs and examples',
        'Interactive practice environments'
      ],
      rewards: {
        goldCoins: Math.floor(Math.random() * 200) + 100,
        platformTokens: Math.floor(Math.random() * 50) + 25
      },
      tags: extractTags(prompt)
    };

    return {
      content: `Perfect! I've generated a custom challenge for you based on your request. Here's what I've created:

**🎯 ${challenge.title}**

**Description:** ${challenge.description}

**📊 Challenge Details:**
• **Difficulty:** ${challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
• **Category:** ${challenge.category}
• **Estimated Time:** ${challenge.estimatedTime}
• **Rewards:** ${challenge.rewards.goldCoins} gold coins + ${challenge.rewards.platformTokens} platform tokens

**📋 Requirements:**
${challenge.requirements.map(req => `• ${req}`).join('\n')}

**📝 Steps to Complete:**
${challenge.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

**📚 Resources:**
${challenge.resources.map(resource => `• ${resource}`).join('\n')}

**🏷️ Tags:** ${challenge.tags.join(', ')}

The challenge has been added to your workspace! You can now customize it further or publish it directly to the platform. Would you like me to generate another variation or create a completely different challenge?`,
      metadata: {
        challengeGenerated: true,
        difficulty: challenge.difficulty,
        category: challenge.category,
        estimatedTime: challenge.estimatedTime
      },
      challenge
    };
  };

  const detectCategory = (prompt: string): string => {
    const keywords = {
      'Programming': ['code', 'program', 'javascript', 'python', 'react', 'web development'],
      'Mathematics': ['math', 'algebra', 'calculus', 'statistics', 'geometry'],
      'Science': ['science', 'physics', 'chemistry', 'biology', 'experiment'],
      'Business': ['business', 'marketing', 'strategy', 'finance', 'entrepreneurship'],
      'Design': ['design', 'ui', 'ux', 'graphics', 'creative', 'art'],
      'Web3': ['blockchain', 'crypto', 'web3', 'defi', 'smart contract', 'ethereum']
    };

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => prompt.toLowerCase().includes(word))) {
        return category;
      }
    }
    return 'General';
  };

  const extractTags = (prompt: string): string[] => {
    const words = prompt.toLowerCase().split(/\s+/);
    const commonTags = ['learning', 'challenge', 'educational', 'interactive'];
    const relevantWords = words.filter(word => 
      word.length > 3 && 
      !['the', 'and', 'for', 'with', 'that', 'this', 'will', 'can', 'how'].includes(word)
    );
    return [...commonTags, ...relevantWords.slice(0, 3)];
  };

  const handleTemplateSelect = (template: typeof challengeTemplates[0]) => {
    setSelectedTemplate(template.id);
    setInput(template.prompt);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackOrClose = (action: 'logo' | 'close') => {
    // Always show confirmation if there's any content or progress
    if (messages.length > 1 || input.trim()) {
      setConfirmationAction(action);
      setShowConfirmation(true);
    } else {
      if (action === 'logo' && onBackToTypeSelection) {
        onBackToTypeSelection();
      } else if (action === 'logo') {
        // If no callback provided, just close the modal
        onClose();
      } else {
        onClose();
      }
    }
  };

  const handleConfirmation = (action: 'discard' | 'save') => {
    if (action === 'save') {
      // Save current state as draft
      const draft = {
        messages,
        input,
        selectedTemplate,
        timestamp: new Date(),
        type: 'ai-challenge-generator',
        title: `AI Chat ${new Date().toLocaleDateString()}`,
        description: input || 'Unsaved AI conversation'
      };
      // Store in localStorage for now (in a real app, this would go to a database)
      const drafts = JSON.parse(localStorage.getItem('challenge-drafts') || '[]');
      drafts.push(draft);
      localStorage.setItem('challenge-drafts', JSON.stringify(drafts));
      
      // Show success feedback
      alert('AI conversation saved as draft!');
    }
    
    setShowConfirmation(false);
    setConfirmationAction(null);
    
    if (confirmationAction === 'logo' && onBackToTypeSelection) {
      onBackToTypeSelection();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl h-[85vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 dark:from-purple-400/20 dark:via-pink-400/20 dark:to-blue-400/20 p-6 border-b border-white/10 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBackOrClose('logo')}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:from-purple-600 hover:to-pink-600 relative overflow-hidden"
                  title="Go back to challenge type selection"
                >
                  {/* Default brain icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ opacity: 0 }}
                    className="transition-opacity duration-200"
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </motion.div>
                  {/* Back arrow overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transition-opacity duration-200"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
                <div>
                  <h2 className="text-2xl text-gray-900 dark:text-white">AI Challenge Generator</h2>
                  <p className="text-gray-600 dark:text-gray-300">Create personalized educational challenges with AI</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3 mr-1" />
                  {generationsLeft} left
                </Badge>
                
                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const draft = {
                      messages,
                      input,
                      selectedTemplate,
                      timestamp: new Date(),
                      type: 'ai-challenge-generator',
                      title: `AI Chat ${new Date().toLocaleDateString()}`,
                      description: input || 'AI conversation draft'
                    };
                    const drafts = JSON.parse(localStorage.getItem('challenge-drafts') || '[]');
                    drafts.push(draft);
                    localStorage.setItem('challenge-drafts', JSON.stringify(drafts));
                    alert('AI conversation saved as draft!');
                  }}
                  className="p-2 rounded-xl text-green-300 hover:text-green-200 transition-all duration-200 border border-green-400/30 bg-green-500/20 hover:bg-green-500/30"
                  title="Save current AI conversation"
                >
                  <Save className="w-4 h-4" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleBackOrClose('close')} 
                  className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-200 border border-red-400/30 flex items-center justify-center"
                  title="Close AI Challenge Generator"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">Level {userLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600 dark:text-gray-300">{membershipTier.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">Real-time Generation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Made scrollable */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Messages - Made scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-br-md' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-bl-md border border-gray-200/50 dark:border-gray-700/50'
                    } p-4 shadow-lg`}>
                      
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-purple-600 dark:text-purple-400">AI Assistant</span>
                        </div>
                      )}
                      
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>
                      
                      {message.metadata?.challengeGenerated && (
                        <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => copyToClipboard(message.content)}
                              className="bg-white/20 hover:bg-white/30 text-gray-700 dark:text-gray-300 rounded-xl"
                            >
                              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copied ? 'Copied!' : 'Copy'}
                            </Button>
                            <Button
                              size="sm"
                              className="bg-white/20 hover:bg-white/30 text-gray-700 dark:text-gray-300 rounded-xl"
                            >
                              <Share2 className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain className="w-4 h-4 text-purple-500" />
                        </motion.div>
                        <span className="text-sm text-purple-600 dark:text-purple-400">AI Assistant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ 
                                duration: 1, 
                                repeat: Infinity, 
                                delay: i * 0.2 
                              }}
                              className="w-2 h-2 bg-purple-500 rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">Generating your challenge...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="space-y-4">
                  {/* Quick Templates */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Quick Templates</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className="text-xs rounded-lg"
                      >
                        {showAdvancedOptions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        Advanced
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {challengeTemplates.map((template) => (
                        <motion.button
                          key={template.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTemplateSelect(template)}
                          className={`p-3 rounded-xl border-2 transition-all text-left ${
                            selectedTemplate === template.id
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <div className="text-2xl mb-1">{template.emoji}</div>
                          <div className="text-sm text-gray-900 dark:text-white mb-1">{template.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{template.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <AnimatePresence>
                    {showAdvancedOptions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-3 gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Difficulty</label>
                          <select className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                            <option>Auto (Level {userLevel})</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Expert</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Time Limit</label>
                          <select className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                            <option>Flexible</option>
                            <option>1-2 hours</option>
                            <option>3-5 hours</option>
                            <option>1-2 days</option>
                            <option>1 week</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Type</label>
                          <select className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                            <option>Mixed Format</option>
                            <option>Hands-on Project</option>
                            <option>Quiz & Tests</option>
                            <option>Research Based</option>
                            <option>Collaborative</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input Field */}
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe the challenge you want to create... (e.g., 'Create a React challenge that teaches hooks and state management')"
                        className="min-h-[60px] resize-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isGenerating || generationsLeft <= 0}
                        className="h-[60px] px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isGenerating ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  {generationsLeft <= 0 && (
                    <div className="text-center p-3 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50">
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">
                        You've used all your daily generations. Upgrade your membership or complete challenges to earn more!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmation}
        title="Unsaved Changes"
        message="You have unsaved changes. Would you like to save your progress before leaving?"
      />
    </AnimatePresence>
  );
}

// Demo component for testing
export const AIChallengeGeneratorDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'ai'>('type');

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">AI Challenge Generator Demo</h1>
          <p className="text-gray-300 text-lg">Testing the new features: confirmation dialogs, scrollable forms, and save functionality</p>
        </div>
        
        {step === 'type' ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Choose Challenge Type</h2>
              <p className="text-gray-400">Select a challenge type to proceed to the AI generator</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('ai')}
                className="p-6 border-2 border-emerald-500/30 rounded-xl hover:bg-emerald-500/10 transition-all duration-200 text-left"
              >
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-xl font-bold text-emerald-300 mb-2">Solo Quest</h3>
                <p className="text-gray-400">Challenge yourself to achieve a personal goal</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('ai')}
                className="p-6 border-2 border-red-500/30 rounded-xl hover:bg-red-500/10 transition-all duration-200 text-left"
              >
                <div className="text-3xl mb-3">⚔️</div>
                <h3 className="text-xl font-bold text-red-300 mb-2">Dual Clash</h3>
                <p className="text-gray-400">Duel another player and let others bet on the winner</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('ai')}
                className="p-6 border-2 border-purple-500/30 rounded-xl hover:bg-purple-500/10 transition-all duration-200 text-left"
              >
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">Group Ascension</h3>
                <p className="text-gray-400">Team up with friends for a shared quest</p>
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('type')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200 mx-auto"
              >
                <span>←</span>
                <span>Back to Type Selection</span>
              </motion.button>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">AI Challenge Generator</h2>
              <p className="text-gray-400 mb-6">Test the new features:</p>
              <ul className="text-gray-300 text-left max-w-md mx-auto space-y-2">
                <li>• Hover over the brain icon to see it become a back arrow</li>
                <li>• Try clicking the back arrow or close button with content</li>
                <li>• Test the confirmation dialog with different options</li>
                <li>• Use the save button to save drafts</li>
                <li>• Check that the content is scrollable</li>
              </ul>
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg"
              >
                Open AI Challenge Generator
              </motion.button>
            </div>
          </div>
        )}
      </div>

      <AIChallengeGenerator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onChallengeGenerated={(challenge) => {
          console.log('Challenge generated:', challenge);
          alert('Challenge generated successfully! Check the console for details.');
          setIsOpen(false);
        }}
        userLevel={10}
        membershipTier="premium"
        generationsLeft={5}
        onGenerationUsed={() => console.log('Generation used')}
        onBackToTypeSelection={() => setStep('type')}
      />
    </div>
  );
};