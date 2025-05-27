
import { useState } from 'react';
import { Calendar, Download, MapPin, Clock, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onDownloadTicket: (orderId: string) => void;
}

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: 'ord_12345',
    items: [
      {
        eventId: '1',
        ticketTypeId: 'vip-1',
        quantity: 2,
        price: 150,
        eventTitle: 'Summer Music Festival',
        ticketTypeName: 'VIP Pass'
      }
    ],
    total: 300,
    status: 'completed',
    paymentMethod: 'Credit Card',
    createdAt: '2024-06-15T10:30:00Z',
    ticketNumber: 'SMF-VIP-001234'
  },
  {
    id: 'ord_12346',
    items: [
      {
        eventId: '2',
        ticketTypeId: 'standard-2',
        quantity: 1,
        price: 125,
        eventTitle: 'Tech Innovation Conference',
        ticketTypeName: 'Standard Ticket'
      }
    ],
    total: 125,
    status: 'completed',
    paymentMethod: 'PayPal',
    createdAt: '2024-05-20T14:15:00Z',
    ticketNumber: 'TIC-STD-005678'
  },
  {
    id: 'ord_12347',
    items: [
      {
        eventId: '3',
        ticketTypeId: 'tasting-3',
        quantity: 2,
        price: 85,
        eventTitle: 'Food & Wine Expo',
        ticketTypeName: 'Tasting Pass'
      }
    ],
    total: 170,
    status: 'pending',
    paymentMethod: 'Credit Card',
    createdAt: '2024-06-25T09:45:00Z',
    ticketNumber: 'FWE-TAS-009876'
  }
];

export const OrderHistory = ({ orders = mockOrders, onDownloadTicket }: OrderHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.items.some(item => 
      item.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2">Order History</h2>
        <p className="text-muted-foreground">View and manage your ticket purchases</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by event name or ticket number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You haven\'t made any ticket purchases yet'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-festival-50 to-purple-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-festival-800">{item.eventTitle}</h4>
                          <p className="text-sm text-muted-foreground">{item.ticketTypeName}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">
                            Ticket: {order.ticketNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Jul 15, 2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>6:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>Central Park</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-xl font-bold text-festival-600">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">via {order.paymentMethod}</p>
                    </div>
                    
                    {order.status === 'completed' && (
                      <Button
                        onClick={() => onDownloadTicket(order.id)}
                        className="bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Tickets
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
