import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollaborationsModule } from './collaborations/collaborations.module';
import { RewardsModule } from '@reward/reward.module';
import { TransactionsModule } from '@transactions/transactions.module';

import { ormconfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CollaborationsModule,
    TransactionsModule,
    RewardsModule,
  ],
})
export class AppModule {}
