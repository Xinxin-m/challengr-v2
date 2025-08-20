import React from 'react';
import { motion } from 'motion/react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface FiltersPanelProps {
  filters: {
    difficulty: string;
    category: string;
    priceRange: string;
    duration: string;
    rating: number;
    isOnline: boolean;
    hasCertificate: boolean;
  };
  onFiltersChange: (filters: any) => void;
  onClose?: () => void;
}

export function FiltersPanel({ filters, onFiltersChange, onClose }: FiltersPanelProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      difficulty: 'all',
      category: 'all',
      priceRange: 'all',
      duration: 'all',
      rating: 0,
      isOnline: false,
      hasCertificate: false
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== 'all' && value !== 0 && value !== false
  ).length;

  const difficultyOptions = [
    { value: 'all', label: 'All Levels', icon: '🌟', color: 'bg-gray-100 dark:bg-gray-800' },
    { value: 'beginner', label: 'Beginner', icon: '🌱', color: 'bg-green-100 dark:bg-green-900' },
    { value: 'intermediate', label: 'Intermediate', icon: '🔥', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { value: 'advanced', label: 'Advanced', icon: '💪', color: 'bg-red-100 dark:bg-red-900' },
    { value: 'expert', label: 'Expert', icon: '🚀', color: 'bg-purple-100 dark:bg-purple-900' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: '📚' },
    { value: 'coding', label: 'Coding', icon: '💻' },
    { value: 'design', label: 'Design', icon: '🎨' },
    { value: 'fitness', label: 'Fitness', icon: '💪' },
    { value: 'creativity', label: 'Creativity', icon: '✨' },
    { value: 'learning', label: 'Learning', icon: '📖' },
    { value: 'business', label: 'Business', icon: '💼' }
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices', icon: '💰' },
    { value: 'free', label: 'Free', icon: '🆓' },
    { value: 'low', label: '$1 - $25', icon: '💵' },
    { value: 'medium', label: '$26 - $100', icon: '💶' },
    { value: 'high', label: '$100+', icon: '💷' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration', icon: '⏰' },
    { value: 'short', label: '< 1 hour', icon: '⚡' },
    { value: 'medium', label: '1-5 hours', icon: '🕐' },
    { value: 'long', label: '> 5 hours', icon: '📅' },
    { value: 'course', label: 'Multi-day', icon: '🗓️' }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-bold">Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Difficulty Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Difficulty Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {difficultyOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => updateFilter('difficulty', option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                filters.difficulty === option.value
                  ? `${option.color} border-2 border-purple-300 dark:border-purple-600`
                  : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categoryOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => updateFilter('category', option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                filters.category === option.value
                  ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-600'
                  : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {priceOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => updateFilter('priceRange', option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                filters.priceRange === option.value
                  ? 'bg-green-100 dark:bg-green-900 border-2 border-green-300 dark:border-green-600'
                  : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Duration Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {durationOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => updateFilter('duration', option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                filters.duration === option.value
                  ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-600'
                  : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => updateFilter('rating', value[0])}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Any rating</span>
            <div className="flex items-center space-x-1">
              <span className="font-medium">{filters.rating}</span>
              <span className="text-yellow-500">⭐</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="online" className="flex items-center space-x-2">
              <span className="text-lg">💻</span>
              <span>Online Only</span>
            </Label>
            <Switch
              id="online"
              checked={filters.isOnline}
              onCheckedChange={(checked) => updateFilter('isOnline', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <Label htmlFor="certificate" className="flex items-center space-x-2">
              <span className="text-lg">🏆</span>
              <span>Has Certificate</span>
            </Label>
            <Switch
              id="certificate"
              checked={filters.hasCertificate}
              onCheckedChange={(checked) => updateFilter('hasCertificate', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Apply Button */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm p-4 border-t border-border">
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          Apply Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}