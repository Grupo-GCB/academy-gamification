import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CollaborationsController } from '@shared/infra/http/controllers/collaborations.controller';
import { CollaborationsRepository } from '@collaborations/infra/typeorm/repositories/collaborations.repository';
import { FilterByAcademyAndStatus } from '@collaborations/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration])],
  controllers: [CollaborationsController],
  providers: [
    FilterByAcademyAndStatus,
    {
      provide: ICollaborationsRepository,
      useClass: CollaborationsRepository,
    },
  ],
})
export class CollaborationsModule {}
