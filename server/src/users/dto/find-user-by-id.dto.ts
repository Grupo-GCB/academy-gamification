import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindUserByIdDTO {
  @IsUUID()
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id do usuário',
    type: 'uuid',
    required: true,
  })
  id: string;
}
