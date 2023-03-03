import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0cb9f40a-a173-4a40-921f-c492c95cd57b',
    description: 'Id da colaboração',
    type: 'string',
    required: true,
  })
  collaboration_id: string;

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
