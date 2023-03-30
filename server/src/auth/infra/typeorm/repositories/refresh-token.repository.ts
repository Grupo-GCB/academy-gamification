import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'node:crypto';
import { Repository } from 'typeorm';

import { RefreshTokenDTO } from '@auth/dto';
import { RefreshToken } from '@auth/infra/typeorm/entities';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async createRefreshToken({
    user,
    expiresAt,
  }: RefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.refreshTokenRepository.create({
      token: crypto.randomBytes(32).toString('hex'),
      user,
      expiresAt: new Date(Date.now() + expiresAt),
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  async findRefreshToken(token: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({ where: { token } });
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }
}
