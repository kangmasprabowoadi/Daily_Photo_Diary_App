import React, { useState, useEffect } from 'react';
import { DiaryEntryForm } from './components/diary-entry-form';
import { TimelineView, DiaryEntry } from './components/timeline-view';
import { Calendar, Image } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('diaryEntries');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        }));
        setEntries(entriesWithDates);
      } catch (error) {
        console.error('Failed to load entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleSaveEntry = (newEntry: Omit<DiaryEntry, 'id'>) => {
    const entry: DiaryEntry = {
      ...newEntry,
      id: crypto.randomUUID(),
    };
    setEntries((prev) => [...prev, entry]);
    toast.success('Memory saved successfully! 📸');
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                <Image className="h-6 w-6" />
              </div>
              <div>
                <h1>My Photo Diary</h1>
                <p className="text-sm text-muted-foreground">
                  Capture life's moments, one photo at a time
                </p>
              </div>
            </div>
            <DiaryEntryForm onSave={handleSaveEntry} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Timeline View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <TimelineView entries={entries} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      {entries.length > 0 && (
        <footer className="border-t mt-16 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            {entries.length} {entries.length === 1 ? 'memory' : 'memories'} captured
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
