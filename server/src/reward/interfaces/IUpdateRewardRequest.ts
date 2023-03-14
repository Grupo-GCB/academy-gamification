import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class IUpdateRewardRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Créditos PeerBr',
    description: 'Título da recompensa',
    type: 'string',
    required: true,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Créditos a serem utilizados dentro do PeerBr',
    description: 'Descrição informando mais detalhes sobre a recompensa',
    type: 'string',
    required: false,
  })
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: '5000',
    description: 'Valor para recompensa ser resgatada',
    type: 'number',
    required: false,
  })
  value?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    description: 'Lind da imagem da recompensa',
    type: 'string',
    required: false,
  })
  imageUrl?: string;
}
