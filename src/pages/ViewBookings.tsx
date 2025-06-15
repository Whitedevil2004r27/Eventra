
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';

const bookingsData = [
  {
    id: 'BK001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    eventName: 'Summer Music Fest',
    eventDate: '2024-07-15',
    ticketType: 'VIP',
    quantity: 2,
    totalAmount: 450,
    status: 'Confirmed',
    bookingDate: '2024-06-01',
  },
  {
    id: 'BK002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    eventName: 'Tech Conference 2024',
    eventDate: '2024-08-20',
    ticketType: 'Standard',
    quantity: 1,
    totalAmount: 120,
    status: 'Pending',
    bookingDate: '2024-06-02',
  },
  {
    id: 'BK003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    eventName: 'Art Gallery Night',
    eventDate: '2024-06-30',
    ticketType: 'Premium',
    quantity: 3,
    totalAmount: 135,
    status: 'Confirmed',
    bookingDate: '2024-05-28',
  },
  {
    id: 'BK004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    eventName: 'Sports Championship',
    eventDate: '2024-09-10',
    ticketType: 'Standard',
    quantity: 4,
    totalAmount: 200,
    status: 'Cancelled',
    bookingDate: '2024-06-03',
  },
];

export default function ViewBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: 'bg-green-600 text-white',
      pending: 'bg-yellow-600 text-white',
      cancelled: 'bg-red-600 text-white',
    };
    
    return statusConfig[status.toLowerCase() as keyof typeof statusConfig] || 'bg-gray-600 text-white';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">View All Bookings</h1>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-white">147</div>
            <p className="text-gray-400">Total Bookings</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-400">132</div>
            <p className="text-gray-400">Confirmed</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-400">8</div>
            <p className="text-gray-400">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-400">7</div>
            <p className="text-gray-400">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by customer, event, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Booking ID</TableHead>
                  <TableHead className="text-gray-300">Customer</TableHead>
                  <TableHead className="text-gray-300">Event</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Tickets</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="border-gray-700 hover:bg-gray-700/50">
                    <TableCell className="font-medium text-white">{booking.id}</TableCell>
                    <TableCell>
                      <div className="text-white">
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-sm text-gray-400">{booking.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-white">
                        <div className="font-medium">{booking.eventName}</div>
                        <div className="text-sm text-gray-400">{booking.eventDate}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{booking.bookingDate}</TableCell>
                    <TableCell>
                      <div className="text-white">
                        <div>{booking.quantity} × {booking.ticketType}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-medium">${booking.totalAmount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 hover:bg-gray-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
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
