import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IRefreshTokenRepository } from '@auth/interfaces';
import { User } from '@users/infra/entities';
import { IJwtPayload, IUserToken } from '@auth/interfaces';

@Injectable()
export class Login {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(user: User): Promise<IUserToken> {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      bu: user.business_unit,
      role: user.role,
    };

    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: '10m',
    });

    const refreshTokenExpiresIn: number = 2 * 24 * 60 * 60 * 1000;

    const refreshToken = await this.refreshTokenRepository.createRefreshToken({
      user: user.id,
      expiresAt: refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  }
}
