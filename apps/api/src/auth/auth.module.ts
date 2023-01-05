import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SpotifyStrategy } from './spotify/spotify.strategy';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { JwtAuthStrategy } from './jwt/jwt-auth.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [JwtAuthService, JwtAuthStrategy, SpotifyStrategy],
  exports: [JwtModule, JwtAuthService],
})
export class AuthModule {}
