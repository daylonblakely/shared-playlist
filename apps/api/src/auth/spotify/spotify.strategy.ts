import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-spotify';

// TODO - remove this
// helps avoid TLS socket error in auth callback
import * as http from 'https';
http.globalAgent.options.rejectUnauthorized = false;

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: configService.get<string>('SPOTIFY_CALLBACK_URL'),
      scope: ['user-read-email', 'user-read-private'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, displayName, emails, photos } = profile;
    console.log('validating user');

    // let user = await this.usersService.findOne({
    //   where: { provider: 'google', providerId: id },
    // });
    // if (!user) {
    //   user = await this.usersService.create({
    //     provider: 'google',
    //     providerId: id,
    //     name: name.givenName,
    //     username: emails[0].value,
    //   });
    // }
    const user = {
      email: emails[0].value,
      picture: photos[0],
      displayName,
      id,
      accessToken,
    };
    return user;
  }
}
