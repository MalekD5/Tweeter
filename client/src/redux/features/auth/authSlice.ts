import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
    logOut(state, _action) {
      state.token = null;
    }
  }
});

export const { setToken, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectToken = (state: any) => state.auth.token;
