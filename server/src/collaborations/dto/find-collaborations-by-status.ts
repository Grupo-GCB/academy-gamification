import { IsEnum, IsNotEmpty } from 'class-validator';

import { CollaborationsStatus } from '@shared/constants';

export class FindCollaborationsByStatusDTO {
  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  status: CollaborationsStatus;
}
