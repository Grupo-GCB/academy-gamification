import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsString()
  collaboration_id: string;

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  newStatus: CollaborationsStatus;
}
