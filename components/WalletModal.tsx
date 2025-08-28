import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Wallet, Coins, Zap, ExternalLink, AlertCircle, 
  CheckCircle, Copy, Check, Globe, Shield, TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CURRENT_USER } from '../data/currentUser';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: any;
  walletConnected?: boolean;
}

const WALLET_OPTIONS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'The most popular Ethereum wallet',
    url: 'https://metamask.io/download/',
    connected: false
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Secure wallet by Coinbase',
    url: 'https://www.coinbase.com/wallet',
    connected: false
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: '🟡',
    description: 'Leading cryptocurrency exchange',
    url: 'https://www.binance.com/en/download',
    connected: false
  },
  {
    id: 'okx',
    name: 'OKX',
    icon: '⚫',
    description: 'Multi-chain crypto wallet',
    url: 'https://www.okx.com/download',
    connected: false
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    icon: '🦄',
    description: 'Decentralized trading protocol',
    url: 'https://app.uniswap.org/',
    connected: false
  }
];

export function WalletModal({
  isOpen,
  onClose,
  userProgress,
  walletConnected = false
}: WalletModalProps) {
  const [activeTab, setActiveTab] = useState('balance');
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Mock wallet address for demo
  const mockWalletAddress = '0x742d35cc6bf...a8f9d2e4b';

  // Use current user data for balance display
  const userCoins = CURRENT_USER.coins || userProgress?.dailyCoins || 2500;
  const userXP = userProgress?.totalXP || 12500;

  // Calculate conversion rates (from the image)
  const coinsToTokens = Math.floor(userCoins / 10 * 0.8); // 10 coins = 0.8 tokens
  const currentTokens = userProgress?.tokens || 8500;
  const totalTokensAfterConversion = currentTokens + coinsToTokens;

  const handleWalletConnect = (walletId: string) => {
    const wallet = WALLET_OPTIONS.find(w => w.id === walletId);
    if (wallet) {
      // Open external wallet connection page
      window.open(wallet.url, '_blank', 'noopener,noreferrer');
      
      // Simulate connection after a delay (for demo purposes)
      setTimeout(() => {
        setConnectedWallets(prev => [...prev, walletId]);
      }, 2000);
    }
  };

  const handleWalletDisconnect = (walletId: string) => {
    setConnectedWallets(prev => prev.filter(id => id !== walletId));
    setShowDisconnectDialog(null);
  };

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(mockWalletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Wallet Management</h2>
                <p className="text-white/80">Manage your digital assets and connections</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-muted/30">
              <TabsTrigger 
                value="balance" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Available Balance
              </TabsTrigger>
              <TabsTrigger 
                value="connect" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Connect Wallets
              </TabsTrigger>
            </TabsList>

            {/* Available Balance Tab */}
            <TabsContent value="balance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Holdings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Your Current Holdings</h3>
                  
                  {/* Tokens */}
                  <Card className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-400">{currentTokens.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Tokens</p>
                          <p className="text-xs text-purple-400">Permanent</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Credits */}
                  <Card className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-400">25,000</p>
                          <p className="text-sm text-muted-foreground">Credits</p>
                          <p className="text-xs text-blue-400">Expires in 6h37</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Coins */}
                  <Card className="p-4 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                          <Coins className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-400">{userCoins.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Coins</p>
                          <p className="text-xs text-yellow-400">Convertible Earnings</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Daily Credits Progress */}
                  <Card className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Daily Credits</span>
                        <span className="text-sm font-bold text-green-400">+850.0</span>
                      </div>
                      <Progress value={85} className="h-3" />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Daily Credits After Conversion</span>
                        <span className="text-sm font-bold text-green-400">+860.0</span>
                      </div>
                      <Progress value={86} className="h-3" />
                    </div>
                  </Card>
                </div>

                {/* Conversion Analysis */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Conversion Analysis</h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Live Rates
                    </Badge>
                  </div>

                  {/* Conversion Calculator */}
                  <Card className="p-4 bg-gradient-to-br from-cyan-900/20 to-cyan-800/20 border-cyan-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Convert Coins to Tokens</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-yellow-400">{userCoins}</span>
                        <span className="text-cyan-400 mx-2">→</span>
                        <span className="text-lg font-bold text-purple-400">{coinsToTokens}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Total Tokens After Conversion</span>
                      </div>
                      <span className="text-xl font-bold text-purple-400">{totalTokensAfterConversion.toLocaleString()}</span>
                    </div>
                  </Card>

                  {/* Conversion Rates */}
                  <div className="space-y-3">
                    <Card className="p-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-400/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-3 h-3 text-purple-400" />
                          </div>
                          <span className="text-sm font-medium">100 Tokens</span>
                          <span className="text-muted-foreground">=</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Globe className="w-3 h-3 text-blue-400" />
                          </div>
                          <span className="text-sm font-bold text-blue-400">10 Credits daily</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3 bg-gradient-to-r from-yellow-900/30 to-purple-900/30 border-yellow-400/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <Coins className="w-3 h-3 text-yellow-400" />
                          </div>
                          <span className="text-sm font-medium">10 Coins</span>
                          <span className="text-muted-foreground">=</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-3 h-3 text-purple-400" />
                          </div>
                          <span className="text-sm font-bold text-purple-400">0.8 Tokens</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Connect Wallets Tab */}
            <TabsContent value="connect" className="space-y-6">
              <div className="grid gap-4">
                {WALLET_OPTIONS.map((wallet) => {
                  const isConnected = connectedWallets.includes(wallet.id);
                  
                  return (
                    <Card key={wallet.id} className="p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{wallet.icon}</div>
                          <div>
                            <h4 className="font-semibold">{wallet.name}</h4>
                            <p className="text-sm text-muted-foreground">{wallet.description}</p>
                            {isConnected && (
                              <div className="flex items-center space-x-2 mt-1">
                                <div 
                                  className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                                  onClick={handleCopyAddress}
                                >
                                  <span className="text-muted-foreground">{mockWalletAddress}</span>
                                  {copiedAddress ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {isConnected ? (
                            <>
                              <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Connected
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDisconnectDialog(wallet.id)}
                                className="border-red-400/30 text-red-400 hover:bg-red-500/10"
                              >
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => handleWalletConnect(wallet.id)}
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                            >
                              Connect
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Security Notice */}
              <Card className="p-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-400/30">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-400">Security Notice</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your wallet connections are secured with industry-standard encryption. 
                      Never share your private keys or seed phrases with anyone.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {/* Disconnect Confirmation Dialog */}
      <AnimatePresence>
        {showDisconnectDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDisconnectDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-6 max-w-md mx-4 border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Disconnect Wallet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Are you sure you want to disconnect this wallet? You will no longer receive token rewards to this wallet address.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDisconnectDialog(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleWalletDisconnect(showDisconnectDialog)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  Disconnect
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}