import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import {
  FindUserByIdDTO,
  RegisterUserDTO,
  UpdateBusinessUnitDTO,
  UpdatePasswordDTO,
} from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import {
  DeleteUser,
  FindById,
  ListAllUsers,
  RegisterUser,
  UpdateBusinessUnit,
  UpdatePassword,
} from '@users/use-cases';

@Controller('users')
export class UsersController {
  constructor(
    private registerUser: RegisterUser,
    private findById: FindById,
    private listAllUsers: ListAllUsers,
    private updateBusinessUnit: UpdateBusinessUnit,
    private deleteUser: DeleteUser,
    private updatePassword: UpdatePassword,
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
  async findOne(@Param() { id }: FindUserByIdDTO): Promise<User> {
    return this.findById.execute(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.listAllUsers.execute();
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Unidade de negócio alterada com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar a unidade de negócio',
  })
  @Put('/change-bu')
  updateBU(
    @Body() { id, responsible, new_bu }: UpdateBusinessUnitDTO,
  ): Promise<User> {
    return this.updateBusinessUnit.execute({
      id,
      responsible,
      new_bu,
    });
  }

  @ApiNoContentResponse({
    status: HttpStatus.OK,
    description: 'Usuário deletado com sucesso!',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o usuário!',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteUser.execute(id);
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Senha alterada com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar a senha',
  })
  @Put('/change-password')
  changePassword(
    @Body()
    { id, password, new_password, confirm_new_password }: UpdatePasswordDTO,
  ): Promise<void> {
    return this.updatePassword.execute({
      id,
      password,
      new_password,
      confirm_new_password,
    });
  }
}
