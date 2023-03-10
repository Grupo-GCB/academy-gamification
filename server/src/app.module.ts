import { CollaboratorModule } from '@collaborator/collaborator.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '@transactions/transactions.module';

import { CollaborationsModule } from './collaborations/collaborations.module';
import { ormconfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CollaborationsModule,
    TransactionsModule,
    CollaboratorModule,
  ],
})
export class AppModule {}
