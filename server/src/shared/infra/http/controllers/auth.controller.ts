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
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Autentica um usuário no sistema',
    description:
      'Esta rota permite autenticar um usuário no sistema a partir do seu email e senha. A API retorna um token de autenticação JWT que deve ser enviado no header "Authorization" em todas as requisições que necessitem autenticação.',
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
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Usuário logado com sucesso!',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTY4OTFhMC1kMTk5LTQ4MGQtOGMyMC0zZjQyM2UwOGQ4MTAiLCJlbWFpbCI6ImtheWtlLmZ1amluYWthQGdjYmludmVzdGltZW50b3MuY29tIiwiYnUiOiJBQ0FERU1ZIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgwMDQ4MjgzLCJleHAiOjE2ODAwNDgzNDN9.p7V-UKQ27JlSjjDfHgXJRYxw73WcCiFckALdT_S7UFg',
        },
        refreshToken: {
          type: 'string',
          example:
            'ee4bbb7778beaf6934ae01ae6ca6db7a97b2cd56a16edd4089dfc110ce2b277b',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao logar o usuário!',
  })
  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: IAuthRequest) {
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Renova um token de autenticação JWT',
    description:
      'Esta rota permite renovar um token de autenticação JWT expirado utilizando um refresh token válido.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Refresh token gerado com sucesso!',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTY4OTFhMC1kMTk5LTQ4MGQtOGMyMC0zZjQyM2UwOGQ4MTAiLCJlbWFpbCI6ImtheWtlLmZ1amluYWthQGdjYmludmVzdGltZW50b3MuY29tIiwiYnUiOiJBQ0FERU1ZIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgwMDQ4MjgzLCJleHAiOjE2ODAwNDgzNDN9.p7V-UKQ27JlSjjDfHgXJRYxw73WcCiFckALdT_S7UFg',
        },
        refreshToken: {
          type: 'string',
          example:
            'ee4bbb7778beaf6934ae01ae6ca6db7a97b2cd56a16edd4089dfc110ce2b277b',
        },
      },
      required: ['accessToken', 'refreshToken'],
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao gerar refresh token!',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTY4OTFhMC1kMTk5LTQ4MGQtOGMyMC0zZjQyM2UwOGQ4MTAiLCJlbWFpbCI6ImtheWtlLmZ1amluYWthQGdjYmludmVzdGltZW50b3MuY29tIiwiYnUiOiJBQ0FERU1ZIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgwMTA5OTQ3LCJleHAiOjE2ODAxOTYzNDd9.rKlufyEV0igD4jaIn2OQ473YeWvYDVElbHc0hDJnK68',
        },
      },
      required: ['accessToken'],
    },
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refresh(refreshToken);
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Faz o logout de um usuário autenticado',
    description:
      'Esta rota permite realizar o logout de um usuário autenticado, invalidando o seu token de autenticação JWT. O token deve ser enviado no corpo da requisição.',
  })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Usuário deslogado com sucesso!',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao deslogar usuário!',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTY4OTFhMC1kMTk5LTQ4MGQtOGMyMC0zZjQyM2UwOGQ4MTAiLCJlbWFpbCI6ImtheWtlLmZ1amluYWthQGdjYmludmVzdGltZW50b3MuY29tIiwiYnUiOiJBQ0FERU1ZIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgwMTA5OTQ3LCJleHAiOjE2ODAxOTYzNDd9.rKlufyEV0igD4jaIn2OQ473YeWvYDVElbHc0hDJnK68',
        },
      },
      required: ['refreshToken'],
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
