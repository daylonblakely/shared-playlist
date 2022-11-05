import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/schemas/user.schema';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    const payload: JwtPayload = { displayName: user.displayName, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
