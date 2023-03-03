import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { FindByStatus, UpdateStatus, FindOne } from '@collaborations/use-cases';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CollaborationsStatus } from '@shared/constants';
import { UpdateStatusDTO } from '@collaborations/dto';

@Controller('collaborations')
export class CollaborationsController {
  constructor(
    private findByStatus: FindByStatus,
    private updateCollaborationStatus: UpdateStatus,
    private findOneCollaborations: FindOne,
  ) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar colaborações!',
  })
  @Get()
  filterByStatus(
    @Query('status') status: CollaborationsStatus,
  ): Promise<Collaboration[]> {
    return this.findByStatus.execute({ status: status });
  }

  @Get(':id')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a colaboração!',
  })
  findOne(@Param('id') id: string): Promise<Collaboration> {
    return this.findOneCollaborations.execute(id);
  }

  @Put()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Status da colaboração alterado com sucesso!',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar o status da colaboração!',
  })
  updateStatus(
    @Body() { collaboration_id, newStatus }: UpdateStatusDTO,
  ): Promise<Collaboration> {
    return this.updateCollaborationStatus.execute({
      collaboration_id,
      newStatus,
    });
  }
}
