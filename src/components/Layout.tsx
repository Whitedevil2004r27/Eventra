
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isHomePage && <AppSidebar />}
        <SidebarInset className="flex-1">
          {!isHomePage && <AppHeader />}
          <main className={`flex-1 ${!isHomePage ? 'p-6' : ''}`}>
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
