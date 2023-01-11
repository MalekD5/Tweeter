import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/features/auth/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthMiddlware = () => {
  const token = useSelector(selectToken);
  const from = useLocation();

  return token ? <Outlet /> : <Navigate to='/login' state={{ from }} replace />;
};

export default AuthMiddlware;
