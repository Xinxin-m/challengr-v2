import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Copy, Share2, MessageCircle, 
  ExternalLink, Check
} from 'lucide-react';
import { Button } from './ui/button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
  challengeTitle: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  challengeId,
  challengeTitle
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const shareUrl = `${window.location.origin}/challenge/${challengeId}`;
  const shareText = `Check out this amazing challenge: ${challengeTitle}`;
  
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
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
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
  
  const shareOptions = [
    {
      id: 'copy',
      label: 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: 'bg-slate-600 hover:bg-slate-500'
    },
    {
      id: 'x',
      label: 'Share on X',
      icon: Share2,
      action: () => handleShare('x'),
      color: 'bg-black hover:bg-gray-800'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      action: () => handleShare('whatsapp'),
      color: 'bg-green-600 hover:bg-green-500'
    },
    {
      id: 'wechat',
      label: 'WeChat',
      icon: MessageCircle,
      action: () => handleShare('wechat'),
      color: 'bg-green-500 hover:bg-green-400'
    },
    {
      id: 'imessage',
      label: 'iMessage',
      icon: MessageCircle,
      action: () => handleShare('imessage'),
      color: 'bg-blue-500 hover:bg-blue-400'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
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
            
            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-white/80 text-sm mb-2">Share this challenge with friends:</p>
                <p className="text-white font-medium">{challengeTitle}</p>
              </div>
              
              {/* Share Options */}
              <div className="space-y-3">
                {shareOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={option.action}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border border-slate-600/30 transition-all duration-200 hover:scale-[1.02] ${option.color}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-white/10">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">{option.label}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/60" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
            
            {/* Footer */}
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
    </AnimatePresence>
  );
};
