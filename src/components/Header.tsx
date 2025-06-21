
import { Calendar, BarChart3, Users, User, Settings as SettingsIcon, Ticket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentState: string;
  onEventsClick: () => void;
  onOrdersClick: () => void;
}

export const Header = ({ currentState, onEventsClick, onOrdersClick }: HeaderProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-festival-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-festival-500 to-festival-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Eventra</h1>
            <Badge variant="secondary" className="hidden sm:inline-flex bg-festival-100 dark:bg-festival-900 text-festival-700 dark:text-festival-300">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </Link>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/">
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                    isActive('/') ? 'bg-festival-500 text-white shadow-lg' : ''
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <Link to="/events">
                <Button
                  variant={isActive('/events') ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                    isActive('/events') ? 'bg-festival-500 text-white shadow-lg' : ''
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Events
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant={isActive('/dashboard') ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                    isActive('/dashboard') ? 'bg-festival-500 text-white shadow-lg' : ''
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/bookings">
                <Button
                  variant={isActive('/bookings') ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                    isActive('/bookings') ? 'bg-festival-500 text-white shadow-lg' : ''
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Bookings
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant={isActive('/profile') ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                    isActive('/profile') ? 'bg-festival-500 text-white shadow-lg' : ''
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </Link>
              <Link to="/settings">
                <Button
                  variant={isActive('/settings') ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                    isActive('/settings') ? 'bg-festival-500 text-white shadow-lg' : ''
                  }`}
                >
                  <SettingsIcon className="w-4 h-4" />
                  Settings
                </Button>
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
