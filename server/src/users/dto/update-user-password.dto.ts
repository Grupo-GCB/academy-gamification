import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserPasswordDTO {
  @IsEmail({}, { message: 'O endereço de e-mail informado é inválido!' })
  @IsNotEmpty({ message: 'Insira um endereço de e-mail!' })
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email do usuário que terá sua senha atualizada',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty({ message: 'Insira a senha atual!' })
  @IsString({ message: 'A senha deve ser uma string!' })
  @ApiProperty({
    example: 'gcb123',
    description: 'Senha atual do usuário',
    type: 'string',
    required: true,
  })
  password: string;

  @IsNotEmpty({ message: 'Insira a nova senha!' })
  @IsString({ message: 'A nova senha deve ser uma string!' })
  @MinLength(8, { message: 'A nova senha deve ter no mínimo 8 caracteres!' })
  @MaxLength(24, { message: 'A nova senha deve ter no máximo 24 caracteres!' })
  @ApiProperty({
    example: '123gcb',
    description: 'Nova senha do usuário',
    type: 'string',
    required: true,
  })
  new_password: string;

  @IsNotEmpty({ message: 'Insira a confirmação da nova senha!' })
  @IsString({ message: 'A confirmação da nova senha deve ser uma string!' })
  @MinLength(8, {
    message: 'A confirmação da nova senha deve ter no mínimo 8 caracteres!',
  })
  @MaxLength(24, {
    message: 'A confirmação da nova senha deve ter no máximo 24 caracteres!',
  })
  @ApiProperty({
    example: '123gcb',
    description: 'Confirmação da nova senha do usuário',
    type: 'string',
    required: true,
  })
  confirm_new_password: string;
}
