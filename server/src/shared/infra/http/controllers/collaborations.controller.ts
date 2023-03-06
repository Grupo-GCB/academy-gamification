import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { RegisterCollaborationDTO, UpdateStatusDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import {
  FilterByStatus,
  FindOne,
  RegisterCollaboration,
  UpdateStatus,
} from '@collaborations/use-cases';
import { CollaborationsStatus } from '@shared/constants';

@Controller('collaborations')
export class CollaborationsController {
  constructor(
    private filterByStatus: FilterByStatus,
    private updateCollaborationStatus: UpdateStatus,
    private findOneCollaborations: FindOne,
    private registerCollaboration: RegisterCollaboration,
  ) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Colaboração registrada com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar uma colaboração',
  })
  @Post()
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
  filter(
    @Query('status') status: CollaborationsStatus,
  ): Promise<Collaboration[]> {
    return this.filterByStatus.execute({ status: status });
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
