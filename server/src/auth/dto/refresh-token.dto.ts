import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'f08cad13-89e5-447b-b910-123b5d6c03b4',
    description: 'Id de identificação do usuário',
    type: 'string',
    required: true,
  })
  user: string;

  @ApiProperty({
    example: '3600',
    description: 'Tempo de expiração do token',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  expiresAt: number;
}
