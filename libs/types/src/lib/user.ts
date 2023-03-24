import { Types } from 'mongoose';
import { Playlist } from './playlist';

export interface User {
  _id: Types.ObjectId;
  spotifyId: string;
  displayName: string | null;
  email: string;
  playlists: Playlist[];
}
