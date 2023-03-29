import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { RefreshTokenRepository } from '@auth/infra/typeorm/repositories/refresh-token.repository';
import { RevokedTokenRepository } from '@auth/infra/typeorm/repositories/revoked-token.repository';
import { IJwtPayload, IUserToken } from '@auth/interfaces';
import { User } from '@users/infra/entities/user.entity';
import { FindByEmail, FindById } from '@users/use-cases';

@Injectable()
export class AuthService {
  constructor(
    private findByEmail: FindByEmail,
    private findById: FindById,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
    private revokedTokenRepository: RevokedTokenRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail.execute(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) return { ...user, password: undefined };
    }

    throw new Error('Endereço de e-mail ou senha incorretos!');
  }

  async login(user: User): Promise<IUserToken> {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      bu: user.business_unit,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });

    const refreshTokenExpiresIn = 2 * 24 * 60 * 60 * 1000;

    const refreshToken = await this.refreshTokenRepository.createRefreshToken({
      user: user.id,
      expiresAt: refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async refresh(token: string) {
    const refreshToken = await this.refreshTokenRepository.findRefreshToken(
      token,
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Token de atualização inválido!');
    }

    if (new Date() > refreshToken.expiresAt) {
      throw new UnauthorizedException('Token de atualização expirado!');
    }

    const user = await this.findById.execute(refreshToken.user);

    if (!user) throw new UnauthorizedException('Sem autorização!');

    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      bu: user.business_unit,
      role: user.role,
    };

    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: '10min',
    });

    return {
      accessToken: newAccessToken,
    };
  }

  async logout(token: string): Promise<void> {
    try {
      this.jwtService.verify(token);
      await this.revokedTokenRepository.revokeToken(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido!');
    }
  }

  async verifyRefreshToken(token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findRefreshToken(
      token,
    );

    return !!refreshToken;
  }
}
