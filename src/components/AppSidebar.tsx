
import { Calendar, BarChart3, Users, Plus, User, Settings as SettingsIcon, Home, Ticket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
];

const managementItems = [
  {
    title: "Create New Event",
    url: "/create-event",
    icon: Plus,
  },
  {
    title: "View All Bookings",
    url: "/view-bookings",
    icon: Users,
  },
  {
    title: "Analytics Report",
    url: "/analytics",
    icon: BarChart3,
  },
];

const userItems = [
  {
    title: "Bookings",
    url: "/bookings",
    icon: Ticket,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar className="glass-card border-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl shadow-2xl">
      <SidebarHeader className="border-b border-slate-700/50 p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/30">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-all duration-300 hover:rotate-1 group">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/40 neumorphic-card p-1">
            <img 
              src="/lovable-uploads/f966181f-f0e8-4f95-900d-4b7fc5198911.png" 
              alt="Eventra Logo" 
              className="w-10 h-10 object-contain drop-shadow-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold gradient-text text-shadow-glow">Eventra</h1>
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 shadow-lg">
              Pro
            </Badge>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-3 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={`
                      group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1
                      ${isActive(item.url) 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/25 text-white ring-2 ring-purple-500/50' 
                        : 'hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:shadow-lg hover:shadow-slate-700/25 border border-transparent hover:border-slate-600/50'
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${isActive(item.url) ? 'text-purple-300 drop-shadow-lg' : 'text-slate-300 group-hover:text-white'}`} />
                      <span className={`font-medium transition-all duration-300 ${isActive(item.url) ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {item.title}
                      </span>
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl animate-pulse-neon" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-3 px-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={`
                      group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1
                      ${isActive(item.url) 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/25 text-white ring-2 ring-purple-500/50' 
                        : 'hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:shadow-lg hover:shadow-slate-700/25 border border-transparent hover:border-slate-600/50'
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${isActive(item.url) ? 'text-purple-300 drop-shadow-lg' : 'text-slate-300 group-hover:text-white'}`} />
                      <span className={`font-medium transition-all duration-300 ${isActive(item.url) ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {item.title}
                      </span>
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl animate-pulse-neon" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-3 px-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={`
                      group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1
                      ${isActive(item.url) 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/25 text-white ring-2 ring-purple-500/50' 
                        : 'hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:shadow-lg hover:shadow-slate-700/25 border border-transparent hover:border-slate-600/50'
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${isActive(item.url) ? 'text-purple-300 drop-shadow-lg' : 'text-slate-300 group-hover:text-white'}`} />
                      <span className={`font-medium transition-all duration-300 ${isActive(item.url) ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {item.title}
                      </span>
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl animate-pulse-neon" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
