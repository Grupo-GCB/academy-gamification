import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsController } from '@shared/infra/http/controllers';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { TransactionsRepository } from '@transactions/infra/typeorm/repositories';
import { ITransactionsRepository } from '@transactions/interfaces';
import {
  FilterTransactionsByStatus,
  FindAllTransactions,
  FindById,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';
import { UsersModule } from '@users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UsersModule],
  controllers: [TransactionsController],
  providers: [
    RegisterTransaction,
    UpdateStatus,
    FindById,
    FilterTransactionsByStatus,
    FindAllTransactions,
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepository,
    },
  ],
  exports: [ITransactionsRepository],
})
export class TransactionsModule {}
