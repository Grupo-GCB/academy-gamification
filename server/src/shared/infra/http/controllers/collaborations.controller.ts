import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import { FindByStatus } from '@collaborations/use-cases';

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
  filterByStatus(@Query('status') status: string) {
    return this.findByStatus.execute(status);
  }
}
