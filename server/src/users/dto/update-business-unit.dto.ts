import { ApiProperty } from '@nestjs/swagger';
import { BusinessUnits } from '@shared/constants';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBusinessUnitDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'Id do usuário que terá seu dado atualizado',
    type: 'uuid',
    required: true,
  })
  id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e88ed4fa-c89c-410e-b691-712fbfa6bf79',
    description: 'ID de quem está realizando a alteração',
    type: 'uuid',
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
