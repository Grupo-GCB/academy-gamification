import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { RegisterTransactionDTO } from '@transactions/dto';
import {
  FilterTransactionsByStatus,
  RegisterTransaction,
} from '@transactions/use-cases';
import { CollaborationsStatus } from '@shared/constants';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private registerTransaction: RegisterTransaction,
    private filterTransactionsByStatus: FilterTransactionsByStatus,
  ) {}

  @Post('/register')
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Transação registrada com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar uma Transação',
  })
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
  filterByStatus(
    @Query('status') status: CollaborationsStatus,
  ): Promise<Transaction[]> {
    return this.filterTransactionsByStatus.execute({ status });
  }
}
