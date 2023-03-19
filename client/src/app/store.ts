import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features';
import { apiSlice } from './apiSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});
