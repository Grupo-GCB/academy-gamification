import { CollaborationsSubType } from '@shared/constants';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
export class FindLatestTransactionByUserAndSubTypeDTO {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsSubType)
  subType: CollaborationsSubType;
}
