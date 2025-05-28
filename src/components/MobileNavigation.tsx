
import { Calendar, BarChart3, Users, User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MobileNavigationProps {
  currentState: string;
  onEventsClick: () => void;
  onOrdersClick: () => void;
}

export const MobileNavigation = ({ currentState, onEventsClick, onOrdersClick }: MobileNavigationProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-t border-festival-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-5">
        <Button
          variant={currentState === 'events' ? 'default' : 'ghost'}
          onClick={onEventsClick}
          className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Events</span>
        </Button>
        <Link to="/dashboard" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full">
            <Users className="w-5 h-5" />
            <span className="text-xs">Bookings</span>
          </Button>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 p-0">
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200 w-full">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
        <Button
          variant={currentState === 'orders' ? 'default' : 'ghost'}
          onClick={onOrdersClick}
          className="flex flex-col items-center gap-1 h-16 rounded-none transition-all duration-200"
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-xs">Orders</span>
        </Button>
      </div>
    </div>
  );
};
