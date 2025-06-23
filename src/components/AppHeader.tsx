
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-700/50 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 glass-card">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 hover:scale-110" />
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img 
                src="/lovable-uploads/d18f4330-158e-4e01-982e-fb861b106e0c.png" 
                alt="Eventra Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <h1 className="text-xl font-bold gradient-text hidden sm:block">Eventra</h1>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search events, bookings..."
                className="pl-10 w-64 bg-slate-800/50 border-slate-600/50 text-slate-200 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
            <Bell className="h-4 w-4" />
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-800/95 border-slate-700/50 backdrop-blur">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="text-slate-200 hover:text-white">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="text-slate-200 hover:text-white">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700/50" />
              <DropdownMenuItem className="text-slate-200 hover:text-white">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
