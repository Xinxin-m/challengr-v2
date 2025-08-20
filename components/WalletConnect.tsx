import React, { useState, useEffect } from 'react';
import { Wallet, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface WalletConnectProps {
  onWalletConnect?: (address: string) => void;
}

export function WalletConnect({ onWalletConnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState({ coins: 0, tokens: 0 });

  // Mock wallet connection (in real app, use Web3 provider)
  const connectWallet = async () => {
    // Simulate wallet connection
    const mockAddress = '0x1234...5678';
    setWalletAddress(mockAddress);
    setIsConnected(true);
    setBalance({ coins: 1250, tokens: 850 });
    onWalletConnect?.(mockAddress);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance({ coins: 0, tokens: 0 });
  };

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 hover:border-purple-300 transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Connect Your Wallet
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Connect your Web3 wallet to start earning coins and tokens through challenges!
          </p>
          <Button 
            onClick={connectWallet}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Connected
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
            {walletAddress}
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

        {/* Token Balances */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🪙</div>
            <div className="font-bold text-lg text-orange-600">{balance.coins}</div>
            <div className="text-xs text-orange-500">Gold Coins</div>
            <div className="text-xs text-orange-400 mt-1">Expires in 18h</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">💎</div>
            <div className="font-bold text-lg text-purple-600">{balance.tokens}</div>
            <div className="text-xs text-purple-500">Platform Tokens</div>
            <div className="text-xs text-purple-400 mt-1">Permanent</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}