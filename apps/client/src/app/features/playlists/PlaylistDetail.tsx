import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaylistQuery } from '../../services/playlists';

function PlaylistDetail() {
  const params = useParams();
  const { data: playlist, isLoading } = useGetPlaylistQuery(
    params.id as string
  );

  return <div>PlaylistDetail</div>;
}

export default PlaylistDetail;
