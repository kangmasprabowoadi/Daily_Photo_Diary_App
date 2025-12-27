import React, { useState } from 'react';
import { format } from 'date-fns';
import { Smile, Heart, Star, Meh, Frown, Sparkles, Sun, CloudRain, Calendar, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export interface DiaryEntry {
  id: string;
  date: Date;
  photo: string;
  mood: string;
  notes: string;
}

interface TimelineViewProps {
  entries: DiaryEntry[];
}

const moodConfig: Record<string, { label: string; icon: any; color: string }> = {
  amazing: { label: 'Amazing', icon: Sparkles, color: 'text-purple-500' },
  happy: { label: 'Happy', icon: Smile, color: 'text-yellow-500' },
  loved: { label: 'Loved', icon: Heart, color: 'text-pink-500' },
  peaceful: { label: 'Peaceful', icon: Sun, color: 'text-orange-500' },
  excited: { label: 'Excited', icon: Star, color: 'text-blue-500' },
  okay: { label: 'Okay', icon: Meh, color: 'text-gray-500' },
  sad: { label: 'Sad', icon: Frown, color: 'text-indigo-500' },
  stressed: { label: 'Stressed', icon: CloudRain, color: 'text-slate-500' },
};

export function TimelineView({ entries }: TimelineViewProps) {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const filteredEntries =
    selectedMoods.length === 0
      ? entries
      : entries.filter((entry) => selectedMoods.includes(entry.mood));

  const sortedEntries = [...filteredEntries].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Calendar className="h-20 w-20 text-muted-foreground mb-4" />
        <h3 className="mb-2">No Memories Yet</h3>
        <p className="text-muted-foreground max-w-md">
          Start capturing your daily moments with photos and moods. Your memory timeline will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {sortedEntries.length} {sortedEntries.length === 1 ? 'memory' : 'memories'}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Mood
              {selectedMoods.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedMoods.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.entries(moodConfig).map(([mood, config]) => {
              const Icon = config.icon;
              return (
                <DropdownMenuCheckboxItem
                  key={mood}
                  checked={selectedMoods.includes(mood)}
                  onCheckedChange={() => toggleMood(mood)}
                >
                  <Icon className={`mr-2 h-4 w-4 ${config.color}`} />
                  {config.label}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        {/* Entries */}
        <div className="space-y-8">
          {sortedEntries.map((entry) => {
            const mood = moodConfig[entry.mood];
            const Icon = mood?.icon || Smile;

            return (
              <div key={entry.id} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full border-4 border-background bg-accent ${mood?.color || ''}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                </div>

                {/* Entry card */}
                <Card className="flex-1 overflow-hidden">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={entry.photo}
                      alt={`Memory from ${format(entry.date, 'PPP')}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3>{format(entry.date, 'EEEE, MMMM d, yyyy')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(entry.date, 'h:mm a')}
                        </p>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Icon className={`h-3 w-3 ${mood?.color || ''}`} />
                        {mood?.label || entry.mood}
                      </Badge>
                    </div>
                    {entry.notes && (
                      <p className="text-muted-foreground">{entry.notes}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
