
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Filter, Download } from "lucide-react";

const ViewBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock booking data
  const bookings = [
    {
      id: "BK001",
      eventName: "Summer Music Festival",
      customerName: "John Doe",
      email: "john@example.com",
      tickets: 2,
      amount: 150,
      status: "confirmed",
      bookingDate: "2024-05-20",
    },
    {
      id: "BK002",
      eventName: "Tech Innovation Conference",
      customerName: "Jane Smith",
      email: "jane@example.com",
      tickets: 1,
      amount: 250,
      status: "pending",
      bookingDate: "2024-05-19",
    },
    {
      id: "BK003",
      eventName: "Food & Wine Expo",
      customerName: "Mike Johnson",
      email: "mike@example.com",
      tickets: 4,
      amount: 340,
      status: "confirmed",
      bookingDate: "2024-05-18",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">View All Bookings</h1>
        <p className="text-muted-foreground text-lg">
          Manage and track all event bookings across your platform.
        </p>
      </div>

      {/* Search and Actions */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="w-6 h-6 text-festival-500" />
            All Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-festival-200 dark:border-gray-600">
                  <th className="text-left p-3 font-medium">Booking ID</th>
                  <th className="text-left p-3 font-medium">Event</th>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Tickets</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-festival-100 dark:border-gray-700 hover:bg-festival-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="p-3 font-mono text-sm">{booking.id}</td>
                    <td className="p-3">{booking.eventName}</td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                      </div>
                    </td>
                    <td className="p-3">{booking.tickets}</td>
                    <td className="p-3 font-semibold">${booking.amount}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-3">{booking.bookingDate}</td>
                    <td className="p-3">
                      <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewBookings;
