import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindUserByIdDTO {
  @IsUUID(undefined, { message: 'O id informado é inválido!' })
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id do usuário',
    type: 'uuid',
    required: true,
  })
  id: string;
}
