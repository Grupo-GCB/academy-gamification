import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IRefreshTokenRepository } from '@auth/interfaces';
import { FindById } from '@users/use-cases';
import { User } from '@users/infra/entities';
import { IJwtPayload } from '@auth/interfaces';

@Injectable()
export class Refresh {
  constructor(
    private findById: FindById,
    private jwtService: JwtService,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(token: string) {
    const refreshToken = await this.refreshTokenRepository.findRefreshToken(
      token,
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Token de atualização inválido!');
    }

    if (new Date() > refreshToken.expiresAt) {
      throw new UnauthorizedException('Token de atualização expirado!');
    }

    const user: User = await this.findById.execute(refreshToken.user);

    if (!user) throw new UnauthorizedException('Sem autorização!');

    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      bu: user.business_unit,
      role: user.role,
    };

    const newAccessToken: string = this.jwtService.sign(payload, {
      expiresIn: '10m',
    });

    return {
      accessToken: newAccessToken,
    };
  }
}
