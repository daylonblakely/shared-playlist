import { Types } from 'mongoose';
import { User } from './user';

export interface Playlist {
  _id: Types.ObjectId;
  spotifyId: string;
  name: string;
  createdBy: User;
}
