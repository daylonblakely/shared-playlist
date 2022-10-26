import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SpotifyStrategy } from './spotify.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SpotifyStrategy],
})
export class AuthModule {}
