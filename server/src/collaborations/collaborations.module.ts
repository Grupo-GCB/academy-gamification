import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CollaborationsRepository } from '@collaborations/infra/typeorm/repositories/collaborations.repository';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import {
  FilterByStatus,
  FindOne,
  RegisterCollaboration,
  UpdateStatus,
} from '@collaborations/use-cases';
import { CollaborationsController } from '@shared/infra/http/controllers/collaborations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration])],
  controllers: [CollaborationsController],
  providers: [
    FilterByStatus,
    RegisterCollaboration,
    FindOne,
    UpdateStatus,
    {
      provide: ICollaborationsRepository,
      useClass: CollaborationsRepository,
    },
  ],
})
export class CollaborationsModule {}
