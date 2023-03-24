import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

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
  reducers: {},
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

export default slice.reducer;
