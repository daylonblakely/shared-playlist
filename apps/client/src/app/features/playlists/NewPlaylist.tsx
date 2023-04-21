import React, { useState } from 'react';
import { Form, Input, Button, Header } from 'semantic-ui-react';
import { useAddPlaylistMutation } from '../../services/playlists';

function NewPlaylist() {
  const [addPlaylist, { isLoading }] = useAddPlaylistMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addPlaylist({ name, description });
    setName('');
    setDescription('');
  };

  const isFormComplete = !!(name && description);

  return (
    <div
      style={{
        display: ' flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: ' 0 auto',
      }}
    >
      <Header as="h2">Create Spotify Playlist</Header>
      <Form
        onSubmit={handleSubmit}
        loading={isLoading}
        style={{ width: '50%' }}
      >
        <Form.Field required>
          <label>Name</label>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Description</label>
          <Input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Button
          type="submit"
          disabled={!isFormComplete}
          primary={isFormComplete}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewPlaylist;
