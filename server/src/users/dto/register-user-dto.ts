import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BusinessUnits } from '@shared/constants';

export class RegisterUserDTO {
  @IsString()
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
