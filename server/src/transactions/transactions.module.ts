import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsController } from '@shared/infra/http/controllers/transactions.controller';
import {
  FilterTransactionsByStatus,
  RegisterTransaction,
} from '@transactions/use-cases';
import { ITransactionsRepository } from '@transactions/interfaces';
import { TransactionsRepository } from '@transactions/infra/typeorm/repositories/transactions.repository';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [
    RegisterTransaction,
    FilterTransactionsByStatus,
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepository,
    },
  ],
})
export class TransactionsModule {}
