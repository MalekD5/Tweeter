import { useSelector } from 'react-redux';
import { selectToken } from '@/features/auth/authSlice';
import jwtDecode from 'jwt-decode';

export type User = {
  username: string;
  pfp: string;
};

export function useUser(token: string | null) {
  if (!token || token === '') return;
  const decoded = jwtDecode<User>(token);
  return decoded;
}
