import { useAuth } from '@/hooks/AuthHook';
import { z } from 'zod';

const userStoreSchema = z.object({
  username: z.string().min(5).max(25).trim(),
  displayname: z.string().min(5).max(40).trim(),
  pfp: z.string().url().optional()
});

type UserStoreType = z.infer<typeof userStoreSchema>;

export function handleToken(token: string) {
  const persist = localStorage.getItem('persist');
  if (persist === 'true') {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
}

export function handleLocalStorage(
  token: string,
  username: string,
  displayname: string,
  persist: boolean,
  pfp?: string
) {
  if (persist) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
  localStorage.setItem('persist', persist.toString());

  const userStore = userStoreSchema.parse({ username, displayname, pfp });
  localStorage.setItem('userStore', JSON.stringify(userStore));
}

export function useUserStore() {
  const { token } = useAuth();
  const userStore = localStorage.getItem('userStore');
  if (userStore === null)
    return { success: false, error: 'user store does not exists' };

  try {
    const parsedStore = JSON.parse(userStore);
    const user = userStoreSchema.parse(parsedStore);
    return {
      success: true,
      user,
      token
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
}

export function saveToStore(data: UserStoreType) {
  const parse = userStoreSchema.safeParse(data);
  if (!parse.success) {
    return {
      success: false,
      error: parse.error
    };
  }
  localStorage.setItem('userStore', JSON.stringify(parse.data));
  return {
    success: true
  };
}
