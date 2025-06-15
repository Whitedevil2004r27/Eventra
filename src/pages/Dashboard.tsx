
import { useState } from 'react';
import { Calendar, Users, TrendingUp, DollarSign, BarChart3, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { events } from '../data/events';

const Dashboard = () => {
  const totalEvents = events.length;
  const featuredEvents = events.filter(event => event.featured).length;
  const totalRevenue = 125000; // Mock data
  const totalBookings = 850; // Mock data

  const recentBookings = [
    { id: '1', event: 'Summer Music Festival', customer: 'John Doe', amount: 150, date: '2024-05-20' },
    { id: '2', event: 'Tech Innovation Conference', customer: 'Jane Smith', amount: 250, date: '2024-05-19' },
    { id: '3', event: 'Food & Wine Expo', customer: 'Mike Johnson', amount: 85, date: '2024-05-18' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome back! Here's an overview of your event management platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalEvents}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{totalBookings}</div>
            <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Featured Events</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{featuredEvents}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">Active promotions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="w-6 h-6 text-festival-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full festival-gradient text-white h-12 hover:scale-105 transition-transform duration-200">
              <Calendar className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
            <Button variant="outline" className="w-full h-12 border-festival-200 dark:border-festival-700 hover:scale-105 transition-transform duration-200">
              <Users className="w-4 h-4 mr-2" />
              View All Bookings
            </Button>
            <Button variant="outline" className="w-full h-12 border-festival-200 dark:border-festival-700 hover:scale-105 transition-transform duration-200">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-festival-500" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-festival-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-muted-foreground">{booking.event}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-festival-600 dark:text-festival-400">${booking.amount}</p>
                    <p className="text-xs text-muted-foreground">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-festival-500" />
              Trending Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-festival-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  {event.featured && (
                    <Badge className="bg-festival-500 text-white">Featured</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
