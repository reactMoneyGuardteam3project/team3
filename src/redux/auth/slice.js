// src/redux/auth/slice.js
import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, getUserInfo } from './operations';

const initialState = {
  isLoading: false,
  error: null,
  user: { username: null, email: null, balance: 0 },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      // * Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = { ...action.payload.user };
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // * Login
      .addCase(logIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = { ...action.payload.user };
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // * Logout
      .addCase(logOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = { username: null, email: null, balance: 0 };
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // * Get user info
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = { ...action.payload };
      });
  },
});

export const authReducer = authSlice.reducer;
