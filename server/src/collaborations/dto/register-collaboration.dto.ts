import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class RegisterCollaborationDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  collaborator_id: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @IsString()
  status: string;
}
