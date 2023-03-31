import { v4 as uuidv4 } from 'uuid';

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
    const refreshToken = new RefreshToken();
    refreshToken.id = uuidv4();
    refreshToken.user = user;
    refreshToken.token = uuidv4();
    refreshToken.expiresAt = new Date(Date.now() + expiresAt);

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
