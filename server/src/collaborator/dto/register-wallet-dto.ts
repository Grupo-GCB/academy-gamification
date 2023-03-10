import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterWalletDTO {
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
  @IsNumber()
  @ApiProperty({
    example: 1000,
    description: 'Quantidade de gcbits na carteira',
    type: 'number',
    required: true,
  })
  gcbits: number;
}
