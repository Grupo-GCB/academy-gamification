import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormconfig } from './ormconfig';

import { AuthModule } from '@auth/auth.module';
import { TransactionsModule } from '@transactions/transactions.module';
import { UsersModule } from '@users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TransactionsModule,
    UsersModule,
    AuthModule,
    SendGridModule.forRoot({ apikey: process.env.SEND_GRID_ACESS_KEY }),
  ],
})
export class AppModule {}
