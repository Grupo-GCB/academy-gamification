import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SendGridModule } from '@anchan828/nest-sendgrid';
import { TransactionsModule } from '@transactions/transactions.module';
import { UsersModule } from '@users/user.module';
import { ormconfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TransactionsModule,
    UsersModule,
    SendGridModule.forRoot({ apikey: process.env.SEND_GRID_ACESS_KEY }),
  ],
})
export class AppModule {}
