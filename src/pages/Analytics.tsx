
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Download,
  Eye,
  Ticket,
  Target,
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 4000, bookings: 240 },
  { month: 'Feb', revenue: 3000, bookings: 198 },
  { month: 'Mar', revenue: 5000, bookings: 300 },
  { month: 'Apr', revenue: 4500, bookings: 278 },
  { month: 'May', revenue: 6000, bookings: 389 },
  { month: 'Jun', revenue: 5500, bookings: 349 },
];

const eventPopularityData = [
  { name: 'Music Events', value: 40, color: '#8b5cf6' },
  { name: 'Tech Conferences', value: 30, color: '#06b6d4' },
  { name: 'Art Shows', value: 20, color: '#10b981' },
  { name: 'Sports Events', value: 10, color: '#f59e0b' },
];

const topEventsData = [
  { name: 'Summer Music Fest', bookings: 450, revenue: 22500 },
  { name: 'Tech Summit 2024', bookings: 320, revenue: 19200 },
  { name: 'Art Gallery Night', bookings: 280, revenue: 8400 },
  { name: 'Sports Championship', bookings: 380, revenue: 15200 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics Report</h1>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$28,500</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-green-400 bg-green-900">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
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
            <div className="text-2xl font-bold text-white">1,430</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-green-400 bg-green-900">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2%
              </Badge>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-blue-400 bg-blue-900">
                <Eye className="w-3 h-3 mr-1" />
                6 upcoming
              </Badge>
              this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24.5%</div>
            <p className="text-xs text-gray-400">
              <Badge variant="secondary" className="text-green-400 bg-green-900">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.1%
              </Badge>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue & Bookings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar yAxisId="left" dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
                <Bar yAxisId="right" dataKey="bookings" fill="#06b6d4" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Event Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventPopularityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {eventPopularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Events Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topEventsData.map((event, index) => (
              <div key={event.name} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{event.name}</h3>
                    <p className="text-sm text-gray-400">
                      {event.bookings} bookings • ${event.revenue} revenue
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    <Ticket className="w-3 h-3 mr-1" />
                    {event.bookings}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ${event.revenue}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
