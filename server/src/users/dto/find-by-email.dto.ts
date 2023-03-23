import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindByEmailDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'Email do usuário',
    type: 'string',
    required: true,
  })
  email: string;
}
