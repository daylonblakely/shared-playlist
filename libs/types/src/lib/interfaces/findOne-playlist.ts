import { Playlist } from './playlist';
import 'spotify-web-api-node';

export interface FindOnePlaylist extends Playlist {
  spotifyFields: SpotifyApi.SinglePlaylistResponse;
}
