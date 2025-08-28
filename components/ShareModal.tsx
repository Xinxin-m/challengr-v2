import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Copy, MessageCircle, ExternalLink, Check
} from 'lucide-react';
import { Button } from './ui/button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
  challengeTitle: string;
  challengeType?: 'aaa' | 'betting' | 'battle';
  challengeData?: {
    category?: string;
    creator?: string;
    action?: string;
    creatorA?: string;
    creatorB?: string;
    goal?: string;
  };
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  challengeId,
  challengeTitle,
  challengeType = 'aaa',
  challengeData = {}
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/challenge/${challengeId}` : `https://challenge.hub/challenge/${challengeId}`;
  
  // Generate customized share messages based on challenge type
  const generateShareMessage = () => {
    switch (challengeType) {
      case 'betting':
        const { category = 'amazing', creator = 'this creator', action = 'complete this challenge' } = challengeData;
        return `Hey friends! I'm hyped for this ${category} challenge—wanna bet if ${creator} can ${action}? Join me, place your bets and let's win some serious cash together! Or create your own challenge and rake it in too! Jump in here:`;
      
      case 'battle':
        const { creatorA = 'Creator A', creatorB = 'Creator B', goal = 'this epic battle' } = challengeData;
        return `Hey! I'm betting big on the epic ${challengeTitle} between ${creatorA} and ${creatorB}—who'll ${goal} first? Join me, place your bets, and let's win some CASH! 💰 This platform is wonderful, you can also create your own battle and cash out! Jump in:`;
      
      case 'aaa':
      default:
        const { action: aaaAction = 'crush this challenge' } = challengeData;
        return `I'm diving into the ${challengeTitle} to ${aaaAction} —bet I can do it? Join me, take on the challenge yourself, and let's see who wins BIG CASH! 💸 Feeling spicy? Create your own challenge and cash in! Dare you to join:`;
    }
  };

  const shareText = generateShareMessage();
  const shareHashtags = 'ChallengeHub,BetBattle,JoinMe';
  const sampleDescription = challengeType === 'battle' 
    ? 'Epic head-to-head battle. Place your bets, watch the stream, win rewards!'
    : challengeType === 'betting'
    ? 'Creator challenge with betting. Place your bets on success or failure!'
    : 'Participate and earn cash upon completion. Join the challenge!';
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  
  const handleShare = (platform: string) => {
    let url = '';
    let text = shareText;
    
    switch (platform) {
      case 'x':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(shareHashtags)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(challengeTitle)}&summary=${encodeURIComponent(sampleDescription)}`;
        break;
      case 'wechat':
        // WeChat doesn't have a direct share URL, so we'll copy to clipboard
        handleCopyLink();
        return;
      case 'imessage':
        url = `sms:&body=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      default:
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Use brand SVGs for better recognition
  const shareOptions = [
    {
      id: 'copy',
      label: 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: 'bg-slate-700/70 hover:bg-slate-600/70'
    },
    {
      id: 'x',
      label: 'X',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" {...props} fill="currentColor">
          <path d="M18.244 2H21l-6.5 7.44L22.5 22H16l-4.6-6.2L6 22H3l7-8L1.5 2H8l4.1 5.6L18.244 2z" />
        </svg>
      ),
      action: () => handleShare('x'),
      color: 'bg-gradient-to-r from-slate-900 to-gray-800 hover:from-black hover:to-gray-900'
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" {...props} fill="currentColor">
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.03 3.66 9.2 8.44 9.93v-7.02H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.73 8.44-4.9 8.44-9.93z"/>
        </svg>
      ),
      action: () => handleShare('facebook'),
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" {...props} fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.2V24h-4v-7.2c0-1.7 0-3.8-2.3-3.8s-2.6 1.8-2.6 3.7V24h-4V8z"/>
        </svg>
      ),
      action: () => handleShare('linkedin'),
      color: 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      action: () => handleShare('whatsapp'),
      color: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
    },
    {
      id: 'wechat',
      label: 'WeChat',
      icon: MessageCircle,
      action: () => handleShare('wechat'),
      color: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
    },
    {
      id: 'imessage',
      label: 'iMessage',
      icon: MessageCircle,
      action: () => handleShare('imessage'),
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
    }
  ];

  // Render in a portal so it doesn't inherit transforms from parent cards
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
              <h3 className="text-xl font-bold text-white">Share Challenge</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-white/80 text-sm mb-2">Share this challenge with friends:</p>
                <p className="text-white font-medium">{challengeTitle}</p>
              </div>
              <div className="mb-6 rounded-2xl border border-slate-600/30 overflow-hidden">
                <div className="bg-slate-700/40 p-4">
                  <div className="text-white font-semibold mb-1">{challengeTitle}</div>
                  <div className="text-white/70 text-sm">{sampleDescription}</div>
                  <div className="text-cyan-300 text-xs mt-2">{shareUrl}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => {
                  const IconComponent: any = option.icon as any;
                  return (
                    <button
                      key={option.id}
                      onClick={option.action}
                      className={`flex items-center gap-2 justify-center py-2.5 px-3 rounded-xl border border-slate-600/30 ${option.color} transition-colors`}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/10">
                        <IconComponent className="w-4 h-4 text-white" />
                      </span>
                      <span className="text-white text-sm font-medium">{option.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/70 ml-auto" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-6 border-t border-slate-600/30">
              <Button
                onClick={onClose}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-2xl transition-colors"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
