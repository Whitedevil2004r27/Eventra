
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, Users, Calendar, DollarSign } from 'lucide-react';

const mockBookings = [
  {
    id: 'BK001',
    eventName: 'Summer Music Festival',
    customerName: 'John Doe',
    email: 'john@example.com',
    tickets: 2,
    totalAmount: 150,
    status: 'confirmed',
    bookingDate: '2024-01-15',
    eventDate: '2024-02-20',
  },
  {
    id: 'BK002',
    eventName: 'Tech Conference 2024',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    tickets: 1,
    totalAmount: 89,
    status: 'pending',
    bookingDate: '2024-01-14',
    eventDate: '2024-03-15',
  },
  {
    id: 'BK003',
    eventName: 'Art Gallery Opening',
    customerName: 'Mike Johnson',
    email: 'mike@example.com',
    tickets: 3,
    totalAmount: 45,
    status: 'cancelled',
    bookingDate: '2024-01-13',
    eventDate: '2024-02-28',
  },
];

export default function ViewBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'default',
      pending: 'secondary',
      cancelled: 'destructive',
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalBookings = filteredBookings.length;
  const totalRevenue = filteredBookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTickets = filteredBookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.tickets, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Bookings</h1>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Booking Date</SelectItem>
                <SelectItem value="event">Event Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="name">Customer Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Event Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.eventName}</TableCell>
                    <TableCell>
                      <div>
                        <div>{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.tickets}</TableCell>
                    <TableCell>${booking.totalAmount}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>{booking.eventDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
