import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SpotifyToken } from '../decorators/spotify-token.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivate(@SpotifyToken() token: string) {
    return token;
  }
}
