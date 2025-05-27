
import { useState, useEffect } from 'react';
import { CheckCircle, Download, Calendar, MapPin, Clock, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order } from '../types';

interface PaymentSuccessProps {
  order: Order;
  onDownloadTicket: () => void;
  onBackToEvents: () => void;
}

export const PaymentSuccess = ({ order, onDownloadTicket, onBackToEvents }: PaymentSuccessProps) => {
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Generate QR code placeholder
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-${order.ticketNumber}`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="animate-pulse-glow text-6xl">🎉</div>
        </div>
      )}

      <Card className="text-center mb-6 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-ticket-bounce">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">Payment Successful!</CardTitle>
          <p className="text-green-600">Your tickets have been confirmed</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Order Number:</span>
                <Badge variant="secondary" className="font-mono">
                  {order.id.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Ticket Number:</span>
                <Badge className="bg-festival-500 text-white font-mono">
                  {order.ticketNumber}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Your Digital Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="ticket-gradient p-6 rounded-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <QrCode className="w-full h-full" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.eventTitle}</h3>
                      <p className="text-purple-200">{item.ticketTypeName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Quantity</p>
                      <p className="text-2xl font-bold">{item.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Jul 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>6:00 PM</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Central Park</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-purple-300 border-opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Paid:</span>
                      <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* QR Code */}
          <div className="mt-6 text-center">
            <Card className="inline-block p-4 bg-white">
              <img 
                src={qrCodeUrl} 
                alt="Ticket QR Code" 
                className="mx-auto"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Show this QR code at the event entrance
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onDownloadTicket}
          className="flex-1 bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Tickets
        </Button>
        <Button 
          variant="outline" 
          onClick={onBackToEvents}
          className="flex-1"
        >
          Browse More Events
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-800 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Please arrive 30 minutes before the event starts</li>
            <li>• Keep your ticket QR code ready for quick entry</li>
            <li>• A confirmation email has been sent to your registered email</li>
            <li>• For any issues, contact support at support@festbook.com</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
