import styles from '@/styles/layout.module.css';
import { Button, Text } from '@nextui-org/react';
import { IconContext } from 'react-icons';
import { FiBookmark, FiUser } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/redux/features/auth/authServiceSlice';
import { AiOutlineTwitter } from 'react-icons/ai';

function Sidebar() {
  const navigate = useNavigate();
  const [logoutRequest] = useLogoutMutation();
  const handleLogout = async () => {
    await logoutRequest(null);
    navigate('/login');
  };

  return (
    <IconContext.Provider value={{ size: '2rem' }}>
      <div className={styles.sidebar_container}>
        <div className={styles.sidebar_item}>
          <Link to='/explore'>
            <AiOutlineTwitter />
          </Link>
        </div>
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
        <div className={`${styles.sidebar_item} ${styles.logout_button}`}>
          <Button onPress={handleLogout} color='error' rounded>
            <Text size='17px'>Logout</Text>
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
