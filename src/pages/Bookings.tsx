
import { useState } from 'react';
import { Search, Filter, Download, Calendar, Users, DollarSign, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const bookings = [
    {
      id: 'FEST-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      eventTitle: 'Summer Music Festival',
      ticketType: 'VIP Pass',
      quantity: 2,
      totalAmount: 300,
      status: 'confirmed',
      bookingDate: '2024-05-20T10:30:00',
      eventDate: '2024-07-15',
    },
    {
      id: 'FEST-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      eventTitle: 'Tech Innovation Conference',
      ticketType: 'Premium Pass',
      quantity: 1,
      totalAmount: 250,
      status: 'pending',
      bookingDate: '2024-05-19T14:15:00',
      eventDate: '2024-08-22',
    },
    {
      id: 'FEST-003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      eventTitle: 'Food & Wine Expo',
      ticketType: 'Tasting Pass',
      quantity: 3,
      totalAmount: 255,
      status: 'confirmed',
      bookingDate: '2024-05-18T09:45:00',
      eventDate: '2024-09-10',
    },
    {
      id: 'FEST-004',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      eventTitle: 'Summer Music Festival',
      ticketType: 'General Admission',
      quantity: 4,
      totalAmount: 300,
      status: 'cancelled',
      bookingDate: '2024-05-17T16:20:00',
      eventDate: '2024-07-15',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Bookings Management</h1>
        <p className="text-muted-foreground text-lg">
          Manage and track all event bookings and ticket sales.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalBookings}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Confirmed</CardTitle>
            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{confirmedBookings}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">${totalRevenue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings by customer, event, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="grid w-full grid-cols-4 bg-festival-100 dark:bg-gray-700">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-4 border border-festival-200 dark:border-gray-600 rounded-lg hover:bg-festival-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{booking.customerEmail}</p>
                    <p className="font-medium">{booking.eventTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.quantity}x {booking.ticketType} • Event: {booking.eventDate}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="text-right">
                      <p className="text-xl font-bold text-festival-600 dark:text-festival-400">
                        ${booking.totalAmount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Booking ID: {booking.id}
                      </p>
                    </div>
                    
                    <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
