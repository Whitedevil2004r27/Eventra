
import { useState } from 'react';
import { CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { EventsGrid } from '../components/EventsGrid';
import { MobileNavigation } from '../components/MobileNavigation';
import { TicketSelector } from '../components/TicketSelector';
import { SeatSelector } from '../components/SeatSelector';
import { CheckoutForm } from '../components/CheckoutForm';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFailure } from '../components/PaymentFailure';
import { OrderHistory } from '../components/OrderHistory';
import { events, ticketTypes } from '../data/events';
import { CartItem, PaymentFormData, Order } from '../types';
import { useToast } from '@/hooks/use-toast';

type AppState = 'events' | 'ticket-selection' | 'seat-selection' | 'checkout' | 'success' | 'failure' | 'orders';

const Index = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>('events');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 transition-colors duration-300">
      <Header 
        currentState={currentState}
        onEventsClick={resetToEvents}
        onOrdersClick={() => setCurrentState('orders')}
      />

      {/* Main Content - Full Screen */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentState === 'events' && (
          <div className="space-y-12 animate-fade-in w-full">
            <HeroSection />
            
            {/* Quick Navigation to Events Page */}
            <div className="text-center space-y-4">
              <Button 
                onClick={() => navigate('/events')}
                size="lg"
                className="festival-gradient text-white text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Explore All Events
              </Button>
              <p className="text-muted-foreground">
                Visit our comprehensive Events Hub for detailed browsing and management
              </p>
            </div>
            
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />

            <EventsGrid
              featuredEvents={featuredEvents}
              filteredEvents={filteredEvents}
              onBookTickets={handleBookTickets}
            />
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
      </main>

      <MobileNavigation
        currentState={currentState}
        onEventsClick={resetToEvents}
        onOrdersClick={() => setCurrentState('orders')}
      />
    </div>
  );
};

export default Index;
