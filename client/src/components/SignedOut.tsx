import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthHook';

function Authenticated() {
  const { token } = useAuth();
  return token ? <Navigate replace to='/explore' /> : <Outlet />;
}

export default Authenticated;
