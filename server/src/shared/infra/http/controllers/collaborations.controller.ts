import { Controller, Query } from '@nestjs/common';
import { FindByStatus } from '@collaborations/use-cases';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private FindByStatus: FindByStatus) {}

  @Get()
  filterByStatus(@Query('status') status: CollaborationsStatus);
}
