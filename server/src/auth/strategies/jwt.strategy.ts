import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayload, IUserFromJwt } from '@auth/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUserFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      bu: payload.bu,
      role: payload.role,
    };
  }
}
