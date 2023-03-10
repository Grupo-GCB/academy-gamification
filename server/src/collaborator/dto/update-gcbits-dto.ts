import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdateGcbitsDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '0cb9f40a-a173-4a40-921f-c492c95cd57b',
    description: 'Id da carteira que receberá uma atualização',
    type: 'uuid',
    required: true,
  })
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 3000,
    description: 'Valor de gcbits envolvido na atualização',
    type: 'CollaborationStatus',
    required: true,
  })
  gcbits: number;
}
