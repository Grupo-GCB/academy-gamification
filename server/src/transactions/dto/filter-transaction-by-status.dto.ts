import { IsEnum, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@shared/constants';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(Status)
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    example: 'PENDING',
    description: 'Status em que a transação será filtrada',
    type: 'Status',
    required: true,
  })
  status: Status;
}
