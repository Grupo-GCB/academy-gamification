import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from '@auth/infra/typeorm/repositories';

@Injectable()
export class VerifyRefreshToken {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute(token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findRefreshToken(
      token,
    );

    return !!refreshToken;
  }
}
