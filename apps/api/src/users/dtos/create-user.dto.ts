import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  spotifyId: string;

  @IsString()
  displayName: string;

  @IsString()
  email: string;
}
