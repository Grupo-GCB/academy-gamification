import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsModule } from '@transactions/transactions.module';
import { UsersModule } from '@users/user.module';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { ormconfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CollaborationsModule,
    TransactionsModule,
    UsersModule,
  ],
})
export class AppModule {}
