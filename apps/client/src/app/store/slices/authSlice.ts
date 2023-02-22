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

export const loginAsync = createAsyncThunk('auth/login', async () => {
  const response = await fetch('http://localhost:5000/api/auth/login/success', {
    method: 'GET',
    credentials: 'include',
  });
  return (await response.json()).displayName;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.displayName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.displayName = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.displayName = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
