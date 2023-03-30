import {
  Body,
  Controller,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@auth/guards';
import {
  FilterByStatusDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import {
  FilterByStatus,
  FindAllTransactions,
  FindById,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private registerTransaction: RegisterTransaction,
    private findById: FindById,
    private findAllTransactions: FindAllTransactions,
    private updateTransactionStatus: UpdateStatus,
    private filterByStatus: FilterByStatus,
  ) {}

  @ApiTags('Transactions')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Registra uma nova transação',
    description: 'Esta rota permite registrar uma nova transação no sistema.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Transação registrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '01206e8a-2e0a-4ba1-9794-fce53edf74d2',
        },
        user: {
          type: 'string',
          example: 'rafael.ramos@gcbinvestimentos.com',
        },
        responsible: {
          type: 'string',
          example: 'gustavo.wuelta@gcbinvestimentos.com',
        },
        type: {
          type: 'string',
          example: 'TRANSFER',
        },
        sub_type: {
          type: 'string',
          example: 'ENTRY',
        },
        status: {
          type: 'string',
          example: 'PENDING',
        },
        gcbits: {
          type: 'number',
          example: 5000,
        },
        description: {
          type: 'string',
          example: '',
        },
        created_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
        updated_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar uma Transação',
  })
  @Post('/register')
  register(
    @Body()
    data: RegisterTransactionDTO,
  ): Promise<Transaction> {
    return this.registerTransaction.execute(data);
  }

  @ApiTags('Transactions')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Retorna todas as transações',
    description:
      'Esta rota permite recuperar informações de todas as transações cadastradas no sistema.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Lista de todas as transações',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '01206e8a-2e0a-4ba1-9794-fce53edf74d2',
          },
          user: {
            type: 'string',
            example: 'rafael.ramos@gcbinvestimentos.com',
          },
          responsible: {
            type: 'string',
            example: 'gustavo.wuelta@gcbinvestimentos.com',
          },
          type: {
            type: 'string',
            example: 'TRANSFER',
          },
          sub_type: {
            type: 'string',
            example: 'ENTRY',
          },
          status: {
            type: 'string',
            example: 'PENDING',
          },
          gcbits: {
            type: 'number',
            example: 5000,
          },
          description: {
            type: 'string',
            example: '',
          },
          created_at: {
            type: 'string',
            example: '2023-03-29T18:47:09.535Z',
          },
          updated_at: {
            type: 'string',
            example: '2023-03-29T18:47:09.535Z',
          },
        },
      },
    },
  })
  @Get()
  findAll(): Promise<Transaction[]> {
    return this.findAllTransactions.execute();
  }

  @ApiTags('Transactions')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Filtra transações por status',
    description:
      'Esta rota permite recuperar todas as transações com um determinado status.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '01206e8a-2e0a-4ba1-9794-fce53edf74d2',
        },
        user: {
          type: 'string',
          example: 'rafael.ramos@gcbinvestimentos.com',
        },
        responsible: {
          type: 'string',
          example: 'gustavo.wuelta@gcbinvestimentos.com',
        },
        type: {
          type: 'string',
          example: 'TRANSFER',
        },
        sub_type: {
          type: 'string',
          example: 'ENTRY',
        },
        status: {
          type: 'string',
          example: 'PENDING',
        },
        gcbits: {
          type: 'number',
          example: 5000,
        },
        description: {
          type: 'string',
          example: '',
        },
        created_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
        updated_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
      },
    },
  })
  @Get('/filter-by-status')
  async filterTransactionsByStatus(
    @Query() filterByStatusDTO: FilterByStatusDTO,
  ): Promise<Transaction[]> {
    return this.filterByStatus.execute(filterByStatusDTO);
  }

  @ApiTags('Transactions')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Recupera uma transação por ID',
    description:
      'Esta rota permite recuperar informações de uma transação cadastrada no sistema a partir do seu ID.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '01206e8a-2e0a-4ba1-9794-fce53edf74d2',
        },
        user: {
          type: 'string',
          example: 'rafael.ramos@gcbinvestimentos.com',
        },
        responsible: {
          type: 'string',
          example: 'gustavo.wuelta@gcbinvestimentos.com',
        },
        type: {
          type: 'string',
          example: 'TRANSFER',
        },
        sub_type: {
          type: 'string',
          example: 'ENTRY',
        },
        status: {
          type: 'string',
          example: 'PENDING',
        },
        gcbits: {
          type: 'number',
          example: 5000,
        },
        description: {
          type: 'string',
          example: '',
        },
        created_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
        updated_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a transação',
  })
  @Get('/:id')
  getById(@Param('id') id: string): Promise<Transaction> {
    return this.findById.execute(id);
  }

  @ApiTags('Transactions')
  @ApiBearerAuth()
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Atualiza o status de uma transação',
    description:
      'Esta rota permite atualizar o status de uma transação cadastrada no sistema.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Status da transação alterado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '01206e8a-2e0a-4ba1-9794-fce53edf74d2',
        },
        user: {
          type: 'string',
          example: 'rafael.ramos@gcbinvestimentos.com',
        },
        responsible: {
          type: 'string',
          example: 'gustavo.wuelta@gcbinvestimentos.com',
        },
        type: {
          type: 'string',
          example: 'TRANSFER',
        },
        sub_type: {
          type: 'string',
          example: 'ENTRY',
        },
        status: {
          type: 'string',
          example: 'PENDING',
        },
        gcbits: {
          type: 'number',
          example: 5000,
        },
        description: {
          type: 'string',
          example: '',
        },
        created_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
        updated_at: {
          type: 'string',
          example: '2023-03-29T18:47:09.535Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar o status da transação',
  })
  @Put()
  updateStatus(
    @Body() { id, new_status, admin }: UpdateStatusDTO,
  ): Promise<Transaction> {
    return this.updateTransactionStatus.execute({
      id,
      new_status,
      admin,
    });
  }
}
