import { Module } from '@nestjs/common';
import { AcademysController } from './academys.controller';
import { AcademysService } from './use-cases/academys.service';

@Module({
  controllers: [AcademysController],
  providers: [AcademysService],
})
export class AcademysModule {}
