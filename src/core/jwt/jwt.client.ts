import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class JwtClient {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any, expiresIn: string) {
    const token = this.jwtService.sign(payload, {
      expiresIn: expiresIn,
    });
    return token;
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
