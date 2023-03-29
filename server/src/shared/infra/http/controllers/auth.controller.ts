import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { IsPublic } from '@auth/decorators';
import { LocalAuthGuard, RefreshTokenGuard } from '@auth/guards';
import { IAuthRequest } from '@auth/interfaces';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';

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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'gcb123' },
      },
      required: ['email', 'password'],
    },
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example:
            'ee4bbb7778beaf6934ae01ae6ca6db7a97b2cd56a16edd4089dfc110ce2b27111',
        },
      },
      required: ['refreshToken'],
    },
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTY4OTFhMC1kMTk5LTQ4MGQtOGMyMC0zZjQyM2UwOGQ4MTAiLCJlbWFpbCI6ImtheWtlLmZ1amluYWthQGdjYmludmVzdGltZW50b3MuY29tIiwiYnUiOiJBQ0FERU1ZIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgwMTA5OTQ3LCJleHAiOjE2ODAxOTYzNDd9.rKlufyEV0igD4jaIn2OQ473YeWvYDVElbHc0hDJnK68',
        },
      },
      required: ['token'],
    },
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
