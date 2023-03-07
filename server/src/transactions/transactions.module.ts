import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsController } from '@shared/infra/http/controllers/transactions.controller';
import { RegisterTransaction } from '@transactions/use-cases';
import { ITransactionsRepository } from '@transactions/interfaces/ITransactionsRepository';
import { TransactionsRepository } from '@transactions/infra/typeorm/repositories/transactions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [
    RegisterTransaction,
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepository,
    },
  ],
})
export class CollaborationsModule {}
