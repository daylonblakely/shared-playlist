import { IsString } from 'class-validator';
import { CreatePlaylist } from '@spotify-app/types';

export class CreatePlaylistDto implements CreatePlaylist {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
