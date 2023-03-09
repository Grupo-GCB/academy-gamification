import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

import { TransactionsController } from '@shared/infra/http/controllers/transactions.controller';
import { TransactionsRepository } from '@transactions/infra/typeorm/repositories/transactions.repository';
import { ITransactionsRepository } from '@transactions/interfaces';
import {
  FindById,
  RegisterTransaction,
  UpdateStatus,
  FilterTransactionsByStatus,
} from '@transactions/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [
    RegisterTransaction,
    UpdateStatus,
    FindById,
    FilterTransactionsByStatus,
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepository,
    },
  ],
})
export class TransactionsModule {}
