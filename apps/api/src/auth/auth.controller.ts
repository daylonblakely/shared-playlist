import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { SpotifyGuard } from '../guards/spotify.guard';
import { SESSION_COOKIE_KEY } from '../config/constants';

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
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      signed: true,
    });
    return res.redirect('/api/');
  }
}