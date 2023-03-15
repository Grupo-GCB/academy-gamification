import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BusinessUnits, Roles } from '@shared/constants';

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
    type: 'string',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'Email do usuário',
    type: 'string',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'gcb123',
    description: 'Senha do usuário',
    type: 'string',
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(BusinessUnits)
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Empresa que o usuário está atuando',
    type: 'BusinessUnits',
    required: true,
  })
  business_unit: BusinessUnits;

  @IsNotEmpty()
  @IsEnum(Roles)
  @ApiProperty({
    example: 'ADMIN',
    description: 'Cargo de atuação do usuário',
    type: 'Roles',
    required: true,
  })
  role: Roles;
}
