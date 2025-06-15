
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Eye,
  Ticket,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const recentBookings = [
  { id: 1, event: 'Summer Music Fest', customer: 'John Doe', amount: '$85', status: 'Confirmed' },
  { id: 2, event: 'Tech Conference', customer: 'Jane Smith', amount: '$120', status: 'Pending' },
  { id: 3, event: 'Art Gallery Night', customer: 'Mike Johnson', amount: '$45', status: 'Confirmed' },
];

const monthlyData = [
  { month: 'Jan', events: 12, bookings: 245 },
  { month: 'Feb', events: 15, bookings: 320 },
  { month: 'Mar', events: 18, bookings: 410 },
  { month: 'Apr', events: 22, bookings: 485 },
  { month: 'May', events: 25, bookings: 550 },
  { month: 'Jun', events: 28, bookings: 620 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link to="/create-event">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-green-400 bg-green-900">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,245</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-green-400 bg-green-900">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8%
              </Badge>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$52,420</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-green-400 bg-green-900">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15%
              </Badge>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Events</CardTitle>
            <Eye className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-blue-400 bg-blue-900">
                <Ticket className="w-3 h-3 mr-1" />
                Live now
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="bookings" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">{booking.event}</h4>
                    <p className="text-sm text-gray-300">{booking.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{booking.amount}</p>
                    <Badge 
                      variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                      className={booking.status === 'Confirmed' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
