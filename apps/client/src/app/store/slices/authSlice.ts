import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  displayName: string | null;
  //   accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  displayName: null,
  //   accessToken: null,
};

// export const login = createAsyncThunk('auth/login', async () => {
//   const response = await fetch('/api/auth/spotify');
//   console.log(response);
//   return '';
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.displayName = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.displayName = null;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
  //       state.isAuthenticated = true;
  //       state.accessToken = action.payload;
  //     });
  //   },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
