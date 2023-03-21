import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsModule } from '@transactions/transactions.module';
import { UsersModule } from '@users/user.module';
import { AuthModule } from './auth/auth.module';
import { ormconfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TransactionsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
