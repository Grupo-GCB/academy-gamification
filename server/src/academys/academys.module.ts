import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AcademysController } from '@shared/infra/http/controllers/academys.controllers';
import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { FindByIdUseCase } from '@academys/use-cases/findById/find-academy-by-id';
import { IAcademysRepository } from '@academys/interfaces';
import { AcademysRepository } from '@academys/infra/typeorm/repositories/academys.repository';

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
