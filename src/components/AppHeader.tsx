
import { Settings, Bell, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  const { signOut, user } = useAuth();
  const { state, dispatch, addNotification } = useApp();

  const handleSignOut = async () => {
    await signOut();
    addNotification({
      message: 'Successfully signed out',
      type: 'success',
    });
  };

  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      payload: state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger 
            className="h-8 w-8 text-gray-300 hover:text-white"
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          />
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-800 relative">
            <Bell className="h-4 w-4" />
            {state.notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-xs">
                {state.notifications.length}
              </Badge>
            )}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {state.theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-800">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              <div className="px-2 py-1.5 text-sm text-gray-300">
                {user?.email}
              </div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 hover:bg-gray-700"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
