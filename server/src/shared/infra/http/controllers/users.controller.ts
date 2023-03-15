import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';
import { RegisterUser } from '@users/use-cases';

@Controller('users')
export class UsersController {
  constructor(private registerUser: RegisterUser) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário registrado com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar um usuário',
  })
  @Post('/register')
  register(
    @Body()
    data: RegisterUserDTO,
  ): Promise<User> {
    return this.registerUser.execute(data);
  }
}
