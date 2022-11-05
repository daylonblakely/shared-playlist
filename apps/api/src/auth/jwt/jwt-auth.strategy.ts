import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESSION_COOKIE_KEY } from '../../config/constants';

export type JwtPayload = { sub: string; displayName: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      //   TODO - figure out a better way to handle this
      console.log(req.headers);
      //   if (req && req.cookies) {
      //     token = req.cookies[SESSION_COOKIE_KEY];
      //   }
      token = req?.headers?.cookie.split('=')[1];
      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, displayName: payload.displayName };
  }
}
