import { IsEnum, IsNotEmpty } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class FilterCollaborationsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;
}
