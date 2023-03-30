import { CollaborationsSubType } from '@shared/constants';
import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
export class FindLatestTransactionByUserAndSubTypeDTO {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsSubType)
  subType: CollaborationsSubType;
}
