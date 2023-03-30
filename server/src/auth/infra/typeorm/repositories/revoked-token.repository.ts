import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RevokedToken } from '@auth/infra/typeorm/entities/revoked-token.entity';

@Injectable()
export class RevokedTokenRepository {
  constructor(
    @InjectRepository(RevokedToken)
    private revokedTokenRepository: Repository<RevokedToken>,
  ) {}

  async revokeToken(token: string): Promise<void> {
    const revokedToken = this.revokedTokenRepository.create({ token });
    await this.revokedTokenRepository.save(revokedToken);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = await this.revokedTokenRepository.findOne({
      where: { token },
    });
    return !!revokedToken;
  }
}
