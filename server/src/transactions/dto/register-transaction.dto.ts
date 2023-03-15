import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  Academys,
  BusinessUnits,
  Reasons,
  ReedemTypes,
  Status,
} from '@shared/constants';

export class RegisterTransactionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'gustavo.wuelta@gcbinvestimentos.com',
    description: 'Email do colaborador que está envolvido na transação',
    type: 'string',
    required: true,
  })
  collaborator: string;

  @IsNotEmpty()
  @IsEnum(Academys)
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email do usuário que está registrando a transação',
    type: 'string',
    required: true,
  })
  responsible: Academys;

  @IsNotEmpty()
  @IsEnum(BusinessUnits)
  @ApiProperty({
    example: 'ADIANTE',
    description: 'Empresa do colaborador que está envolvido na transação',
    type: 'BusinessUnits',
    required: true,
  })
  business_unit: BusinessUnits;

  @IsNotEmpty()
  @IsEnum(Reasons)
  @ApiProperty({
    example: 'REEDEM',
    description: 'Razão pela qual a transação existe',
    type: 'Reasons',
    required: true,
  })
  reason: Reasons;

  @IsNotEmpty()
  @IsEnum(ReedemTypes)
  @ApiProperty({
    example: 'PAIR_PROGRAMMING',
    description: 'Tipo da transação realizada',
    type: 'string',
    required: true,
  })
  type?: ReedemTypes;

  // @IsNotEmpty()
  // @IsArray()
  // @IsString({ each: true })
  // @ApiProperty({
  //   example:
  //     '["vitor.freitas@gcbinvestimentos.com", "leonardo.costa@gcbinvestimentos.com"]',
  //   description: 'Academys que foram ajudados nesta transação',
  //   type: 'string',
  //   required: true,
  // })
  // academys: Academys[];

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status em que a transação está no momento',
    type: 'Status',
    required: true,
  })
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1000,
    description: 'Quantidade de GCBits envolvidas na transação',
    type: 'number',
    required: true,
  })
  gcbits: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'Transação de 3000 Gcbits para gustavo.wuelta@gcbinvestimentos.com por Code Review',
    description: 'Descrição da transação',
    type: 'number',
    required: true,
  })
  description?: string;
}
