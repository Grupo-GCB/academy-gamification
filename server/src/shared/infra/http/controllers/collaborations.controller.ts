import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { RegisterCollaborationDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { FindByStatus, RegisterCollaboration } from '@collaborations/use-cases';
import { CollaborationsStatus } from '@shared/constants';

@Controller('collaborations')
export class CollaborationsController {
  constructor(
    private findByStatus: FindByStatus,
    private registerCollaboration: RegisterCollaboration,
  ) {}

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Colaboração registrada com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar uma colaboração',
  })
  register(
    @Body()
    data: RegisterCollaborationDTO,
  ): Promise<Collaboration> {
    return this.registerCollaboration.execute(data);
  }

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
    return this.findByStatus.execute({ status });
  }
}
