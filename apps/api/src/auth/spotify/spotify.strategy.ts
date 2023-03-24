import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-spotify';
import { UsersService } from '../../users/users.service';

// // TODO - remove this
// // helps avoid TLS socket error in auth callback
// import * as http from 'https';
// http.globalAgent.options.rejectUnauthorized = false;

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: configService.get<string>('SPOTIFY_CALLBACK_URL'),
      scope: [
        'user-read-email',
        'user-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
      ],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, displayName, emails } = profile;
    console.log('validating user');

    let user = await this.usersService.findOneBySpotifyId(id);

    if (!user) {
      console.log('creating new user');
      user = await this.usersService.create({
        spotifyId: id,
        displayName,
        email: emails[0].value,
      });
    }

    return { _id: user._id, displayName: user.displayName, accessToken };
  }
}
