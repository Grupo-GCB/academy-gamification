import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '694920a3-e253-4624-95cc-dd6fea1520d3',
    description: 'Usuário que será deletado',
    type: 'uuid',
    required: true,
  })
  user: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '2c1cf668-b5a5-44bf-9bc8-067c8903a5fd',
    description: 'Admin que irá fazer a deleção',
    type: 'uuid',
    required: true,
  })
  admin: string;
}
