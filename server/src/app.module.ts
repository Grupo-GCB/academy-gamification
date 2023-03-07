import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormconfig } from './ormconfig';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { TransactionsModule } from '@transactions/transactions.module';

require('dotenv/config');
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CollaborationsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
