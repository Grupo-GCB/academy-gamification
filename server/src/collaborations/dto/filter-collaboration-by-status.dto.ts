import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CollaborationsStatus } from 'shared/constants';
export class FilterCollaborationByStatusDto {
  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;

  @IsNotEmpty()
  @IsString()
  academy_id: string;
}
