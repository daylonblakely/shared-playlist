import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { useFetchPlaylistsQuery } from '../../services/playlists';

const PlaylistList = () => {
  const { data: playlists, isLoading } = useFetchPlaylistsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!playlists?.length) {
    return <div>No playlists....</div>;
  }

  return (
    <ul>
      {playlists.map((playlist) => {
        return <li>{playlist.name}</li>;
      })}
    </ul>
  );
};

function PlaylistsHome() {
  const {
    auth: { isAuthenticated },
  } = useAppSelector((state) => state);

  return (
    <div>{!isAuthenticated ? 'login to see playlists' : <PlaylistList />}</div>
  );
}

export default PlaylistsHome;
