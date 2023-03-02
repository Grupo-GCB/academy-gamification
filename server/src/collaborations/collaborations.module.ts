import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { FindByStatus } from '@collaborations/use-cases';
import { CollaborationsController } from '@shared/infra/http/controllers/collaborations.controller';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { CollaborationsRepository } from '@collaborations/infra/typeorm/repositories/collaborations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration])],
  controllers: [CollaborationsController],
  providers: [
    FindByStatus,
    {
      provide: ICollaborationsRepository,
      useClass: CollaborationsRepository,
    },
  ],
})
export class CollaborationsModule {}
