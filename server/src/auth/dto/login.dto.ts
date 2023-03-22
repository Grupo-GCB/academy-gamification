import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'vitor.freitas@gcbinvestimentos.com',
    description: 'email do usuário',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'gcb123',
    description: 'Senha cadastrada pelo usuário',
    type: 'string',
    required: true,
  })
  password: string;
}
