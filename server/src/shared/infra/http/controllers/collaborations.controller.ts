import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import { FindByStatus } from '@collaborations/use-cases';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private findByStatus: FindByStatus) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar colaborações!',
  })
  @Get()
  filterByStatus(@Query('status') status: string): Promise<Collaboration[]> {
    return this.findByStatus.execute(status);
  }
}
