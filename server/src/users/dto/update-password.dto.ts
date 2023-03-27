import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email do usuário que terá sua senha atualizada',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'gcb123',
    description: 'Senha atual do usuário',
    type: 'string',
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @ApiProperty({
    example: '123gcb',
    description: 'Nova senha do usuário',
    type: 'string',
    required: true,
  })
  new_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @ApiProperty({
    example: '123gcb',
    description: 'Confirmação da nova senha do usuário',
    type: 'string',
    required: true,
  })
  confirm_new_password: string;
}
