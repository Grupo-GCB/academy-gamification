import { CollaborationsStatus } from '@shared/constants';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class FilterTransactionsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;
}
