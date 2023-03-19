import { apiSlice } from '@/redux/apiSlice';
import type { Credentials, RegisterData } from './Auth';

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginService: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    registerService: builder.mutation({
      query: (credentials: RegisterData) => ({
        url: '/register',
        method: 'POST',
        body: credentials
      })
    }),
    logoutService: builder.mutation({
      query: () => '/logout'
    }),
    refreshService: builder.mutation({
      query: () => '/refresh'
    })
  })
});

export const {
  useLoginServiceMutation,
  useRegisterServiceMutation,
  useLogoutServiceMutation,
  useRefreshServiceMutation
} = authService;
