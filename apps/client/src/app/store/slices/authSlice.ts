import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  displayName: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  displayName: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      'http://localhost:5000/api/auth/login/success',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const { displayName } = await response.json();

    return displayName || rejectWithValue('');
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    return response.ok || rejectWithValue('');
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.displayName = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.displayName = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.displayName = null;
      });
  },
});

export default authSlice.reducer;
