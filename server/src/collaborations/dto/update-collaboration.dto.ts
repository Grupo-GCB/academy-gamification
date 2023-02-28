import { PartialType } from '@nestjs/mapped-types';
import { RegisterCollaborationDto } from './register-collaboration.dto';

export class UpdateCollaborationDto extends PartialType(
  RegisterCollaborationDto,
) {}
