import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Info, AlertTriangle, Target, MessageSquare, Trophy, Brain, Music, BookOpen, Palette, Dumbbell, Coffee, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useNotifications } from '../contexts/NotificationContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample invitation data
const sampleInvitations = [
  {
    id: 'inv-1',
    type: 'challenge-invitation',
    title: 'Dr. Mind Puzzle invited you to "Ultimate Logic Challenge"',
    message: 'Join this brain-bending puzzle that only 2% can solve!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    challengeId: 'einstein-riddle-2024',
    inviter: 'Dr. Mind Puzzle',
    challengeName: 'Ultimate Logic Challenge'
  },
  {
    id: 'inv-2',
    type: 'challenge-invitation',
    title: 'Sarah Beat Master invited you to "Dance Fusion Challenge"',
    message: 'Show off your moves in this epic dance battle!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    challengeId: 'dance-fusion-2024',
    inviter: 'Sarah Beat Master',
    challengeName: 'Dance Fusion Challenge'
  },
  {
    id: 'inv-3',
    type: 'challenge-invitation',
    title: 'Alex Fitness Pro invited you to "30-Day Transform"',
    message: 'Transform your body and mind with this comprehensive challenge!',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    challengeId: '30-day-transform',
    inviter: 'Alex Fitness Pro',
    challengeName: '30-Day Transform'
  }
];

// Sample DM data
const sampleDMs = [
  {
    id: 'dm-1',
    type: 'direct-message',
    title: 'Hey! Loved your AI art submission',
    message: 'Want to collaborate? I\'m working on a new dance challenge and thought we could combine your AI visuals with my choreography!',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    sender: 'Sarah Beat Master',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b60ad193?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'dm-2',
    type: 'direct-message',
    title: 'Great work on the fitness challenge!',
    message: 'Your transformation was incredible. Would you be interested in being a mentor for my upcoming fitness group?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    read: false,
    sender: 'Alex Fitness Pro',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'dm-3',
    type: 'direct-message',
    title: 'Puzzle collaboration idea',
    message: 'I saw your logic challenge solutions. Want to create a collaborative puzzle series together?',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    sender: 'Dr. Mind Puzzle',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
];

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, markAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState('notifications');
  const [invitations, setInvitations] = useState(sampleInvitations);
  const [dms, setDms] = useState(sampleDMs);
  const [hasViewedTabs, setHasViewedTabs] = useState({ notifications: false, invitations: false, dms: false });
  const [showScrollBar, setShowScrollBar] = useState(false);
  const hideBarTimer = React.useRef<number | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // When panel opens, consider tabs viewed to hide dots
  useEffect(() => {
    if (isOpen) {
      setHasViewedTabs({ notifications: true, invitations: true, dms: true });
    }
  }, [isOpen]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadInvitations = invitations.filter(n => !n.read).length;
  const unreadDMs = dms.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Trophy className="w-5 h-5 text-yellow-300" />;
      case 'info':
        return <Info className="w-5 h-5 text-sky-300" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-300" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-300" />;
      default:
        return <Bell className="w-5 h-5 text-purple-300" />;
    }
  };

  const getInvitationIcon = (challengeName: string) => {
    if (challengeName.includes('Logic') || challengeName.includes('Puzzle')) {
      return <Brain className="w-5 h-5 text-white" />;
    } else if (challengeName.includes('Dance')) {
      return <Music className="w-5 h-5 text-white" />;
    } else if (challengeName.includes('Fitness') || challengeName.includes('Transform')) {
      return <Dumbbell className="w-5 h-5 text-white" />;
    } else if (challengeName.includes('Art')) {
      return <Palette className="w-5 h-5 text-white" />;
    } else if (challengeName.includes('Study')) {
      return <BookOpen className="w-5 h-5 text-white" />;
    } else if (challengeName.includes('Food')) {
      return <Coffee className="w-5 h-5 text-white" />;
    } else if (challengeName.includes('Travel')) {
      return <Globe className="w-5 h-5 text-white" />;
    }
    return <Target className="w-5 h-5 text-white" />;
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Colorful gradient background */}
          <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 rounded-3xl shadow-2xl overflow-hidden min-h-[80vh]">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-blue-700/25 to-pink-700/25"></div>

            
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <Button 
                onClick={handleClose}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 p-0 backdrop-blur-sm border border-white/20"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <Bell className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white">Notifications</h2>
                  <p className="text-white/70 text-sm">Attune to the Pulse of Your Cultivation Journey</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="relative px-6">
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setHasViewedTabs(prev => ({ ...prev, [v]: true } as any)); }}>
                <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10">
                  <TabsTrigger 
                    value="notifications" 
                    className="data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/70"
                  >
                    <div className="relative">
                      <Bell className="w-4 h-4 mr-2" />
                      {unreadNotifications > 0 && !hasViewedTabs.notifications && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                      )}
                    </div>
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="invitations" 
                    className="data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/70"
                  >
                    <div className="relative">
                      <Target className="w-4 h-4 mr-2" />
                      {unreadInvitations > 0 && !hasViewedTabs.invitations && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                      )}
                    </div>
                    Invitations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dms" 
                    className="data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/70"
                  >
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {unreadDMs > 0 && !hasViewedTabs.dms && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-400 rounded-full"></span>
                      )}
                    </div>
                    DMs
                  </TabsTrigger>
                </TabsList>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-4">
                  <div
                    ref={scrollAreaRef}
                    onScroll={() => {
                      if (!scrollAreaRef.current) return;
                      if (hideBarTimer.current) window.clearTimeout(hideBarTimer.current);
                      setShowScrollBar(true);
                      hideBarTimer.current = window.setTimeout(() => setShowScrollBar(false), 1000);
                    }}
                    className="relative space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0"
                    style={{ paddingRight: '8px' }}
                  >
                    {showScrollBar && (
                      <div className="pointer-events-none absolute top-0 right-2 h-full w-1 bg-gradient-to-b from-yellow-400 via-amber-500 to-fuchsia-500 rounded-full" />
                    )}
                  <AnimatePresence>
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => markAsRead(notification.id)}
                        className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 active:outline-none active:ring-0 ${
                          !notification.read 
                            ? 'bg-white/10 backdrop-blur-sm border-white/10 shadow-lg' 
                            : 'bg-white/5 backdrop-blur-sm border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {!notification.read && (
                          <motion.div 
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        )}
                        
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            {!notification.read && (
                              <motion.div
                                className="absolute -inset-0.5 rounded-full bg-yellow-400 opacity-90 blur-[4px] z-0"
                                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                            <div className="relative z-10 w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-white">{notification.title}</span>
                            </div>
                            <p className="text-sm text-white/80 mb-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/60">
                                {notification.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  </div>
                  
                  {notifications.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔔</div>
                      <h3 className="text-lg font-medium mb-2 text-white">No notifications</h3>
                      <p className="text-sm text-white/60">
                        You're all caught up! Check back later.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Invitations Tab */}
                <TabsContent value="invitations" className="mt-4">
                  <div
                    className="relative space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide"
                    style={{ paddingRight: '8px' }}
                    onScroll={() => {
                      if (hideBarTimer.current) window.clearTimeout(hideBarTimer.current);
                      setShowScrollBar(true);
                      hideBarTimer.current = window.setTimeout(() => setShowScrollBar(false), 1000);
                    }}
                  >
                    {showScrollBar && (
                      <div className="pointer-events-none absolute top-0 right-2 h-full w-1 bg-gradient-to-b from-yellow-400 via-amber-500 to-fuchsia-500 rounded-full" />
                    )}
                  <AnimatePresence>
                    {invitations.map((invitation, index) => (
                      <motion.div
                        key={invitation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setInvitations(prev => prev.map(i => i.id === invitation.id ? { ...i, read: true } : i))}
                        className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 ${
                          !invitation.read 
                            ? 'bg-white/10 backdrop-blur-sm border-white/10 shadow-lg' 
                            : 'bg-white/5 backdrop-blur-sm border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {!invitation.read && (
                          <motion.div 
                            className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        )}
                        
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            {!invitation.read && (
                              <motion.div
                                className="absolute -inset-0.5 rounded-full bg-yellow-400 opacity-90 blur-[3px] z-0"
                                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                            <div className="relative z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              {getInvitationIcon(invitation.challengeName)}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-white">{invitation.title}</span>
                            </div>
                            <p className="text-sm text-white/80 mb-1">
                              {invitation.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/60">
                                {invitation.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  </div>
                </TabsContent>

                {/* DMs Tab */}
                <TabsContent value="dms" className="mt-4">
                  <div
                    className="relative space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide"
                    style={{ paddingRight: '8px' }}
                    onScroll={() => {
                      if (hideBarTimer.current) window.clearTimeout(hideBarTimer.current);
                      setShowScrollBar(true);
                      hideBarTimer.current = window.setTimeout(() => setShowScrollBar(false), 1000);
                    }}
                  >
                    {showScrollBar && (
                      <div className="pointer-events-none absolute top-0 right-2 h-full w-1 bg-gradient-to-b from-yellow-400 via-amber-500 to-fuchsia-500 rounded-full" />
                    )}
                  <AnimatePresence>
                    {dms.map((dm, index) => (
                      <motion.div
                        key={dm.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setDms(prev => prev.map(m => m.id === dm.id ? { ...m, read: true } : m))}
                        className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 ${
                          !dm.read 
                            ? 'bg-white/10 backdrop-blur-sm border-white/10 shadow-lg' 
                            : 'bg-white/5 backdrop-blur-sm border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {!dm.read && (
                          <motion.div 
                            className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        )}
                        
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            {!dm.read && (
                              <motion.div
                                className="absolute -inset-0.5 rounded-full bg-sky-400 opacity-80 blur-[4px] z-0"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                            <img 
                              src={dm.senderAvatar} 
                              alt={dm.sender}
                              className="relative z-10 w-10 h-10 rounded-full object-cover border-2 border-white/40"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-white">{dm.title}</span>
                            </div>
                            <p className="text-sm text-white/80 mb-1">
                              {dm.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/60">
                                {dm.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom padding */}
            <div className="p-6 pt-4"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}