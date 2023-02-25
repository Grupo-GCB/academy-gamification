import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CollaborationsStatus } from 'shared/constants';

export class CreateCollaborationDTO {
  @IsNotEmpty()
  @IsString()
  collaboration_type_id: string;

  @IsNotEmpty()
  @IsString()
  collaborator_id: string;

  @IsNotEmpty()
  @IsString()
  academy_id: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;
}
