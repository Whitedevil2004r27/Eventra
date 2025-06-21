
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CreditCard, Calendar, Sparkles, Play, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { Enhanced3DEventCard } from '../components/Enhanced3DEventCard';
import { EventDetailsModal } from '../components/EventDetailsModal';
import { MobileNavigation } from '../components/MobileNavigation';
import { TicketSelector } from '../components/TicketSelector';
import { SeatSelector } from '../components/SeatSelector';
import { CheckoutForm } from '../components/CheckoutForm';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFailure } from '../components/PaymentFailure';
import { OrderHistory } from '../components/OrderHistory';
import { Footer } from '../components/Footer';
import { events, ticketTypes } from '../data/events';
import { CartItem, PaymentFormData, Order } from '../types';
import { useToast } from '@/hooks/use-toast';

type AppState = 'events' | 'ticket-selection' | 'seat-selection' | 'checkout' | 'success' | 'failure' | 'orders';

const Index = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>('events');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedEventForModal, setSelectedEventForModal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const selectedEventDetails = selectedEventForModal ? events.find(e => e.id === selectedEventForModal) : null;
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(events.flatMap(event => event.categories)))];
  const featuredEvents = events.filter(event => event.featured);

  const handleViewEvent = (eventId: string) => {
    setSelectedEventForModal(eventId);
  };

  const handleBookTickets = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentState('ticket-selection');
    setCartItems([]);
    setSelectedSeats([]);
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

  const proceedToSeatSelection = () => {
    if (cartItems.length === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to proceed.",
        variant: "destructive"
      });
      return;
    }
    setCurrentState('seat-selection');
  };

  const handleSeatSelection = (seats: any[]) => {
    setSelectedSeats(seats);
  };

  const proceedToCheckout = () => {
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
    setSelectedSeats([]);
    setCurrentOrder(null);
  };

  const retryPayment = () => {
    setCurrentState('checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <Header 
        currentState={currentState}
        onEventsClick={() => setCurrentState('events')}
        onOrdersClick={() => setCurrentState('orders')}
      />

      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold gradient-text mb-6"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 40px rgba(139, 92, 246, 0.8)",
                  "0 0 20px rgba(139, 92, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Welcome to Eventra
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover amazing events, book tickets seamlessly, and create unforgettable experiences.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                onClick={() => navigate('/events')}
                size="lg"
                className="festival-gradient text-white text-lg px-8 py-4 hover:shadow-neon transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Explore Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-neon-purple to-neon-blue rounded-full opacity-20"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Happy Customers", icon: "👥" },
              { number: "1000+", label: "Events", icon: "🎪" },
              { number: "25+", label: "Cities", icon: "🌍" },
              { number: "99%", label: "Satisfaction", icon: "⭐" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="perspective-container"
              >
                <Card className="glass-card text-center p-6 hover-3d border-0">
                  <motion.div 
                    className="text-4xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Events Section */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't miss out on these amazing upcoming events
            </p>
          </motion.div>

          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {featuredEvents.slice(0, 6).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Enhanced3DEventCard
                  event={event}
                  onView={handleViewEvent}
                  onEdit={(id) => console.log('Edit event:', id)}
                  onDelete={(id) => console.log('Delete event:', id)}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => navigate('/events')}
              size="lg"
              className="festival-gradient text-white text-lg px-8 py-4 hover:shadow-neon transition-all duration-300 hover:scale-105"
            >
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

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
                    onClick={proceedToSeatSelection} 
                    className="w-full festival-gradient text-white h-12 text-lg font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    Continue to Seat Selection
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentState === 'seat-selection' && selectedEvent && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setCurrentState('ticket-selection')} className="hover:scale-105 transition-transform duration-200">
                ← Back to Tickets
              </Button>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Select Your Seats</h2>
            </div>

            <SeatSelector
              eventTitle={selectedEvent.title}
              onSeatSelection={handleSeatSelection}
              maxSeats={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            />

            {selectedSeats.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
                <CardContent className="pt-6">
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
              <Button variant="outline" onClick={() => setCurrentState('seat-selection')} className="hover:scale-105 transition-transform duration-200">
                ← Back to Seats
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

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEventDetails}
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
      />

      <MobileNavigation
        currentState={currentState}
        onEventsClick={resetToEvents}
        onOrdersClick={() => setCurrentState('orders')}
      />
    </div>
  );
};

export default Index;
