import { IsEnum, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@shared/constants';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty({ message: 'Insira um status!' })
  @IsEnum(Status, {
    message:
      'O status deve ser um dos seguintes valores: PENDING, APPROVED ou REJECTED!',
  })
  @ApiProperty({
    example: 'PENDING',
    description: 'Status em que a transação será filtrada',
    type: 'Status',
    required: true,
  })
  status: Status;
}
