import styles from '@/styles/layout.module.css';
import { Button, Text } from '@nextui-org/react';
import { IconContext } from 'react-icons';
import { FiBookmark, FiUser } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <IconContext.Provider value={{ size: '2rem' }}>
      <div className={styles.sidebar_container}>
        <SidebarItem>
          <HiHome />
          <SidebarText>Home</SidebarText>
        </SidebarItem>
        <SidebarItem>
          <FiUser />
          <SidebarText>Profile</SidebarText>
        </SidebarItem>
        <SidebarItem>
          <FiBookmark />
          <SidebarText>Bookmarks</SidebarText>
        </SidebarItem>
        <div className={styles.sidebar_item}>
          <Button rounded>
            <Text size='17px'>Tweet</Text>
          </Button>
        </div>
      </div>
    </IconContext.Provider>
  );
}

function SidebarText({ children }: { children: React.ReactNode }) {
  return (
    <Text size='18px' b>
      {children}
    </Text>
  );
}

function SidebarItem({ children }: { children: React.ReactNode }) {
  return (
    <Link to='/' className={styles.sidebar_item}>
      {children}
    </Link>
  );
}

export default Sidebar;
