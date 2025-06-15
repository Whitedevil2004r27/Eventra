
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Upload, Save } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(1, 'Venue is required'),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function CreateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { addNotification } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        addNotification({
          message: 'Image file must be less than 10MB',
          type: 'error',
        });
        return;
      }
      setImageFile(file);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        message: 'Event created successfully!',
        type: 'success',
      });
      
      reset();
      setImageFile(null);
    } catch (error) {
      addNotification({
        message: 'Failed to create event. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="Creating event..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Create New Event</h1>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5 text-purple-400" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Event Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue" className="text-gray-300">Venue *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="venue"
                    type="text"
                    placeholder="Enter venue location"
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    {...register('venue')}
                  />
                </div>
                {errors.venue && (
                  <p className="text-red-400 text-sm">{errors.venue.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-300">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  className="bg-gray-700 border-gray-600 text-white"
                  {...register('date')}
                />
                {errors.date && (
                  <p className="text-red-400 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-gray-300">Event Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="time"
                    type="time"
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    {...register('time')}
                  />
                </div>
                {errors.time && (
                  <p className="text-red-400 text-sm">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Event Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the event"
                rows={4}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-400 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">Event Image</Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-300">
                    {imageFile ? imageFile.name : 'Click to upload event image'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Event
              </Button>
              <Button type="button" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
