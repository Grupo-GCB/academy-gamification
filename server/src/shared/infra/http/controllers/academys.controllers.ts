import { Controller, Get, Param } from '@nestjs/common';

import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { FindByIdUseCase } from '@academys/use-cases';
@Controller('academys')
export class AcademysController {
  constructor(private findByIdUseCase: FindByIdUseCase) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<Academy> {
    return this.findByIdUseCase.execute(id);
  }
}
