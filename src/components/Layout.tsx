
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { BackButton } from './BackButton';

export function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isHome = location.pathname === '/';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900 text-white">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {!isHome && <AppHeader />}
          <main className={`flex-1 ${!isHome ? 'p-6' : ''}`}>
            {!isDashboard && !isHome && (
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
