import { PartialType } from '@nestjs/mapped-types';
import { RegisterCollaborationDTO } from './register-collaboration.dto';

export class UpdateCollaborationDto extends PartialType(
  RegisterCollaborationDTO,
) {}
