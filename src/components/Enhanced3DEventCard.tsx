
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Event } from '../types';

interface Enhanced3DEventCardProps {
  event: Event;
  onView?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

export const Enhanced3DEventCard = ({ event, onView, onEdit, onDelete }: Enhanced3DEventCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="perspective-container"
    >
      <Card className="group relative overflow-hidden neumorphic-card hover-3d cursor-pointer border-0">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-festival-600/20 via-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <Badge 
            className={`absolute top-4 right-4 ${
              event.featured 
                ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white animate-pulse-neon' 
                : 'bg-gray-800/80 text-gray-200'
            }`}
          >
            {event.featured ? 'Featured' : 'Active'}
          </Badge>

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event.id);
                }}
              >
                <Edit className="w-3 h-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                className="w-8 h-8 p-0 bg-red-500/20 backdrop-blur-sm border-red-400/30 hover:bg-red-500/30"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <motion.h3 
            className="text-xl font-bold text-white line-clamp-2 group-hover:text-shadow-glow"
            whileHover={{ scale: 1.02 }}
          >
            {event.title}
          </motion.h3>
          <div className="flex flex-wrap gap-1">
            {event.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs bg-festival-500/20 text-festival-300 border-festival-400/30">
                {category}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-gray-300 line-clamp-2">
            {event.description}
          </p>
          
          <div className="space-y-2">
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-400"
              whileHover={{ x: 5 }}
            >
              <Calendar className="w-4 h-4 text-neon-blue" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-400"
              whileHover={{ x: 5 }}
            >
              <Clock className="w-4 h-4 text-neon-purple" />
              <span>{event.time}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-400"
              whileHover={{ x: 5 }}
            >
              <MapPin className="w-4 h-4 text-green-400" />
              <span className="line-clamp-1">{event.venue}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-400"
              whileHover={{ x: 5 }}
            >
              <Users className="w-4 h-4 text-pink-400" />
              <span>50+ attending</span>
            </motion.div>
          </div>

          {onView && (
            <Button 
              onClick={() => onView(event.id)}
              className="w-full mt-4 festival-gradient text-white font-semibold hover:shadow-neon transition-all duration-300"
            >
              View Details
            </Button>
          )}
        </CardContent>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-festival-500/50 via-neon-blue/50 to-festival-500/50 blur-sm" />
        </div>
      </Card>
    </motion.div>
  );
};
