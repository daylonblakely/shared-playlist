import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useGetPlaylistQuery } from '../../services/playlists';

function PlaylistDetail() {
  const params = useParams();
  const { data: playlist, isLoading } = useGetPlaylistQuery(
    params.id as string
  );

  return (
    // <div style={{ backgroundColor: 'red', height: '100%' }}></div>
    <Grid
      verticalAlign="middle"
      columns={2}
      centered
      style={{ margin: 0, padding: 0, height: 'calc(100vh - 60px)' }}
    >
      <Grid.Row>
        <Grid.Column>
          <div style={{ height: '200px', backgroundColor: 'blue' }}></div>
          <br />
          <div style={{ height: '200px', backgroundColor: 'green' }}></div>
        </Grid.Column>
        <Grid.Column>
          <div style={{ height: '200px', backgroundColor: 'yellow' }}></div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PlaylistDetail;
