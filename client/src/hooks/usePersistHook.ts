import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '@/redux/features/auth/authSlice';
import { useRefreshMutation } from '@/redux/features/auth/authServiceSlice';
import { setToken } from '@/redux/features/auth/authSlice';

export function usePersist() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [refreshRequest] = useRefreshMutation();

  const promise = async () => {
    if (token) return true;
    if (localStorage.getItem('persist') !== 'true') return false;

    try {
      const { token } = await refreshRequest(null).unwrap();
      if (token) {
        dispatch(setToken({ token }));
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  };
  return promise;
}
