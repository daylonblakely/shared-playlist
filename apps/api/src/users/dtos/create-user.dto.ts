import { IsString } from 'class-validator';
import { User } from '@spotify-app/types';

export class CreateUserDto implements Omit<User, '_id' | 'playlists'> {
  @IsString()
  spotifyId: string;

  @IsString()
  displayName: string;

  @IsString()
  email: string;
}
