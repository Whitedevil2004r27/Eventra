
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Eye } from "lucide-react";

const Analytics = () => {
  // Mock analytics data
  const metrics = [
    {
      title: "Total Events",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Total Bookings",
      value: "1,847",
      change: "+23%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Revenue",
      value: "$47,832",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Page Views",
      value: "12,456",
      change: "+8%",
      trend: "up",
      icon: Eye,
      color: "orange",
    },
  ];

  const topEvents = [
    { name: "Summer Music Festival", bookings: 456, revenue: "$12,800" },
    { name: "Tech Innovation Conference", bookings: 234, revenue: "$8,900" },
    { name: "Food & Wine Expo", bookings: 189, revenue: "$6,450" },
    { name: "Art & Culture Fair", bookings: 167, revenue: "$5,200" },
  ];

  const recentActivity = [
    { action: "New booking", event: "Summer Music Festival", time: "2 mins ago" },
    { action: "Event created", event: "Winter Sports Meet", time: "15 mins ago" },
    { action: "Payment received", event: "Tech Conference", time: "1 hour ago" },
    { action: "New user registered", event: "Platform", time: "2 hours ago" },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Analytics Report</h1>
        <p className="text-muted-foreground text-lg">
          Track your event performance and booking analytics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-festival-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{metric.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Events */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="w-5 h-5 text-festival-500" />
              Top Performing Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEvents.map((event, index) => (
                <div key={event.name} className="flex items-center justify-between p-3 bg-festival-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{event.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-festival-600 dark:text-festival-400">{event.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="w-5 h-5 text-festival-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-festival-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-festival-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.event}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-5 h-5 text-festival-500" />
            Booking Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-festival-200 dark:border-gray-600 rounded-lg">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Chart visualization will be implemented here</p>
              <p className="text-sm">Integration with charts library like Recharts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
