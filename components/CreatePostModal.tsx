import React, { useState } from 'react';
import { X, Image, MapPin, Tag, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CreatePostModalProps {
  onClose: () => void;
}

export function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = () => {
    // In a real app, this would open a file picker
    setSelectedImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
          <h2 className="font-bold">Create Post</h2>
          <Button 
            size="sm" 
            disabled={!postText.trim() && !selectedImage}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Share
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-10 h-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">@johndoe</p>
            </div>
          </div>

          {/* Text Input */}
          <Textarea
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="border-none resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0 min-h-32"
          />

          {/* Selected Image */}
          {selectedImage && (
            <div className="relative mt-4 rounded-xl overflow-hidden">
              <ImageWithFallback
                src={selectedImage}
                alt="Selected"
                className="w-full h-64 object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setSelectedImage(null)}
              >
                <X size={16} />
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleImageSelect}>
                <Image size={20} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="sm">
                <MapPin size={20} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="sm">
                <Tag size={20} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile size={20} className="text-muted-foreground" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {280 - postText.length} characters left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}