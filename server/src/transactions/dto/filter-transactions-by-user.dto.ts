import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FilterTransactionsByUserDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '71df0b5b-e687-4778-9cc4-a1826d0872a5',
    description: 'Id do usuário',
    type: 'uuid',
    required: true,
  })
  user: string;
}
