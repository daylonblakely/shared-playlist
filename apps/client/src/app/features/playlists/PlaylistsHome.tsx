import React from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import { useFetchPlaylistsQuery } from '../../services/playlists';

const PlaylistList = () => {
  const naivigate = useNavigate();
  const { data: playlists, isLoading } = useFetchPlaylistsQuery();

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading...</Loader>
      </Dimmer>
    );
  }

  // if (!playlists?.length) {
  //   return <div>No playlists....</div>;
  // }

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {playlists?.map((playlist, i) => {
          return (
            <Table.Row
              onClick={() => naivigate(`/playlist/${playlist._id}`)}
              key={i}
            >
              <Table.Cell>{playlist.name}</Table.Cell>
              <Table.Cell>{playlist.description}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
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
