import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';

function AppLayout(): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <div className="@container/main flex flex-col p-2 md:py-3 md:px-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { AppLayout };
