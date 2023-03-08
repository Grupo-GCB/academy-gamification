import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { RegisterTransactionDTO, UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import {
  FindById,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private registerTransaction: RegisterTransaction,
    private findById: FindById,
    private updateTransactionStatus: UpdateStatus,
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

  @Get(':id')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a transação',
  })
  findOne(@Param('id') id: string): Promise<Transaction> {
    return this.findById.execute(id);
  }

  @Put()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Status da transação alterado com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar o status da transação',
  })
  updateStatus(
    @Body() { transaction_id, newStatus }: UpdateStatusDTO,
  ): Promise<Transaction> {
    return this.updateTransactionStatus.execute({
      transaction_id,
      newStatus,
    });
  }
}
