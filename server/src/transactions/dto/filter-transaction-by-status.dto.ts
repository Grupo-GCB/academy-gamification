import { IsEnum, IsNotEmpty } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@shared/constants';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiPropertyOptional({
    example: 'PENDING',
    description: 'Status da transação',
    type: 'Status',
  })
  status: Status;
}
