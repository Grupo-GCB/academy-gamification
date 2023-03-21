import { compare, bcrypt } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { FindByEmail } from '@users/use-cases';
import { User } from '@users/infra/entities/user.entity';
import { IJwtPayload, IUserToken } from '@auth/interfaces';
import { LoginDTO } from '@auth/dto';

@Injectable()
export class AuthService {
  constructor(
    private findByEmail: FindByEmail,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDTO): Promise<User> {
    const user = await this.findByEmail.execute(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) return { ...user, password: undefined };
    }

    throw new Error('Email address or password provided is incorrect.');
  }

  async login(user: User): Promise<IUserToken> {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      bu: user.business_unit,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  // async refresh(refreshToken: string) {
  //   const decoded = this.jwtService.decode(refreshToken) as IJwtPayload;

  //   const user = await this.validateUser(decoded);

  //   if (!user) throw new UnauthorizedException('Sem autorização');

  //   const payload: IJwtPayload = {
  //     sub: user.id,
  //     email: user.email,
  //     bu: user.business_unit,
  //     role: user.role,
  //   };

  //   const newAccessToken = this.jwtService.sign(payload, {
  //     expiresIn: '10m',
  //   });

  //   return {
  //     accessToken: newAccessToken,
  //   };
  // }
}
