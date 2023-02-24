import { CollaborationsStatus } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RegisterCollaborationDto {
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
