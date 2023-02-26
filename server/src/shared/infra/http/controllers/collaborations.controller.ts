import { Body, Controller, Get, Param } from '@nestjs/common';

import { FilterByAcademyAndStatusDTO } from '@collaborations/dto/filter-by-academy-and-status';
import { FilterByAcademyAndStatus } from '@collaborations/use-cases/filterByAcademyAndStatus/filter-by-academy-and-status';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private filterByAcademyAndStatus: FilterByAcademyAndStatus) {}

  @Get('academy/:academy_id')
  filterByStatus(
    @Param() { academy_id }: FilterByAcademyAndStatusDTO,
    @Body() { status }: FilterByAcademyAndStatusDTO,
  ) {
    return this.filterByAcademyAndStatus.execute({ status, academy_id });
  }
}