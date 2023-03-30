import { AuthModule } from '@auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

import { TransactionsController } from '@shared/infra/http/controllers/transactions.controller';
import { TransactionsRepository } from '@transactions/infra/typeorm/repositories/transactions.repository';
import { ITransactionsRepository } from '@transactions/interfaces';
import {
  FilterTransactionsByStatus,
  FindAllTransactions,
  FindById,
  FindLatestTransactionByUserAndSubType,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';
import { UsersModule } from '@users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [TransactionsController],
  providers: [
    RegisterTransaction,
    UpdateStatus,
    FindById,
    FilterTransactionsByStatus,
    FindAllTransactions,
    FindLatestTransactionByUserAndSubType,
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepository,
    },
  ],
  exports: [ITransactionsRepository],
})
export class TransactionsModule {}
