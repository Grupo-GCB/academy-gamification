import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { Status } from '@shared/constants';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id da transação',
    type: 'uuid',
    required: true,
  })
  id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email de quem está atualizando o status da transação',
    type: 'string',
    required: true,
  })
  admin: string;

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status da transação que irá ser atualizado',
    type: 'CollaborationStatus',
    required: true,
  })
  new_status: Status;
}
