
import { useState } from 'react';
import { Minus, Plus, Star, Clock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TicketType } from '../types';

interface TicketSelectorProps {
  ticketTypes: TicketType[];
  onSelectionChange: (selections: Record<string, number>) => void;
}

export const TicketSelector = ({ ticketTypes, onSelectionChange }: TicketSelectorProps) => {
  const [selections, setSelections] = useState<Record<string, number>>({});

  const updateSelection = (ticketId: string, quantity: number) => {
    const newSelections = {
      ...selections,
      [ticketId]: Math.max(0, Math.min(quantity, ticketTypes.find(t => t.id === ticketId)?.available || 0))
    };
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const getTicketIcon = (ticket: TicketType) => {
    if (ticket.isVip) return <Crown className="w-4 h-4" />;
    if (ticket.isEarlyAccess) return <Clock className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  const getTicketBadgeColor = (ticket: TicketType) => {
    if (ticket.isVip) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (ticket.isEarlyAccess) return 'bg-gradient-to-r from-green-400 to-green-600';
    return 'bg-gradient-to-r from-blue-400 to-blue-600';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Select Your Tickets</h3>
      <div className="grid gap-4">
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-festival-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{ticket.name}</CardTitle>
                    {(ticket.isVip || ticket.isEarlyAccess) && (
                      <Badge className={`text-white ${getTicketBadgeColor(ticket)}`}>
                        {getTicketIcon(ticket)}
                        {ticket.isVip ? 'VIP' : 'Early Bird'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{ticket.description}</p>
                  <div className="space-y-1">
                    {ticket.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-festival-500 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-festival-600">${ticket.price}</div>
                  <div className="text-xs text-muted-foreground">{ticket.available} available</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateSelection(ticket.id, (selections[ticket.id] || 0) - 1)}
                    disabled={!selections[ticket.id] || selections[ticket.id] === 0}
                    className="h-8 w-8 p-0 hover:bg-festival-50"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  
                  <span className="w-8 text-center font-semibold">
                    {selections[ticket.id] || 0}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateSelection(ticket.id, (selections[ticket.id] || 0) + 1)}
                    disabled={selections[ticket.id] >= ticket.available}
                    className="h-8 w-8 p-0 hover:bg-festival-50"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {selections[ticket.id] > 0 && (
                <div className="mt-3 p-3 bg-festival-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold text-festival-600">
                      ${(ticket.price * selections[ticket.id]).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
