import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '@auth/auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    const isValid = await this.authService.verifyRefreshToken(refreshToken);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return true;
  }
}
