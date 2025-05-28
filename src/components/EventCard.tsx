
import { Calendar, MapPin, Clock, Star, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '../types';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
  onBookTickets: (eventId: string) => void;
}

export const EventCard = ({ event, onBookTickets }: EventCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-festival-50 dark:from-gray-800 dark:to-gray-900 border-festival-200 dark:border-gray-700 relative">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-white/20 backdrop-blur border-white/30 hover:bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-white/20 backdrop-blur border-white/30 hover:bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              // Share functionality
            }}
          >
            <Share2 className="w-4 h-4 text-white" />
          </Button>
        </div>

        {/* Featured Badge */}
        {event.featured && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-festival-500 to-festival-600 text-white animate-pulse shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </Badge>
        )}

        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs font-medium text-festival-600 dark:text-festival-400">
            {formatDate(event.date).split(' ')[0]}
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatDate(event.date).split(' ')[2]}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(event.date).split(' ')[1]}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {event.categories.slice(0, 2).map((category) => (
            <Badge 
              key={category} 
              variant="secondary" 
              className="text-xs bg-festival-100 dark:bg-festival-900 text-festival-700 dark:text-festival-300 hover:bg-festival-200 dark:hover:bg-festival-800 transition-colors duration-200"
            >
              {category}
            </Badge>
          ))}
          {event.categories.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{event.categories.length - 2}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl leading-tight group-hover:text-festival-600 dark:group-hover:text-festival-400 transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-festival-600 dark:group-hover:text-festival-400 transition-colors duration-300">
            <Calendar className="w-4 h-4 text-festival-500 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-festival-600 dark:group-hover:text-festival-400 transition-colors duration-300">
            <Clock className="w-4 h-4 text-festival-500 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-festival-600 dark:group-hover:text-festival-400 transition-colors duration-300">
            <MapPin className="w-4 h-4 text-festival-500 flex-shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="pt-2 border-t border-festival-100 dark:border-gray-700">
          <p className="text-xs text-muted-foreground">
            Organized by <span className="font-medium text-festival-600 dark:text-festival-400">{event.organizer}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          onClick={() => onBookTickets(event.id)}
          className="w-full bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group-hover:animate-pulse"
        >
          <Ticket className="w-4 h-4 mr-2" />
          Book Tickets
        </Button>
      </CardFooter>
    </Card>
  );
};
