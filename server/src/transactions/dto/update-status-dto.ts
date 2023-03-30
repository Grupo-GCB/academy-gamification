import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { Status } from '@shared/constants';

export class UpdateStatusDTO {
  @IsNotEmpty({ message: 'Insira o id de uma transação!' })
  @IsUUID(undefined, { message: 'Id inválido!' })
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id da transação',
    type: 'uuid',
    required: true,
  })
  id: string;

  @IsNotEmpty({ message: 'Insira o endereço de e-mail de um administrador!' })
  @IsEmail(
    {},
    {
      message: 'O endereço de e-mail de um administrador informado é inválido!',
    },
  )
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email de quem está atualizando o status da transação',
    type: 'string',
    required: true,
  })
  admin: string;

  @IsNotEmpty({ message: 'Insira um novo status!' })
  @IsEnum(Status, {
    message:
      'O status deve ser um dos seguintes valores: PENDING, APPROVED ou REJECTED!',
  })
  @ApiProperty({
    example: 'PENDING',
    description: 'Status da transação que irá ser atualizado',
    type: 'CollaborationStatus',
    required: true,
  })
  new_status: Status;
}
