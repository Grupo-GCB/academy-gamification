import crypto from 'node:crypto';

import { IRefreshTokenRepository } from '@/auth/interfaces';
import { RefreshToken } from '@auth/infra/typeorm/entities';

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  refreshTokens: RefreshToken[] = [];

  async createRefreshToken({
    user,
    expiresAt,
  }: {
    user: string;
    expiresAt: number;
  }): Promise<RefreshToken> {
    const refreshToken = Object.assign(new RefreshToken(), {
      id: crypto.randomUUID(),
      user: user,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + expiresAt),
    });

    this.refreshTokens.push(refreshToken);
    return refreshToken;
  }

  async findRefreshToken(token: string): Promise<RefreshToken> {
    return this.refreshTokens.find(
      (refreshToken) => refreshToken.token === token,
    );
  }

  async revokeRefreshToken(token: string): Promise<void> {
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.token !== token,
    );
  }
}
