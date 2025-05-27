
import { useState } from 'react';
import { Calendar, MapPin, Star, Ticket, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { EventCard } from '../components/EventCard';
import { TicketSelector } from '../components/TicketSelector';
import { CheckoutForm } from '../components/CheckoutForm';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFailure } from '../components/PaymentFailure';
import { OrderHistory } from '../components/OrderHistory';
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
  const { toast } = useToast();

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      const success = Math.random() > 0.2; // 80% success rate

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
    <div className="min-h-screen bg-gradient-to-br from-festival-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-festival-500 to-festival-600 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Fest-Book</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant={currentState === 'events' ? 'default' : 'ghost'}
                onClick={resetToEvents}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Events
              </Button>
              <Button
                variant={currentState === 'orders' ? 'default' : 'ghost'}
                onClick={() => setCurrentState('orders')}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                My Orders
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentState === 'events' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold gradient-text">
                Discover Amazing Events
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Book tickets for concerts, conferences, festivals, and more. Secure payments, instant confirmations.
              </p>
            </div>

            {/* Search */}
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Featured Events */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-festival-500" />
                <h3 className="text-2xl font-bold">Featured Events</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onBookTickets={handleBookTickets}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentState === 'ticket-selection' && selectedEvent && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={resetToEvents}>
                ← Back to Events
              </Button>
              <div>
                <h2 className="text-3xl font-bold">{selectedEvent.title}</h2>
                <p className="text-muted-foreground">{selectedEvent.venue}</p>
              </div>
            </div>

            <TicketSelector
              ticketTypes={ticketTypes[selectedEventId] || []}
              onSelectionChange={handleTicketSelection}
            />

            {cartItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.quantity}x {item.ticketTypeName}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mb-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-festival-600">
                        ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button onClick={proceedToCheckout} className="w-full festival-gradient text-white">
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentState === 'checkout' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setCurrentState('ticket-selection')}>
                ← Back to Tickets
              </Button>
              <h2 className="text-3xl font-bold">Checkout</h2>
            </div>

            <CheckoutForm
              cartItems={cartItems}
              onCheckout={handleCheckout}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {currentState === 'success' && currentOrder && (
          <PaymentSuccess
            order={currentOrder}
            onDownloadTicket={handleDownloadTicket}
            onBackToEvents={resetToEvents}
          />
        )}

        {currentState === 'failure' && (
          <PaymentFailure
            error="Payment processing failed. Please try again."
            onRetry={retryPayment}
            onBackToEvents={resetToEvents}
          />
        )}

        {currentState === 'orders' && (
          <OrderHistory
            orders={[]}
            onDownloadTicket={handleDownloadTicket}
          />
        )}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-2">
          <Button
            variant={currentState === 'events' ? 'default' : 'ghost'}
            onClick={resetToEvents}
            className="flex flex-col items-center gap-1 h-16 rounded-none"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </Button>
          <Button
            variant={currentState === 'orders' ? 'default' : 'ghost'}
            onClick={() => setCurrentState('orders')}
            className="flex flex-col items-center gap-1 h-16 rounded-none"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
