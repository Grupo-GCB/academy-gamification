import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import {
  FilterUserByRoleDTO,
  FindUserByIdDTO,
  RegisterUserDTO,
  UpdateBusinessUnitDTO,
  UpdatePasswordDTO,
} from '@users/dto';

import { IsPublic } from '@auth/decorators';
import { JwtAuthGuard } from '@auth/guards';
import { User } from '@users/infra/entities/user.entity';
import {
  DeleteUser,
  FilterUsersByRole,
  FindByEmail,
  FindById,
  GetGCBitsBalance,
  ListAllUsers,
  RegisterUser,
  UpdateBusinessUnit,
  UpdatePassword,
} from '@users/use-cases';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private registerUser: RegisterUser,
    private findUserById: FindById,
    private findUserByEmail: FindByEmail,
    private listAllUsers: ListAllUsers,
    private updateBusinessUnit: UpdateBusinessUnit,
    private deleteUser: DeleteUser,
    private updatePassword: UpdatePassword,
    private getGCBitsBalance: GetGCBitsBalance,
    private filterUserByRole: FilterUsersByRole,
  ) {}

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Registra um novo usuário',
    description: 'Esta rota permite o registro de um novo usuário no sistema.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário registrado com sucesso!',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
        },
        name: {
          type: 'string',
          example: 'Kayke Fujinaka',
        },
        email: {
          type: 'string',
          example: 'kayke.fujinaka@gcbinvestimentos.com',
        },
        password: {
          type: 'string',
          example:
            '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
        },
        business_unit: {
          type: 'string',
          example: 'ACADEMY',
        },
        role: {
          type: 'string',
          example: 'ADMIN',
        },
        updated_at: {
          type: 'timestamp',
          example: null,
        },
        deleted_at: {
          type: 'timestamp',
          example: null,
        },
        created_at: {
          type: 'timestamp',
          example: '2023-03-29T00:02:05.494Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar um usuário!',
  })
  @Post('/register')
  @IsPublic()
  register(
    @Body()
    data: RegisterUserDTO,
  ): Promise<User> {
    return this.registerUser.execute(data);
  }

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Retorna um usuário pelo ID',
    description:
      'Esta rota permite recuperar informações de um usuário específico a partir de seu ID.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
        },
        name: {
          type: 'string',
          example: 'Kayke Fujinaka',
        },
        email: {
          type: 'string',
          example: 'kayke.fujinaka@gcbinvestimentos.com',
        },
        password: {
          type: 'string',
          example:
            '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
        },
        business_unit: {
          type: 'string',
          example: 'ACADEMY',
        },
        role: {
          type: 'string',
          example: 'ADMIN',
        },
        updated_at: {
          type: 'timestamp',
          example: null,
        },
        deleted_at: {
          type: 'timestamp',
          example: null,
        },
        created_at: {
          type: 'timestamp',
          example: '2023-03-29T00:02:05.494Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o usuário!',
  })
  @Get('/:id')
  async findOne(@Param() { id }: FindUserByIdDTO): Promise<User> {
    return this.findUserById.execute(id);
  }

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Retorna todos os usuários',
    description:
      'Esta rota permite recuperar informações de todos os usuários cadastrados no sistema.',
  })
  @ApiOkResponse({
    description: 'Usuários encontrados!',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
          },
          name: {
            type: 'string',
            example: 'Kayke Fujinaka',
          },
          email: {
            type: 'string',
            example: 'kayke.fujinaka@gcbinvestimentos.com',
          },
          password: {
            type: 'string',
            example:
              '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
          },
          business_unit: {
            type: 'string',
            example: 'ACADEMY',
          },
          role: {
            type: 'string',
            example: 'ADMIN',
          },
          updated_at: {
            type: 'timestamp',
            example: null,
          },
          deleted_at: {
            type: 'timestamp',
            example: null,
          },
          created_at: {
            type: 'timestamp',
            example: '2023-03-29T00:02:05.494Z',
          },
        },
      },
    },
  })
  @Get()
  findAll(): Promise<User[]> {
    return this.listAllUsers.execute();
  }

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Atualiza a unidade de negócio de um usuário',
    description:
      'Esta rota permite atualizar a unidade de negócio de um usuário específico.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Unidade de negócio alterada com sucesso!',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
        },
        name: {
          type: 'string',
          example: 'Kayke Fujinaka',
        },
        email: {
          type: 'string',
          example: 'kayke.fujinaka@gcbinvestimentos.com',
        },
        password: {
          type: 'string',
          example:
            '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
        },
        business_unit: {
          type: 'string',
          example: 'ACADEMY',
        },
        role: {
          type: 'string',
          example: 'ADMIN',
        },
        updated_at: {
          type: 'timestamp',
          example: null,
        },
        deleted_at: {
          type: 'timestamp',
          example: null,
        },
        created_at: {
          type: 'timestamp',
          example: '2023-03-29T00:02:05.494Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar a unidade de negócio!',
  })
  @Put('/change-bu')
  updateBU(
    @Body() { email, responsible, new_bu }: UpdateBusinessUnitDTO,
  ): Promise<User> {
    return this.updateBusinessUnit.execute({
      email,
      responsible,
      new_bu,
    });
  }

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Exclui um usuário pelo ID',
    description:
      'Esta rota permite a exclusão de um usuário específico a partir de seu ID.',
  })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
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

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Altera a senha de um usuário',
    description:
      'Esta rota permite alterar a senha de um usuário a partir do seu email, senha antiga, nova senha e a confirmação da nova senha.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Senha alterada com sucesso!',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
        },
        name: {
          type: 'string',
          example: 'Kayke Fujinaka',
        },
        email: {
          type: 'string',
          example: 'kayke.fujinaka@gcbinvestimentos.com',
        },
        password: {
          type: 'string',
          example:
            '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
        },
        business_unit: {
          type: 'string',
          example: 'ACADEMY',
        },
        role: {
          type: 'string',
          example: 'ADMIN',
        },
        updated_at: {
          type: 'timestamp',
          example: null,
        },
        deleted_at: {
          type: 'timestamp',
          example: null,
        },
        created_at: {
          type: 'timestamp',
          example: '2023-03-29T00:02:05.494Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar a senha!',
  })
  @Put('/change-password')
  changePassword(
    @Body()
    { email, password, new_password, confirm_new_password }: UpdatePasswordDTO,
  ): Promise<void> {
    return this.updatePassword.execute({
      email,
      password,
      new_password,
      confirm_new_password,
    });
  }

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Retorna o saldo do colaborador',
    description:
      'Esta rota permite recuperar o saldo de GCBits de um colaborador específico.',
  })
  @Get('/balance/:user')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Saldo do colaborador!',
    schema: {
      type: 'object',
      properties: {
        balance: {
          type: 'number',
          example: 30000,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível retornar o saldo do colaborador!',
  })
  getGCBitBalance(@Param('user') user: string) {
    return this.getGCBitsBalance.execute({ user });
  }

  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Filtra usuários por cargo',
    description: 'Esta rota permite filtrar usuários por cargo.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Usuários pelo cargo!',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
          },
          name: {
            type: 'string',
            example: 'Kayke Fujinaka',
          },
          email: {
            type: 'string',
            example: 'kayke.fujinaka@gcbinvestimentos.com',
          },
          password: {
            type: 'string',
            example:
              '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
          },
          business_unit: {
            type: 'string',
            example: 'ACADEMY',
          },
          role: {
            type: 'string',
            example: 'ADMIN',
          },
          updated_at: {
            type: 'timestamp',
            example: null,
          },
          deleted_at: {
            type: 'timestamp',
            example: null,
          },
          created_at: {
            type: 'timestamp',
            example: '2023-03-29T00:02:05.494Z',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível filtrar os usuários pelo cargo!',
  })
  @Get('/filter/users-by-role')
  async filterByRole(
    @Query() filterUserByRoleDTO: FilterUserByRoleDTO,
  ): Promise<User[]> {
    return this.filterUserByRole.execute(filterUserByRoleDTO);
  }
}
