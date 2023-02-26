import { CollaborationsRepository } from './infra/typeorm/repositories/collaborations.repository';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FilterByAcademyAndStatus } from './use-cases/filterByAcademyAndStatus/filter-by-academy-and-status';
import { CollaborationsController } from 'shared/infra/http/controllers/collaborations.controller';

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
