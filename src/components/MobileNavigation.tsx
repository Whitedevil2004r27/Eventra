
import { Calendar, BarChart3, Users, User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavigationProps {
  currentState: string;
  onEventsClick: () => void;
  onOrdersClick: () => void;
}

export const MobileNavigation = ({ currentState, onEventsClick, onOrdersClick }: MobileNavigationProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-t border-festival-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-5">
        <Link to="/" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button 
            variant={isActive('/') ? 'default' : 'ghost'} 
            className={`flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full ${
              isActive('/') ? 'bg-festival-500 text-white' : ''
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>
        <Link to="/events" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button 
            variant={isActive('/events') ? 'default' : 'ghost'} 
            className={`flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full ${
              isActive('/events') ? 'bg-festival-500 text-white' : ''
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </Button>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button 
            variant={isActive('/bookings') ? 'default' : 'ghost'} 
            className={`flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full ${
              isActive('/bookings') ? 'bg-festival-500 text-white' : ''
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Bookings</span>
          </Button>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button 
            variant={isActive('/profile') ? 'default' : 'ghost'} 
            className={`flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full ${
              isActive('/profile') ? 'bg-festival-500 text-white' : ''
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
        <Link to="/settings" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button 
            variant={isActive('/settings') ? 'default' : 'ghost'} 
            className={`flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full ${
              isActive('/settings') ? 'bg-festival-500 text-white' : ''
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
