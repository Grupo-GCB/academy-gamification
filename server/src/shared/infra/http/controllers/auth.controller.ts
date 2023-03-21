import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/guards';
import { IAuthRequest } from '@auth/interfaces';
import { IsPublic } from '@auth/decorators';

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
}
