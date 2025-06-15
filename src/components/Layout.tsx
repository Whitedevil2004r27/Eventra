
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { BackButton } from './BackButton';
import { useApp } from '@/contexts/AppContext';

export function Layout() {
  const location = useLocation();
  const { state } = useApp();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <SidebarProvider open={state.sidebarOpen}>
      <div className="min-h-screen flex w-full bg-gray-900 text-white">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <AppHeader />
          <main className="flex-1 p-6">
            {!isDashboard && (
              <div className="mb-4">
                <BackButton />
              </div>
            )}
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
