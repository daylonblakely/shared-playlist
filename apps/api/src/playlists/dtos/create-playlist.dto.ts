import { IsString } from 'class-validator';
import { Playlist } from '@spotify-app/types';

export class CreatePlaylistDto
  implements Omit<Playlist, '_id' | 'spotifyId' | 'createdBy'>
{
  @IsString()
  name: string;

  @IsString()
  description: string;
}
