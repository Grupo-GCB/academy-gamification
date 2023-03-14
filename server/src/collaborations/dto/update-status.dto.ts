import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '0cb9f40a-a173-4a40-921f-c492c95cd57b',
    description: 'Id da colaboração',
    type: 'string',
    required: true,
  })
  collaboration_id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '2pj9f40a-b157-9l32-921f-c492c95cd92k',
    description: 'Id do administrador responsável pela colaboração',
    type: 'string',
    required: true,
  })
  admin_id: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @ApiProperty({
    example: 'APPROVED',
    description: 'Status que vai ser atualizado na colaboração',
    type: 'CollaborationStatus',
    required: true,
  })
  newStatus: CollaborationsStatus;
}
