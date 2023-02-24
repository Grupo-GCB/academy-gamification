import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdUseCase } from '../../../../academys/use-cases/findById/find-academy-by-id';
@Controller('academys')
export class AcademysControllers {
  constructor(private findByIdUseCase: FindByIdUseCase) {}

  @Get('academys/:id')
  findById(@Param('id') id: string): Promise<Academy> {
    return this.findByIdUseCase.execute(id);
  }
}
