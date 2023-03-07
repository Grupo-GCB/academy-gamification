import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';

export class RegisterTransactionDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'e7c2956b-e528-4ed1-9470-ce8d4f10cabc',
    description: 'Id do colaborador que está envolvido na transação',
    type: 'string',
    required: true,
  })
  collaborator_id: string;

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
  @IsEnum(TransactionReasons)
  @ApiProperty({
    example: 'RESGATE',
    description: 'Razão pela qual a transação existe',
    type: 'TransactionReasons',
    required: true,
  })
  reason: TransactionReasons;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Code Review',
    description: 'Tipo da transação realizada',
    type: 'string',
    required: true,
  })
  type: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example:
      '["c13f866c-2ba0-42b7-83c9-50bb61c5c167", "70c2be1a-ef21-4ae7-a8d0-375ddf026920"]',
    description: 'Academys que foram ajudados nesta transação',
    type: 'string',
    required: true,
  })
  academys: string[];

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status em que a transação está no momento',
    type: 'CollaborationsStatus',
    required: true,
  })
  status: CollaborationsStatus;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1000,
    description: 'Quantidade de GCBits envolvidas na transação',
    type: 'number',
    required: true,
  })
  gcbits: number;
}
