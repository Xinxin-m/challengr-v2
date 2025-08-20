import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Wand2, Brain, Target, Users, Clock, Star, Trophy,
  Zap, Settings, RefreshCw, Play, Pause, CheckCircle, XCircle,
  MessageCircle, ThumbsUp, ThumbsDown, Share2, Bookmark,
  ChevronDown, ChevronUp, Info, Award, Coins, Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ChallengeGenerationParams,
  GeneratedChallenge,
  UserRPGProgress,
  ProfessionTier,
  AIJudgingConfig
} from '../config/rpg-system';

interface ChallengrAIProps {
  userProgress: UserRPGProgress;
  onChallengeGenerated: (challenge: GeneratedChallenge) => void;
  onChallengeStart: (challengeId: string) => void;
  generationsRemaining: number;
  onGenerationUsed: () => void;
  isOpen: boolean;
  onClose: () => void;
}

// Mock Challengr AI Implementation
class ChallengrAIEngine {
  static async generateChallenge(params: ChallengeGenerationParams): Promise<GeneratedChallenge> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const challengeTemplates = {
      mathematics: {
        apprentice: [
          {
            title: "Mathematical Foundation Builder",
            description: "Master basic arithmetic operations through real-world applications. Calculate costs, measurements, and solve everyday problems.",
            objectives: [
              "Solve 50 multi-step arithmetic problems",
              "Apply calculations to real scenarios (shopping, cooking, budgeting)",
              "Demonstrate understanding of order of operations",
              "Upload a photo of handwritten solutions"
            ]
          },
          {
            title: "Geometry in Nature Hunt",
            description: "Discover geometric shapes and patterns in the natural world around you.",
            objectives: [
              "Find and photograph 10 different geometric shapes in nature",
              "Measure angles and calculate areas using basic tools",
              "Create a digital presentation of your findings",
              "Explain the mathematical principles behind each discovery"
            ]
          }
        ],
        journeyman: [
          {
            title: "Calculus Speed Challenge",
            description: "Test your calculus mastery through timed problem-solving sessions.",
            objectives: [
              "Solve 20 derivative problems in 15 minutes",
              "Complete 15 integration challenges with 90% accuracy",
              "Solve 2 real-world optimization problems",
              "Submit step-by-step solutions with explanations"
            ]
          }
        ],
        expert: [
          {
            title: "Mathematical Research Project",
            description: "Conduct original mathematical research and present your findings.",
            objectives: [
              "Identify a mathematical problem or conjecture",
              "Develop novel approaches or proofs",
              "Create a formal research paper (minimum 10 pages)",
              "Present findings to the community for peer review"
            ]
          }
        ],
        grandmaster: [
          {
            title: "The Number Theory Saga",
            description: "Embark on the ultimate mathematical quest to prove or disprove a significant conjecture.",
            objectives: [
              "Choose a famous unsolved problem in number theory",
              "Develop innovative proof techniques",
              "Collaborate with other grandmaster mathematicians",
              "Submit findings to mathematical journals",
              "Defend your work in front of the Mathematical Council"
            ]
          }
        ]
      },
      programming: {
        apprentice: [
          {
            title: "First Steps in Code",
            description: "Create your first functional programs and understand programming fundamentals.",
            objectives: [
              "Build a simple calculator with basic operations",
              "Create a personal portfolio website",
              "Write clean, commented code following best practices",
              "Deploy your project to a live server"
            ]
          }
        ],
        journeyman: [
          {
            title: "Full-Stack Web Application",
            description: "Build a complete web application with frontend and backend components.",
            objectives: [
              "Design and implement a user-friendly interface",
              "Create a robust backend API with database integration",
              "Implement user authentication and authorization",
              "Deploy with proper security measures and documentation"
            ]
          }
        ],
        expert: [
          {
            title: "Open Source Contribution Quest",
            description: "Make meaningful contributions to major open-source projects.",
            objectives: [
              "Identify bugs or feature requests in popular repositories",
              "Submit high-quality pull requests that get accepted",
              "Help other developers through code reviews and mentoring",
              "Become a maintainer or core contributor to a project"
            ]
          }
        ],
        grandmaster: [
          {
            title: "The Architecture Ascension",
            description: "Design and build revolutionary software architecture that influences the industry.",
            objectives: [
              "Create a new programming paradigm or framework",
              "Write technical specifications and documentation",
              "Gain adoption by the developer community (1000+ stars on GitHub)",
              "Present at major technology conferences",
              "Train the next generation of developers"
            ]
          }
        ]
      },
      culinary: {
        apprentice: [
          {
            title: "Kitchen Fundamentals Mastery",
            description: "Master basic cooking techniques and knife skills through hands-on practice.",
            objectives: [
              "Demonstrate proper knife techniques (julienne, dice, chiffonade)",
              "Cook 5 dishes using different basic techniques (sauté, braise, roast, steam, grill)",
              "Upload videos of your cooking process",
              "Receive positive feedback from AI taste and presentation analysis"
            ]
          }
        ],
        journeyman: [
          {
            title: "Regional Cuisine Explorer",
            description: "Master the cooking techniques and flavors of different world cuisines.",
            objectives: [
              "Successfully prepare 3 dishes from 5 different regional cuisines",
              "Source authentic ingredients and demonstrate proper techniques",
              "Create a cultural presentation about each cuisine's history",
              "Receive ratings of 8/10 or higher from AI food analysis"
            ]
          }
        ],
        expert: [
          {
            title: "Molecular Gastronomy Innovation",
            description: "Push the boundaries of culinary arts through scientific cooking techniques.",
            objectives: [
              "Master spherification, gelification, and liquid nitrogen techniques",
              "Create 5 original dishes using molecular gastronomy",
              "Document the science behind each technique",
              "Present your creations to culinary experts for evaluation"
            ]
          }
        ],
        grandmaster: [
          {
            title: "The Culinary Legacy",
            description: "Establish yourself as a culinary innovator and mentor the next generation.",
            objectives: [
              "Open a restaurant or establish a culinary brand",
              "Create signature dishes that influence culinary trends",
              "Train and mentor aspiring chefs",
              "Publish a cookbook or culinary guide",
              "Achieve recognition from prestigious culinary institutions"
            ]
          }
        ]
      }
    };

    const classTemplates = challengeTemplates[params.classId as keyof typeof challengeTemplates];
    const tierTemplates = classTemplates?.[params.tier];
    
    if (!tierTemplates) {
      throw new Error(`No templates found for ${params.classId} ${params.tier}`);
    }

    const template = tierTemplates[Math.floor(Math.random() * tierTemplates.length)];
    
    const difficultyMultipliers = {
      easy: 0.7,
      medium: 1.0,
      hard: 1.4,
      adaptive: 1.0 + (params.userLevel - 10) * 0.1
    };

    const baseReward = this.calculateBaseReward(params.tier, params.userLevel);
    const difficultyMultiplier = difficultyMultipliers[params.difficultyPreference] || 1.0;

    const challenge: GeneratedChallenge = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      objectives: template.objectives,
      successCriteria: {
        type: 'completion',
        metrics: [
          {
            name: 'Completion Rate',
            weight: 0.4,
            measurementType: 'score',
            minValue: 0,
            maxValue: 100
          },
          {
            name: 'Quality Score',
            weight: 0.4,
            measurementType: 'score',
            minValue: 0,
            maxValue: 100
          },
          {
            name: 'Innovation Score',
            weight: 0.2,
            measurementType: 'creativity',
            minValue: 0,
            maxValue: 100
          }
        ],
        passingThreshold: 70,
        bonusThresholds: [80, 90, 95]
      },
      estimatedDuration: params.timeConstraint || this.estimateDuration(params.tier),
      difficulty: params.difficultyPreference,
      entryFee: Math.floor(baseReward.coins * 0.2 * difficultyMultiplier),
      rewards: {
        xp: Math.floor(baseReward.xp * difficultyMultiplier),
        coins: Math.floor(baseReward.coins * difficultyMultiplier),
        tokens: Math.floor(baseReward.tokens * difficultyMultiplier),
        equipment: baseReward.equipment
      },
      realWorldComponent: params.realWorldIntegration ? {
        type: 'activity',
        description: `Complete this challenge using real-world application of ${params.classId} skills`,
        verificationMethod: params.classId === 'culinary' ? 'video' : 'photo'
      } : undefined,
      aiJudging: {
        enabled: params.aiJudging,
        judgingCriteria: {
          technical: 30,
          creativity: 25,
          presentation: 20,
          innovation: 15,
          practicality: 10
        },
        submissionTypes: ['image', 'video', 'text'],
        humanReviewRequired: params.tier === 'grandmaster',
        confidenceThreshold: 0.85
      },
      variations: [],
      adaptabilityLevel: params.difficultyPreference === 'adaptive' ? 8 : 5
    };

    return challenge;
  }

  private static calculateBaseReward(tier: ProfessionTier, userLevel: number) {
    const baseRewards = {
      apprentice: { xp: 100, coins: 200, tokens: 5, equipment: [] },
      journeyman: { xp: 250, coins: 500, tokens: 15, equipment: [] },
      expert: { xp: 500, coins: 1000, tokens: 30, equipment: [] },
      grandmaster: { xp: 1000, coins: 2500, tokens: 75, equipment: [] },
      ascended: { xp: 2000, coins: 5000, tokens: 150, equipment: [] }
    };

    const base = baseRewards[tier];
    const levelMultiplier = 1 + (userLevel - 1) * 0.1;

    return {
      xp: Math.floor(base.xp * levelMultiplier),
      coins: Math.floor(base.coins * levelMultiplier),
      tokens: Math.floor(base.tokens * levelMultiplier),
      equipment: base.equipment
    };
  }

  private static estimateDuration(tier: ProfessionTier): number {
    const durations = {
      apprentice: 30,
      journeyman: 60,
      expert: 120,
      grandmaster: 300,
      ascended: 600
    };
    return durations[tier];
  }
}

export function ChallengrAI({
  userProgress,
  onChallengeGenerated,
  onChallengeStart,
  generationsRemaining,
  onGenerationUsed,
  isOpen,
  onClose
}: ChallengrAIProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedChallenge, setGeneratedChallenge] = useState<GeneratedChallenge | null>(null);
  const [generationParams, setGenerationParams] = useState<ChallengeGenerationParams>({
    classId: userProgress.currentClass,
    tier: userProgress.currentTier,
    userLevel: userProgress.level,
    preferredType: 'mixed',
    realWorldIntegration: true,
    difficultyPreference: 'adaptive',
    collaborativeMode: false,
    aiJudging: true
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const handleGenerate = async () => {
    if (generationsRemaining <= 0) {
      alert('No generations remaining for today. Upgrade your membership for more!');
      return;
    }

    setIsGenerating(true);
    setFeedback(null);
    
    try {
      const challenge = await ChallengrAIEngine.generateChallenge(generationParams);
      setGeneratedChallenge(challenge);
      onGenerationUsed();
    } catch (error) {
      console.error('Failed to generate challenge:', error);
      alert('Failed to generate challenge. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptChallenge = () => {
    if (generatedChallenge) {
      onChallengeGenerated(generatedChallenge);
      onChallengeStart(generatedChallenge.id);
      setGeneratedChallenge(null);
      onClose();
    }
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    setFeedback(type);
    // In a real implementation, this would train the AI
    console.log(`User ${type}d the generated challenge`);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                Challengr AI
                <Sparkles className="w-5 h-5 ml-2 text-theme-yellow" />
              </h2>
              <p className="text-muted-foreground">Self-evolving challenge generation engine</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className="bg-theme-turquoise text-theme-black">
              {generationsRemaining} generations left
            </Badge>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            {/* Generation Parameters */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-theme-turquoise" />
                Challenge Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Challenge Type</label>
                    <Select 
                      value={generationParams.preferredType} 
                      onValueChange={(value: any) => setGenerationParams(prev => ({ ...prev, preferredType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="knowledge">Knowledge-based</SelectItem>
                        <SelectItem value="skill">Skill-focused</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="practical">Practical Application</SelectItem>
                        <SelectItem value="mixed">Mixed (Recommended)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <Select 
                      value={generationParams.difficultyPreference} 
                      onValueChange={(value: any) => setGenerationParams(prev => ({ ...prev, difficultyPreference: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="adaptive">Adaptive (AI-tuned)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time Constraint (minutes)</label>
                    <Slider
                      value={[generationParams.timeConstraint || 60]}
                      onValueChange={([value]) => setGenerationParams(prev => ({ ...prev, timeConstraint: value }))}
                      max={300}
                      min={15}
                      step={15}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {generationParams.timeConstraint || 60} minutes
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Real-world integration</label>
                    <Switch
                      checked={generationParams.realWorldIntegration}
                      onCheckedChange={(checked) => setGenerationParams(prev => ({ ...prev, realWorldIntegration: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">AI Judging</label>
                    <Switch
                      checked={generationParams.aiJudging}
                      onCheckedChange={(checked) => setGenerationParams(prev => ({ ...prev, aiJudging: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Collaborative mode</label>
                    <Switch
                      checked={generationParams.collaborativeMode}
                      onCheckedChange={(checked) => setGenerationParams(prev => ({ ...prev, collaborativeMode: checked }))}
                    />
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full"
                  >
                    {showAdvanced ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                    Advanced Settings
                  </Button>
                </div>
              </div>

              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-border"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Custom Requirements</label>
                    <Textarea
                      placeholder="Describe any specific requirements or focus areas for your challenge..."
                      value={generationParams.customCriteria || ''}
                      onChange={(e) => setGenerationParams(prev => ({ ...prev, customCriteria: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Generate Button */}
            <div className="text-center">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || generationsRemaining <= 0}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 px-8 py-4 text-lg shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating Challenge...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Challenge
                  </>
                )}
              </Button>
            </div>

            {/* Generated Challenge */}
            <AnimatePresence>
              {generatedChallenge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-6 border-2 border-theme-turquoise/30 bg-gradient-to-br from-card to-theme-turquoise/5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {generatedChallenge.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{generatedChallenge.estimatedDuration} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-theme-yellow" />
                            <span>{generatedChallenge.entryFee} coins</span>
                          </div>
                          <Badge className={`${
                            generatedChallenge.difficulty === 'easy' ? 'bg-green-500' :
                            generatedChallenge.difficulty === 'medium' ? 'bg-yellow-500' :
                            generatedChallenge.difficulty === 'hard' ? 'bg-red-500' :
                            'bg-purple-500'
                          } text-white`}>
                            {generatedChallenge.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFeedback('like')}
                          className={feedback === 'like' ? 'bg-green-500/20 border-green-500' : ''}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFeedback('dislike')}
                          className={feedback === 'dislike' ? 'bg-red-500/20 border-red-500' : ''}
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {generatedChallenge.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-theme-turquoise" />
                          Objectives
                        </h4>
                        <ul className="space-y-2">
                          {generatedChallenge.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-theme-yellow" />
                          Rewards
                        </h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-theme-turquoise" />
                            <span>+{generatedChallenge.rewards.xp} XP</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-theme-yellow" />
                            <span>+{generatedChallenge.rewards.coins} Coins</span>
                          </div>
                          {generatedChallenge.rewards.tokens > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-purple-500" />
                              <span>+{generatedChallenge.rewards.tokens} Tokens</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {generatedChallenge.realWorldComponent && (
                        <div className="bg-theme-yellow/10 rounded-xl p-4 border border-theme-yellow/20">
                          <h4 className="font-medium mb-2 flex items-center text-theme-yellow">
                            <Shield className="w-4 h-4 mr-2" />
                            Real-World Component
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {generatedChallenge.realWorldComponent.description}
                          </p>
                        </div>
                      )}

                      {generatedChallenge.aiJudging.enabled && (
                        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                          <h4 className="font-medium mb-2 flex items-center text-purple-500">
                            <Brain className="w-4 h-4 mr-2" />
                            AI Judging Enabled
                          </h4>
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>Technical: {generatedChallenge.aiJudging.judgingCriteria.technical}%</div>
                            <div>Creativity: {generatedChallenge.aiJudging.judgingCriteria.creativity}%</div>
                            <div>Presentation: {generatedChallenge.aiJudging.judgingCriteria.presentation}%</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => setGeneratedChallenge(null)}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button variant="outline">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Save for Later
                        </Button>
                      </div>

                      <Button
                        onClick={handleAcceptChallenge}
                        className="bg-theme-yellow text-theme-black hover:bg-theme-yellow-bright"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Challenge
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Challenge History</h3>
              <p className="text-muted-foreground">Your generated challenges will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">AI Settings</h3>
              <p className="text-muted-foreground">Customize how Challengr AI generates challenges for you</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}