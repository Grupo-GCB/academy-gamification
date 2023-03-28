import { ApiProperty } from '@nestjs/swagger';
import { BusinessUnits } from '@shared/constants';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusinessUnitDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'gustavo.wuelta@gcbinvestimentos.com',
    description: 'Email do usuário que terá seu dado atualizado',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email de quem está realizando a alteração',
    type: 'string',
    required: true,
  })
  responsible: string;

  @IsNotEmpty()
  @IsEnum(BusinessUnits)
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Novo dado que irá ser atualizado',
    type: 'BusinessUnits',
    required: true,
  })
  new_bu: BusinessUnits;
}
