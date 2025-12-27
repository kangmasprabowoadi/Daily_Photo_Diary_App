import React from 'react';
import { Smile, Heart, Star, Meh, Frown, Sparkles, Sun, CloudRain } from 'lucide-react';
import { cn } from './ui/utils';

interface MoodSelectorProps {
  selected: string;
  onSelect: (mood: string) => void;
}

const moods = [
  { id: 'amazing', label: 'Amazing', icon: Sparkles, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-950' },
  { id: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-950' },
  { id: 'loved', label: 'Loved', icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-950' },
  { id: 'peaceful', label: 'Peaceful', icon: Sun, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-950' },
  { id: 'excited', label: 'Excited', icon: Star, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-950' },
  { id: 'okay', label: 'Okay', icon: Meh, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'sad', label: 'Sad', icon: Frown, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-950' },
  { id: 'stressed', label: 'Stressed', icon: CloudRain, color: 'text-slate-500', bgColor: 'bg-slate-100 dark:bg-slate-800' },
];

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-3 mt-2">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selected === mood.id;
        return (
          <button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105',
              isSelected
                ? `border-current ${mood.color} ${mood.bgColor}`
                : 'border-transparent bg-accent/50 hover:bg-accent'
            )}
          >
            <Icon className={cn('h-6 w-6', isSelected ? mood.color : 'text-muted-foreground')} />
            <span className="text-xs">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
}
