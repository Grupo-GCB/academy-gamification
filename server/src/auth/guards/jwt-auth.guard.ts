import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '@auth/decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') return canActivate;

    const canActicatePromise = canActivate as Promise<boolean>;

    return canActicatePromise.catch((error) => {
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException('Sem autorização!');

      throw new UnauthorizedException('Sem autorização!');
    });
  }
}
