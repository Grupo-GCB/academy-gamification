import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UpdateGcbits, RegisterCollaborator } from '@collaborator/use-cases';
import { UpdateGcbitsDTO, CreateCollaboratorDto } from '@collaborator/dto';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';
import { Wallet } from '@collaborator/infra/entities/wallet.entity';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(
    private registerCollaborator: RegisterCollaborator,
    private updateGcbits: UpdateGcbits,
  ) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Colaborador registrado com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao registrar um colaborador',
  })
  @Post()
  createCollaborator(
    @Body()
    data: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    return this.registerCollaborator.execute(data);
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Gcbits alteradas com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar as Gcbits',
  })
  @Put('/updateGcbits')
  updateStatus(@Body() { id, gcbits }: UpdateGcbitsDTO): Promise<Wallet> {
    return this.updateGcbits.execute({
      id,
      gcbits,
    });
  }
}
