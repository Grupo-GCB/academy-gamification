import { Get, Query } from '@nestjs/common';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';
import { FindByEmail, FindById, RegisterUser } from '@users/use-cases';

@Controller('users')
export class UsersController {
  constructor(
    private registerUser: RegisterUser,
    private findUserById: FindById,
    private findUserByEmail: FindByEmail,
  ) {}

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

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o usuário',
  })
  @Get('/:id')
  findById(@Query('id') id: string): Promise<User> {
    return this.findUserById.execute(id);
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o usuário',
  })
  findByEmail(@Query('email') email: string): Promise<User> {
    return this.findUserByEmail.execute(email);
  }
}
