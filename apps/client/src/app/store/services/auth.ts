import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';

export interface UserResponse {
  //   id: string;
  displayName: string;
}

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth/',
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = (getState() as RootState).auth.accessToken;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    spotifyLogin: builder.mutation<UserResponse, void>({
      query: () => ({
        url: 'login/success',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

export const { useSpotifyLoginMutation } = api;
