import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Star, Diamond, Gift, Clock, Zap, Target, 
  TrendingUp, Users, Shield, Sparkles, Check, X,
  Calendar, DollarSign, Coins, Award, Heart, Flame
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface MembershipDashboardProps {
  currentTier: 'free' | 'basic' | 'premium' | 'ultimate';
  expiryDate: Date | null;
  userTokens: {
    goldCoins: number;
    bettingCredits: number;
    membershipTime: number;
  };
  onPurchase: (tier: 'basic' | 'premium' | 'ultimate', duration: number) => void;
  onTokenEarn: (amount: number, type: 'gold' | 'betting') => void;
}

interface MembershipTier {
  id: 'free' | 'basic' | 'premium' | 'ultimate';
  name: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
  features: string[];
  dailyBenefits: {
    credits: number;
    goldCoins: number;
    challengeGenerations: number;
    aiChallengeTime: number;
  };
  specialPerks: string[];
  isPopular?: boolean;
  earlyBirdOffer?: string;
}

export function MembershipDashboard({
  currentTier,
  expiryDate,
  userTokens,
  onPurchase,
  onTokenEarn
}: MembershipDashboardProps) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'premium' | 'ultimate' | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showEarlyBirdBonus, setShowEarlyBirdBonus] = useState(true);

  const membershipTiers: MembershipTier[] = [
    {
      id: 'free',
      name: 'Free Explorer',
      price: 0,
      emoji: '🆓',
      color: 'gray',
      gradient: 'from-gray-400 to-gray-600',
      description: 'Start your Web3 education journey',
      features: [
        '5 daily betting credits',
        'Basic challenges access',
        'Community participation',
        'Limited AI interactions'
      ],
      dailyBenefits: {
        credits: 5,
        goldCoins: 0,
        challengeGenerations: 1,
        aiChallengeTime: 30
      },
      specialPerks: [
        'Join community discussions',
        'Earn gold coins through interactions'
      ]
    },
    {
      id: 'basic',
      name: 'Smart Learner',
      price: 5.99,
      emoji: '⭐',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Enhanced learning experience',
      features: [
        '10 daily betting credits',
        'Premium challenge access',
        'Official media interactions earn 2x credits',
        '2 months FREE for early adopters',
        'Gold coins can be exchanged for membership time'
      ],
      dailyBenefits: {
        credits: 10,
        goldCoins: 50,
        challengeGenerations: 2,
        aiChallengeTime: 60
      },
      specialPerks: [
        '2 months FREE for following official media',
        'Double rewards from official posts',
        'Priority customer support'
      ],
      isPopular: true,
      earlyBirdOffer: '2 months FREE + follow/retweet/like bonus'
    },
    {
      id: 'premium',
      name: 'Power Trader',
      price: 25.99,
      originalPrice: 25.99,
      emoji: '👑',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      description: 'Advanced trading and AI features',
      features: [
        'All Basic features',
        '15 daily betting credits',
        '$15.99 charged as pre-sale tokens',
        '2+ minute AI challenge sessions',
        '3 additional AI generations daily',
        'Search betting opportunities (even off-chain)',
        'Premium analytics dashboard'
      ],
      dailyBenefits: {
        credits: 15,
        goldCoins: 100,
        challengeGenerations: 3,
        aiChallengeTime: 120
      },
      specialPerks: [
        'Pre-sale token allocation',
        'Advanced betting search',
        'AI-powered market insights',
        'Exclusive premium challenges',
        'VIP community access'
      ],
      earlyBirdOffer: 'Only $15.99 for pre-sale token holders'
    },
    {
      id: 'ultimate',
      name: 'Super Contributor',
      price: 39.99,
      emoji: '💎',
      color: 'yellow',
      gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
      description: 'Ultimate Web3 education experience',
      features: [
        'All Premium features',
        'Unlimited betting credits',
        'FREE for super contributors',
        'Co-create platform features',
        'Revenue sharing program',
        'Personal AI tutor',
        'Exclusive NFT rewards'
      ],
      dailyBenefits: {
        credits: 999,
        goldCoins: 500,
        challengeGenerations: 10,
        aiChallengeTime: 300
      },
      specialPerks: [
        'FREE tier for qualified contributors',
        'Revenue sharing from platform',
        'Governance voting rights',
        'Personal AI educational assistant',
        'Exclusive NFT badge collection',
        'Direct access to development team'
      ],
      earlyBirdOffer: 'FREE for community leaders & super contributors'
    }
  ];

  const currentTierData = membershipTiers.find(t => t.id === currentTier);
  const daysUntilExpiry = expiryDate ? Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const handleClaimEarlyBird = () => {
    // Simulate claiming early bird bonus
    onTokenEarn(500, 'gold');
    setShowEarlyBirdBonus(false);
  };

  const handlePurchase = (tier: MembershipTier) => {
    setSelectedTier(tier.id as 'basic' | 'premium' | 'ultimate');
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (!selectedTier) return;
    
    const duration = selectedTier === 'basic' && currentTier === 'free' ? 90 : 30; // 2 months free for basic
    onPurchase(selectedTier, duration);
    setShowPurchaseModal(false);
    setSelectedTier(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            💎
          </motion.div>
          <h1 className="text-3xl text-gray-900 dark:text-white">Membership Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Unlock the full potential of Web3 education with our tiered membership system. 
            Earn while you learn, bet while you grow.
          </p>
        </div>

        {/* Current Membership Status */}
        {currentTierData && (
          <Card className={`bg-gradient-to-r ${currentTierData.gradient} text-white border-0 shadow-2xl`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl"
                  >
                    {currentTierData.emoji}
                  </motion.div>
                  <div>
                    <h2 className="text-2xl mb-2">{currentTierData.name}</h2>
                    <p className="text-white/80">{currentTierData.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  {currentTier !== 'free' && expiryDate && (
                    <div className="space-y-1">
                      <div className="text-2xl">{daysUntilExpiry}</div>
                      <div className="text-sm text-white/80">days left</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Daily Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{currentTierData.dailyBenefits.credits}</div>
                  <div className="text-sm text-white/80">Daily Credits</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{currentTierData.dailyBenefits.goldCoins}</div>
                  <div className="text-sm text-white/80">Daily Gold</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{currentTierData.dailyBenefits.challengeGenerations}</div>
                  <div className="text-sm text-white/80">AI Generations</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{currentTierData.dailyBenefits.aiChallengeTime}s</div>
                  <div className="text-sm text-white/80">AI Challenge Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Early Bird Bonus */}
        {showEarlyBirdBonus && currentTier === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Card className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white border-0 shadow-2xl overflow-hidden">
              <motion.div
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ backgroundSize: '200% 100%' }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-3xl"
                    >
                      🎁
                    </motion.div>
                    <div>
                      <h3 className="text-xl mb-1">Early Bird Special!</h3>
                      <p className="text-white/90">Get 500 bonus gold coins + 2 months FREE basic membership</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleClaimEarlyBird}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 rounded-2xl"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Claim Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative"
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    POPULAR
                  </Badge>
                </div>
              )}

              <Card className={`h-full border-2 transition-all duration-300 ${
                currentTier === tier.id 
                  ? `border-${tier.color}-500 shadow-2xl bg-${tier.color}-50/50 dark:bg-${tier.color}-900/20` 
                  : 'border-gray-200/50 dark:border-gray-700/50 hover:border-purple-500/50'
              } rounded-3xl overflow-hidden backdrop-blur-sm`}>
                
                {tier.earlyBirdOffer && (
                  <div className={`bg-gradient-to-r ${tier.gradient} text-white p-3 text-center`}>
                    <div className="text-sm">🔥 {tier.earlyBirdOffer}</div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="text-4xl mb-3"
                  >
                    {tier.emoji}
                  </motion.div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {tier.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl text-gray-900 dark:text-white">
                      {tier.price === 0 ? 'FREE' : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>${tier.price}</span>
                          {tier.originalPrice && tier.originalPrice > tier.price && (
                            <span className="text-lg text-gray-400 line-through">
                              ${tier.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {tier.price > 0 && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className={`w-4 h-4 mt-0.5 text-${tier.color}-500 flex-shrink-0`} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Daily Benefits */}
                  <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl p-4 space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Daily Benefits:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <span className="text-blue-500">🎲</span>
                        <span>{tier.dailyBenefits.credits} credits</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">🪙</span>
                        <span>{tier.dailyBenefits.goldCoins} gold</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-purple-500">✨</span>
                        <span>{tier.dailyBenefits.challengeGenerations} AI gen</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-green-500">⏱️</span>
                        <span>{tier.dailyBenefits.aiChallengeTime}s AI</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {currentTier === tier.id ? (
                      <Button 
                        disabled 
                        className="w-full rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Current Plan
                      </Button>
                    ) : tier.id === 'free' ? (
                      <Button 
                        disabled 
                        variant="outline"
                        className="w-full rounded-2xl border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                      >
                        Downgrade Available
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(tier)}
                        className={`w-full rounded-2xl bg-gradient-to-r ${tier.gradient} hover:opacity-90 text-white border-0 shadow-lg`}
                      >
                        {tier.id === 'ultimate' && tier.earlyBirdOffer?.includes('FREE') ? (
                          <>
                            <Crown className="w-4 h-4 mr-2" />
                            Apply for FREE
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Upgrade Now
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-blue-200 dark:border-blue-800 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                <TrendingUp className="w-5 h-5 mr-2" />
                Earning Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Official Media Interactions</span>
                  <span className="text-blue-600 dark:text-blue-400">2x Credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Challenge Completions</span>
                  <span className="text-blue-600 dark:text-blue-400">50-500 Tokens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">10-Win Streak Bonus</span>
                  <span className="text-blue-600 dark:text-blue-400">1000 Gold Airdrop</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">AI Challenge Creation</span>
                  <span className="text-blue-600 dark:text-blue-400">20 Interactions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 border-purple-200 dark:border-purple-800 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800 dark:text-purple-200">
                <Shield className="w-5 h-5 mr-2" />
                Membership Perks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-purple-700 dark:text-purple-300">Gold coins → Membership time conversion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="text-purple-700 dark:text-purple-300">Pre-token launch benefits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-purple-700 dark:text-purple-300">Exclusive NFT rewards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-purple-700 dark:text-purple-300">VIP community access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      <AnimatePresence>
        {showPurchaseModal && selectedTier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowPurchaseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const tier = membershipTiers.find(t => t.id === selectedTier);
                return tier ? (
                  <div className="text-center space-y-6">
                    <div className="text-4xl mb-4">{tier.emoji}</div>
                    <h3 className="text-2xl text-gray-900 dark:text-white">
                      Upgrade to {tier.name}
                    </h3>
                    <div className="space-y-4">
                      <div className="text-3xl text-gray-900 dark:text-white">
                        ${tier.price}/month
                      </div>
                      
                      {tier.earlyBirdOffer && (
                        <div className="bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-4">
                          <div className="text-green-800 dark:text-green-200 text-sm">
                            🎉 {tier.earlyBirdOffer}
                          </div>
                        </div>
                      )}

                      <div className="text-gray-600 dark:text-gray-300 text-sm">
                        {tier.description}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowPurchaseModal(false)}
                        className="flex-1 rounded-2xl"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={confirmPurchase}
                        className={`flex-1 rounded-2xl bg-gradient-to-r ${tier.gradient} text-white border-0`}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Confirm
                      </Button>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}