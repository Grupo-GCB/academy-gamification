import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { VerifyRefreshToken } from '@auth/use-cases';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private verifyRefreshToken: VerifyRefreshToken) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Token de atualização não foi passado!');
    }

    try {
      const decodedPayload = await this.verifyRefreshToken.execute(
        refreshToken,
      );
      req.user = decodedPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de atualização inválido!');
    }
  }
}
