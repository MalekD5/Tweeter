import { useNavigate } from 'react-router-dom';

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

  return { token, logout: logoutFunction };
}
