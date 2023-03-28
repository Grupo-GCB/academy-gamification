import { IsEnum, IsNotEmpty } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@shared/constants';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiPropertyOptional({
    example: 'PENDING',
    description: 'Status em que a transação está no momento',
    type: 'Status',
  })
  status: Status;
}
