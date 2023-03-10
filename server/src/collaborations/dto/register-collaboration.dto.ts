import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
} from '@shared/constants';

export class RegisterCollaborationDTO {
  @IsNotEmpty()
  @IsEnum(CollaborationsTypes)
  @ApiProperty({
    example: 'LOGIC_EXERCISE',
    description: 'Tipo de colaboração realizada',
    type: 'CollaborationsTypes',
    required: true,
  })
  type: CollaborationsTypes;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'https://github.com/example/example',
    description: 'Url da colaboração realizada',
    type: 'string',
    required: true,
  })
  url: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e7c2956b-e528-4ed1-9470-ce8d4f10cabc',
    description: 'Id do colaborador que realizou a colaboração',
    type: 'string',
    required: true,
  })
  collaborator_id: string;

  @IsNotEmpty()
  @IsEnum(BusinessUnits)
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Unidade de negócio do colaborador',
    type: 'BusinessUnits',
    required: true,
  })
  business_unit: BusinessUnits;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status que a colaboração se encontra',
    type: 'CollaborationsStatus',
    required: true,
  })
  status: CollaborationsStatus;
}
