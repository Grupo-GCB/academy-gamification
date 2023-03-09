import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { RegisterTransaction } from '@transactions/use-cases';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private registerTransaction: RegisterTransaction,
    private findById: FindById,
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
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a transação',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transaction> {
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
    @Body() { id, newStatus }: UpdateStatusDTO,
  ): Promise<Transaction> {
    return this.updateTransactionStatus.execute({
      id,
      newStatus,
    });
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
