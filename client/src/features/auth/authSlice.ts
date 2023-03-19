import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: ''
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = '';
    }
  }
});

export const { login, logout } = authSlice.actions;
export const selectToken = (state: any) => state.auth;

export default authSlice.reducer;
