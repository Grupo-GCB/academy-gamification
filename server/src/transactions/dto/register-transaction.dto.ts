import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  CollaborationsSubType,
  RedeemSubType,
  Status,
  TransactionSubType,
  Types,
} from '@shared/constants';

export class RegisterTransactionDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'gustavo.wuelta@gcbinvestimentos.com',
    description: 'Email do usuário envolvido na transação',
    type: 'string',
    required: true,
  })
  user: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'Email do responsável pela transação',
    type: 'string',
    required: true,
  })
  responsible: string;

  @IsNotEmpty()
  @IsEnum(Types)
  @ApiProperty({
    example: 'REDEEM',
    description: 'Tipo da transação',
    type: 'Types',
    required: true,
  })
  type: Types;

  @IsEnum(TransactionSubType)
  @IsOptional()
  @ApiProperty({
    example: 'PAIR_PROGRAMMING',
    description: 'Subtipo da transação',
    type: 'string',
    required: false,
  })
  sub_type?: CollaborationsSubType | RedeemSubType;

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status da transação',
    type: 'Status',
    required: true,
  })
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1000,
    description: 'Quantidade de GCBits',
    type: 'number',
    required: true,
  })
  gcbits: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'Transação de 1000 GCBits para gustavo.wuelta@gcbinvestimentos.com por Code Review',
    description: 'Descrição da transação',
    type: 'number',
    required: true,
  })
  description?: string;
}
