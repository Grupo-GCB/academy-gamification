import { IsEnum, IsNotEmpty } from 'class-validator';

import { Status } from '@shared/constants';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
