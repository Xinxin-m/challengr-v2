import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coins, Gem, Clock, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface TokenSystemProps {
  userTokens: {
    goldCoins: number;
    platformTokens: number;
  };
  onMineTokens?: () => void;
}

export function TokenSystem({ userTokens, onMineTokens }: TokenSystemProps) {
  const [miningProgress, setMiningProgress] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [timeLeft, setTimeLeft] = useState('18:42:33');

  // Simulate coin expiration countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startMining = () => {
    setIsMining(true);
    setMiningProgress(0);
    
    const interval = setInterval(() => {
      setMiningProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsMining(false);
          onMineTokens?.();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* Token Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gold Coins */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-yellow-700">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Coins className="w-6 h-6" />
              </motion.div>
              Gold Coins
              <Badge variant="secondary" className="ml-2 bg-red-100 text-red-600 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {timeLeft}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {userTokens.goldCoins.toLocaleString()}
            </div>
            <p className="text-sm text-yellow-600/70 mb-3">
              Expires in {timeLeft} • Use them or lose them!
            </p>
            <div className="flex items-center space-x-2 text-xs text-yellow-600">
              <TrendingUp className="w-4 h-4" />
              <span>+125 coins today</span>
            </div>
          </CardContent>
        </Card>

        {/* Platform Tokens */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-2"
              >
                <Gem className="w-6 h-6" />
              </motion.div>
              Platform Tokens
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-600 text-xs">
                Permanent
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {userTokens.platformTokens.toLocaleString()}
            </div>
            <p className="text-sm text-blue-600/70 mb-3">
              Stake for rewards • Trade • Vote on governance
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-600">
              <Users className="w-4 h-4" />
              <span>Rank: Top 15%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attention Mining */}
      <Card className="bg-gradient-to-br from-green-50 to-cyan-50 border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
              className="mr-2"
            >
              <Zap className="w-6 h-6" />
            </motion.div>
            Attention Mining
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl mb-1">👀</div>
              <div className="font-bold text-green-600">2,847</div>
              <div className="text-xs text-green-500">Attention Score</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl mb-1">🔥</div>
              <div className="font-bold text-orange-600">{dailyStreak}</div>
              <div className="text-xs text-orange-500">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl mb-1">🎯</div>
              <div className="font-bold text-blue-600">Top 200</div>
              <div className="text-xs text-blue-500">Global Rank</div>
            </div>
          </div>

          {/* Mining Progress */}
          {isMining && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Mining in progress...</span>
                <span>{miningProgress}%</span>
              </div>
              <Progress value={miningProgress} className="h-2" />
            </div>
          )}

          <Button 
            onClick={startMining}
            disabled={isMining}
            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
          >
            {isMining ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
                Mining Attention...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Start Mining Session
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-2">
            Interact with quality content to earn attention rewards
          </p>
        </CardContent>
      </Card>

      {/* Daily Missions */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-700">Daily Missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📚</div>
                <div>
                  <div className="font-medium">Complete 3 Challenges</div>
                  <div className="text-sm text-muted-foreground">Progress: 2/3</div>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-600">+50 🪙</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">💬</div>
                <div>
                  <div className="font-medium">Help 5 Students</div>
                  <div className="text-sm text-muted-foreground">Progress: 5/5</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-600">✓ Done</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌟</div>
                <div>
                  <div className="font-medium">Share Quality Content</div>
                  <div className="text-sm text-muted-foreground">Progress: 1/2</div>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-600">+100 💎</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}