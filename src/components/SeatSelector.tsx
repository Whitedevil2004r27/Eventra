
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Users, MapPin } from 'lucide-react';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'occupied' | 'reserved';
  price: number;
  type: 'standard' | 'premium' | 'vip';
}

interface SeatSelectorProps {
  eventTitle: string;
  onSeatSelection: (seats: Seat[]) => void;
  maxSeats?: number;
}

export const SeatSelector = ({ eventTitle, onSeatSelection, maxSeats = 8 }: SeatSelectorProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // Generate sample seat layout
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 12;

    rows.forEach((row, rowIndex) => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const isOccupied = Math.random() < 0.3; // 30% occupied
        const isReserved = Math.random() < 0.1; // 10% reserved
        const seatType = rowIndex < 2 ? 'premium' : rowIndex < 4 ? 'standard' : 'vip';
        
        seats.push({
          id: `${row}${seatNum}`,
          row,
          number: seatNum,
          status: isOccupied ? 'occupied' : isReserved ? 'reserved' : 'available',
          price: seatType === 'vip' ? 150 : seatType === 'premium' ? 100 : 75,
          type: seatType
        });
      }
    });

    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'reserved') return;

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    let newSelectedSeats: Seat[];

    if (isSelected) {
      newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
    } else {
      if (selectedSeats.length >= maxSeats) {
        return; // Max seats reached
      }
      newSelectedSeats = [...selectedSeats, { ...seat, status: 'selected' }];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatSelection(newSelectedSeats);
  };

  const getSeatColor = (seat: Seat) => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    
    if (isSelected) return 'bg-festival-500 border-festival-600 text-white';
    
    switch (seat.status) {
      case 'available':
        switch (seat.type) {
          case 'vip': return 'bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200';
          case 'premium': return 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200';
          default: return 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200';
        }
      case 'occupied': return 'bg-red-100 border-red-300 text-red-500 cursor-not-allowed';
      case 'reserved': return 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-festival-500" />
            Seat Selection - {eventTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
              <span className="text-sm">Available ($75)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span className="text-sm">Premium ($100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded"></div>
              <span className="text-sm">VIP ($150)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-festival-500 border-2 border-festival-600 rounded"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
              <span className="text-sm">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
              <span className="text-sm">Reserved</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Select up to {maxSeats} seats. Click on available seats to select them.
          </div>
        </CardContent>
      </Card>

      {/* Seat Map */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardContent className="pt-6">
          {/* Stage */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-festival-500 to-festival-600 text-white py-3 text-center rounded-lg font-semibold">
              STAGE
            </div>
          </div>

          {/* Seats Grid */}
          <div className="space-y-3">
            {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
              <div key={row} className="flex items-center gap-2">
                <div className="w-8 text-center font-semibold text-muted-foreground">{row}</div>
                <div className="flex gap-1 flex-1 justify-center">
                  {seats.filter(seat => seat.row === row).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'occupied' || seat.status === 'reserved'}
                      className={`
                        w-8 h-8 border-2 rounded text-xs font-medium transition-all duration-200
                        ${getSeatColor(seat)}
                        ${seat.status === 'available' ? 'hover:scale-110' : ''}
                      `}
                      title={`Seat ${seat.id} - $${seat.price} (${seat.type})`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
                <div className="w-8"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <Card className="bg-gradient-to-r from-festival-50 to-festival-100 dark:from-festival-950 dark:to-festival-900 border-festival-200 dark:border-festival-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-festival-500" />
                Selected Seats ({selectedSeats.length}/{maxSeats})
              </h3>
              <div className="text-2xl font-bold text-festival-600 dark:text-festival-400">
                ${totalPrice}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSeats.map(seat => (
                <Badge key={seat.id} variant="secondary" className="flex items-center gap-1">
                  {seat.id}
                  <button
                    onClick={() => handleSeatClick(seat)}
                    className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <Button 
              className="w-full festival-gradient text-white hover:scale-105 transition-transform duration-200"
              disabled={selectedSeats.length === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm Seat Selection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
