import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, Coins, Gem, DollarSign, Twitter, Send, Copy, Check, TrendingUp, Award, MapPin, Calendar, Users, Heart, MessageCircle, Share2, ExternalLink, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { useTheme } from './ThemeProvider';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<'amount' | 'social' | 'processing' | 'completed'>('amount');
  const [tweetText, setTweetText] = useState('');

  // ESC key handler with Apple-style smooth behavior
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('profile-modal');
      if (modal && !modal.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const userStats = {
    level: 12,
    totalEarned: 12840,
    goldCoins: 1247,
    platformTokens: 856,
    creatorTokens: 2450,
    followers: 2450,
    following: 892,
    posts: 127,
    completedChallenges: 34,
    createdChallenges: 8,
    nextLevelProgress: 75
  };

  const withdrawalHistory = [
    { id: 1, amount: 500, status: 'completed', date: '2024-01-15', txHash: '0x123...abc' },
    { id: 2, amount: 750, status: 'pending', date: '2024-01-20', txHash: '0x456...def' },
    { id: 3, amount: 300, status: 'completed', date: '2024-01-10', txHash: '0x789...ghi' }
  ];

  const handleWithdraw = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      setTweetText(`🎯 Just claimed ${withdrawAmount} ZXM-C tokens from @EduChain! 💰
      
🚀 Building the future of Web3 education - one challenge at a time!

💡 Join me in earning while learning: [app.educhain.com]

#Web3Education #EduChain #LearnAndEarn #Blockchain`);
      setWithdrawStep('social');
    }
  };

  const handleSocialWithdraw = () => {
    setWithdrawStep('processing');
    setTimeout(() => {
      setWithdrawStep('completed');
    }, 3000);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackToAmount = () => {
    setWithdrawStep('amount');
    setWithdrawAmount('');
    setTweetText('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <motion.div
          id="profile-modal"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            mass: 0.8
          }}
          className="w-full max-w-4xl max-h-[85vh] overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30"
          style={{ backdropFilter: 'blur(40px)' }}
        >
          {/* Apple-style Header */}
          <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 dark:from-purple-400/20 dark:via-pink-400/20 dark:to-blue-400/20 p-6 border-b border-white/10 dark:border-gray-700/30">
            {/* Close Button - Apple style */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-colors"
            >
              <X size={16} className="text-gray-600 dark:text-gray-300" />
            </motion.button>

            {/* Profile Header */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-4 ring-white/30 dark:ring-gray-700/30">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles size={12} className="text-white" />
                </motion.div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl text-gray-900 dark:text-white tracking-tight">John Doe</h2>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-full px-3 py-1">
                    <Award className="w-3 h-3 mr-1" />
                    Creator
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  Level {userStats.level} • Educator
                </p>
                
                {/* Level Progress */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Progress to Level {userStats.level + 1}</span>
                    <span className="text-purple-600 dark:text-purple-400">{userStats.nextLevelProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${userStats.nextLevelProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Apple-style Tab Navigation */}
              <div className="bg-gray-50/50 dark:bg-gray-800/30 p-2 mx-4 mt-4 rounded-2xl">
                <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 h-auto space-x-1">
                  {[
                    { value: 'profile', label: 'Profile', icon: '👤' },
                    { value: 'tokens', label: 'Tokens', icon: '💎' },
                    { value: 'withdraw', label: 'Withdraw', icon: '💰' },
                    { value: 'settings', label: 'Settings', icon: '⚙️' }
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-xl py-3 px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all"
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="profile" className="space-y-6 mt-0">
                  {/* Stats Grid - Apple Card Style */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: userStats.posts, label: 'Posts', color: 'from-blue-500 to-blue-600', icon: '📝' },
                      { value: userStats.followers, label: 'Followers', color: 'from-green-500 to-green-600', icon: '👥' },
                      { value: userStats.completedChallenges, label: 'Completed', color: 'from-orange-500 to-orange-600', icon: '✅' },
                      { value: userStats.createdChallenges, label: 'Created', color: 'from-purple-500 to-purple-600', icon: '🎯' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${stat.color} rounded-2xl p-4 text-white relative overflow-hidden`}
                      >
                        <div className="relative z-10">
                          <div className="text-2xl mb-1">{stat.value}</div>
                          <div className="text-sm opacity-90">{stat.label}</div>
                        </div>
                        <div className="absolute top-2 right-2 text-2xl opacity-20">{stat.icon}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bio Section */}
                  <Card className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-lg mb-3 text-gray-900 dark:text-white">About</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Creative Developer & Challenge Enthusiast 🚀<br/>
                        Building amazing things one challenge at a time!<br/>
                        Love coding, design, and fitness challenges!
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mt-4">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>Joined March 2023</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tokens" className="space-y-6 mt-0">
                  {/* Token Portfolio */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        amount: userStats.goldCoins,
                        label: 'Gold Coins (ZXM-C)',
                        sublabel: 'Expires in 18h 34m',
                        color: 'from-yellow-400 via-orange-500 to-red-500',
                        emoji: '🪙',
                        animation: { rotate: [0, 360] }
                      },
                      {
                        amount: userStats.platformTokens,
                        label: 'Platform Tokens (ZXM)',
                        sublabel: 'Permanent',
                        color: 'from-purple-500 via-purple-600 to-pink-500',
                        emoji: '💎',
                        animation: { scale: [1, 1.1, 1] }
                      },
                      {
                        amount: userStats.creatorTokens,
                        label: 'Creator Tokens',
                        sublabel: 'Your fanbase',
                        color: 'from-green-400 via-blue-500 to-purple-600',
                        emoji: '🎯',
                        animation: { rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }
                      }
                    ].map((token, index) => (
                      <motion.div
                        key={token.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${token.color} rounded-3xl p-6 text-white relative overflow-hidden`}
                      >
                        <motion.div
                          animate={token.animation}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="text-4xl mb-4"
                        >
                          {token.emoji}
                        </motion.div>
                        <div className="text-3xl mb-2">{token.amount.toLocaleString()}</div>
                        <div className="text-sm opacity-90 mb-1">{token.label}</div>
                        <div className="text-xs opacity-75">{token.sublabel}</div>
                        
                        {/* Background decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Earnings Summary */}
                  <Card className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Earnings Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { label: 'Total Earned', value: `$${userStats.totalEarned.toLocaleString()}`, color: 'text-gray-900 dark:text-white' },
                        { label: 'This Month', value: '+$1,240', color: 'text-green-600 dark:text-green-400' },
                        { label: "Today's Mining", value: '+127 🪙', color: 'text-yellow-600 dark:text-yellow-400' },
                        { label: 'Available for Withdrawal', value: `${userStats.goldCoins} ZXM-C`, color: 'text-purple-600 dark:text-purple-400' }
                      ].map((item, index) => (
                        <div key={item.label} className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                          <span className={`${item.color}`}>{item.value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="withdraw" className="space-y-6 mt-0">
                  <AnimatePresence mode="wait">
                    {withdrawStep === 'amount' && (
                      <motion.div
                        key="amount"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <Card className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-400/20 dark:via-pink-400/20 dark:to-orange-400/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30">
                            <CardTitle className="flex items-center text-gray-900 dark:text-white">
                              <Coins className="w-6 h-6 mr-3 text-yellow-500" />
                              Withdraw Gold Coins
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6 space-y-6">
                            {/* Balance Display */}
                            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Available Balance</span>
                                <div className="flex items-center space-x-2">
                                  <motion.span
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-2xl"
                                  >
                                    🪙
                                  </motion.span>
                                  <span className="text-2xl text-yellow-600 dark:text-yellow-400">
                                    {userStats.goldCoins} ZXM-C
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-3">
                              <label className="text-gray-900 dark:text-white block">Withdrawal Amount</label>
                              <Input
                                type="number"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="Enter amount to withdraw"
                                max={userStats.goldCoins}
                                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12 text-lg"
                              />
                              {withdrawAmount && parseFloat(withdrawAmount) > userStats.goldCoins && (
                                <p className="text-red-500 text-sm">Amount exceeds available balance</p>
                              )}
                            </div>

                            {/* How it works */}
                            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-5">
                              <h4 className="text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2" />
                                How Withdrawal Works
                              </h4>
                              <ul className="text-blue-700 dark:text-blue-300 space-y-2 text-sm">
                                <li className="flex items-center">
                                  <Twitter className="w-4 h-4 mr-2 text-blue-500" />
                                  Tweet your withdrawal request
                                </li>
                                <li className="flex items-center">
                                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                                  Get 100+ likes/retweets/comments
                                </li>
                                <li className="flex items-center">
                                  <Gem className="w-4 h-4 mr-2 text-purple-500" />
                                  Automatic conversion to ZXM tokens
                                </li>
                                <li className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                  Receive tokens within 24 hours
                                </li>
                              </ul>
                            </div>

                            <Button
                              onClick={handleWithdraw}
                              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > userStats.goldCoins}
                              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Continue to Social Verification
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {withdrawStep === 'social' && (
                      <motion.div
                        key="social"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-3xl">
                          <CardHeader className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30">
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                                <Twitter className="w-6 h-6 mr-3 text-blue-500" />
                                Social Verification
                              </CardTitle>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBackToAmount}
                                className="rounded-full"
                              >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 space-y-6">
                            {/* Withdrawal Summary */}
                            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Withdrawing</span>
                                <span className="text-xl text-purple-600 dark:text-purple-400">
                                  {withdrawAmount} ZXM-C
                                </span>
                              </div>
                            </div>

                            {/* Tweet Template */}
                            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl p-5">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-900 dark:text-white">Tweet Template</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(tweetText)}
                                  className="rounded-full"
                                >
                                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                  {copied ? 'Copied!' : 'Copy'}
                                </Button>
                              </div>
                              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap bg-white/70 dark:bg-gray-700/50 rounded-xl p-4">
                                {tweetText}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                              <Button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank')}
                                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                              >
                                <Twitter className="w-5 h-5 mr-2" />
                                Tweet Now
                              </Button>
                              <Button
                                onClick={handleSocialWithdraw}
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                I've Posted - Verify Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {withdrawStep === 'processing' && (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-6"
                      >
                        <Card className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 dark:from-yellow-400/20 dark:via-orange-400/20 dark:to-red-400/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-3xl">
                          <CardContent className="text-center py-12">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="text-6xl mb-6"
                            >
                              ⚡
                            </motion.div>
                            <h3 className="text-xl text-gray-900 dark:text-white mb-2">Processing Withdrawal</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                              Analyzing social engagement metrics...
                            </p>
                            
                            <div className="max-w-md mx-auto space-y-4">
                              <Progress value={65} className="w-full h-3 rounded-full" />
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Current engagement:</span>
                                <span className="text-orange-600 dark:text-orange-400">45/100 interactions</span>
                              </div>
                            </div>

                            <div className="mt-8 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                              <p>✅ Tweet verified</p>
                              <p>🔄 Collecting social metrics...</p>
                              <p>⏳ Estimated completion: 2-4 minutes</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {withdrawStep === 'completed' && (
                      <motion.div
                        key="completed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={ { opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-6"
                      >
                        <Card className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-400/20 dark:via-emerald-400/20 dark:to-teal-400/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-3xl">
                          <CardContent className="text-center py-12">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", duration: 0.6 }}
                              className="text-6xl mb-6"
                            >
                              🎉
                            </motion.div>
                            <h3 className="text-xl text-gray-900 dark:text-white mb-2">Withdrawal Successful!</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                              Your {withdrawAmount} ZXM-C tokens have been converted to ZXM
                            </p>
                            
                            <div className="bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-4 mb-6 max-w-md mx-auto">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Transaction Hash:</span>
                                <code className="text-sm bg-white/70 dark:bg-gray-700/50 px-3 py-1 rounded-lg">
                                  0x123...abc
                                </code>
                              </div>
                            </div>
                            
                            <Button
                              onClick={() => setWithdrawStep('amount')}
                              className="w-full max-w-sm h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl"
                            >
                              Make Another Withdrawal
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Withdrawal History */}
                  <Card className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Recent Withdrawals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {withdrawalHistory.map((withdrawal) => (
                        <div 
                          key={withdrawal.id} 
                          className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/30 rounded-xl border border-white/20 dark:border-gray-600/30"
                        >
                          <div>
                            <div className="text-gray-900 dark:text-white">{withdrawal.amount} ZXM-C</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{withdrawal.date}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={withdrawal.status === 'completed' ? 'default' : 'secondary'}
                              className={`rounded-full ${
                                withdrawal.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}
                            >
                              {withdrawal.status}
                            </Badge>
                            <Button variant="ghost" size="sm" className="rounded-full">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6 mt-0">
                  <Card className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/30 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <Settings className="w-5 h-5 mr-2" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-gray-900 dark:text-white block">Display Name</label>
                        <Input 
                          defaultValue="John Doe" 
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-gray-900 dark:text-white block">Bio</label>
                        <Input 
                          defaultValue="Creative Developer & Challenge Enthusiast" 
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-gray-900 dark:text-white block">Location</label>
                        <Input 
                          defaultValue="San Francisco, CA" 
                          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl h-12"
                        />
                      </div>
                      <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}