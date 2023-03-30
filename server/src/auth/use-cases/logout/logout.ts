import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IRevokedTokenRepository } from '@auth/interfaces';

@Injectable()
export class Logout {
  constructor(
    private jwtService: JwtService,
    private revokedTokenRepository: IRevokedTokenRepository,
  ) {}

  async execute(token: string): Promise<void> {
    try {
      this.jwtService.verify(token);
      await this.revokedTokenRepository.revokeToken(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido!');
    }
  }
}
