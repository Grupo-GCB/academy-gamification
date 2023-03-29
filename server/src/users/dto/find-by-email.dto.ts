import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindByEmailDTO {
  @IsEmail({}, { message: 'O endereço de e-mail informado é inválido!' })
  @IsNotEmpty({ message: 'Insira um endereço de e-mail!' })
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'E-mail do usuário',
    type: 'string',
    required: true,
  })
  email: string;
}
