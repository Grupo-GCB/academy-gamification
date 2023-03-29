import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindByEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'E-mail do usuário',
    type: 'string',
    required: true,
  })
  email: string;
}
