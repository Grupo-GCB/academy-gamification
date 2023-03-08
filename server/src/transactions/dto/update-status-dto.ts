import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id da transação',
    type: 'uuid',
    required: true,
  })
  transaction_id: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status da transação que irá ser atualizado',
    type: 'CollaborationStatus',
    required: true,
  })
  newStatus: CollaborationsStatus;
}
