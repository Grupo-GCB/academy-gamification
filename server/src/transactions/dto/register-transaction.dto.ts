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
  TransferSubTypes,
  Types,
} from '@shared/constants';

export class RegisterTransactionDTO {
  @IsNotEmpty({
    message: 'Insira um e-mail de um colaborador envolvido na transação!',
  })
  @IsEmail(
    {},
    { message: 'Endereço de e-mail de um colaborador informado é inválido!' },
  )
  @ApiProperty({
    example: 'gustavo.wuelta@gcbinvestimentos.com',
    description: 'E-mail do colaborador que está envolvido na transação',
    type: 'string',
    required: true,
  })
  user: string;

  @IsNotEmpty({
    message: 'Insira um e-mail de um responsável envolvido na transação!',
  })
  @IsEmail(
    {},
    { message: 'Endereço de e-mail de um responsável informado é inválido!' },
  )
  @ApiProperty({
    example: 'kayke.fujinaka@gcbinvestimentos.com',
    description: 'E-mail do usuário que está registrando a transação',
    type: 'string',
    required: true,
  })
  responsible: string;

  @IsNotEmpty({ message: 'Insira um tipo!' })
  @IsEnum(Types, {
    message:
      'O tipo deve ser um dos seguintes valores: COLLABORATION, REDEEM, PENALTY, TRANSFER ou CORRECTION!',
  })
  @ApiProperty({
    example: 'REDEEM',
    description: 'Razão pela qual essa transação está acontecendo',
    type: 'Types',
    required: true,
  })
  type: Types;

  @IsOptional()
  @IsEnum(TransactionSubType, {
    message:
      'O subtipo deve ser um dos seguintes valores: LOGIC_EXERCISE, CODE_REVIEW, COMMITTEE, DOUBTS, PAIR_PROGRAMMING, FEEDBACK, TEAM_CEREMONY, PEER_CREDIT, SIMPLE_PROJECT, MEDIUM_PROJECT, COMPLEX_PROJECT, ACADEMY, ENTRY, EXIT!',
  })
  @ApiProperty({
    example: 'PAIR_PROGRAMMING',
    description: 'Tipo da transação realizada',
    type: 'string',
    required: false,
  })
  sub_type?: CollaborationsSubType | RedeemSubType | TransferSubTypes;

  @IsNotEmpty({ message: 'Insira um status!' })
  @IsEnum(Status, {
    message:
      'O status deve ser um dos seguintes valores: PENDING, APPROVED ou REJECTED!',
  })
  @ApiProperty({
    example: 'PENDING',
    description: 'Status em que a transação está no momento',
    type: 'Status',
    required: true,
  })
  status: Status;

  @IsNotEmpty({ message: 'Insira as GCBits!' })
  @IsNumber({}, { message: 'As GCBits devem ser um número!' })
  @ApiProperty({
    example: 1000,
    description: 'Quantidade de GCBits envolvidas na transação',
    type: 'number',
    required: true,
  })
  gcbits: number;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string!' })
  @ApiProperty({
    example:
      'Transação de 3000 Gcbits para gustavo.wuelta@gcbinvestimentos.com por Code Review',
    description: 'Descrição da transação',
    type: 'string',
    required: true,
  })
  description?: string;
}
