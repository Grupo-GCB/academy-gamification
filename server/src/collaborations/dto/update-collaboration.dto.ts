import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaborationDTO } from './create-collaboration.dto';

export class UpdateCollaborationDTO extends PartialType(
  CreateCollaborationDTO,
) {}
