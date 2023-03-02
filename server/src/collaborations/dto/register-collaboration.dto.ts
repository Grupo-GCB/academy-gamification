import { IsEnum, IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CollaborationsStatus } from '@shared/constants';

export class RegisterCollaborationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Logic Exercise',
    description: 'Tipo de colaboração realizada',
    type: 'string',
    required: true,
  })
  type: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'github.com/RepoName',
    description: 'Url da colaboração realizada',
    type: 'string',
    required: true,
  })
  url: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e7c2956b-e528-4ed1-9470-ce8d4f10cabc',
    description: 'Id do colaborador que reliazou a colaboração',
    type: 'string',
    required: true,
  })
  collaborator_id: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @IsString()
  @ApiProperty({
    example: 'pending',
    description: 'Status que a colaboração se encontra',
    type: 'CollaborationsStatus',
    required: true,
  })
  status: CollaborationsStatus;
}
