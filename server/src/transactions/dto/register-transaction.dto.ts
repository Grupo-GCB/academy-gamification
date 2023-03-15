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
  Admin,
  BusinessUnits,
  CollaborationsTypes,
  Reasons,
  RedeemTypes,
  Responsibles,
  Status,
  TransactionTypes,
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
  @IsEnum(Responsibles)
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email do usuário que está registrando a transação',
    type: 'string',
    required: true,
  })
  responsible: Academys | Admin;

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
    example: 'REDEEM',
    description: 'Razão pela qual essa transação está acontecendo',
    type: 'Reasons',
    required: true,
  })
  reason: Reasons;

  @IsNotEmpty()
  @IsEnum(TransactionTypes)
  @ApiProperty({
    example: 'PAIR_PROGRAMMING',
    description: 'Tipo da transação realizada',
    type: 'string',
    required: false,
  })
  type?: CollaborationsTypes | RedeemTypes;

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
