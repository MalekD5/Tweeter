import { Outlet } from 'react-router-dom';
import Header from '@/components/Sidebar';
import styles from '@/styles/layout.module.css';
import Sidebar from './Sidebar';
import Search from './Search';

function Layout() {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Search />
        <div className={styles.outlet_container}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
