import { IsEnum, IsNotEmpty } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;
}
