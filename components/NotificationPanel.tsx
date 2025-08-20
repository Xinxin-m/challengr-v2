import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Heart, MessageCircle, Users, Trophy, Coins, Gem, Share2, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: any[];
  onMarkAsRead?: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'challenge' | 'token' | 'share';
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  tokenReward?: number;
  post?: {
    image: string;
    title: string;
  };
}

export function NotificationPanel({ isOpen, onClose, notifications: externalNotifications, onMarkAsRead: externalMarkAsRead }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'token',
      user: {
        name: 'EduChain System',
        avatar: '💰',
        username: 'system'
      },
      content: 'Daily ZXM-C airdrop received!',
      timestamp: '2 minutes ago',
      isRead: false,
      tokenReward: 100
    },
    {
      id: '2',
      type: 'like',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2c159cb?w=40&h=40&fit=crop&crop=face',
        username: 'sarahchen'
      },
      content: 'liked your challenge completion post',
      timestamp: '5 minutes ago',
      isRead: false,
      tokenReward: 5,
      post: {
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=60&fit=crop',
        title: 'React Todo Challenge'
      }
    },
    {
      id: '3',
      type: 'comment',
      user: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        username: 'mikej'
      },
      content: 'commented: "Great solution! Love the clean code structure."',
      timestamp: '12 minutes ago',
      isRead: false,
      tokenReward: 10,
      post: {
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=60&fit=crop',
        title: 'React Todo Challenge'
      }
    },
    {
      id: '4',
      type: 'follow',
      user: {
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        username: 'alexr'
      },
      content: 'started following you',
      timestamp: '1 hour ago',
      isRead: false,
      tokenReward: 20
    },
    {
      id: '5',
      type: 'challenge',
      user: {
        name: 'Emma Watson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        username: 'emmaw'
      },
      content: 'completed your challenge "Design a Mobile App UI"',
      timestamp: '2 hours ago',
      isRead: true,
      tokenReward: 50
    },
    {
      id: '6',
      type: 'share',
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        username: 'davidk'
      },
      content: 'shared your post',
      timestamp: '3 hours ago',
      isRead: true,
      tokenReward: 15,
      post: {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop',
        title: 'UI Design Tips'
      }
    }
  ]);

  // ESC key handler for emergency exit
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
    if (externalMarkAsRead) {
      externalMarkAsRead(id);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'token':
        return <Coins className="w-4 h-4 text-yellow-600" />;
      case 'share':
        return <Share2 className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });

  const handleClose = () => {
    console.log('NotificationPanel: Close triggered');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log('NotificationPanel: Backdrop clicked');
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
        className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        {/* Emergency Close Button - Fixed Position */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="fixed top-4 right-4 z-[60]"
        >
          <Button 
            onClick={handleClose}
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 p-0 shadow-lg border-2 border-white dark:border-gray-800"
          >
            <X size={24} strokeWidth={3} />
          </Button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0, x: 300 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0.9, opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
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
                  >
                    <Bell className="w-5 h-5 text-purple-500" />
                  </motion.div>
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClose}
                    className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 rounded-full w-8 h-8 p-0"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* Close instruction text */}
              <div className="text-xs text-muted-foreground text-center mt-2 opacity-75">
                Press ESC or click outside to close
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="token">Tokens</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-3 mt-4">
                  <AnimatePresence>
                    {filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => markAsRead(notification.id)}
                        className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          !notification.isRead 
                            ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800' 
                            : 'bg-muted/50 border-border hover:bg-muted/80'
                        }`}
                      >
                        {!notification.isRead && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                        
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            {notification.user.avatar.startsWith('http') ? (
                              <Avatar className="w-10 h-10">
                                <img
                                  src={notification.user.avatar}
                                  alt={notification.user.name}
                                  className="w-full h-full object-cover"
                                />
                              </Avatar>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
                                {notification.user.avatar}
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border border-border">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{notification.user.name}</span>
                              {notification.tokenReward && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full"
                                >
                                  <Coins className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                                  <span className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">
                                    +{notification.tokenReward}
                                  </span>
                                </motion.div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {notification.content}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {notification.timestamp}
                              </span>
                              {notification.post && (
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={notification.post.image}
                                    alt={notification.post.title}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                  <span className="text-xs text-muted-foreground truncate max-w-20">
                                    {notification.post.title}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔔</div>
                      <h3 className="text-lg font-medium mb-2">No notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        You're all caught up! Check back later.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Additional Close Button at Bottom */}
              <div className="pt-4 border-t border-border/50">
                <Button 
                  onClick={handleClose}
                  variant="outline" 
                  className="w-full"
                >
                  Close Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}