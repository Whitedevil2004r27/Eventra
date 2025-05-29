
import { Star, TrendingUp, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { EventCard } from './EventCard';
import { Event } from '../types';

interface EventsGridProps {
  featuredEvents: Event[];
  filteredEvents: Event[];
  onBookTickets: (eventId: string) => void;
}

export const EventsGrid = ({ featuredEvents, filteredEvents, onBookTickets }: EventsGridProps) => {
  return (
    <>
      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-festival-500" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Events</h3>
            <Badge className="bg-gradient-to-r from-festival-500 to-festival-600 text-white animate-pulse">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="animate-fade-in hover:scale-105 transition-transform duration-300">
                <EventCard
                  event={event}
                  onBookTickets={onBookTickets}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Events Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">All Events</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            {filteredEvents.length} event(s) found
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700">
            <div className="space-y-3">
              <Search className="w-12 h-12 text-muted-foreground mx-auto" />
              <h4 className="text-xl font-semibold">No events found</h4>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard
                  event={event}
                  onBookTickets={onBookTickets}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
