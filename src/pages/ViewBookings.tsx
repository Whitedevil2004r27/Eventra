
import { Badge } from '@/components/ui/badge';
import { AdvancedTable } from '@/components/AdvancedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Edit, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const mockBookingsData = [
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
  const { addNotification } = useApp();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: 'bg-green-600 text-white',
      pending: 'bg-yellow-600 text-white',
      cancelled: 'bg-red-600 text-white',
    };
    
    return statusConfig[status.toLowerCase() as keyof typeof statusConfig] || 'bg-gray-600 text-white';
  };

  const handleAction = (action: string, bookingId: string) => {
    addNotification({
      message: `${action} action performed on booking ${bookingId}`,
      type: 'info',
    });
  };

  const columns = [
    {
      key: 'id' as keyof typeof mockBookingsData[0],
      label: 'Booking ID',
      sortable: true,
    },
    {
      key: 'customerName' as keyof typeof mockBookingsData[0],
      label: 'Customer',
      sortable: true,
      render: (value: string, row: typeof mockBookingsData[0]) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-sm text-gray-400">{row.customerEmail}</div>
        </div>
      ),
    },
    {
      key: 'eventName' as keyof typeof mockBookingsData[0],
      label: 'Event',
      sortable: true,
      filterable: true,
      render: (value: string, row: typeof mockBookingsData[0]) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-sm text-gray-400">{row.eventDate}</div>
        </div>
      ),
    },
    {
      key: 'ticketType' as keyof typeof mockBookingsData[0],
      label: 'Ticket Type',
      sortable: true,
      filterable: true,
    },
    {
      key: 'quantity' as keyof typeof mockBookingsData[0],
      label: 'Quantity',
      sortable: true,
    },
    {
      key: 'totalAmount' as keyof typeof mockBookingsData[0],
      label: 'Amount',
      sortable: true,
      render: (value: number) => `$${value}`,
    },
    {
      key: 'status' as keyof typeof mockBookingsData[0],
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={getStatusBadge(value)}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions' as keyof typeof mockBookingsData[0],
      label: 'Actions',
      render: (_: any, row: typeof mockBookingsData[0]) => (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => handleAction('View', row.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => handleAction('Edit', row.id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-red-400 hover:bg-gray-700"
            onClick={() => handleAction('Delete', row.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

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

      {/* Advanced Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Bookings Management</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvancedTable
            data={mockBookingsData}
            columns={columns}
            searchableColumns={['customerName', 'eventName', 'id']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
