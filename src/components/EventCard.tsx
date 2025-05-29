
import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onBookTickets: (eventId: string) => void;
}

export const EventCard = ({ event, onBookTickets }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-festival-50 border-festival-200">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-festival-500 text-white animate-pulse-glow">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {event.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <h3 className="font-bold text-lg leading-tight group-hover:text-festival-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-festival-500" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-festival-500" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-festival-500" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => onBookTickets(event.id)}
          className="w-full bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Book Tickets
        </Button>
      </CardFooter>
    </Card>
  );
};
