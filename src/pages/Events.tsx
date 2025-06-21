import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Users, User, Settings as SettingsIcon, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Header } from '../components/Header';
import { Enhanced3DEventCard } from '../components/Enhanced3DEventCard';
import { EventDetailsModal } from '../components/EventDetailsModal';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { MobileNavigation } from '../components/MobileNavigation';
import { BackButton } from '../components/BackButton';
import { events } from '../data/events';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [currentState, setCurrentState] = useState<string>('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEventForModal, setSelectedEventForModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all-events');
  const navigate = useNavigate();

  const handleViewEvent = (eventId: string) => {
    setSelectedEventForModal(eventId);
  };

  const handleBookTickets = (eventId: string) => {
    navigate(`/?event=${eventId}&action=book`);
  };

  const handleEventsClick = () => {
    setCurrentState('events');
    setActiveTab('all-events');
  };

  const handleOrdersClick = () => {
    setCurrentState('orders');
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(events.flatMap(event => event.categories)))];
  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const pastEvents = events.filter(event => new Date(event.date) <= new Date());
  const selectedEventDetails = selectedEventForModal ? events.find(e => e.id === selectedEventForModal) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <Header 
        currentState={currentState}
        onEventsClick={handleEventsClick}
        onOrdersClick={handleOrdersClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header with Back Button */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BackButton fallbackPath="/" />
            <div>
              <motion.h1 
                className="text-5xl font-bold gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Events Hub
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Discover, book, and manage all your events in one place
              </motion.p>
            </div>
          </motion.div>

          {/* Enhanced Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </motion.div>

          {/* Create Event Button */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => navigate('/create-event')}
              className="festival-gradient text-white font-semibold hover:shadow-neon transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
          </motion.div>

          {/* Main Content with Enhanced Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-12 glass-card backdrop-blur-md border-0">
                <TabsTrigger 
                  value="all-events" 
                  className="flex items-center gap-2 text-sm data-[state=active]:bg-festival-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  All Events
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings" 
                  className="flex items-center gap-2 text-sm data-[state=active]:bg-festival-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <Users className="w-4 h-4" />
                  My Bookings
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-2 text-sm data-[state=active]:bg-festival-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 text-sm data-[state=active]:bg-festival-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <SettingsIcon className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* All Events Tab */}
              <TabsContent value="all-events" className="space-y-8">
                {/* Featured Events Section */}
                {featuredEvents.length > 0 && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <motion.h2 
                        className="text-3xl font-bold text-white"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        Featured Events
                      </motion.h2>
                      <Badge className="bg-gradient-to-r from-festival-500 to-festival-600 text-white animate-pulse-neon">
                        {featuredEvents.length} Featured
                      </Badge>
                    </div>
                    <motion.div 
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {featuredEvents.slice(0, 3).map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Enhanced3DEventCard
                            event={event}
                            onView={handleViewEvent}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Upcoming Events */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.filter(event => {
                      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
                      const matchesCategory = selectedCategory === 'all' || event.categories.includes(selectedCategory);
                      return matchesSearch && matchesCategory;
                    }).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Enhanced3DEventCard
                          event={event}
                          onView={handleViewEvent}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Past Events */}
                {pastEvents.length > 0 && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-white">Past Events</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastEvents.slice(0, 6).map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="opacity-75 hover:opacity-100 transition-opacity duration-300 neumorphic-card border-0">
                            <div className="relative overflow-hidden">
                              <img 
                                src={event.image} 
                                alt={event.title}
                                className="w-full h-48 object-cover"
                              />
                              <Badge className="absolute top-4 left-4 bg-gray-500 text-white">
                                Past Event
                              </Badge>
                            </div>
                            <CardHeader className="pb-3">
                              <CardTitle className="line-clamp-2 text-white">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm text-gray-400">
                                {new Date(event.date).toLocaleDateString()} • {event.venue}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="animate-fade-in">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">My Bookings</CardTitle>
                    <p className="text-gray-400">Manage your event bookings and tickets</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-white">No Bookings Yet</h3>
                      <p className="text-gray-400 mb-6">Start browsing events to make your first booking!</p>
                      <Button 
                        onClick={() => setActiveTab('all-events')} 
                        className="festival-gradient text-white hover:shadow-neon transition-all duration-300"
                      >
                        Browse Events
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="animate-fade-in">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl">Profile Settings</CardTitle>
                    <p className="text-muted-foreground">Manage your personal information and preferences</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Profile Management</h3>
                      <p className="text-muted-foreground mb-6">Update your personal details and preferences</p>
                      <Button onClick={() => navigate('/profile')} className="festival-gradient text-white">
                        Go to Full Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="animate-fade-in">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl">Account Settings</CardTitle>
                    <p className="text-muted-foreground">Configure your account preferences and security</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <SettingsIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Settings & Preferences</h3>
                      <p className="text-muted-foreground mb-6">Manage your account settings and privacy preferences</p>
                      <Button onClick={() => navigate('/settings')} className="festival-gradient text-white">
                        Go to Full Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEventDetails}
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
      />

      <MobileNavigation
        currentState={currentState}
        onEventsClick={handleEventsClick}
        onOrdersClick={handleOrdersClick}
      />
    </div>
  );
};

export default Events;
