import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RevokedTokenRepository } from '@auth/infra/typeorm/repositories';

@Injectable()
export class Logout {
  constructor(
    private jwtService: JwtService,
    private revokedTokenRepository: RevokedTokenRepository,
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
