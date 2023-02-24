import { CollaborationsStatus } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class FilterCollaborationByStatusDto {
  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;

  @IsNotEmpty()
  @IsString()
  id: string;
}
