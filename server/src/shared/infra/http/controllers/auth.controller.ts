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
import { RefreshTokenGuard } from '@auth/guards';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário logado com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao logar o usuário',
  })
  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: IAuthRequest) {
    return this.authService.login(req.user);
  }

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Refresh token gerado com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao gerar refresh token',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refresh(refreshToken);
  }

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário deslogado com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao deslogar usuário',
  })
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RefreshTokenGuard)
  async logout(@Request() req) {
    const refreshToken = req.body.refreshToken;
    await this.authService.logout(refreshToken);
    return;
  }
}
