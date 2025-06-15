
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCharts } from '@/components/InteractiveCharts';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', value: 245 },
  { name: 'Feb', value: 320 },
  { name: 'Mar', value: 410 },
  { name: 'Apr', value: 485 },
  { name: 'May', value: 550 },
  { name: 'Jun', value: 620 },
];

const eventTypeData = [
  { name: 'Concerts', value: 35 },
  { name: 'Conferences', value: 25 },
  { name: 'Sports', value: 20 },
  { name: 'Festivals', value: 15 },
  { name: 'Others', value: 5 },
];

const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 18000 },
  { name: 'Mar', value: 25000 },
  { name: 'Apr', value: 32000 },
  { name: 'May', value: 28000 },
  { name: 'Jun', value: 45000 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics Report</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$160,000</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,630</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +4 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg. Ticket Price</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$65</div>
            <p className="text-xs text-blue-400">
              Stable pricing trend
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveCharts
          data={monthlyData}
          type="line"
          title="Monthly Bookings Trend"
          height={350}
        />

        <InteractiveCharts
          data={eventTypeData}
          type="pie"
          title="Event Types Distribution"
          height={350}
        />

        <InteractiveCharts
          data={revenueData}
          type="area"
          title="Revenue Growth"
          height={350}
        />

        <InteractiveCharts
          data={monthlyData}
          type="bar"
          title="Event Performance"
          height={350}
        />
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Summer Music Festival', bookings: 450, revenue: '$22,500' },
                { name: 'Tech Conference 2024', bookings: 320, revenue: '$19,200' },
                { name: 'Food & Wine Expo', bookings: 280, revenue: '$14,000' },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">{event.name}</h4>
                    <p className="text-sm text-gray-300">{event.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">{event.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">New Customers</span>
                <span className="text-white font-semibold">245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Returning Customers</span>
                <span className="text-white font-semibold">180</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Customer Retention</span>
                <span className="text-green-400 font-semibold">73%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Avg. Orders per Customer</span>
                <span className="text-white font-semibold">2.4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Cancellation Rate</span>
                <span className="text-red-400 font-semibold">4.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Average Event Capacity</span>
                <span className="text-white font-semibold">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Peak Booking Time</span>
                <span className="text-white font-semibold">7-9 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Mobile Bookings</span>
                <span className="text-blue-400 font-semibold">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
