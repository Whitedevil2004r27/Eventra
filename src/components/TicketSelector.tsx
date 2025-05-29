
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Star, Clock, Users } from 'lucide-react';
import { TicketType } from '../types';
import { SeatSelector } from './SeatSelector';

interface TicketSelectorProps {
  ticketTypes: TicketType[];
  onSelectionChange: (selections: Record<string, number>) => void;
}

export const TicketSelector = ({ ticketTypes, onSelectionChange }: TicketSelectorProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showSeatSelector, setShowSeatSelector] = useState(false);

  const updateQuantity = (ticketTypeId: string, newQuantity: number) => {
    const updatedQuantities = {
      ...quantities,
      [ticketTypeId]: Math.max(0, newQuantity)
    };
    setQuantities(updatedQuantities);
    onSelectionChange(updatedQuantities);
  };

  const totalTickets = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleProceedToSeats = () => {
    if (totalTickets > 0) {
      setShowSeatSelector(true);
    }
  };

  if (showSeatSelector) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setShowSeatSelector(false)}
          className="hover:scale-105 transition-transform duration-200"
        >
          ← Back to Ticket Selection
        </Button>
        <SeatSelector 
          eventTitle="Selected Event"
          onSeatSelection={(seats) => console.log('Selected seats:', seats)}
          maxSeats={totalTickets}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl">Select Your Tickets</CardTitle>
          <p className="text-muted-foreground">Choose your ticket type and quantity</p>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-festival-50 dark:from-gray-800 dark:to-gray-900 border-festival-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Ticket Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{ticket.name}</h3>
                    {ticket.isVip && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        VIP
                      </Badge>
                    )}
                    {ticket.isEarlyAccess && (
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        Early Access
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {ticket.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {ticket.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-festival-500 rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{ticket.available} remaining</span>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="lg:text-right space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">
                      ${ticket.price}
                    </div>
                    <div className="text-sm text-muted-foreground">per ticket</div>
                  </div>

                  <div className="flex items-center gap-3 justify-center lg:justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(ticket.id, (quantities[ticket.id] || 0) - 1)}
                      disabled={!quantities[ticket.id]}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <div className="w-16 text-center">
                      <span className="text-xl font-semibold">
                        {quantities[ticket.id] || 0}
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(ticket.id, (quantities[ticket.id] || 0) + 1)}
                      disabled={quantities[ticket.id] >= ticket.available}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {quantities[ticket.id] > 0 && (
                    <div className="text-center lg:text-right">
                      <div className="text-lg font-semibold text-festival-600 dark:text-festival-400">
                        Subtotal: ${(quantities[ticket.id] * ticket.price).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalTickets > 0 && (
        <Card className="bg-gradient-to-r from-festival-50 to-festival-100 dark:from-festival-950 dark:to-festival-900 border-festival-200 dark:border-festival-700 animate-scale-in">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {totalTickets} ticket{totalTickets !== 1 ? 's' : ''} selected
                </h3>
                <p className="text-muted-foreground">
                  Ready to proceed to seat selection
                </p>
              </div>
              <Button
                onClick={handleProceedToSeats}
                className="festival-gradient text-white hover:scale-105 transition-transform duration-200"
              >
                Proceed to Seat Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
