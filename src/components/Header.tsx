
import { Calendar, BarChart3, Users, User, Settings as SettingsIcon, Ticket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentState: string;
  onEventsClick: () => void;
  onOrdersClick: () => void;
}

export const Header = ({ currentState, onEventsClick, onOrdersClick }: HeaderProps) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-festival-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-festival-500 to-festival-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Fest-Book</h1>
            <Badge variant="secondary" className="hidden sm:inline-flex bg-festival-100 dark:bg-festival-900 text-festival-700 dark:text-festival-300">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant={currentState === 'events' ? 'default' : 'ghost'}
                onClick={onEventsClick}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                Events
              </Button>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/bookings">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <Users className="w-4 h-4" />
                  Bookings
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </Link>
              <Link to="/settings">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <SettingsIcon className="w-4 h-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant={currentState === 'orders' ? 'default' : 'ghost'}
                onClick={onOrdersClick}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <User className="w-4 h-4" />
                My Orders
              </Button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
