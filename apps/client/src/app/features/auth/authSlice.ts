import { createSlice } from '@reduxjs/toolkit';
import { api, User } from '../../services/api';
import type { RootState } from '../../store';

export interface AuthState {
  isAuthenticated: boolean;
  displayName: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  displayName: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //   .addMatcher(api.endpoints.login.matchPending, (state, action) => {
      //     console.log('pending', action);
      //   })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.displayName = action.payload.displayName;
      })
      .addMatcher(
        api.endpoints.login.matchRejected,
        (state) => (state = initialState)
      )
      .addMatcher(
        api.endpoints.logout.matchFulfilled,
        (state) => (state = initialState)
      );
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
