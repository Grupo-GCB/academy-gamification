import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { RegisterTransactionDTO } from '@transactions/dto/register-transaction-dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private registerTransaction: RegisterTransaction) {}

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
}