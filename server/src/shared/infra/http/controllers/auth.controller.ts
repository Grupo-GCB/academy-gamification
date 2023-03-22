import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/guards';
import { IAuthRequest } from '@auth/interfaces';
import { IsPublic } from '@auth/decorators';
import { RefreshToken } from '@auth/infra/typeorm/entities/refresh-token.entity';
import { RefreshTokenGuard } from '@auth/guards/refresh-token.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: IAuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refresh(@Body() refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RefreshTokenGuard)
  async logout(@Request() req) {
    const refreshToken = req.body.refreshToken;
    await this.authService.logout(refreshToken);
    return;
  }
}
