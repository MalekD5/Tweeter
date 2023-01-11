import { configureStore } from '@reduxjs/toolkit';
import { postApi } from './features/posts/postsSlice';
import { authReducer } from './features/auth/authSlice';
import { authService } from './services/authService';
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [authService.reducerPath]: authService.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(postApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
