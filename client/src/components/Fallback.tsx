import { useAuth } from '@/hooks/AuthHook';
import { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';

function Fallback({ error }: FallbackProps) {
  const { logout } = useAuth();
  if (validate(error)) {
    const err = error as AxiosErr;
    if (err.config._retry && err.response.status === 403) {
      logout();
      return <Navigate to='/' />;
    }
  }
  return <div>Fallback</div>;
}

interface AxiosErr {
  config: {
    _retry: boolean;
  };
  response: {
    status: number;
  };
}

function validate(err: unknown): err is Partial<AxiosErr> {
  const error = err as AxiosErr;
  return (
    error?.config?._retry !== undefined && error?.response?.status !== undefined
  );
}

export default Fallback;
