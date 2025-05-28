import { useState } from 'react';
import { Calendar, MapPin, Star, Ticket, User, CreditCard, Sparkles, TrendingUp, Filter, Search, BarChart3, Users, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { TicketSelector } from '../components/TicketSelector';
import { CheckoutForm } from '../components/CheckoutForm';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFailure } from '../components/PaymentFailure';
import { OrderHistory } from '../components/OrderHistory';
import { ThemeToggle } from '../components/ThemeToggle';
import { events, ticketTypes } from '../data/events';
import { CartItem, PaymentFormData, Order } from '../types';
import { useToast } from '@/hooks/use-toast';

type AppState = 'events' | 'ticket-selection' | 'checkout' | 'success' | 'failure' | 'orders';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('events');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(events.flatMap(event => event.categories)))];
  const featuredEvents = events.filter(event => event.featured);

  const handleBookTickets = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentState('ticket-selection');
    setCartItems([]);
  };

  const handleTicketSelection = (selections: Record<string, number>) => {
    if (!selectedEvent) return;

    const items: CartItem[] = [];
    const eventTicketTypes = ticketTypes[selectedEventId] || [];

    Object.entries(selections).forEach(([ticketTypeId, quantity]) => {
      if (quantity > 0) {
        const ticketType = eventTicketTypes.find(t => t.id === ticketTypeId);
        if (ticketType) {
          items.push({
            eventId: selectedEventId,
            ticketTypeId,
            quantity,
            price: ticketType.price,
            eventTitle: selectedEvent.title,
            ticketTypeName: ticketType.name
          });
        }
      }
    });

    setCartItems(items);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to proceed.",
        variant: "destructive"
      });
      return;
    }
    setCurrentState('checkout');
  };

  const handleCheckout = async (formData: PaymentFormData) => {
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.2;

      if (success) {
        const order: Order = {
          id: `ord_${Date.now()}`,
          items: cartItems,
          total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          status: 'completed',
          paymentMethod: 'Credit Card',
          createdAt: new Date().toISOString(),
          ticketNumber: `FEST-${Date.now().toString().slice(-6)}`
        };

        setCurrentOrder(order);
        setCurrentState('success');
        
        toast({
          title: "Payment successful!",
          description: "Your tickets have been confirmed.",
        });
      } else {
        setCurrentState('failure');
        toast({
          title: "Payment failed",
          description: "Please try again or contact support.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setCurrentState('failure');
      toast({
        title: "Payment error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadTicket = () => {
    toast({
      title: "Download started",
      description: "Your ticket is being downloaded as a PDF.",
    });
  };

  const resetToEvents = () => {
    setCurrentState('events');
    setSelectedEventId('');
    setCartItems([]);
    setCurrentOrder(null);
  };

  const retryPayment = () => {
    setCurrentState('checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-festival-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 transition-colors duration-300">
      {/* Enhanced Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-festival-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-festival-500 to-festival-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">Fest-Book</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex bg-festival-100 dark:bg-festival-900 text-festival-700 dark:text-festival-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Button
                  variant={currentState === 'events' ? 'default' : 'ghost'}
                  onClick={resetToEvents}
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  Events
                </Button>
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/bookings">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <Users className="w-4 h-4" />
                    Bookings
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <SettingsIcon className="w-4 h-4" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant={currentState === 'orders' ? 'default' : 'ghost'}
                  onClick={() => setCurrentState('orders')}
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  My Orders
                </Button>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentState === 'events' && (
          <div className="space-y-12 animate-fade-in">
            {/* Enhanced Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-bold gradient-text animate-fade-in">
                  Discover Amazing Events
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Book tickets for concerts, conferences, festivals, and more. Secure payments, instant confirmations.
                </p>
              </div>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
                <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                </Card>
                <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">1000+</div>
                    <div className="text-sm text-muted-foreground">Events</div>
                  </div>
                </Card>
                <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">25+</div>
                    <div className="text-sm text-muted-foreground">Cities</div>
                  </div>
                </Card>
                <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">99%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Enhanced Search & Filter */}
            <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search events, artists, venues..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 text-lg border-festival-200 dark:border-gray-600 focus:border-festival-500 dark:focus:border-festival-400"
                    />
                  </div>
                  
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto bg-festival-100 dark:bg-gray-700">
                      {categories.map((category) => (
                        <TabsTrigger 
                          key={category} 
                          value={category} 
                          className="capitalize data-[state=active]:bg-festival-500 data-[state=active]:text-white"
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

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
                        onBookTickets={handleBookTickets}
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
                        onBookTickets={handleBookTickets}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentState === 'ticket-selection' && selectedEvent && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={resetToEvents} className="hover:scale-105 transition-transform duration-200">
                ← Back to Events
              </Button>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{selectedEvent.title}</h2>
                <p className="text-muted-foreground text-lg">{selectedEvent.venue}</p>
              </div>
            </div>

            <TicketSelector
              ticketTypes={ticketTypes[selectedEventId] || []}
              onSelectionChange={handleTicketSelection}
            />

            {cartItems.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CreditCard className="w-6 h-6 text-festival-500" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-festival-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <span className="font-medium">{item.quantity}x {item.ticketTypeName}</span>
                          <div className="text-sm text-muted-foreground">{item.eventTitle}</div>
                        </div>
                        <span className="font-bold text-festival-600 dark:text-festival-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-festival-600 dark:text-festival-400">
                        ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={proceedToCheckout} 
                    className="w-full festival-gradient text-white h-12 text-lg font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentState === 'checkout' && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setCurrentState('ticket-selection')} className="hover:scale-105 transition-transform duration-200">
                ← Back to Tickets
              </Button>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Checkout</h2>
            </div>

            <CheckoutForm
              cartItems={cartItems}
              onCheckout={handleCheckout}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {currentState === 'success' && currentOrder && (
          <div className="animate-fade-in">
            <PaymentSuccess
              order={currentOrder}
              onDownloadTicket={handleDownloadTicket}
              onBackToEvents={resetToEvents}
            />
          </div>
        )}

        {currentState === 'failure' && (
          <div className="animate-fade-in">
            <PaymentFailure
              error="Payment processing failed. Please try again."
              onRetry={retryPayment}
              onBackToEvents={resetToEvents}
            />
          </div>
        )}

        {currentState === 'orders' && (
          <div className="animate-fade-in">
            <OrderHistory
              orders={[]}
              onDownloadTicket={handleDownloadTicket}
            />
          </div>
        )}
      </main>

      {/* Enhanced Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-t border-festival-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-5">
          <Button
            variant={currentState === 'events' ? 'default' : 'ghost'}
            onClick={resetToEvents}
            className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </Button>
          <Link to="/dashboard" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Dashboard</span>
            </Button>
          </Link>
          <Link to="/bookings" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full">
              <Users className="w-5 h-5" />
              <span className="text-xs">Bookings</span>
            </Button>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
          <Button
            variant={currentState === 'orders' ? 'default' : 'ghost'}
            onClick={() => setCurrentState('orders')}
            className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
