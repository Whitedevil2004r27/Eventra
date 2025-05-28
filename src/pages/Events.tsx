
import { useState } from 'react';
import { Calendar, Users, User, Settings as SettingsIcon, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Header } from '../components/Header';
import { EventsGrid } from '../components/EventsGrid';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { MobileNavigation } from '../components/MobileNavigation';
import { events } from '../data/events';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [currentState, setCurrentState] = useState<string>('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all-events');
  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate(-1);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-festival-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 transition-colors duration-300">
      <Header 
        currentState={currentState}
        onEventsClick={handleEventsClick}
        onOrdersClick={handleOrdersClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header with Back Button */}
          <div className="flex items-center gap-4 animate-fade-in">
            <Button 
              variant="outline" 
              onClick={handleGoBack}
              className="hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-5xl font-bold gradient-text">Events Hub</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Discover, book, and manage all your events in one place
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {/* Main Content with Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
              <TabsTrigger value="all-events" className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                All Events
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 text-sm">
                <SettingsIcon className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* All Events Tab */}
            <TabsContent value="all-events" className="space-y-8 animate-fade-in">
              {/* Featured Events Section */}
              {featuredEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Events</h2>
                    <Badge className="bg-gradient-to-r from-festival-500 to-festival-600 text-white">
                      {featuredEvents.length} Featured
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredEvents.slice(0, 3).map((event) => (
                      <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                        <div className="relative overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <Badge className="absolute top-4 left-4 bg-festival-500 text-white">
                            Featured
                          </Badge>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                          <div className="flex flex-wrap gap-1">
                            {event.categories.slice(0, 2).map((category) => (
                              <Badge key={category} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {event.description}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="text-sm">
                              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm">
                              <strong>Time:</strong> {event.time}
                            </div>
                            <div className="text-sm">
                              <strong>Venue:</strong> {event.venue}
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleBookTickets(event.id)}
                            className="w-full festival-gradient text-white"
                          >
                            Register Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Events */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
                <EventsGrid
                  featuredEvents={[]}
                  filteredEvents={upcomingEvents.filter(event => {
                    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
                    const matchesCategory = selectedCategory === 'all' || event.categories.includes(selectedCategory);
                    return matchesSearch && matchesCategory;
                  })}
                  onBookTickets={handleBookTickets}
                />
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Past Events</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.slice(0, 6).map((event) => (
                      <Card key={event.id} className="opacity-75 hover:opacity-100 transition-opacity duration-300">
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
                          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} • {event.venue}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="animate-fade-in">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">My Bookings</CardTitle>
                  <p className="text-muted-foreground">Manage your event bookings and tickets</p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
                    <p className="text-muted-foreground mb-6">Start browsing events to make your first booking!</p>
                    <Button onClick={() => setActiveTab('all-events')} className="festival-gradient text-white">
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
        </div>
      </main>

      <MobileNavigation
        currentState={currentState}
        onEventsClick={handleEventsClick}
        onOrdersClick={handleOrdersClick}
      />
    </div>
  );
};

export default Events;
