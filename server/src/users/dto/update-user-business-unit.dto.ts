import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { BusinessUnits } from '@shared/constants';

export class UpdateUserBusinessUnitDTO {
  @IsEmail(
    {},
    { message: 'O endereço de e-mail informado do usuário é inválido!' },
  )
  @IsNotEmpty({ message: 'Insira um endereço de e-mail do usuário!' })
  @ApiProperty({
    example: 'gustavo.wuelta@gcbinvestimentos.com',
    description: 'Email do usuário que terá seu dado atualizado',
    type: 'string',
    required: true,
  })
  email: string;

  @IsEmail(
    {},
    { message: 'O endereço de e-mail informado do responsável é inválido!' },
  )
  @IsNotEmpty({ message: 'Insira um endereço de e-mail do responsável!' })
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email de quem está realizando a alteração',
    type: 'string',
    required: true,
  })
  responsible: string;

  @IsNotEmpty({ message: 'Insira um unidade de negócio!' })
  @IsEnum(BusinessUnits, {
    message:
      'A unidade de negócio deve ser um dos seguintes valores: ADIANTE, PEERBR, FMI, GRUPOGCB ou ACADEMY!',
  })
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Novo dado que irá ser atualizado',
    type: 'BusinessUnits',
    required: true,
  })
  new_bu: BusinessUnits;
}
