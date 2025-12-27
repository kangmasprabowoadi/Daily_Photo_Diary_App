import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { MoodSelector } from './mood-selector';

interface DiaryEntryFormProps {
  onSave: (entry: {
    date: Date;
    photo: string;
    mood: string;
    notes: string;
  }) => void;
}

export function DiaryEntryForm({ onSave }: DiaryEntryFormProps) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [notes, setNotes] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (photo && mood) {
      onSave({
        date: new Date(),
        photo,
        mood,
        notes,
      });
      // Reset form
      setPhoto('');
      setMood('');
      setNotes('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full shadow-lg">
          <Camera className="mr-2 h-5 w-5" />
          Add Today's Memory
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Capture Today's Memory</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Photo Upload */}
          <div>
            <Label>Photo</Label>
            <div className="mt-2">
              {!photo ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload a photo
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={photo}
                    alt="Uploaded memory"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setPhoto('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mood Selector */}
          <div>
            <Label>How are you feeling?</Label>
            <MoodSelector selected={mood} onSelect={setMood} />
          </div>

          {/* Notes */}
          <div>
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="What made today special? Write down your thoughts..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-32"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!photo || !mood}>
              Save Memory
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
