
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Users, TrendingUp, DollarSign, BarChart3, Clock, Plus, Eye, FileText } from 'lucide-react';
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

  const statsCards = [
    {
      title: "Total Events",
      value: totalEvents,
      change: "+2 from last month",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-400"
    },
    {
      title: "Total Bookings", 
      value: totalBookings,
      change: "+12% from last month",
      icon: Users,
      color: "from-green-500 to-green-600", 
      iconColor: "text-green-400"
    },
    {
      title: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+8% from last month",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-400"
    },
    {
      title: "Featured Events",
      value: featuredEvents,
      change: "Active promotions",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
        <p className="text-gray-400 text-lg">
          Welcome back! Here's an overview of your event management platform.
        </p>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delay: 0.2 }}
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              rotateX: 5,
              z: 50
            }}
            className="perspective-container"
          >
            <Card className="neumorphic-card border-0 hover-3d overflow-hidden relative">
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </motion.div>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.div 
                  className="text-3xl font-bold text-white mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs text-gray-400">{stat.change}</p>
              </CardContent>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${stat.color} blur-xl opacity-20`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card border-0 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <BarChart3 className="w-6 h-6 text-festival-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  label: "Create New Event", 
                  icon: Plus, 
                  gradient: "festival-gradient",
                  path: "/create-event"
                },
                { 
                  label: "View All Bookings", 
                  icon: Eye, 
                  gradient: "border-gray-600 hover:bg-gray-800",
                  path: "/view-bookings"
                },
                { 
                  label: "Analytics Report", 
                  icon: FileText, 
                  gradient: "border-gray-600 hover:bg-gray-800",
                  path: "/analytics"
                }
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Button 
                    className={`w-full h-12 ${action.gradient === 'festival-gradient' ? 'festival-gradient text-white hover:shadow-neon' : `variant-outline ${action.gradient}`} text-white transition-all duration-300`}
                  >
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="glass-card border-0 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-festival-500" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-3 neumorphic-card rounded-lg cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-white">{booking.customer}</p>
                      <p className="text-sm text-gray-400">{booking.event}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-festival-400">${booking.amount}</p>
                      <p className="text-xs text-gray-500">{booking.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="glass-card border-0 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-festival-500" />
                Trending Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 3).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    className="flex items-center justify-between p-3 neumorphic-card rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <motion.img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-12 h-12 rounded-lg object-cover"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div>
                        <p className="font-medium text-white">{event.title}</p>
                        <p className="text-sm text-gray-400">{event.date}</p>
                      </div>
                    </div>
                    {event.featured && (
                      <Badge className="bg-festival-500 text-white animate-pulse-neon">
                        Featured
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
