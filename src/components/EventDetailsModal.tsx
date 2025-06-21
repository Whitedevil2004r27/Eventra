
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Clock, Mail, Phone, Download, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Event } from '../types';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailsModal = ({ event, isOpen, onClose }: EventDetailsModalProps) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-gray-900 border-gray-700">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative"
            >
              {/* Hero Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 p-0 bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.h1 
                    className="text-3xl font-bold text-white mb-2 text-shadow-glow"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {event.title}
                  </motion.h1>
                  <div className="flex flex-wrap gap-2">
                    {event.categories.map((category) => (
                      <Badge key={category} className="bg-festival-500/80 text-white">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div 
                    className="glass-card p-3 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                    <div className="text-xs text-gray-400">Date</div>
                    <div className="text-sm font-semibold text-white">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="glass-card p-3 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                    <div className="text-xs text-gray-400">Time</div>
                    <div className="text-sm font-semibold text-white">{event.time}</div>
                  </motion.div>

                  <motion.div 
                    className="glass-card p-3 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-xs text-gray-400">Venue</div>
                    <div className="text-sm font-semibold text-white line-clamp-1">{event.venue}</div>
                  </motion.div>

                  <motion.div 
                    className="glass-card p-3 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                    <div className="text-xs text-gray-400">Attending</div>
                    <div className="text-sm font-semibold text-white">150+</div>
                  </motion.div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">About This Event</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                {/* Organizer Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Event Organizer</h3>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-festival-500 to-neon-blue rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Eventra Events</div>
                          <div className="text-sm text-gray-400">Professional Event Organizer</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span>contact@eventra.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Phone className="w-4 h-4" />
                          <span>+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Event Stats</h3>
                    <div className="space-y-3">
                      <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                        <span className="text-gray-300">Total Capacity</span>
                        <span className="font-semibold text-white">500</span>
                      </div>
                      <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                        <span className="text-gray-300">Tickets Sold</span>
                        <span className="font-semibold text-green-400">150</span>
                      </div>
                      <div className="glass-card p-3 rounded-lg flex justify-between items-center">
                        <span className="text-gray-300">Available</span>
                        <span className="font-semibold text-neon-blue">350</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 festival-gradient text-white font-semibold hover:shadow-neon">
                    Book Tickets
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download Info
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
