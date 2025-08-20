import React, { useState } from 'react';
import { Settings, Grid, Bookmark, Tag, MapPin, Calendar, Trophy, Users } from 'lucide-react';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfileView() {
  const [activeTab, setActiveTab] = useState('posts');

  const userStats = {
    posts: 127,
    followers: 2450,
    following: 892,
    challenges: 34
  };

  const userPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=300&fit=crop',
      likes: 145,
      comments: 23
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=300&fit=crop',
      likes: 89,
      comments: 12
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      likes: 203,
      comments: 34
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=300&fit=crop',
      likes: 167,
      comments: 28
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=300&fit=crop',
      likes: 234,
      comments: 45
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop',
      likes: 178,
      comments: 31
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
        {/* Profile Picture */}
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-gradient-to-r from-purple-500 to-pink-500">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white border-4 border-background">
            <Trophy size={20} />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
            <h1 className="text-2xl font-bold mb-2 md:mb-0">John Doe</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 mb-4">
            <div className="text-center">
              <p className="font-bold text-lg">{userStats.posts}</p>
              <p className="text-sm text-muted-foreground">posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{userStats.followers}</p>
              <p className="text-sm text-muted-foreground">followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{userStats.following}</p>
              <p className="text-sm text-muted-foreground">following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{userStats.challenges}</p>
              <p className="text-sm text-muted-foreground">challenges</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h2 className="font-semibold">Creative Developer & Challenge Enthusiast</h2>
            <p className="text-muted-foreground">
              Building amazing things one challenge at a time 🚀<br/>
              Love coding, design, and fitness challenges!
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Joined March 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts" className="flex items-center space-x-2">
            <Grid size={16} />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center space-x-2">
            <Trophy size={16} />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center space-x-2">
            <Bookmark size={16} />
            <span className="hidden sm:inline">Saved</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center space-x-2">
            <Tag size={16} />
            <span className="hidden sm:inline">Tagged</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-8">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {userPosts.map((post) => (
              <div key={post.id} className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer">
                <ImageWithFallback
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span className="font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span className="font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-8">
          <div className="text-center py-16">
            <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Challenges</h3>
            <p className="text-muted-foreground">Challenges you've created and participated in will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-8">
          <div className="text-center py-16">
            <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Saved Posts</h3>
            <p className="text-muted-foreground">Posts you've saved will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-8">
          <div className="text-center py-16">
            <Tag size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tagged Posts</h3>
            <p className="text-muted-foreground">Posts you're tagged in will appear here</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}