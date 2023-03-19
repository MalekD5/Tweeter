import { Outlet } from 'react-router-dom';
import { Sidebar } from '..';
import { SidebarProvider } from '@/context/SidebarContext';
function Layout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className='w-[71%] h-full ml-[29%]'>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
