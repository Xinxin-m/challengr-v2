export interface CurrentUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  level: number;
  title: string;
  location: string;
  followers: number;
  following: number;
  achievements: number;
  isOnline: boolean;
  lastSeen?: string;
  bio: string;
  interests: string[];
  coins: number;
}

export const CURRENT_USER: CurrentUser = {
  id: 'current-user',
  name: 'Alex Johnson',
  username: 'alex_johnson',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  level: 15,
  title: 'Challenge Master',
  location: 'San Francisco, CA',
  followers: 1247,
  following: 89,
  achievements: 23,
  isOnline: true,
  bio: 'Passionate about challenges and community building. Always up for a new adventure!',
  interests: ['fitness', 'running', 'adventure', 'campus-exploration', 'challenges'],
  coins: 2500
};
