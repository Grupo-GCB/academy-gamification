import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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
  @IsEmail()
  @ApiProperty({
    example: 'gustavo.wuelta@gcbinvestimentos.com',
    description: 'E-mail do colaborador que está envolvido na transação',
    type: 'string',
    required: true,
  })
  user: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'E-mail do usuário que está registrando a transação',
    type: 'string',
    required: true,
  })
  responsible: string;

  @IsNotEmpty()
  @IsEnum(Types)
  @ApiProperty({
    example: 'REDEEM',
    description: 'Razão pela qual essa transação está acontecendo',
    type: 'Types',
    required: true,
  })
  type: Types;

  @IsEnum(TransactionSubType)
  @IsOptional()
  @ApiProperty({
    example: 'PAIR_PROGRAMMING',
    description: 'Tipo da transação realizada',
    type: 'string',
    required: false,
  })
  sub_type?: CollaborationsSubType | RedeemSubType;

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
