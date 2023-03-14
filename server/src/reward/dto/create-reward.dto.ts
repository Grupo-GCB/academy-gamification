import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateRewardDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Créditor PeerBr',
    description: 'Título da recompensa',
    type: 'string',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Créditos a serem utilizados dentro do PeerBr',
    description: 'Descrição informando mais detalhes sobre a recompensa',
    type: 'string',
    required: true,
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '5000',
    description: 'Valor para recompensa ser resgatada',
    type: 'number',
    required: true,
  })
  value: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
