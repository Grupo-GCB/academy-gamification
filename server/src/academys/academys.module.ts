import { AcademysController } from './../shared/infra/http/controllers/academys.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Academy } from './infra/typeorm/entities/academy.entity';
import { FindByIdUseCase } from './use-cases/findById/find-academy-by-id';
import { IAcademysRepository } from './interfaces';
import { AcademysRepository } from './infra/typeorm/repositories/academys.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Academy])],
  controllers: [AcademysController],
  providers: [
    FindByIdUseCase,
    {
      provide: IAcademysRepository,
      useClass: AcademysRepository,
    },
  ],
})
export class AcademysModule {}
