import { handleToken } from '@/utils/storage';
import { GetRefreshTokenResponse } from '@common/types/Endpoints';
import { QueryClient } from 'react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      useErrorBoundary: true
    },
    queries: {
      useErrorBoundary: true,
      staleTime: 10 * (60 * 1000)
    }
  }
});

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

export const instanceWithRefresh = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true
});

instanceWithRefresh.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await refresh();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instanceWithRefresh(originalRequest);
      }
      return Promise.reject(err);
    }
  }
);

export function prepareToken() {
  const tokenLocation = localStorage.getItem('persist');

  let token =
    tokenLocation === 'false'
      ? sessionStorage.getItem('token')
      : localStorage.getItem('token');

  if (token) {
    return {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  throw Error('Token not found');
}

/**
 * This function will hit the /refresh endpoint and attemtps to grab a new access token
 * else it will throw an error
 */
async function refresh() {
  const token = prepareToken();
  return instance
    .get<GetRefreshTokenResponse>('/refresh', token)
    .then(({ data }) => {
      const token = data.token;
      handleToken(token);
      return token;
    })
    .catch(() => null);
}
