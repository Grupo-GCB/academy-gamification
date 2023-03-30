import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { BusinessUnits } from '@shared/constants';

export class RegisterUserDTO {
  @IsEmail({}, { message: 'O endereço de e-mail informado é inválido!' })
  @IsNotEmpty({ message: 'Insira um endereço de e-mail!' })
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'E-mail do usuário',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty({ message: 'Insira um unidade de negócio!' })
  @IsEnum(BusinessUnits, {
    message:
      'A unidade de negócio deve ser um dos seguintes valores: ADIANTE, PEERBR, FMI, GRUPOGCB ou ACADEMY!',
  })
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Empresa que o usuário está atuando',
    type: 'BusinessUnits',
    required: true,
  })
  business_unit: BusinessUnits;
}
