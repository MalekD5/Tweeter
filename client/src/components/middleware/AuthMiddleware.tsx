import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePersist } from 'hooks/usePersistHook';
import { Loading } from '@nextui-org/react';

function AuthMiddleware() {
  const [state, setState] = useState('initial');
  const checkPersist = usePersist();

  useEffect(() => {
    const check = async () => {
      try {
        const result = await checkPersist();
        setState(result ? 'allow' : '');
      } catch (err) {
        setState('');
      }
    };
    check();
  }, []);

  switch (state) {
    case 'initial':
      return <Loading size='xl' />;
    case 'allow':
      return <Outlet />;
    default:
      return <Navigate to='/' replace />;
  }
}

export default AuthMiddleware;
