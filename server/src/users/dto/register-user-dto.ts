import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { BusinessUnits } from '@shared/constants';

export class RegisterUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'Email do usuário',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsEnum(BusinessUnits)
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Empresa que o usuário está atuando',
    type: 'BusinessUnits',
    required: true,
  })
  business_unit: BusinessUnits;
}
