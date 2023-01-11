import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, logOut } from '@/redux/features/auth/authSlice';

import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders(headers, { getState }) {
    const token = (getState() as any).auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = result?.error;

  if (error && 'originalStatus' in error) {
    if (error.originalStatus === 403) {
      console.log('refresh token');
      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      console.log(refreshResult);
      if (refreshResult?.data) {
        api.dispatch(setToken({ ...refreshResult.data }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut);
      }
    }
  }
  return result;
};

export const authService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_builder) => ({})
});
