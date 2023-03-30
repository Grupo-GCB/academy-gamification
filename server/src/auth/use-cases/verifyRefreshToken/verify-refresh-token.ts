import { Injectable } from '@nestjs/common';

import { IRefreshTokenRepository } from '@auth/interfaces';

@Injectable()
export class VerifyRefreshToken {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findRefreshToken(
      token,
    );

    return !!refreshToken;
  }
}
