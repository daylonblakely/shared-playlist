import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { SpotifyGuard } from './spotify/spotify.guard';
import { SESSION_COOKIE_KEY } from '../config/constants';
import { User } from '../users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get('/spotify')
  @UseGuards(SpotifyGuard)
  spotifyAuth() {
    // Guard redirects
  }

  @Get('/spotify/callback')
  @UseGuards(SpotifyGuard)
  spotifyAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user as User);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.redirect('/api/');
  }
}
