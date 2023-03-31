import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IRefreshTokenRepository, IJwtPayload } from '@auth/interfaces';
import { User } from '@users/infra/entities';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class Refresh {
  constructor(
    private usersRepository: IUsersRepository,
    private jwtService: JwtService,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(token: string) {
    const refreshToken = await this.refreshTokenRepository.findRefreshToken(
      token,
    );

    if (!refreshToken) {
      throw new BadRequestException('Token de atualização inválido!');
    }

    if (new Date().getTime() > refreshToken.expiresAt.getTime()) {
      throw new BadRequestException('Token de atualização expirado!');
    }

    const user: User = await this.usersRepository.findById(refreshToken.user);

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
