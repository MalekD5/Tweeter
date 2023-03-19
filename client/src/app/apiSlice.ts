import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Tweet'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
      const tokenLocation = localStorage.getItem('persist');

      const token =
        tokenLocation === 'false'
          ? sessionStorage.getItem('token')
          : localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: () => ({})
});
