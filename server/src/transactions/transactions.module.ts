import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsController } from '@shared/infra/http/controllers/transactions.controller';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { TransactionsRepository } from '@transactions/infra/typeorm/repositories/transactions.repository';
import { ITransactionsRepository } from '@transactions/interfaces';
import {
  FilterByStatus,
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
    FilterByStatus,
    FindAllTransactions,
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepository,
    },
  ],
  exports: [ITransactionsRepository],
})
export class TransactionsModule {}
