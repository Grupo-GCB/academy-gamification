import { Body, Controller, Get } from '@nestjs/common';
import { FilterCollaborationByStatusDTO } from '@collaborations/dto/filter-collaboration-by-status.dto';
import { FilterCollaborationsByStatus } from '@collaborations/use-cases/filterCollaborationsByStatus/filter-collaborations-by-status';

@Controller('collaborations')
export class CollaborationsController {
  constructor(
    private filterCollaborationsByStatus: FilterCollaborationsByStatus,
  ) {}

  @Get('academy/:id')
  filterByStatus(
    @Body()
    { status, academy_id }: FilterCollaborationByStatusDTO,
  ) {
    return this.filterCollaborationsByStatus.execute({ status, academy_id });
  }
}
