import { api } from './api';
import { Playlist, CreatePlaylist, FindOnePlaylist } from '@spotify-app/types';

type PlaylistsResponse = Playlist[];

export const playlistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchPlaylists: builder.query<PlaylistsResponse, void>({
      query: () => 'playlists',
      providesTags: (result = []) => [
        ...result.map(
          ({ _id }) => ({ type: 'Playlists', id: _id.toString() } as const)
        ),
        { type: 'Playlists' as const, id: 'LIST' },
      ],
    }),
    addPlaylist: builder.mutation<Playlist, CreatePlaylist>({
      query: (playlist) => ({
        url: 'playlists',
        method: 'POST',
        body: playlist,
      }),
      invalidatesTags: [{ type: 'Playlists', id: 'LIST' }],
    }),
    getPlaylist: builder.query<FindOnePlaylist, string>({
      query: (id) => ({
        url: `playlists/${id}`,
      }),
      providesTags: (_post, _err, id) => [{ type: 'Playlists', id }],
    }),
    updatePlaylist: builder.mutation<Playlist, Partial<Playlist>>({
      query: ({ _id, ...playlist }) => ({
        url: `playlists/${_id}`,
        method: 'PUT',
        body: playlist,
      }),
      invalidatesTags: (playlist) => [
        { type: 'Playlists', id: playlist?._id.toString() },
      ],
    }),
    deletePlaylist: builder.mutation<Playlist, string>({
      query: (id) => ({
        url: `playlists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (playlist) => [
        { type: 'Playlists', id: playlist?._id.toString() },
      ],
    }),
    // inviteUser: builder.mutation({
    //     query(arg) {

    //     },
    // })
  }),
});

export const {
  useAddPlaylistMutation,
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
  useFetchPlaylistsQuery,
  useUpdatePlaylistMutation,
} = playlistsApi;
