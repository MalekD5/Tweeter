import { Outlet } from 'react-router-dom';
import { Sidebar } from '..';
import { SidebarProvider } from '@/context/SidebarContext';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from '../Fallback';
function Layout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className='w-[93%] ml-[7%] lg:w-[71%] h-full lg:ml-[29%]'>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </SidebarProvider>
  );
}

export default Layout;
