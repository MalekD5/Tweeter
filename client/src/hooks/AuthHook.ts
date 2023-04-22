import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export type User = {
  username: string;
  pfp: string;
  id: string;
};

export function useAuth() {
  const tokenLocation = localStorage.getItem('persist');
  const navigate = useNavigate();

  const logoutFunction = (nav = false) => {
    const tokenLocation = localStorage.getItem('persist');
    if (tokenLocation === 'false') {
      sessionStorage.removeItem('token');
    } else {
      localStorage.removeItem('token');
    }
    if (nav) navigate('/', { replace: true });
  };

  const token =
    tokenLocation === 'false'
      ? sessionStorage.getItem('token')
      : localStorage.getItem('token');

  const data = (() => {
    if (!token) {
      logoutFunction();
      return;
    }
    const decoded = jwtDecode<User>(token);
    return decoded;
  })();
  return { token, logout: logoutFunction, data };
}
