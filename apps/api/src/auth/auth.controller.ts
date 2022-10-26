import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SpotifyGuard } from './spotify.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/spotify')
  @UseGuards(SpotifyGuard)
  spotifyAuth() {
    // Guard redirects
  }

  @Get('/spotify/callback')
  @UseGuards(SpotifyGuard)
  spotifyAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return res.redirect('/api/');
  }
}
