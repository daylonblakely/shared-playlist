import { IsString, IsNotEmpty } from 'class-validator';
import { CreatePlaylist } from '@spotify-app/types';

export class CreatePlaylistDto implements CreatePlaylist {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
