
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8 text-gray-300 hover:text-white" />
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-800">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
