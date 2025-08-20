import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Copy, Check, ExternalLink, X, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface MultiWalletConnectProps {
  onWalletConnect?: (wallet: string, address: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  popular: boolean;
  installed: boolean;
}

const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'The most popular Ethereum wallet',
    popular: true,
    installed: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect with 200+ mobile wallets',
    popular: true,
    installed: true
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Secure wallet by Coinbase',
    popular: true,
    installed: false
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    description: 'Solana ecosystem wallet',
    popular: false,
    installed: false
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '🌈',
    description: 'Colorful Ethereum wallet',
    popular: false,
    installed: false
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: '🔒',
    description: 'Binance official wallet',
    popular: false,
    installed: true
  }
];

export function MultiWalletConnect({ onWalletConnect, isOpen, onClose }: MultiWalletConnectProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);

  const handleWalletSelect = async (walletId: string) => {
    setSelectedWallet(walletId);
    setConnecting(true);

    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    setWalletAddress(mockAddress);
    setConnected(true);
    setConnecting(false);
    
    const wallet = walletOptions.find(w => w.id === walletId);
    onWalletConnect?.(wallet?.name || walletId, mockAddress);
  };

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setSelectedWallet(null);
    setConnecting(false);
    setConnected(false);
    setWalletAddress('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span>Connect Your Wallet</span>
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to EduChain and start earning tokens.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!connected ? (
            <motion.div
              key="wallet-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <p className="text-muted-foreground mb-4">
                  Choose your preferred wallet to connect to EduChain
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <Shield className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span>Fast</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {walletOptions.map((wallet) => (
                  <motion.div
                    key={wallet.id}
                    onClick={() => !connecting && wallet.installed && handleWalletSelect(wallet.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                      connecting && selectedWallet === wallet.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                        : 'border-border hover:border-purple-300 hover:bg-accent'
                    } ${!wallet.installed ? 'opacity-60 cursor-not-allowed' : ''} ${connecting ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{wallet.icon}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{wallet.name}</span>
                            {wallet.popular && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {wallet.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1">
                        {connecting && selectedWallet === wallet.id ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
                          />
                        ) : wallet.installed ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ) : (
                          <button
                            className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open('#', '_blank');
                            }}
                          >
                            Install
                          </button>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {wallet.installed ? 'Detected' : 'Not installed'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wallet-connected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">Wallet Connected!</h3>
              <p className="text-muted-foreground mb-4">
                Successfully connected to {walletOptions.find(w => w.id === selectedWallet)?.name}
              </p>
              
              <div className="bg-accent rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🪙</div>
                  <div className="font-bold text-orange-600 dark:text-orange-400">0</div>
                  <div className="text-xs text-orange-500">Gold Coins</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">💎</div>
                  <div className="font-bold text-purple-600 dark:text-purple-400">0</div>
                  <div className="text-xs text-purple-500">Platform Tokens</div>
                </div>
              </div>

              <Button onClick={handleClose} className="w-full">
                Start Earning
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}