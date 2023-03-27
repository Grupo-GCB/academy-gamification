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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import {
  FilterTransactionsByStatusDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import {
  FilterTransactionsByStatus,
  FindAllTransactions,
  FindById,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';
import { JwtAuthGuard } from '@auth/guards';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private registerTransaction: RegisterTransaction,
    private findById: FindById,
    private findAllTransactions: FindAllTransactions,
    private updateTransactionStatus: UpdateStatus,
    private filterTransactionsByStatus: FilterTransactionsByStatus,
  ) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Transação registrada com sucesso',
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

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @Get()
  findAll(): Promise<Transaction[]> {
    return this.findAllTransactions.execute();
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @Get('/filter-by-status')
  async filterByStatus(
    @Query() filterTransactionsByStatusDTO: FilterTransactionsByStatusDTO,
  ): Promise<Transaction[]> {
    return this.filterTransactionsByStatus.execute(
      filterTransactionsByStatusDTO,
    );
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a transação',
  })
  @Get('/:id')
  getById(@Param('id') id: string): Promise<Transaction> {
    return this.findById.execute(id);
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Status da transação alterado com sucesso',
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
