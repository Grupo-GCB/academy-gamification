import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '@auth/decorators';
import { RevokedTokenRepository } from '@auth/infra/typeorm/repositories/revoked-token.repository';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private revokedTokenRepository: RevokedTokenRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (token && (await this.revokedTokenRepository.isTokenRevoked(token))) {
      throw new UnauthorizedException('Token revogado!');
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') return canActivate;

    const canActicatePromise = canActivate as Promise<boolean>;

    return canActicatePromise.catch((error) => {
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException('Sem autorização!');
      throw new UnauthorizedException();
    });
  }
}
