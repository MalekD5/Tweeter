import { Outlet } from 'react-router-dom';
import Header from '@/components/Sidebar';
import styles from '@/styles/layout.module.css';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
