import { Controller, Get, Query } from '@nestjs/common';

import { FindByStatus } from '@collaborations/use-cases';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private findByStatus: FindByStatus) {}

  @Get()
  filterByStatus(@Query('status') status: string) {
    return this.findByStatus.execute(status);
  }
}
