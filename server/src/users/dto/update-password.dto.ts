import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id do usuário que terá sua senha atualizada',
    type: 'uuid',
    required: true,
  })
  id: string;

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
  @ApiProperty({
    example: '123gcb',
    description: 'Nova senha do usuário',
    type: 'string',
    required: true,
  })
  new_password: string;
}
