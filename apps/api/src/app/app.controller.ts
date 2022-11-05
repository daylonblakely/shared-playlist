import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivate(@Req() req: Request) {
    return req.user;
  }
}
